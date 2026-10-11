import React, { useState, useEffect, useRef, useCallback } from "react";
import { QuizResult } from "../types";
import { PHRASE_DATA, PhraseItem } from "../data/phraseData";
import { SituationIllustration } from "./SituationIllustration";
import { checkSpeechMatch } from "../utils/japaneseSpeech";
import { playSuccessChime, playErrorBuzz } from "../utils/audio";
import {
  Mic,
  MicOff,
  Volume2,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Info,
  Flame,
  Award,
  Square,
} from "lucide-react";

interface PhraseSpeakingQuizProps {
  soundEnabled: boolean;
  onComplete: (result: QuizResult) => void;
  onCancel: () => void;
}

type SpeechStatus =
  | "idle"
  | "listening"
  | "evaluating"
  | "success"
  | "retry"
  | "unsupported";

// Type definition for Web Speech API
interface SpeechRecognitionEvent {
  resultIndex: number;
  results: {
    length: number;
    [index: number]: {
      [index: number]: {
        transcript: string;
        confidence: number;
      };
      isFinal: boolean;
    };
  };
}

interface IWindowWithSpeech extends Window {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  SpeechRecognition?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  webkitSpeechRecognition?: any;
}

export const PhraseSpeakingQuiz: React.FC<PhraseSpeakingQuizProps> = ({
  soundEnabled,
  onComplete,
  onCancel,
}) => {
  // Category filter
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Quiz queue
  const [roundPhrases, setRoundPhrases] = useState<PhraseItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Results tracker
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [answerLog, setAnswerLog] = useState<
    {
      phrase: PhraseItem;
      spokenTranscript: string;
      isCorrect: boolean;
    }[]
  >([]);

  // Speech recognition states
  const [status, setStatus] = useState<SpeechStatus>("idle");
  const [transcript, setTranscript] = useState<string>("");
  const [interimTranscript, setInterimTranscript] = useState<string>("");
  const [matchConfidence, setMatchConfidence] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [hasSpeechSupport, setHasSpeechSupport] = useState<boolean>(true);
  const [isNativeSpeaking, setIsNativeSpeaking] = useState<boolean>(false);
  const [recordingSecondsLeft, setRecordingSecondsLeft] = useState<number>(10);
  const [micIframeRestricted, setMicIframeRestricted] =
    useState<boolean>(false);
  const [testCustomInput, setTestCustomInput] = useState<string>("");

  // References
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);
  const startTimeRef = useRef<number>(Date.now());
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const recordingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isListeningRef = useRef<boolean>(false);
  const lastRecordedTranscriptRef = useRef<string>("");

  // Clear 10s max recording timer & countdown
  const clearRecordingTimer = useCallback(() => {
    if (recordingTimeoutRef.current) {
      clearTimeout(recordingTimeoutRef.current);
      recordingTimeoutRef.current = null;
    }
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
  }, []);

  // Stop speech recognition
  const stopListening = useCallback(() => {
    clearRecordingTimer();
    isListeningRef.current = false;
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
    }
  }, [clearRecordingTimer]);

  // Initialize round questions
  const startNewRound = useCallback(
    (category = selectedCategory) => {
      let pool = PHRASE_DATA;
      if (category !== "all") {
        pool = PHRASE_DATA.filter((p) => p.category === category);
      }
      const shuffled = [...pool].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, Math.min(10, shuffled.length));

      setRoundPhrases(selected);
      setCurrentIndex(0);
      setCorrectCount(0);
      setStreak(0);
      setAnswerLog([]);
      setStatus("idle");
      setTranscript("");
      setInterimTranscript("");
      setMatchConfidence(0);
      setErrorMessage(null);
      startTimeRef.current = Date.now();
    },
    [selectedCategory],
  );

  useEffect(() => {
    startNewRound();
  }, [startNewRound]);

  const currentPhrase: PhraseItem | undefined = roundPhrases[currentIndex];

  // Check Web Speech API availability
  useEffect(() => {
    const win = window as unknown as IWindowWithSpeech;
    const SpeechAPI = win.SpeechRecognition || win.webkitSpeechRecognition;
    if (!SpeechAPI) {
      setHasSpeechSupport(false);
      setStatus("unsupported");
    }
  }, []);

  // Cleanup timers & recognition on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (recordingTimeoutRef.current)
        clearTimeout(recordingTimeoutRef.current);
      if (countdownIntervalRef.current)
        clearInterval(countdownIntervalRef.current);
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // ignore
        }
      }
    };
  }, []);

  // Pronounce Japanese phrase via SpeechSynthesis
  const handlePlayAudio = useCallback((kanaPhrase: string) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    try {
      window.speechSynthesis.cancel();
      setIsNativeSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(kanaPhrase);
      utterance.lang = "ja-JP";
      utterance.rate = 0.9;
      utterance.pitch = 1.0;

      const voices = window.speechSynthesis.getVoices();
      const jaVoice = voices.find(
        (v) => v.lang.startsWith("ja") || v.lang.includes("JP"),
      );
      if (jaVoice) {
        utterance.voice = jaVoice;
      }

      utterance.onend = () => {
        setIsNativeSpeaking(false);
      };
      utterance.onerror = () => {
        setIsNativeSpeaking(false);
      };

      window.speechSynthesis.speak(utterance);
    } catch {
      setIsNativeSpeaking(false);
    }
  }, []);

  // Evaluate recognized text against current target phrase (>= 60% similarity match)
  const evaluateSpokenResult = useCallback(
    (spoken: string) => {
      if (!currentPhrase) return;

      const evaluation = checkSpeechMatch(spoken, currentPhrase);
      setMatchConfidence(evaluation.similarity);

      if (evaluation.isMatch) {
        clearRecordingTimer();
        isListeningRef.current = false;
        if (recognitionRef.current) {
          try {
            recognitionRef.current.stop();
          } catch {
            // ignore
          }
        }

        if (soundEnabled) playSuccessChime();
        setStatus("success");
        setCorrectCount((prev) => prev + 1);
        setStreak((prev) => prev + 1);

        setAnswerLog((prev) => [
          ...prev,
          {
            phrase: currentPhrase,
            spokenTranscript: spoken,
            isCorrect: true,
          },
        ]);
      } else {
        if (soundEnabled) playErrorBuzz();
        setStatus("retry");
        setStreak(0);
        setErrorMessage(
          `Similarity: ${Math.round(evaluation.similarity * 100)}% (Requires ≥ 60%). Heard: "${spoken}". Try speaking again!`,
        );
      }
    },
    [currentPhrase, soundEnabled, clearRecordingTimer],
  );

  // Stop listening and finalize recording
  const handleStopListening = useCallback(() => {
    clearRecordingTimer();
    isListeningRef.current = false;

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
    }

    const candidate = lastRecordedTranscriptRef.current;
    if (candidate) {
      setTranscript(candidate);
      setInterimTranscript("");
      evaluateSpokenResult(candidate);
    } else {
      // 10s recording completed without transcription (e.g. iframe mic restriction or silence)
      setStatus("evaluating");
    }
  }, [clearRecordingTimer, evaluateSpokenResult]);

  // Request mic permission and start 10s speech recording session
  const startListening = () => {
    if (!currentPhrase) return;

    // Reset previous timers
    clearRecordingTimer();
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch {
        // ignore
      }
    }

    // Immediately activate recording state in the UI
    setStatus("listening");
    isListeningRef.current = true;
    lastRecordedTranscriptRef.current = "";
    setTranscript("");
    setInterimTranscript("");
    setErrorMessage(null);
    setRecordingSecondsLeft(10);

    // 1-second countdown interval
    countdownIntervalRef.current = setInterval(() => {
      setRecordingSecondsLeft((prev) => {
        if (prev <= 1) return 0;
        return prev - 1;
      });
    }, 1000);

    // 10 second maximum recording timer
    recordingTimeoutRef.current = setTimeout(() => {
      handleStopListening();
    }, 10000);

    // Non-blocking microphone stream check
    if (navigator?.mediaDevices?.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          stream.getTracks().forEach((track) => track.stop());
          setMicIframeRestricted(false);
        })
        .catch((mediaErr) => {
          console.warn(
            "Microphone permission notice (iframe restriction):",
            mediaErr,
          );
          setMicIframeRestricted(true);
        });
    }

    // Non-blocking speech recognition startup
    const win = window as unknown as IWindowWithSpeech;
    const SpeechAPI = win.SpeechRecognition || win.webkitSpeechRecognition;

    if (SpeechAPI) {
      try {
        const recognition = new SpeechAPI();
        recognition.lang = "ja-JP";
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.maxAlternatives = 3;

        recognition.onresult = (event: SpeechRecognitionEvent) => {
          let interim = "";
          let final = "";

          for (let i = 0; i < event.results.length; ++i) {
            const item = event.results[i];
            if (item.isFinal) {
              final += item[0].transcript;
            } else {
              interim += item[0].transcript;
            }
          }

          if (interim) {
            setInterimTranscript(interim);
          }

          const candidate = final || interim;
          if (candidate) {
            lastRecordedTranscriptRef.current = candidate;
          }

          if (final) {
            setTranscript(final);
            setInterimTranscript("");
            evaluateSpokenResult(final);
          }
        };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        recognition.onerror = (event: any) => {
          console.warn("Speech recognition notice:", event.error);
          if (
            event.error === "not-allowed" ||
            event.error === "service-not-allowed"
          ) {
            setMicIframeRestricted(true);
            // DO NOT cancel the UI recording session! The 10s practice session stays active!
          }
        };

        recognitionRef.current = recognition;
        recognition.start();
      } catch (err) {
        console.warn("Speech recognition start notice:", err);
        setMicIframeRestricted(true);
      }
    } else {
      setMicIframeRestricted(true);
    }
  };

  // Toggle listening when tapping the speak/record button
  const handleToggleListening = () => {
    if (status === "listening" || isListeningRef.current) {
      handleStopListening();
    } else {
      startListening();
    }
  };

  // Self-check fallback for users without mic or for manual confirmation
  const handleMarkSelfCheck = (wasCorrect: boolean) => {
    if (!currentPhrase) return;

    if (wasCorrect) {
      if (soundEnabled) playSuccessChime();
      setStatus("success");
      setCorrectCount((prev) => prev + 1);
      setStreak((prev) => prev + 1);
      setTranscript(currentPhrase.hiragana);
      setAnswerLog((prev) => [
        ...prev,
        {
          phrase: currentPhrase,
          spokenTranscript: currentPhrase.hiragana,
          isCorrect: true,
        },
      ]);
    } else {
      if (soundEnabled) playErrorBuzz();
      setStatus("retry");
      setStreak(0);
    }
  };

  // Advance to next question or complete quiz
  const handleNextQuestion = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    stopListening();

    const nextIndex = currentIndex + 1;
    if (nextIndex < roundPhrases.length) {
      setCurrentIndex(nextIndex);
      setStatus("idle");
      setTranscript("");
      setInterimTranscript("");
      setMatchConfidence(0);
      setErrorMessage(null);
    } else {
      // Quiz complete!
      const totalQuestions = roundPhrases.length;
      const finalScore =
        correctCount +
        (status === "success" &&
        !answerLog.some((a) => a.phrase.id === currentPhrase?.id)
          ? 1
          : 0);
      const percentage = Math.round((finalScore / totalQuestions) * 100);
      const elapsedSeconds = Math.max(
        1,
        Math.round((Date.now() - startTimeRef.current) / 1000),
      );

      const quizResult: QuizResult = {
        id: `speaking_${Date.now()}`,
        userId: "",
        exerciseType: "phrase-speaking",
        score: finalScore,
        totalQuestions,
        percentage,
        timeSpentSeconds: elapsedSeconds,
        createdAt: new Date().toISOString(),
        items: roundPhrases.map((p) => {
          const logEntry = answerLog.find((a) => a.phrase.id === p.id);
          return {
            kana: p.hiragana,
            romaji: p.romaji,
            selected: logEntry ? logEntry.spokenTranscript : "Skipped",
            correct: p.hiragana,
            isCorrect: logEntry ? logEntry.isCorrect : false,
          };
        }),
      };

      onComplete(quizResult);
    }
  };

  if (!currentPhrase) {
    return (
      <div className="flex-1 flex items-center justify-center p-6 text-center">
        <div className="p-8 bg-white rounded-2xl border-2 border-[#CBD5E1] shadow-xs max-w-md">
          <p className="font-extrabold text-[#1F2329] mb-4">
            No phrases available for this category.
          </p>
          <button
            type="button"
            onClick={() => startNewRound("all")}
            className="px-5 py-2.5 rounded-xl bg-[#1A73E8] text-white font-bold cursor-pointer hover:bg-[#1557B0]"
          >
            Reset to All Phrases
          </button>
        </div>
      </div>
    );
  }

  const progressPercent = Math.round(
    ((currentIndex + 1) / roundPhrases.length) * 100,
  );

  return (
    <div className="flex-1 flex flex-col h-full max-h-full overflow-hidden bg-[#F8FAFF] select-none">
      {/* TOP HEADER: Breadcrumb, Round Tracker & Category Switcher */}
      <div className="bg-white border-b border-[#E2E8F0] px-3 sm:px-6 py-2.5 shrink-0 shadow-2xs">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
          {/* Left: Exercise Indicator & Round Counter */}
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-xs font-black px-2.5 py-1 rounded-lg bg-[#1F2329] text-white">
              [6]
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-black text-[#1F2329] tracking-tight">
                  Exercise 6: Phrases (会話・フレーズ)
                </span>
                <span className="text-[11px] font-bold text-[#1A73E8] bg-[#E8F0FE] px-2 py-0.5 rounded-md border border-[#BFDBFE] hidden md:inline">
                  Voice Speaking
                </span>
              </div>
              <p className="text-[11px] text-[#5F6368] font-medium hidden sm:block">
                Phrase {currentIndex + 1} of {roundPhrases.length} &bull; Look
                at picture & speak the Hiragana correctly
              </p>
            </div>
          </div>

          {/* Right: Streak & Category Pills */}
          <div className="flex items-center gap-2">
            {streak > 1 && (
              <div className="flex items-center gap-1 text-xs font-black text-amber-600 bg-amber-50 px-2.5 py-1 rounded-xl border border-amber-200 animate-pulse">
                <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span>{streak} Streak!</span>
              </div>
            )}

            {/* Category Filter Selector */}
            <select
              value={selectedCategory}
              onChange={(e) => {
                const newCat = e.target.value;
                setSelectedCategory(newCat);
                startNewRound(newCat);
              }}
              aria-label="Filter phrases by category"
              className="text-xs font-bold bg-[#F8FAFF] border border-[#CBD5E1] text-[#1F2329] rounded-xl px-2.5 py-1.5 focus:border-[#1A73E8] focus:outline-hidden cursor-pointer"
            >
              <option value="all">All Topics (26)</option>
              <option value="greetings">Everyday Greetings (8)</option>
              <option value="introduction">Self Introduction (6)</option>
              <option value="occupation-conversation">
                Occupations Dialogues (6)
              </option>
              <option value="occupations">Occupations Vocab (6)</option>
            </select>

            <button
              type="button"
              onClick={onCancel}
              className="text-xs font-bold text-[#5F6368] hover:text-[#1F2329] px-2.5 py-1 rounded-lg border border-[#CBD5E1] hover:bg-[#F8FAFF] cursor-pointer"
            >
              Exit
            </button>
          </div>
        </div>

        {/* Thin Progress Bar */}
        <div className="max-w-4xl mx-auto w-full bg-[#E2E8F0] h-1.5 rounded-full mt-2 overflow-hidden">
          <div
            className="bg-[#1A73E8] h-full transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* MAIN EXERCISE BODY (Viewport constrained, zero scroll, maximum visibility) */}
      <div className="flex-1 min-h-0 flex flex-col items-center justify-between p-3 sm:p-5 max-w-4xl mx-auto w-full gap-3">
        {/* CENTER MAIN CARD: Picture + HIRAGANA ONLY */}
        <div className="w-full flex-1 min-h-0 bg-white border-2 border-[#CBD5E1] rounded-2xl sm:rounded-3xl shadow-[0_4px_16px_rgba(0,0,0,0.05)] flex flex-col overflow-hidden">
          {/* Situation Context Banner */}
          <div className="px-4 py-2 border-b border-[#E2E8F0] bg-[#F8FAFF] flex items-center justify-between text-xs font-bold text-[#5F6368]">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-white border border-[#CBD5E1] text-[#1A73E8] font-bold text-[11px]">
                {currentPhrase.categoryLabel}
              </span>
              <span className="text-[#1F2329] font-extrabold truncate max-w-xs sm:max-w-md">
                {currentPhrase.situationTitle}
              </span>
            </div>
            <span className="text-[#5F6368] font-medium hidden sm:inline">
              Situation Cue
            </span>
          </div>

          {/* Card Center: Split View (Situation Illustration on Top/Left, Pure Hiragana on Bottom/Right) */}
          <div className="flex-1 min-h-0 p-3 sm:p-5 flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-6">
            {/* 1. Picture of the Situation */}
            <div className="w-full md:w-1/2 flex flex-col items-center justify-center h-40 sm:h-52 md:h-full max-h-60 bg-[#F8FAFF] rounded-2xl border border-[#E2E8F0] p-2 relative group">
              <SituationIllustration
                id={currentPhrase.illustrationId}
                className="w-full h-full max-h-48 object-contain"
              />
              <div className="absolute bottom-2 left-2 right-2 text-center bg-white/90 backdrop-blur-xs py-1 px-2 rounded-lg border border-[#E2E8F0] text-[11px] font-bold text-[#5F6368]">
                {currentPhrase.english}
              </div>
            </div>

            {/* 2. THE HIRAGANA CHARACTERS ONLY (STRICTLY NO ROMAJI!) */}
            <div className="w-full md:w-1/2 flex flex-col items-center justify-center text-center px-2 py-3">
              <span className="text-[11px] uppercase tracking-wider font-extrabold text-[#5F6368] mb-1">
                Say this phrase aloud in Japanese:
              </span>

              {/* Giant Pure Hiragana Typography */}
              <div className="py-2 sm:py-4 px-3 sm:px-4 rounded-2xl bg-[#F0F7FF] border-2 border-[#BFDBFE] w-full max-w-md shadow-2xs">
                <span className="font-['Noto_Sans_JP',_sans-serif] text-2xl sm:text-3xl lg:text-4xl font-black text-[#1F2329] tracking-wide leading-relaxed break-words">
                  {currentPhrase.hiragana}
                </span>
              </div>

              {/* Native Voice Audio Button (TTS) */}
              <div className="mt-3 flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => handlePlayAudio(currentPhrase.hiragana)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    isNativeSpeaking
                      ? "bg-[#1A73E8] text-white border-[#1A73E8] scale-105"
                      : "bg-white text-[#1A73E8] border-[#CBD5E1] hover:border-[#1A73E8] hover:bg-[#F8FAFF]"
                  }`}
                  title="Listen to native Japanese pronunciation"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>
                    {isNativeSpeaking ? "Speaking..." : "Listen Native Audio"}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Live Speech Feedback & Transcript Banner */}
          <div className="p-3 border-t border-[#E2E8F0] bg-white flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              {status === "success" ? (
                <div className="flex items-center gap-1.5 text-emerald-700 font-extrabold bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    正解！ Excellent Pronunciation! (
                    {Math.round(matchConfidence * 100)}% similarity)
                  </span>
                </div>
              ) : status === "listening" ? (
                <div className="flex items-center gap-2 text-[#1A73E8] font-bold bg-[#E8F0FE] px-3 py-1.5 rounded-xl border border-[#BFDBFE]">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping shrink-0" />
                  <span>
                    Recording Japanese phrase... ({recordingSecondsLeft}s
                    remaining)
                  </span>
                </div>
              ) : status === "evaluating" ? (
                <div className="w-full flex flex-col gap-2 p-2.5 bg-blue-50/80 border border-blue-200 rounded-xl">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-blue-900 text-xs">
                      Recording finished (10s session)
                    </span>
                    <span className="text-[11px] text-blue-700 font-bold">
                      Pass threshold: ≥ 60% similarity
                    </span>
                  </div>
                  {micIframeRestricted && (
                    <div className="text-[11px] text-amber-900 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                      Browser iframe policy blocks microphone hardware prompt.
                      Compare pronunciation below:
                    </div>
                  )}
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        evaluateSpokenResult(currentPhrase.hiragana)
                      }
                      className="px-3 py-1.5 bg-[#1A73E8] hover:bg-[#1557B0] text-white rounded-lg font-bold text-xs cursor-pointer shadow-2xs"
                    >
                      Test Ideal Pronunciation: 『{currentPhrase.hiragana}』
                      (100% Match)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMarkSelfCheck(true)}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs cursor-pointer shadow-2xs"
                    >
                      I Spoke It Correctly (Self-Check)
                    </button>
                  </div>
                  <div className="flex items-center gap-2 pt-0.5">
                    <input
                      type="text"
                      value={testCustomInput}
                      onChange={(e) => setTestCustomInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && testCustomInput.trim()) {
                          evaluateSpokenResult(testCustomInput.trim());
                          setTestCustomInput("");
                        }
                      }}
                      placeholder={`Test pronunciation (e.g. ${currentPhrase.hiragana})`}
                      className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#1A73E8]"
                    />
                    <button
                      type="button"
                      disabled={!testCustomInput.trim()}
                      onClick={() => {
                        evaluateSpokenResult(testCustomInput.trim());
                        setTestCustomInput("");
                      }}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-lg font-bold text-xs disabled:opacity-50 cursor-pointer"
                    >
                      Check Similarity (≥60%)
                    </button>
                  </div>
                </div>
              ) : status === "unsupported" ? (
                <div className="flex items-center gap-1.5 text-amber-800 font-bold bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200">
                  <XCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>
                    {errorMessage ||
                      "Microphone blocked by iframe policy. Tap to record and test pronunciation."}
                  </span>
                </div>
              ) : status === "retry" ? (
                <div className="flex items-center gap-1.5 text-rose-700 font-bold bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-200">
                  <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>
                    {errorMessage ||
                      "Similarity was under 60%. Try speaking clearly into the mic."}
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-[#5F6368] font-semibold">
                  <Info className="w-4 h-4 text-[#1A73E8]" />
                  <span>Tap the microphone button below to speak</span>
                </div>
              )}
            </div>

            {/* What was heard live */}
            {(transcript || interimTranscript) && (
              <div className="text-right text-xs text-[#5F6368] font-medium bg-[#F8FAFF] px-2.5 py-1 rounded-lg border border-[#E2E8F0] max-w-sm truncate">
                Heard:{" "}
                <strong className="text-[#1F2329] font-bold">
                  {transcript || interimTranscript}
                </strong>
                {matchConfidence > 0 && (
                  <span className="text-[#1A73E8] ml-1">
                    ({Math.round(matchConfidence * 100)}% match)
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* BOTTOM ACTION BAR: Microphone Button, Audio Wave Visualizer, Next CTA */}
        <div className="w-full bg-white border-2 border-[#CBD5E1] rounded-2xl p-3 sm:p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          {/* Left: Quick Practice Instructions / Self-Check Fallback */}
          <div className="flex items-center gap-2 text-xs font-semibold text-[#5F6368]">
            <span className="hidden sm:inline">
              Difficulty: Beginner &bull;
            </span>
            <button
              type="button"
              onClick={() => handleMarkSelfCheck(true)}
              className="text-xs font-bold text-[#1A73E8] hover:underline cursor-pointer bg-[#F8FAFF] px-2.5 py-1.5 rounded-lg border border-[#CBD5E1]"
              title="Click if your microphone is quiet or you want to self-verify"
            >
              I Spoke It Correctly (Self-Check)
            </button>
          </div>

          {/* Center: BIG INTERACTIVE MICROPHONE BUTTON */}
          <div className="flex items-center gap-3">
            {status === "listening" ? (
              <button
                type="button"
                onClick={handleToggleListening}
                className="h-14 sm:h-16 px-6 sm:px-8 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg shadow-rose-200 transition-all cursor-pointer ring-4 ring-rose-200"
                title="Tap to stop recording early"
              >
                {/* Square icon when tapped & recording */}
                <Square className="w-5 h-5 fill-white text-white shrink-0" />
                <span className="animate-recording-flash tracking-wide">
                  Recording...
                </span>
                <span className="text-xs bg-rose-800/70 px-2.5 py-1 rounded-full font-mono text-rose-100 font-bold">
                  {recordingSecondsLeft}s
                </span>
              </button>
            ) : status === "success" ? (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleToggleListening}
                  className="h-12 px-4 rounded-xl border-2 border-emerald-500 text-emerald-700 bg-emerald-50 font-bold text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer hover:bg-emerald-100"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Speak Again</span>
                </button>
                <button
                  type="button"
                  onClick={handleNextQuestion}
                  className="h-14 sm:h-16 px-7 sm:px-10 rounded-2xl bg-[#1A73E8] hover:bg-[#1557B0] text-white font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-blue-200 transition-all cursor-pointer scale-105"
                >
                  <span>Next Phrase</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleToggleListening}
                className="h-14 sm:h-16 px-6 sm:px-10 rounded-2xl bg-[#1A73E8] hover:bg-[#1557B0] text-white font-black text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-md shadow-blue-100 hover:scale-102 transition-all cursor-pointer active:scale-98"
              >
                <Mic className="w-5 h-5 sm:w-6 sm:h-6" />
                <span>Tap to Speak</span>
              </button>
            )}
          </div>

          {/* Right: Skip / Next Phrase Button */}
          <div className="flex items-center gap-2">
            {status !== "success" && (
              <button
                type="button"
                onClick={handleNextQuestion}
                className="px-4 py-2 text-xs font-bold text-[#5F6368] hover:text-[#1F2329] bg-[#F8FAFF] hover:bg-[#E2E8F0] rounded-xl border border-[#CBD5E1] transition-colors cursor-pointer flex items-center gap-1"
              >
                <span>Skip</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
