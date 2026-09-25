// Lightweight Web Audio synthesizer for ambient celebratory feedback
// 100% self-contained, no external audio files required!

let audioCtx = null;
let isMuted = false;

function getAudioContext() {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

export function toggleAudioMute() {
  isMuted = !isMuted;
  return isMuted;
}

export function getAudioMuted() {
  return isMuted;
}

export function setAudioMuted(val) {
  isMuted = !!val;
}

// Gentle pleasant soft chime (button clicks, step transitions)
export function playChime() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(587.33, now); // D5
  osc.frequency.exponentialRampToValueAtTime(880, now + 0.15); // A5

  gain.gain.setValueAtTime(0.08, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.36);
}

// Quiz selection pop
export function playPop(isCorrect = true) {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const notes = isCorrect ? [523.25, 659.25, 783.99] : [440, 554.37]; // C5, E5, G5

  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const startTime = now + i * 0.08;

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, startTime);

    gain.gain.setValueAtTime(0.06, startTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + 0.26);
  });
}

// Candle blow whoosh sound
export function playCandleBlow() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  // Filtered white noise for gentle breath/wind blow
  const bufferSize = ctx.sampleRate * 0.6;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.setValueAtTime(800, ctx.currentTime);
  filter.frequency.linearRampToValueAtTime(250, ctx.currentTime + 0.5);
  filter.Q.value = 2;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.12, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.55);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  noise.start(ctx.currentTime);
  noise.stop(ctx.currentTime + 0.56);
}

// Celebratory joyful birthday fanfare arpeggio
export function playCelebrationFanfare() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  // C5, G4, E5, G5, C6 joyful chord sequence
  const chordNotes = [
    { freq: 523.25, time: 0 },
    { freq: 659.25, time: 0.12 },
    { freq: 783.99, time: 0.24 },
    { freq: 1046.50, time: 0.38 },
  ];

  chordNotes.forEach(({ freq, time }) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const noteStart = now + time;

    osc.type = "triangle";
    osc.frequency.setValueAtTime(freq, noteStart);

    gain.gain.setValueAtTime(0.09, noteStart);
    gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + 0.65);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(noteStart);
    osc.stop(noteStart + 0.66);
  });
}

// Shutter / camera snap sound for flipping memories
export function playCameraClick() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;
  
  [0, 0.05].forEach((delay) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(1200, now + delay);
    osc.frequency.exponentialRampToValueAtTime(300, now + delay + 0.035);
    gain.gain.setValueAtTime(0.06, now + delay);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + 0.04);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now + delay);
    osc.stop(now + delay + 0.045);
  });
}

// Gentle heart pop sound for reacting to memories
export function playHeartPop() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  const notes = [659.25, 880]; // E5 -> A5
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const start = now + i * 0.06;
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, start);
    gain.gain.setValueAtTime(0.08, start);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.22);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(start);
    osc.stop(start + 0.23);
  });
}

// Fast, lightweight motorcycle engine throttle rev (450ms)
export function playMotorcycleRev() {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(110, now);
    osc.frequency.exponentialRampToValueAtTime(260, now + 0.15);
    osc.frequency.exponentialRampToValueAtTime(380, now + 0.42);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.46);
  } catch (e) {
    // Non-blocking fail-safe
  }
}

