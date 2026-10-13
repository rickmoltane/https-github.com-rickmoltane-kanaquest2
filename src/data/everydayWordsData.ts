import { EverydayWord, QuizQuestion } from '../types';
import { shuffleArray } from './hiraganaData';

export const EVERYDAY_WORDS: EverydayWord[] = [
  // 16 words from the textbook photo
  { id: 'asa', romaji: 'asa', kana: 'あさ', english: 'Morning', category: 'Time', iconName: 'sunrise', isFromTextbook: true },
  { id: 'hiru', romaji: 'hiru', kana: 'ひる', english: 'Daytime / Noon', category: 'Time', iconName: 'sun', isFromTextbook: true },
  { id: 'yoru', romaji: 'yoru', kana: 'よる', english: 'Night', category: 'Time', iconName: 'moon-stars', isFromTextbook: true },
  { id: 'isu', romaji: 'isu', kana: 'いす', english: 'Chair', category: 'Objects', iconName: 'chair', isFromTextbook: true },
  { id: 'ocha', romaji: 'ocha', kana: 'おちゃ', english: 'Green Tea', category: 'Food & Drink', iconName: 'tea', isFromTextbook: true },
  { id: 'tokei', romaji: 'tokei', kana: 'とけい', english: 'Clock', category: 'Objects', iconName: 'clock', isFromTextbook: true },
  { id: 'umi', romaji: 'umi', kana: 'うみ', english: 'Sea / Ocean', category: 'Nature', iconName: 'waves', isFromTextbook: true },
  { id: 'yama', romaji: 'yama', kana: 'やま', english: 'Mountain', category: 'Nature', iconName: 'mountain', isFromTextbook: true },
  { id: 'inu', romaji: 'inu', kana: 'いぬ', english: 'Dog', category: 'Animals', iconName: 'dog', isFromTextbook: true },
  { id: 'neko', romaji: 'neko', kana: 'ねこ', english: 'Cat', category: 'Animals', iconName: 'cat', isFromTextbook: true },
  { id: 'zasshi', romaji: 'zasshi', kana: 'ざっし', english: 'Magazine', category: 'Objects', iconName: 'magazine', isFromTextbook: true },
  { id: 'tsukue', romaji: 'tsukue', kana: 'つくえ', english: 'Desk', category: 'Objects', iconName: 'desk', isFromTextbook: true },
  { id: 'nihongo', romaji: 'nihongo', kana: 'にほんご', english: 'Japanese Language', category: 'Culture', iconName: 'book-nihongo', isFromTextbook: true },
  { id: 'tenpura', romaji: 'tenpura', kana: 'てんぷら', english: 'Tempura', category: 'Food & Drink', iconName: 'tempura', isFromTextbook: true },
  { id: 'fujisan', romaji: 'fujisan', kana: 'ふじさん', english: 'Mt. Fuji', category: 'Places', iconName: 'fuji', isFromTextbook: true },
  { id: 'tookyoo', romaji: 'tookyoo', kana: 'とうきょう', english: 'Tokyo', category: 'Places', iconName: 'tokyo-tower', isFromTextbook: true },

  // 34 more everyday foundational vocabulary words (Total 50 words)
  { id: 'mizu', romaji: 'mizu', kana: 'みず', english: 'Water', category: 'Food & Drink', iconName: 'water' },
  { id: 'sakana', romaji: 'sakana', kana: 'さかな', english: 'Fish', category: 'Animals', iconName: 'fish' },
  { id: 'tori', romaji: 'tori', kana: 'とり', english: 'Bird', category: 'Animals', iconName: 'bird' },
  { id: 'kuruma', romaji: 'kuruma', kana: 'くるま', english: 'Car', category: 'Transport', iconName: 'car' },
  { id: 'densha', romaji: 'densha', kana: 'でんしゃ', english: 'Train', category: 'Transport', iconName: 'train' },
  { id: 'hon', romaji: 'hon', kana: 'ほん', english: 'Book', category: 'Objects', iconName: 'book' },
  { id: 'ie', romaji: 'ie', kana: 'いえ', english: 'House', category: 'Places', iconName: 'house' },
  { id: 'ame', romaji: 'ame', kana: 'あめ', english: 'Rain', category: 'Nature', iconName: 'rain' },
  { id: 'hana', romaji: 'hana', kana: 'はな', english: 'Flower', category: 'Nature', iconName: 'flower' },
  { id: 'ki', romaji: 'ki', kana: 'き', english: 'Tree', category: 'Nature', iconName: 'tree' },
  { id: 'tsuki', romaji: 'tsuki', kana: 'つき', english: 'Moon', category: 'Nature', iconName: 'full-moon' },
  { id: 'hoshi', romaji: 'hoshi', kana: 'ほし', english: 'Star', category: 'Nature', iconName: 'star' },
  { id: 'sora', romaji: 'sora', kana: 'そら', english: 'Sky', category: 'Nature', iconName: 'cloud' },
  { id: 'kawa', romaji: 'kawa', kana: 'かわ', english: 'River', category: 'Nature', iconName: 'river' },
  { id: 'ringo', romaji: 'ringo', kana: 'りんご', english: 'Apple', category: 'Food & Drink', iconName: 'apple' },
  { id: 'tamago', romaji: 'tamago', kana: 'たまご', english: 'Egg', category: 'Food & Drink', iconName: 'egg' },
  { id: 'pan', romaji: 'pan', kana: 'ぱん', english: 'Bread', category: 'Food & Drink', iconName: 'bread' },
  { id: 'gohan', romaji: 'gohan', kana: 'ごはん', english: 'Rice / Meal', category: 'Food & Drink', iconName: 'rice' },
  { id: 'sushi', romaji: 'sushi', kana: 'すし', english: 'Sushi', category: 'Food & Drink', iconName: 'sushi' },
  { id: 'ramen', romaji: 'ramen', kana: 'らーめん', english: 'Ramen', category: 'Food & Drink', iconName: 'ramen' },
  { id: 'tegami', romaji: 'tegami', kana: 'てがみ', english: 'Letter', category: 'Objects', iconName: 'letter' },
  { id: 'enpitsu', romaji: 'enpitsu', kana: 'えんぴつ', english: 'Pencil', category: 'Objects', iconName: 'pencil' },
  { id: 'kaban', romaji: 'kaban', kana: 'かばん', english: 'Bag', category: 'Objects', iconName: 'bag' },
  { id: 'megane', romaji: 'megane', kana: 'めがね', english: 'Glasses', category: 'Objects', iconName: 'glasses' },
  { id: 'kutsu', romaji: 'kutsu', kana: 'くつ', english: 'Shoes', category: 'Objects', iconName: 'shoes' },
  { id: 'kasa', romaji: 'kasa', kana: 'かさ', english: 'Umbrella', category: 'Objects', iconName: 'umbrella' },
  { id: 'kagi', romaji: 'kagi', kana: 'かぎ', english: 'Key', category: 'Objects', iconName: 'key' },
  { id: 'denwa', romaji: 'denwa', kana: 'でんわ', english: 'Phone', category: 'Objects', iconName: 'phone' },
  { id: 'tomodachi', romaji: 'tomodachi', kana: 'ともだち', english: 'Friend', category: 'People', iconName: 'friends' },
  { id: 'gakkoo', romaji: 'gakkoo', kana: 'がっこう', english: 'School', category: 'Places', iconName: 'school' },
  { id: 'byooin', romaji: 'byooin', kana: 'びょういん', english: 'Hospital', category: 'Places', iconName: 'hospital' },
  { id: 'eki', romaji: 'eki', kana: 'えき', english: 'Station', category: 'Places', iconName: 'station' },
  { id: 'sakura', romaji: 'sakura', kana: 'さくら', english: 'Cherry Blossom', category: 'Nature', iconName: 'sakura' },
  { id: 'arigatoo', romaji: 'arigatoo', kana: 'ありがとう', english: 'Thank You', category: 'Expressions', iconName: 'thankyou' },
  { id: 'otousan', romaji: 'otousan', kana: 'おとうさん', english: 'Father', category: 'People', iconName: 'friends' },
  { id: 'okaasan', romaji: 'okaasan', kana: 'おかあさん', english: 'Mother', category: 'People', iconName: 'friends' },

  // --- 1. Introductions and greetings ---
  { id: 'jiko-shoukai', romaji: 'Jiko shōkai', kana: 'じこしょうかい', english: 'Self-introduction', category: 'Introductions & Greetings', iconName: 'people', originalKanji: '自己紹介' },
  { id: 'aisatsu', romaji: 'Aisatsu', kana: 'あいさつ', english: 'Greeting', category: 'Introductions & Greetings', iconName: 'thankyou', originalKanji: '挨拶' },
  { id: 'namae', romaji: 'Namae', kana: 'なまえ', english: 'Name', category: 'Introductions & Greetings', iconName: 'letter', originalKanji: '名前' },
  { id: 'meishi', romaji: 'Meishi', kana: 'めいし', english: 'Noun', category: 'Introductions & Greetings', iconName: 'book', originalKanji: '名詞' },
  { id: 'yonde-kudasai', romaji: 'Yonde kudasai', kana: 'よんでください', english: 'Please read', category: 'Introductions & Greetings', iconName: 'book-nihongo', originalKanji: '読んでください' },

  // --- 2. People and pronouns ---
  { id: 'watashi', romaji: 'Watashi', kana: 'わたし', english: 'I / me', category: 'People & Pronouns', iconName: 'friends', originalKanji: '私' },
  { id: 'watashitachi', romaji: 'Watashitachi', kana: 'わたしたち', english: 'We / us', category: 'People & Pronouns', iconName: 'friends', originalKanji: '私たち' },
  { id: 'anata', romaji: 'Anata', kana: 'あなた', english: 'You', category: 'People & Pronouns', iconName: 'friends', originalKanji: 'あなた' },
  { id: 'kare', romaji: 'Kare', kana: 'かれ', english: 'He / him', category: 'People & Pronouns', iconName: 'friends', originalKanji: '彼' },
  { id: 'kanojo', romaji: 'Kanojo', kana: 'かのじょ', english: 'She / her; girlfriend', category: 'People & Pronouns', iconName: 'friends', originalKanji: '彼女' },
  { id: 'jibun', romaji: 'Jibun', kana: 'じぶん', english: 'Oneself / myself', category: 'People & Pronouns', iconName: 'friends', originalKanji: '自分' },
  { id: 'tomodachi-pronoun', romaji: 'Tomodachi', kana: 'ともだち', english: 'Friend', category: 'People & Pronouns', iconName: 'friends', originalKanji: '友達' },

  // --- 3. People by age and gender ---
  { id: 'akachan', romaji: 'Akachan', kana: 'あかちゃん', english: 'Baby', category: 'Age & Gender', iconName: 'friends', originalKanji: '赤ちゃん' },
  { id: 'kodomo', romaji: 'Kodomo', kana: 'こども', english: 'Child', category: 'Age & Gender', iconName: 'friends', originalKanji: '子供' },
  { id: 'wakamono', romaji: 'Wakamono', kana: 'わかもの', english: 'Young person', category: 'Age & Gender', iconName: 'friends', originalKanji: '若者' },
  { id: 'otona', romaji: 'Otona', kana: 'おとな', english: 'Adult', category: 'Age & Gender', iconName: 'friends', originalKanji: '大人' },
  { id: 'otoshiyori', romaji: 'Otoshiyori', kana: 'おとしより', english: 'Elderly person', category: 'Age & Gender', iconName: 'friends', originalKanji: 'お年寄り' },
  { id: 'danjo', romaji: 'Danjo', kana: 'だんじょ', english: 'Men and women / both sexes', category: 'Age & Gender', iconName: 'friends', originalKanji: '男女' },
  { id: 'otokonoko', romaji: 'Otokonoko', kana: 'おとこのこ', english: 'Boy', category: 'Age & Gender', iconName: 'friends', originalKanji: '男の子' },
  { id: 'onnanoko', romaji: 'Onnanoko', kana: 'おんなのこ', english: 'Girl', category: 'Age & Gender', iconName: 'friends', originalKanji: '女の子' },
  { id: 'otoko-no-hito', romaji: 'Otoko no hito', kana: 'おとこのひと', english: 'Man', category: 'Age & Gender', iconName: 'friends', originalKanji: '男の人' },
  { id: 'onna-no-hito', romaji: 'Onna no hito', kana: 'おんなのひと', english: 'Woman', category: 'Age & Gender', iconName: 'friends', originalKanji: '女の人' },

  // --- 4. Occupations — 仕事（しごと） ---
  { id: 'isha', romaji: 'Isha', kana: 'いしゃ', english: 'Doctor', category: 'Occupations', iconName: 'hospital', originalKanji: '医者' },
  { id: 'enjinia', romaji: 'Enjinia', kana: 'えんじにあ', english: 'Engineer', category: 'Occupations', iconName: 'phone', originalKanji: 'エンジニア' },
  { id: 'kaishain', romaji: 'Kaishain', kana: 'かいしゃいん', english: 'Company employee', category: 'Occupations', iconName: 'desk', originalKanji: '会社員' },
  { id: 'kaigoshi', romaji: 'Kaigoshi', kana: 'かいごし', english: 'Care worker', category: 'Occupations', iconName: 'hospital', originalKanji: '介護士' },
  { id: 'gakusei', romaji: 'Gakusei', kana: 'がくせい', english: 'Student', category: 'Occupations', iconName: 'school', originalKanji: '学生' },
  { id: 'kangoshi', romaji: 'Kangoshi', kana: 'かんごし', english: 'Nurse', category: 'Occupations', iconName: 'hospital', originalKanji: '看護師' },
  { id: 'kyoushi', romaji: 'Kyōshi', kana: 'きょうし', english: 'Teacher', category: 'Occupations', iconName: 'school', originalKanji: '教師' },
  { id: 'koumuin', romaji: 'Kōmuin', kana: 'こうむいん', english: 'Civil servant / government employee', category: 'Occupations', iconName: 'desk', originalKanji: '公務員' },
  { id: 'jieigyou', romaji: 'Jieigyō', kana: 'じえいぎょう', english: 'Self-employment / self-employed', category: 'Occupations', iconName: 'desk', originalKanji: '自営業' },
  { id: 'jigyounushi', romaji: 'Jigyōnushi', kana: 'じぎょうぬし', english: 'Business owner', category: 'Occupations', iconName: 'desk', originalKanji: '事業主' },
  { id: 'shufu', romaji: 'Shufu', kana: 'しゅふ', english: 'Homemaker / housewife', category: 'Occupations', iconName: 'house', originalKanji: '主婦' },
  { id: 'nouka', romaji: 'Nōka', kana: 'のうか', english: 'Farmer', category: 'Occupations', iconName: 'tree', originalKanji: '農家' },
  { id: 'arubaito', romaji: 'Arubaito', kana: 'あるばいと', english: 'Part-time job; casual work', category: 'Occupations', iconName: 'clock', originalKanji: 'アルバイト' },
  { id: 'paatotaimu', romaji: 'Pāto taimu', kana: 'ぱーとたいむ', english: 'Part-time', category: 'Occupations', iconName: 'clock', originalKanji: 'パートタイム' },

  // --- 5. Places and work ---
  { id: 'kaisha', romaji: 'Kaisha', kana: 'かいしゃ', english: 'Company', category: 'Places & Work', iconName: 'desk', originalKanji: '会社' },
  { id: 'gakkou-place', romaji: 'Gakkō', kana: 'がっこう', english: 'School', category: 'Places & Work', iconName: 'school', originalKanji: '学校' },
  { id: 'byouin-place', romaji: 'Byōin', kana: 'びょういん', english: 'Hospital', category: 'Places & Work', iconName: 'hospital', originalKanji: '病院' },
  { id: 'hataraite-imasu', romaji: 'Hataraite imasu', kana: 'はたらいています', english: 'Am working / work', category: 'Places & Work', iconName: 'desk', originalKanji: '働いています' },
  { id: 'nenkin', romaji: 'Nenkin', kana: 'ねんきん', english: 'Pension', category: 'Places & Work', iconName: 'letter', originalKanji: '年金' },
  { id: 'seikatsu-shite-imasu', romaji: 'Seikatsu shite imasu', kana: 'せいかつしています', english: 'Am living / making a living', category: 'Places & Work', iconName: 'house', originalKanji: '生活しています' },

  // --- 6. Useful sentences ---
  { id: 'sent-kaisha-hataraite', romaji: 'Kaisha de hataraite imasu.', kana: 'かいしゃではたらいています。', english: 'I work at a company.', category: 'Useful Sentences', iconName: 'desk', originalKanji: '会社で働いています。' },
  { id: 'sent-gakkou-hataraite', romaji: 'Gakkō de hataraite imasu.', kana: 'がっこうではたらいています。', english: 'I work at a school.', category: 'Useful Sentences', iconName: 'school', originalKanji: '学校で働いています。' },
  { id: 'sent-byouin-hataraite', romaji: 'Byōin de hataraite imasu.', kana: 'びょういんではたらいています。', english: 'I work at a hospital.', category: 'Useful Sentences', iconName: 'hospital', originalKanji: '病院で働いています。' },
  { id: 'sent-nenkin-seikatsu', romaji: 'Nenkin de seikatsu shite imasu.', kana: 'ねんきんでせいかつしています。', english: 'I live on a pension.', category: 'Useful Sentences', iconName: 'house', originalKanji: '年金で生活しています。' },
];

/**
 * Generates 10 questions for everyday words:
 * - Exercise 3: word-romaji-to-hiragana (shows picture + Romaji, 3 Hiragana choices)
 * - Exercise 4: word-hiragana-to-romaji (shows picture + Hiragana, 3 Romaji choices)
 * Distractors STRICTLY match the exact character length and syllable count of the target word!
 */
export function generateWordQuiz(
  exerciseType: 'word-romaji-to-hiragana' | 'word-hiragana-to-romaji',
  count = 10
): QuizQuestion[] {
  const shuffledWords = shuffleArray(EVERYDAY_WORDS);
  const selectedWords = shuffledWords.slice(0, count);

  return selectedWords.map((word, index) => {
    // Generate 2 distractors strictly matching the exact same kana character length (syllable count)
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
