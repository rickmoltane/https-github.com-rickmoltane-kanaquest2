export interface SpriteSpeechBubble {
  topPercent: number;      // % from top edge of scene (e.g. 7 to 10)
  leftPercent: number;     // % from left edge of scene (e.g. 50 for center, 66 for right)
  maxWidthPercent: number; // Maximum width as % of scene (e.g. 56 to 78)
  tailPercent: number;     // % along bottom of bubble where tail points (e.g. 35 to 65)
}

export interface SpriteMetadata {
  id: string; // '01' to '16'
  row: number; // 0 to 3
  col: number; // 0 to 3
  sceneTitle: string;
  characters: string;
  normalizedCrop: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
  bubblePosition: SpriteSpeechBubble;
}

export const SPRITE_SHEET_PATH = '/src/assets/images/conversation_sprites.jpg';

export const SPRITES_METADATA: Record<string, SpriteMetadata> = {
  '01': {
    id: '01',
    row: 0,
    col: 0,
    sceneTitle: 'Greeting on a street',
    characters: 'Young man and young woman',
    normalizedCrop: { x: 0.0, y: 0.0, w: 0.25, h: 0.25 },
    bubblePosition: { topPercent: 8, leftPercent: 50, maxWidthPercent: 80, tailPercent: 35 },
  },
  '02': {
    id: '02',
    row: 0,
    col: 1,
    sceneTitle: 'Teacher speaking in classroom',
    characters: 'Female teacher and several children',
    normalizedCrop: { x: 0.25, y: 0.0, w: 0.25, h: 0.25 },
    bubblePosition: { topPercent: 8, leftPercent: 50, maxWidthPercent: 74, tailPercent: 50 },
  },
  '03': {
    id: '03',
    row: 0,
    col: 2,
    sceneTitle: 'Discussion across office desk',
    characters: 'Two adults (office colleagues)',
    normalizedCrop: { x: 0.5, y: 0.0, w: 0.25, h: 0.25 },
    bubblePosition: { topPercent: 8, leftPercent: 66, maxWidthPercent: 60, tailPercent: 65 },
  },
  '04': {
    id: '04',
    row: 0,
    col: 3,
    sceneTitle: 'Talking outdoors in park',
    characters: 'Elderly man and young woman',
    normalizedCrop: { x: 0.75, y: 0.0, w: 0.25, h: 0.25 },
    bubblePosition: { topPercent: 8, leftPercent: 68, maxWidthPercent: 58, tailPercent: 65 },
  },
  '05': {
    id: '05',
    row: 1,
    col: 0,
    sceneTitle: 'Taking order at restaurant',
    characters: 'Male waiter and female customer',
    normalizedCrop: { x: 0.0, y: 0.25, w: 0.25, h: 0.25 },
    bubblePosition: { topPercent: 8, leftPercent: 48, maxWidthPercent: 64, tailPercent: 40 },
  },
  '06': {
    id: '06',
    row: 1,
    col: 1,
    sceneTitle: 'Discussing work on building site',
    characters: 'Two construction workers',
    normalizedCrop: { x: 0.25, y: 0.25, w: 0.25, h: 0.25 },
    bubblePosition: { topPercent: 8, leftPercent: 48, maxWidthPercent: 64, tailPercent: 45 },
  },
  '07': {
    id: '07',
    row: 1,
    col: 2,
    sceneTitle: 'Walking to school together',
    characters: 'Two schoolchildren in uniforms',
    normalizedCrop: { x: 0.5, y: 0.25, w: 0.25, h: 0.25 },
    bubblePosition: { topPercent: 8, leftPercent: 50, maxWidthPercent: 76, tailPercent: 50 },
  },
  '08': {
    id: '08',
    row: 1,
    col: 3,
    sceneTitle: 'Doctor consultation at clinic',
    characters: 'Female doctor and older patient',
    normalizedCrop: { x: 0.75, y: 0.25, w: 0.25, h: 0.25 },
    bubblePosition: { topPercent: 8, leftPercent: 68, maxWidthPercent: 60, tailPercent: 65 },
  },
  '09': {
    id: '09',
    row: 2,
    col: 0,
    sceneTitle: 'Greeting outside train station',
    characters: 'Young man and young woman',
    normalizedCrop: { x: 0.0, y: 0.5, w: 0.25, h: 0.25 },
    bubblePosition: { topPercent: 10, leftPercent: 50, maxWidthPercent: 78, tailPercent: 40 },
  },
  '10': {
    id: '10',
    row: 2,
    col: 1,
    sceneTitle: 'Chef serving meal to customer',
    characters: 'Male chef and counter customer',
    normalizedCrop: { x: 0.25, y: 0.5, w: 0.25, h: 0.25 },
    bubblePosition: { topPercent: 8, leftPercent: 56, maxWidthPercent: 64, tailPercent: 45 },
  },
  '11': {
    id: '11',
    row: 2,
    col: 2,
    sceneTitle: 'Woman in kimono chatting outdoors',
    characters: 'Two adults in traditional setting',
    normalizedCrop: { x: 0.5, y: 0.5, w: 0.25, h: 0.25 },
    bubblePosition: { topPercent: 8, leftPercent: 58, maxWidthPercent: 66, tailPercent: 60 },
  },
  '12': {
    id: '12',
    row: 2,
    col: 3,
    sceneTitle: 'Police officer speaking with citizen',
    characters: 'Police officer and young man at koban',
    normalizedCrop: { x: 0.75, y: 0.5, w: 0.25, h: 0.25 },
    bubblePosition: { topPercent: 8, leftPercent: 66, maxWidthPercent: 60, tailPercent: 45 },
  },
  '13': {
    id: '13',
    row: 3,
    col: 0,
    sceneTitle: 'Conversation at airport gate',
    characters: 'Businessman and woman traveler',
    normalizedCrop: { x: 0.0, y: 0.75, w: 0.25, h: 0.25 },
    bubblePosition: { topPercent: 8, leftPercent: 52, maxWidthPercent: 66, tailPercent: 55 },
  },
  '14': {
    id: '14',
    row: 3,
    col: 1,
    sceneTitle: 'Mother helping child with homework',
    characters: 'Mother and young school child',
    normalizedCrop: { x: 0.25, y: 0.75, w: 0.25, h: 0.25 },
    bubblePosition: { topPercent: 8, leftPercent: 38, maxWidthPercent: 60, tailPercent: 35 },
  },
  '15': {
    id: '15',
    row: 3,
    col: 2,
    sceneTitle: 'Two men talking after workout',
    characters: 'Two adult men at gym',
    normalizedCrop: { x: 0.5, y: 0.75, w: 0.25, h: 0.25 },
    bubblePosition: { topPercent: 8, leftPercent: 60, maxWidthPercent: 62, tailPercent: 50 },
  },
  '16': {
    id: '16',
    row: 3,
    col: 3,
    sceneTitle: 'Meeting on busy shopping street',
    characters: 'Young woman and friends shopping',
    normalizedCrop: { x: 0.75, y: 0.75, w: 0.25, h: 0.25 },
    bubblePosition: { topPercent: 8, leftPercent: 50, maxWidthPercent: 76, tailPercent: 50 },
  },
};

