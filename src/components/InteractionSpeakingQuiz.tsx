import React, { useState, useEffect, useRef, useCallback } from 'react';
import { QuizResult } from '../types';
import { INTERACTION_DATA, InteractionItem } from '../data/interactionData';
import { SituationIllustration } from './SituationIllustration';
import { evaluateInteractionResponse, InteractionEvaluationResult } from '../utils/interactionEvaluator';
import { playSuccessChime, playErrorBuzz, speakJapaneseSentence } from '../utils/audio';
import { 
  Volume2, 
  Mic, 
  MicOff, 
  ArrowRight, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  Keyboard, 
  Flame,
  X
} from 'lucide-react';

interface InteractionSpeakingQuizProps {
  soundEnabled: boolean;
  onComplete: (result: QuizResult) => void;
  onCancel: () => void;
}

type QuizStatus = 'idle' | 'listening' | 'evaluating' | 'success' | 'retry' | 'unsupported';

interface IWindowWithSpeech extends Window {
  SpeechRecognition?: any;
  webkitSpeechRecognition?: any;
}

interface SpeechRecognitionResultItem {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionResultList {
  [index: number]: {
    [index: number]: SpeechRecognitionResultItem;
    isFinal: boolean;
  };
  length: number;
}

interface SpeechRecognitionEvent {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

export const InteractionSpeakingQuiz: React.FC<InteractionSpeakingQuizProps> = ({
  soundEnabled,
  onComplete,
  onCancel,
}) => {
  // Questions pool (shuffled 10 items for a focused round)
  const [roundQuestions, setRoundQuestions] = useState<InteractionItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Recognition & Evaluation states
  const [status, setStatus] = useState<QuizStatus>('idle');
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [evaluationResult, setEvaluationResult] = useState<InteractionEvaluationResult | null>(null);
  const [hasSpeechSupport, setHasSpeechSupport] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Audio playing indicator
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Stats
  const [correctCount, setCorrectCount] = useState(0);
  const [streak, setStreak] = useState(0);

  // Optional minimal drawers
  const [showHints, setShowHints] = useState(false);
  const [showKeyboardInput, setShowKeyboardInput] = useState(false);
  const [keyboardText, setKeyboardText] = useState('');

  // Answer history for final summary
  const [answerLog, setAnswerLog] = useState<{
    interaction: InteractionItem;
    spokenTranscript: string;
    isCorrect: boolean;
    explanation: string;
  }[]>([]);

  // References
  const recognitionRef = useRef<any>(null);
  const startTimeRef = useRef<number>(Date.now());
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize round questions
  const startNewRound = useCallback(() => {
    const shuffled = [...INTERACTION_DATA].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.min(10, shuffled.length));

    setRoundQuestions(selected);
    setCurrentIndex(0);
    setCorrectCount(0);
    setStreak(0);
    setAnswerLog([]);
    setStatus('idle');
    setTranscript('');
    setInterimTranscript('');
    setEvaluationResult(null);
    setErrorMessage(null);
    setShowHints(false);
    setShowKeyboardInput(false);
    setKeyboardText('');
    startTimeRef.current = Date.now();
  }, []);

  useEffect(() => {
    startNewRound();
  }, [startNewRound]);

  const currentItem: InteractionItem | undefined = roundQuestions[currentIndex];

  // Play audio for current question
  const playQuestionAudio = useCallback(() => {
    if (!currentItem) return;
    setIsPlayingAudio(true);
    speakJapaneseSentence(currentItem.audioPrompt || currentItem.questionHiragana, 0.9, () => {
      setIsPlayingAudio(false);
    });
  }, [currentItem]);

