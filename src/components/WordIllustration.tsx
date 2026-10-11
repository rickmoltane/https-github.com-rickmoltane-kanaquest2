import React from 'react';

interface WordIllustrationProps {
  name: string;
  className?: string;
}

export const WordIllustration: React.FC<WordIllustrationProps> = ({ name, className = 'w-24 h-24' }) => {
  const strokeColor = '#18181b'; // zinc-900 high contrast

  switch (name) {
    // 1. asa (あさ) - Sunrise / Morning
    case 'sunrise':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          {/* Horizon */}
          <line x1="10" y1="70" x2="90" y2="70" strokeWidth="3.5" />
          {/* Rising Sun */}
          <path d="M30 70 A20 20 0 0 1 70 70" fill="#fef08a" />
          {/* Sun rays */}
          <line x1="50" y1="36" x2="50" y2="24" />
          <line x1="33" y1="43" x2="24" y2="34" />
          <line x1="67" y1="43" x2="76" y2="34" />
          <line x1="22" y1="58" x2="12" y2="54" />
          <line x1="78" y1="58" x2="88" y2="54" />
          {/* Clouds */}
          <path d="M14 80 C18 76 26 76 30 80 C34 76 42 76 46 80" stroke="#71717a" />
          <path d="M54 82 C58 78 66 78 70 82 C74 78 82 78 86 82" stroke="#71717a" />
        </svg>
      );

    // 2. hiru (ひる) - Bright Day Sun
    case 'sun':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="50" cy="50" r="22" fill="#fde047" strokeWidth="3.5" />
          {/* Bright rays */}
          <line x1="50" y1="12" x2="50" y2="20" strokeWidth="3.5" />
          <line x1="50" y1="80" x2="50" y2="88" strokeWidth="3.5" />
          <line x1="12" y1="50" x2="20" y2="50" strokeWidth="3.5" />
          <line x1="80" y1="50" x2="88" y2="50" strokeWidth="3.5" />
          <line x1="23" y1="23" x2="29" y2="29" strokeWidth="3" />
          <line x1="71" y1="71" x2="77" y2="77" strokeWidth="3" />
          <line x1="77" y1="23" x2="71" y2="29" strokeWidth="3" />
          <line x1="29" y1="71" x2="23" y2="77" strokeWidth="3" />
        </svg>
      );

    // 3. yoru (よる) - Night (Crescent moon and stars)
    case 'moon-stars':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <rect x="12" y="12" width="76" height="76" rx="16" fill="#1e1b4b" strokeWidth="3" />
          {/* Crescent Moon */}
          <path d="M52 28 A22 22 0 1 0 72 68 A26 26 0 0 1 52 28 Z" fill="#fef08a" stroke="#fef08a" strokeWidth="2" />
          {/* Stars */}
          <polygon points="28,34 30,40 36,40 31,43 33,49 28,45 23,49 25,43 20,40 26,40" fill="#ffffff" stroke="none" />
          <polygon points="74,30 75,34 79,34 76,36 77,40 74,37 71,40 72,36 69,34 73,34" fill="#ffffff" stroke="none" />
          <polygon points="32,68 33,71 36,71 34,73 35,76 32,74 29,76 30,73 28,71 31,71" fill="#ffffff" stroke="none" />
        </svg>
      );

    // 4. isu (いす) - Chair
    case 'chair':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" stroke={strokeColor} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Chair back */}
          <rect x="36" y="16" width="28" height="38" rx="4" fill="#f4f4f5" />
          <line x1="42" y1="22" x2="42" y2="48" strokeWidth="2.5" />
          <line x1="50" y1="22" x2="50" y2="48" strokeWidth="2.5" />
          <line x1="58" y1="22" x2="58" y2="48" strokeWidth="2.5" />
          {/* Chair seat */}
          <polygon points="28,54 72,54 66,62 34,62" fill="#e4e4e7" strokeWidth="3.5" />
          {/* Legs */}
          <line x1="34" y1="62" x2="30" y2="86" strokeWidth="4" />
          <line x1="66" y1="62" x2="70" y2="86" strokeWidth="4" />
          <line x1="40" y1="62" x2="38" y2="82" strokeWidth="3" />
          <line x1="60" y1="62" x2="62" y2="82" strokeWidth="3" />
          {/* Rung */}
          <line x1="32" y1="74" x2="68" y2="74" strokeWidth="2.5" />
        </svg>
      );

    // 5. ocha (おちゃ) - Green Tea (Teapot & Teacup)
    case 'tea':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          {/* Teapot */}
          <path d="M22 42 Q38 32 54 42 L52 56 Q38 62 24 56 Z" fill="#e4e4e7" />
          <path d="M38 32 C38 26 44 26 44 32" strokeWidth="3" />
          {/* Spout */}
          <path d="M22 46 C16 44 14 38 18 36" strokeWidth="3" />
          {/* Handle */}
          <path d="M52 42 C64 42 66 54 52 56" strokeWidth="3" />
          {/* Teacup with green tea */}
          <path d="M56 64 C56 78 78 78 78 64 Z" fill="#bbf7d0" strokeWidth="3.5" />
          <ellipse cx="67" cy="64" rx="11" ry="3" fill="#86efac" strokeWidth="2.5" />
          {/* Steam */}
          <path d="M64 58 C62 54 66 50 64 46" stroke="#a1a1aa" strokeWidth="2" />
        </svg>
      );

    // 6. tokei (とけい) - Clock / Alarm Clock
    case 'clock':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          {/* Bells */}
          <path d="M22 28 C22 20 30 20 34 26" strokeWidth="3.5" fill="#e4e4e7" />
          <path d="M78 28 C78 20 70 20 66 26" strokeWidth="3.5" fill="#e4e4e7" />
          {/* Feet */}
          <line x1="28" y1="78" x2="20" y2="86" strokeWidth="4" />
          <line x1="72" y1="78" x2="80" y2="86" strokeWidth="4" />
          {/* Face */}
          <circle cx="50" cy="52" r="30" fill="#ffffff" strokeWidth="3.5" />
          {/* Clock hands */}
          <line x1="50" y1="52" x2="50" y2="34" strokeWidth="3.5" />
          <line x1="50" y1="52" x2="64" y2="52" strokeWidth="3" />
          <circle cx="50" cy="52" r="3" fill={strokeColor} />
          {/* Ticks */}
          <line x1="50" y1="26" x2="50" y2="29" strokeWidth="2.5" />
          <line x1="76" y1="52" x2="73" y2="52" strokeWidth="2.5" />
          <line x1="50" y1="78" x2="50" y2="75" strokeWidth="2.5" />
          <line x1="24" y1="52" x2="27" y2="52" strokeWidth="2.5" />
        </svg>
      );

    // 7. umi (うみ) - Sea / Ocean
    case 'waves':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          {/* Sun on horizon */}
          <circle cx="50" cy="40" r="14" fill="#fed7aa" strokeWidth="2.5" />
          {/* Horizon line */}
          <line x1="12" y1="46" x2="88" y2="46" strokeWidth="2.5" stroke="#71717a" />
          {/* Waves */}
          <path d="M12 58 Q22 52 32 58 T52 58 T72 58 T88 58" strokeWidth="3.5" fill="none" />
          <path d="M12 70 Q22 64 32 70 T52 70 T72 70 T88 70" strokeWidth="3.5" fill="none" />
          <path d="M12 82 Q22 76 32 82 T52 82 T72 82 T88 82" strokeWidth="3.5" fill="none" />
        </svg>
      );

    // 8. yama (やま) - Mountain
    case 'mountain':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" stroke={strokeColor} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Mountain triangle */}
          <polygon points="50,18 88,82 12,82" fill="#e4e4e7" strokeWidth="3.5" />
          {/* Snow cap */}
          <polygon points="50,18 64,42 58,40 50,44 42,39 36,42" fill="#ffffff" strokeWidth="3" />
          {/* Ridge */}
          <line x1="50" y1="44" x2="48" y2="82" strokeWidth="2.5" stroke="#a1a1aa" />
        </svg>
      );

    // 9. inu (いぬ) - Dog
    case 'dog':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          {/* Head & Ear */}
          <path d="M30 38 C30 28 38 24 44 26 C46 22 52 24 50 32 L58 36 C62 38 60 44 54 44 L46 44 L42 52" fill="#f4f4f5" />
          {/* Eye & nose */}
          <circle cx="48" cy="34" r="1.5" fill={strokeColor} />
          <circle cx="58" cy="38" r="1.5" fill={strokeColor} />
          {/* Body */}
          <path d="M42 52 C50 48 68 50 72 58 L72 76" strokeWidth="3.5" />
          {/* Front legs */}
          <line x1="38" y1="52" x2="36" y2="80" strokeWidth="3.5" />
          <line x1="44" y1="52" x2="44" y2="80" strokeWidth="3.5" />
          {/* Back legs */}
          <line x1="68" y1="66" x2="68" y2="80" strokeWidth="3.5" />
          <line x1="74" y1="66" x2="76" y2="80" strokeWidth="3.5" />
          {/* Tail */}
          <path d="M72 54 C78 48 84 46 82 52" strokeWidth="3.5" />
        </svg>
      );

    // 10. neko (ねこ) - Cat
    case 'cat':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          {/* Head with pointy ears */}
          <polygon points="34,34 32,22 42,28 48,28 58,22 56,34" fill="#e4e4e7" strokeWidth="3" />
          <circle cx="45" cy="36" r="12" fill="#f4f4f5" strokeWidth="3" />
          {/* Eyes & nose */}
          <circle cx="41" cy="35" r="1.5" fill={strokeColor} />
          <circle cx="49" cy="35" r="1.5" fill={strokeColor} />
          <polygon points="45,39 43,41 47,41" fill={strokeColor} />
          {/* Whiskers */}
          <line x1="33" y1="38" x2="26" y2="37" />
          <line x1="33" y1="41" x2="27" y2="43" />
          <line x1="57" y1="38" x2="64" y2="37" />
          <line x1="57" y1="41" x2="63" y2="43" />
          {/* Body */}
          <path d="M40 48 C36 56 36 72 38 80" strokeWidth="3.5" />
          <path d="M50 48 C56 54 62 64 60 80" strokeWidth="3.5" />
          {/* Curled Tail */}
          <path d="M60 76 C72 74 76 60 70 54 C66 50 62 56 64 60" strokeWidth="3.5" />
        </svg>
      );

    // 11. zasshi (ざっし) - Magazine
    case 'magazine':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          {/* Magazine pages */}
          <polygon points="26,24 74,18 80,76 32,82" fill="#ffffff" strokeWidth="3.5" />
          {/* Cover border */}
          <polygon points="22,26 70,20 76,78 28,84" fill="#fafafa" strokeWidth="3.5" />
          <polygon points="18,28 66,22 72,80 24,86" fill="#ffffff" strokeWidth="3.5" />
          {/* Header text "MAGAZINE" */}
          <text x="24" y="38" fontSize="6" fontFamily="sans-serif" fontWeight="900" fill={strokeColor} transform="rotate(-6 24 38)">MAGAZINE</text>
          {/* Flower / Star image on cover */}
          <circle cx="46" cy="54" r="10" strokeWidth="2.5" fill="#fde047" />
          <path d="M46 44 L46 64 M36 54 L56 54" strokeWidth="2" />
        </svg>
      );

    // 12. tsukue (つくえ) - Desk
    case 'desk':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          {/* Desk top */}
          <polygon points="16,36 84,36 80,44 14,44" fill="#e4e4e7" strokeWidth="3.5" />
          {/* Left leg */}
          <line x1="20" y1="44" x2="20" y2="82" strokeWidth="4" />
          <line x1="26" y1="44" x2="26" y2="82" strokeWidth="3" />
          {/* Right drawer cabinet */}
          <rect x="56" y="44" width="22" height="34" fill="#f4f4f5" strokeWidth="3.5" />
          <line x1="56" y1="55" x2="78" y2="55" strokeWidth="2.5" />
          <line x1="56" y1="66" x2="78" y2="66" strokeWidth="2.5" />
          {/* Drawer knobs */}
          <circle cx="67" cy="50" r="1.5" fill={strokeColor} />
          <circle cx="67" cy="61" r="1.5" fill={strokeColor} />
          <circle cx="67" cy="72" r="1.5" fill={strokeColor} />
        </svg>
      );

    // 13. nihongo (にほんご) - Japanese Language Book
    case 'book-nihongo':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          {/* Book cover */}
          <rect x="22" y="18" width="56" height="66" rx="4" fill="#fef2f2" strokeWidth="3.5" />
          {/* Spine line */}
          <line x1="30" y1="18" x2="30" y2="84" strokeWidth="3" stroke="#dc2626" />
          {/* Japanese characters badge */}
          <rect x="36" y="28" width="34" height="24" rx="2" fill="#ffffff" strokeWidth="2.5" />
          <text x="39" y="44" fontSize="10" fontWeight="900" fontFamily="sans-serif" fill="#18181b">日本語</text>
          {/* Bookmark ribbon */}
          <path d="M60 18 L60 32 L64 28 L68 32 L68 18" fill="#dc2626" stroke="#dc2626" />
        </svg>
      );

    // 14. tenpura (てんぷら) - Tempura shrimp
    case 'tempura':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          {/* Chopsticks */}
          <line x1="82" y1="20" x2="48" y2="52" strokeWidth="3.5" stroke="#71717a" />
          <line x1="86" y1="26" x2="54" y2="56" strokeWidth="3.5" stroke="#71717a" />
          {/* Crispy tempura batter */}
          <path d="M22 62 Q32 46 48 50 Q60 54 62 48" strokeWidth="4" />
          <path d="M22 62 C26 70 42 72 54 62 C62 54 62 48 62 48" fill="#fde047" strokeWidth="3.5" />
          {/* Fried texture bumps */}
          <circle cx="34" cy="62" r="1.5" fill={strokeColor} />
          <circle cx="44" cy="58" r="1.5" fill={strokeColor} />
          <circle cx="52" cy="56" r="1.5" fill={strokeColor} />
          {/* Shrimp tail */}
          <polygon points="18,60 10,54 14,64 10,72 20,66" fill="#f87171" strokeWidth="2.5" />
        </svg>
      );

    // 15. fujisan (ふじさん) - Mt. Fuji
    case 'fuji':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          {/* Red sun behind */}
          <circle cx="50" cy="38" r="16" fill="#fee2e2" stroke="#ef4444" strokeWidth="3" />
          {/* Fuji shape */}
          <path d="M12 84 Q34 76 42 40 L58 40 Q66 76 88 84 Z" fill="#93c5fd" strokeWidth="3.5" />
          {/* Snow cap */}
          <path d="M42 40 L58 40 Q56 50 54 52 Q52 48 50 52 Q48 48 46 52 Z" fill="#ffffff" strokeWidth="3" />
          {/* Base ground */}
          <line x1="8" y1="84" x2="92" y2="84" strokeWidth="3.5" />
        </svg>
      );

    // 16. tookyoo (とうきょう) - Tokyo Tower
    case 'tokyo-tower':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          {/* Spire */}
          <line x1="50" y1="12" x2="50" y2="30" strokeWidth="3.5" stroke="#dc2626" />
          <circle cx="50" cy="12" r="2" fill="#dc2626" />
          {/* Top observation deck */}
          <rect x="44" y="30" width="12" height="6" rx="1" fill="#dc2626" strokeWidth="2.5" />
          {/* Upper lattice */}
          <polygon points="46,36 54,36 58,54 42,54" fill="#fee2e2" strokeWidth="3" stroke="#dc2626" />
          <line x1="46" y1="36" x2="58" y2="54" strokeWidth="2" stroke="#dc2626" />
          <line x1="54" y1="36" x2="42" y2="54" strokeWidth="2" stroke="#dc2626" />
          {/* Main observation deck */}
          <rect x="36" y="54" width="28" height="8" rx="2" fill="#18181b" strokeWidth="2.5" />
          {/* Lower legs arch */}
          <path d="M40 62 L26 88 M60 62 L74 88" strokeWidth="3.5" stroke="#dc2626" />
          <path d="M38 88 Q50 72 62 88" strokeWidth="3" stroke="#dc2626" />
        </svg>
      );

    // Fallbacks and extra everyday words
    case 'water':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M30 24 L34 80 Q50 86 66 80 L70 24 Z" fill="#e0f2fe" strokeWidth="3.5" />
          <path d="M32 46 Q50 52 68 46" stroke="#0284c7" strokeWidth="3" />
          <ellipse cx="50" cy="24" rx="20" ry="5" strokeWidth="3" fill="#ffffff" />
        </svg>
      );

    case 'fish':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M80 50 C65 30 25 35 15 50 C25 65 65 70 80 50 Z" fill="#bfdbfe" strokeWidth="3.5" />
          <polygon points="80,50 92,34 92,66" fill="#93c5fd" strokeWidth="3" />
          <circle cx="26" cy="48" r="2.5" fill={strokeColor} />
          <path d="M42 42 Q48 50 42 58" strokeWidth="2.5" />
        </svg>
      );

    case 'bird':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M25 50 Q45 28 65 38 Q78 44 82 48 Q68 56 62 68 Q40 68 25 50 Z" fill="#fef08a" strokeWidth="3.5" />
          <polygon points="82,48 90,50 80,54" fill="#f97316" strokeWidth="2" />
          <circle cx="68" cy="44" r="2" fill={strokeColor} />
          <line x1="45" y1="68" x2="42" y2="82" strokeWidth="3" />
          <line x1="55" y1="68" x2="55" y2="82" strokeWidth="3" />
        </svg>
      );

    case 'car':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 62 L22 48 Q32 36 50 36 L66 36 Q78 44 84 56 L86 64 L16 64 Z" fill="#fecdd3" strokeWidth="3.5" />
          <rect x="20" y="56" width="66" height="12" rx="3" fill="#fb7185" strokeWidth="3" />
          <circle cx="34" cy="68" r="9" fill="#18181b" />
          <circle cx="34" cy="68" r="4" fill="#ffffff" />
          <circle cx="68" cy="68" r="9" fill="#18181b" />
          <circle cx="68" cy="68" r="4" fill="#ffffff" />
        </svg>
      );

    case 'train':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <rect x="24" y="20" width="52" height="54" rx="10" fill="#e2e8f0" strokeWidth="3.5" />
          <rect x="30" y="28" width="40" height="20" rx="4" fill="#60a5fa" strokeWidth="3" />
          <line x1="50" y1="28" x2="50" y2="48" strokeWidth="2.5" />
          <circle cx="36" cy="62" r="4" fill="#fef08a" strokeWidth="2" />
          <circle cx="64" cy="62" r="4" fill="#fef08a" strokeWidth="2" />
          <line x1="18" y1="80" x2="82" y2="80" strokeWidth="4" />
        </svg>
      );

    case 'house':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="50,18 84,46 16,46" fill="#fecaca" strokeWidth="3.5" />
          <rect x="24" y="46" width="52" height="36" fill="#f4f4f5" strokeWidth="3.5" />
          <rect x="42" y="58" width="16" height="24" fill="#bbf7d0" strokeWidth="2.5" />
          <circle cx="53" cy="70" r="1.5" fill={strokeColor} />
        </svg>
      );

    case 'apple':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M50 32 C42 18 20 22 20 46 C20 72 40 82 50 82 C60 82 80 72 80 46 C80 22 58 18 50 32 Z" fill="#ef4444" strokeWidth="3.5" />
          <path d="M50 32 C50 18 58 14 62 14" strokeWidth="3.5" />
          <path d="M54 22 C64 20 68 26 68 26 C68 26 62 30 54 26" fill="#86efac" strokeWidth="2" />
        </svg>
      );

    case 'umbrella':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 54 C16 32 30 20 50 20 C70 20 84 32 84 54 Q67 48 50 54 Q33 48 16 54 Z" fill="#67e8f9" strokeWidth="3.5" />
          <line x1="50" y1="20" x2="50" y2="76" strokeWidth="3.5" />
          <path d="M50 76 C50 84 42 84 42 78" strokeWidth="3.5" />
        </svg>
      );

    case 'sakura':
    case 'flower':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="50" cy="50" r="8" fill="#fde047" strokeWidth="2" />
          <circle cx="50" cy="28" r="12" fill="#fbcfe8" strokeWidth="2.5" />
          <circle cx="70" cy="42" r="12" fill="#fbcfe8" strokeWidth="2.5" />
          <circle cx="62" cy="68" r="12" fill="#fbcfe8" strokeWidth="2.5" />
          <circle cx="38" cy="68" r="12" fill="#fbcfe8" strokeWidth="2.5" />
          <circle cx="30" cy="42" r="12" fill="#fbcfe8" strokeWidth="2.5" />
        </svg>
      );

    case 'tree':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <rect x="44" y="58" width="12" height="26" fill="#d97706" strokeWidth="3" />
          <circle cx="50" cy="40" r="26" fill="#86efac" strokeWidth="3.5" />
        </svg>
      );

    case 'sushi':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <rect x="22" y="52" width="56" height="24" rx="8" fill="#ffffff" strokeWidth="3.5" />
          <path d="M20 54 Q50 36 80 54 L78 60 Q50 44 22 60 Z" fill="#f87171" strokeWidth="3" />
          <rect x="44" y="44" width="12" height="34" rx="2" fill="#18181b" />
        </svg>
      );

    case 'ramen':
    case 'rice':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 46 Q50 38 80 46 L74 74 Q50 82 26 74 Z" fill="#f4f4f5" strokeWidth="3.5" />
          <ellipse cx="50" cy="46" rx="30" ry="10" fill="#fde047" strokeWidth="3" />
          <line x1="28" y1="36" x2="76" y2="28" strokeWidth="3.5" stroke="#71717a" />
          <line x1="32" y1="42" x2="80" y2="34" strokeWidth="3.5" stroke="#71717a" />
        </svg>
      );

    case 'book':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <rect x="22" y="24" width="56" height="52" rx="4" fill="#ffffff" strokeWidth="3.5" />
          <line x1="32" y1="24" x2="32" y2="76" strokeWidth="3" stroke="#3b82f6" />
          <line x1="40" y1="38" x2="68" y2="38" strokeWidth="2.5" />
          <line x1="40" y1="48" x2="68" y2="48" strokeWidth="2.5" />
          <line x1="40" y1="58" x2="60" y2="58" strokeWidth="2.5" />
        </svg>
      );

    // 17. kaban (かばん) - Bag
    case 'bag':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          {/* Bag body */}
          <rect x="22" y="40" width="56" height="42" rx="7" fill="#fed7aa" strokeWidth="3.5" />
          {/* Bag flap */}
          <path d="M22 52 C22 52 38 60 50 60 C62 60 78 52 78 52" strokeWidth="3" fill="#fdba74" />
          {/* Metal clasp */}
          <rect x="46" y="56" width="8" height="8" rx="2" fill="#fde047" strokeWidth="2" />
          {/* Handle */}
          <path d="M36 40 V24 C36 20 42 18 50 18 C58 18 64 20 64 24 V40" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );

    // 18. pan (ぱん) - Bread
    case 'bread':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          {/* Toast / Bread loaf */}
          <path d="M26 44 C20 38 22 24 38 24 C44 24 48 26 50 28 C52 26 56 24 62 24 C78 24 80 38 74 44 L72 74 C72 78 68 80 64 80 L36 80 C32 80 28 78 28 74 Z" fill="#fef08a" strokeWidth="3.5" />
          {/* Crust contour */}
          <path d="M28 44 C34 40 44 38 50 38 C56 38 66 40 72 44" strokeWidth="2.5" stroke="#d97706" />
          {/* Butter slab */}
          <polygon points="44,52 56,52 54,60 42,60" fill="#fde047" strokeWidth="2" />
        </svg>
      );

    // 19. sora (そら) - Cloud / Sky
    case 'cloud':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          {/* Soft sky background hint */}
          <circle cx="28" cy="38" r="12" fill="#e0f2fe" stroke="none" />
          {/* Fluffy cloud */}
          <path d="M26 66 H74 C82 66 86 60 86 52 C86 44 80 40 74 42 C72 32 64 26 52 26 C42 26 34 32 32 40 C26 40 20 44 20 52 C20 60 24 66 26 66 Z" fill="#f0f9ff" strokeWidth="3.5" />
          <path d="M36 54 Q48 50 64 54" stroke="#93c5fd" strokeWidth="2" />
        </svg>
      );

    // 20. tamago (たまご) - Egg
    case 'egg':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          {/* Egg silhouette */}
          <path d="M50 18 C34 18 24 40 24 62 C24 76 35 84 50 84 C65 84 76 76 76 62 C76 40 66 18 50 18 Z" fill="#fffbeb" strokeWidth="3.5" />
          {/* Shell gloss reflection */}
          <path d="M38 32 C34 38 32 48 34 56" stroke="#fef08a" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    // 21. tomodachi / otousan / okaasan (ともだち) - Friends / People
    case 'friends':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          {/* Left person */}
          <circle cx="36" cy="34" r="11" fill="#fed7aa" strokeWidth="3" />
          <path d="M20 74 C20 56 52 56 52 74" fill="#93c5fd" strokeWidth="3.5" />
          {/* Right person */}
          <circle cx="64" cy="34" r="11" fill="#fbcfe8" strokeWidth="3" />
          <path d="M48 74 C48 56 80 56 80 74" fill="#a7f3d0" strokeWidth="3.5" />
          {/* Cheerful smiles */}
          <path d="M33 37 Q36 40 39 37" strokeWidth="2" strokeLinecap="round" />
          <path d="M61 37 Q64 40 67 37" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    // 22. tsuki (つき) - Full Moon
    case 'full-moon':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="50" cy="50" r="32" fill="#fef08a" strokeWidth="3.5" />
          {/* Craters / moon surface */}
          <circle cx="38" cy="40" r="6" fill="#fde047" stroke="#eab308" strokeWidth="1.5" />
          <circle cx="62" cy="54" r="8" fill="#fde047" stroke="#eab308" strokeWidth="1.5" />
          <circle cx="44" cy="66" r="4" fill="#fde047" stroke="#eab308" strokeWidth="1.5" />
        </svg>
      );

    // 23. megane (めがね) - Glasses
    case 'glasses':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          {/* Left lens */}
          <circle cx="32" cy="52" r="16" fill="#e0f2fe" strokeWidth="3.5" />
          {/* Right lens */}
          <circle cx="68" cy="52" r="16" fill="#e0f2fe" strokeWidth="3.5" />
          {/* Bridge */}
          <path d="M48 50 Q50 46 52 50" strokeWidth="3.5" />
          {/* Left temple */}
          <line x1="16" y1="52" x2="8" y2="44" strokeWidth="3" strokeLinecap="round" />
          {/* Right temple */}
          <line x1="84" y1="52" x2="92" y2="44" strokeWidth="3" strokeLinecap="round" />
          {/* Lens glare */}
          <line x1="28" y1="44" x2="36" y2="44" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
          <line x1="64" y1="44" x2="72" y2="44" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    // 24. byooin (びょういん) - Hospital
    case 'hospital':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          {/* Hospital building */}
          <rect x="22" y="26" width="56" height="58" rx="4" fill="#f4f4f5" strokeWidth="3.5" />
          {/* Red cross banner */}
          <rect x="42" y="14" width="16" height="16" rx="2" fill="#ef4444" strokeWidth="2.5" />
          <line x1="50" y1="17" x2="50" y2="27" stroke="#ffffff" strokeWidth="2.5" />
          <line x1="45" y1="22" x2="55" y2="22" stroke="#ffffff" strokeWidth="2.5" />
          {/* Windows */}
          <rect x="30" y="36" width="10" height="10" rx="1" fill="#bae6fd" strokeWidth="2" />
          <rect x="60" y="36" width="10" height="10" rx="1" fill="#bae6fd" strokeWidth="2" />
          <rect x="30" y="52" width="10" height="10" rx="1" fill="#bae6fd" strokeWidth="2" />
          <rect x="60" y="52" width="10" height="10" rx="1" fill="#bae6fd" strokeWidth="2" />
          {/* Door */}
          <rect x="44" y="66" width="12" height="18" fill="#e2e8f0" strokeWidth="2.5" />
        </svg>
      );

    // 25. kagi (かぎ) - Key
    case 'key':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          {/* Golden key bow (head) */}
          <circle cx="34" cy="46" r="16" fill="#fde047" strokeWidth="3.5" />
          <circle cx="34" cy="46" r="6" fill="#ffffff" strokeWidth="2.5" />
          {/* Shaft */}
          <line x1="50" y1="46" x2="84" y2="46" strokeWidth="4" strokeLinecap="round" />
          {/* Bits / teeth */}
          <line x1="74" y1="46" x2="74" y2="58" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="82" y1="46" x2="82" y2="55" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      );

    // 26. tegami (てがみ) - Letter / Envelope
    case 'letter':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          {/* Envelope rectangle */}
          <rect x="18" y="30" width="64" height="46" rx="4" fill="#ffffff" strokeWidth="3.5" />
          {/* Flap fold */}
          <path d="M18 32 L50 56 L82 32" strokeWidth="3" strokeLinejoin="round" />
          {/* Bottom diagonal corner folds */}
          <line x1="18" y1="74" x2="40" y2="52" strokeWidth="2" stroke="#a1a1aa" />
          <line x1="82" y1="74" x2="60" y2="52" strokeWidth="2" stroke="#a1a1aa" />
          {/* Small red postal stamp */}
          <rect x="64" y="36" width="10" height="12" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
        </svg>
      );

    // 27. enpitsu (えんぴつ) - Pencil
    case 'pencil':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          {/* Hexagonal pencil body angled */}
          <g transform="rotate(45 50 50)">
            <polygon points="50,14 42,28 58,28" fill="#fed7aa" strokeWidth="2.5" />
            <polygon points="50,14 46,20 54,20" fill="#18181b" stroke="none" />
            <rect x="42" y="28" width="16" height="44" fill="#facc15" strokeWidth="3" />
            <line x1="47" y1="28" x2="47" y2="72" strokeWidth="1.5" stroke="#ca8a04" />
            <line x1="53" y1="28" x2="53" y2="72" strokeWidth="1.5" stroke="#ca8a04" />
            {/* Ferrule */}
            <rect x="42" y="72" width="16" height="6" fill="#e2e8f0" strokeWidth="2.5" />
            {/* Pink Eraser */}
            <path d="M42 78 H58 V84 C58 87 54 88 50 88 C46 88 42 87 42 84 Z" fill="#f472b6" strokeWidth="2.5" />
          </g>
        </svg>
      );

    // 28. denwa (でんわ) - Phone
    case 'phone':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          {/* Smartphone body */}
          <rect x="30" y="16" width="40" height="68" rx="8" fill="#1e293b" strokeWidth="3.5" />
          {/* Screen */}
          <rect x="34" y="24" width="32" height="50" rx="3" fill="#38bdf8" strokeWidth="2" />
          {/* Speaker slit */}
          <line x1="45" y1="20" x2="55" y2="20" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
          {/* Home indicator */}
          <line x1="44" y1="78" x2="56" y2="78" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
          {/* App icon sparkles on screen */}
          <circle cx="50" cy="48" r="8" fill="#ffffff" stroke="none" />
          <path d="M47 48 L50 43 L53 48 L50 53 Z" fill="#0284c7" />
        </svg>
      );

    // 29. ame (あめ) - Rain
    case 'rain':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          {/* Rain cloud */}
          <path d="M26 48 H74 C82 48 86 42 86 36 C86 28 80 24 72 26 C70 18 62 14 52 14 C42 14 34 18 32 26 C26 26 20 30 20 36 C20 42 24 48 26 48 Z" fill="#cbd5e1" strokeWidth="3" />
          {/* Rain drops */}
          <line x1="30" y1="58" x2="26" y2="74" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" />
          <line x1="46" y1="56" x2="42" y2="78" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" />
          <line x1="62" y1="58" x2="58" y2="74" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" />
          <line x1="76" y1="56" x2="72" y2="76" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    // 30. kawa (かわ) - River
    case 'river':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          {/* River banks / green grass */}
          <path d="M12 20 L38 20 C34 40 18 60 14 84 L12 84 Z" fill="#86efac" strokeWidth="2.5" />
          <path d="M88 20 L62 20 C68 44 82 62 86 84 L88 84 Z" fill="#86efac" strokeWidth="2.5" />
          {/* River flow */}
          <path d="M38 20 C34 40 18 60 14 84 L86 84 C82 62 68 44 62 20 Z" fill="#93c5fd" strokeWidth="3.5" />
          {/* Water flow ripples */}
          <path d="M42 34 Q50 38 58 34" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M34 54 Q50 60 66 54" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M28 72 Q50 78 72 72" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    // 31. gakkoo (がっこう) - School
    case 'school':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          {/* School building */}
          <rect x="20" y="32" width="60" height="52" rx="3" fill="#fef3c7" strokeWidth="3.5" />
          {/* Roof gable */}
          <polygon points="50,14 74,32 26,32" fill="#f87171" strokeWidth="3" />
          {/* School clock tower */}
          <circle cx="50" cy="24" r="5" fill="#ffffff" strokeWidth="1.5" />
          <line x1="50" y1="24" x2="50" y2="21" stroke="#18181b" strokeWidth="1" />
          {/* Windows */}
          <rect x="28" y="42" width="10" height="10" fill="#bae6fd" strokeWidth="2" />
          <rect x="62" y="42" width="10" height="10" fill="#bae6fd" strokeWidth="2" />
          <rect x="28" y="58" width="10" height="10" fill="#bae6fd" strokeWidth="2" />
          <rect x="62" y="58" width="10" height="10" fill="#bae6fd" strokeWidth="2" />
          {/* Entrance door */}
          <rect x="44" y="62" width="12" height="22" fill="#d97706" strokeWidth="2.5" />
        </svg>
      );

    // 32. kutsu (くつ) - Shoes / Sneaker
    case 'shoes':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          {/* Sneaker silhouette */}
          <path d="M18 64 C18 48 30 46 40 46 L58 46 L74 54 C82 58 84 64 82 72 L18 72 Z" fill="#38bdf8" strokeWidth="3.5" />
          {/* Sole */}
          <rect x="14" y="72" width="72" height="10" rx="3" fill="#ffffff" strokeWidth="3" />
          {/* Toe cap */}
          <path d="M70 54 Q82 56 82 72 L70 72 Z" fill="#ffffff" strokeWidth="2.5" />
          {/* Laces */}
          <line x1="42" y1="46" x2="48" y2="54" stroke="#ffffff" strokeWidth="2" />
          <line x1="48" y1="46" x2="54" y2="54" stroke="#ffffff" strokeWidth="2" />
          <line x1="54" y1="46" x2="60" y2="54" stroke="#ffffff" strokeWidth="2" />
        </svg>
      );

    // 33. hoshi (ほし) - Star
    case 'star':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="50,16 60,38 84,40 66,56 72,80 50,67 28,80 34,56 16,40 40,38" fill="#fde047" strokeWidth="3.5" strokeLinejoin="round" />
          <circle cx="50" cy="50" r="3" fill="#f59e0b" stroke="none" />
        </svg>
      );

    // 34. eki (えき) - Train Station
    case 'station':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          {/* Station platform canopy */}
          <rect x="14" y="24" width="72" height="10" rx="2" fill="#22c55e" strokeWidth="3" />
          <line x1="28" y1="34" x2="28" y2="70" strokeWidth="3.5" />
          <line x1="72" y1="34" x2="72" y2="70" strokeWidth="3.5" />
          {/* Station name sign */}
          <rect x="36" y="38" width="28" height="16" rx="2" fill="#ffffff" strokeWidth="2" />
          <text x="50" y="50" fontSize="8" fontWeight="bold" textAnchor="middle" fill={strokeColor}>EKI</text>
          {/* Platform ground */}
          <rect x="10" y="70" width="80" height="12" fill="#e2e8f0" strokeWidth="3" />
          {/* Railway tracks below platform */}
          <line x1="10" y1="86" x2="90" y2="86" strokeWidth="3" stroke="#64748b" />
          <line x1="20" y1="84" x2="20" y2="88" strokeWidth="2" stroke="#64748b" />
          <line x1="40" y1="84" x2="40" y2="88" strokeWidth="2" stroke="#64748b" />
          <line x1="60" y1="84" x2="60" y2="88" strokeWidth="2" stroke="#64748b" />
          <line x1="80" y1="84" x2="80" y2="88" strokeWidth="2" stroke="#64748b" />
        </svg>
      );

    // 35. arigatoo (ありがとう) - Thank You (Gift / Bow)
    case 'thankyou':
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          {/* Gift box */}
          <rect x="24" y="44" width="52" height="40" rx="4" fill="#fed7aa" strokeWidth="3.5" />
          {/* Box lid */}
          <rect x="20" y="36" width="60" height="12" rx="2" fill="#fb923c" strokeWidth="3" />
          {/* Vertical ribbon */}
          <rect x="46" y="36" width="8" height="48" fill="#ef4444" strokeWidth="1.5" />
          {/* Horizontal ribbon */}
          <line x1="24" y1="62" x2="76" y2="62" stroke="#ef4444" strokeWidth="3" />
          {/* Ribbon bow loops */}
          <ellipse cx="42" cy="30" rx="8" ry="6" transform="rotate(-20 42 30)" fill="#fca5a5" stroke="#ef4444" strokeWidth="2" />
          <ellipse cx="58" cy="30" rx="8" ry="6" transform="rotate(20 58 30)" fill="#fca5a5" stroke="#ef4444" strokeWidth="2" />
          <circle cx="50" cy="32" r="3" fill="#ef4444" stroke="none" />
        </svg>
      );

    default:
      // Generic neat Japanese item icon
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="50" cy="50" r="32" fill="#f4f4f5" strokeWidth="3.5" />
          <circle cx="50" cy="50" r="16" fill="#e4e4e7" strokeWidth="2.5" />
          <text x="50" y="55" fontSize="14" fontWeight="bold" textAnchor="middle" fill={strokeColor}>JP</text>
        </svg>
      );
  }
};

