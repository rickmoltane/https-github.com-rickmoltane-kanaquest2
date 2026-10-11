import { InteractionItem } from '../data/interactionData';
import { normalizeJapaneseForSpeech, calculateSimilarity } from './japaneseSpeech';

export interface InteractionEvaluationResult {
  isValid: boolean; // Makes logical sense AND is grammatically acceptable
  normalizedSpoken: string;
  headline: string; // Short evaluation badge headline
  feedbackExplanation: string; // Diagnostic feedback explaining logic and grammar
  grammarNotes?: string; // Specific grammatical highlight
  matchedSample?: string;
  similarity?: number;
  isLogical: boolean;
  isGrammatical: boolean;
}

// Known occupations in hiragana
const OCCUPATIONS_HIRAGANA = [
  'かいしゃいん',
  'がくせい',
  'せんせい',
  'いしゃ',
  'えんじにあ',
  'ぎんこういん',
  'けんきゅうしゃ',
  'かんごし',
  'べんごし',
  'ぷろぐらまー',
  'しゅふ',
  'かしゅ',
];

// Known countries / places in hiragana
const PLACES_HIRAGANA = [
  'ふらんす',
  'にほん',
  'あめりか',
  'かなだ',
  'いぎりす',
  'とうきょう',
  'おおさか',
  'きょうと',
  'おーすとらりあ',
  'ちゅうごく',
  'かんこく',
  'たい',
  'いた orphan',
  'いたりあ',
  'どいつ',
  'すぺいん',
  'べとなむ',
];

/**
 * Evaluates whether a spoken Japanese response makes logical sense in context
 * and follows correct Japanese grammatical structure.
 */
