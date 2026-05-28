import { describeCore, describeLoad, describeMode } from "../domain/physics.js";
import { readMetrics, updateState } from "../application/simulatorState.js";
import { worstSeverity } from "../domain/diagnostics.js";

export function bindControls(state) {
  const refs = {
    toggleRun: document.querySelector("#toggleRun"),
    voltage: document.querySelector("#voltage"),
    frequency: document.querySelector("#frequency"),
    turnsRatio: document.querySelector("#turnsRatio"),
    zoom: document.querySelector("#zoom"),
    corePermeability: document.querySelector("#corePermeability"),
    coreSaturation: document.querySelector("#coreSaturation"),
    hysteresis: document.querySelector("#hysteresis"),
    audioEnabled: document.querySelector("#audioEnabled"),
    audioVolume: document.querySelector("#audioVolume"),
    voltageValue: document.querySelector("#voltageValue"),
    frequencyValue: document.querySelector("#frequencyValue"),
    turnsRatioValue: document.querySelector("#turnsRatioValue"),
    zoomValue: document.querySelector("#zoomValue"),
    corePermeabilityValue: document.querySelector("#corePermeabilityValue"),
    coreSaturationValue: document.querySelector("#coreSaturationValue"),
    hysteresisValue: document.querySelector("#hysteresisValue"),
    secondaryVoltage: document.querySelector("#secondaryVoltage"),
    powerFactor: document.querySelector("#powerFactor"),
    fluxValue: document.querySelector("#fluxValue"),
    magnetizingCurrent: document.querySelector("#magnetizingCurrent"),
    saturationValue: document.querySelector("#saturationValue"),
    coreHealth: document.querySelector("#coreHealth"),
    inputSummary: document.querySelector("#inputSummary"),
    inputDetail: document.querySelector("#inputDetail"),
    outputSummary: document.querySelector("#outputSummary"),
    outputDetail: document.querySelector("#outputDetail"),
    statusBadge: document.querySelector("#statusBadge"),
    diagnosticsList: document.querySelector("#diagnosticsList"),
    formulaMode: document.querySelector("#formulaMode"),
    formulaLoad: document.querySelector("#formulaLoad"),
    formulaFlux: document.querySelector("#formulaFlux"),
    formulaCore: document.querySelector("#formulaCore"),
  };

  refs.toggleRun.addEventListener("click", () => {
    updateState(state, { running: !state.running });
    refs.toggleRun.querySelector("span").textContent = state.running ? "||" : ">";
    refs.toggleRun.setAttribute("aria-label", state.running ? "Pausar simulacao" : "Retomar simulacao");
    refs.toggleRun.title = state.running ? "Pausar simulacao" : "Retomar simulacao";
  });

  bindNumber(refs.voltage, state, "voltage", () => syncPanel(state, refs));
  bindNumber(refs.frequency, state, "frequency", () => syncPanel(state, refs));
  bindNumber(refs.turnsRatio, state, "turnsRatio", () => syncPanel(state, refs));
  bindNumber(refs.zoom, state, "zoom", () => syncPanel(state, refs));
  bindNumber(refs.corePermeability, state, "corePermeability", () => syncPanel(state, refs));
  bindNumber(refs.coreSaturation, state, "coreSaturation", () => syncPanel(state, refs));
  bindNumber(refs.hysteresis, state, "hysteresis", () => syncPanel(state, refs));
  bindAudio(refs, state);

  document.querySelectorAll("[data-phase-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      updateState(state, { phaseMode: button.dataset.phaseMode });
      setActive("[data-phase-mode]", button);
      syncPanel(state, refs);
    });
  });

  document.querySelectorAll("[data-load-type]").forEach((button) => {
    button.addEventListener("click", () => {
      updateState(state, { loadType: button.dataset.loadType });
      setActive("[data-load-type]", button);
      syncPanel(state, refs);
    });
  });

  document.querySelectorAll("[data-channel]").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      updateState(state, {
        channels: {
          ...state.channels,
          [checkbox.dataset.channel]: checkbox.checked,
        },
      });
    });
  });

  syncPanel(state, refs);
  return () => syncPanel(state, refs);
}

