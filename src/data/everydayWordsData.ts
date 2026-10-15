import { EverydayWord, QuizQuestion } from '../types';
import { shuffleArray } from './hiraganaData';
import { USER_VOCAB_DB } from './userVocabDb';

/**
 * STRICT USER VOCABULARY LIST FOR EXERCISES 3 & 4
 * Every single word here is sourced directly from USER_VOCAB_DB.
 * Absolutely NO unintroduced external words.
 */
export const EVERYDAY_WORDS: EverydayWord[] = USER_VOCAB_DB
  .filter(item => item.itemType === 'word')
  .map(item => ({
    id: item.id,
    romaji: item.romaji,
    kana: item.hiragana,
    english: item.english,
    category: item.category,
    iconName: item.iconName || 'book',
    isFromTextbook: item.batch === 1,
    originalKanji: item.kanji,
  }));

import { generateAdaptiveWordQuiz } from '../utils/adaptiveQuizEngine';

/**
 * Generates an adaptive succession of 10 questions for everyday words:
 * - Exercise 3: word-romaji-to-hiragana (shows picture/icon + Romaji, 3 Hiragana choices)
 * - Exercise 4: word-hiragana-to-romaji (shows picture/icon + Hiragana, 3 Romaji choices)
 * Prevents repeating the same words across consecutive rounds,
 * and prioritizes words player hasn't seen as often or still makes mistakes on.
 */
export function generateWordQuiz(
  exerciseType: 'word-romaji-to-hiragana' | 'word-hiragana-to-romaji',
  count = 10,
  targetWords = EVERYDAY_WORDS
): QuizQuestion[] {
  return generateAdaptiveWordQuiz(exerciseType, count, targetWords);
}
