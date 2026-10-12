import { PhraseItem } from '../data/phraseData';

/**
 * Japanese text normalizer and speech-recognition comparison utility.
 */

// Convert Katakana characters to Hiragana
export function katakanaToHiragana(text: string): string {
  return text.replace(/[\u30a1-\u30f6]/g, (match) => {
    const charCode = match.charCodeAt(0) - 0x60;
    return String.fromCharCode(charCode);
  });
}

// Strip spaces, punctuation, question marks, commas, full stops
export function cleanJapaneseText(text: string): string {
  if (!text) return '';
  return text
    .replace(/[、。！？\?!,\.\s\u3000\-_~〜]/g, '')
    .trim();
}

// Common Kanji-to-Hiragana dictionary for the curriculum phrases
const KANJI_TO_HIRAGANA_MAP: Record<string, string> = {
  // Common greetings & formulas
  'おはようございます': 'おはようございます',
  'お早うございます': 'おはようございます',
  'お早う': 'おはよう',
  'おはよう': 'おはよう',
  'こんにちは': 'こんにちは',
  '今日は': 'こんにちは',
  'こんばんは': 'こんばんは',
  '今晩は': 'こんばんは',
  'さようなら': 'さようなら',
  'さよなら': 'さようなら',
  '左様なら': 'さようなら',
  'じゃあまた': 'じゃあまた',
  'ではまた': 'ではまた',
  'またね': 'またね',
  'お先に失礼します': 'おさきにしつれいします',
  'お先に失礼いたします': 'おさきにしつれいいたします',
  'お先に失礼': 'おさきにしつれい',
  '失礼いたします': 'しつれいいたします',
  '失礼します': 'しつれいします',
  'お先に': 'おさきに',
  '失礼': 'しつれい',
  'どうもありがとうございます': 'どうもありがとうございます',
  '有難うございます': 'ありがとうございます',
  'ありがとうございます': 'ありがとうございます',
  'どうもありがとう': 'どうもありがとう',
  '有難う': 'ありがとう',
  'ありがとう': 'ありがとう',
  'どういたしまして': 'どういたしまして',
  'どう致しまして': 'どういたしまして',
  'はじめまして': 'はじめまして',
  '初めまして': 'はじめまして',
  'どうぞよろしくお願いします': 'どうぞよろしくおねがいします',
  'どうぞ宜しくお願いします': 'どうぞよろしくおねがいします',
  'よろしくお願いいたします': 'よろしくおねがいいたします',
  '宜しくお願いいたします': 'よろしくおねがいいたします',
  'よろしくお願いします': 'よろしくおねがいします',
  '宜しくお願いします': 'よろしくおねがいします',
  'どうぞよろしく': 'どうぞよろしく',
  'どうぞ宜しく': 'どうぞよろしく',
  'よろしく': 'よろしく',
  '宜しく': 'よろしく',
  'お願い': 'おねがい',
  '願い': 'ねがい',
  '致します': 'いたします',
  '致しまして': 'いたしまして',
  'すみません': 'すみません',
  '済みません': 'すみません',
  'お疲れ様でした': 'おつかれさまでした',
  'お疲れ様です': 'おつかれさまです',
  'お疲れ様': 'おつかれさま',
  'お名前': 'おなまえ',
  '名前': 'なまえ',
  '来ましたか': 'きましたか',
  '来ました': 'きました',
  '何のお仕事': 'なんのおしごと',
  '何のご職業': 'なんのごしょくぎょう',
  'お仕事': 'おしごと',
  '仕事': 'しごと',
  '会社員': 'かいしゃいん',
  '会社': 'かいしゃ',
  '学生': 'がくせい',
  '先生': 'せんせい',
  '医者': 'いしゃ',
  'お医者さん': 'おいしゃさん',
  '銀行員': 'ぎんこういん',
  '銀行': 'ぎんこう',
  '研究者': 'けんきゅうしゃ',
  '研究': 'けんきゅう',
  '何': 'なん',
  '方': 'かた',
  '何方': 'どなた',
  'どちら': 'どちら',
  '出身': 'しゅっしん',
  'はい': 'はい',
  'いいえ': 'いいえ',
  '否': 'いいえ',
  '家': 'いえ',
  'どうぞ': 'どうぞ',
  'こちらこそ': 'こちらこそ',
  'フランス': 'ふらんす',
  'エリック': 'えりっく',
  'エンジニア': 'えんじにあ',
  '私': 'わたし',
  '僕': 'ぼく',
  '俺': 'おれ',
  '日本': 'にほん',
  '日本人': 'にほんじん',
  '日本語': 'にほんご',
  '英語': 'えいご',
  'アメリカ': 'あめりか',
  'イギリス': 'いぎりす',
  '中国': 'ちゅうごく',
  '韓国': 'かんこく',
  'カナダ': 'かなだ',
  'ベトナム': 'べとなむ',
  'ブラジル': 'ぶらじる',
  '誰': 'だれ',
  '何歳': 'なんさい',
  '歳': 'さい',
  '大学': 'だいがく',
  '病院': 'びょういん',
  '元気': 'げんき',
  'お元気': 'おげんき',
  '赤': 'あか',
  '青': 'あお',
  '白': 'しろ',
  '黒': 'くろ',
  'ではありません': 'じゃありません',
  'じゃありません': 'じゃありません',
  // Common Japanese names in introductions
  '田中': 'たなか',
  '佐藤': 'さとう',
  '鈴木': 'すずき',
  '高橋': 'たかはし',
  '渡辺': 'わたなべ',
  '伊藤': 'いとう',
  '山本': 'やまもと',
  '中村': 'なかむら',
  '小林': 'こばやし',
  '加藤': 'かとう',
  '吉田': 'よしだ',
  '山田': 'やまだ',
  '佐々木': 'ささき',
  '桜': 'さくら',
};

