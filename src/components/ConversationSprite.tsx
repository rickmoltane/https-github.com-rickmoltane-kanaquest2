import React, { useState } from 'react';
import { getSpriteMetadata, SpriteMetadata } from '../data/spriteSheetData';
import spriteSheetImage from '../assets/images/conversation_sprites.jpg';
import { Volume2, Lightbulb, Target, Sparkles, CheckCircle2, ImageOff } from 'lucide-react';

interface ConversationSpriteProps {
  spriteId?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'full';
  showCaption?: boolean;
  // Overlaid Speech Bubble properties (for Exercise 6 & 7 visual scene)
  speechBubbleText?: string;
  isHiragana?: boolean;
  direction?: 'question-to-reply' | 'reply-to-question';
  directionBadge?: string;
  adaptiveStatus?: 'unseen' | 'needs_practice' | 'proven' | 'review';
  isPlayingAudio?: boolean;
  onPlayAudio?: () => void;
  showHint?: boolean;
  onToggleHint?: () => void;
  hintEnglish?: string;
  hintDirectionInstruction?: string;
}

export const ConversationSprite: React.FC<ConversationSpriteProps> = ({
  spriteId = '01',
  className = '',
  size = 'md',
  showCaption = false,
  speechBubbleText,
  isHiragana = false,
  direction,
  directionBadge,
  adaptiveStatus,
  isPlayingAudio = false,
  onPlayAudio,
  showHint = false,
  onToggleHint,
  hintEnglish,
  hintDirectionInstruction,
}) => {
  const meta: SpriteMetadata = getSpriteMetadata(spriteId);
  const [imgSrc, setImgSrc] = useState<string>(spriteSheetImage);
  const [imgFailed, setImgFailed] = useState<boolean>(false);

  // Exact 4x4 Grid crop coordinates:
  // Each sprite occupies 1/4th (25%) of sheet in each dimension.
  // Col: 0..3 -> left: -(col * 100)%
  // Row: 0..3 -> top: -(row * 100)%
  // Scale 1.045 to cleanly inset past black divider border lines
  const colOffset = meta.col * 100;
  const rowOffset = meta.row * 100;

  const handleImageError = () => {
    if (imgSrc !== '/conversation_sprites.jpg') {
      setImgSrc('/conversation_sprites.jpg');
    } else {
      setImgFailed(true);
    }
  };

  // If size is 'full', render the calibrated manga visual scene with overlaid white speech bubble box
  if (size === 'full') {
    const bubble = meta.bubblePosition || {
      topPercent: 8,
      leftPercent: 50,
      maxWidthPercent: 80,
      tailPercent: 50,
    };

    return (
      <div className={`w-full flex flex-col items-center select-none ${className}`}>
        {/* TOP STATUS BAR: Sits cleanly ABOVE panel to prevent ANY overlap with the speech bubble */}
        <div className="w-full max-w-[260px] sm:max-w-[300px] flex items-center justify-between mb-1 px-1 shrink-0 gap-1.5">
          {directionBadge ? (
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-black tracking-wide border shadow-2xs truncate ${
                direction === 'reply-to-question'
                  ? 'bg-purple-50 text-purple-900 border-purple-300'
                  : 'bg-blue-50 text-blue-900 border-blue-300'
              }`}
            >
              <span>{direction === 'reply-to-question' ? '💬' : '❓'}</span>
              <span className="truncate">{directionBadge}</span>
            </span>
          ) : (
            <div />
          )}

          {/* Adaptive Mastery Indicator */}
          {adaptiveStatus === 'needs_practice' && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-800 border border-rose-300 shadow-2xs shrink-0">
              <Target className="w-2.5 h-2.5 text-rose-600 animate-pulse" />
              <span>Practice</span>
            </span>
          )}
          {adaptiveStatus === 'unseen' && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-300 shadow-2xs shrink-0">
              <Sparkles className="w-2.5 h-2.5 text-amber-600" />
              <span>New</span>
            </span>
          )}
          {adaptiveStatus === 'proven' && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-300 shadow-2xs shrink-0">
              <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
              <span>Mastered</span>
            </span>
          )}
        </div>

        {/* MANGA SCENE PANEL: Calibrated dimensions (w-[240px]..[280px]) so it never overlaps or crowds options */}
        <div
          className="w-[230px] sm:w-[260px] md:w-[280px] aspect-square rounded-2xl sm:rounded-3xl overflow-hidden border-2 sm:border-[2.5px] border-[#1F2329] shadow-[0_6px_20px_rgba(0,0,0,0.12)] relative bg-[#1F2329] shrink-0"
        >
          {/* Real <img> element cropped via overflow-hidden container */}
          <div className="absolute inset-0 w-full h-full overflow-hidden bg-neutral-200">
            {!imgFailed ? (
              <img
                src={imgSrc}
                alt={`${meta.sceneTitle} (${meta.characters})`}
                onError={handleImageError}
                draggable={false}
                className="absolute max-w-none pointer-events-none select-none"
                style={{
                  width: '400%',
                  height: '400%',
                  left: `-${colOffset}%`,
                  top: `-${rowOffset}%`,
                  transform: 'scale(1.045)',
                  transformOrigin: `${(meta.col + 0.5) * 25}% ${(meta.row + 0.5) * 25}%`,
                  objectFit: 'fill',
                }}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-3 bg-slate-900 text-white text-center">
                <ImageOff className="w-7 h-7 text-amber-400 mb-1" />
                <span className="font-bold text-xs">{meta.sceneTitle}</span>
                <span className="text-[10px] text-neutral-300 mt-0.5">{meta.characters}</span>
              </div>
            )}
          </div>

          {/* OVERLAID WHITE SPEECH BUBBLE BOX: Positioned directly over speaker's speech bubble */}
          {speechBubbleText && (
            <div
              onClick={onPlayAudio}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onPlayAudio?.();
                }
              }}
              title="Click speech bubble to hear pronunciation (Key: P)"
              style={{
                top: `${bubble.topPercent}%`,
                left: `${bubble.leftPercent}%`,
                transform: 'translateX(-50%)',
                maxWidth: `${Math.max(bubble.maxWidthPercent, 78)}%`,
              }}
              className={`absolute z-20 bg-white border-2 border-[#1F2329] rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.22)] px-3 py-1.5 sm:px-3.5 sm:py-2 cursor-pointer transition-all duration-150 group hover:scale-[1.03] active:scale-[0.98] ${
                isPlayingAudio ? 'ring-3 ring-[#1A73E8] bg-blue-50/95 scale-[1.02]' : ''
              }`}
            >
              {/* Bubble Text Content: Guaranteed minimum font size 13px (minimum font size 12 satisfied) */}
              <div className="flex items-center justify-center gap-1.5">
                <span
                  style={{ fontSize: 'clamp(13px, 2.8vw, 16px)' }}
                  className={`${
                    isHiragana
                      ? "font-['Noto_Sans_JP',_sans-serif] text-[13px] sm:text-[15px] md:text-[16px] font-black text-[#1F2329] tracking-wide"
                      : "font-mono sm:font-sans text-[13px] sm:text-[14px] md:text-[15px] font-black text-[#1F2329] tracking-tight"
                  } leading-snug text-center break-words select-text`}
                >
                  {speechBubbleText}
                </span>

                {/* Speaker Audio Wave Icon */}
                <span
                  className={`shrink-0 p-1 rounded-full transition-colors ${
                    isPlayingAudio
                      ? 'bg-[#1A73E8] text-white animate-pulse'
                      : 'bg-neutral-100 text-[#5F6368] group-hover:bg-[#1A73E8] group-hover:text-white'
                  }`}
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </span>
              </div>

              {/* Seamless Manga Speech Bubble Tail (SVG Triangle pointing to character) */}
              <svg
                className="absolute -bottom-2.5 w-3.5 h-2.5 overflow-visible pointer-events-none"
                style={{
                  left: `${bubble.tailPercent}%`,
                  transform: 'translateX(-50%)',
                }}
                viewBox="0 0 14 10"
              >
                <path
                  d="M0,0 L7,10 L14,0 Z"
                  fill={isPlayingAudio ? '#F0F7FF' : 'white'}
                  stroke="#1F2329"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
                <line
                  x1="1.5"
                  y1="0"
                  x2="12.5"
                  y2="0"
                  stroke={isPlayingAudio ? '#F0F7FF' : 'white'}
                  strokeWidth="3.5"
                />
              </svg>
            </div>
          )}

          {/* ANIME SUBTITLE TRANSLATION BANNER (When Hint is Active) */}
          {showHint && hintEnglish && (
            <div className="absolute bottom-2 left-2 right-2 bg-slate-950/92 backdrop-blur-md text-white border border-amber-400/80 rounded-xl p-2 shadow-xl text-left animate-in fade-in zoom-in-95 duration-150 z-30">
              <div className="flex items-center justify-between gap-1 mb-0.5">
                <span className="text-[9px] font-black uppercase tracking-wider text-amber-300 bg-amber-950/80 border border-amber-500/40 px-1 py-0.2 rounded font-mono">
                  Translation Hint
                </span>
                <span className="text-[9px] text-amber-200/90 font-medium truncate">
                  {direction === 'reply-to-question' ? 'Statement / Answer' : 'Question Asked'}
                </span>
              </div>
              <p className="text-xs sm:text-[13px] font-bold text-amber-100 leading-snug">
                "{hintEnglish}"
              </p>
              {hintDirectionInstruction && (
                <p className="text-[10px] text-amber-300/80 font-medium mt-0.5 leading-tight">
                  {hintDirectionInstruction}
                </p>
              )}
            </div>
          )}
        </div>

        {/* BOTTOM CAPTION: Scene Title sits cleanly below panel, never obscuring characters */}
        <div className="flex items-center justify-center gap-1.5 mt-1 text-center">
          <span className="font-mono text-[10px] font-black px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-700 border border-neutral-300">
            #{meta.id}
          </span>
          <span className="text-[11px] font-bold text-[#1F2329] truncate max-w-[240px]">
            {meta.sceneTitle}
          </span>
        </div>
      </div>
    );
  }

  // STANDARD THUMBNAIL SIZES (sm, md, lg)
  const sizeClasses = {
    sm: 'w-14 h-14 sm:w-16 sm:h-16',
    md: 'w-20 h-20 sm:w-24 sm:h-24',
    lg: 'w-28 h-28 sm:w-32 sm:h-32',
  }[size as 'sm' | 'md' | 'lg'] || 'w-20 h-20';

  return (
    <div className={`flex flex-col items-center gap-1.5 ${className}`}>
      <div
        className={`${sizeClasses} rounded-2xl overflow-hidden border-2 border-[#CBD5E1] shadow-xs relative shrink-0 bg-neutral-100 transition-transform duration-200 hover:scale-105`}
        title={`${meta.sceneTitle} (${meta.characters})`}
      >
        <div className="absolute inset-0 w-full h-full overflow-hidden bg-neutral-200">
          {!imgFailed ? (
            <img
              src={imgSrc}
              alt={meta.sceneTitle}
              onError={handleImageError}
              draggable={false}
              className="absolute max-w-none pointer-events-none select-none"
              style={{
                width: '400%',
                height: '400%',
                left: `-${colOffset}%`,
                top: `-${rowOffset}%`,
                transform: 'scale(1.045)',
                transformOrigin: `${(meta.col + 0.5) * 25}% ${(meta.row + 0.5) * 25}%`,
                objectFit: 'fill',
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-slate-800 text-white font-mono text-[10px] font-bold">
              #{meta.id}
            </div>
          )}
        </div>
        {/* Subtle panel identifier badge */}
        <span className="absolute bottom-1 right-1 font-mono text-[9px] font-black px-1 py-0.5 rounded bg-black/70 text-white backdrop-blur-xs leading-none z-10">
          #{meta.id}
        </span>
      </div>

      {showCaption && (
        <div className="text-center max-w-[140px] sm:max-w-[180px]">
          <p className="text-[11px] sm:text-xs font-bold text-[#1F2329] leading-tight truncate">
            {meta.sceneTitle}
          </p>
          <p className="text-[10px] text-[#5F6368] font-medium leading-tight truncate">
            {meta.characters}
          </p>
        </div>
      )}
    </div>
  );
};
