import { 
  HiraganaChar, 
  EverydayWord, 
  QuizQuestion, 
  ExerciseType, 
  CharacterMastery 
} from '../types';
import { HIRAGANA_CHARACTERS, shuffleArray } from '../data/hiraganaData';
import { EVERYDAY_WORDS } from '../data/everydayWordsData';
import { 
  getLocalMastery, 
  getRecentCharacters, 
  recordRecentCharacters, 
  getRecentWords, 
  recordRecentWords 
} from '../services/storageService';

/**
 * Calculates adaptive weight for an item (Hiragana character or word)
 * - Hasn't seen as often (unseen or 1 attempt): High priority (100)
 * - Still makes mistakes on (accuracy < 75%): Highest priority (160)
 * - Proven consistently good (accuracy >= 85% & attempts >= 2): Very low priority (4 - 8)
 * - Moderate / developing: (60)
 */
export function getAdaptiveWeight(key: string, mastery: CharacterMastery): {
  weight: number;
  status: 'unseen' | 'needs_practice' | 'proven' | 'review';
} {
  const stat = mastery[key];

  if (!stat || stat.attempts === 0) {
    return { weight: 100, status: 'unseen' };
  }

  if (stat.attempts === 1) {
    if (stat.correct === 1) {
      return { weight: 70, status: 'review' };
    } else {
      return { weight: 140, status: 'needs_practice' };
    }
  }

  // Attempts >= 2
  const accuracy = stat.accuracy;

  if (accuracy < 70) {
    // Top priority to practice mistakes
    return { weight: 160, status: 'needs_practice' };
  }

  if (accuracy < 80) {
    return { weight: 110, status: 'needs_practice' };
  }

  // High accuracy (>= 80%)
  if (stat.attempts >= 3 && accuracy === 100) {
    // Fully proven consistently good
    return { weight: 4, status: 'proven' };
  }

  if (accuracy >= 85) {
    // Proven consistently good
    return { weight: 8, status: 'proven' };
  }

  return { weight: 45, status: 'review' };
}

/**
 * Weighted random sampler without replacement
 */
function sampleWithoutReplacement<T>(
  candidates: T[],
  getKey: (item: T) => string,
  count: number,
  mastery: CharacterMastery
): { items: T[]; statuses: Record<string, 'unseen' | 'needs_practice' | 'proven' | 'review'> } {
  const pool = [...candidates];
  const selected: T[] = [];
  const statuses: Record<string, 'unseen' | 'needs_practice' | 'proven' | 'review'> = {};

  const targetCount = Math.min(count, pool.length);

  while (selected.length < targetCount && pool.length > 0) {
    // Compute weights for remaining candidates in pool
    const weights: number[] = [];
    let totalWeight = 0;

    for (const item of pool) {
      const key = getKey(item);
      const { weight, status } = getAdaptiveWeight(key, mastery);
      statuses[key] = status;
      weights.push(weight);
      totalWeight += weight;
    }

    // Roulette wheel selection
    const rand = Math.random() * totalWeight;
    let runningSum = 0;
    let chosenIndex = pool.length - 1;

    for (let i = 0; i < pool.length; i++) {
      runningSum += weights[i];
      if (rand <= runningSum) {
        chosenIndex = i;
        break;
      }
    }

    const [chosenItem] = pool.splice(chosenIndex, 1);
    selected.push(chosenItem);
  }

  return { items: selected, statuses };
}

/**
 * Generates an adaptive, non-repeating Hiragana quiz for Exercises 1 & 2.
 * - Prevents the same characters (e.g. 'i') from appearing repeatedly in consecutive quizzes
 * - Guarantees 10 unique characters per quiz
 * - Heavily prioritizes characters with mistakes and characters not seen as often
 * - Suppresses characters player has proven consistently good at
 */