// Sort entries once by length descending so longer compound phrases replace before subwords
const SORTED_KANJI_ENTRIES = Object.entries(KANJI_TO_HIRAGANA_MAP).sort(
  (a, b) => b[0].length - a[0].length
);

export function normalizeJapaneseForSpeech(text: string): string {
  let cleaned = cleanJapaneseText(text);
  cleaned = katakanaToHiragana(cleaned);

  // Substitute common Kanji compounds to Hiragana (longer matches first)
  for (const [kanji, hira] of SORTED_KANJI_ENTRIES) {
    if (cleaned.includes(kanji)) {
      cleaned = cleaned.replaceAll(kanji, hira);
    }
  }

  return cleaned;
}

/**
 * Calculate Levenshtein similarity between two strings (0.0 to 1.0)
 */
export function calculateSimilarity(s1: string, s2: string): number {
  if (s1 === s2) return 1.0;
  if (!s1 || !s2) return 0.0;

  const len1 = s1.length;
  const len2 = s2.length;
  const matrix: number[][] = [];

  for (let i = 0; i <= len1; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= len2; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1, // deletion
        matrix[i][j - 1] + 1, // insertion
        matrix[i - 1][j - 1] + cost // substitution
      );
    }
  }

  const distance = matrix[len1][len2];
  const maxLen = Math.max(len1, len2);
  return Math.max(0, (maxLen - distance) / maxLen);
}

export interface SpeechMatchResult {
  isMatch: boolean;
  similarity: number;
  normalizedSpoken: string;
  matchedVariation?: string;
}

/**
 * Compare spoken transcription against expected phrase
 */
export function checkSpeechMatch(spokenText: string, phrase: PhraseItem): SpeechMatchResult {
  const normSpoken = normalizeJapaneseForSpeech(spokenText);
  const targetHiragana = normalizeJapaneseForSpeech(phrase.hiragana);
  const cleanSpoken = cleanJapaneseText(spokenText);

  if (!normSpoken && !cleanSpoken) {
    return { isMatch: false, similarity: 0, normalizedSpoken: '' };
  }

  // 1. Direct match with original Kanji if present
  if (phrase.originalKanji) {
    const cleanKanji = cleanJapaneseText(phrase.originalKanji);
    if (cleanSpoken === cleanKanji || cleanSpoken.includes(cleanKanji) || cleanKanji.includes(cleanSpoken)) {
      return {
        isMatch: true,
        similarity: 1.0,
        normalizedSpoken: normSpoken,
        matchedVariation: phrase.originalKanji,
      };
    }
  }

  // 2. Direct or substring match with normalized Hiragana
  if (normSpoken === targetHiragana || normSpoken.includes(targetHiragana) || targetHiragana.includes(normSpoken)) {
    // If target is very short (e.g. いえ), require reasonable length match
    if (targetHiragana.length <= 3 && normSpoken.length > targetHiragana.length + 3) {
      // User said something too long, check similarity instead
    } else {
      return {
        isMatch: true,
        similarity: 1.0,
        normalizedSpoken: normSpoken,
        matchedVariation: phrase.hiragana,
      };
    }
  }

  // 3. Check against spoken keyword variations
  for (const keyword of phrase.spokenKeywords) {
    const cleanKeyword = cleanJapaneseText(keyword);
    if (cleanSpoken === cleanKeyword || cleanSpoken.includes(cleanKeyword) || cleanKeyword.includes(cleanSpoken)) {
      return {
        isMatch: true,
        similarity: 1.0,
        normalizedSpoken: normSpoken,
        matchedVariation: keyword,
      };
    }

    const normKeyword = normalizeJapaneseForSpeech(keyword);
    if (normSpoken === normKeyword || normSpoken.includes(normKeyword) || normKeyword.includes(normSpoken)) {
      return {
        isMatch: true,
        similarity: 0.95,
        normalizedSpoken: normSpoken,
        matchedVariation: keyword,
      };
    }
  }

  // 4. Check fuzzy similarity
  let highestSimilarity = calculateSimilarity(normSpoken, targetHiragana);

  for (const keyword of phrase.spokenKeywords) {
    const normKeyword = normalizeJapaneseForSpeech(keyword);
    const sim = calculateSimilarity(normSpoken, normKeyword);
    if (sim > highestSimilarity) {
      highestSimilarity = sim;
    }
  }

  // Consider a match if similarity is more than 60% (>= 0.60)
  const isMatch = highestSimilarity >= 0.60;

  return {
    isMatch,
    similarity: Math.round(highestSimilarity * 100) / 100,
    normalizedSpoken: normSpoken,
  };
}