  // Autoplay audio on question load if sound is enabled
  useEffect(() => {
    if (currentItem && soundEnabled && status === 'idle') {
      const timer = setTimeout(() => {
        playQuestionAudio();
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, currentItem, soundEnabled, playQuestionAudio, status]);

  // Process and evaluate spoken response
  const handleProcessResponse = useCallback((spoken: string) => {
    if (!currentItem) return;
    setStatus('evaluating');
    const result = evaluateInteractionResponse(spoken, currentItem);
    setEvaluationResult(result);

    if (result.isValid) {
      setStatus('success');
      setCorrectCount(prev => prev + 1);
      setStreak(prev => prev + 1);
      if (soundEnabled) playSuccessChime();

      setAnswerLog(prev => [
        ...prev,
        {
          interaction: currentItem,
          spokenTranscript: spoken,
          isCorrect: true,
          explanation: result.feedbackExplanation,
        },
      ]);
    } else {
      setStatus('retry');
      setStreak(0);
      if (soundEnabled) playErrorBuzz();

      setAnswerLog(prev => [
        ...prev,
        {
          interaction: currentItem,
          spokenTranscript: spoken,
          isCorrect: false,
          explanation: result.feedbackExplanation,
        },
      ]);
    }
  }, [currentItem, soundEnabled]);

  // Initialize Web Speech Recognition
  useEffect(() => {
    const win = window as unknown as IWindowWithSpeech;
    const SpeechRecognition = win.SpeechRecognition || win.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setHasSpeechSupport(false);
      setStatus('unsupported');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'ja-JP';
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.maxAlternatives = 3;

      recognition.onstart = () => {
        setStatus('listening');
        setErrorMessage(null);
        setInterimTranscript('');
      };

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let interim = '';
        let final = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const res = event.results[i];
          if (res.isFinal) {
            final += res[0].transcript;
          } else {
            interim += res[0].transcript;
          }
        }

        if (interim) {
          setInterimTranscript(interim);
        }

        if (final) {
          setTranscript(final);
          setInterimTranscript('');
          handleProcessResponse(final);
        }
      };

      recognition.onerror = (event: { error: string }) => {
        if (event.error === 'not-allowed') {
          setErrorMessage('Microphone access denied. You can use keyboard input below.');
          setStatus('unsupported');
        } else if (event.error === 'no-speech') {
          setStatus('retry');
        } else {
          setErrorMessage(`Speech recognition error: ${event.error}`);
          setStatus('retry');
        }
      };

      recognition.onend = () => {
        setStatus(prev => (prev === 'listening' ? 'retry' : prev));
      };

      recognitionRef.current = recognition;
    } catch {
      setHasSpeechSupport(false);
      setStatus('unsupported');
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // ignore
        }
      }
    };
  }, [handleProcessResponse]);

  // Mic controls
  const handleStartListening = () => {
    if (!hasSpeechSupport || !recognitionRef.current) {
      setShowKeyboardInput(true);
      return;
    }

    try {
      setErrorMessage(null);
      setTranscript('');
      setInterimTranscript('');
      setEvaluationResult(null);
      recognitionRef.current.start();
    } catch {
      try {
        recognitionRef.current.stop();
        setTimeout(() => {
          recognitionRef.current.start();
        }, 150);
      } catch {
        // ignore
      }
    }
  };

  const handleStopListening = () => {
    if (recognitionRef.current && status === 'listening') {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
    }
  };

  // Keyboard input evaluation
  const handleKeyboardSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!keyboardText.trim()) return;

    setTranscript(keyboardText.trim());
    handleProcessResponse(keyboardText.trim());
    setKeyboardText('');
  };

  // Advance to next question or complete quiz
  const handleNextQuestion = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    if (currentIndex + 1 < roundQuestions.length) {
      setCurrentIndex(prev => prev + 1);
      setStatus('idle');
      setTranscript('');
      setInterimTranscript('');
      setEvaluationResult(null);
      setErrorMessage(null);
      setShowHints(false);
    } else {
      const finalCorrect = correctCount + (status === 'success' ? 0 : 0);
      const total = roundQuestions.length;
      const percentage = Math.round((finalCorrect / total) * 100);
      const timeSpentSeconds = Math.max(5, Math.round((Date.now() - startTimeRef.current) / 1000));

      const quizResult: QuizResult = {
        id: `interaction_${Date.now()}`,
        userId: 'guest',
        exerciseType: 'interaction-speaking',
        score: finalCorrect,
        totalQuestions: total,
        percentage,
        timeSpentSeconds,
        createdAt: new Date().toISOString(),
        items: answerLog.map(log => ({
          kana: log.interaction.questionHiragana,
          romaji: log.interaction.situationContext,
          selected: log.spokenTranscript || '(no response)',
          correct: log.interaction.sampleGoodReplies[0]?.hiragana || '',
          isCorrect: log.isCorrect,
        })),
      };

      onComplete(quizResult);
    }
  };

  if (!currentItem) {
    return (
      <div className="flex-1 flex items-center justify-center p-6 text-center">
        <div className="p-8 bg-white rounded-2xl border border-[#CBD5E1] shadow-xs max-w-sm">
          <p className="font-extrabold text-[#1F2329] mb-4">Loading interactions...</p>
          <button
            type="button"
            onClick={startNewRound}
            className="px-5 py-2.5 rounded-xl bg-[#1A73E8] text-white font-bold cursor-pointer"
          >
            Start Round
          </button>
        </div>
      </div>
    );
  }

  const progressPercent = Math.round(((currentIndex + 1) / roundQuestions.length) * 100);

  return (
    <div className="flex-1 flex flex-col h-full max-h-full overflow-hidden bg-[#F8FAFF] select-none">
      
      {/* 1. CLEAN TOP HEADER */}
      <div className="bg-white border-b border-[#E2E8F0] px-4 py-2.5 shrink-0 shadow-2xs">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-3">
          
          {/* Left: Exercise 7 Label */}
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-xs font-black px-2 py-0.5 rounded-md bg-[#1F2329] text-white">
              [7]
            </span>
            <span className="text-sm font-extrabold text-[#1F2329] tracking-tight">
              Exercise 7: Interactions
            </span>
          </div>

          {/* Right: Counter, Streak & Exit */}
          <div className="flex items-center gap-3">
            {streak > 1 && (
              <div className="flex items-center gap-1 text-xs font-black text-amber-600 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200">
                <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>{streak}</span>
              </div>
            )}

            <span className="font-mono text-xs font-bold text-[#5F6368]">
              {currentIndex + 1} / {roundQuestions.length}
            </span>

            <button
              type="button"
              onClick={onCancel}
              className="text-xs font-bold text-[#5F6368] hover:text-[#1F2329] p-1 rounded-md hover:bg-[#F1F5F9] transition-all cursor-pointer"
              title="Exit to dashboard"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Thin Progress Bar */}
        <div className="max-w-2xl mx-auto w-full bg-[#E2E8F0] h-1.5 rounded-full mt-2 overflow-hidden">
          <div 
            className="bg-[#1A73E8] h-full transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* 2. MAIN INTERACTIVE CARD (Compact, centered, zero clutter) */}
      <div className="flex-1 min-h-0 flex flex-col items-center justify-center p-3 sm:p-5 max-w-2xl mx-auto w-full">
        <div className="w-full bg-white border-2 border-[#CBD5E1] rounded-3xl shadow-[0_4px_16px_rgba(0,0,0,0.05)] p-4 sm:p-6 flex flex-col justify-between gap-4">
          
          {/* A. SINGLE SHORT CONTEXT PROMPT (Clean, direct, uncluttered) */}
          <div className="text-center py-2 px-3 bg-[#F8FAFF] rounded-xl border border-[#E2E8F0]">
            <p className="text-sm sm:text-base font-semibold text-[#334155]">
              {currentItem.situationContext}
            </p>
          </div>

          {/* B. SCENE ILLUSTRATION (Nicely sized, centered) */}
          <div className="flex items-center justify-center h-36 sm:h-44 bg-[#F8FAFF] rounded-2xl border border-[#E2E8F0] p-2 overflow-hidden shadow-inner">
            <SituationIllustration 
              id={currentItem.illustrationId} 
              className="w-full h-full max-h-40 object-contain"
            />
          </div>

          {/* C. QUESTION IN PURE HIRAGANA ONLY + AUDIO BUTTON */}
          <div className="text-center py-2">
            <div className="p-3 sm:p-4 rounded-2xl bg-[#F0F7FF] border-2 border-[#BFDBFE] inline-block w-full shadow-2xs">
              <p className="font-['Noto_Sans_JP',_sans-serif] text-2xl sm:text-3xl font-black text-[#1F2329] tracking-wider leading-snug">
                {currentItem.questionHiragana}
              </p>
            </div>

            {/* Listen Button */}
            <div className="mt-2.5 flex items-center justify-center">
              <button
                type="button"
                onClick={playQuestionAudio}
                disabled={isPlayingAudio}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isPlayingAudio
                    ? 'bg-[#1A73E8] text-white shadow-xs animate-pulse'
                    : 'bg-white text-[#1A73E8] border border-[#CBD5E1] hover:border-[#1A73E8] hover:bg-[#F8FAFF]'
                }`}
              >
                <Volume2 className="w-4 h-4" />
                <span>{isPlayingAudio ? 'Playing audio...' : 'Listen'}</span>
              </button>
            </div>
          </div>

          {/* D. FEEDBACK / STATUS DISPLAY */}
          {/* SUCCESS STATE */}
          {status === 'success' && evaluationResult && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 border-2 border-emerald-300 flex items-center justify-between gap-3 animate-in fade-in-50">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-black text-emerald-900 leading-tight">
                    {evaluationResult.headline}
                  </p>
                  <p className="text-xs text-emerald-800 truncate mt-0.5">
                    {evaluationResult.feedbackExplanation}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleNextQuestion}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm shadow-md inline-flex items-center gap-1.5 transition-all shrink-0 cursor-pointer"
              >
                <span>{currentIndex + 1 >= roundQuestions.length ? 'Results' : 'Next'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* RETRY STATE */}
          {status === 'retry' && evaluationResult && (
            <div className="p-3 rounded-2xl bg-amber-50 border-2 border-amber-300 flex flex-col gap-2 animate-in fade-in-50">
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <AlertCircle className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="text-xs sm:text-sm font-bold text-amber-900">
                    {evaluationResult.feedbackExplanation}
                  </p>
                  {transcript && (
                    <p className="text-xs text-amber-800 mt-1">
                      Heard: <span className="font-bold font-sans">&ldquo;{transcript}&rdquo;</span>
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-1 border-t border-amber-200">
                <button
                  type="button"
                  onClick={() => setShowHints(prev => !prev)}
                  className="text-xs font-bold text-amber-900 hover:underline px-2 py-1 cursor-pointer"
                >
                  {showHints ? 'Hide sample replies' : 'Need a hint?'}
                </button>
                <button
                  type="button"
                  onClick={handleStartListening}
                  className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Try Again</span>
                </button>
              </div>
            </div>
          )}

          {/* LISTENING STATUS */}
          {status === 'listening' && (
            <div className="p-3 rounded-2xl bg-blue-50 border-2 border-blue-300 text-center animate-pulse">
              <div className="flex items-center justify-center gap-2 text-[#1A73E8] font-bold text-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                <span>Listening... Speak your reply</span>
              </div>
              {interimTranscript && (
                <p className="text-sm font-bold text-[#1F2329] font-sans mt-1">
                  &ldquo;{interimTranscript}&rdquo;
                </p>
              )}
            </div>
          )}

          {/* SAMPLE REPLIES (Shown only when toggled) */}
          {showHints && (
            <div className="p-3 rounded-2xl bg-[#F8FAFF] border border-[#CBD5E1] text-xs">
              <span className="font-bold text-[#1F2329] block mb-1.5">
                Possible replies:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {currentItem.sampleGoodReplies.map((sample, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-1 rounded-lg bg-white border border-[#E2E8F0] font-bold text-[#1A73E8] font-sans text-xs"
                  >
                    {sample.hiragana}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* E. MICROPHONE ACTION BUTTON */}
          {status !== 'success' && (
            <div className="flex items-center justify-center pt-1">
              <button
                type="button"
                onClick={status === 'listening' ? handleStopListening : handleStartListening}
                disabled={status === 'evaluating'}
                aria-label="Speak Japanese reply"
                className={`px-6 py-3.5 rounded-2xl font-black text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all shadow-md cursor-pointer ${
                  status === 'listening'
                    ? 'bg-rose-600 text-white ring-4 ring-rose-200 scale-102 animate-pulse'
                    : 'bg-[#1A73E8] text-white hover:bg-[#1557B0] hover:scale-102 active:scale-98'
                }`}
              >
                {status === 'listening' ? (
                  <>
                    <MicOff className="w-5 h-5" />
                    <span>Stop Speaking</span>
                  </>
                ) : (
                  <>
                    <Mic className="w-5 h-5" />
                    <span>Tap to Speak</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* F. DISCREET KEYBOARD INPUT TOGGLE (At the very bottom, minimal) */}
          <div className="text-center pt-1">
            <button
              type="button"
              onClick={() => setShowKeyboardInput(prev => !prev)}
              className="text-[11px] font-semibold text-[#64748B] hover:text-[#1F2329] inline-flex items-center gap-1 cursor-pointer"
            >
              <Keyboard className="w-3.5 h-3.5" />
              <span>{showKeyboardInput ? 'Hide keyboard input' : 'Type reply (no mic)'}</span>
            </button>

            {showKeyboardInput && (
              <form onSubmit={handleKeyboardSubmit} className="mt-2 flex items-center gap-2">
                <input
                  type="text"
                  value={keyboardText}
                  onChange={(e) => setKeyboardText(e.target.value)}
                  placeholder="Type in Japanese (e.g. はい、かいしゃいんです)"
                  className="flex-1 px-3 py-1.5 rounded-xl border border-[#CBD5E1] bg-white text-xs text-[#1F2329] focus:outline-none focus:ring-2 focus:ring-[#1A73E8]"
                />
                <button
                  type="submit"
                  disabled={!keyboardText.trim()}
                  className="px-3 py-1.5 rounded-xl bg-[#1A73E8] text-white font-bold text-xs hover:bg-[#1557B0] disabled:opacity-50 cursor-pointer"
                >
                  Submit
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
