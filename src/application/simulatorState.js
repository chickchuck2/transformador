import {
  evaluateDiagnostics,
  inputReadings,
  outputReadings,
  worstSeverity,
} from "../domain/diagnostics.js";
import {
  coreHealth,
  magnetizingCurrentAt,
  powerFactor,
  primaryFluxAt,
  saturationLevelAt,
  secondaryVoltageRms,
} from "../domain/physics.js";

export function createInitialState() {
  return {
    running: true,
    time: 0,
    frequency: 60,
    voltage: 127,
    turnsRatio: 1,
    phaseMode: "single",
    loadType: "resistive",
    zoom: 1,
    coreSaturation: 0.82,
    corePermeability: 0.78,
    hysteresis: 0.28,
    channels: {
      vp: true,
      vs: true,
      is: true,
      phi: true,
      im: true,
    },
    audio: {
      enabled: false,
      volume: 0.35,
    },
    diagnostics: [],
  };
}

export function stepState(state, deltaSeconds) {
  if (!state.running) return state;
  state.time += Math.min(deltaSeconds, 0.04);
  refreshDiagnostics(state);
  return state;
}

export function updateState(state, patch) {
  Object.assign(state, patch);
  refreshDiagnostics(state);
  return state;
}

export function readMetrics(state) {
  const flux = primaryFluxAt(state.time, state, 0);
  const diagnostics = state.diagnostics.length > 0 ? state.diagnostics : evaluateDiagnostics(state);
  return {
    secondaryVoltage: secondaryVoltageRms(state),
    powerFactor: powerFactor(state.loadType),
    flux,
    magnetizingCurrent: magnetizingCurrentAt(state.time, state, 0),
    saturation: saturationLevelAt(state.time, state, 0),
    coreHealth: coreHealth(state),
    input: inputReadings(state),
    output: outputReadings(state),
    diagnostics,
    severity: worstSeverity(diagnostics),
  };
}

export function refreshDiagnostics(state) {
  state.diagnostics = evaluateDiagnostics(state);
  return state.diagnostics;
}
