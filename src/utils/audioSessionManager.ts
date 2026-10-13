/**
 * Persistent Audio Session Manager
 * Maintains a live MediaStream across the entire quiz/game session
 * so the user is only prompted for microphone permission ONCE.
 */

let sessionStream: MediaStream | null = null;
let cachedPermissionState: 'granted' | 'denied' | 'prompt' | 'unknown' = 'unknown';

/**
 * Checks if a live, active audio stream is currently held in session.
 */
export function hasActiveSessionStream(): boolean {
  if (!sessionStream || !sessionStream.active) return false;
  const tracks = sessionStream.getAudioTracks();
  return tracks.length > 0 && tracks.some((t) => t.readyState === 'live');
}

/**
 * Get the current active stream, or request microphone access from the browser.
 * Once granted, the stream remains cached in memory for subsequent questions.
 */
export async function getOrCreateSessionStream(): Promise<MediaStream> {
  // If an active live stream already exists for this game session, REUSE IT!
  if (hasActiveSessionStream()) {
    sessionStream!.getAudioTracks().forEach((track) => {
      track.enabled = true;
    });
    return sessionStream!;
  }

  if (typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
    throw new Error('Microphone access is not supported in this browser.');
  }

  // Request microphone permission popup on first tap
  let stream: MediaStream;
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
      },
    });
  } catch (_err: unknown) {
    // Fall back to simple { audio: true }
    stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  }

  // Ensure tracks are enabled
  stream.getAudioTracks().forEach((track) => {
    track.enabled = true;
  });

  sessionStream = stream;
  cachedPermissionState = 'granted';

  // Listen for unexpected track ending (e.g. user unplugs headset)
  stream.getAudioTracks().forEach((track) => {
    track.onended = () => {
      if (sessionStream === stream) {
        sessionStream = null;
      }
    };
  });

  return stream;
}

/**
 * Temporarily mute audio tracks between recordings to avoid ambient noise/leaks
 * while KEEPING the browser permission and hardware channel alive.
 */
export function pauseSessionStream(): void {
  if (sessionStream && sessionStream.active) {
    sessionStream.getAudioTracks().forEach((track) => {
      track.enabled = false;
    });
  }
}

/**
 * Unmute audio tracks when starting a new recording.
 */
export function resumeSessionStream(): void {
  if (sessionStream && sessionStream.active) {
    sessionStream.getAudioTracks().forEach((track) => {
      track.enabled = true;
    });
  }
}

/**
 * Cleanly releases all hardware tracks when exiting the speaking quiz completely.
 */
export function releaseSessionStream(): void {
  if (sessionStream) {
    sessionStream.getTracks().forEach((track) => {
      try {
        track.stop();
      } catch {
        // ignore
      }
    });
    sessionStream = null;
  }
}

/**
 * Query browser permission status without triggering a prompt.
 */
export async function queryMicrophonePermission(): Promise<'granted' | 'denied' | 'prompt' | 'unknown'> {
  if (hasActiveSessionStream()) {
    cachedPermissionState = 'granted';
    return 'granted';
  }

  if (typeof navigator !== 'undefined' && navigator.permissions?.query) {
    try {
      const res = await navigator.permissions.query({ name: 'microphone' as PermissionName });
      cachedPermissionState = res.state as 'granted' | 'denied' | 'prompt';
      res.onchange = () => {
        cachedPermissionState = res.state as 'granted' | 'denied' | 'prompt';
      };
      return cachedPermissionState;
    } catch {
      // Some browsers (e.g. Firefox, Safari) throw on 'microphone'
    }
  }

  return cachedPermissionState;
}

/**
 * Determine best supported MediaRecorder MIME type.
 */
export function getSupportedAudioMimeType(): string {
  if (typeof MediaRecorder === 'undefined') return '';
  const candidates = [
    'audio/webm;codecs=opus',
    'audio/webm',
    'audio/mp4',
    'audio/ogg;codecs=opus',
    'audio/wav',
  ];
  for (const candidate of candidates) {
    if (MediaRecorder.isTypeSupported(candidate)) {
      return candidate;
    }
  }
  return '';
}
