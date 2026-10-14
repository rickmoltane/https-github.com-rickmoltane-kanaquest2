export interface ExchangeItem {
  id: string;
  category: 'places-work' | 'occupations' | 'introductions' | 'people' | 'courtesy' | 'countries-origin' | 'languages' | 'age-numbers' | 'daily-inquiry' | 'time-days' | 'demonstratives';
  categoryLabel: string;
  situationTitle: string;
  englishMeaning: string;
  promptSpeaker?: string;

  // Prompt / Question (Full multi-word phrase)
  promptRomaji: string;
  promptHiragana: string;

  // Correct Reply (Full multi-word phrase)
  correctRomaji: string;
  correctHiragana: string;
  correctEnglish: string;

  // Distractors: Plausible decoys strictly using the user's vocabulary (swapped word order, particle error, or altered grammar)
  distractors: [
    { romaji: string; hiragana: string; english: string },
    { romaji: string; hiragana: string; english: string }
  ];

  // Optional: Decoys when the prompt is the answer/reply and options are the question
  questionDistractors?: [
    { romaji: string; hiragana: string; english: string },
    { romaji: string; hiragana: string; english: string }
  ];
}

/**
 * STRICT USER-CURRICULUM EXCHANGE DATA
 * All vocabulary, nouns, pronouns, verbs, and phrases come 100% EXCLUSIVELY
 * from the user-provided vocabulary database.
 * No unintroduced words.
 */
