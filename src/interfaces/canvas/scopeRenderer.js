import {
  PHASES,
  phaseCount,
  hysteresisPointAt,
  magnetizingCurrentAt,
  primaryFluxAt,
  primaryVoltageAt,
  secondaryCurrentAt,
  secondaryVoltageAt,
} from "../../domain/physics.js";

export class ScopeRenderer {
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

  render(state) {
    const { width, height } = this.resize();
    const ctx = this.ctx;
    ctx.clearRect(0, 0, width, height);
    drawGrid(ctx, width, height);
    drawWaveSet(ctx, width, height, state);
    drawHysteresisInset(ctx, width, height, state);
    drawLegend(ctx, width);
  }
}

function drawGrid(ctx, width, height) {
  ctx.save();
  ctx.strokeStyle = "rgba(255,255,255,0.055)";
  ctx.lineWidth = 1;
  for (let x = 0; x <= width; x += 32) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y <= height; y += 28) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }
  ctx.strokeStyle = "rgba(255,255,255,0.16)";
  ctx.beginPath();
  ctx.moveTo(0, height / 2);
  ctx.lineTo(width, height / 2);
  ctx.stroke();
  ctx.restore();
}

function drawWaveSet(ctx, width, height, state) {
  const count = phaseCount(state.phaseMode);
  if (state.channels.vp) {
    for (let phase = 0; phase < count; phase += 1) {
      drawWave(ctx, width, height, state, (time) => primaryVoltageAt(time, state, phase) / 620, PHASES[phase].color, 2);
    }
  }
  if (state.channels.vs) drawWave(ctx, width, height, state, (time) => secondaryVoltageAt(time, state, 0) / 620, "#A855F7", 2);
  if (state.channels.is) drawWave(ctx, width, height, state, (time) => secondaryCurrentAt(time, state, 0) * 0.28, "#22C55E", 2);
  if (state.channels.phi) drawWave(ctx, width, height, state, (time) => primaryFluxAt(time, state, 0) * 0.44, "#EAB308", 2);
  if (state.channels.im) drawWave(ctx, width, height, state, (time) => magnetizingCurrentAt(time, state, 0) * 0.2, "#F43F5E", 2);
}

function drawWave(ctx, width, height, state, sample, color, lineWidth) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.shadowColor = color;
  ctx.shadowBlur = 10;
  ctx.beginPath();
  for (let x = 0; x <= width; x += 1) {
    const history = (width - x) / width;
    const time = state.time - history * 0.08;
    const y = height / 2 - sample(time) * height * 0.38;
    if (x === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.restore();
}

function drawLegend(ctx, width) {
  const items = [
    ["Vp", "#FF6B00"],
    ["Vs", "#A855F7"],
    ["Is", "#22C55E"],
    ["Phi", "#EAB308"],
    ["Im", "#F43F5E"],
  ];
  ctx.save();
  ctx.font = "700 12px Inter, sans-serif";
  ctx.textAlign = "right";
  items.forEach(([label, color], index) => {
    const x = width - 20 - index * 54;
    ctx.fillStyle = color;
    ctx.fillText(label, x, 24);
  });
  ctx.restore();
}

function drawHysteresisInset(ctx, width, height, state) {
  const size = Math.min(118, height - 44);
  if (size < 70) return;
  const x = 18;
  const y = 18;
  ctx.save();
  ctx.fillStyle = "rgba(15,23,42,0.62)";
  ctx.strokeStyle = "rgba(255,255,255,0.12)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(x, y, size, size, 8);
  ctx.fill();
  ctx.stroke();
  ctx.strokeStyle = "rgba(255,255,255,0.12)";
  ctx.beginPath();
  ctx.moveTo(x + size / 2, y + 12);
  ctx.lineTo(x + size / 2, y + size - 12);
  ctx.moveTo(x + 12, y + size / 2);
  ctx.lineTo(x + size - 12, y + size / 2);
  ctx.stroke();
  ctx.strokeStyle = "#F43F5E";
  ctx.shadowColor = "#F43F5E";
  ctx.shadowBlur = 8;
  ctx.beginPath();
  const samples = 120;
  for (let i = 0; i <= samples; i += 1) {
    const t = state.time - (samples - i) / samples / Math.max(1, state.frequency);
    const point = hysteresisPointAt(t, state, 0);
    const px = x + size / 2 + point.h * size * 0.22;
    const py = y + size / 2 - point.b * size * 0.42;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.stroke();
  ctx.shadowBlur = 0;
  ctx.fillStyle = "rgba(248,250,252,0.88)";
  ctx.font = "700 10px Inter, sans-serif";
  ctx.fillText("B-H", x + 12, y + 18);
  ctx.restore();
}
