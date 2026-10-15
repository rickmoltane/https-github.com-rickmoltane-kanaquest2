import React, { useState, useEffect, useCallback, useRef } from 'react';
import { QuizResult } from '../types';
import { 
  generateExchangeQuiz, 
  ExchangeQuizQuestion, 
  ExchangeOption 
} from '../data/exchangeData';
import { speakKana, playSuccessChime, playErrorBuzz } from '../utils/audio';
import { recordImmediatePhraseAnswer } from '../services/storageService';
import { 
  Volume2, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Flame,
  Lightbulb,
  Target,
  Sparkles
} from 'lucide-react';
import { ConversationSprite } from './ConversationSprite';

interface ExchangeQuizProps {
  exerciseType: 'exchange-romaji' | 'exchange-hiragana';
  soundEnabled: boolean;
  onComplete: (result: QuizResult) => void;
  onCancel: () => void;
}

interface AnswerRecord {
  questionNumber: number;
  prompt: string;
  selectedText: string;
  correctText: string;
  isCorrect: boolean;
  timeTakenMs: number;
  hiraganaKana: string;
  romajiText: string;
}

export const ExchangeQuiz: React.FC<ExchangeQuizProps> = ({
  exerciseType,
  soundEnabled,
  onComplete,
  onCancel,
}) => {
  const isHiragana = exerciseType === 'exchange-hiragana';
  const exerciseNumber = isHiragana ? 7 : 6;
  const exerciseTitle = isHiragana ? 'Exercise 7' : 'Exercise 6';

  const [questions, setQuestions] = useState<ExchangeQuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [streak, setStreak] = useState<number>(0);
  const [playingAudioKey, setPlayingAudioKey] = useState<string | null>(null);

  const startTimeRef = useRef<number>(Date.now());
  const questionStartTimeRef = useRef<number>(Date.now());
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize or restart round of 10 questions
  const startNewQuiz = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    const newQuestions = generateExchangeQuiz(isHiragana ? 'hiragana' : 'romaji', 10);
    setQuestions(newQuestions);
    setCurrentIndex(0);
    setSelectedOptionIndex(null);
    setIsAnswered(false);
    setShowHint(false);
    setAnswers([]);
    setStreak(0);
    startTimeRef.current = Date.now();
    questionStartTimeRef.current = Date.now();
  }, [isHiragana]);

  useEffect(() => {
    startNewQuiz();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [startNewQuiz]);

  const currentQuestion = questions[currentIndex];

  useEffect(() => {
    questionStartTimeRef.current = Date.now();
  }, [currentIndex]);

  // Audio helper
  const handlePlayAudio = useCallback((textToSpeak: string, keyId: string) => {
    if (!textToSpeak) return;
    setPlayingAudioKey(keyId);
    speakKana(textToSpeak);
    setTimeout(() => {
      setPlayingAudioKey(null);
    }, 2000);
  }, []);

  // Advance to next question or complete quiz
  const handleAdvance = useCallback((currentAnswersList?: AnswerRecord[]) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    const answersToUse = currentAnswersList || answers;

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOptionIndex(null);
      setIsAnswered(false);
      setShowHint(false);
    } else {
      // Complete quiz and prepare QuizResult
      const totalQuestions = answersToUse.length;
      const score = answersToUse.filter(a => a.isCorrect).length;
      const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
      const timeSpentSeconds = Math.max(1, Math.round((Date.now() - startTimeRef.current) / 1000));

      const quizResult: QuizResult = {
        id: `quiz_${Date.now()}`,
        userId: 'local',
        exerciseType,
        score,
        totalQuestions,
        percentage,
        timeSpentSeconds,
        createdAt: new Date().toISOString(),
        items: answersToUse.map(a => ({
          kana: a.hiraganaKana,
          romaji: a.romajiText,
          selected: a.selectedText,
          correct: a.correctText,
          isCorrect: a.isCorrect,
        })),
      };

      onComplete(quizResult);
    }
  }, [currentIndex, questions.length, answers, exerciseType, onComplete]);

  // Option selection
  const handleSelectOption = useCallback((option: ExchangeOption, index: number) => {
    if (isAnswered || !currentQuestion) return;

    const isCorrect = option.isCorrect;
    setSelectedOptionIndex(index);
    setIsAnswered(true);

    const timeTakenMs = Date.now() - questionStartTimeRef.current;
    const correctOpt = currentQuestion.options.find(o => o.isCorrect) || currentQuestion.options[0];

    const newAnswer: AnswerRecord = {
      questionNumber: currentQuestion.questionNumber,
      prompt: currentQuestion.prompt,
      selectedText: option.text,
      correctText: correctOpt.text,
      isCorrect,
      timeTakenMs,
      hiraganaKana: currentQuestion.direction === 'reply-to-question' 
        ? currentQuestion.item.correctHiragana 
        : currentQuestion.item.promptHiragana,
      romajiText: currentQuestion.direction === 'reply-to-question' 
        ? currentQuestion.item.correctRomaji 
        : currentQuestion.item.promptRomaji,
    };

    const nextAnswers = [...answers, newAnswer];
    setAnswers(nextAnswers);

    // Record immediate phrase answer for spaced repetition and adaptive focus
    recordImmediatePhraseAnswer(currentQuestion.item.id, isCorrect);

    if (isCorrect) {
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }

    // Audio feedback:
    if (soundEnabled) {
      if (isCorrect) {
        playSuccessChime();
        // Play audio of the chosen correct Japanese phrase
        if (correctOpt.hiraganaAudio) {
          setTimeout(() => {
            speakKana(correctOpt.hiraganaAudio);
          }, 180);
        }
      } else {
        playErrorBuzz();

        // Physical vibration on supported mobile devices
        if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
          try {
            navigator.vibrate([45, 60, 45]);
          } catch (e) {
            // Ignore unsupported/denied vibration
          }
        }

        // USER REQUEST: Do NOT play audio of the wrong answer.
        // Instead, give the audio for the CORRECT one!
        if (correctOpt.hiraganaAudio) {
          setTimeout(() => {
            speakKana(correctOpt.hiraganaAudio);
          }, 360);
        }
      }
    }

    // Auto-advance logic:
    // USER REQUEST: When wrong, do NOT go straight to the next question (let user click Next)!
    if (timerRef.current) clearTimeout(timerRef.current);
    if (isCorrect) {
      // Auto-advance only when correct after 2400ms
      timerRef.current = setTimeout(() => {
        handleAdvance(nextAnswers);
      }, 2400);
    }
  }, [isAnswered, currentQuestion, answers, soundEnabled, handleAdvance]);

  // Keyboard shortcuts [1], [2], [3], [H] for hint toggle, and [Enter]/[Space] to advance
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if ((e.key === 'h' || e.key === 'H') && !e.ctrlKey && !e.metaKey) {
        setShowHint(prev => !prev);
        return;
      }

      if ((e.key === 'p' || e.key === 'P' || e.key === 'a' || e.key === 'A') && !e.ctrlKey && !e.metaKey && currentQuestion) {
        handlePlayAudio(currentQuestion.promptAudio, 'prompt');
        return;
      }

      if (isAnswered) {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight') {
          e.preventDefault();
          handleAdvance();
        }
        return;
      }

      if (!currentQuestion) return;

      if (e.key === '1' && currentQuestion.options[0]) {
        handleSelectOption(currentQuestion.options[0], 0);
      } else if (e.key === '2' && currentQuestion.options[1]) {
        handleSelectOption(currentQuestion.options[1], 1);
      } else if (e.key === '3' && currentQuestion.options[2]) {
        handleSelectOption(currentQuestion.options[2], 2);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAnswered, currentQuestion, handleSelectOption, handleAdvance]);

  if (!currentQuestion) {
    return (
      <div className="flex-1 flex items-center justify-center p-6 text-center">
        <div className="p-8 bg-white rounded-2xl border-2 border-[#CBD5E1] shadow-xs max-w-md">
          <p className="font-extrabold text-[#1F2329] mb-4">Loading exercise...</p>
          <button
            type="button"
            onClick={startNewQuiz}
            className="px-5 py-2.5 rounded-xl bg-[#1A73E8] text-white font-bold cursor-pointer hover:bg-[#1557B0]"
          >
            Restart
          </button>
        </div>
      </div>
    );
  }

  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);

  return (
    <div className="flex-1 flex flex-col h-full max-h-full overflow-hidden bg-[#F8FAFF] select-none">
      {/* TOP HEADER: Clean, uncrowded bar */}
      <div className="bg-white border-b border-[#E2E8F0] px-3 sm:px-6 py-2 shrink-0 shadow-2xs">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-2">
          {/* Left: Badge & Question Count */}
          <div className="flex items-center gap-2 min-w-0">
            <span className="font-mono text-xs font-black px-2.5 py-1 rounded-lg bg-[#1F2329] text-white shrink-0">
              [{exerciseNumber}]
            </span>
            <div className="min-w-0">
              <span className="text-xs sm:text-sm font-black text-[#1F2329] tracking-tight truncate block">
                {exerciseTitle}
              </span>
              <p className="text-[11px] text-[#5F6368] font-medium">
                {currentIndex + 1} / {questions.length}
              </p>
            </div>
          </div>

          {/* Right: Streak, Hint toggle, & Exit */}
          <div className="flex items-center gap-2 shrink-0">
            {streak > 1 && (
              <div className="flex items-center gap-1 text-xs font-black text-amber-600 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200">
                <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>{streak}</span>
              </div>
            )}
            <button
              type="button"
              onClick={onCancel}
              className="text-xs font-bold text-[#5F6368] hover:text-[#1F2329] px-2.5 py-1 rounded-lg border border-[#CBD5E1] hover:bg-[#F8FAFF] cursor-pointer"
            >
              Exit
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="max-w-3xl mx-auto w-full bg-[#E2E8F0] h-1.5 rounded-full mt-2 overflow-hidden">
          <div
            className="bg-[#1A73E8] h-full transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* MAIN BODY: Calibrated visual scene and 3 replies below with ZERO overlap */}
      <div className="flex-1 min-h-0 flex flex-col items-center justify-between p-2 sm:p-3 max-w-xl mx-auto w-full gap-2 sm:gap-2.5 overflow-y-auto">
        
        {/* UPPER QUESTION SPACE: Calibrated manga scene visual with overlaid white speech bubble box */}
        <div className="w-full flex flex-col items-center justify-center shrink-0 my-auto py-0.5">
          <ConversationSprite
            spriteId={currentQuestion.spriteId}
            size="full"
            speechBubbleText={currentQuestion.prompt}
            isHiragana={isHiragana}
            direction={currentQuestion.direction}
            directionBadge={currentQuestion.directionBadge}
            adaptiveStatus={currentQuestion.adaptiveStatus}
            isPlayingAudio={playingAudioKey === 'prompt'}
            onPlayAudio={() => handlePlayAudio(currentQuestion.promptAudio, 'prompt')}
            showHint={showHint}
            onToggleHint={() => setShowHint(prev => !prev)}
            hintEnglish={currentQuestion.promptEnglish}
            hintDirectionInstruction={
              currentQuestion.direction === 'reply-to-question'
                ? '💡 Challenge: Select the Japanese question that leads to this reply.'
                : '💡 Challenge: Select the appropriate Japanese reply to this question.'
            }
          />

          {/* Quick Play Audio & Hint helper controls under the visual */}
          <div className="flex items-center justify-center gap-2 mt-1 sm:mt-1.5 shrink-0">
            {(isHiragana || isAnswered) && (
              <button
                type="button"
                onClick={() => handlePlayAudio(currentQuestion.promptAudio, 'prompt')}
                aria-label="Play prompt phrase audio"
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold transition-all cursor-pointer ${
                  playingAudioKey === 'prompt'
                    ? 'bg-[#1A73E8] text-white border-[#1A73E8] scale-105 shadow-xs'
                    : 'bg-white text-[#1A73E8] border-[#BFDBFE] hover:border-[#1A73E8] hover:bg-[#F8FAFF] shadow-2xs'
                }`}
                title="Play prompt audio in Japanese (Key: P or tap bubble)"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>{playingAudioKey === 'prompt' ? 'Playing...' : 'Play Audio'}</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setShowHint(prev => !prev)}
              aria-label="Toggle English translation hint"
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold transition-all cursor-pointer ${
                showHint
                  ? 'bg-amber-100 text-amber-900 border-amber-400 font-extrabold shadow-2xs'
                  : 'bg-white text-[#5F6368] border-[#CBD5E1] hover:text-[#1F2329] hover:bg-amber-50/50 shadow-2xs'
              }`}
              title="Toggle English Translation Hint (Key: H)"
            >
              <Lightbulb className={`w-3.5 h-3.5 ${showHint ? 'text-amber-600 fill-amber-500' : 'text-amber-500'}`} />
              <span>{showHint ? 'Hide Hint' : 'Hint'}</span>
            </button>
          </div>
        </div>

        {/* BOTTOM OPTIONS AREA: Exactly 3 Possible Replies (Pure Romaji or Hiragana) */}
        {/* Sibling elements: Option button and Audio button sit side-by-side cleanly with NO overlap */}
        <div className="w-full flex flex-col gap-2 sm:gap-2.5 shrink-0 max-w-lg mb-1">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = selectedOptionIndex === idx;
            const isCorrect = option.isCorrect;
            const showFeedback = isAnswered;
            const wasWrongChoiceMade = selectedOptionIndex !== null && !currentQuestion.options[selectedOptionIndex]?.isCorrect;

            let buttonStyle = 'bg-white text-[#1F2329] border-2 border-[#CBD5E1] hover:border-[#1A73E8] hover:bg-[#F8FAFF]';

            if (showFeedback) {
              if (isCorrect) {
                // If wrong answer was chosen, flash green the correct one right after the shake!
                buttonStyle = wasWrongChoiceMade
                  ? 'bg-emerald-50 text-emerald-900 border-2 border-emerald-500 ring-2 ring-emerald-300 animate-flash-green-delayed'
                  : 'bg-emerald-50 text-emerald-900 border-2 border-emerald-500 ring-2 ring-emerald-200';
              } else if (isSelected && !isCorrect) {
                // Vibrate the wrong (red) answer slightly!
                buttonStyle = 'bg-rose-50 text-rose-900 border-2 border-rose-500 ring-2 ring-rose-300 animate-shake-wrong';
              } else {
                buttonStyle = 'bg-[#F8FAFF] text-[#5F6368] border-2 border-[#E2E8F0] opacity-50';
              }
            }

            // In Exercise 7 (Hiragana), audio buttons are always present for options.
            // In Exercise 6 (Romaji), audio is included AFTER player chooses an answer.
            const showAudioButton = isHiragana || (showFeedback && (isSelected || isCorrect));

            return (
              <div
                key={idx}
                className="flex items-stretch gap-2 w-full"
              >
                {/* Main Option Select Button */}
                <button
                  type="button"
                  onClick={() => handleSelectOption(option, idx)}
                  disabled={isAnswered}
                  className={`flex-1 min-h-[50px] sm:min-h-[54px] py-2.5 sm:py-3 px-3.5 sm:px-4 rounded-xl sm:rounded-2xl flex items-center justify-between text-left transition-all cursor-pointer font-sans shadow-xs gap-3 ${buttonStyle}`}
                >
                  <div className="flex items-center gap-2.5 sm:gap-3 flex-1 min-w-0">
                    {/* Number key shortcut badge */}
                    <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-[#F0F4F8] text-[#1F2329] border border-[#CBD5E1] flex items-center justify-center font-mono text-xs sm:text-sm font-black shrink-0">
                      {idx + 1}
                    </span>

                    {/* Option Text (Pure Japanese text, wraps cleanly without overflowing) */}
                    <div className="flex flex-col min-w-0 flex-1">
                      <span
                        className={`${
                          isHiragana
                            ? "font-['Noto_Sans_JP',_sans-serif] text-base sm:text-lg font-bold tracking-wide"
                            : "font-mono text-sm sm:text-base font-bold"
                        } break-words text-left leading-snug`}
                      >
                        {option.text}
                      </span>
                      {/* Optional English translation of options shown when hint is active and answer was revealed */}
                      {showHint && showFeedback && (
                        <span className="text-[11px] sm:text-xs text-[#5F6368] font-normal italic mt-0.5 break-words">
                          {option.englishMeaning}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Feedback Status Icon */}
                  {showFeedback && (
                    <div className="shrink-0 ml-1">
                      {isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      ) : isSelected ? (
                        <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                      ) : null}
                    </div>
                  )}
                </button>

                {/* Sibling Audio Button - Independent flex item, never overlapping */}
                {showAudioButton && (
                  <button
                    type="button"
                    onClick={() => handlePlayAudio(option.hiraganaAudio, `opt_${idx}`)}
                    aria-label={`Play option ${idx + 1} audio`}
                    className={`px-3 sm:px-3.5 rounded-xl sm:rounded-2xl border transition-all cursor-pointer flex items-center justify-center shrink-0 shadow-xs ${
                      playingAudioKey === `opt_${idx}`
                        ? 'bg-[#1A73E8] text-white border-[#1A73E8] scale-105'
                        : 'bg-white text-[#5F6368] hover:text-[#1A73E8] border-[#CBD5E1] hover:border-[#1A73E8] hover:bg-[#F8FAFF]'
                    }`}
                    title="Play Japanese pronunciation"
                  >
                    <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* BOTTOM ACTION BAR: Clean Status, Shortcuts, and Advance Button */}
        <div className="w-full bg-white border border-[#CBD5E1] rounded-2xl px-3.5 sm:px-4 py-2.5 shadow-2xs flex items-center justify-between text-xs shrink-0 gap-2">
          <div className="flex items-center gap-2 min-w-0">
            {isAnswered ? (
              selectedOptionIndex !== null && currentQuestion.options[selectedOptionIndex]?.isCorrect ? (
                <div className="flex items-center gap-1.5 text-emerald-700 font-extrabold truncate">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>正解 (Correct!)</span>
                  {showHint && (
                    <span className="text-[11px] font-normal text-emerald-800 hidden sm:inline ml-1 truncate">
                      — {currentQuestion.item.correctEnglish}
                    </span>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-rose-700 font-bold truncate">
                  <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span className="font-extrabold">不正解</span>
                  <span className="text-[11px] text-neutral-600 font-normal hidden sm:inline">
                    — Take your time to review, then click Next or press [Enter]
                  </span>
                </div>
              )
            ) : (
              <span className="text-[#5F6368] font-semibold truncate flex items-center gap-1">
                <span>Keys</span>
                <kbd className="px-1.5 py-0.5 rounded bg-neutral-100 border border-neutral-300 font-mono text-[10px]">1</kbd>
                <kbd className="px-1.5 py-0.5 rounded bg-neutral-100 border border-neutral-300 font-mono text-[10px]">2</kbd>
                <kbd className="px-1.5 py-0.5 rounded bg-neutral-100 border border-neutral-300 font-mono text-[10px]">3</kbd>
                <span className="text-neutral-400 mx-1">&bull;</span>
                <kbd className="px-1.5 py-0.5 rounded bg-neutral-100 border border-neutral-300 font-mono text-[10px]">H</kbd>
                <span className="text-[11px] text-neutral-500">Hint</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Mobile quick-toggle for hint when unanswered */}
            {!isAnswered && (
              <button
                type="button"
                onClick={() => setShowHint(prev => !prev)}
                className={`text-[11px] font-bold px-2 py-1 rounded-lg border transition-colors cursor-pointer sm:hidden ${
                  showHint ? 'bg-amber-100 text-amber-900 border-amber-300' : 'bg-white text-neutral-600 border-neutral-300'
                }`}
              >
                {showHint ? 'Hide (hint)' : '(hint)'}
              </button>
            )}

            {isAnswered && (
              <button
                type="button"
                onClick={() => handleAdvance()}
                className={`inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-xl font-bold cursor-pointer shrink-0 transition-all shadow-xs ${
                  selectedOptionIndex !== null && !currentQuestion.options[selectedOptionIndex]?.isCorrect
                    ? 'bg-rose-600 hover:bg-rose-700 text-white ring-2 ring-rose-200'
                    : 'bg-[#1A73E8] hover:bg-[#1557B0] text-white'
                }`}
              >
                <span>{currentIndex < questions.length - 1 ? 'Next Question' : 'Finish'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