/**
 * Returns sprite metadata by ID, or fallback to '01'
 */
export function getSpriteMetadata(id?: string): SpriteMetadata {
  if (id && SPRITES_METADATA[id]) {
    return SPRITES_METADATA[id];
  }
  return SPRITES_METADATA['01'];
}

/**
 * Deterministically maps any conversation item to its matching visual sprite scene (01-16)
 */
export function getSpriteIdForItem(item: {
  id?: string;
  category?: string;
  situationTitle?: string;
  promptSpeaker?: string;
  subjectEntity?: string;
  promptRomaji?: string;
  promptHiragana?: string;
  correctRomaji?: string;
  spriteId?: string;
}): string {
  if (item.spriteId && SPRITES_METADATA[item.spriteId]) {
    return item.spriteId;
  }

  const cat = item.category || '';
  const text = `${item.situationTitle || ''} ${item.promptRomaji || ''} ${item.correctRomaji || ''} ${item.subjectEntity || ''}`.toLowerCase();

  // 1. Doctor / Clinic
  if (text.includes('doctor') || text.includes('isha') || text.includes('byōin') || text.includes('hospital') || text.includes('consultation')) {
    return '08';
  }

  // 2. Police / Station / Koban
  if (text.includes('police') || text.includes('kōban') || text.includes('keisatsukan') || text.includes('directions')) {
    return '12';
  }

  // 3. Classroom & Teacher
  if (cat === 'classroom' || text.includes('teacher') || text.includes('classroom') || text.includes('sensei') || text.includes('kiite') || text.includes('3-pēji') || text.includes('akete') || text.includes('hiraite') || text.includes('itte kudasai')) {
    if (text.includes('mother') || text.includes('child') || text.includes('homework') || text.includes('kaite') || text.includes('yonde')) {
      return '14'; // Mother helping child with homework
    }
    return '02'; // Teacher speaking to students
  }

  // 4. Mother helping child / homework
  if (text.includes('mother') || text.includes('child') || text.includes('homework') || text.includes('shukudai')) {
    return '14';
  }

  // 5. Restaurant / Waiter / Chef
  if (text.includes('chef') || text.includes('cook') || text.includes('ramen') || text.includes('meal')) {
    return '10'; // Chef serving customer
  }
  if (text.includes('waiter') || text.includes('order') || text.includes('restaurant') || text.includes('resutoran') || text.includes('mizu')) {
    return '05'; // Waiter taking order
  }

  // 6. Construction site
  if (text.includes('construction') || text.includes('site') || text.includes('matte kudasai') || text.includes('10-pun')) {
    return '06';
  }

  // 7. Schoolchildren / Walking to school / Days of the week
  if (text.includes('schoolchildren') || text.includes('gakkō') || text.includes('nan-yōbi') || text.includes('getsuyōbi') || text.includes('kayōbi') || text.includes('suiyōbi') || text.includes('mokuyōbi') || text.includes('kin\'yōbi')) {
    return '07';
  }

  // 8. Airport / International travel / Countries
  if (text.includes('airport') || text.includes('flight') || text.includes('travel') || text.includes('amerika') || text.includes('furansu') || text.includes('doko kara')) {
    return '13';
  }

  // 9. Traditional kimono / Kyoto
  if (text.includes('kimono') || text.includes('kyoto') || text.includes('traditional') || text.includes('nihonjin desu ka')) {
    return '11';
  }

  // 10. Gym / Workout / Fitness
  if (text.includes('gym') || text.includes('workout') || text.includes('exercise') || text.includes('taiiku')) {
    return '15';
  }

  // 11. Shopping street / Objects (kore, sore, are, saifu, borupen)
  if (cat === 'demonstratives' || text.includes('saifu') || text.includes('wallet') || text.includes('bōrupen') || text.includes('pen') || text.includes('shopping')) {
    return '16';
  }

  // 12. Office / Business desk
  if (cat === 'occupations' || cat === 'places-work' || text.includes('office') || text.includes('desk') || text.includes('kaishain') || text.includes('ginkōin') || text.includes('shigoto')) {
    return '03';
  }

  // 13. Elderly person / Grandfather / 70s
  if (text.includes('elderly') || text.includes('sofu') || text.includes('sobo') || text.includes('grandfather') || text.includes('grandmother') || text.includes('70') || text.includes('old')) {
    return '04';
  }

  // 14. Station meeting / Outside greeting
  if (text.includes('station') || text.includes('eki') || text.includes('outside') || text.includes('hisashiburi')) {
    return '09';
  }

  // 15. Daily inquiry (How are things?)
  if (cat === 'daily-inquiry') {
    if (text.includes('kazoku')) return '04';
    if (text.includes('benkyō')) return '14';
    if (text.includes('nihongo')) return '11';
    return '01';
  }

  // 16. Time and dates
  if (cat === 'time-days') {
    if (text.includes('nan-ji') || text.includes('gogo') || text.includes('gozen')) return '03';
    return '07';
  }

  // Default to street greeting
  return '01';
}