export function evaluateInteractionResponse(
  spokenText: string,
  interaction: InteractionItem
): InteractionEvaluationResult {
  const normalized = normalizeJapaneseForSpeech(spokenText);

  if (!normalized || normalized.length < 1) {
    return {
      isValid: false,
      isLogical: false,
      isGrammatical: false,
      normalizedSpoken: '',
      headline: 'おんせいが ききとれませんでした (No voice detected)',
      feedbackExplanation: 'Speak clearly into the microphone in Japanese, or use the test input button below.',
    };
  }

  // 1. Direct exact/close match with any of the ideal sample replies (similarity >= 60%)
  for (const sample of interaction.sampleGoodReplies) {
    const normSample = normalizeJapaneseForSpeech(sample.hiragana);
    const similarity = calculateSimilarity(normalized, normSample);

    if (normalized === normSample || normalized.includes(normSample) || normSample.includes(normalized)) {
      return {
        isValid: true,
        isLogical: true,
        isGrammatical: true,
        normalizedSpoken: normalized,
        similarity: 1.0,
        headline: 'せいかい！ ろんりてきで ただしいにほんごです！',
        feedbackExplanation: `Logical and grammatically natural! You matched: 『${sample.hiragana}』 (${sample.english})`,
        grammarNotes: 'Proper polite sentence structure (丁寧語) matching conversational etiquette.',
        matchedSample: sample.hiragana,
      };
    }

    if (similarity >= 0.60) {
      return {
        isValid: true,
        isLogical: true,
        isGrammatical: true,
        normalizedSpoken: normalized,
        similarity: Math.round(similarity * 100) / 100,
        headline: 'せいかい！ よくできました！',
        feedbackExplanation: `Great reply! Your spoken response closely matches (${Math.round(similarity * 100)}%): 『${sample.hiragana}』 (${sample.english})`,
        grammarNotes: 'Natural spoken Japanese phrasing.',
        matchedSample: sample.hiragana,
      };
    }
  }

  // 2. Check for common cross-topic logical mismatches defined in item data
  for (const err of interaction.commonErrors) {
    for (const kw of err.keywords) {
      const normKw = normalizeJapaneseForSpeech(kw);
      if (normalized.includes(normKw)) {
        return {
          isValid: false,
          isLogical: false,
          isGrammatical: true,
          normalizedSpoken: normalized,
          headline: 'ろんりてきな へんとうが ひつようです (Logical Mismatch)',
          feedbackExplanation: err.feedback,
          grammarNotes: 'Words were recognizable, but the meaning does not respond to the specific question asked.',
        };
      }
    }
  }

  // 3. Rule-specific semantic and grammar evaluation
  switch (interaction.ruleType) {
    case 'name_introduction': {
      // Must be introducing oneself
      // Logically: states a name with です, or says はじめまして / よろしく
      const hasDesu = normalized.endsWith('です') || normalized.includes('です');
      const hasHajimemashite = normalized.includes('はじめまして');
      const hasYoroshiku = normalized.includes('よろしく') || normalized.includes('どうぞよろしく');
      const hasMoushimasu = normalized.includes('もうします');

      // Check if user accidentally gave an occupation
      const isOccupationOnly = OCCUPATIONS_HIRAGANA.some(o => normalized === `${o}です` || normalized === o);
      if (isOccupationOnly) {
        return {
          isValid: false,
          isLogical: false,
          isGrammatical: true,
          normalizedSpoken: normalized,
          headline: 'しつもんに こたえていません (Question Mismatch)',
          feedbackExplanation: "You stated an occupation, but the partner asked for your name 『おなまえは？』. Introduce yourself with 『[なまえ]です』 or 『はじめまして、...』.",
        };
      }

      if (hasHajimemashite || hasYoroshiku || hasMoushimasu || (hasDesu && normalized.length >= 3)) {
        return {
          isValid: true,
          isLogical: true,
          isGrammatical: true,
          normalizedSpoken: normalized,
          headline: 'せいかい！ じこしょうかいが できました！',
          feedbackExplanation: 'Logical and polite self-introduction! You appropriately used polite copula (です) or introductory pleasantries.',
          grammarNotes: 'Polite register (丁寧語) used appropriately.',
        };
      }

      return {
        isValid: false,
        isLogical: false,
        isGrammatical: false,
        normalizedSpoken: normalized,
        headline: 'おなまえを いってみましょう (Introduce your name)',
        feedbackExplanation: "To state your name politely in Japanese, say: 『[なまえ]です』 (e.g. たなかです, さくらです) or 『はじめまして、[なまえ]です』.",
      };
    }

    case 'origin_from': {
      // Must express where one came from: [place]から きました OR [place]です
      const hasKaraKimashita = normalized.includes('からきました') || normalized.includes('からまいりました');
      const hasKaraDesu = normalized.includes('からです');
      const mentionsPlace = PLACES_HIRAGANA.some(p => normalized.includes(p));

      // Grammar check: did they use に きました instead of から きました?
      if (normalized.includes('にきました')) {
        return {
          isValid: false,
          isLogical: true,
          isGrammatical: false,
          normalizedSpoken: normalized,
          headline: 'ぶんぽうの ちゅうい (Grammar Particle Note)',
          feedbackExplanation: "Grammar note: When saying where you came from, use the particle 『から』 (from) rather than 『に』: e.g. 『ふらんすから きました』.",
        };
      }

      if (hasKaraKimashita || (mentionsPlace && (hasKaraDesu || normalized.endsWith('です')))) {
        return {
          isValid: true,
          isLogical: true,
          isGrammatical: true,
          normalizedSpoken: normalized,
          headline: 'せいかい！ しゅっしんが つたわりました！',
          feedbackExplanation: "Logical and grammatically sound! Using 『から きました』 correctly indicates country/city of origin.",
          grammarNotes: 'Correct particle 『から』 + polite past tense 『きました』.',
        };
      }

      if (mentionsPlace) {
        return {
          isValid: true,
          isLogical: true,
          isGrammatical: true,
          normalizedSpoken: normalized,
          headline: 'せいかい！ (Understandable Origin)',
          feedbackExplanation: "Recognized country name! For full Japanese grammar, say: 『[くに]から きました』 (e.g. ふらんすから きました).",
          grammarNotes: 'Add polite predicate 『から きました』 for formal etiquette.',
        };
      }

      return {
        isValid: false,
        isLogical: false,
        isGrammatical: false,
        normalizedSpoken: normalized,
        headline: 'しゅっしんを こたえましょう (State your origin)',
        feedbackExplanation: "The partner asked 『どちらから きましたか？』 (Where did you come from?). Answer: 『ふらんすから きました』 or 『にほんから きました』.",
      };
    }

    case 'occupation_statement': {
      // Open ended: What work do you do?
      const mentionsJob = OCCUPATIONS_HIRAGANA.some(j => normalized.includes(j));
      const hasDesu = normalized.endsWith('です') || normalized.includes('です');

      // Check for yes/no on open question
      if (normalized === 'はい' || normalized === 'いいえ' || normalized.startsWith('はい') || normalized.startsWith('いいえ')) {
        return {
          isValid: false,
          isLogical: false,
          isGrammatical: true,
          normalizedSpoken: normalized,
          headline: 'ろんりてきな ふいっち (Logic Error: Open Question)',
          feedbackExplanation: "『なんの しごとを していますか？』 is an open question ('What work do you do?'), not a yes/no question. Name an occupation + です, such as 『かいしゃいんです』.",
        };
      }

      if (mentionsJob && hasDesu) {
        return {
          isValid: true,
          isLogical: true,
          isGrammatical: true,
          normalizedSpoken: normalized,
          headline: 'せいかい！ しごとを こたえられました！',
          feedbackExplanation: "Logical and grammatically correct! Stating your occupation with 『...です』 is the proper conversational pattern.",
          grammarNotes: 'Noun + polite copula 『です』.',
        };
      }

      if (mentionsJob) {
        return {
          isValid: true,
          isLogical: true,
          isGrammatical: true,
          normalizedSpoken: normalized,
          headline: 'せいかい！ (Occupation Recognized)',
          feedbackExplanation: "Good job! Remember to complete the sentence with 『です』 for polite Japanese: e.g. 『かいしゃいんです』.",
          grammarNotes: 'Add polite copula 『です』.',
        };
      }

      return {
        isValid: false,
        isLogical: false,
        isGrammatical: false,
        normalizedSpoken: normalized,
        headline: 'しょくぎょうを こたえましょう (State your occupation)',
        feedbackExplanation: "Answer with a Japanese profession + です: e.g. 『かいしゃいんです』 (company employee), 『がくせいです』 (student), or 『せんせいです』 (teacher).",
      };
    }

    case 'occupation_confirm_company': {
      // Are you a company employee? (Yes/No confirmation)
      const isYes = normalized.includes('はい') || normalized.includes('そうです') || normalized === 'かいしゃいんです';
      const isNo = normalized.includes('いいえ') || normalized.includes('ちがいます') || normalized.includes('じゃありません') || normalized.includes('ではありません');

      if (isYes && (normalized.includes('かいしゃいん') || normalized.includes('そうです') || normalized === 'はい')) {
        return {
          isValid: true,
          isLogical: true,
          isGrammatical: true,
          normalizedSpoken: normalized,
          headline: 'せいかい！ ただしい こうていへんとうです！',
          feedbackExplanation: "Logical and polite affirmative reply! 『はい、かいしゃいんです』 or 『はい、そうです』 fits perfectly.",
          grammarNotes: 'Affirmative response with polite agreement.',
        };
      }

      if (isNo) {
        return {
          isValid: true,
          isLogical: true,
          isGrammatical: true,
          normalizedSpoken: normalized,
          headline: 'せいかい！ ただしい ひていへんとうです！',
          feedbackExplanation: "Logical and polite negation! 『いいえ、かいしゃいんじゃ ありません』 or stating an alternative profession is natural Japanese.",
          grammarNotes: 'Negative copula 『じゃ ありません』 used correctly.',
        };
      }

      return {
        isValid: false,
        isLogical: false,
        isGrammatical: false,
        normalizedSpoken: normalized,
        headline: 'はい／いいえ で こたえましょう (Confirm or deny)',
        feedbackExplanation: "The partner asked 『かいしゃいんですか？』. Reply: 『はい、かいしゃいんです』 (Yes) or 『いいえ、かいしゃいんじゃ ありません』 (No).",
      };
    }

    case 'occupation_confirm_student': {
      const isYes = normalized.includes('はい') || normalized.includes('そうです') || normalized === 'がくせいです';
      const isNo = normalized.includes('いいえ') || normalized.includes('ちがいます') || normalized.includes('じゃありません') || normalized.includes('ではありません');

      if (isYes && (normalized.includes('がくせい') || normalized.includes('そうです') || normalized === 'はい')) {
        return {
          isValid: true,
          isLogical: true,
          isGrammatical: true,
          normalizedSpoken: normalized,
          headline: 'せいかい！ がくせいの こうていへんとう！',
          feedbackExplanation: "Logical and polite! 『はい、がくせいです』 or 『はい、そうです』 accurately answers the question.",
        };
      }

      if (isNo) {
        return {
          isValid: true,
          isLogical: true,
          isGrammatical: true,
          normalizedSpoken: normalized,
          headline: 'せいかい！ がくせいの ひていへんとう！',
          feedbackExplanation: "Logical negation! 『いいえ、がくせいじゃ ありません』 or stating an alternative role is accurate.",
        };
      }

      return {
        isValid: false,
        isLogical: false,
        isGrammatical: false,
        normalizedSpoken: normalized,
        headline: 'がくせいか こたえましょう (Reply to student question)',
        feedbackExplanation: "The speaker asked 『がくせいですか？』. Reply with: 『はい、がくせいです』 or 『いいえ、がくせいじゃ ありません』.",
      };
    }

    case 'occupation_confirm_teacher': {
      const isYes = normalized.includes('はい') || normalized.includes('そうです') || normalized === 'せんせいです';
      const isNo = normalized.includes('いいえ') || normalized.includes('ちがいます') || normalized.includes('じゃありません');

      if (isYes || isNo) {
        return {
          isValid: true,
          isLogical: true,
          isGrammatical: true,
          normalizedSpoken: normalized,
          headline: 'せいかい！ ていねいな へんとうです！',
          feedbackExplanation: "Clear and logical answer to 『せんせいですか？』.",
        };
      }

      return {
        isValid: false,
        isLogical: false,
        isGrammatical: false,
        normalizedSpoken: normalized,
        headline: 'せんせいか こたえましょう',
        feedbackExplanation: "Reply with: 『はい、せんせいです』 or 『いいえ、せんせいじゃ ありません』.",
      };
    }

    case 'occupation_confirm_doctor': {
      const isYes = normalized.includes('はい') || normalized.includes('そうです') || normalized === 'いしゃです';
      const isNo = normalized.includes('いいえ') || normalized.includes('ちがいます') || normalized.includes('じゃありません');

      if (isYes || isNo) {
        return {
          isValid: true,
          isLogical: true,
          isGrammatical: true,
          normalizedSpoken: normalized,
          headline: 'せいかい！ ていねいな へんとうです！',
          feedbackExplanation: "Clear and logical answer to 『いしゃですか？』.",
        };
      }

      return {
        isValid: false,
        isLogical: false,
        isGrammatical: false,
        normalizedSpoken: normalized,
        headline: 'いしゃか こたえましょう',
        feedbackExplanation: "Reply with: 『はい、いしゃです』 or 『いいえ、いしゃじゃ ありません』.",
      };
    }

    case 'greeting_morning': {
      if (normalized.includes('おはよう')) {
        return {
          isValid: true,
          isLogical: true,
          isGrammatical: true,
          normalizedSpoken: normalized,
          headline: 'せいかい！ あさの あいさつが できました！',
          feedbackExplanation: "Perfect! Returning 『おはようございます！』 matches the morning time and context.",
        };
      }
      return {
        isValid: false,
        isLogical: false,
        isGrammatical: false,
        normalizedSpoken: normalized,
        headline: 'あさの あいさつを かえしましょう (Morning Greeting)',
        feedbackExplanation: "The colleague said 『おはようございます！』. Return the greeting with: 『おはようございます！』.",
      };
    }

    case 'greeting_daytime': {
      if (normalized.includes('こんにちは')) {
        return {
          isValid: true,
          isLogical: true,
          isGrammatical: true,
          normalizedSpoken: normalized,
          headline: 'せいかい！ ひるの あいさつが できました！',
          feedbackExplanation: "Natural and friendly! 『こんにちは！』 is the proper midday greeting.",
        };
      }
      return {
        isValid: false,
        isLogical: false,
        isGrammatical: false,
        normalizedSpoken: normalized,
        headline: 'こんにちは と こたえましょう',
        feedbackExplanation: "The person said 『こんにちは！』. Return the greeting: 『こんにちは！』.",
      };
    }

    case 'greeting_evening': {
      if (normalized.includes('こんばんは')) {
        return {
          isValid: true,
          isLogical: true,
          isGrammatical: true,
          normalizedSpoken: normalized,
          headline: 'せいかい！ よるの あいさつが できました！',
          feedbackExplanation: "Natural and polite! 『こんばんは！』 matches the evening setting.",
        };
      }
      return {
        isValid: false,
        isLogical: false,
        isGrammatical: false,
        normalizedSpoken: normalized,
        headline: 'こんばんは と こたえましょう',
        feedbackExplanation: "The person greeted you with 『こんばんは！』. Return the evening greeting: 『こんばんは！』.",
      };
    }

    case 'farewell_leaving_work': {
      // Coworker leaves: おさきにしつれいします
      if (
        normalized.includes('おつかれ') ||
        normalized.includes('またあした') ||
        normalized.includes('じゃあまた') ||
        normalized.includes('さようなら')
      ) {
        return {
          isValid: true,
          isLogical: true,
          isGrammatical: true,
          normalizedSpoken: normalized,
          headline: 'せいかい！ しょくばの マナーが ばっちりです！',
          feedbackExplanation: "Excellent Japanese workplace etiquette! 『おつかれさまでした』 is the standard respectful response when a coworker departs.",
          grammarNotes: 'Polite past-tense acknowledgement (お疲れ様でした).',
        };
      }
      return {
        isValid: false,
        isLogical: false,
        isGrammatical: false,
        normalizedSpoken: normalized,
        headline: 'しょくばの あいさつを かえしましょう',
        feedbackExplanation: "When a colleague leaves saying 『おさきに しつれいします』, reply with: 『おつかれさまでした』 or 『またあした』.",
      };
    }

    case 'farewell_parting': {
      if (
        normalized.includes('また') ||
        normalized.includes('さようなら') ||
        normalized.includes('ばいばい')
      ) {
        return {
          isValid: true,
          isLogical: true,
          isGrammatical: true,
          normalizedSpoken: normalized,
          headline: 'せいかい！ わかれの あいさつが できました！',
          feedbackExplanation: "Natural parting farewell! 『じゃあまた』 or 『またあした』 fits the context nicely.",
        };
      }
      return {
        isValid: false,
        isLogical: false,
        isGrammatical: false,
        normalizedSpoken: normalized,
        headline: 'わかれの あいさつを いいましょう',
        feedbackExplanation: "When a friend says 『じゃあ、また あした！』, reply with: 『じゃあまた！』 or 『またあした！』.",
      };
    }

    case 'polite_pleasure': {
      if (
        normalized.includes('こちらこそ') ||
        normalized.includes('よろしく') ||
        normalized.includes('どうぞ')
      ) {
        return {
          isValid: true,
          isLogical: true,
          isGrammatical: true,
          normalizedSpoken: normalized,
          headline: 'せいかい！ ていねいな へんとうです！',
          feedbackExplanation: "Respectful reciprocity! 『こちらこそ よろしく おねがいします』 or 『どうぞ よろしく』 is the customary response.",
          grammarNotes: 'Reciprocal politeness particle 『こちらこそ』.',
        };
      }
      return {
        isValid: false,
        isLogical: false,
        isGrammatical: false,
        normalizedSpoken: normalized,
        headline: 'こちらこそ と こたえましょう',
        feedbackExplanation: "When someone says 『どうぞ よろしく おねがいします』, reply with: 『こちらこそ よろしく おねがいします』.",
      };
    }

    case 'gratitude_reply': {
      if (
        normalized.includes('どういたしまして') ||
        normalized === 'いえ' ||
        normalized === 'いいえ' ||
        normalized.includes('こちらこそ')
      ) {
        return {
          isValid: true,
          isLogical: true,
          isGrammatical: true,
          normalizedSpoken: normalized,
          headline: 'せいかい！ かんしゃに こたえられました！',
          feedbackExplanation: "Polite modesty! 『いいえ、どういたしまして』 or 『いえ』 politely brushes off praise/gratitude with Japanese modesty.",
        };
      }
      return {
        isValid: false,
        isLogical: false,
        isGrammatical: false,
        normalizedSpoken: normalized,
        headline: 'どういたしまして と こたえましょう',
        feedbackExplanation: "When thanked with 『ありがとうございます！』, reply with: 『どういたしまして』 or 『いえ、どういたしまして』.",
      };
    }

    default:
      return {
        isValid: true,
        isLogical: true,
        isGrammatical: true,
        normalizedSpoken: normalized,
        headline: 'せいかい！',
        feedbackExplanation: 'Recognized spoken response!',
      };
  }
}
