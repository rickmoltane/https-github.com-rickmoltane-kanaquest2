import React, { useState, useEffect, useRef, useCallback } from "react";
import { QuizResult } from "../types";
import { PHRASE_DATA, PhraseItem } from "../data/phraseData";
import { SituationIllustration } from "./SituationIllustration";
import { checkSpeechMatch } from "../utils/japaneseSpeech";
import { playSuccessChime, playErrorBuzz } from "../utils/audio";
import { transcribeAudioBlob } from "../services/speechService";
import {
  Mic,
  Volume2,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  Info,
  Flame,
  Square,
  Loader2,
  ExternalLink,
  ShieldAlert,
} from "lucide-react";
import {
  getOrCreateSessionStream,
  pauseSessionStream,
  resumeSessionStream,
  getSupportedAudioMimeType,
} from "../utils/audioSessionManager";

interface PhraseSpeakingQuizProps {
  soundEnabled: boolean;
  onComplete: (result: QuizResult) => void;
  onCancel: () => void;
}

type SpeechStatus =
  | "idle"
  | "listening"
  | "transcribing"
  | "success"
  | "retry";

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
  const [matchConfidence, setMatchConfidence] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isNativeSpeaking, setIsNativeSpeaking] = useState<boolean>(false);
  const [recordingSecondsLeft, setRecordingSecondsLeft] = useState<number>(10);

  // References
  const startTimeRef = useRef<number>(Date.now());
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const recordingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isListeningRef = useRef<boolean>(false);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Pause audio tracks between questions without revoking browser permission
  const stopMediaTracks = useCallback(() => {
    pauseSessionStream();
    mediaStreamRef.current = null;
  }, []);

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

  // Stop active speech recording session
  const stopListening = useCallback(() => {
    clearRecordingTimer();
    isListeningRef.current = false;
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      try {
        mediaRecorderRef.current.stop();
      } catch {
        // ignore
      }
    }
    pauseSessionStream();
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

  // Cleanup timers & recognition on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (recordingTimeoutRef.current)
        clearTimeout(recordingTimeoutRef.current);
      if (countdownIntervalRef.current)
        clearInterval(countdownIntervalRef.current);
      stopMediaTracks();
    };
  }, [stopMediaTracks]);

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
      setTranscript(spoken);

      if (evaluation.isMatch) {
        clearRecordingTimer();
        isListeningRef.current = false;
        if (soundEnabled) playSuccessChime();
        setStatus("success");
        setCorrectCount((prev) => prev + 1);
        setStreak((prev) => prev + 1);
        setErrorMessage(null);

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
          `不正解 (Incorrect). Heard: "${spoken}". Expected: 『${currentPhrase.hiragana}』. Try speaking again!`,
        );
        setAnswerLog((prev) => [
          ...prev,
          {
            phrase: currentPhrase,
            spokenTranscript: spoken,
            isCorrect: false,
          },
        ]);
      }
    },
    [currentPhrase, soundEnabled],
  );

  // Stop listening and evaluate recording against correct answer via JPTranscribe
  const handleStopListening = useCallback(async () => {
    if (!isListeningRef.current && status !== "listening") return;
    isListeningRef.current = false;
    clearRecordingTimer();

    // Immediately show transcribing state in UI
    setStatus("transcribing");

    let audioBlob: Blob | null = null;
    const recorder = mediaRecorderRef.current;

    if (recorder && recorder.state !== "inactive") {
      audioBlob = await new Promise<Blob | null>((resolve) => {
        let timer: ReturnType<typeof setTimeout> | null = null;
        let resolved = false;

        const finish = () => {
          if (resolved) return;
          resolved = true;
          if (timer) clearTimeout(timer);

          const mime =
            audioChunksRef.current[0]?.type ||
            recorder.mimeType ||
            "audio/webm";

          if (audioChunksRef.current.length > 0) {
            resolve(new Blob(audioChunksRef.current, { type: mime }));
          } else {
            resolve(null);
          }
        };

        recorder.addEventListener("stop", finish, { once: true });
        timer = setTimeout(finish, 1500);

        try {
          if (recorder.state === "recording") {
            try {
              recorder.requestData();
            } catch {
              // ignore
            }
          }
          recorder.stop();
        } catch {
          finish();
        }
      });
    } else if (audioChunksRef.current.length > 0) {
      const mime = audioChunksRef.current[0]?.type || "audio/webm";
      audioBlob = new Blob(audioChunksRef.current, { type: mime });
    }

    pauseSessionStream();

    // If recording produced no audio (microphone muted or 0-length)
    if (!audioBlob || audioBlob.size === 0) {
      if (soundEnabled) playErrorBuzz();
      setStatus("retry");
      setStreak(0);
      setTranscript("");
      setMatchConfidence(0);
      setErrorMessage(
        "不正解 (Incorrect). No speech recorded. Please speak clearly into the microphone and try again.",
      );
      if (currentPhrase) {
        setAnswerLog((prev) => [
          ...prev,
          {
            phrase: currentPhrase,
            spokenTranscript: "",
            isCorrect: false,
          },
        ]);
      }
      return;
    }

    // Send recording to JPTranscribe via API
    try {
      const res = await transcribeAudioBlob(audioBlob, "ja");
      const transcribedText = (res.text || "").trim();

      // IF not recognised: return incorrect
      if (!transcribedText) {
        if (soundEnabled) playErrorBuzz();
        setStatus("retry");
        setStreak(0);
        setTranscript("");
        setMatchConfidence(0);
        setErrorMessage(
          "不正解 (Incorrect). No Japanese speech recognized. Please speak clearly into the microphone and try again.",
        );
        if (currentPhrase) {
          setAnswerLog((prev) => [
            ...prev,
            {
              phrase: currentPhrase,
              spokenTranscript: "",
              isCorrect: false,
            },
          ]);
        }
        return;
      }

      // IF recognised: transcribe to text, compare text to correct answer
      setTranscript(transcribedText);
      evaluateSpokenResult(transcribedText);
    } catch (apiErr) {
      console.warn("JPTranscribe request error:", apiErr);
      if (soundEnabled) playErrorBuzz();
      setStatus("retry");
      setStreak(0);
      setErrorMessage(
        "不正解 (Incorrect). Speech recognition error. Please try speaking again.",
      );
      if (currentPhrase) {
        setAnswerLog((prev) => [
          ...prev,
          {
            phrase: currentPhrase,
            spokenTranscript: "",
            isCorrect: false,
          },
        ]);
      }
    }
  }, [
    clearRecordingTimer,
    soundEnabled,
    currentPhrase,
    evaluateSpokenResult,
    status,
  ]);

  // Start 10s speech recording session
  const startListening = async () => {
    if (!currentPhrase) return;

    clearRecordingTimer();
    audioChunksRef.current = [];
    setTranscript("");
    setErrorMessage(null);
    setRecordingSecondsLeft(10);

    try {
      if (!navigator?.mediaDevices?.getUserMedia) {
        setErrorMessage("Microphone access is not supported in this browser.");
        setStatus("retry");
        return;
      }

      // 1. Get or reuse persistent session stream (asks permission once on first tap)
      resumeSessionStream();
      const stream = await getOrCreateSessionStream();
      mediaStreamRef.current = stream;

      const mimeType = getSupportedAudioMimeType();
      const recorder = new MediaRecorder(
        stream,
        mimeType ? { mimeType } : undefined,
      );
      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorderRef.current = recorder;
      recorder.start(250);

      setStatus("listening");
      isListeningRef.current = true;

      countdownIntervalRef.current = setInterval(() => {
        setRecordingSecondsLeft((prev) => {
          if (prev <= 1) return 0;
          return prev - 1;
        });
      }, 1000);

      recordingTimeoutRef.current = setTimeout(() => {
        handleStopListening();
      }, 10000);
    } catch (err: unknown) {
      console.warn("Microphone access error:", err);
      setStatus("retry");
      const errName =
        err && typeof err === "object" && "name" in err
          ? String((err as { name?: unknown }).name)
          : "";
      const errMsg =
        err && typeof err === "object" && "message" in err
          ? String((err as { message?: unknown }).message)
          : "";

      if (
        errName === "NotAllowedError" ||
        errName === "PermissionDeniedError" ||
        errName === "SecurityError" ||
        errMsg.toLowerCase().includes("permission") ||
        errMsg.toLowerCase().includes("denied") ||
        errMsg.toLowerCase().includes("disallowed")
      ) {
        setErrorMessage(
          "Microphone permission is blocked in browser settings. Please allow microphone in your address bar (lock/camera icon) or tap below to prompt.",
        );
      } else {
        setErrorMessage(
          "Microphone is unavailable. Please check that a microphone is plugged in and try again.",
        );
      }
    }
  };

  // Toggle listening when tapping the speak/record button
  const handleToggleListening = () => {
    if (status === "listening" || isListeningRef.current) {
      handleStopListening();
    } else if (status !== "transcribing") {
      startListening();
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
              [8]
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-black text-[#1F2329] tracking-tight">
                  Exercise 8: Phrases Speaking (会話・フレーズ)
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
              ) : status === "transcribing" ? (
                <div className="flex items-center gap-2 text-indigo-700 font-bold bg-indigo-50 px-3 py-1.5 rounded-xl border border-indigo-200">
                  <Loader2 className="w-4 h-4 text-indigo-600 animate-spin shrink-0" />
                  <span>
                    音声認識中... Transcribing audio with JPTranscribe...
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
              ) : status === "retry" ? (
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 text-rose-700 font-bold bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-200">
                  <div className="flex items-center gap-1.5">
                    {errorMessage?.toLowerCase().includes("permission") ||
                    errorMessage?.toLowerCase().includes("blocked") ? (
                      <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    )}
                    <span>
                      {errorMessage ||
                        "不正解 (Incorrect). Try speaking clearly into the mic."}
                    </span>
                  </div>
                  {(errorMessage?.toLowerCase().includes("permission") ||
                    errorMessage?.toLowerCase().includes("blocked")) && (
                    <a
                      href={window.location.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-extrabold text-[#1A73E8] bg-white border border-[#BFDBFE] px-2.5 py-1 rounded-lg hover:underline inline-flex items-center gap-1 shrink-0"
                    >
                      <span>Open in Direct Window</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-[#5F6368] font-semibold">
                  <Info className="w-4 h-4 text-[#1A73E8]" />
                  <span>Tap the microphone button below to speak</span>
                </div>
              )}
            </div>

            {/* What was heard live */}
            {transcript && (
              <div className="text-right text-xs text-[#5F6368] font-medium bg-[#F8FAFF] px-2.5 py-1 rounded-lg border border-[#E2E8F0] max-w-sm truncate">
                Heard:{" "}
                <strong className="text-[#1F2329] font-bold">
                  {transcript}
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
          {/* Left: Cue indicator */}
          <div className="flex items-center gap-2 text-xs font-semibold text-[#5F6368]">
            <span className="px-2.5 py-1 rounded-lg bg-[#F8FAFF] border border-[#E2E8F0] font-bold text-[#1A73E8]">
              Target: {currentPhrase.hiragana}
            </span>
          </div>

          {/* Center: BIG INTERACTIVE MICROPHONE BUTTON */}
          <div className="flex items-center gap-3">
            {status === "transcribing" ? (
              <button
                type="button"
                disabled
                className="h-14 sm:h-16 px-6 sm:px-8 rounded-2xl bg-indigo-600 text-white font-black text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-md shadow-indigo-200 opacity-90 cursor-wait"
              >
                <Loader2 className="w-5 h-5 text-white animate-spin shrink-0" />
                <span>Transcribing...</span>
              </button>
            ) : status === "listening" ? (
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
            ) : status === "retry" ? (
              <button
                type="button"
                onClick={handleToggleListening}
                className={`h-14 sm:h-16 px-6 sm:px-10 rounded-2xl ${
                  errorMessage?.toLowerCase().includes("permission") ||
                  errorMessage?.toLowerCase().includes("blocked")
                    ? "bg-rose-600 hover:bg-rose-700 shadow-rose-200"
                    : "bg-amber-600 hover:bg-amber-700 shadow-amber-100"
                } text-white font-black text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-md hover:scale-102 transition-all cursor-pointer`}
              >
                {errorMessage?.toLowerCase().includes("permission") ||
                errorMessage?.toLowerCase().includes("blocked") ? (
                  <>
                    <Mic className="w-5 h-5" />
                    <span>Grant Microphone & Speak</span>
                  </>
                ) : (
                  <>
                    <RotateCcw className="w-5 h-5" />
                    <span>Try Again (Speak)</span>
                  </>
                )}
              </button>
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
