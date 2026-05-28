import { PHASES, magnetizingCurrentAt, phaseCount, primaryFluxAt, saturationLevelAt } from "../../domain/physics.js";
import { activeParticleColor } from "../../application/particles.js";
import { buildLayout, coilPoint } from "./geometry.js";

export class SimulationRenderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
  }

  resize() {
    const rect = this.canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = Math.max(1, Math.floor(rect.width * dpr));
    this.canvas.height = Math.max(1, Math.floor(rect.height * dpr));
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { width: rect.width, height: rect.height };
  }

  render(state, particles) {
    const { width, height } = this.resize();
    const ctx = this.ctx;
    const layout = buildLayout(width, height, state.zoom);

    ctx.clearRect(0, 0, width, height);
    drawBackdrop(ctx, width, height);
    drawCore(ctx, layout, state);
    drawFlux(ctx, layout, state);
    drawCoils(ctx, layout, state);
    drawParticles(ctx, layout, state, particles);
    drawProblemEffects(ctx, layout, state);
    drawLabels(ctx, layout, state);
  }
}

function drawBackdrop(ctx, width, height) {
  ctx.save();
  ctx.strokeStyle = "rgba(255,255,255,0.04)";
  ctx.lineWidth = 1;
  for (let x = 0; x < width; x += 40) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y < height; y += 40) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
  ctx.restore();
}

function drawCore(ctx, layout, state) {
  const { core, scale } = layout;
  const bar = 46 * scale;
  ctx.save();
  ctx.lineJoin = "round";
  ctx.lineWidth = bar;
  const gradient = ctx.createLinearGradient(core.left, core.top, core.right, core.bottom);
  gradient.addColorStop(0, "#1F2937");
  gradient.addColorStop(0.5, "#374151");
  gradient.addColorStop(1, "#111827");
  ctx.strokeStyle = gradient;
  ctx.shadowColor = "rgba(148, 163, 184, 0.28)";
  ctx.shadowBlur = 18 * scale;
  ctx.strokeRect(core.left, core.top, core.width, core.height);
  if (state.phaseMode === "three") {
    for (const x of core.columns) {
      ctx.beginPath();
      ctx.moveTo(x, core.top);
      ctx.lineTo(x, core.bottom);
      ctx.stroke();
    }
  } else {
    ctx.beginPath();
    ctx.moveTo(core.columns[1], core.top);
    ctx.lineTo(core.columns[1], core.bottom);
    ctx.stroke();
  }
  ctx.restore();
}

