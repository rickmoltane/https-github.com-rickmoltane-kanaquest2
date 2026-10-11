import React from 'react';

interface SituationIllustrationProps {
  id: string;
  className?: string;
}

export const SituationIllustration: React.FC<SituationIllustrationProps> = ({
  id,
  className = 'w-full h-full max-h-48',
}) => {
  const stroke = '#1F2329';
  const accent = '#1A73E8';
  const bgSoft = '#F0F7FF';

  switch (id) {
    // 1. Morning Greeting: Sunrise, clock at 7:30, greeting
    case 'morning-greeting':
      return (
        <svg viewBox="0 0 200 150" className={className} fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="10" y="10" width="180" height="130" rx="16" fill={bgSoft} stroke="none" />
          {/* Window / Sunrise */}
          <rect x="25" y="25" width="60" height="55" rx="6" fill="#FEF08A" stroke={stroke} strokeWidth="2" />
          <path d="M35 80 A20 20 0 0 1 75 80" fill="#F97316" stroke={stroke} strokeWidth="2" />
          <line x1="25" y1="52" x2="85" y2="52" stroke="#CBD5E1" strokeWidth="1.5" />
          <line x1="55" y1="25" x2="55" y2="80" stroke="#CBD5E1" strokeWidth="1.5" />
          {/* Clock */}
          <circle cx="155" cy="40" r="16" fill="#FFFFFF" stroke={stroke} strokeWidth="2" />
          <line x1="155" y1="40" x2="155" y2="30" stroke={stroke} strokeWidth="2" />
          <line x1="155" y1="40" x2="163" y2="44" stroke={stroke} strokeWidth="2" />
          {/* Person bowing good morning */}
          <circle cx="115" cy="75" r="14" fill="#FED7AA" />
          <path d="M100 120 C100 100 130 100 130 120" fill={accent} stroke={stroke} strokeWidth="2.5" />
          {/* Speech bubble */}
          <path d="M135 65 Q165 55 170 70 Q170 85 145 85 L135 90 Z" fill="#FFFFFF" stroke={accent} strokeWidth="2" />
          <circle cx="148" cy="72" r="2" fill={accent} />
          <circle cx="155" cy="72" r="2" fill={accent} />
          <circle cx="162" cy="72" r="2" fill={accent} />
        </svg>
      );

    // 2. Daytime Greeting: Bright sun, friendly wave
    case 'daytime-greeting':
      return (
        <svg viewBox="0 0 200 150" className={className} fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="10" y="10" width="180" height="130" rx="16" fill="#FEFCE8" stroke="none" />
          {/* Big happy sun */}
          <circle cx="50" cy="45" r="18" fill="#FACC15" stroke={stroke} strokeWidth="2" />
          <line x1="50" y1="18" x2="50" y2="24" stroke="#F59E0B" strokeWidth="2.5" />
          <line x1="50" y1="66" x2="50" y2="72" stroke="#F59E0B" strokeWidth="2.5" />
          <line x1="23" y1="45" x2="29" y2="45" stroke="#F59E0B" strokeWidth="2.5" />
          <line x1="71" y1="45" x2="77" y2="45" stroke="#F59E0B" strokeWidth="2.5" />
          {/* Two people waving hello */}
          <circle cx="105" cy="65" r="13" fill="#FED7AA" />
          <path d="M90 120 C90 95 120 95 120 120" fill={accent} stroke={stroke} strokeWidth="2.5" />
          {/* Raised waving hand */}
          <path d="M120 95 L135 75 L140 78" stroke={stroke} strokeWidth="3" />
          {/* Friend waving back */}
          <circle cx="160" cy="75" r="12" fill="#FBCFE8" />
          <path d="M148 120 C148 100 172 100 172 120" fill="#38BDF8" stroke={stroke} strokeWidth="2.5" />
          <line x1="10" y1="120" x2="190" y2="120" stroke="#CBD5E1" strokeWidth="2" />
        </svg>
      );

    // 3. Evening Greeting: Dusk, stars, crescent moon
    case 'evening-greeting':
      return (
        <svg viewBox="0 0 200 150" className={className} fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="10" y="10" width="180" height="130" rx="16" fill="#1E293B" stroke="none" />
          {/* Moon and stars */}
          <path d="M45 28 A16 16 0 1 0 65 56 A19 19 0 0 1 45 28 Z" fill="#FDE047" stroke="#FDE047" strokeWidth="1" />
          <polygon points="90,30 92,35 97,35 93,38 95,43 90,40 86,43 88,38 84,35 89,35" fill="#FFFFFF" stroke="none" />
          <polygon points="145,26 146,30 150,30 147,32 148,36 145,34 142,36 143,32 140,30 144,30" fill="#FFFFFF" stroke="none" />
          {/* Street lamp */}
          <path d="M165 125 L165 65 L155 60" stroke="#94A3B8" strokeWidth="3" />
          <circle cx="155" cy="60" r="7" fill="#FEF08A" stroke="#F59E0B" strokeWidth="2" />
          {/* Person politely bowing */}
          <circle cx="95" cy="75" r="14" fill="#FED7AA" />
          <path d="M80 125 C80 102 110 102 110 125" fill="#3B82F6" stroke="#FFFFFF" strokeWidth="2.5" />
          <line x1="10" y1="125" x2="190" y2="125" stroke="#475569" strokeWidth="2" />
        </svg>
      );

    // 4. Goodbye Wave: Waving farewell
    case 'goodbye-wave':
      return (
        <svg viewBox="0 0 200 150" className={className} fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="10" y="10" width="180" height="130" rx="16" fill={bgSoft} stroke="none" />
          {/* Doorway frame */}
          <rect x="28" y="25" width="55" height="100" rx="4" fill="#FFFFFF" stroke={stroke} strokeWidth="2" />
          <line x1="83" y1="75" x2="77" y2="75" stroke={stroke} strokeWidth="3" />
          {/* Person with bag waving */}
          <circle cx="125" cy="60" r="14" fill="#FED7AA" />
          <path d="M110 125 C110 95 140 95 140 125" fill="#6366F1" stroke={stroke} strokeWidth="2.5" />
          {/* Travel suitcase */}
          <rect x="145" y="95" width="22" height="30" rx="3" fill="#F59E0B" stroke={stroke} strokeWidth="2" />
          <path d="M152 95 L152 88 L160 88 L160 95" stroke={stroke} strokeWidth="2" />
          {/* Arm waving */}
          <path d="M110 95 L95 80 L90 70" stroke={stroke} strokeWidth="3" />
        </svg>
      );

    // 5. See you later: Casual friends parting
    case 'see-you-later':
      return (
        <svg viewBox="0 0 200 150" className={className} fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="10" y="10" width="180" height="130" rx="16" fill="#F0FDF4" stroke="none" />
          {/* Two friends walking in opposite directions waving */}
          <circle cx="70" cy="65" r="13" fill="#FED7AA" />
          <path d="M55 125 C55 98 85 98 85 125" fill="#10B981" stroke={stroke} strokeWidth="2.5" />
          <path d="M85 95 L100 80 L105 82" stroke={stroke} strokeWidth="3" />
          
          <circle cx="135" cy="65" r="13" fill="#FBCFE8" />
          <path d="M120 125 C120 98 150 98 150 125" fill="#3B82F6" stroke={stroke} strokeWidth="2.5" />
          <path d="M120 95 L108 80 L103 82" stroke={stroke} strokeWidth="3" />
          <line x1="10" y1="125" x2="190" y2="125" stroke="#CBD5E1" strokeWidth="2" />
        </svg>
      );

    // 6. Leaving workplace: Clock at 6:00 PM, colleague bowing to office
    case 'leaving-office':
      return (
        <svg viewBox="0 0 200 150" className={className} fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="10" y="10" width="180" height="130" rx="16" fill="#F8FAFC" stroke="none" />
          {/* Wall clock at 18:00 */}
          <circle cx="155" cy="38" r="15" fill="#FFFFFF" stroke={stroke} strokeWidth="2" />
          <line x1="155" y1="38" x2="155" y2="28" stroke={stroke} strokeWidth="2" />
          <line x1="155" y1="38" x2="155" y2="48" stroke="#EF4444" strokeWidth="2" />
          {/* Office desk & monitor */}
          <rect x="25" y="90" width="65" height="35" rx="3" fill="#E2E8F0" stroke={stroke} strokeWidth="2" />
          <rect x="40" y="65" width="35" height="25" rx="2" fill="#FFFFFF" stroke={stroke} strokeWidth="2" />
          <line x1="57" y1="90" x2="57" y2="95" stroke={stroke} strokeWidth="2" />
          {/* Colleague bowing respectfully with briefcase */}
          <circle cx="130" cy="70" r="13" fill="#FED7AA" />
          <path d="M115 125 C115 95 145 95 145 125" fill="#1E293B" stroke={stroke} strokeWidth="2.5" />
          {/* Briefcase in hand */}
          <rect x="150" y="102" width="20" height="16" rx="2" fill="#78350F" stroke={stroke} strokeWidth="2" />
          <path d="M156 102 L156 98 L164 98 L164 102" stroke={stroke} strokeWidth="1.5" />
        </svg>
      );

    // 7. Polite decline: Person gesturing palms open ("no / not at all")
    case 'polite-decline':
      return (
        <svg viewBox="0 0 200 150" className={className} fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="10" y="10" width="180" height="130" rx="16" fill="#FDF2F8" stroke="none" />
          <circle cx="100" cy="55" r="16" fill="#FED7AA" />
          <path d="M78 125 C78 95 122 95 122 125" fill="#EC4899" stroke={stroke} strokeWidth="2.5" />
          {/* Gentle open waving hands */}
          <path d="M78 95 L60 80 L62 72" stroke={stroke} strokeWidth="3" />
          <path d="M122 95 L140 80 L138 72" stroke={stroke} strokeWidth="3" />
          {/* Gentle motion waves */}
          <path d="M50 75 Q45 80 50 85" stroke="#94A3B8" strokeWidth="2" />
          <path d="M150 75 Q155 80 150 85" stroke="#94A3B8" strokeWidth="2" />
        </svg>
      );

    // 8. Gratitude: Deep bow with hands together
    case 'deep-thank-you':
      return (
        <svg viewBox="0 0 200 150" className={className} fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="10" y="10" width="180" height="130" rx="16" fill={bgSoft} stroke="none" />
          {/* Person bowed with sincere gratitude */}
          <circle cx="100" cy="65" r="15" fill="#FED7AA" />
          <path d="M75 125 C75 95 125 95 125 125" fill={accent} stroke={stroke} strokeWidth="2.5" />
          {/* Hands together in front */}
          <ellipse cx="100" cy="100" rx="10" ry="12" fill="#FED7AA" stroke={stroke} strokeWidth="2" />
          {/* Sparkles of gratitude */}
          <polygon points="45,40 48,46 54,46 49,50 51,56 45,52 39,56 41,50 36,46 42,46" fill="#FACC15" stroke="none" />
          <polygon points="155,40 158,46 164,46 159,50 161,56 155,52 149,56 151,50 146,46 152,46" fill="#FACC15" stroke="none" />
        </svg>
      );

    // 9. First Meeting (Hajimemashite): Business card exchange
    case 'nice-to-meet-you':
      return (
        <svg viewBox="0 0 200 150" className={className} fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="10" y="10" width="180" height="130" rx="16" fill="#F8FAFC" stroke="none" />
          {/* Person 1 */}
          <circle cx="65" cy="55" r="13" fill="#FED7AA" />
          <path d="M50 120 C50 92 80 92 80 120" fill="#1E293B" stroke={stroke} strokeWidth="2.5" />
          {/* Person 2 */}
          <circle cx="135" cy="55" r="13" fill="#FBCFE8" />
          <path d="M120 120 C120 92 150 92 150 120" fill={accent} stroke={stroke} strokeWidth="2.5" />
          {/* Exchanging business card (Meishi) */}
          <rect x="88" y="85" width="24" height="16" rx="2" fill="#FFFFFF" stroke={stroke} strokeWidth="2" />
          <line x1="93" y1="91" x2="105" y2="91" stroke={accent} strokeWidth="1.5" />
          <line x1="93" y1="95" x2="102" y2="95" stroke="#94A3B8" strokeWidth="1" />
        </svg>
      );

    // 10. Introducing Eric: Person smiling with name tag "ERIC"
    case 'introducing-eric':
      return (
        <svg viewBox="0 0 200 150" className={className} fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="10" y="10" width="180" height="130" rx="16" fill={bgSoft} stroke="none" />
          {/* Person head */}
          <circle cx="100" cy="50" r="18" fill="#FED7AA" stroke={stroke} strokeWidth="2.5" />
          {/* Smile and eyes */}
          <path d="M93 54 Q100 62 107 54" stroke={stroke} strokeWidth="2" />
          <circle cx="94" cy="46" r="2" fill={stroke} />
          <circle cx="106" cy="46" r="2" fill={stroke} />
          {/* Body */}
          <path d="M72 125 C72 88 128 88 128 125" fill="#0284C7" stroke={stroke} strokeWidth="2.5" />
          {/* Name badge */}
          <rect x="86" y="92" width="28" height="18" rx="3" fill="#FFFFFF" stroke={stroke} strokeWidth="2" />
          <text x="100" y="104" textAnchor="middle" fontSize="8" fontWeight="bold" fill={accent} stroke="none">ERIC</text>
          {/* Pointing thumb to chest */}
          <path d="M128 105 L118 100 L114 98" stroke={stroke} strokeWidth="2.5" />
        </svg>
      );

    // 11. Pleased to meet: Warm handshake and bow
    case 'pleased-to-meet':
      return (
        <svg viewBox="0 0 200 150" className={className} fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="10" y="10" width="180" height="130" rx="16" fill="#F0FDF4" stroke="none" />
          {/* Two hands shaking warmly in center */}
          <circle cx="70" cy="50" r="14" fill="#FED7AA" />
          <path d="M55 125 C55 95 85 95 85 125" fill="#059669" stroke={stroke} strokeWidth="2.5" />
          <circle cx="130" cy="50" r="14" fill="#FED7AA" />
          <path d="M115 125 C115 95 145 95 145 125" fill={accent} stroke={stroke} strokeWidth="2.5" />
          {/* Handshake clasp */}
          <rect x="88" y="85" width="24" height="14" rx="4" fill="#FEF08A" stroke={stroke} strokeWidth="2" />
          <line x1="95" y1="85" x2="105" y2="99" stroke={stroke} strokeWidth="2" />
          <line x1="105" y1="85" x2="95" y2="99" stroke={stroke} strokeWidth="2" />
        </svg>
      );

    // 12. Asking name: Friendly curiosity
    case 'asking-name':
      return (
        <svg viewBox="0 0 200 150" className={className} fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="10" y="10" width="180" height="130" rx="16" fill="#FFFBEB" stroke="none" />
          <circle cx="85" cy="65" r="16" fill="#FED7AA" stroke={stroke} strokeWidth="2.5" />
          <path d="M60 125 C60 95 110 95 110 125" fill="#D97706" stroke={stroke} strokeWidth="2.5" />
          {/* Speech bubble with question mark */}
          <path d="M125 35 Q165 35 165 65 Q165 90 135 90 L125 100 L128 90 Q115 90 115 65 Q115 35 125 35 Z" fill="#FFFFFF" stroke={accent} strokeWidth="2" />
          <text x="140" y="70" textAnchor="middle" fontSize="26" fontWeight="bold" fill={accent} stroke="none">?</text>
        </svg>
      );

    // 13. Asking origin: Globe with airline flight route
    case 'asking-origin':
      return (
        <svg viewBox="0 0 200 150" className={className} fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="10" y="10" width="180" height="130" rx="16" fill={bgSoft} stroke="none" />
          {/* Globe */}
          <circle cx="100" cy="75" r="38" fill="#BAE6FD" stroke={stroke} strokeWidth="2.5" />
          <ellipse cx="100" cy="75" rx="38" ry="14" stroke={stroke} strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="100" y1="37" x2="100" y2="113" stroke={stroke} strokeWidth="1.5" strokeDasharray="3 3" />
          {/* Continent blobs */}
          <path d="M85 55 Q95 50 105 60 Q100 70 85 65 Z" fill="#86EFAC" stroke="none" />
          <path d="M105 85 Q120 80 125 95 Q110 100 105 85 Z" fill="#86EFAC" stroke="none" />
          {/* Airplane route */}
          <path d="M50 40 Q100 15 150 40" stroke={accent} strokeWidth="2.5" strokeDasharray="4 4" />
          <polygon points="152,40 144,35 146,42" fill={accent} stroke="none" />
        </svg>
      );

    // 14. From France: French tricolor flag banner with Eiffel silhouette
    case 'from-france':
      return (
        <svg viewBox="0 0 200 150" className={className} fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="10" y="10" width="180" height="130" rx="16" fill="#F8FAFC" stroke="none" />
          {/* France Flag */}
          <rect x="30" y="25" width="20" height="40" fill="#2563EB" stroke="none" />
          <rect x="50" y="25" width="20" height="40" fill="#FFFFFF" stroke="none" />
          <rect x="70" y="25" width="20" height="40" fill="#DC2626" stroke="none" />
          <rect x="30" y="25" width="60" height="40" fill="none" stroke={stroke} strokeWidth="2" />
          {/* Eiffel Tower Silhouette */}
          <path d="M140 120 L150 50 L154 50 L164 120" stroke={stroke} strokeWidth="2.5" />
          <line x1="144" y1="100" x2="160" y2="100" stroke={stroke} strokeWidth="2" />
          <line x1="147" y1="75" x2="157" y2="75" stroke={stroke} strokeWidth="2" />
          <line x1="152" y1="50" x2="152" y2="35" stroke={stroke} strokeWidth="2.5" />
          {/* Suitcase */}
          <rect x="40" y="90" width="35" height="28" rx="3" fill="#D97706" stroke={stroke} strokeWidth="2" />
          <path d="M52 90 L52 82 L63 82 L63 90" stroke={stroke} strokeWidth="2" />
        </svg>
      );

    // 15. Asking job: Work question
    case 'asking-job':
      return (
        <svg viewBox="0 0 200 150" className={className} fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="10" y="10" width="180" height="130" rx="16" fill="#F0F9FF" stroke="none" />
          {/* Briefcase */}
          <rect x="50" y="65" width="55" height="42" rx="5" fill="#0284C7" stroke={stroke} strokeWidth="2.5" />
          <path d="M68 65 L68 55 L87 55 L87 65" stroke={stroke} strokeWidth="2.5" />
          <line x1="50" y1="84" x2="105" y2="84" stroke="#FFFFFF" strokeWidth="2" />
          {/* Giant Question mark */}
          <circle cx="145" cy="75" r="28" fill="#FFFFFF" stroke={accent} strokeWidth="2.5" />
          <text x="145" y="85" textAnchor="middle" fontSize="30" fontWeight="900" fill={accent} stroke="none">?</text>
        </svg>
      );

    // 16. Asking if company employee: Inquiring about office worker
    case 'asking-company-worker':
      return (
        <svg viewBox="0 0 200 150" className={className} fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="10" y="10" width="180" height="130" rx="16" fill="#F1F5F9" stroke="none" />
          {/* Person in necktie */}
          <circle cx="90" cy="50" r="16" fill="#FED7AA" stroke={stroke} strokeWidth="2" />
          <path d="M65 125 C65 92 115 92 115 125" fill="#334155" stroke={stroke} strokeWidth="2.5" />
          {/* Necktie */}
          <polygon points="90,85 94,92 92,112 90,116 88,112 86,92" fill="#EF4444" stroke={stroke} strokeWidth="1.5" />
          {/* Question bubble */}
          <circle cx="140" cy="55" r="18" fill="#FFFFFF" stroke={accent} strokeWidth="2" />
          <text x="140" y="63" textAnchor="middle" fontSize="20" fontWeight="bold" fill={accent} stroke="none">?</text>
        </svg>
      );

    // 17. Answering yes company employee: Confirmed badge
    case 'answering-company-worker':
      return (
        <svg viewBox="0 0 200 150" className={className} fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="10" y="10" width="180" height="130" rx="16" fill={bgSoft} stroke="none" />
          {/* Office employee */}
          <circle cx="100" cy="48" r="16" fill="#FED7AA" stroke={stroke} strokeWidth="2.5" />
          <path d="M72 125 C72 88 128 88 128 125" fill="#1E40AF" stroke={stroke} strokeWidth="2.5" />
          {/* Tie */}
          <polygon points="100,80 104,86 102,106 100,110 98,106 96,86" fill="#3B82F6" stroke="#FFFFFF" strokeWidth="1.5" />
          {/* Company Lanyard / ID Badge */}
          <rect x="94" y="94" width="12" height="16" rx="2" fill="#FFFFFF" stroke={stroke} strokeWidth="1.5" />
          {/* Check mark badge */}
          <circle cx="145" cy="45" r="16" fill="#10B981" stroke="#FFFFFF" strokeWidth="2" />
          <path d="M138 45 L143 50 L152 40" stroke="#FFFFFF" strokeWidth="2.5" />
        </svg>
      );

    // 18. Answering not company worker: Polite 'no'
    case 'answering-not-company-worker':
      return (
        <svg viewBox="0 0 200 150" className={className} fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="10" y="10" width="180" height="130" rx="16" fill="#FEF2F2" stroke="none" />
          <circle cx="100" cy="50" r="16" fill="#FED7AA" stroke={stroke} strokeWidth="2" />
          <path d="M75 125 C75 92 125 92 125 125" fill="#475569" stroke={stroke} strokeWidth="2.5" />
          {/* Crossed hands / shake */}
          <line x1="75" y1="88" x2="95" y2="108" stroke={stroke} strokeWidth="3" />
          <line x1="125" y1="88" x2="105" y2="108" stroke={stroke} strokeWidth="3" />
          {/* Soft 'no' indicator */}
          <circle cx="145" cy="45" r="15" fill="#EF4444" stroke="#FFFFFF" strokeWidth="2" />
          <line x1="138" y1="45" x2="152" y2="45" stroke="#FFFFFF" strokeWidth="3" />
        </svg>
      );

    // 19. Student: Backpack, books
    case 'student':
      return (
        <svg viewBox="0 0 200 150" className={className} fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="10" y="10" width="180" height="130" rx="16" fill="#F0FDF4" stroke="none" />
          {/* Student */}
          <circle cx="85" cy="50" r="16" fill="#FED7AA" stroke={stroke} strokeWidth="2.5" />
          <path d="M60 125 C60 92 110 92 110 125" fill="#10B981" stroke={stroke} strokeWidth="2.5" />
          {/* Backpack straps */}
          <path d="M72 88 L72 115" stroke="#047857" strokeWidth="3" />
          <path d="M98 88 L98 115" stroke="#047857" strokeWidth="3" />
          {/* Stack of books */}
          <rect x="125" y="102" width="45" height="12" rx="2" fill="#3B82F6" stroke={stroke} strokeWidth="2" />
          <rect x="128" y="90" width="40" height="12" rx="2" fill="#F59E0B" stroke={stroke} strokeWidth="2" />
          <rect x="132" y="78" width="34" height="12" rx="2" fill="#EF4444" stroke={stroke} strokeWidth="2" />
        </svg>
      );

    // 20. Teacher: Chalkboard and instructor
    case 'teacher':
      return (
        <svg viewBox="0 0 200 150" className={className} fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="10" y="10" width="180" height="130" rx="16" fill="#F8FAFC" stroke="none" />
          {/* Chalkboard */}
          <rect x="25" y="25" width="75" height="55" rx="4" fill="#14532D" stroke="#78350F" strokeWidth="3" />
          <line x1="35" y1="45" x2="65" y2="45" stroke="#FFFFFF" strokeWidth="2" />
          <line x1="35" y1="58" x2="80" y2="58" stroke="#FFFFFF" strokeWidth="2" />
          {/* Teacher with pointer stick */}
          <circle cx="140" cy="50" r="15" fill="#FED7AA" stroke={stroke} strokeWidth="2.5" />
          <path d="M120 125 C120 92 160 92 160 125" fill="#8B5CF6" stroke={stroke} strokeWidth="2.5" />
          {/* Pointer stick pointing to board */}
          <line x1="120" y1="85" x2="85" y2="55" stroke="#F59E0B" strokeWidth="3" />
        </svg>
      );

    // 21. Doctor: Medical coat, stethoscope
    case 'doctor':
      return (
        <svg viewBox="0 0 200 150" className={className} fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="10" y="10" width="180" height="130" rx="16" fill="#F0FDFA" stroke="none" />
          {/* Doctor */}
          <circle cx="100" cy="48" r="16" fill="#FED7AA" stroke={stroke} strokeWidth="2.5" />
          <path d="M72 125 C72 88 128 88 128 125" fill="#FFFFFF" stroke={stroke} strokeWidth="2.5" />
          {/* Stethoscope around neck */}
          <path d="M90 78 Q90 98 100 102 Q110 98 110 78" stroke="#0F766E" strokeWidth="2.5" fill="none" />
          <circle cx="100" cy="106" r="4" fill="#0F766E" stroke={stroke} strokeWidth="1.5" />
          {/* Red Cross */}
          <circle cx="150" cy="45" r="16" fill="#FFFFFF" stroke="#EF4444" strokeWidth="2" />
          <rect x="148" y="36" width="4" height="18" fill="#EF4444" stroke="none" />
          <rect x="141" y="43" width="18" height="4" fill="#EF4444" stroke="none" />
        </svg>
      );

    // 22. Banker: Bank building / financial counter
    case 'banker':
      return (
        <svg viewBox="0 0 200 150" className={className} fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="10" y="10" width="180" height="130" rx="16" fill="#F8FAFC" stroke="none" />
          {/* Bank building columns */}
          <rect x="30" y="45" width="70" height="75" rx="3" fill="#E2E8F0" stroke={stroke} strokeWidth="2" />
          <polygon points="25,45 65,22 105,45" fill="#CBD5E1" stroke={stroke} strokeWidth="2" />
          <line x1="45" y1="52" x2="45" y2="105" stroke={stroke} strokeWidth="3" />
          <line x1="65" y1="52" x2="65" y2="105" stroke={stroke} strokeWidth="3" />
          <line x1="85" y1="52" x2="85" y2="105" stroke={stroke} strokeWidth="3" />
          {/* Bank employee */}
          <circle cx="145" cy="55" r="14" fill="#FED7AA" stroke={stroke} strokeWidth="2" />
          <path d="M125 125 C125 95 165 95 165 125" fill="#0F172A" stroke={stroke} strokeWidth="2.5" />
          {/* Currency coin */}
          <circle cx="145" cy="98" r="9" fill="#FACC15" stroke={stroke} strokeWidth="1.5" />
          <text x="145" y="102" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#78350F" stroke="none">¥</text>
        </svg>
      );

    // 23. Researcher: Scientist, beaker, microscope
    case 'researcher':
      return (
        <svg viewBox="0 0 200 150" className={className} fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="10" y="10" width="180" height="130" rx="16" fill="#F5F3FF" stroke="none" />
          {/* Researcher with lab coat and glasses */}
          <circle cx="75" cy="50" r="16" fill="#FED7AA" stroke={stroke} strokeWidth="2.5" />
          <line x1="68" y1="48" x2="82" y2="48" stroke={stroke} strokeWidth="2" />
          <circle cx="70" cy="48" r="4" stroke={stroke} strokeWidth="1.5" />
          <circle cx="80" cy="48" r="4" stroke={stroke} strokeWidth="1.5" />
          <path d="M50 125 C50 90 100 90 100 125" fill="#FFFFFF" stroke={stroke} strokeWidth="2.5" />
          {/* Chemistry Erlenmeyer Flask */}
          <polygon points="140,118 160,118 153,90 147,90" fill="#C4B5FD" stroke={stroke} strokeWidth="2" />
          <rect x="146" y="82" width="8" height="8" stroke={stroke} strokeWidth="2" fill="#FFFFFF" />
          {/* Liquid bubbles */}
          <circle cx="150" cy="105" r="2.5" fill="#8B5CF6" />
          <circle cx="155" cy="110" r="2" fill="#8B5CF6" />
          <circle cx="145" cy="112" r="3" fill="#8B5CF6" />
        </svg>
      );

    // 24. Engineer: Laptop with code brackets
    case 'engineer':
    default:
      return (
        <svg viewBox="0 0 200 150" className={className} fill="none" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="10" y="10" width="180" height="130" rx="16" fill={bgSoft} stroke="none" />
          {/* Engineer */}
          <circle cx="100" cy="45" r="16" fill="#FED7AA" stroke={stroke} strokeWidth="2.5" />
          {/* Modern headphones */}
          <path d="M83 45 Q83 25 100 25 Q117 25 117 45" stroke="#475569" strokeWidth="3" fill="none" />
          <rect x="80" y="40" width="6" height="12" rx="2" fill="#1E293B" stroke="none" />
          <rect x="114" y="40" width="6" height="12" rx="2" fill="#1E293B" stroke="none" />
          {/* Body */}
          <path d="M72 125 C72 88 128 88 128 125" fill="#2563EB" stroke={stroke} strokeWidth="2.5" />
          {/* Laptop with code brackets */}
          <rect x="75" y="88" width="50" height="30" rx="3" fill="#1E293B" stroke={stroke} strokeWidth="2" />
          <polygon points="68,120 132,120 125,116 75,116" fill="#94A3B8" stroke={stroke} strokeWidth="1.5" />
          <text x="100" y="107" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#38BDF8" stroke="none">&lt; / &gt;</text>
        </svg>
      );
  }
};
