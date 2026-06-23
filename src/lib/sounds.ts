let audioCtx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    try {
      audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    } catch {
      return null;
    }
  }
  return audioCtx;
}

function beep(freq: number, duration: number, volume = 0.1) {
  const ctx = getCtx();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.frequency.value = freq;
  osc.type = "square";
  gain.gain.value = volume;
  osc.start();
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  osc.stop(ctx.currentTime + duration);
}

export function playClick() {
  beep(800, 0.05, 0.08);
}

export function playNav() {
  beep(600, 0.08, 0.06);
}

export function playPanelSwitch() {
  beep(500, 0.06, 0.05);
  setTimeout(() => beep(700, 0.06, 0.05), 60);
}

export function playAchievement() {
  beep(523, 0.1, 0.08);
  setTimeout(() => beep(659, 0.1, 0.08), 100);
  setTimeout(() => beep(784, 0.15, 0.08), 200);
}

export function playTerminal() {
  beep(400, 0.03, 0.04);
}

export function playBoot() {
  beep(440, 0.15, 0.06);
  setTimeout(() => beep(660, 0.15, 0.06), 150);
  setTimeout(() => beep(880, 0.2, 0.08), 300);
}

export function playGameOver() {
  beep(400, 0.15, 0.08);
  setTimeout(() => beep(300, 0.15, 0.08), 150);
  setTimeout(() => beep(200, 0.3, 0.08), 300);
}

export function playCollect() {
  beep(880, 0.08, 0.06);
}

let soundEnabled = false;

export function isSoundEnabled() {
  if (typeof window === "undefined") return false;
  const stored = localStorage.getItem("tamal-sound");
  soundEnabled = stored === "on";
  return soundEnabled;
}

export function toggleSound() {
  soundEnabled = !soundEnabled;
  if (typeof window !== "undefined") {
    localStorage.setItem("tamal-sound", soundEnabled ? "on" : "off");
  }
  return soundEnabled;
}

export function initSound() {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("tamal-sound");
    soundEnabled = stored === "on";
  }
}

export function playIfEnabled(fn: () => void) {
  if (soundEnabled) fn();
}
