import { 
  ExchangeItem, 
  ExchangeQuizQuestion, 
  ExchangeOption, 
  EXCHANGE_DATA,
  getQuestionDistractors 
} from '../data/exchangeData';
import { 
  getPhraseMastery, 
  getRecentPhrases, 
  recordRecentPhrases 
} from '../services/storageService';
import { getSpriteIdForItem } from '../data/spriteSheetData';

/**
 * Calculates adaptive weight and status for a phrase item.
 * User requirement: If something has been answered correctly 3-4 times,
 * assume it is learned and focus on other phrases, increasing the time
 * before it gets asked again from 1 day to 3 or 4 days.
 */
export function getPhraseAdaptiveProfile(item: ExchangeItem): {
  weight: number;
  status: 'unseen' | 'needs_practice' | 'proven' | 'review';
} {
  const mastery = getPhraseMastery();
  const recent = getRecentPhrases();
  const rec = mastery[item.id];

  if (!rec || rec.attempts === 0) {
    const isRecent = recent.includes(item.id);
    return {
      weight: isRecent ? 25 : 100,
      status: 'unseen',
    };
  }

  const isRecent = recent.includes(item.id);

  // If player made a mistake or low accuracy, top priority practice
  if (rec.consecutiveCorrect === 0 || rec.accuracy < 70) {
    return {
      weight: isRecent ? 80 : 160,
      status: 'needs_practice',
    };
  }

  // If answered correctly 3-4 times:
  if (rec.consecutiveCorrect >= 3 || (rec.correct >= 4 && rec.accuracy >= 80)) {
    const lastPracticedMs = new Date(rec.lastPracticed).getTime();
    const daysSince = !isNaN(lastPracticedMs) 
      ? (Date.now() - lastPracticedMs) / (1000 * 60 * 60 * 24)
      : 5;

    if (daysSince < 3) {
      // Defer for 3-4 days so learner focuses on other phrases
      return {
        weight: 4,
        status: 'proven',
      };
    } else {
      // 3 to 4+ days have passed: re-enter review pool for spaced retention
      return {
        weight: isRecent ? 15 : 50,
        status: 'review',
      };
    }
  }

  // Answered correctly 1-2 times
  return {
    weight: isRecent ? 20 : 70,
    status: 'review',
  };
}

/**
 * Weighted random pick from an array of items with weights
 */
function weightedSample<T>(candidates: { item: T; weight: number }[]): T {
  const totalWeight = candidates.reduce((sum, c) => sum + Math.max(1, c.weight), 0);
  let random = Math.random() * totalWeight;

  for (const c of candidates) {
    const w = Math.max(1, c.weight);
    if (random < w) {
      return c.item;
    }
    random -= w;
  }
  return candidates[0].item;
}

/**
 * Generates an adaptive, highly varied 10-question quiz for Exercise 6 & 7:
 * 1. STRICT SEMANTIC PATTERN DIVERSITY:
 *    Ensures NO two questions in the same session share the same pattern
 *    (e.g., never two "Where are you from?" or two "What time is it?").
 * 2. SUBJECT DIVERSITY:
 *    Varies subjects across father, mother, that man, that woman, older person,
 *    young person, self, colleague, teacher, student.
 * 3. ADAPTIVE SPACED REPETITION:
 *    Suppresses mastered phrases (3-4 correct answers) for 3-4 days.
 *    Focuses on unseen phrases and phrases with mistakes.
 * 4. BIDIRECTIONAL PRACTICE:
 *    Alternates ~50% standard (Question -> Reply) and
 *    ~50% reverse (Answer / Statement -> Find the Question).
 */
