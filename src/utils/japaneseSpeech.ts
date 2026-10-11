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
  'おはようございます': 'おはようございます',
  'お早うございます': 'おはようございます',
  'お早う': 'おはよう',
  'こんにちは': 'こんにちは',
  '今日はお': 'こんにちは',
  'こんばんは': 'こんばんは',
  '今晩は': 'こんばんは',
  'さようなら': 'さようなら',
  'さよなら': 'さようなら',
  'お先に失礼します': 'おさきにしつれいします',
  'お先に失礼': 'おさきにしつれい',
  'お先に': 'おさきに',
  '失礼します': 'しつれいします',
  '失礼': 'しつれい',
  '有難うございます': 'ありがとうございます',
  'ありがとうございます': 'ありがとうございます',
  '有難う': 'ありがとう',
  'ありがとう': 'ありがとう',
  '初めまして': 'はじめまして',
  'はじめまして': 'はじめまして',
  'お名前': 'おなまえ',
  '名前': 'なまえ',
  '来ましたか': 'きましたか',
  '来ました': 'きました',
  '仕事': 'しごと',
  '会社員': 'かいしゃいん',
  '学生': 'がくせい',
  '先生': 'せんせい',
  '医者': 'いしゃ',
  '銀行員': 'ぎんこういん',
  '研究者': 'けんきゅうしゃ',
  '何': 'なん',
  '何のお仕事': 'なんのおしごと',
  '何のご職業': 'なんのごしょくぎょう',
  '方': 'かた',
  '何方': 'どなた',
  'どちら': 'どちら',
  '出身': 'しゅっしん',
  'はい': 'はい',
  'いいえ': 'いいえ',
  'どういたしまして': 'どういたしまして',
  '宜しく': 'よろしく',
  'どうぞ': 'どうぞ',
  'こちらこそ': 'こちらこそ',
  'フランス': 'ふらんす',
  'エリック': 'えりっく',
  'エンジニア': 'えんじにあ',
};

export function normalizeJapaneseForSpeech(text: string): string {
  let cleaned = cleanJapaneseText(text);
  cleaned = katakanaToHiragana(cleaned);

  // Substitute common Kanji compounds to Hiragana
  for (const [kanji, hira] of Object.entries(KANJI_TO_HIRAGANA_MAP)) {
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

  if (!normSpoken) {
    return { isMatch: false, similarity: 0, normalizedSpoken: '' };
  }

  // 1. Direct or substring match with normalized Hiragana
  if (normSpoken === targetHiragana || normSpoken.includes(targetHiragana) || targetHiragana.includes(normSpoken)) {
    // If target is very short (e.g. いえ), require at least 80% similarity so random sounds don't trigger it
    if (targetHiragana.length <= 3 && normSpoken.length > targetHiragana.length + 2) {
      // User said something too long
    } else {
      return {
        isMatch: true,
        similarity: 1.0,
        normalizedSpoken: normSpoken,
        matchedVariation: phrase.hiragana,
      };
    }
  }

  // 2. Check against spoken keyword variations
  for (const keyword of phrase.spokenKeywords) {
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

  // 3. Check fuzzy similarity
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
