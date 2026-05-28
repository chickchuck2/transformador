import {
  coreHealth,
  magnetizingCurrentAt,
  powerFactor,
  saturationLevelAt,
  secondaryCurrentAt,
  secondaryVoltageRms,
} from "./physics.js";

export function inputReadings(state) {
  return {
    voltage: state.voltage,
    frequency: state.frequency,
    phaseCount: state.phaseMode === "three" ? 3 : 1,
    coreHealth: coreHealth(state),
  };
}

export function outputReadings(state) {
  const current = Math.abs(secondaryCurrentAt(state.time, state, 0));
  return {
    voltage: secondaryVoltageRms(state),
    current,
    powerFactor: powerFactor(state.loadType),
    apparentPower: secondaryVoltageRms(state) * current,
  };
}

export function evaluateDiagnostics(state) {
  const saturation = saturationLevelAt(state.time, state, 0);
  const output = outputReadings(state);
  const magnetizingCurrent = Math.abs(magnetizingCurrentAt(state.time, state, 0));
  const diagnostics = [];

  if (output.voltage > 260) {
    diagnostics.push(createDiagnostic("danger", "OVERVOLTAGE", "Sobretensao no secundario", "Reduza a tensao primaria ou aumente Np/Ns."));
  } else if (output.voltage > 220) {
    diagnostics.push(createDiagnostic("warning", "HIGH_OUTPUT", "Saida elevada", "Confira isolamento e carga antes de operar."));
  }

  if (saturation > 0.4) {
    diagnostics.push(createDiagnostic("danger", "CORE_SATURATION", "Nucleo em saturacao", "Aumente o joelho de saturacao ou reduza a tensao."));
  } else if (saturation > 0.22) {
    diagnostics.push(createDiagnostic("warning", "CORE_NEAR_SATURATION", "Nucleo perto da saturacao", "Observe picos de corrente magnetizante."));
  }

  if (state.hysteresis > 0.62) {
    diagnostics.push(createDiagnostic("warning", "HIGH_HYSTERESIS", "Perdas magneticas altas", "Use material com menor histerese."));
  }

  if (state.frequency < 30 && state.voltage > 180) {
    diagnostics.push(createDiagnostic("danger", "LOW_FREQUENCY", "Baixa frequencia com tensao alta", "Fluxo cresce demais e o nucleo satura rapidamente."));
  }

  if (state.frequency > 95) {
    diagnostics.push(createDiagnostic("info", "HIGH_FREQUENCY", "Frequencia alta", "O fluxo reduz, mas perdas parasitas tenderiam a subir."));
  }

  if (state.loadType === "open") {
    diagnostics.push(createDiagnostic("info", "OPEN_LOAD", "Secundario em aberto", "Ha tensao induzida, mas corrente de carga e zero."));
  }

  if (magnetizingCurrent > 1.25) {
    diagnostics.push(createDiagnostic("danger", "INRUSH_SPIKE", "Pico de magnetizacao", "O nucleo esta exigindo corrente magnetizante intensa."));
  }

  if (diagnostics.length === 0) {
    diagnostics.push(createDiagnostic("ok", "NORMAL", "Operacao estavel", "Entrada, nucleo e saida dentro da faixa educacional."));
  }

  return diagnostics;
}

export function worstSeverity(diagnostics) {
  if (diagnostics.some((item) => item.severity === "danger")) return "danger";
  if (diagnostics.some((item) => item.severity === "warning")) return "warning";
  if (diagnostics.some((item) => item.severity === "info")) return "info";
  return "ok";
}

function createDiagnostic(severity, code, title, detail) {
  return { severity, code, title, detail };
}
