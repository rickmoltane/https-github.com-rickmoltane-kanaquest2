export interface InteractionItem {
  id: string;
  category: 'introductions' | 'origin' | 'occupation' | 'greetings' | 'farewells' | 'courtesy';
  categoryLabel: string;
  illustrationId: string;
  situationTitle: string;
  situationContext: string;
  speakerName: string;
  questionHiragana: string; // Question in Hiragana ONLY
  questionEnglishMeaning: string;
  audioPrompt: string; // Text to speak via TTS
  promptGoal: string; // What the player needs to accomplish
  
  // Rule categorization for semantic & grammar validation
  ruleType: 
    | 'name_introduction' 
    | 'origin_from' 
    | 'occupation_statement' 
    | 'occupation_confirm_company' 
    | 'occupation_confirm_student' 
    | 'occupation_confirm_teacher' 
    | 'occupation_confirm_doctor' 
    | 'greeting_morning' 
    | 'greeting_daytime' 
    | 'greeting_evening' 
    | 'farewell_leaving_work' 
    | 'farewell_parting' 
    | 'polite_pleasure' 
    | 'gratitude_reply';

  sampleGoodReplies: {
    hiragana: string;
    english: string;
  }[];

  commonErrors: {
    keywords: string[];
    feedback: string;
  }[];
}