function bindNumber(element, state, key, afterChange) {
  element.addEventListener("input", () => {
    updateState(state, { [key]: Number(element.value) });
    afterChange();
  });
}

function syncPanel(state, refs) {
  const metrics = readMetrics(state);
  refs.voltageValue.textContent = `${state.voltage.toFixed(0)} V`;
  refs.frequencyValue.textContent = `${state.frequency.toFixed(0)} Hz`;
  refs.turnsRatioValue.textContent = state.turnsRatio.toFixed(2);
  refs.zoomValue.textContent = state.zoom.toFixed(2);
  refs.corePermeabilityValue.textContent = state.corePermeability.toFixed(2);
  refs.coreSaturationValue.textContent = state.coreSaturation.toFixed(2);
  refs.hysteresisValue.textContent = state.hysteresis.toFixed(2);
  refs.secondaryVoltage.textContent = `${metrics.secondaryVoltage.toFixed(1)} V`;
  refs.powerFactor.textContent = metrics.powerFactor.toFixed(2);
  refs.fluxValue.textContent = metrics.flux.toFixed(2);
  refs.magnetizingCurrent.textContent = metrics.magnetizingCurrent.toFixed(2);
  refs.saturationValue.textContent = `${(metrics.saturation * 100).toFixed(0)}%`;
  refs.coreHealth.textContent = metrics.coreHealth;
  refs.formulaMode.textContent = describeMode(state);
  refs.formulaLoad.textContent = describeLoad(state.loadType);
  refs.formulaFlux.textContent = "Phi(t) = integral de V(t), defasado em 90 graus";
  refs.formulaCore.textContent = describeCore(state);
  refs.inputSummary.textContent = `${metrics.input.voltage.toFixed(0)} V | ${metrics.input.frequency.toFixed(0)} Hz`;
  refs.inputDetail.textContent = `${metrics.input.phaseCount} fase${metrics.input.phaseCount > 1 ? "s" : ""} | ${metrics.input.coreHealth}`;
  refs.outputSummary.textContent = `${metrics.output.voltage.toFixed(1)} V | Is ${metrics.output.current.toFixed(2)}`;
  refs.outputDetail.textContent = `FP ${metrics.output.powerFactor.toFixed(2)} | S ${metrics.output.apparentPower.toFixed(0)} VA`;
  renderDiagnostics(refs, metrics.diagnostics);
}

function setActive(selector, activeButton) {
  document.querySelectorAll(selector).forEach((button) => {
    button.classList.toggle("active", button === activeButton);
  });
}

function bindAudio(refs, state) {
  refs.audioEnabled.addEventListener("change", () => {
    updateState(state, {
      audio: {
        ...state.audio,
        enabled: refs.audioEnabled.checked,
      },
    });
  });
  refs.audioVolume.addEventListener("input", () => {
    updateState(state, {
      audio: {
        ...state.audio,
        volume: Number(refs.audioVolume.value),
      },
    });
  });
}

function renderDiagnostics(refs, diagnostics) {
  const severity = worstSeverity(diagnostics);
  const headline = diagnostics[0] ?? { title: "Operacao estavel" };
  refs.statusBadge.className = `status-badge ${severity}`;
  refs.statusBadge.textContent = headline.title;
  refs.diagnosticsList.replaceChildren(
    ...diagnostics.slice(0, 4).map((item) => {
      const li = document.createElement("li");
      li.className = item.severity;
      const title = document.createElement("strong");
      title.textContent = item.title;
      const detail = document.createElement("span");
      detail.textContent = item.detail;
      li.append(title, detail);
      return li;
    }),
  );
}
