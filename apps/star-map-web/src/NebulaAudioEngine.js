export class NebulaAudioEngine {
  constructor() {
    // 1. Initialiser AudioContext (støtter også eldre Safari/Webkit)
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.ctx = new AudioContext();

    // 2. Sett opp en Master Gain (hovedvolum) for å unngå clipping
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = 0.4;
    this.masterGain.connect(this.ctx.destination);

    this.isUnlocked = false;
  }

  // Nettlesere krever en brukerhandling (klikk) for å starte lyden
  unlock() {
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    this.isUnlocked = true;
    console.log("Nebula Audio Engine: Engaged");
  }

  // Lyst, krystallklart "pling" (utgående sonar/stjerner)
  playSonarPing() {
    if (!this.isUnlocked) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(880.0, t);

    // ADSR-ish envelope (rask attack, lang release)
    gainNode.gain.setValueAtTime(0, t);
    gainNode.gain.linearRampToValueAtTime(0.3, t + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.001, t + 2.0);

    osc.connect(gainNode);
    gainNode.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 2.1);
  }

  // Dyp, rumlende basspuls (inngående trafikk)
  playIncomingBass() {
    if (!this.isUnlocked) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(65.41, t);

    // ADSR-ish envelope for bass (mykere attack, lengre release)
    gainNode.gain.setValueAtTime(0, t);
    gainNode.gain.linearRampToValueAtTime(0.5, t + 0.4);
    gainNode.gain.exponentialRampToValueAtTime(0.001, t + 3.0);

    osc.connect(gainNode);
    gainNode.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 3.1);
  }
}
