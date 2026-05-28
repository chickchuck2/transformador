export const PHASES = [
  { key: "A", angle: 0, color: "#FF6B00" },
  { key: "B", angle: (-2 * Math.PI) / 3, color: "#00F0FF" },
  { key: "C", angle: (-4 * Math.PI) / 3, color: "#FF007F" },
];

export function angularVelocity(frequency) {
  return 2 * Math.PI * frequency;
}

export function phaseCount(phaseMode) {
  return phaseMode === "three" ? 3 : 1;
}

export function loadPhaseShift(loadType) {
  if (loadType === "inductive") return Math.PI / 2;
  return 0;
}

export function loadCurrentFactor(loadType) {
  if (loadType === "open") return 0;
  if (loadType === "inductive") return 0.72;
  return 1;
}

export function primaryVoltageAt(time, state, phaseIndex = 0) {
  const phase = PHASES[phaseIndex] ?? PHASES[0];
  return state.voltage * Math.SQRT2 * Math.sin(angularVelocity(state.frequency) * time + phase.angle);
}

export function secondaryVoltageRms(state) {
  return state.voltage / state.turnsRatio;
}

export function secondaryVoltageAt(time, state, phaseIndex = 0) {
  const phase = PHASES[phaseIndex] ?? PHASES[0];
  return secondaryVoltageRms(state) * Math.SQRT2 * Math.sin(angularVelocity(state.frequency) * time + phase.angle + Math.PI);
}

export function primaryFluxAt(time, state, phaseIndex = 0) {
  const phase = PHASES[phaseIndex] ?? PHASES[0];
  const normalizedVoltage = state.voltage / 440;
  const idealFlux = normalizedVoltage * Math.cos(angularVelocity(state.frequency) * time + phase.angle);
  return saturateFlux(idealFlux, state.coreSaturation ?? 0.82);
}

export function idealFluxAt(time, state, phaseIndex = 0) {
  const phase = PHASES[phaseIndex] ?? PHASES[0];
  return (state.voltage / 440) * Math.cos(angularVelocity(state.frequency) * time + phase.angle);
}

export function saturateFlux(idealFlux, knee = 0.82) {
  const safeKnee = Math.max(0.35, knee);
  return Math.tanh(idealFlux / safeKnee) * safeKnee;
}

export function saturationLevelAt(time, state, phaseIndex = 0) {
  const ideal = Math.abs(idealFluxAt(time, state, phaseIndex));
  const actual = Math.abs(primaryFluxAt(time, state, phaseIndex));
  if (ideal <= 0.001) return 0;
  return Math.min(1, Math.max(0, (ideal - actual) / ideal));
}

export function magnetizingCurrentAt(time, state, phaseIndex = 0) {
  const phase = PHASES[phaseIndex] ?? PHASES[0];
  const wTime = angularVelocity(state.frequency) * time + phase.angle;
  const flux = primaryFluxAt(time, state, phaseIndex);
  const saturation = saturationLevelAt(time, state, phaseIndex);
  const hysteresis = state.hysteresis ?? 0.28;
  const permeability = state.corePermeability ?? 0.78;
  const linearComponent = (1 - permeability * 0.62) * Math.sin(wTime - Math.PI / 2);
  const saturationSpike = Math.sign(flux || 1) * saturation * saturation * 2.8;
  const hysteresisComponent = hysteresis * 0.34 * Math.sin(wTime - Math.PI / 3);
  return linearComponent + saturationSpike + hysteresisComponent;
}

export function hysteresisPointAt(time, state, phaseIndex = 0) {
  const flux = primaryFluxAt(time, state, phaseIndex);
  const magnetizingCurrent = magnetizingCurrentAt(time, state, phaseIndex);
  return {
    b: flux,
    h: magnetizingCurrent,
  };
}

export function secondaryCurrentAt(time, state, phaseIndex = 0) {
  const phase = PHASES[phaseIndex] ?? PHASES[0];
  const loadShift = loadPhaseShift(state.loadType);
  const ratioCurrentGain = Math.max(0.2, state.turnsRatio);
  return (
    loadCurrentFactor(state.loadType) *
    ratioCurrentGain *
    Math.sin(angularVelocity(state.frequency) * time + phase.angle + Math.PI - loadShift)
  );
}

export function powerFactor(loadType) {
  if (loadType === "open") return 0;
  if (loadType === "inductive") return 0.35;
  return 1;
}

export function coreHealth(state, time = state.time) {
  const saturation = saturationLevelAt(time, state, 0);
  if (saturation > 0.34) return "Saturando";
  if ((state.hysteresis ?? 0.28) > 0.55) return "Perdas altas";
  return "Estavel";
}

export function describeMode(state) {
  if (state.phaseMode === "three") {
    return "VA, VB, VC = Vm sen(wt + fase), defasadas em 120 graus";
  }
  return "V(t) = Vm sen(wt), sistema monofasico";
}

export function describeLoad(loadType) {
  if (loadType === "open") return "Is = 0, secundario sem caminho de corrente";
  if (loadType === "inductive") return "I(t) = I0 sen(wt - 90 graus), corrente atrasada";
  return "I(t) = I0 sen(wt), corrente em fase com a tensao";
}

export function describeCore(state) {
  const saturation = state.coreSaturation ?? 0.82;
  const hysteresis = state.hysteresis ?? 0.28;
  return `Nucleo: joelho Bsat ${saturation.toFixed(2)}, histerese ${hysteresis.toFixed(2)}`;
}
