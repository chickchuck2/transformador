import { loadCurrentFactor, PHASES, phaseCount, primaryVoltageAt, secondaryCurrentAt } from "../domain/physics.js";

export function createParticles() {
  const primary = [];
  const secondary = [];
  for (let phase = 0; phase < 3; phase += 1) {
    for (let i = 0; i < 34; i += 1) {
      primary.push({ phase, progress: i / 34 });
      secondary.push({ phase, progress: (i + 0.5) / 34 });
    }
  }
  return { primary, secondary };
}

export function updateParticles(particles, state, deltaSeconds) {
  const count = phaseCount(state.phaseMode);
  const primaryScale = 0.18 + state.voltage / 520;
  const secondaryScale = loadCurrentFactor(state.loadType) * (0.15 + state.turnsRatio / 4);

  for (const particle of particles.primary) {
    if (particle.phase >= count) continue;
    particle.progress = wrap01(
      particle.progress + primaryVoltageAt(state.time, state, particle.phase) * primaryScale * deltaSeconds * 0.006,
    );
  }

  for (const particle of particles.secondary) {
    if (particle.phase >= count) continue;
    particle.progress = wrap01(
      particle.progress + secondaryCurrentAt(state.time, state, particle.phase) * secondaryScale * deltaSeconds * 0.56,
    );
  }
}

export function activeParticleColor(phaseIndex, fallback = "#A855F7") {
  return PHASES[phaseIndex]?.color ?? fallback;
}

function wrap01(value) {
  if (value < 0) return value + 1;
  if (value > 1) return value - 1;
  return value;
}
