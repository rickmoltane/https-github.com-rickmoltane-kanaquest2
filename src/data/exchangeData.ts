export interface ExchangeItem {
  id: string;
  category: 'greetings' | 'introductions' | 'origin' | 'occupation' | 'courtesy' | 'parting' | 'meals' | 'places-work' | 'sentences';
  categoryLabel: string;
  situationTitle: string;
  englishMeaning: string;
  promptSpeaker?: string;

  // Prompt / Question
  promptRomaji: string;
  promptHiragana: string;

  // Correct Reply
  correctRomaji: string;
  correctHiragana: string;
  correctEnglish: string;

  // Distractors (strictly 2 distractors so there are always exactly 3 options)
  distractors: [
    { romaji: string; hiragana: string; english: string },
    { romaji: string; hiragana: string; english: string }
  ];
}

export const EXCHANGE_DATA: ExchangeItem[] = [
  // 1. Morning Greeting
  {
    id: 'exch-1',
    category: 'greetings',
    categoryLabel: 'Everyday Greetings',
    situationTitle: 'Morning Greeting at School or Work',
    englishMeaning: 'Someone greets you in the morning: "Good morning!"',
    promptSpeaker: 'Coworker',
    promptRomaji: 'Ohayō gozaimasu!',
    promptHiragana: 'おはようございます！',
    correctRomaji: 'Ohayō gozaimasu!',
    correctHiragana: 'おはようございます！',
    correctEnglish: 'Good morning!',
    distractors: [
      { romaji: 'Konbanwa!', hiragana: 'こんばんは！', english: 'Good evening!' },
      { romaji: 'Oyasuminasai.', hiragana: 'おやすみなさい。', english: 'Good night.' },
    ],
  },

  // 2. Daytime Greeting
  {
    id: 'exch-2',
    category: 'greetings',
    categoryLabel: 'Everyday Greetings',
    situationTitle: 'Meeting in the Afternoon',
    englishMeaning: 'A neighbor greets you in the afternoon: "Hello!"',
    promptSpeaker: 'Neighbor',
    promptRomaji: 'Konnichiwa!',
    promptHiragana: 'こんにちは！',
    correctRomaji: 'Konnichiwa!',
    correctHiragana: 'こんにちは！',
    correctEnglish: 'Hello!',
    distractors: [
      { romaji: 'Sayōnara.', hiragana: 'さようなら。', english: 'Goodbye.' },
      { romaji: 'Itadakimasu!', hiragana: 'いただきます！', english: 'Let’s eat!' },
    ],
  },

  // 3. Evening Greeting
  {
    id: 'exch-3',
    category: 'greetings',
    categoryLabel: 'Everyday Greetings',
    situationTitle: 'Encounter After Sunset',
    englishMeaning: 'Meeting someone at dusk: "Good evening!"',
    promptSpeaker: 'Store Clerk',
    promptRomaji: 'Konbanwa!',
    promptHiragana: 'こんばんは！',
    correctRomaji: 'Konbanwa!',
    correctHiragana: 'こんばんは！',
    correctEnglish: 'Good evening!',
    distractors: [
      { romaji: 'Ohayō gozaimasu!', hiragana: 'おはようございます！', english: 'Good morning!' },
      { romaji: 'Gochisōsama deshita.', hiragana: 'ごちそうさまでした。', english: 'Thank you for the meal.' },
    ],
  },

  // 4. Gratitude
  {
    id: 'exch-4',
    category: 'courtesy',
    categoryLabel: 'Courtesy & Gratitude',
    situationTitle: 'Someone Expresses Thanks',
    englishMeaning: 'A friend thanks you: "Thank you very much!"',
    promptSpeaker: 'Friend',
    promptRomaji: 'Arigatō gozaimasu!',
    promptHiragana: 'ありがとうございます！',
    correctRomaji: 'Dō itashimashite.',
    correctHiragana: 'どういたしまして。',
    correctEnglish: 'You are welcome.',
    distractors: [
      { romaji: 'Sayōnara.', hiragana: 'さようなら。', english: 'Goodbye.' },
      { romaji: 'Itadakimasu.', hiragana: 'いただきます。', english: 'Let’s eat.' },
    ],
  },

  // 5. Leaving Work / Office
  {
    id: 'exch-5',
    category: 'parting',
    categoryLabel: 'Workplace Courtesy',
    situationTitle: 'Colleague Leaving the Office First',
    englishMeaning: 'Coworker bows to leave: "Excuse me for leaving before you."',
    promptSpeaker: 'Colleague',
    promptRomaji: 'Osaki ni shitsurei shimasu.',
    promptHiragana: 'おさきにしつれいします。',
    correctRomaji: 'Otsukaresama deshita.',
    correctHiragana: 'おつかれさまでした。',
    correctEnglish: 'Thank you for your hard work today.',
    distractors: [
      { romaji: 'Hajimemashite.', hiragana: 'はじめまして。', english: 'Nice to meet you.' },
      { romaji: 'Dō itashimashite.', hiragana: 'どういたしまして。', english: 'You are welcome.' },
    ],
  },

  // 6. First Meeting / Introducing Name
  {
    id: 'exch-6',
    category: 'introductions',
    categoryLabel: 'Self Introduction',
    situationTitle: 'First Meeting at a Gathering',
    englishMeaning: 'New acquaintance: "Nice to meet you. I am Eric. What is your name?"',
    promptSpeaker: 'Eric',
    promptRomaji: 'Hajimemashite. Erikku desu. O-namae wa?',
    promptHiragana: 'はじめまして。えりっくです。おなまえは？',
    correctRomaji: 'Hajimemashite, Tanaka desu. Dōzo yoroshiku.',
    correctHiragana: 'はじめまして、たなかです。どうぞよろしく。',
    correctEnglish: 'Nice to meet you, I am Tanaka. Pleased to meet you.',
    distractors: [
      { romaji: 'Kaishain ja arimasen.', hiragana: 'かいしゃいんじゃありません。', english: 'I am not an employee.' },
      { romaji: 'Furansu kara kimashita.', hiragana: 'ふらんすからきました。', english: 'I came from France.' },
    ],
  },

  // 7. Polite Pleasure to Meet
  {
    id: 'exch-7',
    category: 'introductions',
    categoryLabel: 'Self Introduction',
    situationTitle: 'Concluding an Introduction',
    englishMeaning: 'Partner bows: "Please treat me favorably."',
    promptSpeaker: 'Partner',
    promptRomaji: 'Dōzo yoroshiku onegaishimasu.',
    promptHiragana: 'どうぞよろしくおねがいします。',
    correctRomaji: 'Kochira koso, yoroshiku onegaishimasu.',
    correctHiragana: 'こちらこそ、よろしくおねがいします。',
    correctEnglish: 'Likewise, it is a pleasure.',
    distractors: [
      { romaji: 'Oyasuminasai.', hiragana: 'おやすみなさい。', english: 'Good night.' },
      { romaji: 'Gochisōsama deshita.', hiragana: 'ごちそうさまでした。', english: 'Thank you for the meal.' },
    ],
  },

  // 8. Asking Origin
  {
    id: 'exch-8',
    category: 'origin',
    categoryLabel: 'Country & Origin',
    situationTitle: 'Asking Where You Came From',
    englishMeaning: 'A classmate asks: "Where did you come from?"',
    promptSpeaker: 'Classmate',
    promptRomaji: 'Dochira kara kimashita ka?',
    promptHiragana: 'どちらからきましたか？',
    correctRomaji: 'Furansu kara kimashita.',
    correctHiragana: 'ふらんすからきました。',
    correctEnglish: 'I came from France.',
    distractors: [
      { romaji: 'Kaishain desu.', hiragana: 'かいしゃいんです。', english: 'I am an employee.' },
      { romaji: 'Ja, mata ashita.', hiragana: 'じゃ、またあした。', english: 'Well, see you tomorrow.' },
    ],
  },

  // 9. Are You From Japan?
  {
    id: 'exch-9',
    category: 'origin',
    categoryLabel: 'Country & Origin',
    situationTitle: 'Inquiring Nationality or Origin',
    englishMeaning: 'Someone asks: "Did you come from Japan?"',
    promptSpeaker: 'Host',
    promptRomaji: 'Nihon kara kimashita ka?',
    promptHiragana: 'にほんからきましたか？',
    correctRomaji: 'Hai, Nihon kara kimashita.',
    correctHiragana: 'はい、にほんからきました。',
    correctEnglish: 'Yes, I came from Japan.',
    distractors: [
      { romaji: 'Iie, ginkōin desu.', hiragana: 'いいえ、ぎんこういんです。', english: 'No, I am a banker.' },
      { romaji: 'Dō itashimashite.', hiragana: 'どういたしまして。', english: 'You are welcome.' },
    ],
  },

  // 10. Asking Occupation
  {
    id: 'exch-10',
    category: 'occupation',
    categoryLabel: 'Occupations',
    situationTitle: 'Asking What Your Job Is',
    englishMeaning: 'A peer asks: "What job do you do?"',
    promptSpeaker: 'Interviewer',
    promptRomaji: 'Nan no shigoto o shiteimasu ka?',
    promptHiragana: 'なんのしごとをしていますか？',
    correctRomaji: 'Kaishain desu.',
    correctHiragana: 'かいしゃいんです。',
    correctEnglish: 'I am a company employee.',
    distractors: [
      { romaji: 'Amerika kara kimashita.', hiragana: 'あめりかからきました。', english: 'I came from America.' },
      { romaji: 'Sayōnara.', hiragana: 'さようなら。', english: 'Goodbye.' },
    ],
  },

  // 11. Are You a Bank Employee?
  {
    id: 'exch-11',
    category: 'occupation',
    categoryLabel: 'Occupations',
    situationTitle: 'Confirming Bank Employee Role',
    englishMeaning: 'Someone asks: "Are you a bank employee?"',
    promptSpeaker: 'Colleague',
    promptRomaji: 'Ginkōin desu ka?',
    promptHiragana: 'ぎんこういんですか？',
    correctRomaji: 'Iie, ginkōin ja arimasen. Kenkyūsha desu.',
    correctHiragana: 'いいえ、ぎんこういんじゃありません。けんきゅうしゃです。',
    correctEnglish: 'No, I am not a bank employee. I am a researcher.',
    distractors: [
      { romaji: 'Hai, nihon kara kimashita.', hiragana: 'はい、にほんからきました。', english: 'Yes, I came from Japan.' },
      { romaji: 'Ohayō gozaimasu.', hiragana: 'おはようございます。', english: 'Good morning.' },
    ],
  },

  // 12. Are You a Student?
  {
    id: 'exch-12',
    category: 'occupation',
    categoryLabel: 'Occupations',
    situationTitle: 'Confirming Student Status',
    englishMeaning: 'A teacher asks: "Are you a student?"',
    promptSpeaker: 'Professor',
    promptRomaji: 'Gakusei desu ka?',
    promptHiragana: 'がくせいですか？',
    correctRomaji: 'Hai, gakusei desu.',
    correctHiragana: 'はい、がくせいです。',
    correctEnglish: 'Yes, I am a student.',
    distractors: [
      { romaji: 'Furansu desu.', hiragana: 'ふらんすです。', english: 'It is France.' },
      { romaji: 'Otsukaresama deshita.', hiragana: 'おつかれさまでした。', english: 'Good work today.' },
    ],
  },

  // 13. Are You a Doctor?
  {
    id: 'exch-13',
    category: 'occupation',
    categoryLabel: 'Occupations',
    situationTitle: 'Confirming Medical Profession',
    englishMeaning: 'A patient asks: "Are you a doctor?"',
    promptSpeaker: 'Patient',
    promptRomaji: 'Isha desu ka?',
    promptHiragana: 'いしゃですか？',
    correctRomaji: 'Iie, isha ja arimasen. Kaishain desu.',
    correctHiragana: 'いいえ、いしゃじゃありません。かいしゃいんです。',
    correctEnglish: 'No, I am not a doctor. I am an office worker.',
    distractors: [
      { romaji: 'Dō itashimashite.', hiragana: 'どういたしまして。', english: 'You are welcome.' },
      { romaji: 'Itadakimasu.', hiragana: 'いただきます。', english: 'Let’s eat.' },
    ],
  },

  // 14. Are You a Teacher?
  {
    id: 'exch-14',
    category: 'occupation',
    categoryLabel: 'Occupations',
    situationTitle: 'Confirming Teacher Profession',
    englishMeaning: 'Someone asks: "Are you a teacher?"',
    promptSpeaker: 'Student',
    promptRomaji: 'Sensei desu ka?',
    promptHiragana: 'せんせいですか？',
    correctRomaji: 'Hai, sensei desu.',
    correctHiragana: 'はい、せんせいです。',
    correctEnglish: 'Yes, I am a teacher.',
    distractors: [
      { romaji: 'Oyasuminasai.', hiragana: 'おやすみなさい。', english: 'Good night.' },
      { romaji: 'Osaki ni shitsurei shimasu.', hiragana: 'おさきにしつれいします。', english: 'Excuse me for leaving.' },
    ],
  },

  // 15. Casual Parting / See You Tomorrow
  {
    id: 'exch-15',
    category: 'parting',
    categoryLabel: 'Everyday Greetings',
    situationTitle: 'Saying Goodbye to a Friend',
    englishMeaning: 'A friend waves: "Well, see you tomorrow!"',
    promptSpeaker: 'Friend',
    promptRomaji: 'Ja, mata ashita!',
    promptHiragana: 'じゃ、またあした！',
    correctRomaji: 'Mata ashita!',
    correctHiragana: 'またあした！',
    correctEnglish: 'See you tomorrow!',
    distractors: [
      { romaji: 'Hajimemashite.', hiragana: 'はじめまして。', english: 'Nice to meet you.' },
      { romaji: 'Gomen nasai.', hiragana: 'ごめんなさい。', english: 'I am sorry.' },
    ],
  },

  // 16. Formal Farewell
  {
    id: 'exch-16',
    category: 'parting',
    categoryLabel: 'Everyday Greetings',
    situationTitle: 'Formal Farewell / Long Parting',
    englishMeaning: 'A host bows: "Goodbye."',
    promptSpeaker: 'Host',
    promptRomaji: 'Sayōnara.',
    promptHiragana: 'さようなら。',
    correctRomaji: 'Sayōnara, ki o tsukete!',
    correctHiragana: 'さようなら、きをつけて！',
    correctEnglish: 'Goodbye, take care!',
    distractors: [
      { romaji: 'Itadakimasu!', hiragana: 'いただきます！', english: 'Let’s eat!' },
      { romaji: 'Kaishain desu.', hiragana: 'かいしゃいんです。', english: 'I am an employee.' },
    ],
  },

  // 17. Before Meal
  {
    id: 'exch-17',
    category: 'meals',
    categoryLabel: 'Meal Etiquette',
    situationTitle: 'Food Served at the Table',
    englishMeaning: 'The host announces: "The meal is served."',
    promptSpeaker: 'Cook',
    promptRomaji: 'Gohan ga dekimashita yo.',
    promptHiragana: 'ごはんができましたよ。',
    correctRomaji: 'Itadakimasu!',
    correctHiragana: 'いただきます！',
    correctEnglish: 'Thank you for the meal / Let’s eat!',
    distractors: [
      { romaji: 'Gochisōsama deshita.', hiragana: 'ごちそうさまでした。', english: 'Thank you for the meal (after).' },
      { romaji: 'Otsukaresama deshita.', hiragana: 'おつかれさまでした。', english: 'Good work today.' },
    ],
  },

  // 18. After Meal
  {
    id: 'exch-18',
    category: 'meals',
    categoryLabel: 'Meal Etiquette',
    situationTitle: 'Finishing a Delicious Meal',
    englishMeaning: 'The host asks: "How was the meal?"',
    promptSpeaker: 'Host',
    promptRomaji: 'Gohan wa dō deshita ka?',
    promptHiragana: 'ごはんはどうでしたか？',
    correctRomaji: 'Gochisōsama deshita!',
    correctHiragana: 'ごちそうさまでした！',
    correctEnglish: 'Thank you for the delicious meal!',
    distractors: [
      { romaji: 'Itadakimasu!', hiragana: 'いただきます！', english: 'Let’s eat!' },
      { romaji: 'Sayōnara.', hiragana: 'さようなら。', english: 'Goodbye.' },
    ],
  },

  // 19. Excuse Me / Apology
  {
    id: 'exch-19',
    category: 'courtesy',
    categoryLabel: 'Courtesy & Gratitude',
    situationTitle: 'Bumping Gently on a Train',
    englishMeaning: 'Someone says: "Excuse me / I am sorry!"',
    promptSpeaker: 'Passerby',
    promptRomaji: 'Sumimasen!',
    promptHiragana: 'すみません！',
    correctRomaji: 'Iie, daijōbu desu yo.',
    correctHiragana: 'いいえ、だいじょうぶですよ。',
    correctEnglish: 'No problem / It is quite alright.',
    distractors: [
      { romaji: 'Hajimemashite.', hiragana: 'はじめまして。', english: 'Nice to meet you.' },
      { romaji: 'Itadakimasu.', hiragana: 'いただきます。', english: 'Let’s eat.' },
    ],
  },

  // 20. Offering Something (Dōzo)
  {
    id: 'exch-20',
    category: 'courtesy',
    categoryLabel: 'Courtesy & Gratitude',
    situationTitle: 'Being Offered a Seat or Item',
    englishMeaning: 'Someone gestures: "Please, go ahead."',
    promptSpeaker: 'Friendly Passenger',
    promptRomaji: 'Dōzo.',
    promptHiragana: 'どうぞ。',
    correctRomaji: 'Dōmo arigatō gozaimasu.',
    correctHiragana: 'どうもありがとうございます。',
    correctEnglish: 'Thank you very much indeed.',
    distractors: [
      { romaji: 'Oyasuminasai.', hiragana: 'おやすみなさい。', english: 'Good night.' },
      { romaji: 'Osaki ni shitsurei shimasu.', hiragana: 'おさきにしつれいします。', english: 'Excuse me for leaving.' },
    ],
  },

  // 21. Night Farewell / Going to Bed
  {
    id: 'exch-21',
    category: 'greetings',
    categoryLabel: 'Everyday Greetings',
    situationTitle: 'Heading to Bed',
    englishMeaning: 'Family member: "Good night."',
    promptSpeaker: 'Host Parent',
    promptRomaji: 'Oyasuminasai.',
    promptHiragana: 'おやすみなさい。',
    correctRomaji: 'Oyasuminasai.',
    correctHiragana: 'おやすみなさい。',
    correctEnglish: 'Good night.',
    distractors: [
      { romaji: 'Konnichiwa.', hiragana: 'こんにちは。', english: 'Hello.' },
      { romaji: 'Dō itashimashite.', hiragana: 'どういたしまして。', english: 'You are welcome.' },
    ],
  },

  // 22. Welcoming / Good Work
  {
    id: 'exch-22',
    category: 'courtesy',
    categoryLabel: 'Workplace Courtesy',
    situationTitle: 'Ending a Project or Shift',
    englishMeaning: 'Team leader says: "Thank you all for your great effort today!"',
    promptSpeaker: 'Team Lead',
    promptRomaji: 'Kyō wa otsukaresama deshita!',
    promptHiragana: 'きょうはおつかれさまでした！',
    correctRomaji: 'Otsukaresama deshita!',
    correctHiragana: 'おつかれさまでした！',
    correctEnglish: 'Thank you for your hard work!',
    distractors: [
      { romaji: 'Gochisōsama deshita.', hiragana: 'ごちそうさまでした。', english: 'Thank you for the meal.' },
      { romaji: 'Hajimemashite.', hiragana: 'はじめまして。', english: 'Nice to meet you.' },
    ],
  },

  // 23. Working at a Company
  {
    id: 'exch-23',
    category: 'places-work',
    categoryLabel: 'Places and Work',
    situationTitle: 'Asking Where Someone Works',
    englishMeaning: 'Where do you work?',
    promptSpeaker: 'Acquaintance',
    promptRomaji: 'Doko de hataraite imasu ka?',
    promptHiragana: 'どこではたらいていますか？',
    correctRomaji: 'Kaisha de hataraite imasu.',
    correctHiragana: 'かいしゃではたらいています。',
    correctEnglish: 'I work at a company.',
    distractors: [
      { romaji: 'Sayōnara.', hiragana: 'さようなら。', english: 'Goodbye.' },
      { romaji: 'Itadakimasu.', hiragana: 'いただきます。', english: 'Let us eat.' },
    ],
  },

  // 24. Working at a School
  {
    id: 'exch-24',
    category: 'places-work',
    categoryLabel: 'Places and Work',
    situationTitle: 'Asking About School Employment',
    englishMeaning: 'Do you work at a school?',
    promptSpeaker: 'Neighbor',
    promptRomaji: 'Gakkō de hataraite imasu ka?',
    promptHiragana: 'がっこうではたらいていますか？',
    correctRomaji: 'Hai, gakkō de hataraite imasu.',
    correctHiragana: 'はい、がっこうではたらいています。',
    correctEnglish: 'Yes, I work at a school.',
    distractors: [
      { romaji: 'Gochisōsama deshita.', hiragana: 'ごちそうさまでした。', english: 'Thank you for the meal.' },
      { romaji: 'Oyasuminasai.', hiragana: 'おやすみなさい。', english: 'Good night.' },
    ],
  },

  // 25. Working at a Hospital
  {
    id: 'exch-25',
    category: 'places-work',
    categoryLabel: 'Places and Work',
    situationTitle: 'Asking About Hospital Employment',
    englishMeaning: 'Do you work at a hospital?',
    promptSpeaker: 'Colleague',
    promptRomaji: 'Byōin de hataraite imasu ka?',
    promptHiragana: 'びょういんではたらいていますか？',
    correctRomaji: 'Hai, byōin de hataraite imasu.',
    correctHiragana: 'はい、びょういんではたらいています。',
    correctEnglish: 'Yes, I work at a hospital.',
    distractors: [
      { romaji: 'Konbanwa.', hiragana: 'こんばんは。', english: 'Good evening.' },
      { romaji: 'Dō itashimashite.', hiragana: 'どういたしまして。', english: 'You are welcome.' },
    ],
  },

  // 26. Living on Pension
  {
    id: 'exch-26',
    category: 'places-work',
    categoryLabel: 'Places and Work',
    situationTitle: 'Retirement Living',
    englishMeaning: 'Do you live on a pension?',
    promptSpeaker: 'Friend',
    promptRomaji: 'Nenkin de seikatsu shite imasu ka?',
    promptHiragana: 'ねんきんでせいかつしていますか？',
    correctRomaji: 'Hai, nenkin de seikatsu shite imasu.',
    correctHiragana: 'はい、ねんきんでせいかつしています。',
    correctEnglish: 'Yes, I live on a pension.',
    distractors: [
      { romaji: 'Ohayō gozaimasu.', hiragana: 'おはようございます。', english: 'Good morning.' },
      { romaji: 'Jā mata.', hiragana: 'じゃあまた。', english: 'See you later.' },
    ],
  },

  // 27. Occupation: Doctor
  {
    id: 'exch-27',
    category: 'occupation',
    categoryLabel: 'Occupations',
    situationTitle: 'Asking for Occupation',
    englishMeaning: 'What is your job?',
    promptSpeaker: 'Interviewer',
    promptRomaji: 'O-shigoto wa nan desu ka?',
    promptHiragana: 'おしごとはなんですか？',
    correctRomaji: 'Isha desu.',
    correctHiragana: 'いしゃです。',
    correctEnglish: 'I am a doctor.',
    distractors: [
      { romaji: 'Arigatō gozaimasu.', hiragana: 'ありがとうございます。', english: 'Thank you.' },
      { romaji: 'Konnichiwa.', hiragana: 'こんにちは。', english: 'Hello.' },
    ],
  },

  // 28. Occupation: Engineer
  {
    id: 'exch-28',
    category: 'occupation',
    categoryLabel: 'Occupations',
    situationTitle: 'Confirming Profession',
    englishMeaning: 'Are you an engineer?',
    promptSpeaker: 'Colleague',
    promptRomaji: 'Enjinia desu ka?',
    promptHiragana: 'えんじにあですか？',
    correctRomaji: 'Hai, enjinia desu.',
    correctHiragana: 'はい、えんじにあです。',
    correctEnglish: 'Yes, I am an engineer.',
    distractors: [
      { romaji: 'Sumimasen.', hiragana: 'すみません。', english: 'Excuse me.' },
      { romaji: 'Sayōnara.', hiragana: 'さようなら。', english: 'Goodbye.' },
    ],
  },

  // 29. Occupation: Student
  {
    id: 'exch-29',
    category: 'occupation',
    categoryLabel: 'Occupations',
    situationTitle: 'Asking if Student',
    englishMeaning: 'Are you a student?',
    promptSpeaker: 'Professor',
    promptRomaji: 'Gakusei desu ka?',
    promptHiragana: 'がくせいですか？',
    correctRomaji: 'Hai, gakusei desu.',
    correctHiragana: 'はい、がくせいです。',
    correctEnglish: 'Yes, I am a student.',
    distractors: [
      { romaji: 'Itadakimasu.', hiragana: 'いただきます。', english: 'Let us eat.' },
      { romaji: 'Oyasuminasai.', hiragana: 'おやすみなさい。', english: 'Good night.' },
    ],
  },

  // 30. Occupation: Company Employee
  {
    id: 'exch-30',
    category: 'occupation',
    categoryLabel: 'Occupations',
    situationTitle: 'Asking if Company Employee',
    englishMeaning: 'Are you a company employee?',
    promptSpeaker: 'Guest',
    promptRomaji: 'Kaishain desu ka?',
    promptHiragana: 'かいしゃいんですか？',
    correctRomaji: 'Hai, kaishain desu.',
    correctHiragana: 'はい、かいしゃいんです。',
    correctEnglish: 'Yes, I am a company employee.',
    distractors: [
      { romaji: 'Gochisōsama deshita.', hiragana: 'ごちそうさまでした。', english: 'Thank you for the meal.' },
      { romaji: 'Konnichiwa.', hiragana: 'こんにちは。', english: 'Hello.' },
    ],
  },

  // 31. Please Read
  {
    id: 'exch-31',
    category: 'sentences',
    categoryLabel: 'Useful Sentences',
    situationTitle: 'Classroom Instruction',
    englishMeaning: 'Please read this.',
    promptSpeaker: 'Teacher',
    promptRomaji: 'Kore o yonde kudasai.',
    promptHiragana: 'これをよんでください。',
    correctRomaji: 'Hai, wakarimashita.',
    correctHiragana: 'はい、わかりました。',
    correctEnglish: 'Yes, understood.',
    distractors: [
      { romaji: 'Oyasuminasai.', hiragana: 'おやすみなさい。', english: 'Good night.' },
      { romaji: 'Dōitashimashite.', hiragana: 'どういたしまして。', english: 'You are welcome.' },
    ],
  },

  // 32. What is your Name
  {
    id: 'exch-32',
    category: 'introductions',
    categoryLabel: 'Introductions',
    situationTitle: 'Asking Someone’s Name',
    englishMeaning: 'What is your name?',
    promptSpeaker: 'Receptionist',
    promptRomaji: 'O-namae wa nan desu ka?',
    promptHiragana: 'おなまえはなんですか？',
    correctRomaji: 'Tanaka desu.',
    correctHiragana: 'たなかです。',
    correctEnglish: 'I am Tanaka.',
    distractors: [
      { romaji: 'Gomen nasai.', hiragana: 'ごめんなさい。', english: 'I am sorry.' },
      { romaji: 'O-genki desu ka.', hiragana: 'おげんきですか。', english: 'How are you?' },
    ],
  },
];