export function generateAdaptiveExchangeQuiz(
  mode: 'romaji' | 'hiragana',
  count = 10
): ExchangeQuizQuestion[] {
  const isRomaji = mode === 'romaji';

  // 1. Group all available items by semanticPattern
  const patternGroups: Record<string, ExchangeItem[]> = {};
  for (const item of EXCHANGE_DATA) {
    const pattern = item.semanticPattern || item.category;
    if (!patternGroups[pattern]) {
      patternGroups[pattern] = [];
    }
    patternGroups[pattern].push(item);
  }

  const allPatterns = Object.keys(patternGroups);

  // 2. Score every pattern group based on the average/max weight of its items
  const patternScores = allPatterns.map((pattern) => {
    const items = patternGroups[pattern];
    const itemProfiles = items.map((it) => ({
      item: it,
      profile: getPhraseAdaptiveProfile(it),
    }));
    const totalWeight = itemProfiles.reduce((sum, ip) => sum + ip.profile.weight, 0);
    const avgWeight = totalWeight / items.length;
    return {
      pattern,
      items: itemProfiles,
      avgWeight: Math.max(5, avgWeight),
    };
  });

  // Shuffle pattern order with weighting to pick diverse patterns
  const availablePatternScores = [...patternScores].sort(() => 0.5 - Math.random());
  
  // Pick distinct patterns up to count (default 10)
  const selectedItems: { item: ExchangeItem; status: 'unseen' | 'needs_practice' | 'proven' | 'review' }[] = [];
  const usedPatterns = new Set<string>();
  const usedSprites = new Set<string>();
  const subjectCounts: Record<string, number> = {};

  // First pass: Pick 1 item from distinct pattern groups
  for (let step = 0; step < count && availablePatternScores.length > 0; step++) {
    // Find candidate patterns not yet used
    const candidates = availablePatternScores.filter((p) => !usedPatterns.has(p.pattern));
    if (candidates.length === 0) break;

    // Pick a pattern weighted by urgency
    const chosenPatternGroup = weightedSample(
      candidates.map((c) => ({ item: c, weight: c.avgWeight }))
    );
    usedPatterns.add(chosenPatternGroup.pattern);

    // Within chosen pattern, pick item favoring unseen or mistakes, avoiding overused subjects & sprites
    const itemCandidates = chosenPatternGroup.items.map((entry) => {
      let w = entry.profile.weight;
      const subj = entry.item.subjectEntity;
      if (subj && (subjectCounts[subj] || 0) >= 2) {
        w = Math.max(1, Math.round(w * 0.2)); // discourage repeating same subject 3+ times
      }
      const sprite = getSpriteIdForItem(entry.item);
      if (usedSprites.has(sprite)) {
        w = Math.max(1, Math.round(w * 0.25)); // strongly prioritize unused visual scenes from 16-sprite sheet
      }
      return { item: entry, weight: w };
    });

    const chosenEntry = weightedSample(itemCandidates);
    selectedItems.push({
      item: chosenEntry.item,
      status: chosenEntry.profile.status,
    });

    const chosenSprite = getSpriteIdForItem(chosenEntry.item);
    usedSprites.add(chosenSprite);

    if (chosenEntry.item.subjectEntity) {
      subjectCounts[chosenEntry.item.subjectEntity] = (subjectCounts[chosenEntry.item.subjectEntity] || 0) + 1;
    }
  }

  // Fallback if fewer patterns than count: fill from remaining items with high adaptive weight
  if (selectedItems.length < count) {
    const selectedIds = new Set(selectedItems.map((s) => s.item.id));
    const remaining = EXCHANGE_DATA.filter((it) => !selectedIds.has(it.id))
      .map((it) => ({
        item: it,
        profile: getPhraseAdaptiveProfile(it),
      }))
      .sort((a, b) => b.profile.weight - a.profile.weight);

    for (const rem of remaining) {
      if (selectedItems.length >= count) break;
      selectedItems.push({
        item: rem.item,
        status: rem.profile.status,
      });
    }
  }

  // Record selected IDs into recent memory to avoid immediate consecutive repeats
  recordRecentPhrases(selectedItems.map((s) => s.item.id));

  // 3. Transform to ExchangeQuizQuestion with Bidirectional balancing
  return selectedItems.map((entry, index) => {
    const item = entry.item;

    // Reverse eligibility: question inquiry or standard daily dialogue
    const isEligibleForReverse = 
      item.promptRomaji.endsWith('ka?') || 
      item.promptRomaji.endsWith('ka') || 
      item.promptHiragana.endsWith('か？') || 
      item.promptHiragana.endsWith('か') ||
      item.category === 'age-numbers' ||
      item.category === 'countries-origin' ||
      item.category === 'languages' ||
      item.category === 'places-work' ||
      item.category === 'occupations' ||
      item.category === 'time-days' ||
      item.category === 'demonstratives' ||
      item.category === 'daily-inquiry';

    // Mix bidirectional practice: indices 1, 3, 5, 7, 9 test Answer -> Question
    const isReverse = isEligibleForReverse && (index % 2 === 1);

    if (isReverse) {
      // REVERSE DIRECTION: Prompt is THE ANSWER TO A QUESTION -> user chooses THE QUESTION
      const correctOption: ExchangeOption = {
        text: isRomaji ? item.promptRomaji : item.promptHiragana,
        hiraganaAudio: item.promptHiragana,
        isCorrect: true,
        englishMeaning: item.englishMeaning,
      };

      const qDistractors = getQuestionDistractors(item);
      const distractorOptions: ExchangeOption[] = qDistractors.map((d) => ({
        text: isRomaji ? d.romaji : d.hiragana,
        hiraganaAudio: d.hiragana,
        isCorrect: false,
        englishMeaning: d.english,
      }));

      const allOptions = [correctOption, ...distractorOptions].sort(() => 0.5 - Math.random());
      const correctIndex = allOptions.findIndex((opt) => opt.isCorrect);

      return {
        questionNumber: index + 1,
        item,
        direction: 'reply-to-question',
        directionBadge: 'Statement / Reply → Which question was asked?',
        directionInstruction: 'Select the Japanese question that leads to this reply',
        prompt: isRomaji ? item.correctRomaji : item.correctHiragana,
        promptAudio: item.correctHiragana,
        promptEnglish: item.correctEnglish,
        secondaryPrompt: item.correctEnglish,
        categoryLabel: item.categoryLabel,
        situationTitle: item.situationTitle,
        options: allOptions,
        correctOptionIndex: correctIndex,
        adaptiveStatus: entry.status,
        spriteId: getSpriteIdForItem(item),
      };
    } else {
      // STANDARD DIRECTION: Prompt is THE QUESTION -> user chooses THE REPLY
      const correctOption: ExchangeOption = {
        text: isRomaji ? item.correctRomaji : item.correctHiragana,
        hiraganaAudio: item.correctHiragana,
        isCorrect: true,
        englishMeaning: item.correctEnglish,
      };

      const distractorOptions: ExchangeOption[] = item.distractors.map((d) => ({
        text: isRomaji ? d.romaji : d.hiragana,
        hiraganaAudio: d.hiragana,
        isCorrect: false,
        englishMeaning: d.english,
      }));

      const allOptions = [correctOption, ...distractorOptions].sort(() => 0.5 - Math.random());
      const correctIndex = allOptions.findIndex((opt) => opt.isCorrect);

      return {
        questionNumber: index + 1,
        item,
        direction: 'question-to-reply',
        directionBadge: 'Question asked → Choose the correct reply',
        directionInstruction: 'Select the appropriate Japanese reply to this question',
        prompt: isRomaji ? item.promptRomaji : item.promptHiragana,
        promptAudio: item.promptHiragana,
        promptEnglish: item.englishMeaning,
        secondaryPrompt: item.englishMeaning,
        categoryLabel: item.categoryLabel,
        situationTitle: item.situationTitle,
        options: allOptions,
        correctOptionIndex: correctIndex,
        adaptiveStatus: entry.status,
        spriteId: getSpriteIdForItem(item),
      };
    }
  });
}
