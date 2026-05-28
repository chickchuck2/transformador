import { createParticles, updateParticles } from "./application/particles.js";
import { createInitialState, stepState } from "./application/simulatorState.js";
import { bindControls } from "./interfaces/domControls.js";
import { bindHelp } from "./interfaces/helpController.js";
import { AudioEngine } from "./interfaces/audioEngine.js";
import { ScopeRenderer } from "./interfaces/canvas/scopeRenderer.js";
import { SimulationRenderer } from "./interfaces/canvas/simulationRenderer.js";

const state = createInitialState();
const particles = createParticles();
const simulationRenderer = new SimulationRenderer(document.querySelector("#simulationCanvas"));
const scopeRenderer = new ScopeRenderer(document.querySelector("#scopeCanvas"));
const syncPanel = bindControls(state);
bindHelp();
const audioEngine = new AudioEngine(state);

let lastTime = performance.now();

function frame(now) {
  const deltaSeconds = (now - lastTime) / 1000;
  lastTime = now;

  stepState(state, deltaSeconds);
  updateParticles(particles, state, deltaSeconds);
  simulationRenderer.render(state, particles);
  scopeRenderer.render(state);
  syncPanel();
  audioEngine.update(state);

  requestAnimationFrame(frame);
}

requestAnimationFrame(frame);
