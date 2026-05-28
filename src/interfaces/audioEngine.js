import { worstSeverity } from "../domain/diagnostics.js";
import { magnetizingCurrentAt, primaryFluxAt } from "../domain/physics.js";

export class AudioEngine {
  constructor(state) {
    this.state = state;
    this.context = null;
    this.hum = null;
    this.warning = null;
    this.master = null;
    this.lastPulse = 0;
    window.addEventListener("pointerdown", () => this.ensureStarted(), { once: false });
    document.addEventListener("change", (event) => {
      if (event.target?.id === "audioEnabled") this.ensureStarted();
    });
  }

  ensureStarted() {
    if (this.context || !this.state.audio.enabled) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    this.context = new AudioContext();
    this.master = this.context.createGain();
    this.master.gain.value = this.state.audio.volume;
    this.master.connect(this.context.destination);

    this.hum = this.createOscillator("sine", 60, 0.04);
    this.warning = this.createOscillator("triangle", 220, 0);
  }

  update(state) {
    if (!state.audio.enabled) {
      this.setGain(this.hum, 0);
      this.setGain(this.warning, 0);
      return;
    }
    this.ensureStarted();
    if (!this.context) return;

    const severity = worstSeverity(state.diagnostics);
    const flux = Math.abs(primaryFluxAt(state.time, state, 0));
    const im = Math.abs(magnetizingCurrentAt(state.time, state, 0));
    this.master.gain.setTargetAtTime(state.audio.volume, this.context.currentTime, 0.04);
    this.hum.osc.frequency.setTargetAtTime(Math.max(35, state.frequency), this.context.currentTime, 0.04);
    this.setGain(this.hum, 0.015 + flux * 0.045 + im * 0.012);

    if (severity === "danger") {
      this.warning.osc.frequency.setTargetAtTime(330 + im * 60, this.context.currentTime, 0.02);
      this.setGain(this.warning, 0.08);
      this.pulseClick(0.08, 720);
    } else if (severity === "warning") {
      this.warning.osc.frequency.setTargetAtTime(180, this.context.currentTime, 0.05);
      this.setGain(this.warning, 0.025);
    } else {
      this.setGain(this.warning, 0);
    }
  }

  createOscillator(type, frequency, gainValue) {
    const osc = this.context.createOscillator();
    const gain = this.context.createGain();
    osc.type = type;
    osc.frequency.value = frequency;
    gain.gain.value = gainValue;
    osc.connect(gain);
    gain.connect(this.master);
    osc.start();
    return { osc, gain };
  }

  setGain(node, value) {
    if (!node || !this.context) return;
    node.gain.gain.setTargetAtTime(value, this.context.currentTime, 0.05);
  }

  pulseClick(volume, frequency) {
    if (this.context.currentTime - this.lastPulse < 0.55) return;
    this.lastPulse = this.context.currentTime;
    const osc = this.context.createOscillator();
    const gain = this.context.createGain();
    osc.type = "square";
    osc.frequency.value = frequency;
    gain.gain.setValueAtTime(volume, this.context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + 0.09);
    osc.connect(gain);
    gain.connect(this.master);
    osc.start();
    osc.stop(this.context.currentTime + 0.1);
  }
}