export function generateAdaptiveKanaQuiz(
  exerciseType: 'hiragana-to-romaji' | 'romaji-to-hiragana',
  count = 10,
  targetCharacters = HIRAGANA_CHARACTERS
): QuizQuestion[] {
  const mastery = getLocalMastery();
  const recentKanaList = getRecentCharacters();

  // 1. Filter out recently tested characters to prevent immediate repetition
  const nonRecent = targetCharacters.filter(c => !recentKanaList.includes(c.kana));

  let candidatePool: HiraganaChar[] = [];

  if (nonRecent.length >= count) {
    // We have plenty of fresh characters that were NOT tested recently
    candidatePool = nonRecent;
  } else {
    // If not enough fresh characters, take all fresh ones and top up with
    // characters from the recent list that were seen farthest in the past
    const recentSortedOldest = [...recentKanaList].reverse();
    const supplementChars: HiraganaChar[] = [];

    for (const kana of recentSortedOldest) {
      if (supplementChars.length + nonRecent.length >= count) break;
      const found = targetCharacters.find(c => c.kana === kana);
      if (found && !nonRecent.some(n => n.kana === found.kana) && !supplementChars.some(s => s.kana === found.kana)) {
        supplementChars.push(found);
      }
    }

    candidatePool = [...nonRecent, ...supplementChars];
    // Fallback if needed
    if (candidatePool.length < count) {
      candidatePool = targetCharacters;
    }
  }

  // 2. Sample 10 unique characters adaptively based on mastery
  const { items: selectedChars, statuses } = sampleWithoutReplacement(
    candidatePool,
    c => c.kana,
    count,
    mastery
  );

  // 3. Record selected characters in recent history
  recordRecentCharacters(selectedChars.map(c => c.kana));

  // 4. Build quiz questions with quality distractors
  return selectedChars.map((char, index) => {
    const pool = HIRAGANA_CHARACTERS.filter(c => c.kana !== char.kana);
    const shuffledPool = shuffleArray(pool);
    const adaptiveStatus = statuses[char.kana] || 'unseen';

    if (exerciseType === 'hiragana-to-romaji') {
      const correctOption = char.romaji;
      const distractor1 = shuffledPool[0].romaji;
      const distractor2 = shuffledPool.find(c => c.romaji !== distractor1 && c.romaji !== correctOption)?.romaji || shuffledPool[1].romaji;
      const options = shuffleArray([correctOption, distractor1, distractor2]);

      return {
        questionNumber: index + 1,
        character: char,
        prompt: char.kana,
        promptType: 'kana' as const,
        options,
        correctOption,
        adaptiveStatus,
      };
    } else {
      // romaji-to-hiragana
      const correctOption = char.kana;
      const distractor1 = shuffledPool[0].kana;
      const distractor2 = shuffledPool.find(c => c.kana !== distractor1 && c.kana !== correctOption)?.kana || shuffledPool[1].kana;
      const options = shuffleArray([correctOption, distractor1, distractor2]);

      return {
        questionNumber: index + 1,
        character: char,
        prompt: char.romaji,
        promptType: 'romaji' as const,
        options,
        correctOption,
        adaptiveStatus,
      };
    }
  });
}

/**
 * Generates an adaptive, non-repeating Everyday Words quiz for Exercises 3 & 4.
 * - Prevents the same words from appearing repeatedly in consecutive quizzes
 * - Guarantees 10 unique words per quiz
 * - Heavily prioritizes words with mistakes and words not seen as often
 * - Suppresses words player has proven consistently good at
 */
export function generateAdaptiveWordQuiz(
  exerciseType: 'word-romaji-to-hiragana' | 'word-hiragana-to-romaji',
  count = 10,
  targetWords = EVERYDAY_WORDS
): QuizQuestion[] {
  const mastery = getLocalMastery();
  const recentWordsList = getRecentWords();

  // 1. Filter out recently tested words to prevent immediate repetition
  const nonRecent = targetWords.filter(
    w => !recentWordsList.includes(w.id) && !recentWordsList.includes(w.kana)
  );

  let candidatePool: EverydayWord[] = [];

  if (nonRecent.length >= count) {
    candidatePool = nonRecent;
  } else {
    const recentSortedOldest = [...recentWordsList].reverse();
    const supplementWords: EverydayWord[] = [];

    for (const idOrKana of recentSortedOldest) {
      if (supplementWords.length + nonRecent.length >= count) break;
      const found = targetWords.find(w => w.id === idOrKana || w.kana === idOrKana);
      if (found && !nonRecent.some(n => n.id === found.id) && !supplementWords.some(s => s.id === found.id)) {
        supplementWords.push(found);
      }
    }

    candidatePool = [...nonRecent, ...supplementWords];
    if (candidatePool.length < count) {
      candidatePool = targetWords;
    }
  }

  // 2. Sample 10 unique words adaptively based on mastery
  const { items: selectedWords, statuses } = sampleWithoutReplacement(
    candidatePool,
    w => w.kana,
    count,
    mastery
  );

  // 3. Record selected words in recent history
  recordRecentWords(selectedWords.map(w => w.id));

  // 4. Build quiz questions with length-matched distractors
  return selectedWords.map((word, index) => {
    const sameLengthPool = targetWords.filter(w => w.id !== word.id && w.kana.length === word.kana.length);
    const candidateDistractors = sameLengthPool.length >= 2 ? sameLengthPool : targetWords.filter(w => w.id !== word.id);
    const shuffledPool = shuffleArray(candidateDistractors);
    const adaptiveStatus = statuses[word.kana] || 'unseen';

    if (exerciseType === 'word-romaji-to-hiragana') {
      const correctOption = word.kana;
      const distractor1 = shuffledPool[0].kana;
      const distractor2 = shuffledPool.find(w => w.kana !== distractor1 && w.kana !== correctOption)?.kana || shuffledPool[1].kana;
      const options = shuffleArray([correctOption, distractor1, distractor2]);

      return {
        questionNumber: index + 1,
        word,
        prompt: word.romaji,
        secondaryPrompt: word.english,
        promptType: 'romaji',
        options,
        correctOption,
        adaptiveStatus,
      };
    } else {
      // word-hiragana-to-romaji
      const correctOption = word.romaji;
      const distractor1 = shuffledPool[0].romaji;
      const distractor2 = shuffledPool.find(w => w.romaji !== distractor1 && w.romaji !== correctOption)?.romaji || shuffledPool[1].romaji;
      const options = shuffleArray([correctOption, distractor1, distractor2]);

      return {
        questionNumber: index + 1,
        word,
        prompt: word.kana,
        secondaryPrompt: word.english,
        promptType: 'kana',
        options,
        correctOption,
        adaptiveStatus,
      };
    }
  });
}