export const INTERACTION_DATA: InteractionItem[] = [
  // 1. Introductions - Name & Greeting
  {
    id: 'interaction-1',
    category: 'introductions',
    categoryLabel: 'Self Introduction',
    illustrationId: 'first-meeting',
    situationTitle: 'First Meeting',
    situationContext: 'A new coworker bows and introduces himself.',
    speakerName: 'えりっく',
    questionHiragana: 'はじめまして。えりっくです。おなまえは？',
    questionEnglishMeaning: "Nice to meet you. I'm Eric. What is your name?",
    audioPrompt: 'はじめまして。えりっくです。おなまえは？',
    promptGoal: 'State your name.',
    ruleType: 'name_introduction',
    sampleGoodReplies: [
      { hiragana: 'はじめまして、たなかです。どうぞよろしく。', english: "Nice to meet you, I'm Tanaka. Pleased to meet you." },
      { hiragana: 'たなかです。よろしくおねがいします。', english: "I'm Tanaka. I look forward to working with you." },
      { hiragana: 'さくらです。どうぞよろしく。', english: "I'm Sakura. Pleased to meet you." },
      { hiragana: 'えりっくです。', english: "I'm Eric." },
    ],
    commonErrors: [
      {
        keywords: ['かいしゃいんです', 'がくせいです', 'せんせいです'],
        feedback: "You answered with an occupation, but the partner asked for your name: 『おなまえは？』. Introduce yourself with 『[なまえ]です』.",
      },
      {
        keywords: ['ふらんすから', 'からきました'],
        feedback: "You answered where you came from, but the partner asked for your name: 『おなまえは？』. Say 『[なまえ]です』.",
      },
    ],
  },

  // 2. Origin - Where did you come from?
  {
    id: 'interaction-2',
    category: 'origin',
    categoryLabel: 'Country & Origin',
    illustrationId: 'asking-origin',
    situationTitle: 'International Meetup',
    situationContext: 'Someone asks where you came from.',
    speakerName: 'ともだち',
    questionHiragana: 'えりっくさん、どちらから きましたか？',
    questionEnglishMeaning: 'Eric, where did you come from?',
    audioPrompt: 'えりっくさん、どちらから きましたか？',
    promptGoal: 'State where you came from.',
    ruleType: 'origin_from',
    sampleGoodReplies: [
      { hiragana: 'ふらんすから きました。', english: "I came from France." },
      { hiragana: 'にほんから きました。', english: "I came from Japan." },
      { hiragana: 'あめりかから きました。', english: "I came from America." },
      { hiragana: 'かなだから きました。', english: "I came from Canada." },
      { hiragana: 'ふらんすです。', english: "France." },
    ],
    commonErrors: [
      {
        keywords: ['かいしゃいんです', 'がくせいです'],
        feedback: "You stated an occupation, but the partner asked about your origin: 『どちらから きましたか？』. Use 『[くに]から きました』.",
      },
      {
        keywords: ['おはよう', 'こんにちは', 'こんばんは'],
        feedback: "The partner asked where you came from: 『どちらから きましたか？』. Reply with a country or city followed by 『から きました』.",
      },
    ],
  },

  // 3. Occupation - General question
  {
    id: 'interaction-3',
    category: 'occupation',
    categoryLabel: 'Work & Profession',
    illustrationId: 'asking-job',
    situationTitle: 'Work & Profession',
    situationContext: 'A contact asks what work you do.',
    speakerName: 'たなかさん',
    questionHiragana: 'えりっくさんは なんの しごとを していますか？',
    questionEnglishMeaning: 'Eric, what work do you do?',
    audioPrompt: 'えりっくさんは なんの しごとを していますか？',
    promptGoal: 'State your occupation.',
    ruleType: 'occupation_statement',
    sampleGoodReplies: [
      { hiragana: 'かいしゃいんです。', english: "I'm a company employee." },
      { hiragana: 'がくせいです。', english: "I'm a student." },
      { hiragana: 'せんせいです。', english: "I'm a teacher." },
      { hiragana: 'えんじにあです。', english: "I'm an engineer." },
      { hiragana: 'いしゃです。', english: "I'm a doctor." },
      { hiragana: 'ぎんこういんです。', english: "I'm a bank employee." },
      { hiragana: 'けんきゅうしゃです。', english: "I'm a researcher." },
    ],
    commonErrors: [
      {
        keywords: ['はい', 'いいえ'],
        feedback: "This is an open question ('What work do you do?'), not a yes/no question. Name an occupation + です, such as 『かいしゃいんです』 or 『がくせいです』.",
      },
      {
        keywords: ['ふらんすから', 'あめりかから'],
        feedback: "The partner asked for your job: 『なんの しごとを していますか？』, not your country. Say 『かいしゃいんです』 or another profession.",
      },
    ],
  },

  // 4. Occupation - Are you a company employee?
  {
    id: 'interaction-4',
    category: 'occupation',
    categoryLabel: 'Work & Profession',
    illustrationId: 'asking-company-worker',
    situationTitle: 'Corporate Office',
    situationContext: 'Someone asks if you are a company employee.',
    speakerName: 'うけつけ',
    questionHiragana: 'えりっくさんは かいしゃいんですか？',
    questionEnglishMeaning: 'Eric, are you a company employee?',
    audioPrompt: 'えりっくさんは かいしゃいんですか？',
    promptGoal: 'Confirm or deny being a company employee.',
    ruleType: 'occupation_confirm_company',
    sampleGoodReplies: [
      { hiragana: 'はい、かいしゃいんです。', english: "Yes, I'm a company employee." },
      { hiragana: 'いいえ、かいしゃいんじゃ ありません。', english: "No, I'm not a company employee." },
      { hiragana: 'いいえ、がくせいです。', english: "No, I'm a student." },
      { hiragana: 'いいえ、せんせいです。', english: "No, I'm a teacher." },
      { hiragana: 'はい、そうです。', english: "Yes, that's right." },
    ],
    commonErrors: [
      {
        keywords: ['ふらんすからきました'],
        feedback: "The speaker asked if you are a company employee: 『かいしゃいんですか？』. Respond with 『はい、かいしゃいんです』 or 『いいえ、...』.",
      },
    ],
  },

  // 5. Occupation - Are you a student?
  {
    id: 'interaction-5',
    category: 'occupation',
    categoryLabel: 'School & Studies',
    illustrationId: 'student',
    situationTitle: 'Campus Library',
    situationContext: 'A librarian asks if you are a student.',
    speakerName: 'としょかんいん',
    questionHiragana: 'がくせいですか？',
    questionEnglishMeaning: 'Are you a student?',
    audioPrompt: 'がくせいですか？',
    promptGoal: 'Confirm or deny being a student.',
    ruleType: 'occupation_confirm_student',
    sampleGoodReplies: [
      { hiragana: 'はい、がくせいです。', english: "Yes, I'm a student." },
      { hiragana: 'いいえ、かいしゃいんです。', english: "No, I'm a company employee." },
      { hiragana: 'いいえ、がくせいじゃ ありません。', english: "No, I'm not a student." },
      { hiragana: 'はい、そうです。', english: "Yes, that's correct." },
      { hiragana: 'いいえ、せんせいです。', english: "No, I'm a teacher." },
    ],
    commonErrors: [
      {
        keywords: ['おはようございます'],
        feedback: "The staff member asked a question: 『がくせいですか？』. Answer 『はい、がくせいです』 or 『いいえ、がくせいじゃ ありません』.",
      },
    ],
  },

  // 6. Morning Greeting
  {
    id: 'interaction-6',
    category: 'greetings',
    categoryLabel: 'Daily Greetings',
    illustrationId: 'morning-greeting',
    situationTitle: 'Morning Greeting',
    situationContext: 'Your colleague greets you in the morning.',
    speakerName: 'どうりょう',
    questionHiragana: 'おはようございます！',
    questionEnglishMeaning: 'Good morning!',
    audioPrompt: 'おはようございます！',
    promptGoal: 'Return the morning greeting.',
    ruleType: 'greeting_morning',
    sampleGoodReplies: [
      { hiragana: 'おはようございます！', english: "Good morning!" },
      { hiragana: 'おはよう！', english: "Morning! (casual/friendly)" },
    ],
    commonErrors: [
      {
        keywords: ['こんばんは'],
        feedback: "『こんばんは』 means good evening. In the morning, reply with 『おはようございます！』.",
      },
      {
        keywords: ['さようなら'],
        feedback: "You are arriving in the morning, not leaving. Return the greeting: 『おはようございます！』.",
      },
    ],
  },

  // 7. Daytime Greeting
  {
    id: 'interaction-7',
    category: 'greetings',
    categoryLabel: 'Daily Greetings',
    illustrationId: 'daytime-greeting',
    situationTitle: 'Daytime Meeting',
    situationContext: 'An acquaintance greets you in the afternoon.',
    speakerName: 'たなかさん',
    questionHiragana: 'こんにちは！',
    questionEnglishMeaning: 'Hello / Good afternoon!',
    audioPrompt: 'こんにちは！',
    promptGoal: 'Return the daytime greeting.',
    ruleType: 'greeting_daytime',
    sampleGoodReplies: [
      { hiragana: 'こんにちは！', english: "Hello / Good afternoon!" },
    ],
    commonErrors: [
      {
        keywords: ['おはようございます'],
        feedback: "It is daytime/afternoon. Use the daytime greeting 『こんにちは！』 rather than morning greeting.",
      },
      {
        keywords: ['こんばんは'],
        feedback: "『こんばんは』 is reserved for evening/night. In daytime, reply with 『こんにちは！』.",
      },
    ],
  },

  // 8. Evening Greeting
  {
    id: 'interaction-8',
    category: 'greetings',
    categoryLabel: 'Daily Greetings',
    illustrationId: 'evening-greeting',
    situationTitle: 'Evening Meetup',
    situationContext: 'A friend greets you in the evening.',
    speakerName: 'ともだち',
    questionHiragana: 'こんばんは！',
    questionEnglishMeaning: 'Good evening!',
    audioPrompt: 'こんばんは！',
    promptGoal: 'Return the evening greeting.',
    ruleType: 'greeting_evening',
    sampleGoodReplies: [
      { hiragana: 'こんばんは！', english: "Good evening!" },
    ],
    commonErrors: [
      {
        keywords: ['おはようございます'],
        feedback: "It is nighttime. Reply with the evening greeting: 『こんばんは！』.",
      },
    ],
  },

  // 9. Leaving Work
  {
    id: 'interaction-9',
    category: 'farewells',
    categoryLabel: 'Workplace Etiquette',
    illustrationId: 'leaving-work',
    situationTitle: 'Leaving the Office',
    situationContext: 'Your coworker is heading home before you.',
    speakerName: 'どうりょう',
    questionHiragana: 'おさきに しつれいします。',
    questionEnglishMeaning: 'Excuse me for leaving before you.',
    audioPrompt: 'おさきに しつれいします。',
    promptGoal: 'Acknowledge coworker leaving.',
    ruleType: 'farewell_leaving_work',
    sampleGoodReplies: [
      { hiragana: 'おつかれさまでした。', english: "Thank you for your hard work / Good job today." },
      { hiragana: 'おつかれさまです。', english: "Good work today." },
      { hiragana: 'じゃあまた。', english: "See you later." },
      { hiragana: 'さようなら。', english: "Goodbye." },
      { hiragana: 'またあした。', english: "See you tomorrow." },
    ],
    commonErrors: [
      {
        keywords: ['おはようございます', 'はじめまして'],
        feedback: "Your coworker is going home for the day! The standard respectful Japanese response is 『おつかれさまでした』 or 『またあした』.",
      },
    ],
  },

  // 10. Parting / See You Later
  {
    id: 'interaction-10',
    category: 'farewells',
    categoryLabel: 'Parting & Farewells',
    illustrationId: 'see-you-later',
    situationTitle: 'Farewell',
    situationContext: 'Your friend waves goodbye.',
    speakerName: 'ともだち',
    questionHiragana: 'じゃあ、また あした！',
    questionEnglishMeaning: 'Well, see you tomorrow!',
    audioPrompt: 'じゃあ、また あした！',
    promptGoal: 'Say goodbye.',
    ruleType: 'farewell_parting',
    sampleGoodReplies: [
      { hiragana: 'じゃあまた！', english: "See you later!" },
      { hiragana: 'またあした！', english: "See you tomorrow!" },
      { hiragana: 'さようなら！', english: "Goodbye!" },
      { hiragana: 'ばいばい！', english: "Bye-bye! (casual)" },
    ],
    commonErrors: [
      {
        keywords: ['はじめまして'],
        feedback: "You already know your friend! Say goodbye with 『じゃあまた！』 or 『またあした！』.",
      },
    ],
  },

  // 11. Polite Introduction Pleasure
  {
    id: 'interaction-11',
    category: 'courtesy',
    categoryLabel: 'Polite Exchanges',
    illustrationId: 'polite-intro',
    situationTitle: 'Formal Introduction',
    situationContext: 'A new associate bows and says pleased to meet you.',
    speakerName: 'とりひきさき',
    questionHiragana: 'どうぞ よろしく おねがいします。',
    questionEnglishMeaning: 'Pleased to meet you / I look forward to working with you.',
    audioPrompt: 'どうぞ よろしく おねがいします。',
    promptGoal: 'Respond politely with reciprocal respect.',
    ruleType: 'polite_pleasure',
    sampleGoodReplies: [
      { hiragana: 'こちらこそ よろしく おねがいします。', english: "Likewise, pleased to meet you / The pleasure is mine." },
      { hiragana: 'どうぞ よろしく。', english: "Pleased to meet you as well." },
      { hiragana: 'こちらこそ。', english: "Likewise / The pleasure is mutual." },
      { hiragana: 'よろしく おねがいします。', english: "Looking forward to working together." },
    ],
    commonErrors: [
      {
        keywords: ['さようなら'],
        feedback: "You are completing an introduction, not parting! Respond politely with 『こちらこそ よろしく おねがいします』.",
      },
    ],
  },

  // 12. Gratitude / Thank You
  {
    id: 'interaction-12',
    category: 'courtesy',
    categoryLabel: 'Polite Exchanges',
    illustrationId: 'thank-you',
    situationTitle: 'Thank You',
    situationContext: 'Someone thanks you warmly for your help.',
    speakerName: 'どうりょう',
    questionHiragana: 'ありがとうございます！',
    questionEnglishMeaning: 'Thank you very much!',
    audioPrompt: 'ありがとうございます！',
    promptGoal: "Respond with you are welcome.",
    ruleType: 'gratitude_reply',
    sampleGoodReplies: [
      { hiragana: 'いいえ、どういたしまして。', english: "You're welcome / Don't mention it." },
      { hiragana: 'いえ、どういたしまして。', english: "Not at all, you're welcome." },
      { hiragana: 'どういたしまして。', english: "You're welcome." },
      { hiragana: 'いえ。', english: "Not at all (polite modesty)." },
      { hiragana: 'いいえ。', english: "No problem at all." },
    ],
    commonErrors: [
      {
        keywords: ['さようなら', 'おやすみなさい'],
        feedback: "When someone says thank you, respond with 『どういたしまして』 or 『いえ、どういたしまして』.",
      },
    ],
  },

  // 13. Occupation - Teacher confirmation
  {
    id: 'interaction-13',
    category: 'occupation',
    categoryLabel: 'School & Teaching',
    illustrationId: 'teacher',
    situationTitle: 'Classroom',
    situationContext: 'Someone asks if you are a teacher.',
    speakerName: 'ほごしゃ',
    questionHiragana: 'せんせいですか？',
    questionEnglishMeaning: 'Are you a teacher?',
    audioPrompt: 'せんせいですか？',
    promptGoal: 'Confirm or deny being a teacher.',
    ruleType: 'occupation_confirm_teacher',
    sampleGoodReplies: [
      { hiragana: 'はい、せんせいです。', english: "Yes, I'm a teacher." },
      { hiragana: 'いいえ、せんせいじゃ ありません。', english: "No, I'm not a teacher." },
      { hiragana: 'いいえ、がくせいです。', english: "No, I'm a student." },
      { hiragana: 'いいえ、かいしゃいんです。', english: "No, I'm a company employee." },
      { hiragana: 'はい、そうです。', english: "Yes, that's right." },
    ],
    commonErrors: [
      {
        keywords: ['ふらんすからきました'],
        feedback: "The parent asked if you are a teacher: 『せんせいですか？』. Answer 『はい、せんせいです』 or 『いいえ、がくせいです』.",
      },
    ],
  },

  // 14. Occupation - Doctor confirmation
  {
    id: 'interaction-14',
    category: 'occupation',
    categoryLabel: 'Medical Clinic',
    illustrationId: 'doctor',
    situationTitle: 'Clinic',
    situationContext: 'A patient asks if you are the doctor.',
    speakerName: 'かんじゃ',
    questionHiragana: 'いしゃですか？',
    questionEnglishMeaning: 'Are you a doctor?',
    audioPrompt: 'いしゃですか？',
    promptGoal: 'Confirm or deny being a doctor.',
    ruleType: 'occupation_confirm_doctor',
    sampleGoodReplies: [
      { hiragana: 'はい、いしゃです。', english: "Yes, I'm a doctor." },
      { hiragana: 'いいえ、いしゃじゃ ありません。', english: "No, I'm not a doctor." },
      { hiragana: 'いいえ、かんごしです。', english: "No, I'm a nurse." },
      { hiragana: 'いいえ、かいしゃいんです。', english: "No, I'm an office worker." },
      { hiragana: 'はい、そうです。', english: "Yes, that's correct." },
    ],
    commonErrors: [
      {
        keywords: ['おはようございます'],
        feedback: "The patient asked a question: 『いしゃですか？』. Answer 『はい、いしゃです』 or 『いいえ、...』.",
      },
    ],
  },
];
