export interface ExchangeItem {
  id: string;
  category: 'greetings' | 'introductions' | 'origin' | 'occupation' | 'courtesy' | 'parting' | 'meals' | 'places-work' | 'sentences';
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

  // Distractors: Deceptive replies roughly similar to the correct one (swapped word order, particle error, or altered grammar)
  distractors: [
    { romaji: string; hiragana: string; english: string },
    { romaji: string; hiragana: string; english: string }
  ];
}

export const EXCHANGE_DATA: ExchangeItem[] = [
  // 1. Where do you work? -> I work at a company.
  {
    id: 'exch-1',
    category: 'places-work',
    categoryLabel: 'Places and Work',
    situationTitle: 'Asking Workplace',
    englishMeaning: 'Where do you work?',
    promptSpeaker: 'Acquaintance',
    promptRomaji: 'Doko de hataraite imasu ka?',
    promptHiragana: 'どこではたらいていますか？',
    correctRomaji: 'Kaisha de hataraite imasu.',
    correctHiragana: 'かいしゃではたらいています。',
    correctEnglish: 'I work at a company.',
    distractors: [
      { romaji: 'Kaisha o hataraite imasu.', hiragana: 'かいしゃをはたらいています。', english: 'Incorrect particle: o instead of de' },
      { romaji: 'Hataraite kaisha de imasu.', hiragana: 'はたらいてかいしゃでいます。', english: 'Incorrect word order' },
    ],
  },

  // 2. Do you work at a school? -> Yes, I work at a school.
  {
    id: 'exch-2',
    category: 'places-work',
    categoryLabel: 'Places and Work',
    situationTitle: 'School Employment',
    englishMeaning: 'Do you work at a school?',
    promptSpeaker: 'Neighbor',
    promptRomaji: 'Gakkō de hataraite imasu ka?',
    promptHiragana: 'がっこうではたらいていますか？',
    correctRomaji: 'Hai, gakkō de hataraite imasu.',
    correctHiragana: 'はい、がっこうではたらいています。',
    correctEnglish: 'Yes, I work at a school.',
    distractors: [
      { romaji: 'Hai, gakkō ni hataraite imasu.', hiragana: 'はい、がっこうにはたらいています。', english: 'Incorrect particle: ni instead of de' },
      { romaji: 'Hai, hataraite gakkō de imasu.', hiragana: 'はい、はたらいてがっこうでいます。', english: 'Incorrect word order' },
    ],
  },

  // 3. Do you work at a hospital? -> Yes, I work at a hospital.
  {
    id: 'exch-3',
    category: 'places-work',
    categoryLabel: 'Places and Work',
    situationTitle: 'Hospital Employment',
    englishMeaning: 'Do you work at a hospital?',
    promptSpeaker: 'Colleague',
    promptRomaji: 'Byōin de hataraite imasu ka?',
    promptHiragana: 'びょういんではたらいていますか？',
    correctRomaji: 'Hai, byōin de hataraite imasu.',
    correctHiragana: 'はい、びょういんではたらいています。',
    correctEnglish: 'Yes, I work at a hospital.',
    distractors: [
      { romaji: 'Hai, byōin o hataraite imasu.', hiragana: 'はい、びょういんをはたらいています。', english: 'Incorrect particle: o instead of de' },
      { romaji: 'Hai, byōin de hataraki imasu.', hiragana: 'はい、びょういんではたらきます。', english: 'Incorrect verb form' },
    ],
  },

  // 4. Do you live on a pension? -> Yes, I live on a pension.
  {
    id: 'exch-4',
    category: 'places-work',
    categoryLabel: 'Places and Work',
    situationTitle: 'Living on Pension',
    englishMeaning: 'Do you live on a pension?',
    promptSpeaker: 'Friend',
    promptRomaji: 'Nenkin de seikatsu shite imasu ka?',
    promptHiragana: 'ねんきんでせいかつしていますか？',
    correctRomaji: 'Hai, nenkin de seikatsu shite imasu.',
    correctHiragana: 'はい、ねんきんでせいかつしています。',
    correctEnglish: 'Yes, I live on a pension.',
    distractors: [
      { romaji: 'Hai, nenkin o seikatsu shite imasu.', hiragana: 'はい、ねんきんをせいかつしています。', english: 'Incorrect particle: o instead of de' },
      { romaji: 'Hai, seikatsu de nenkin shite imasu.', hiragana: 'はい、せいかつでねんきんしています。', english: 'Inverted noun phrase' },
    ],
  },

  // 5. What is your name? -> My name is Tanaka.
  {
    id: 'exch-5',
    category: 'introductions',
    categoryLabel: 'Introductions',
    situationTitle: 'Asking Name',
    englishMeaning: 'What is your name?',
    promptSpeaker: 'Receptionist',
    promptRomaji: 'O-namae wa nan desu ka?',
    promptHiragana: 'おなまえはなんですか？',
    correctRomaji: 'Watashi no namae wa Tanaka desu.',
    correctHiragana: 'わたしのなまえはたなかです。',
    correctEnglish: 'My name is Tanaka.',
    distractors: [
      { romaji: 'Watashi wa namae no Tanaka desu.', hiragana: 'わたしはなまえのたなかです。', english: 'Misplaced particle no' },
      { romaji: 'Namae wa watashi no Tanaka desu.', hiragana: 'なまえはわたしのたなかです。', english: 'Mismatched order' },
    ],
  },

  // 6. Nice to meet you. I am Tanaka. Pleased to meet you. -> Nice to meet you, I am Suzuki. Likewise pleased to meet you.
  {
    id: 'exch-6',
    category: 'introductions',
    categoryLabel: 'Self Introduction',
    situationTitle: 'Meeting for the First Time',
    englishMeaning: 'Nice to meet you. I am Tanaka. Pleased to meet you.',
    promptSpeaker: 'Tanaka',
    promptRomaji: 'Hajimemashite. Watashi wa Tanaka desu.',
    promptHiragana: 'はじめまして。わたしはたなかです。',
    correctRomaji: 'Hajimemashite, Suzuki desu. Dōzo yoroshiku.',
    correctHiragana: 'はじめまして、すずきです。どうぞよろしく。',
    correctEnglish: 'Nice to meet you, I am Suzuki. Pleased to meet you.',
    distractors: [
      { romaji: 'Hajimemashite, Suzuki desu. Dōzo yoroshikunai.', hiragana: 'はじめまして、すずきです。どうぞよろしくない。', english: 'Negative polite ending error' },
      { romaji: 'Hajimemashite, Suzuki no desu yoroshiku.', hiragana: 'はじめまして、すずきのですよろしく。', english: 'Grammatical particle error' },
    ],
  },

  // 7. Pleased to make your acquaintance. -> The pleasure is mine, pleased to meet you.
  {
    id: 'exch-7',
    category: 'introductions',
    categoryLabel: 'Polite Introduction',
    situationTitle: 'Closing an Introduction',
    englishMeaning: 'Please treat me favorably.',
    promptSpeaker: 'Partner',
    promptRomaji: 'Dōzo yoroshiku onegaishimasu.',
    promptHiragana: 'どうぞよろしくおねがいします。',
    correctRomaji: 'Kochira koso, yoroshiku onegaishimasu.',
    correctHiragana: 'こちらこそ、よろしくおねがいします。',
    correctEnglish: 'The pleasure is mine, nice to meet you.',
    distractors: [
      { romaji: 'Kochira koso, onegaishimasu yoroshiku.', hiragana: 'こちらこそ、おねがいしますよろしく。', english: 'Inverted phrasing' },
      { romaji: 'Yoroshiku koso, kochira onegaishimasu.', hiragana: 'よろしくこそ、こちらおねがいします。', english: 'Wrong particle placement' },
    ],
  },

  // 8. Where did you come from? -> I came from France.
  {
    id: 'exch-8',
    category: 'origin',
    categoryLabel: 'Origin and Nationality',
    situationTitle: 'Where are you from?',
    englishMeaning: 'Where did you come from?',
    promptSpeaker: 'Classmate',
    promptRomaji: 'Dochira kara kimashita ka?',
    promptHiragana: 'どちらからきましたか？',
    correctRomaji: 'Watashi wa Furansu kara kimashita.',
    correctHiragana: 'わたしはふらんすからきました。',
    correctEnglish: 'I came from France.',
    distractors: [
      { romaji: 'Watashi kara Furansu wa kimashita.', hiragana: 'わたしからふらんすはきました。', english: 'Swapped origin particles' },
      { romaji: 'Watashi wa Furansu made kimashita.', hiragana: 'わたしはふらんすまできました。', english: 'Incorrect destination particle made' },
    ],
  },

  // 9. Did you come from Japan? -> Yes, I came from Japan.
  {
    id: 'exch-9',
    category: 'origin',
    categoryLabel: 'Origin and Nationality',
    situationTitle: 'From Japan?',
    englishMeaning: 'Did you come from Japan?',
    promptSpeaker: 'Host',
    promptRomaji: 'Nihon kara kimashita ka?',
    promptHiragana: 'にほんからきましたか？',
    correctRomaji: 'Hai, Nihon kara kimashita.',
    correctHiragana: 'はい、にほんからきました。',
    correctEnglish: 'Yes, I came from Japan.',
    distractors: [
      { romaji: 'Hai, Nihon made kimashita.', hiragana: 'はい、にほんまできました。', english: 'Wrong particle made' },
      { romaji: 'Hai, kimashita Nihon kara.', hiragana: 'はい、きましたにほんから。', english: 'Inverted verb order' },
    ],
  },

  // 10. What is your job? -> I work as an engineer.
  {
    id: 'exch-10',
    category: 'occupation',
    categoryLabel: 'Occupations',
    situationTitle: 'Asking Job Role',
    englishMeaning: 'What is your job?',
    promptSpeaker: 'Interviewer',
    promptRomaji: 'Anata no o-shigoto wa nan desu ka?',
    promptHiragana: 'あなたのおしごとはなんですか？',
    correctRomaji: 'Watashi wa enjinia o shite imasu.',
    correctHiragana: 'わたしはえんじにあをしています。',
    correctEnglish: 'I work as an engineer.',
    distractors: [
      { romaji: 'Watashi no enjinia o shite imasu.', hiragana: 'わたしのえんじにあをしています。', english: 'Incorrect particle no' },
      { romaji: 'Watashi wa enjinia de shite imasu.', hiragana: 'わたしはえんじにあでしています。', english: 'Incorrect particle de' },
    ],
  },

  // 11. Are you a student? -> Yes, I am a student.
  {
    id: 'exch-11',
    category: 'occupation',
    categoryLabel: 'Occupations',
    situationTitle: 'Student Status',
    englishMeaning: 'Are you a student?',
    promptSpeaker: 'Professor',
    promptRomaji: 'Anata wa gakusei desu ka?',
    promptHiragana: 'あなたはがくせいですか？',
    correctRomaji: 'Hai, watashi wa gakusei desu.',
    correctHiragana: 'はい、わたしはがくせいです。',
    correctEnglish: 'Yes, I am a student.',
    distractors: [
      { romaji: 'Hai, watashi no gakusei desu.', hiragana: 'はい、わたしのがくせいです。', english: 'Wrong particle no instead of wa' },
      { romaji: 'Hai, gakusei wa watashi desu.', hiragana: 'はい、がくせいはわたしです。', english: 'Reversed topic and predicate' },
    ],
  },

  // 12. Are you a doctor? -> No, I am not a doctor.
  {
    id: 'exch-12',
    category: 'occupation',
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
      { romaji: 'Iie, watashi wa isha de arimasen.', hiragana: 'いいえ、わたしはいしゃでありません。', english: 'Grammatical slip de arimasen' },
      { romaji: 'Iie, isha wa watashi ja arimasen.', hiragana: 'いいえ、いしゃはわたしじゃありません。', english: 'Inverted topic' },
    ],
  },

  // 13. Are you a teacher? -> Yes, I am a school teacher.
  {
    id: 'exch-13',
    category: 'occupation',
    categoryLabel: 'Occupations',
    situationTitle: 'Teacher Inquiry',
    englishMeaning: 'Are you a teacher?',
    promptSpeaker: 'Student',
    promptRomaji: 'Anata wa kyōshi desu ka?',
    promptHiragana: 'あなたはきょうしですか？',
    correctRomaji: 'Hai, gakkō no kyōshi desu.',
    correctHiragana: 'はい、がっこうのきょうしです。',
    correctEnglish: 'Yes, I am a school teacher.',
    distractors: [
      { romaji: 'Hai, kyōshi no gakkō desu.', hiragana: 'はい、きょうしのがっこうです。', english: 'Inverted noun modifier order' },
      { romaji: 'Hai, gakkō de kyōshi desu.', hiragana: 'はい、がっこうできょうしです。', english: 'Particle error: de instead of no' },
    ],
  },

  // 14. Is she a nurse? -> Yes, she is a hospital nurse.
  {
    id: 'exch-14',
    category: 'occupation',
    categoryLabel: 'Occupations',
    situationTitle: 'Nurse Inquiry',
    englishMeaning: 'Is she a nurse?',
    promptSpeaker: 'Visitor',
    promptRomaji: 'Kanojo wa kangoshi desu ka?',
    promptHiragana: 'かのじょはかんごしですか？',
    correctRomaji: 'Hai, byōin no kangoshi desu.',
    correctHiragana: 'はい、びょういんのかんごしです。',
    correctEnglish: 'Yes, she is a hospital nurse.',
    distractors: [
      { romaji: 'Hai, kangoshi no byōin desu.', hiragana: 'はい、かんごしのびょういんです。', english: 'Inverted modifier' },
      { romaji: 'Hai, byōin o kangoshi desu.', hiragana: 'はい、びょういんをかんごしです。', english: 'Wrong particle o' },
    ],
  },

  // 15. Is he an office employee? -> Yes, he works at a company.
  {
    id: 'exch-15',
    category: 'occupation',
    categoryLabel: 'Occupations',
    situationTitle: 'Office Employee Inquiry',
    englishMeaning: 'Is he a company employee?',
    promptSpeaker: 'Colleague',
    promptRomaji: 'Kare wa kaishain desu ka?',
    promptHiragana: 'かれはかいしゃいんですか？',
    correctRomaji: 'Hai, kaisha de hataraite imasu.',
    correctHiragana: 'はい、かいしゃではたらいています。',
    correctEnglish: 'Yes, he works at a company.',
    distractors: [
      { romaji: 'Hai, kaisha o hataraite imasu.', hiragana: 'はい、かいしゃをはたらいています。', english: 'Wrong particle o instead of de' },
      { romaji: 'Hai, hataraite kaisha de imasu.', hiragana: 'はい、はたらいてかいしゃでいます。', english: 'Mismatched word order' },
    ],
  },

  // 16. Please read this business card. -> Yes, I will try reading it now.
  {
    id: 'exch-16',
    category: 'sentences',
    categoryLabel: 'Useful Sentences',
    situationTitle: 'Reading Instruction',
    englishMeaning: 'Please read this business card.',
    promptSpeaker: 'Instructor',
    promptRomaji: 'Kono meishi o yonde kudasai.',
    promptHiragana: 'このめいしをよんでください。',
    correctRomaji: 'Hai, ima yonde mimasu.',
    correctHiragana: 'はい、いまよんでみます。',
    correctEnglish: 'Yes, I will try reading it now.',
    distractors: [
      { romaji: 'Hai, ima yonde kudasai.', hiragana: 'はい、いまよんでください.', english: 'Echoing request kudasai instead of answering' },
      { romaji: 'Hai, yonde ima mimasu.', hiragana: 'はい、よんでいまみます。', english: 'Incorrect adverbial placement' },
    ],
  },

  // 17. Please do your self-introduction. -> Yes, I will do my self-introduction.
  {
    id: 'exch-17',
    category: 'introductions',
    categoryLabel: 'Self Introduction',
    situationTitle: 'Request for Introduction',
    englishMeaning: 'Please give your self-introduction.',
    promptSpeaker: 'Host',
    promptRomaji: 'Jiko shōkai o onegaishimasu.',
    promptHiragana: 'じこしょうかいをおねがいします。',
    correctRomaji: 'Hai, watashi no jiko shōkai o shimasu.',
    correctHiragana: 'はい、わたしのじこしょうかいをします。',
    correctEnglish: 'Yes, I will do my self-introduction.',
    distractors: [
      { romaji: 'Hai, watashi wa jiko shōkai o kudasai.', hiragana: 'はい、わたしはじこしょうかいをください。', english: 'Incorrect verb phrasing' },
      { romaji: 'Hai, jiko shōkai de watashi o shimasu.', hiragana: 'はい、じこしょうかいでわたしをします。', english: 'Grammatical particle inversion' },
    ],
  },

  // 18. Thank you for your hard work today as well. -> Thank you for your hard work, see you tomorrow.
  {
    id: 'exch-18',
    category: 'courtesy',
    categoryLabel: 'Workplace Courtesy',
    situationTitle: 'End of Day Greeting',
    englishMeaning: 'Thank you for your hard work today as well.',
    promptSpeaker: 'Team Lead',
    promptRomaji: 'Kyō mo o-tsukaresama deshita.',
    promptHiragana: 'きょうもおつかれさまでした。',
    correctRomaji: 'Otsukaresama deshita. Mata ashita.',
    correctHiragana: 'おつかれさまでした。またあした。',
    correctEnglish: 'Thank you for your hard work. See you tomorrow.',
    distractors: [
      { romaji: 'Otsukaresama deshita. Ashita mata wa.', hiragana: 'おつかれさまでした。あしたまたは。', english: 'Grammatical syntax error' },
      { romaji: 'Mata otsukaresama deshita ashita.', hiragana: 'またおつかれさまでしたあした。', english: 'Confused word arrangement' },
    ],
  },

  // 19. Excuse me for leaving before you. -> Thank you for your hard work. Take care.
  {
    id: 'exch-19',
    category: 'parting',
    categoryLabel: 'Workplace Courtesy',
    situationTitle: 'Leaving the Workplace',
    englishMeaning: 'Excuse me for leaving ahead of you.',
    promptSpeaker: 'Colleague',
    promptRomaji: 'Osaki ni shitsurei shimasu.',
    promptHiragana: 'おさきにしつれいします。',
    correctRomaji: 'Otsukaresama deshita. Ki o tsukete.',
    correctHiragana: 'おつかれさまでした。きをつけて。',
    correctEnglish: 'Thank you for your hard work. Take care on your way.',
    distractors: [
      { romaji: 'Otsukaresama deshita. Ki ga tsukete.', hiragana: 'おつかれさまでした。きがつけて。', english: 'Wrong particle ga instead of o' },
      { romaji: 'Ki o tsukete. Osaki ni shimasu.', hiragana: 'きをつけて。おさきにします。', english: 'Incomplete reversed phrase' },
    ],
  },

  // 20. Thank you very much for helping me. -> Not at all, you are very welcome.
  {
    id: 'exch-20',
    category: 'courtesy',
    categoryLabel: 'Courtesy & Gratitude',
    situationTitle: 'Expressing Appreciation',
    englishMeaning: 'Thank you very much for helping.',
    promptSpeaker: 'Friend',
    promptRomaji: 'Tetsudatte kurete arigatō gozaimasu.',
    promptHiragana: 'てつだってくれてありがとうございます。',
    correctRomaji: 'Iie, dō itashimashite.',
    correctHiragana: 'いいえ、どういたしまして。',
    correctEnglish: 'Not at all, you are welcome.',
    distractors: [
      { romaji: 'Iie, dō itashimashita.', hiragana: 'いいえ、どういたしました。', english: 'Past tense error' },
      { romaji: 'Dōmo arigatō itashimashite.', hiragana: 'どうもありがとういたしまして。', english: 'Mismatched fused expression' },
    ],
  },

  // 21. The meal is ready! -> Thank you very much, let us eat!
  {
    id: 'exch-21',
    category: 'meals',
    categoryLabel: 'Meal Etiquette',
    situationTitle: 'Meal Announcement',
    englishMeaning: 'The meal is ready!',
    promptSpeaker: 'Cook',
    promptRomaji: 'Gohan ga dekimashita yo.',
    promptHiragana: 'ごはんができましたよ。',
    correctRomaji: 'Arigatō gozaimasu, itadakimasu!',
    correctHiragana: 'ありがとうございます、いただきます！',
    correctEnglish: 'Thank you, let us eat!',
    distractors: [
      { romaji: 'Arigatō gozaimasu, itadakimashita!', hiragana: 'ありがとうございます、いただきました！', english: 'Premature past tense before eating' },
      { romaji: 'Itadakimasu gozaimasu, arigatō!', hiragana: 'いただきますございます、ありがとう！', english: 'Garbled honorific order' },
    ],
  },

  // 22. How was the food? -> It was very delicious. Thank you for the meal!
  {
    id: 'exch-22',
    category: 'meals',
    categoryLabel: 'Meal Etiquette',
    situationTitle: 'After Finishing the Meal',
    englishMeaning: 'How was the food?',
    promptSpeaker: 'Host',
    promptRomaji: 'Gohan wa dō deshita ka?',
    promptHiragana: 'ごはんはどうでしたか？',
    correctRomaji: 'Totemo oishikatta desu. Gochisōsama deshita.',
    correctHiragana: 'とてもおいしかったです。ごちそうさまでした。',
    correctEnglish: 'It was very delicious. Thank you for the meal.',
    distractors: [
      { romaji: 'Totemo oishikatta desu. Itadakimasu deshita.', hiragana: 'とてもおいしかったです。いただきますでした。', english: 'Wrong meal phrase used after eating' },
      { romaji: 'Gochisōsama desu oishikatta totemo.', hiragana: 'ごちそうさまですおいしかったとても。', english: 'Scrambled clause order' },
    ],
  },

  // 23. Is that person your friend? -> Yes, they are my friend.
  {
    id: 'exch-23',
    category: 'introductions',
    categoryLabel: 'Friends & People',
    situationTitle: 'Friend Inquiry',
    englishMeaning: 'Is that person your friend?',
    promptSpeaker: 'Classmate',
    promptRomaji: 'Ano hito wa anata no tomodachi desu ka?',
    promptHiragana: 'あのひとはあなたのともだちですか？',
    correctRomaji: 'Hai, watashi no tomodachi desu.',
    correctHiragana: 'はい、わたしのともだちです。',
    correctEnglish: 'Yes, they are my friend.',
    distractors: [
      { romaji: 'Hai, tomodachi no watashi desu.', hiragana: 'はい、ともだちのわたしです。', english: 'Inverted possessive order' },
      { romaji: 'Hai, watashi wa tomodachi ga desu.', hiragana: 'はい、わたしはともだちがです。', english: 'Erroneous particle insertion' },
    ],
  },

  // 24. Will you come together with us? -> Yes, I will go together.
  {
    id: 'exch-24',
    category: 'courtesy',
    categoryLabel: 'Invitation',
    situationTitle: 'Inviting Along',
    englishMeaning: 'Will you come together with us?',
    promptSpeaker: 'Friend',
    promptRomaji: 'Watashitachi to issho ni ikimasu ka?',
    promptHiragana: 'わたしたちといっしょにいきますか？',
    correctRomaji: 'Hai, issho ni ikimasu.',
    correctHiragana: 'はい、いっしょにいきます。',
    correctEnglish: 'Yes, I will go together.',
    distractors: [
      { romaji: 'Hai, issho de ikimasu.', hiragana: 'はい、いっしょでいきます。', english: 'Wrong particle de instead of ni' },
      { romaji: 'Hai, ikimasu issho ni o.', hiragana: 'はい、いきますいっしょにお。', english: 'Scrambled predicate with trailing particle' },
    ],
  },

  // 25. Do you work as a farmer? -> Yes, I work on a farm.
  {
    id: 'exch-25',
    category: 'places-work',
    categoryLabel: 'Places and Work',
    situationTitle: 'Agricultural Work',
    englishMeaning: 'Do you work as a farmer?',
    promptSpeaker: 'Neighbor',
    promptRomaji: 'Anata wa nōka de hataraite imasu ka?',
    promptHiragana: 'あなたはのうかではたらいていますか？',
    correctRomaji: 'Hai, nōka de hataraite imasu.',
    correctHiragana: 'はい、のうかではたらいています。',
    correctEnglish: 'Yes, I work as a farmer.',
    distractors: [
      { romaji: 'Hai, nōka o hataraite imasu.', hiragana: 'はい、のうかをはたらいています。', english: 'Wrong particle o instead of de' },
      { romaji: 'Hai, hataraite nōka de imasu.', hiragana: 'はい、はたらいてのうかでいます。', english: 'Misordered clause structure' },
    ],
  },

  // 26. Where does she work part-time? -> She works part-time at a school.
  {
    id: 'exch-26',
    category: 'places-work',
    categoryLabel: 'Places and Work',
    situationTitle: 'Part-Time Work Location',
    englishMeaning: 'Where does she work part-time?',
    promptSpeaker: 'Friend',
    promptRomaji: 'Kanojo wa doko de arubaito o shite imasu ka?',
    promptHiragana: 'かのじょはどこであるばいとをしていますか？',
    correctRomaji: 'Gakkō de arubaito o shite imasu.',
    correctHiragana: 'がっこうであるばいとをしています。',
    correctEnglish: 'She works part-time at a school.',
    distractors: [
      { romaji: 'Gakkō o arubaito de shite imasu.', hiragana: 'がっこうをあるばいとでしています。', english: 'Swapped particles o and de' },
      { romaji: 'Arubaito de gakkō o shite imasu.', hiragana: 'あるばいとでがっこうをしています。', english: 'Scrambled noun objects' },
    ],
  },

  // 27. Is that child your child? -> Yes, they are my child.
  {
    id: 'exch-27',
    category: 'introductions',
    categoryLabel: 'People and Family',
    situationTitle: 'Child Inquiry',
    englishMeaning: 'Is that child your child?',
    promptSpeaker: 'Teacher',
    promptRomaji: 'Ano ko wa anata no kodomo desu ka?',
    promptHiragana: 'あのこはあなたのこどもですか？',
    correctRomaji: 'Hai, watashi no kodomo desu.',
    correctHiragana: 'はい、わたしのこどもです。',
    correctEnglish: 'Yes, that is my child.',
    distractors: [
      { romaji: 'Hai, kodomo no watashi desu.', hiragana: 'はい、こどものわたしです。', english: 'Inverted modifier order' },
      { romaji: 'Hai, watashi wa kodomo de desu.', hiragana: 'はい、わたしはこどもでです。', english: 'Extraneous particle de before copula' },
    ],
  },

  // 28. Please read this book. -> Yes, I will read it from now on.
  {
    id: 'exch-28',
    category: 'sentences',
    categoryLabel: 'Useful Sentences',
    situationTitle: 'Book Reading Request',
    englishMeaning: 'Please read this book.',
    promptSpeaker: 'Teacher',
    promptRomaji: 'Kono hon o yonde kudasai.',
    promptHiragana: 'このほんをよんでください。',
    correctRomaji: 'Hai, kore kara yomimasu.',
    correctHiragana: 'はい、これからよみます。',
    correctEnglish: 'Yes, I will read it now.',
    distractors: [
      { romaji: 'Hai, kore made yomimasu.', hiragana: 'はい、これまでよみます。', english: 'Wrong temporal particle made instead of kara' },
      { romaji: 'Hai, yomimasu kore kara o.', hiragana: 'はい、よみますこれからお。', english: 'Scrambled syntax' },
    ],
  },

  // 29. Do you work as a care worker? -> Yes, I work as a care worker at a hospital.
  {
    id: 'exch-29',
    category: 'places-work',
    categoryLabel: 'Places and Work',
    situationTitle: 'Care Worker Role',
    englishMeaning: 'Do you work as a care worker?',
    promptSpeaker: 'Colleague',
    promptRomaji: 'Kaigoshi no shigoto o shite imasu ka?',
    promptHiragana: 'かいごしのしごとをしていますか？',
    correctRomaji: 'Hai, byōin de kaigoshi o shite imasu.',
    correctHiragana: 'はい、びょういんでかいごしをしています。',
    correctEnglish: 'Yes, I work as a care worker at a hospital.',
    distractors: [
      { romaji: 'Hai, byōin o kaigoshi de shite imasu.', hiragana: 'はい、びょういんをかいごしでしています。', english: 'Inverted particle assignment' },
      { romaji: 'Hai, kaigoshi de byōin o shite imasu.', hiragana: 'はい、かいごしでびょういんをしています。', english: 'Garbled semantic relation' },
    ],
  },

  // 30. Are you a homemaker? -> Yes, I am a homemaker.
  {
    id: 'exch-30',
    category: 'occupation',
    categoryLabel: 'Occupations',
    situationTitle: 'Homemaker Status',
    englishMeaning: 'Are you a homemaker?',
    promptSpeaker: 'Interviewer',
    promptRomaji: 'Anata wa shufu desu ka?',
    promptHiragana: 'あなたはしゅふですか？',
    correctRomaji: 'Hai, watashi wa shufu desu.',
    correctHiragana: 'はい、わたしはしゅふです。',
    correctEnglish: 'Yes, I am a homemaker.',
    distractors: [
      { romaji: 'Hai, watashi no shufu desu.', hiragana: 'はい、わたしのしゅふです。', english: 'Incorrect particle no instead of wa' },
      { romaji: 'Hai, shufu wa watashi desu.', hiragana: 'はい、しゅふはわたしです。', english: 'Reversed topic and predicate' },
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