export const EXCHANGE_DATA: ExchangeItem[] = [
  // 1. Where do you work? -> I work at a company.
  {
    id: 'exch-1',
    category: 'places-work',
    categoryLabel: 'Places & Work',
    situationTitle: 'Asking Workplace',
    englishMeaning: 'Where do you work?',
    promptSpeaker: 'Acquaintance',
    promptRomaji: 'Doko de hataraite imasu ka?',
    promptHiragana: 'どこではたらいていますか？',
    correctRomaji: 'Kaisha de hataraite imasu.',
    correctHiragana: 'かいしゃではたらいています。',
    correctEnglish: 'I work at a company.',
    distractors: [
      { romaji: 'Kaisha o hataraite imasu.', hiragana: 'かいしゃをはたらいています。', english: 'Particle error: "o" instead of "de"' },
      { romaji: 'Hataraite kaisha de imasu.', hiragana: 'はたらいてかいしゃでいます。', english: 'Incorrect word order' },
    ],
  },

  // 2. Do you work at a school? -> Yes, I work at a school.
  {
    id: 'exch-2',
    category: 'places-work',
    categoryLabel: 'Places & Work',
    situationTitle: 'School Employment',
    englishMeaning: 'Do you work at a school?',
    promptSpeaker: 'Neighbor',
    promptRomaji: 'Gakkō de hataraite imasu ka?',
    promptHiragana: 'がっこうではたらいていますか？',
    correctRomaji: 'Hai, gakkō de hataraite imasu.',
    correctHiragana: 'はい、がっこうではたらいています。',
    correctEnglish: 'Yes, I work at a school.',
    distractors: [
      { romaji: 'Hai, gakkō ni hataraite imasu.', hiragana: 'はい、がっこうにはたらいています。', english: 'Particle error: "ni" instead of "de"' },
      { romaji: 'Hai, hataraite gakkō de imasu.', hiragana: 'はい、はたらいてがっこうでいます。', english: 'Incorrect word order' },
    ],
  },

  // 3. Do you work at a hospital? -> Yes, I work at a hospital.
  {
    id: 'exch-3',
    category: 'places-work',
    categoryLabel: 'Places & Work',
    situationTitle: 'Hospital Employment',
    englishMeaning: 'Do you work at a hospital?',
    promptSpeaker: 'Colleague',
    promptRomaji: 'Byōin de hataraite imasu ka?',
    promptHiragana: 'びょういんではたらいていますか？',
    correctRomaji: 'Hai, byōin de hataraite imasu.',
    correctHiragana: 'はい、びょういんではたらいています。',
    correctEnglish: 'Yes, I work at a hospital.',
    distractors: [
      { romaji: 'Hai, byōin o hataraite imasu.', hiragana: 'はい、びょういんをはたらいています。', english: 'Particle error: "o" instead of "de"' },
      { romaji: 'Hai, byōin de hataraki imasu.', hiragana: 'はい、びょういんではたらきます。', english: 'Incorrect verb form' },
    ],
  },

  // 4. Do you live on a pension? -> Yes, I live on a pension.
  {
    id: 'exch-4',
    category: 'places-work',
    categoryLabel: 'Places & Work',
    situationTitle: 'Living on Pension',
    englishMeaning: 'Do you live on a pension?',
    promptSpeaker: 'Friend',
    promptRomaji: 'Nenkin de seikatsu shite imasu ka?',
    promptHiragana: 'ねんきんでせいかつしていますか？',
    correctRomaji: 'Hai, nenkin de seikatsu shite imasu.',
    correctHiragana: 'はい、ねんきんでせいかつしています。',
    correctEnglish: 'Yes, I live on a pension.',
    distractors: [
      { romaji: 'Hai, nenkin o seikatsu shite imasu.', hiragana: 'はい、ねんきんをせいかつしています。', english: 'Particle error: "o" instead of "de"' },
      { romaji: 'Hai, seikatsu de nenkin shite imasu.', hiragana: 'はい、せいかつでねんきんしています。', english: 'Inverted noun order' },
    ],
  },

  // 5. Does that elderly person live on a pension? -> Yes, they live on a pension.
  {
    id: 'exch-5',
    category: 'places-work',
    categoryLabel: 'Places & Work',
    situationTitle: 'Elderly Person Pension',
    englishMeaning: 'Does that elderly person live on a pension?',
    promptSpeaker: 'Social Worker',
    promptRomaji: 'Ano otoshiyori wa nenkin de seikatsu shite imasu ka?',
    promptHiragana: 'あのおとしよりはねんきんでせいかつしていますか？',
    correctRomaji: 'Hai, nenkin de seikatsu shite imasu.',
    correctHiragana: 'はい、ねんきんでせいかつしています。',
    correctEnglish: 'Yes, they live on a pension.',
    distractors: [
      { romaji: 'Hai, nenkin wa seikatsu de imasu.', hiragana: 'はい、ねんきんはせいかつでいます。', english: 'Mismatched particle and verb' },
      { romaji: 'Hai, seikatsu shite nenkin de imasu.', hiragana: 'はい、せいかつしてねんきんでいます。', english: 'Inverted clause order' },
    ],
  },

  // 6. What is your name? -> My name is Tanaka.
  {
    id: 'exch-6',
    category: 'introductions',
    categoryLabel: 'Introductions',
    situationTitle: 'Asking Name',
    englishMeaning: 'What is your name?',
    promptSpeaker: 'Receptionist',
    promptRomaji: 'Anata no namae wa nan desu ka?',
    promptHiragana: 'あなたのなまえはなんですか？',
    correctRomaji: 'Watashi no namae wa Tanaka desu.',
    correctHiragana: 'わたしのなまえはたなかです。',
    correctEnglish: 'My name is Tanaka.',
    distractors: [
      { romaji: 'Watashi wa namae no Tanaka desu.', hiragana: 'わたしはなまえのたなかです。', english: 'Misplaced particle "no"' },
      { romaji: 'Namae wa watashi no Tanaka desu.', hiragana: 'なまえはわたしのたなかです。', english: 'Mismatched topic and possessive' },
    ],
  },

  // 7. Nice to meet you. Please do your self-introduction. -> Yes, I will do my self-introduction.
  {
    id: 'exch-7',
    category: 'introductions',
    categoryLabel: 'Self-Introduction',
    situationTitle: 'Self-Introduction Request',
    englishMeaning: 'Please give your self-introduction.',
    promptSpeaker: 'Host',
    promptRomaji: 'Jiko shōkai o onegaishimasu.',
    promptHiragana: 'じこしょうかいをおねがいします。',
    correctRomaji: 'Hai, watashi no jiko shōkai o shimasu.',
    correctHiragana: 'はい、わたしのじこしょうかいをします。',
    correctEnglish: 'Yes, I will do my self-introduction.',
    distractors: [
      { romaji: 'Hai, watashi wa jiko shōkai o kudasai.', hiragana: 'はい、わたしはじこしょうかいをください。', english: 'Incorrect request ending "kudasai"' },
      { romaji: 'Hai, jiko shōkai de watashi o shimasu.', hiragana: 'はい、じこしょうかいでわたしをします。', english: 'Particle inversion' },
    ],
  },

  // 8. Nice to meet you. Pleased to meet you. -> Pleased to meet you too.
  {
    id: 'exch-8',
    category: 'introductions',
    categoryLabel: 'Introductions',
    situationTitle: 'Meeting for the First Time',
    englishMeaning: 'Nice to meet you. Pleased to make your acquaintance.',
    promptSpeaker: 'New Colleague',
    promptRomaji: 'Hajimemashite. Dōzo yoroshiku onegaishimasu.',
    promptHiragana: 'はじめまして。どうぞよろしくおねがいします。',
    correctRomaji: 'Hajimemashite. Dōzo yoroshiku.',
    correctHiragana: 'はじめまして。どうぞよろしく。',
    correctEnglish: 'Nice to meet you. Pleased to meet you too.',
    distractors: [
      { romaji: 'Hajimemashite. Dōzo yoroshikunai desu.', hiragana: 'はじめまして。どうぞよろしくないです。', english: 'Negative error: "yoroshikunai"' },
      { romaji: 'Hajimemashite. Yoroshiku dōzo no desu.', hiragana: 'はじめまして。よろしくどうぞのです。', english: 'Confused word order and particle' },
    ],
  },

  // 9. Please read this noun. -> Yes, I will read this noun.
  {
    id: 'exch-9',
    category: 'introductions',
    categoryLabel: 'Introductions & Greetings',
    situationTitle: 'Reading Instruction',
    englishMeaning: 'Please read this noun.',
    promptSpeaker: 'Teacher',
    promptRomaji: 'Kono meishi o yonde kudasai.',
    promptHiragana: 'このめいしをよんでください。',
    correctRomaji: 'Hai, kono meishi o yomimasu.',
    correctHiragana: 'はい、このめいしをよみます。',
    correctEnglish: 'Yes, I will read this noun.',
    distractors: [
      { romaji: 'Hai, kono meishi o yonde kudasai.', hiragana: 'はい、このめいしをよんでください。', english: 'Echoing request "yonde kudasai" instead of replying' },
      { romaji: 'Hai, meishi no kono o yomimasu.', hiragana: 'はい、めいしのこのをよみます。', english: 'Inverted noun modifier' },
    ],
  },

  // 10. What is your job? -> I work as an engineer.
  {
    id: 'exch-10',
    category: 'occupations',
    categoryLabel: 'Occupations',
    situationTitle: 'Asking Job Role',
    englishMeaning: 'What is your job?',
    promptSpeaker: 'Interviewer',
    promptRomaji: 'Anata no shigoto wa nan desu ka?',
    promptHiragana: 'あなたのしごとはなんですか？',
    correctRomaji: 'Watashi wa enjinia desu.',
    correctHiragana: 'わたしはえんじにあです。',
    correctEnglish: 'I am an engineer.',
    distractors: [
      { romaji: 'Watashi no enjinia desu.', hiragana: 'わたしのえんじにあです。', english: 'Incorrect particle: "no" instead of "wa"' },
      { romaji: 'Enjinia wa watashi desu ka?', hiragana: 'えんじにあはわたしですか？', english: 'Question inversion' },
    ],
  },

  // 11. Are you a student? -> Yes, I am a student.
  {
    id: 'exch-11',
    category: 'occupations',
    categoryLabel: 'Occupations',
    situationTitle: 'Student Inquiry',
    englishMeaning: 'Are you a student?',
    promptSpeaker: 'Teacher',
    promptRomaji: 'Anata wa gakusei desu ka?',
    promptHiragana: 'あなたはがくせいですか？',
    correctRomaji: 'Hai, watashi wa gakusei desu.',
    correctHiragana: 'はい、わたしはがくせいです。',
    correctEnglish: 'Yes, I am a student.',
    distractors: [
      { romaji: 'Hai, watashi no gakusei desu.', hiragana: 'はい、わたしのがくせいです。', english: 'Incorrect particle: "no" instead of "wa"' },
      { romaji: 'Hai, gakusei wa watashi desu.', hiragana: 'はい、がくせいはわたしです。', english: 'Reversed topic and predicate' },
    ],
  },

  // 12. Are you a doctor? -> No, I am not a doctor.
  {
    id: 'exch-12',
    category: 'occupations',
    categoryLabel: 'Occupations',
    situationTitle: 'Doctor Inquiry',
    englishMeaning: 'Are you a doctor?',
    promptSpeaker: 'Patient',
    promptRomaji: 'Anata wa isha desu ka?',
    promptHiragana: 'あなたはいしゃですか？',
    correctRomaji: 'Iie, watashi wa isha ja arimasen.',
    correctHiragana: 'いいえ、わたしはいしゃじゃありません。',
    correctEnglish: 'No, I am not a doctor.',
    distractors: [
      { romaji: 'Iie, watashi wa isha de arimasen.', hiragana: 'いいえ、わたしはいしゃでありません。', english: 'Colloquial negative slip: "de arimasen"' },
      { romaji: 'Iie, isha wa watashi ja arimasen.', hiragana: 'いいえ、いしゃはわたしじゃありません。', english: 'Inverted topic and subject' },
    ],
  },

  // 13. Are you a teacher? -> Yes, I work at a school.
  {
    id: 'exch-13',
    category: 'occupations',
    categoryLabel: 'Occupations',
    situationTitle: 'Teacher Inquiry',
    englishMeaning: 'Are you a teacher?',
    promptSpeaker: 'Student',
    promptRomaji: 'Anata wa kyōshi desu ka?',
    promptHiragana: 'あなたはきょうしですか？',
    correctRomaji: 'Hai, gakkō de hataraite imasu.',
    correctHiragana: 'はい、がっこうではたらいています。',
    correctEnglish: 'Yes, I work at a school.',
    distractors: [
      { romaji: 'Hai, gakkō o hataraite imasu.', hiragana: 'はい、がっこうをはたらいています。', english: 'Incorrect particle: "o" instead of "de"' },
      { romaji: 'Hai, hataraite gakkō de imasu.', hiragana: 'はい、はたらいてがっこうでいます。', english: 'Incorrect word order' },
    ],
  },

  // 14. Is she a nurse? -> Yes, she works at a hospital.
  {
    id: 'exch-14',
    category: 'occupations',
    categoryLabel: 'Occupations',
    situationTitle: 'Nurse Inquiry',
    englishMeaning: 'Is she a nurse?',
    promptSpeaker: 'Visitor',
    promptRomaji: 'Kanojo wa kangoshi desu ka?',
    promptHiragana: 'かのじょはかんごしですか？',
    correctRomaji: 'Hai, byōin de hataraite imasu.',
    correctHiragana: 'はい、びょういんではたらいています。',
    correctEnglish: 'Yes, she works at a hospital.',
    distractors: [
      { romaji: 'Hai, byōin o hataraite imasu.', hiragana: 'はい、びょういんをはたらいています。', english: 'Incorrect particle: "o" instead of "de"' },
      { romaji: 'Hai, hataraite byōin de imasu.', hiragana: 'はい、はたらいてびょういんでいます。', english: 'Incorrect word order' },
    ],
  },

  // 15. Is he a company employee? -> Yes, he works at a company.
  {
    id: 'exch-15',
    category: 'occupations',
    categoryLabel: 'Occupations',
    situationTitle: 'Company Employee Inquiry',
    englishMeaning: 'Is he a company employee?',
    promptSpeaker: 'Colleague',
    promptRomaji: 'Kare wa kaishain desu ka?',
    promptHiragana: 'かれはかいしゃいんですか？',
    correctRomaji: 'Hai, kaisha de hataraite imasu.',
    correctHiragana: 'はい、かいしゃではたらいています。',
    correctEnglish: 'Yes, he works at a company.',
    distractors: [
      { romaji: 'Hai, kaisha o hataraite imasu.', hiragana: 'はい、かいしゃをはたらいています。', english: 'Incorrect particle: "o" instead of "de"' },
      { romaji: 'Hai, hataraite kaisha de imasu.', hiragana: 'はい、はたらいてかいしゃでいます。', english: 'Mismatched word order' },
    ],
  },

  // 16. Are you a care worker? -> Yes, I work at a hospital.
  {
    id: 'exch-16',
    category: 'occupations',
    categoryLabel: 'Occupations',
    situationTitle: 'Care Worker Inquiry',
    englishMeaning: 'Are you a care worker?',
    promptSpeaker: 'Visitor',
    promptRomaji: 'Anata wa kaigoshi desu ka?',
    promptHiragana: 'あなたはかいごしですか？',
    correctRomaji: 'Hai, byōin de hataraite imasu.',
    correctHiragana: 'はい、びょういんではたらいています。',
    correctEnglish: 'Yes, I work at a hospital.',
    distractors: [
      { romaji: 'Hai, byōin o hataraite imasu.', hiragana: 'はい、びょういんをはたらいています。', english: 'Particle error: "o" instead of "de"' },
      { romaji: 'Hai, kaigoshi de byōin desu.', hiragana: 'はい、かいごしでびょういんです。', english: 'Garbled clause order' },
    ],
  },

  // 17. Are you a civil servant? -> Yes, I am a civil servant.
  {
    id: 'exch-17',
    category: 'occupations',
    categoryLabel: 'Occupations',
    situationTitle: 'Civil Servant Inquiry',
    englishMeaning: 'Are you a civil servant?',
    promptSpeaker: 'Friend',
    promptRomaji: 'Anata wa kōmuin desu ka?',
    promptHiragana: 'あなたはこうむいんですか？',
    correctRomaji: 'Hai, watashi wa kōmuin desu.',
    correctHiragana: 'はい、わたしはこうむいんです。',
    correctEnglish: 'Yes, I am a civil servant.',
    distractors: [
      { romaji: 'Hai, watashi no kōmuin desu.', hiragana: 'はい、わたしのこうむいんです。', english: 'Incorrect particle: "no" instead of "wa"' },
      { romaji: 'Hai, kōmuin wa watashi desu.', hiragana: 'はい、こうむいんはわたしです。', english: 'Reversed topic' },
    ],
  },

  // 18. Are you self-employed? -> Yes, I am a business owner.
  {
    id: 'exch-18',
    category: 'occupations',
    categoryLabel: 'Occupations',
    situationTitle: 'Self-Employed Inquiry',
    englishMeaning: 'Are you self-employed?',
    promptSpeaker: 'Acquaintance',
    promptRomaji: 'Anata wa jieigyō desu ka?',
    promptHiragana: 'あなたはじえいぎょうですか？',
    correctRomaji: 'Hai, watashi wa jigyōnushi desu.',
    correctHiragana: 'はい、わたしはじぎょうぬしです。',
    correctEnglish: 'Yes, I am a business owner.',
    distractors: [
      { romaji: 'Hai, watashi no jigyōnushi desu.', hiragana: 'はい、わたしのじぎょうぬしです。', english: 'Incorrect particle: "no" instead of "wa"' },
      { romaji: 'Hai, jigyōnushi wa watashi desu.', hiragana: 'はい、じぎょうぬしはわたしです。', english: 'Reversed predicate order' },
    ],
  },

  // 19. Are you a homemaker? -> Yes, I am a homemaker.
  {
    id: 'exch-19',
    category: 'occupations',
    categoryLabel: 'Occupations',
    situationTitle: 'Homemaker Status',
    englishMeaning: 'Are you a homemaker?',
    promptSpeaker: 'Neighbor',
    promptRomaji: 'Anata wa shufu desu ka?',
    promptHiragana: 'あなたはしゅふですか？',
    correctRomaji: 'Hai, watashi wa shufu desu.',
    correctHiragana: 'はい、わたしはしゅふです。',
    correctEnglish: 'Yes, I am a homemaker.',
    distractors: [
      { romaji: 'Hai, watashi no shufu desu.', hiragana: 'はい、わたしのしゅふです。', english: 'Incorrect particle: "no" instead of "wa"' },
      { romaji: 'Hai, shufu wa watashi desu.', hiragana: 'はい、しゅふはわたしです。', english: 'Reversed topic and predicate' },
    ],
  },

  // 20. Are you a farmer? -> Yes, I am a farmer.
  {
    id: 'exch-20',
    category: 'occupations',
    categoryLabel: 'Occupations',
    situationTitle: 'Farmer Inquiry',
    englishMeaning: 'Are you a farmer?',
    promptSpeaker: 'Visitor',
    promptRomaji: 'Anata wa nōka desu ka?',
    promptHiragana: 'あなたはのうかですか？',
    correctRomaji: 'Hai, watashi wa nōka desu.',
    correctHiragana: 'はい、わたしはのうかです。',
    correctEnglish: 'Yes, I am a farmer.',
    distractors: [
      { romaji: 'Hai, watashi no nōka desu.', hiragana: 'はい、わたしののうかです。', english: 'Incorrect particle: "no" instead of "wa"' },
      { romaji: 'Hai, nōka wa watashi desu.', hiragana: 'はい、のうかはわたしです。', english: 'Reversed word order' },
    ],
  },

  // 21. Do you work a part-time job? -> Yes, I work part-time at a school.
  {
    id: 'exch-21',
    category: 'occupations',
    categoryLabel: 'Occupations',
    situationTitle: 'Part-Time Work Inquiry',
    englishMeaning: 'Do you work part-time?',
    promptSpeaker: 'Friend',
    promptRomaji: 'Anata wa arubaito desu ka?',
    promptHiragana: 'あなたはあるばいとですか？',
    correctRomaji: 'Hai, gakkō de hataraite imasu.',
    correctHiragana: 'はい、がっこうではたらいています。',
    correctEnglish: 'Yes, I work at a school.',
    distractors: [
      { romaji: 'Hai, gakkō o hataraite imasu.', hiragana: 'はい、がっこうをはたらいています。', english: 'Incorrect particle: "o" instead of "de"' },
      { romaji: 'Hai, hataraite gakkō de imasu.', hiragana: 'はい、はたらいてがっこうでいます。', english: 'Incorrect word order' },
    ],
  },

  // 22. Does she work part-time? -> Yes, she works part-time.
  {
    id: 'exch-22',
    category: 'occupations',
    categoryLabel: 'Occupations',
    situationTitle: 'Part-Time Status',
    englishMeaning: 'Does she work part-time?',
    promptSpeaker: 'Colleague',
    promptRomaji: 'Kanojo wa pāto taimu desu ka?',
    promptHiragana: 'かのじょはぱーとたいむですか？',
    correctRomaji: 'Hai, kanojo wa pāto taimu desu.',
    correctHiragana: 'はい、かのじょはぱーとたいむです。',
    correctEnglish: 'Yes, she is part-time.',
    distractors: [
      { romaji: 'Hai, kanojo no pāto taimu desu.', hiragana: 'はい、かのじょのぱーとたいむです。', english: 'Incorrect particle: "no" instead of "wa"' },
      { romaji: 'Hai, pāto taimu wa kanojo desu.', hiragana: 'はい、ぱーとたいむはかのじょです。', english: 'Reversed topic and predicate' },
    ],
  },

  // 23. Is that person your friend? -> Yes, they are my friend.
  {
    id: 'exch-23',
    category: 'people',
    categoryLabel: 'People & Pronouns',
    situationTitle: 'Friend Inquiry',
    englishMeaning: 'Is that person your friend?',
    promptSpeaker: 'Classmate',
    promptRomaji: 'Ano hito wa anata no tomodachi desu ka?',
    promptHiragana: 'あのひとはあなたのともだちですか？',
    correctRomaji: 'Hai, watashi no tomodachi desu.',
    correctHiragana: 'はい、わたしのともだちです。',
    correctEnglish: 'Yes, that is my friend.',
    distractors: [
      { romaji: 'Hai, tomodachi no watashi desu.', hiragana: 'はい、ともだちのわたしです。', english: 'Inverted possessive order' },
      { romaji: 'Hai, watashi wa tomodachi ga desu.', hiragana: 'はい、わたしはともだちがです。', english: 'Erroneous particle "ga" insertion' },
    ],
  },

  // 24. Is that child your child? -> Yes, that is my child.
  {
    id: 'exch-24',
    category: 'people',
    categoryLabel: 'Age & Gender',
    situationTitle: 'Child Inquiry',
    englishMeaning: 'Is that child your child?',
    promptSpeaker: 'Teacher',
    promptRomaji: 'Ano kodomo wa anata no kodomo desu ka?',
    promptHiragana: 'あのこどもはあなたのこどもですか？',
    correctRomaji: 'Hai, watashi no kodomo desu.',
    correctHiragana: 'はい、わたしのこどもです。',
    correctEnglish: 'Yes, that is my child.',
    distractors: [
      { romaji: 'Hai, kodomo no watashi desu.', hiragana: 'はい、こどものわたしです。', english: 'Inverted modifier order' },
      { romaji: 'Hai, watashi wa kodomo de desu.', hiragana: 'はい、わたしはこどもでです。', english: 'Extraneous particle "de"' },
    ],
  },

  // 25. Is that person a man or a woman? -> That person is a woman.
  {
    id: 'exch-25',
    category: 'people',
    categoryLabel: 'Age & Gender',
    situationTitle: 'Man or Woman Inquiry',
    englishMeaning: 'Is that person a man or a woman?',
    promptSpeaker: 'Colleague',
    promptRomaji: 'Ano hito wa otoko no hito desu ka, onna no hito desu ka?',
    promptHiragana: 'あのひとはおとこのひとですか、おんなのひとですか？',
    correctRomaji: 'Ano hito wa onna no hito desu.',
    correctHiragana: 'あのひとはおんなのひとです。',
    correctEnglish: 'That person is a woman.',
    distractors: [
      { romaji: 'Ano hito no onna no hito desu.', hiragana: 'あのひとのおんなのひとです。', english: 'Incorrect particle: "no" instead of "wa"' },
      { romaji: 'Onna no hito wa ano hito desu ka.', hiragana: 'おんなのひとはあのひとですか。', english: 'Echoing question format' },
    ],
  },

  // 26. Are they young people? -> Yes, they are young people.
  {
    id: 'exch-26',
    category: 'people',
    categoryLabel: 'Age & Gender',
    situationTitle: 'Young People Inquiry',
    englishMeaning: 'Are they young people?',
    promptSpeaker: 'Observer',
    promptRomaji: 'Ano hito wa wakamono desu ka?',
    promptHiragana: 'あのひとはわかものですかつ？',
    correctRomaji: 'Hai, wakamono desu.',
    correctHiragana: 'はい、わかものです。',
    correctEnglish: 'Yes, they are young people.',
    distractors: [
      { romaji: 'Hai, wakamono no desu.', hiragana: 'はい、わかものです。', english: 'Extraneous possessive "no"' },
      { romaji: 'Hai, wakamono de arimasu.', hiragana: 'はい、わかものであります。', english: 'Inanimate copula error' },
    ],
  },

  // 27. Are you adults? -> Yes, we are adults.
  {
    id: 'exch-27',
    category: 'people',
    categoryLabel: 'Age & Gender',
    situationTitle: 'Adult Status Inquiry',
    englishMeaning: 'Are you adults?',
    promptSpeaker: 'Guide',
    promptRomaji: 'Anata-tachi wa otona desu ka?',
    promptHiragana: 'あなたたちはおとなですか？',
    correctRomaji: 'Hai, watashitachi wa otona desu.',
    correctHiragana: 'はい、わたしたちはおとなです。',
    correctEnglish: 'Yes, we are adults.',
    distractors: [
      { romaji: 'Hai, watashitachi no otona desu.', hiragana: 'はい、わたしたちのおとなです。', english: 'Incorrect particle: "no" instead of "wa"' },
      { romaji: 'Hai, otona wa watashitachi desu.', hiragana: 'はい、おとなはわたしたちです。', english: 'Reversed topic and predicate' },
    ],
  },

  // 28. Excuse me for leaving before you. -> Goodbye, see you later.
  {
    id: 'exch-28',
    category: 'courtesy',
    categoryLabel: 'Workplace Courtesy',
    situationTitle: 'Leaving the Workplace',
    englishMeaning: 'Excuse me for leaving ahead of you.',
    promptSpeaker: 'Colleague',
    promptRomaji: 'Osaki ni shitsurei shimasu.',
    promptHiragana: 'おさきにしつれいします。',
    correctRomaji: 'Sayōnara, jā mata.',
    correctHiragana: 'さようなら、じゃあまた。',
    correctEnglish: 'Goodbye, see you later.',
    distractors: [
      { romaji: 'Jā mata, osaki ni shimasu.', hiragana: 'じゃあまた、おさきにします。', english: 'Incomplete reversed phrase' },
      { romaji: 'Sayōnara shitsurei desu.', hiragana: 'さようならしつれいdesu。', english: 'Improper combined greeting' },
    ],
  },

  // 29. Good morning. Let us exchange greetings. -> Good morning. Nice to meet you.
  {
    id: 'exch-29',
    category: 'courtesy',
    categoryLabel: 'Introductions & Greetings',
    situationTitle: 'Morning Greetings',
    englishMeaning: 'Good morning. Greeting.',
    promptSpeaker: 'Coworker',
    promptRomaji: 'Ohayō gozaimasu. Aisatsu o shimasu.',
    promptHiragana: 'おはようございます。あいさつをします。',
    correctRomaji: 'Ohayō gozaimasu. Dōzo yoroshiku.',
    correctHiragana: 'おはようございます。どうぞよろしく。',
    correctEnglish: 'Good morning. Pleased to meet you.',
    distractors: [
      { romaji: 'Ohayō gozaimasu. Aisatsu o kudasai.', hiragana: 'おはようございます。あいさつをください。', english: 'Incorrect verb request: "kudasai"' },
      { romaji: 'Dōzo yoroshiku ohayō no gozaimasu.', hiragana: 'どうぞよろしくおはようのございます。', english: 'Garbled phrasing order' },
    ],
  },

  // 30. Thank you very much. -> You are welcome / No problem.
  {
    id: 'exch-30',
    category: 'courtesy',
    categoryLabel: 'Courtesy',
    situationTitle: 'Expressing Gratitude',
    englishMeaning: 'Thank you very much.',
    promptSpeaker: 'Partner',
    promptRomaji: 'Arigatō gozaimasu.',
    promptHiragana: 'ありがとうございます。',
    correctRomaji: 'Iie, dōzo.',
    correctHiragana: 'いいえ、どうぞ。',
    correctEnglish: 'Not at all, you are welcome.',
    distractors: [
      { romaji: 'Hai, arigatō gozaimasu.', hiragana: 'はい、ありがとうございます。', english: 'Echoing thank you back' },
      { romaji: 'Iie, arigatō ja arimasen.', hiragana: 'いいえ、ありがとうじゃありません。', english: 'Nonsensical negative ending' },
    ],
  },

  // ========================================================
  // MAJOR COUNTRIES & ORIGIN (Conversational Phrases)
  // ========================================================

  // 31. Where are you from? -> I came from France.
  {
    id: 'exch-31',
    category: 'countries-origin',
    categoryLabel: 'Country & Origin',
    situationTitle: 'Origin: France',
    englishMeaning: 'Where are you from?',
    promptSpeaker: 'Host',
    promptRomaji: 'Dochira kara kimashita ka?',
    promptHiragana: 'どちらからきましたか？',
    correctRomaji: 'Furansu kara kimashita.',
    correctHiragana: 'ふらんすからきました。',
    correctEnglish: 'I am from France.',
    distractors: [
      { romaji: 'Furansu ni kimashita.', hiragana: 'ふらんすにきました。', english: 'Particle error: "ni" instead of "kara"' },
      { romaji: 'Kimashita Furansu kara.', hiragana: 'きましたふらんすから。', english: 'Incorrect word order' },
    ],
  },

  // 32. Where are you from? -> I came from America.
  {
    id: 'exch-32',
    category: 'countries-origin',
    categoryLabel: 'Country & Origin',
    situationTitle: 'Origin: America',
    englishMeaning: 'Where are you from?',
    promptSpeaker: 'Interviewer',
    promptRomaji: 'Dochira kara kimashita ka?',
    promptHiragana: 'どちらからきましたか？',
    correctRomaji: 'Amerika kara kimashita.',
    correctHiragana: 'あめりかからきました。',
    correctEnglish: 'I am from America.',
    distractors: [
      { romaji: 'Amerika o kimashita.', hiragana: 'あめりかをきました。', english: 'Particle error: "o" instead of "kara"' },
      { romaji: 'Kara kimashita Amerika.', hiragana: 'からきましたあめりか。', english: 'Incorrect word order' },
    ],
  },

  // 33. Did you come from Japan? -> Yes, I came from Japan.
  {
    id: 'exch-33',
    category: 'countries-origin',
    categoryLabel: 'Country & Origin',
    situationTitle: 'Origin: Japan',
    englishMeaning: 'Did you come from Japan?',
    promptSpeaker: 'Friend',
    promptRomaji: 'Anata wa Nihon kara kimashita ka?',
    promptHiragana: 'あなたはにほんからきましたか？',
    correctRomaji: 'Hai, Nihon kara kimashita.',
    correctHiragana: 'はい、にほんからきました。',
    correctEnglish: 'Yes, I came from Japan.',
    distractors: [
      { romaji: 'Hai, Nihon de kimashita.', hiragana: 'はい、にほんできました。', english: 'Particle error: "de" instead of "kara"' },
      { romaji: 'Hai, kimashita Nihon kara.', hiragana: 'はい、きましたにほんから。', english: 'Incorrect word order' },
    ],
  },

  // 34. Where are you from? -> I came from the UK.
  {
    id: 'exch-34',
    category: 'countries-origin',
    categoryLabel: 'Country & Origin',
    situationTitle: 'Origin: United Kingdom',
    englishMeaning: 'Where are you from?',
    promptSpeaker: 'Colleague',
    promptRomaji: 'Dochira kara kimashita ka?',
    promptHiragana: 'どちらからきましたか？',
    correctRomaji: 'Igirisu kara kimashita.',
    correctHiragana: 'いぎりすからきました。',
    correctEnglish: 'I am from the UK.',
    distractors: [
      { romaji: 'Igirisu wa kimashita.', hiragana: 'いぎりすはきました。', english: 'Particle error: "wa" instead of "kara"' },
      { romaji: 'Kara Igirisu kimashita.', hiragana: 'からいぎりすきました。', english: 'Incorrect word order' },
    ],
  },

  // 35. Did that person come from China? -> Yes, they came from China.
  {
    id: 'exch-35',
    category: 'countries-origin',
    categoryLabel: 'Country & Origin',
    situationTitle: 'Origin: China',
    englishMeaning: 'Did that person come from China?',
    promptSpeaker: 'Observer',
    promptRomaji: 'Ano hito wa Chūgoku kara kimashita ka?',
    promptHiragana: 'あのひとはちゅうごくからきましたか？',
    correctRomaji: 'Hai, Chūgoku kara kimashita.',
    correctHiragana: 'はい、ちゅうごくからきました。',
    correctEnglish: 'Yes, they came from China.',
    distractors: [
      { romaji: 'Hai, Chūgoku ni kimashita.', hiragana: 'はい、ちゅうごくにきました。', english: 'Particle error: "ni" instead of "kara"' },
      { romaji: 'Hai, kimashita Chūgoku kara.', hiragana: 'はい、きましたちゅうごくから。', english: 'Incorrect word order' },
    ],
  },

  // 36. Did she come from Korea? -> Yes, she came from Korea.
  {
    id: 'exch-36',
    category: 'countries-origin',
    categoryLabel: 'Country & Origin',
    situationTitle: 'Origin: Korea',
    englishMeaning: 'Did she come from Korea?',
    promptSpeaker: 'Classmate',
    promptRomaji: 'Kanojo wa Kankoku kara kimashita ka?',
    promptHiragana: 'かのじょはかんこくからきましたか？',
    correctRomaji: 'Hai, Kankoku kara kimashita.',
    correctHiragana: 'はい、かんこくからきました。',
    correctEnglish: 'Yes, she came from Korea.',
    distractors: [
      { romaji: 'Hai, Kankoku o kimashita.', hiragana: 'はい、かんこくをきました。', english: 'Particle error: "o" instead of "kara"' },
      { romaji: 'Hai, kara kimashita Kankoku.', hiragana: 'はい、からきましたかんこく。', english: 'Incorrect word order' },
    ],
  },

  // ========================================================
  // MAJOR LANGUAGES SPOKEN (Conversational Phrases)
  // ========================================================

  // 37. What language do you speak? -> I speak Japanese.
  {
    id: 'exch-37',
    category: 'languages',
    categoryLabel: 'Languages Spoken',
    situationTitle: 'Language: Japanese',
    englishMeaning: 'What language do you speak?',
    promptSpeaker: 'Interviewer',
    promptRomaji: 'Nani-go o hanashimasu ka?',
    promptHiragana: 'なにごをはなしますか？',
    correctRomaji: 'Nihongo o hanashimasu.',
    correctHiragana: 'にほんごをはなします。',
    correctEnglish: 'I speak Japanese.',
    distractors: [
      { romaji: 'Nihongo de hanashimasu ka.', hiragana: 'にほんごではなしますか。', english: 'Question marker on answer' },
      { romaji: 'Hanashimasu Nihongo o.', hiragana: 'はなしますにほんごを。', english: 'Incorrect word order' },
    ],
  },

  // 38. What language do you speak? -> I speak English.
  {
    id: 'exch-38',
    category: 'languages',
    categoryLabel: 'Languages Spoken',
    situationTitle: 'Language: English',
    englishMeaning: 'What language do you speak?',
    promptSpeaker: 'Tourist',
    promptRomaji: 'Nani-go o hanashimasu ka?',
    promptHiragana: 'なにごをはなしますか？',
    correctRomaji: 'Eigo o hanashimasu.',
    correctHiragana: 'えいごをはなします。',
    correctEnglish: 'I speak English.',
    distractors: [
      { romaji: 'Eigo ni hanashimasu.', hiragana: 'えいごにはなします。', english: 'Particle error: "ni" instead of "o"' },
      { romaji: 'O hanashimasu Eigo.', hiragana: 'をはなしますえいご。', english: 'Incorrect word order' },
    ],
  },

  // 39. Do you speak French? -> Yes, I speak French.
  {
    id: 'exch-39',
    category: 'languages',
    categoryLabel: 'Languages Spoken',
    situationTitle: 'Language: French',
    englishMeaning: 'Do you speak French?',
    promptSpeaker: 'Coworker',
    promptRomaji: 'Anata wa Furansugo o hanashimasu ka?',
    promptHiragana: 'あなたはふらんすごをはなしますか？',
    correctRomaji: 'Hai, Furansugo o hanashimasu.',
    correctHiragana: 'はい、ふらんすごをはなします。',
    correctEnglish: 'Yes, I speak French.',
    distractors: [
      { romaji: 'Hai, Furansugo wa hanashimasu ka.', hiragana: 'はい、ふらんすごははなしますか。', english: 'Question marker on response' },
      { romaji: 'Hai, hanashimasu Furansugo o.', hiragana: 'はい、はなしますふらんすごを。', english: 'Incorrect word order' },
    ],
  },

  // 40. Does he speak Japanese? -> Yes, he speaks Japanese.
  {
    id: 'exch-40',
    category: 'languages',
    categoryLabel: 'Languages Spoken',
    situationTitle: 'Third Person Language',
    englishMeaning: 'Does he speak Japanese?',
    promptSpeaker: 'Manager',
    promptRomaji: 'Kare wa Nihongo o hanashimasu ka?',
    promptHiragana: 'かれはにほんごをはなしますか？',
    correctRomaji: 'Hai, Nihongo o hanashimasu.',
    correctHiragana: 'はい、にほんごをはなします。',
    correctEnglish: 'Yes, he speaks Japanese.',
    distractors: [
      { romaji: 'Hai, Nihongo de hanashimasu.', hiragana: 'はい、にほんごではなします。', english: 'Particle error: "de" instead of "o"' },
      { romaji: 'Hai, o hanashimasu Nihongo.', hiragana: 'はい、をはなしますにほんご。', english: 'Incorrect word order' },
    ],
  },

  // ========================================================
  // AGE & NUMBERS (Conversational Phrases)
  // ========================================================

  // 41. How old are you? -> I am 20 years old.
  {
    id: 'exch-41',
    category: 'age-numbers',
    categoryLabel: 'Age & Numbers',
    situationTitle: 'Age Inquiry: 20',
    englishMeaning: 'How old are you?',
    promptSpeaker: 'Doctor',
    promptRomaji: 'Anata wa nan-sai desu ka?',
    promptHiragana: 'あなたはなんさいですか？',
    correctRomaji: 'Hatachi desu.',
    correctHiragana: 'はたちです。',
    correctEnglish: 'I am 20 years old.',
    distractors: [
      { romaji: 'Hatachi no desu.', hiragana: 'はたちのです。', english: 'Extraneous possessive particle' },
      { romaji: 'Desu hatachi wa.', hiragana: 'です、はたちは。', english: 'Inverted word order' },
    ],
  },

  // 42. How old is he? -> He is 19 years old.
  {
    id: 'exch-42',
    category: 'age-numbers',
    categoryLabel: 'Age & Numbers',
    situationTitle: 'Age Inquiry: 19',
    englishMeaning: 'How old is he?',
    promptSpeaker: 'Teacher',
    promptRomaji: 'Kare wa nan-sai desu ka?',
    promptHiragana: 'かれはなんさいですか？',
    correctRomaji: 'Jūkyūsai desu.',
    correctHiragana: 'じゅうきゅうさいです。',
    correctEnglish: 'He is 19 years old.',
    distractors: [
      { romaji: 'Jūkyūsai wa desu.', hiragana: 'じゅうきゅうさいはです。', english: 'Misplaced topic particle' },
      { romaji: 'Desu jūkyūsai.', hiragana: 'ですじゅうきゅうさい。', english: 'Inverted word order' },
    ],
  },

  // 43. How old is she? -> She is 22 years old.
  {
    id: 'exch-43',
    category: 'age-numbers',
    categoryLabel: 'Age & Numbers',
    situationTitle: 'Age Inquiry: 22',
    englishMeaning: 'How old is she?',
    promptSpeaker: 'Registrar',
    promptRomaji: 'Kanojo wa nan-sai desu ka?',
    promptHiragana: 'かのじょはなんさいですか？',
    correctRomaji: 'Nijūnisai desu.',
    correctHiragana: 'にじゅうにさいです。',
    correctEnglish: 'She is 22 years old.',
    distractors: [
      { romaji: 'Nijūnisai o desu.', hiragana: 'にじゅうにさいをです。', english: 'Extraneous object particle' },
      { romaji: 'Desu nijūnisai wa.', hiragana: 'ですにじゅうにさいは。', english: 'Inverted word order' },
    ],
  },

  // 44. How old is your friend? -> They are 25 years old.
  {
    id: 'exch-44',
    category: 'age-numbers',
    categoryLabel: 'Age & Numbers',
    situationTitle: 'Age Inquiry: 25',
    englishMeaning: 'How old is your friend?',
    promptSpeaker: 'Acquaintance',
    promptRomaji: 'Tomodachi wa nan-sai desu ka?',
    promptHiragana: 'ともだちはなんさいですか？',
    correctRomaji: 'Nijūgosai desu.',
    correctHiragana: 'にじゅうごさいです。',
    correctEnglish: 'They are 25 years old.',
    distractors: [
      { romaji: 'Nijūgosai de arimasu ka.', hiragana: 'にじゅうごさいでありますか。', english: 'Question marker on answer' },
      { romaji: 'Desu nijūgosai.', hiragana: 'ですにじゅうごさい。', english: 'Inverted word order' },
    ],
  },

  // 45. How old is the teacher? -> They are 30 years old.
  {
    id: 'exch-45',
    category: 'age-numbers',
    categoryLabel: 'Age & Numbers',
    situationTitle: 'Age Inquiry: 30',
    englishMeaning: 'How old is the teacher?',
    promptSpeaker: 'Student',
    promptRomaji: 'Sensei wa nan-sai desu ka?',
    promptHiragana: 'せんせいはなんさいですか？',
    correctRomaji: 'Sanjissai desu.',
    correctHiragana: 'さんじゅっさいです。',
    correctEnglish: 'They are 30 years old.',
    distractors: [
      { romaji: 'Sanjissai no desu.', hiragana: 'さんじゅっさいのです。', english: 'Extraneous possessive particle' },
      { romaji: 'Desu sanjissai wa.', hiragana: 'ですさんじゅっさいは。', english: 'Inverted word order' },
    ],
  },

  // 46. How old is that company employee? -> They are 40 years old.
  {
    id: 'exch-46',
    category: 'age-numbers',
    categoryLabel: 'Age & Numbers',
    situationTitle: 'Age Inquiry: 40',
    englishMeaning: 'How old is that company employee?',
    promptSpeaker: 'Client',
    promptRomaji: 'Ano kaishain wa nan-sai desu ka?',
    promptHiragana: 'あのかいしゃいんはなんさいですか？',
    correctRomaji: 'Yonjissai desu.',
    correctHiragana: 'よんじゅっさいです。',
    correctEnglish: 'They are 40 years old.',
    distractors: [
      { romaji: 'Yonjissai wa desu.', hiragana: 'よんじゅっさいはです。', english: 'Misplaced topic particle' },
      { romaji: 'Desu yonjissai.', hiragana: 'ですよんじゅっさい。', english: 'Inverted word order' },
    ],
  },

  // 47. How old is that elderly person? -> They are 65 years old.
  {
    id: 'exch-47',
    category: 'age-numbers',
    categoryLabel: 'Age & Numbers',
    situationTitle: 'Age Inquiry: 65',
    englishMeaning: 'How old is that elderly person?',
    promptSpeaker: 'Nurse',
    promptRomaji: 'Ano otoshiyori wa nan-sai desu ka?',
    promptHiragana: 'あのおとしよりはなんさいですか？',
    correctRomaji: 'Rokujūgosai desu.',
    correctHiragana: 'ろくじゅうごさいです。',
    correctEnglish: 'They are 65 years old.',
    distractors: [
      { romaji: 'Rokujūgosai o desu.', hiragana: 'ろくじゅうごさいをです。', english: 'Extraneous object particle' },
      { romaji: 'Desu rokujūgosai wa.', hiragana: 'ですろくじゅうごさいは。', english: 'Inverted word order' },
    ],
  },

  // 48. Eric, where are you from? -> I'm from France.
  {
    id: 'exch-48',
    category: 'countries-origin',
    categoryLabel: 'Country & Origin',
    situationTitle: 'Origin Inquiry: Eric (France)',
    englishMeaning: 'Eric, where are you from?',
    promptSpeaker: 'Colleague',
    promptRomaji: 'Erikku-san, dochira kara desu ka?',
    promptHiragana: 'エリックさん、どちらからですか？',
    correctRomaji: 'Furansu kara kimashita.',
    correctHiragana: 'フランスから来ました。',
    correctEnglish: "I'm from France.",
    distractors: [
      { romaji: 'Furansu ni kimashita.', hiragana: 'フランスにきました。', english: 'Particle error: "ni" instead of "kara"' },
      { romaji: 'Kimashita Furansu kara.', hiragana: 'きましたフランスから。', english: 'Incorrect word order' },
    ],
    questionDistractors: [
      { romaji: 'Erikku-san, dochira ni desu ka?', hiragana: 'エリックさん、どちらにですか？', english: 'Particle error: "ni" instead of "kara"' },
      { romaji: 'Kara desu ka Erikku-san, dochira?', hiragana: 'からですかエリックさん、どちら？', english: 'Inverted word order' },
    ],
  },

  // 49. Eric, how old are you? -> I am 35 years old.
  {
    id: 'exch-49',
    category: 'age-numbers',
    categoryLabel: 'Age & Numbers',
    situationTitle: 'Age Inquiry: Eric (35)',
    englishMeaning: 'Eric, how old are you?',
    promptSpeaker: 'Friend',
    promptRomaji: 'Erikku-san, nan-sai desu ka?',
    promptHiragana: 'エリックさん、なんさいですか？',
    correctRomaji: 'Watashi wa sanjūgo-sai desu.',
    correctHiragana: 'わたしはさんじゅうごさいです。',
    correctEnglish: 'I am 35 years old.',
    distractors: [
      { romaji: 'Watashi wa sanjūgo-sai no desu.', hiragana: 'わたしはさんじゅうごさいのです。', english: 'Extraneous possessive particle' },
      { romaji: 'Desu watashi wa sanjūgo-sai.', hiragana: 'ですわたしはさんじゅうごさい。', english: 'Inverted word order' },
    ],
    questionDistractors: [
      { romaji: 'Erikku-san, nan-sai no desu ka?', hiragana: 'エリックさん、なんさいのですか？', english: 'Extraneous possessive particle' },
      { romaji: 'Desu ka Erikku-san, nan-sai?', hiragana: 'ですかエリックさん、なんさい？', english: 'Inverted word order' },
    ],
  },

  // 50. How have things been lately? -> I'm doing well.
  {
    id: 'exch-50',
    category: 'daily-inquiry',
    categoryLabel: 'Daily Inquiry & Feelings',
    situationTitle: 'Catching Up: Lately',
    englishMeaning: 'How have things been lately?',
    promptSpeaker: 'Colleague',
    promptRomaji: 'Saikin dō desu ka?',
    promptHiragana: 'さいきんどうですか？',
    correctRomaji: 'Genki desu.',
    correctHiragana: 'げんきです。',
    correctEnglish: "I'm doing well.",
    distractors: [
      { romaji: 'Genki o desu.', hiragana: 'げんきをです。', english: 'Extraneous object particle' },
      { romaji: 'Desu genki wa.', hiragana: 'ですげんきは。', english: 'Inverted word order' },
    ],
    questionDistractors: [
      { romaji: 'Saikin dō no desu ka?', hiragana: 'さいきんどうのですか？', english: 'Extraneous particle error' },
      { romaji: 'Desu ka saikin dō?', hiragana: 'ですかさいきんどう？', english: 'Inverted word order' },
    ],
  },

  // 51. How is your Japanese? -> It's interesting.
  {
    id: 'exch-51',
    category: 'daily-inquiry',
    categoryLabel: 'Daily Inquiry & Studies',
    situationTitle: 'Language Progress',
    englishMeaning: 'How is your Japanese?',
    promptSpeaker: 'Teacher',
    promptRomaji: 'Nihongo wa dō desu ka?',
    promptHiragana: 'にほんごはどうですか？',
    correctRomaji: 'Omoshiroi desu.',
    correctHiragana: 'おもしろいです。',
    correctEnglish: "It's interesting.",
    distractors: [
      { romaji: 'Omoshiroi o desu.', hiragana: 'おもしろいをです。', english: 'Extraneous particle error' },
      { romaji: 'Desu omoshiroi wa.', hiragana: 'ですおもしろいは。', english: 'Inverted word order' },
    ],
    questionDistractors: [
      { romaji: 'Nihongo no dō desu ka?', hiragana: 'にほんごのどうですか？', english: 'Particle error: "no" instead of "wa"' },
      { romaji: 'Desu ka Nihongo wa dō?', hiragana: 'ですか日本語はどう？', english: 'Inverted word order' },
    ],
  },

  // 52. How are your studies? -> It's difficult.
  {
    id: 'exch-52',
    category: 'daily-inquiry',
    categoryLabel: 'Daily Inquiry & Studies',
    situationTitle: 'Study Check',
    englishMeaning: 'How are your studies?',
    promptSpeaker: 'Friend',
    promptRomaji: 'Benkyō wa dō desu ka?',
    promptHiragana: 'べんきょうはどうですか？',
    correctRomaji: 'Muzukashii desu.',
    correctHiragana: 'むずかしいです。',
    correctEnglish: "It's difficult.",
    distractors: [
      { romaji: 'Muzukashii o desu.', hiragana: 'むずかしいをです。', english: 'Extraneous particle error' },
      { romaji: 'Desu muzukashii wa.', hiragana: 'ですむずかしいは。', english: 'Inverted word order' },
    ],
    questionDistractors: [
      { romaji: 'Benkyō ni dō desu ka?', hiragana: 'べんきょうにどうですか？', english: 'Particle error: "ni" instead of "wa"' },
      { romaji: 'Desu ka Benkyō wa dō?', hiragana: 'ですかべんきょうはどう？', english: 'Inverted word order' },
    ],
  },

  // 53. How is your family? -> Everyone is doing well.
  {
    id: 'exch-53',
    category: 'daily-inquiry',
    categoryLabel: 'Daily Inquiry & Family',
    situationTitle: 'Family Well-being',
    englishMeaning: 'How is your family?',
    promptSpeaker: 'Neighbor',
    promptRomaji: 'Kazoku wa dō desu ka?',
    promptHiragana: 'かぞくはどうですか？',
    correctRomaji: 'Minna genki desu.',
    correctHiragana: 'みんなげんきです。',
    correctEnglish: 'Everyone is doing well.',
    distractors: [
      { romaji: 'Minna o genki desu.', hiragana: 'みんなをげんきです。', english: 'Extraneous particle error' },
      { romaji: 'Genki desu minna wa.', hiragana: 'げんきですみんなは。', english: 'Inverted word order' },
    ],
    questionDistractors: [
      { romaji: 'Kazoku no dō desu ka?', hiragana: 'かぞくのどうですか？', english: 'Particle error: "no" instead of "wa"' },
      { romaji: 'Desu ka Kazoku wa dō?', hiragana: 'ですかかぞくはどう？', english: 'Inverted word order' },
    ],
  },

  // 54. What day of the week is it today? -> Today is Monday.
  {
    id: 'exch-54',
    category: 'time-days',
    categoryLabel: 'Days of the Week',
    situationTitle: 'Calendar Check: Today',
    englishMeaning: 'What day of the week is it today?',
    promptSpeaker: 'Coworker',
    promptRomaji: "Kyō wa nan'yōbi desu ka?",
    promptHiragana: 'きょうはなんようびですか？',
    correctRomaji: 'Kyō wa getsuyōbi desu.',
    correctHiragana: 'きょうはげつようびです。',
    correctEnglish: 'Today is Monday.',
    distractors: [
      { romaji: 'Kyō ni getsuyōbi desu.', hiragana: 'きょうにげつようびです。', english: 'Particle error: "ni" instead of "wa"' },
      { romaji: 'Getsuyōbi desu kyō wa.', hiragana: 'げつようびですきょうは。', english: 'Inverted word order' },
    ],
    questionDistractors: [
      { romaji: "Kyō no nan'yōbi desu ka?", hiragana: 'きょうのなんようびですか？', english: 'Particle error: "no" instead of "wa"' },
      { romaji: "Desu ka kyō wa nan'yōbi?", hiragana: 'ですかきょうはなんようび？', english: 'Inverted word order' },
    ],
  },

  // 55. What day is tomorrow? -> Tomorrow is Tuesday.
  {
    id: 'exch-55',
    category: 'time-days',
    categoryLabel: 'Days of the Week',
    situationTitle: 'Calendar Check: Tomorrow',
    englishMeaning: 'What day is tomorrow?',
    promptSpeaker: 'Classmate',
    promptRomaji: "Ashita wa nan'yōbi desu ka?",
    promptHiragana: 'あしたはなんようびですか？',
    correctRomaji: 'Ashita wa kayōbi desu.',
    correctHiragana: 'あしたはかようびです。',
    correctEnglish: 'Tomorrow is Tuesday.',
    distractors: [
      { romaji: 'Ashita ni kayōbi desu.', hiragana: 'あしたにかようびです。', english: 'Particle error: "ni" instead of "wa"' },
      { romaji: 'Kayōbi desu ashita wa.', hiragana: 'かようびですあしたは。', english: 'Inverted word order' },
    ],
    questionDistractors: [
      { romaji: "Ashita no nan'yōbi desu ka?", hiragana: 'あしたのなんようびですか？', english: 'Particle error: "no" instead of "wa"' },
      { romaji: "Desu ka ashita wa nan'yōbi?", hiragana: 'ですかあしたはなんようび？', english: 'Inverted word order' },
    ],
  },

  // 56. What time is it now? -> It is 3:30 PM.
  {
    id: 'exch-56',
    category: 'time-days',
    categoryLabel: 'Hours & Minutes',
    situationTitle: 'Asking Time: Afternoon',
    englishMeaning: 'What time is it now?',
    promptSpeaker: 'Traveler',
    promptRomaji: 'Ima, nanji desu ka?',
    promptHiragana: 'いま、なんじですか？',
    correctRomaji: 'Gogo sanji han desu.',
    correctHiragana: 'ごごさんじはんです。',
    correctEnglish: 'It is 3:30 PM.',
    distractors: [
      { romaji: 'Sanji han gogo desu.', hiragana: 'さんじはんごごです。', english: 'Incorrect word order (time before PM)' },
      { romaji: 'Gogo sanji han o desu.', hiragana: 'ごごさんじはんをです。', english: 'Extraneous object particle' },
    ],
    questionDistractors: [
      { romaji: 'Ima, nanji no desu ka?', hiragana: 'いま、なんじのですか？', english: 'Extraneous particle error' },
      { romaji: 'Desu ka ima, nanji?', hiragana: 'ですか今、なんじ？', english: 'Inverted word order' },
    ],
  },

  // 57. What time is it now? -> It is 8 AM.
  {
    id: 'exch-57',
    category: 'time-days',
    categoryLabel: 'Hours & Minutes',
    situationTitle: 'Asking Time: Morning',
    englishMeaning: 'What time is it now?',
    promptSpeaker: 'Hotel clerk',
    promptRomaji: 'Ima, nanji desu ka?',
    promptHiragana: 'いま、なんじですか？',
    correctRomaji: 'Gozen hachiji desu.',
    correctHiragana: 'ごぜんはちじです。',
    correctEnglish: 'It is 8 AM.',
    distractors: [
      { romaji: 'Hachiji gozen desu.', hiragana: 'はちじごぜんです。', english: 'Incorrect word order (time before AM)' },
      { romaji: 'Gozen hachiji o desu.', hiragana: 'ごぜんはちじをです。', english: 'Extraneous object particle' },
    ],
    questionDistractors: [
      { romaji: 'Ima, nanji ni desu ka?', hiragana: 'いま、なんじにですか？', english: 'Particle error: "ni" in equation sentence' },
      { romaji: 'Nanji desu ka ima?', hiragana: 'なんじですか今？', english: 'Inverted word order' },
    ],
  },

  // 58. What is this? -> This is a ballpoint pen.
  {
    id: 'exch-58',
    category: 'demonstratives',
    categoryLabel: 'Demonstratives & Identification',
    situationTitle: 'Object Identification: This',
    englishMeaning: 'What is this?',
    promptSpeaker: 'Student',
    promptRomaji: 'Kore wa nan desu ka?',
    promptHiragana: 'これはなんですか？',
    correctRomaji: 'Kore wa bōrupen desu.',
    correctHiragana: 'これはボールペンです。',
    correctEnglish: 'This is a ballpoint pen.',
    distractors: [
      { romaji: 'Kore ni bōrupen desu.', hiragana: 'これにボールペンです。', english: 'Particle error: "ni" instead of "wa"' },
      { romaji: 'Bōrupen desu kore wa.', hiragana: 'ボールペンですこれは。', english: 'Inverted word order' },
    ],
    questionDistractors: [
      { romaji: 'Kore no nan desu ka?', hiragana: 'これのなんですか？', english: 'Particle error: "no" instead of "wa"' },
      { romaji: 'Desu ka kore wa nan?', hiragana: 'ですかこれは何？', english: 'Inverted word order' },
    ],
  },

  // 59. What is that over there? -> That over there is a wallet.
  {
    id: 'exch-59',
    category: 'demonstratives',
    categoryLabel: 'Demonstratives & Identification',
    situationTitle: 'Object Identification: That Over There',
    englishMeaning: 'What is that over there?',
    promptSpeaker: 'Shopper',
    promptRomaji: 'Are wa nan desu ka?',
    promptHiragana: 'あれはなんですか？',
    correctRomaji: 'Are wa saifu desu.',
    correctHiragana: 'あれはさいふです。',
    correctEnglish: 'That over there is a wallet.',
    distractors: [
      { romaji: 'Are ni saifu desu.', hiragana: 'あれにさいふです。', english: 'Particle error: "ni" instead of "wa"' },
      { romaji: 'Saifu desu are wa.', hiragana: 'さいふですあれは。', english: 'Inverted word order' },
    ],
    questionDistractors: [
      { romaji: 'Are no nan desu ka?', hiragana: 'あれのなんですか？', english: 'Particle error: "no" instead of "wa"' },
      { romaji: 'Desu ka are wa nan?', hiragana: 'ですかあれは何？', english: 'Inverted word order' },
    ],
  },

  // 60. What is that? -> That is a wallet.
  {
    id: 'exch-60',
    category: 'demonstratives',
    categoryLabel: 'Demonstratives & Identification',
    situationTitle: 'Object Identification: That',
    englishMeaning: 'What is that?',
    promptSpeaker: 'Customer',
    promptRomaji: 'Sore wa nan desu ka?',
    promptHiragana: 'それはなんですか？',
    correctRomaji: 'Sore wa saifu desu.',
    correctHiragana: 'それはさいふです。',
    correctEnglish: 'That is a wallet.',
    distractors: [
      { romaji: 'Sore ni saifu desu.', hiragana: 'それにさいふです。', english: 'Particle error: "ni" instead of "wa"' },
      { romaji: 'Saifu desu sore wa.', hiragana: 'さいふですそれは。', english: 'Inverted word order' },
    ],
    questionDistractors: [
      { romaji: 'Sore no nan desu ka?', hiragana: 'それのなんですか？', english: 'Particle error: "no" instead of "wa"' },
      { romaji: 'Desu ka sore wa nan?', hiragana: 'ですかそれは何？', english: 'Inverted word order' },
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
  direction: 'question-to-reply' | 'reply-to-question';
  directionBadge: string;
  directionInstruction: string;
  prompt: string;
  promptAudio: string;
  promptEnglish: string;
  secondaryPrompt: string;
  categoryLabel: string;
  situationTitle: string;
  options: ExchangeOption[];
  correctOptionIndex: number;
}

/**
 * Get or dynamically generate plausible decoy question phrases for reverse practice.
 * 100% compliant with user's curriculum vocabulary and particle/grammar structure.
 */
export function getQuestionDistractors(
  item: ExchangeItem
): [{ romaji: string; hiragana: string; english: string }, { romaji: string; hiragana: string; english: string }] {
  if (item.questionDistractors && item.questionDistractors.length === 2) {
    return item.questionDistractors;
  }

  const romaji = item.promptRomaji;
  const hiragana = item.promptHiragana;

  // Decoy 1: Particle substitution using user curriculum rules
  let d1Romaji = romaji;
  let d1Hiragana = hiragana;
  let d1Desc = 'Particle error';

  if (romaji.includes(' wa ') && hiragana.includes('は')) {
    d1Romaji = romaji.replace(' wa ', ' no ');
    d1Hiragana = hiragana.replace('は', 'の');
    d1Desc = 'Particle error: "no" instead of "wa"';
  } else if (romaji.includes(' kara ') && hiragana.includes('から')) {
    d1Romaji = romaji.replace(' kara ', ' ni ');
    d1Hiragana = hiragana.replace('から', 'に');
    d1Desc = 'Particle error: "ni" instead of "kara"';
  } else if (romaji.includes(' de ') && hiragana.includes('で')) {
    d1Romaji = romaji.replace(' de ', ' o ');
    d1Hiragana = hiragana.replace('で', 'を');
    d1Desc = 'Particle error: "o" instead of "de"';
  } else if (romaji.includes(' o ') && hiragana.includes('を')) {
    d1Romaji = romaji.replace(' o ', ' ni ');
    d1Hiragana = hiragana.replace('を', 'に');
    d1Desc = 'Particle error: "ni" instead of "o"';
  } else if (romaji.includes('nan-sai') && hiragana.includes('なんさい')) {
    d1Romaji = romaji.replace('nan-sai', 'nan-sai no');
    d1Hiragana = hiragana.replace('なんさい', 'なんさいの');
    d1Desc = 'Extraneous possessive particle "no"';
  } else {
    d1Romaji = romaji.replace(' desu ka?', ' no desu ka?').replace(' ka?', ' no ka?');
    d1Hiragana = hiragana.replace('ですか？', 'のですか？').replace('か？', 'のか？');
    d1Desc = 'Extraneous particle error';
  }

  // Decoy 2: Inverted word order / syntax structure
  let d2Romaji = romaji;
  let d2Hiragana = hiragana;
  let d2Desc = 'Inverted word order';

  if (romaji.includes(' desu ka?')) {
    const core = romaji.replace(' desu ka?', '').replace('?', '').trim();
    d2Romaji = `Desu ka ${core}?`;
    const hCore = hiragana.replace('ですか？', '').replace('？', '').trim();
    d2Hiragana = `ですか${hCore}？`;
  } else if (romaji.includes(' ka?')) {
    const parts = romaji.replace('?', '').split(' ');
    if (parts.length >= 3) {
      d2Romaji = `${parts.slice(1).join(' ')} ${parts[0]}?`;
      d2Hiragana = `${hiragana.slice(2, -1)}${hiragana.slice(0, 2)}？`;
    } else {
      d2Romaji = `${romaji.replace(' ka?', '')} desu ka?`;
      d2Hiragana = `${hiragana.replace('か？', '')}ですか？`;
    }
  } else {
    d2Romaji = `Desu ka ${romaji.replace('?', '')}?`;
    d2Hiragana = `ですか${hiragana.replace('？', '')}？`;
  }

  return [
    { romaji: d1Romaji, hiragana: d1Hiragana, english: d1Desc },
    { romaji: d2Romaji, hiragana: d2Hiragana, english: d2Desc },
  ];
}

/**
 * Generate a 10-question quiz drawn from the exchanged conversation items.
 * STRICT: 100% compliant with user curriculum database.
 * Supports BIDIRECTIONAL practice:
 * - Some questions provide the QUESTION prompt and test finding the appropriate REPLY.
 * - Some questions provide the REPLY / ANSWER prompt (e.g. "I am 35 years old") and test finding the QUESTION that was asked.
 * @param mode 'romaji' for Exercise 6, 'hiragana' for Exercise 7
 * @param count number of questions (default 10)
 */
export function generateExchangeQuiz(mode: 'romaji' | 'hiragana', count = 10): ExchangeQuizQuestion[] {
  // Shuffle items
  const shuffled = [...EXCHANGE_DATA].sort(() => 0.5 - Math.random());
  const selectedItems = shuffled.slice(0, Math.min(count, shuffled.length));

  return selectedItems.map((item, index) => {
    const isRomaji = mode === 'romaji';

    // Eligible for reverse if prompt is a question inquiry
    const isEligibleForReverse = 
      item.promptRomaji.endsWith('ka?') || 
      item.promptRomaji.endsWith('ka') || 
      item.promptHiragana.endsWith('か？') || 
      item.promptHiragana.endsWith('か') ||
      item.category === 'age-numbers' ||
      item.category === 'countries-origin' ||
      item.category === 'languages' ||
      item.category === 'places-work' ||
      item.category === 'occupations';

    // Balanced mix: roughly half (alternating indices 1, 3, 5, 7, 9) test Reply -> Find Question!
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

      // Randomize order of the 3 options
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

      // Randomize order of the 3 options
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
      };
    }
  });
}
