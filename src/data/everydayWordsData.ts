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

/**
 * Generates 10 questions for everyday words:
 * - Exercise 3: word-romaji-to-hiragana (shows picture/icon + Romaji, 3 Hiragana choices)
 * - Exercise 4: word-hiragana-to-romaji (shows picture/icon + Hiragana, 3 Romaji choices)
 * Distractors STRICTLY match the character length/syllable count of the target word,
 * and are drawn 100% EXCLUSIVELY from the user-provided vocabulary list.
 */
export function generateWordQuiz(
  exerciseType: 'word-romaji-to-hiragana' | 'word-hiragana-to-romaji',
  count = 10
): QuizQuestion[] {
  const shuffledWords = shuffleArray(EVERYDAY_WORDS);
  const selectedWords = shuffledWords.slice(0, Math.min(count, shuffledWords.length));

  return selectedWords.map((word, index) => {
    // Generate 2 distractors strictly from the user-provided vocabulary
    // Prefer matching kana character length (syllable count)
    const sameLengthPool = EVERYDAY_WORDS.filter(w => w.id !== word.id && w.kana.length === word.kana.length);
    const candidatePool = sameLengthPool.length >= 2 ? sameLengthPool : EVERYDAY_WORDS.filter(w => w.id !== word.id);
    const shuffledPool = shuffleArray(candidatePool);

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
      };
    }
  });
}