function drawFlux(ctx, layout, state) {
  const count = phaseCount(state.phaseMode);
  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  for (let i = 0; i < count; i += 1) {
    const flux = primaryFluxAt(state.time, state, i);
    const saturation = saturationLevelAt(state.time, state, i);
    const intensity = 0.14 + Math.abs(flux) * 0.9 + saturation * 0.42;
    const color = state.phaseMode === "three" ? PHASES[i].color : "#EAB308";
    const x = state.phaseMode === "three" ? layout.core.columns[i] : layout.core.columns[1];
    const glow = ctx.createRadialGradient(x, layout.centerY, 12, x, layout.centerY, 168 * layout.scale);
    glow.addColorStop(0, withAlpha(color, intensity * 0.44));
    glow.addColorStop(0.5, withAlpha("#EAB308", intensity * 0.18));
    glow.addColorStop(1, "rgba(234,179,8,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(layout.core.left - 80, layout.core.top - 80, layout.core.width + 160, layout.core.height + 160);
    drawSaturationHalo(ctx, layout, x, saturation);
    drawFluxArrows(ctx, layout, x, flux, color);
  }
  ctx.restore();
}

function drawSaturationHalo(ctx, layout, x, saturation) {
  if (saturation < 0.04) return;
  ctx.save();
  const radius = (58 + saturation * 90) * layout.scale;
  const halo = ctx.createRadialGradient(x, layout.centerY, 8, x, layout.centerY, radius);
  halo.addColorStop(0, `rgba(244,63,94,${0.12 + saturation * 0.34})`);
  halo.addColorStop(1, "rgba(244,63,94,0)");
  ctx.fillStyle = halo;
  ctx.fillRect(x - radius, layout.centerY - radius, radius * 2, radius * 2);
  ctx.restore();
}

function drawFluxArrows(ctx, layout, x, flux, color) {
  const direction = flux >= 0 ? 1 : -1;
  ctx.save();
  ctx.strokeStyle = withAlpha(color, 0.82);
  ctx.fillStyle = withAlpha(color, 0.82);
  ctx.lineWidth = 2 * layout.scale;
  for (let n = 0; n < 4; n += 1) {
    const y = layout.core.top + (n + 1) * (layout.core.height / 5);
    ctx.beginPath();
    ctx.moveTo(x, y - 16 * direction * layout.scale);
    ctx.lineTo(x, y + 16 * direction * layout.scale);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y + 20 * direction * layout.scale);
    ctx.lineTo(x - 6 * layout.scale, y + 9 * direction * layout.scale);
    ctx.lineTo(x + 6 * layout.scale, y + 9 * direction * layout.scale);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();
}

function drawCoils(ctx, layout, state) {
  const count = phaseCount(state.phaseMode);
  for (let phase = 0; phase < count; phase += 1) {
    drawCoilPath(ctx, layout, "primary", PHASES[phase].color, phase);
    drawCoilPath(ctx, layout, "secondary", "#A855F7", phase);
  }
}

function drawCoilPath(ctx, layout, side, color, phaseIndex) {
  ctx.save();
  ctx.strokeStyle = withAlpha(color, 0.86);
  ctx.lineWidth = 4 * layout.scale;
  ctx.shadowColor = withAlpha(color, 0.4);
  ctx.shadowBlur = 14 * layout.scale;
  ctx.beginPath();
  for (let i = 0; i <= 140; i += 1) {
    const p = coilPoint(layout, side, i / 140, phaseIndex);
    if (i === 0) ctx.moveTo(p.x, p.y);
    else ctx.lineTo(p.x, p.y);
  }
  ctx.stroke();
  ctx.restore();
}

function drawParticles(ctx, layout, state, particles) {
  const count = phaseCount(state.phaseMode);
  for (const particle of particles.primary) {
    if (particle.phase >= count) continue;
    drawParticle(ctx, coilPoint(layout, "primary", particle.progress, particle.phase), activeParticleColor(particle.phase));
  }
  for (const particle of particles.secondary) {
    if (particle.phase >= count) continue;
    drawParticle(ctx, coilPoint(layout, "secondary", particle.progress, particle.phase), "#C084FC");
  }
}

function drawParticle(ctx, point, color) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.shadowColor = color;
  ctx.shadowBlur = 12;
  ctx.beginPath();
  ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawProblemEffects(ctx, layout, state) {
  const diagnostics = state.diagnostics ?? [];
  if (diagnostics.some((item) => item.code === "CORE_SATURATION" || item.code === "LOW_FREQUENCY")) {
    drawCoreStress(ctx, layout, state);
  }
  if (diagnostics.some((item) => item.code === "OVERVOLTAGE" || item.code === "INRUSH_SPIKE")) {
    drawElectricalSparks(ctx, layout, state);
  }
  if (diagnostics.some((item) => item.code === "HIGH_HYSTERESIS")) {
    drawHeatVeil(ctx, layout, state);
  }
}

function drawCoreStress(ctx, layout, state) {
  const pulse = 0.5 + Math.sin(state.time * 42) * 0.5;
  const jitter = Math.sin(state.time * 90) * 3 * layout.scale;
  ctx.save();
  ctx.strokeStyle = `rgba(239,68,68,${0.28 + pulse * 0.26})`;
  ctx.lineWidth = 3 * layout.scale;
  ctx.shadowColor = "#EF4444";
  ctx.shadowBlur = 22 * layout.scale;
  ctx.strokeRect(
    layout.core.left - 8 * layout.scale + jitter,
    layout.core.top - 8 * layout.scale,
    layout.core.width + 16 * layout.scale,
    layout.core.height + 16 * layout.scale,
  );
  ctx.restore();
}

function drawElectricalSparks(ctx, layout, state) {
  ctx.save();
  ctx.strokeStyle = "rgba(255,255,255,0.92)";
  ctx.shadowColor = "#00F0FF";
  ctx.shadowBlur = 16;
  ctx.lineWidth = 2 * layout.scale;
  for (let i = 0; i < 5; i += 1) {
    const seed = state.time * 14 + i * 1.7;
    const baseY = layout.coilTop + ((Math.sin(seed) + 1) / 2) * (layout.coilBottom - layout.coilTop);
    const x = layout.secondaryX + 34 * layout.scale;
    ctx.beginPath();
    ctx.moveTo(x, baseY);
    ctx.lineTo(x + (12 + Math.sin(seed * 2) * 9) * layout.scale, baseY - 8 * layout.scale);
    ctx.lineTo(x + (22 + Math.cos(seed * 3) * 10) * layout.scale, baseY + 5 * layout.scale);
    ctx.stroke();
  }
  ctx.restore();
}

function drawHeatVeil(ctx, layout, state) {
  const alpha = 0.06 + Math.abs(Math.sin(state.time * 9)) * 0.08;
  ctx.save();
  const heat = ctx.createLinearGradient(layout.core.left, layout.core.top, layout.core.right, layout.core.bottom);
  heat.addColorStop(0, `rgba(245,158,11,${alpha})`);
  heat.addColorStop(0.5, `rgba(239,68,68,${alpha * 0.9})`);
  heat.addColorStop(1, "rgba(245,158,11,0)");
  ctx.fillStyle = heat;
  ctx.fillRect(layout.core.left - 60, layout.core.top - 50, layout.core.width + 120, layout.core.height + 100);
  ctx.restore();
}

function drawLabels(ctx, layout, state) {
  ctx.save();
  ctx.fillStyle = "rgba(248,250,252,0.92)";
  ctx.font = "700 13px Inter, sans-serif";
  ctx.textAlign = "center";
  const compact = layout.core.width < 230;
  ctx.fillText("Primario", layout.primaryX, layout.coilTop - 24 * layout.scale);
  ctx.fillText("Nucleo ferromagnetico", layout.centerX, layout.core.top - 34 * layout.scale);
  ctx.fillText(compact ? "Sec." : "Secundario", layout.secondaryX, layout.coilTop - 24 * layout.scale);
  ctx.fillStyle = "rgba(156,163,175,0.95)";
  ctx.font = "12px Inter, sans-serif";
  ctx.fillText(state.phaseMode === "three" ? "3 fases / 120 graus" : "1 fase senoidal", layout.centerX, layout.core.bottom + 48 * layout.scale);
  drawCoreReadout(ctx, layout, state);
  ctx.restore();
}

function drawCoreReadout(ctx, layout, state) {
  const saturation = saturationLevelAt(state.time, state, 0);
  const im = magnetizingCurrentAt(state.time, state, 0);
  const x = layout.centerX;
  const y = layout.core.bottom + 70 * layout.scale;
  ctx.fillStyle = saturation > 0.28 ? "rgba(244,63,94,0.96)" : "rgba(34,197,94,0.88)";
  ctx.font = "700 11px Inter, sans-serif";
  ctx.fillText(`Im ${im.toFixed(2)} | sat ${(saturation * 100).toFixed(0)}%`, x, y);
}

function withAlpha(hex, alpha) {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