export interface ExchangeOption {
  text: string;
  hiraganaAudio: string;
  isCorrect: boolean;
  englishMeaning: string;
}

export interface ExchangeQuizQuestion {
  questionNumber: number;
  item: ExchangeItem;
  prompt: string;
  promptAudio: string;
  secondaryPrompt: string;
  categoryLabel: string;
  situationTitle: string;
  options: ExchangeOption[];
  correctOptionIndex: number;
}

/**
 * Generate a 10-question quiz drawn from the exchanged conversation items.
 * @param mode 'romaji' for Exercise 6, 'hiragana' for Exercise 7
 * @param count number of questions (default 10)
 */
export function generateExchangeQuiz(mode: 'romaji' | 'hiragana', count = 10): ExchangeQuizQuestion[] {
  // Shuffle items
  const shuffled = [...EXCHANGE_DATA].sort(() => 0.5 - Math.random());
  const selectedItems = shuffled.slice(0, Math.min(count, shuffled.length));

  return selectedItems.map((item, index) => {
    const isRomaji = mode === 'romaji';

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

    // Randomize order of the 3 options
    const allOptions = [correctOption, ...distractorOptions].sort(() => 0.5 - Math.random());
    const correctIndex = allOptions.findIndex((opt) => opt.isCorrect);

    return {
      questionNumber: index + 1,
      item,
      prompt: isRomaji ? item.promptRomaji : item.promptHiragana,
      promptAudio: item.promptHiragana,
      secondaryPrompt: item.englishMeaning,
      categoryLabel: item.categoryLabel,
      situationTitle: item.situationTitle,
      options: allOptions,
      correctOptionIndex: correctIndex,
    };
  });
}
