export interface ExchangeItem {
  id: string;
  category: 'places-work' | 'occupations' | 'introductions' | 'people' | 'courtesy';
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
 * STRICT: 100% compliant with user curriculum database.
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
