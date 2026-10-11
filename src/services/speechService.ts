/**
 * Audio Recording & Speech-to-Text Service
 * Connects to the JPTranscribe (https://jptranscribe.com/) API backend
 * with server-side proxy and client-side handling.
 */

export interface TranscriptionResponse {
  text: string;
  provider?: string;
  error?: string;
}

/**
 * Transcribe recorded audio blob via the JPTranscribe API route
 */
export async function transcribeAudioBlob(
  audioBlob: Blob,
  language: string = "ja"
): Promise<TranscriptionResponse> {
  try {
    const reader = new FileReader();
    const base64Promise = new Promise<string>((resolve, reject) => {
      reader.onloadend = () => {
        const result = reader.result as string;
        resolve(result);
      };
      reader.onerror = reject;
    });

    reader.readAsDataURL(audioBlob);
    const audioBase64 = await base64Promise;

    const res = await fetch("/api/transcribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        audioBase64,
        mimeType: audioBlob.type || "audio/webm",
        language,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      return {
        text: (data.text || "").trim(),
        provider: data.provider || "JPTranscribe",
      };
    } else {
      const errData = await res.json().catch(() => ({}));
      return {
        text: "",
        error: errData.error || `HTTP ${res.status}`,
      };
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Network error";
    return {
      text: "",
      error: msg,
    };
  }
}
