import React, { useState, useEffect, useRef, useCallback } from "react";
import { QuizResult } from "../types";
import { INTERACTION_DATA, InteractionItem } from "../data/interactionData";
import { SituationIllustration } from "./SituationIllustration";
import {
  evaluateInteractionResponse,
  InteractionEvaluationResult,
} from "../utils/interactionEvaluator";
import {
  playSuccessChime,
  playErrorBuzz,
  speakJapaneseSentence,
} from "../utils/audio";
import { transcribeAudioBlob } from "../services/speechService";
import {
  Volume2,
  Mic,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Flame,
  X,
  Square,
  Loader2,
} from "lucide-react";

interface InteractionSpeakingQuizProps {
  soundEnabled: boolean;
  onComplete: (result: QuizResult) => void;
  onCancel: () => void;
}

type QuizStatus =
  | "idle"
  | "listening"
  | "transcribing"
  | "success"
  | "retry";

export const InteractionSpeakingQuiz: React.FC<
  InteractionSpeakingQuizProps
> = ({ soundEnabled, onComplete, onCancel }) => {
  // Questions pool (shuffled 10 items for a focused round)
  const [roundQuestions, setRoundQuestions] = useState<InteractionItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Recognition & Evaluation states
  const [status, setStatus] = useState<QuizStatus>("idle");
  const [transcript, setTranscript] = useState("");
  const [evaluationResult, setEvaluationResult] =
    useState<InteractionEvaluationResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Audio playing indicator
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Stats
  const [correctCount, setCorrectCount] = useState(0);
  const [streak, setStreak] = useState(0);

  // Optional minimal hint drawer
  const [showHints, setShowHints] = useState(false);
  const [recordingSecondsLeft, setRecordingSecondsLeft] = useState<number>(10);

  // Answer history for final summary
  const [answerLog, setAnswerLog] = useState<
    {
      interaction: InteractionItem;
      spokenTranscript: string;
      isCorrect: boolean;
      explanation: string;
    }[]
  >([]);

  // References
  const startTimeRef = useRef<number>(Date.now());
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const recordingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isListeningRef = useRef<boolean>(false);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Stop hardware microphone stream tracks
  const stopMediaTracks = useCallback(() => {
    if (mediaStreamRef.current) {
      try {
        mediaStreamRef.current.getTracks().forEach((t) => t.stop());
      } catch {
        // ignore
      }
      mediaStreamRef.current = null;
    }
  }, []);

  // Clear 10s recording timer & countdown
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

  // Clean up on unmount
  useEffect(() => {
    return () => {
      clearRecordingTimer();
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
      }
      stopMediaTracks();
    };
  }, [clearRecordingTimer, stopMediaTracks]);

  // Initialize round questions
  const startNewRound = useCallback(() => {
    const shuffled = [...INTERACTION_DATA].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.min(10, shuffled.length));

    setRoundQuestions(selected);
    setCurrentIndex(0);
    setCorrectCount(0);
    setStreak(0);
    setAnswerLog([]);
    setStatus("idle");
    setTranscript("");
    setEvaluationResult(null);
    setErrorMessage(null);
    setShowHints(false);
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
    speakJapaneseSentence(
      currentItem.audioPrompt || currentItem.questionHiragana,
      0.9,
      () => {
        setIsPlayingAudio(false);
      },
    );
  }, [currentItem]);

  // Autoplay audio on question load if sound is enabled
  useEffect(() => {
    if (currentItem && soundEnabled && status === "idle") {
      const timer = setTimeout(() => {
        playQuestionAudio();
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, currentItem, soundEnabled, playQuestionAudio, status]);

  // Stop microphone recording & clear timers
  const stopHardwareAudio = useCallback(() => {
    clearRecordingTimer();
    isListeningRef.current = false;
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      try {
        mediaRecorderRef.current.stop();
      } catch {
        // ignore
      }
    }
    stopMediaTracks();
  }, [clearRecordingTimer, stopMediaTracks]);

  // Process and evaluate spoken response
  const handleProcessResponse = useCallback(
    (spoken: string) => {
      if (!currentItem) return;
      const result = evaluateInteractionResponse(spoken, currentItem);
      setEvaluationResult(result);

      if (result.isValid) {
        stopHardwareAudio();
        setStatus("success");
        setCorrectCount((prev) => prev + 1);
        setStreak((prev) => prev + 1);
        if (soundEnabled) playSuccessChime();

        setAnswerLog((prev) => [
          ...prev,
          {
            interaction: currentItem,
            spokenTranscript: spoken,
            isCorrect: true,
            explanation: result.feedbackExplanation,
          },
        ]);
      } else {
        setStatus("retry");
        setStreak(0);
        if (soundEnabled) playErrorBuzz();

        setAnswerLog((prev) => [
          ...prev,
          {
            interaction: currentItem,
            spokenTranscript: spoken,
            isCorrect: false,
            explanation: result.feedbackExplanation,
          },
        ]);
      }
    },
    [currentItem, soundEnabled, stopHardwareAudio],
  );

  // Stop speech recording and evaluate recording against correct answer via JPTranscribe
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
        recorder.addEventListener(
          "stop",
          () => {
            const mime =
              audioChunksRef.current[0]?.type ||
              recorder.mimeType ||
              "audio/webm";
            if (audioChunksRef.current.length > 0) {
              resolve(new Blob(audioChunksRef.current, { type: mime }));
            } else {
              resolve(null);
            }
          },
          { once: true },
        );
        try {
          recorder.stop();
        } catch {
          resolve(null);
        }
      });
    } else if (audioChunksRef.current.length > 0) {
      const mime = audioChunksRef.current[0]?.type || "audio/webm";
      audioBlob = new Blob(audioChunksRef.current, { type: mime });
    }

    stopMediaTracks();

    // If recording produced no audio
    if (!audioBlob || audioBlob.size === 0) {
      if (soundEnabled) playErrorBuzz();
      setStatus("retry");
      setStreak(0);
      setTranscript("");
      setEvaluationResult({
        isValid: false,
        isLogical: false,
        isGrammatical: false,
        normalizedSpoken: "",
        headline: "おんせいが ききとれませんでした (No voice detected)",
        feedbackExplanation:
          "No speech was recorded. Please check your microphone, speak clearly, and tap to try again.",
      });
      if (currentItem) {
        setAnswerLog((prev) => [
          ...prev,
          {
            interaction: currentItem,
            spokenTranscript: "",
            isCorrect: false,
            explanation: "No voice detected",
          },
        ]);
      }
      return;
    }

    // Transcribe recorded audio with JPTranscribe API
    try {
      const res = await transcribeAudioBlob(audioBlob, "ja");
      const transcribedText = (res.text || "").trim();

      // IF not recognised: return incorrect
      if (!transcribedText) {
        if (soundEnabled) playErrorBuzz();
        setStatus("retry");
        setStreak(0);
        setTranscript("");
        setEvaluationResult({
          isValid: false,
          isLogical: false,
          isGrammatical: false,
          normalizedSpoken: "",
          headline: "おんせいが ききとれませんでした (No voice recognized)",
          feedbackExplanation:
            "Could not recognize Japanese speech. Please speak clearly into your microphone and try again.",
        });
        if (currentItem) {
          setAnswerLog((prev) => [
            ...prev,
            {
              interaction: currentItem,
              spokenTranscript: "",
              isCorrect: false,
              explanation: "Speech not recognized",
            },
          ]);
        }
        return;
      }

      // IF recognised: transcribe to text, compare text to correct answer
      setTranscript(transcribedText);
      handleProcessResponse(transcribedText);
    } catch (apiErr) {
      console.warn("JPTranscribe request error:", apiErr);
      if (soundEnabled) playErrorBuzz();
      setStatus("retry");
      setStreak(0);
      setEvaluationResult({
        isValid: false,
        isLogical: false,
        isGrammatical: false,
        normalizedSpoken: "",
        headline: "音声認識エラー (Recognition Error)",
        feedbackExplanation:
          "Could not process audio transcription. Please check your network and try again.",
      });
      if (currentItem) {
        setAnswerLog((prev) => [
          ...prev,
          {
            interaction: currentItem,
            spokenTranscript: "",
            isCorrect: false,
            explanation: "Recognition Error",
          },
        ]);
      }
    }
  }, [
    clearRecordingTimer,
    stopMediaTracks,
    soundEnabled,
    currentItem,
    handleProcessResponse,
    status,
  ]);

  // Start 10s speech recording session
  const handleStartListening = async () => {
    clearRecordingTimer();
    stopMediaTracks();

    audioChunksRef.current = [];
    setTranscript("");
    setEvaluationResult(null);
    setErrorMessage(null);
    setRecordingSecondsLeft(10);

    try {
      if (!navigator?.mediaDevices?.getUserMedia) {
        setStatus("retry");
        setErrorMessage("Microphone access is not supported in this browser.");
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });
      mediaStreamRef.current = stream;

      let mimeType = "audio/webm";
      if (typeof MediaRecorder !== "undefined") {
        if (MediaRecorder.isTypeSupported("audio/webm;codecs=opus")) {
          mimeType = "audio/webm;codecs=opus";
        } else if (MediaRecorder.isTypeSupported("audio/webm")) {
          mimeType = "audio/webm";
        } else if (MediaRecorder.isTypeSupported("audio/mp4")) {
          mimeType = "audio/mp4";
        }
      }

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
    } catch (err) {
      console.warn("Microphone access error:", err);
      setStatus("retry");
      setErrorMessage(
        "Microphone permission was denied or is unavailable. Please allow microphone access and try again.",
      );
    }
  };

  // Toggle listening button
  const handleToggleListening = () => {
    if (status === "listening" || isListeningRef.current) {
      handleStopListening();
    } else if (status !== "transcribing") {
      handleStartListening();
    }
  };

  // Advance to next question or complete quiz
  const handleNextQuestion = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    if (currentIndex + 1 < roundQuestions.length) {
      setCurrentIndex((prev) => prev + 1);
      setStatus("idle");
      setTranscript("");
      setEvaluationResult(null);
      setErrorMessage(null);
      setShowHints(false);
    } else {
      const finalCorrect = correctCount + (status === "success" ? 0 : 0);
      const total = roundQuestions.length;
      const percentage = Math.round((finalCorrect / total) * 100);
      const timeSpentSeconds = Math.max(
        5,
        Math.round((Date.now() - startTimeRef.current) / 1000),
      );

      const quizResult: QuizResult = {
        id: `interaction_${Date.now()}`,
        userId: "guest",
        exerciseType: "interaction-speaking",
        score: finalCorrect,
        totalQuestions: total,
        percentage,
        timeSpentSeconds,
        createdAt: new Date().toISOString(),
        items: answerLog.map((log) => ({
          kana: log.interaction.questionHiragana,
          romaji: log.interaction.situationContext,
          selected: log.spokenTranscript || "(no response)",
          correct: log.interaction.sampleGoodReplies[0]?.hiragana || "",
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
          <p className="font-extrabold text-[#1F2329] mb-4">
            Loading interactions...
          </p>
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

  const progressPercent = Math.round(
    ((currentIndex + 1) / roundQuestions.length) * 100,
  );

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
                    ? "bg-[#1A73E8] text-white shadow-xs animate-pulse"
                    : "bg-white text-[#1A73E8] border border-[#CBD5E1] hover:border-[#1A73E8] hover:bg-[#F8FAFF]"
                }`}
              >
                <Volume2 className="w-4 h-4" />
                <span>{isPlayingAudio ? "Playing audio..." : "Listen"}</span>
              </button>
            </div>
          </div>

          {/* D. FEEDBACK / STATUS DISPLAY */}
          {/* SUCCESS STATE */}
          {status === "success" && evaluationResult && (
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

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleStartListening}
                  className="px-3 py-2 rounded-xl border border-emerald-400 bg-white hover:bg-emerald-100 text-emerald-800 font-bold text-xs inline-flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Speak Again</span>
                </button>
                <button
                  type="button"
                  onClick={handleNextQuestion}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm shadow-md inline-flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>
                    {currentIndex + 1 >= roundQuestions.length
                      ? "Results"
                      : "Next"}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* RETRY STATE */}
          {status === "retry" && evaluationResult && (
            <div className="p-3 rounded-2xl bg-amber-50 border-2 border-amber-300 flex flex-col gap-2 animate-in fade-in-50">
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <AlertCircle className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="text-xs sm:text-sm font-bold text-amber-900">
                    {evaluationResult.headline}
                  </p>
                  <p className="text-xs text-amber-800 mt-0.5">
                    {evaluationResult.feedbackExplanation}
                  </p>
                  {transcript && (
                    <p className="text-xs text-amber-800 mt-1">
                      Heard:{" "}
                      <span className="font-bold font-sans">
                        &ldquo;{transcript}&rdquo;
                      </span>
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-amber-200">
                <button
                  type="button"
                  onClick={() => setShowHints((prev) => !prev)}
                  className="text-xs font-bold text-amber-900 hover:underline px-2 py-1 cursor-pointer"
                >
                  {showHints ? "Hide hints" : "Need a hint?"}
                </button>
                <button
                  type="button"
                  onClick={handleStartListening}
                  className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Try Again (Speak)</span>
                </button>
              </div>
            </div>
          )}

          {/* TRANSCRIBING STATE */}
          {status === "transcribing" && (
            <div className="p-3 rounded-2xl bg-indigo-50 border-2 border-indigo-300 flex items-center justify-center gap-2.5 animate-in fade-in-50">
              <Loader2 className="w-5 h-5 text-indigo-600 animate-spin shrink-0" />
              <span className="text-xs text-indigo-900 font-bold">
                音声認識中... Transcribing reply with JPTranscribe...
              </span>
            </div>
          )}

          {/* LISTENING STATUS */}
          {status === "listening" && (
            <div className="p-3 rounded-2xl bg-blue-50 border-2 border-blue-300 text-center animate-pulse">
              <div className="flex items-center justify-center gap-2 text-[#1A73E8] font-bold text-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                <span>Recording Japanese reply... ({recordingSecondsLeft}s remaining)</span>
              </div>
            </div>
          )}

          {/* IDLE PROMPT */}
          {status === "idle" && (
            <div className="p-2.5 rounded-xl bg-[#F8FAFF] border border-[#CBD5E1] text-center text-xs text-[#5F6368] font-semibold">
              Listen to the prompt above, then tap the microphone button below to reply in Japanese.
            </div>
          )}

          {/* SAMPLE REPLIES (Shown only when hints toggled) */}
          {showHints && (
            <div className="p-3 rounded-2xl bg-[#F8FAFF] border border-[#CBD5E1] text-xs">
              <span className="font-bold text-[#1F2329] block mb-1.5">
                Suggested response phrasing:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {currentItem.sampleGoodReplies.map((sample, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-white border border-[#CBD5E1] font-bold text-[#1A73E8] font-sans text-xs"
                  >
                    『{sample.hiragana}』 ({sample.english})
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* E. MICROPHONE ACTION BUTTON */}
          {status !== "success" && (
            <div className="flex items-center justify-center pt-2">
              <button
                type="button"
                onClick={handleToggleListening}
                disabled={status === "transcribing"}
                aria-label={
                  status === "transcribing"
                    ? "Transcribing speech in progress"
                    : status === "listening"
                    ? "Recording in progress. Tap to stop early"
                    : "Tap to speak reply"
                }
                className={`transition-all shadow-md flex items-center justify-center gap-2.5 ${
                  status === "transcribing"
                    ? "h-14 sm:h-16 px-6 sm:px-8 rounded-2xl bg-indigo-600 text-white font-black text-sm sm:text-base opacity-90 cursor-wait"
                    : status === "listening"
                    ? "h-14 sm:h-16 px-6 sm:px-8 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-sm sm:text-base ring-4 ring-rose-200 cursor-pointer"
                    : status === "retry"
                    ? "px-6 py-3.5 rounded-2xl font-black text-sm sm:text-base bg-amber-600 hover:bg-amber-700 text-white hover:scale-102 active:scale-98 cursor-pointer"
                    : "px-6 py-3.5 rounded-2xl font-black text-sm sm:text-base bg-[#1A73E8] text-white hover:bg-[#1557B0] hover:scale-102 active:scale-98 cursor-pointer"
                }`}
              >
                {status === "transcribing" ? (
                  <>
                    <Loader2 className="w-5 h-5 text-white animate-spin shrink-0" />
                    <span>Transcribing...</span>
                  </>
                ) : status === "listening" ? (
                  <>
                    <Square className="w-5 h-5 fill-white text-white shrink-0" />
                    <span className="animate-recording-flash tracking-wide">
                      Recording...
                    </span>
                    <span className="text-xs bg-rose-800/70 px-2.5 py-1 rounded-full font-mono text-rose-100 font-bold">
                      {recordingSecondsLeft}s
                    </span>
                  </>
                ) : status === "retry" ? (
                  <>
                    <RotateCcw className="w-5 h-5" />
                    <span>Try Again (Speak)</span>
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
        </div>
      </div>
    </div>
  );
};
