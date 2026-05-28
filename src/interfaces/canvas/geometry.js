export function buildLayout(width, height, zoom) {
  const centerX = width * 0.5;
  const centerY = height * 0.52;
  const scale = Math.min(width / 980, height / 560) * zoom;
  const coreWidth = 430 * scale;
  const coreHeight = 310 * scale;
  const sideOffset = Math.min(132 * scale, Math.max(44 * scale, width * 0.22));
  const columnGap = coreWidth / 3;
  const top = centerY - coreHeight / 2;
  const bottom = centerY + coreHeight / 2;
  const left = centerX - coreWidth / 2;
  const right = centerX + coreWidth / 2;
  const columns = [left + columnGap * 0.5, centerX, right - columnGap * 0.5];

  return {
    centerX,
    centerY,
    scale,
    core: { left, right, top, bottom, width: coreWidth, height: coreHeight, columns },
    primaryX: left - sideOffset,
    secondaryX: right + sideOffset,
    coilTop: top + 28 * scale,
    coilBottom: bottom - 28 * scale,
  };
}

export function coilPoint(layout, side, progress, phaseIndex = 0) {
  const laneOffset = (phaseIndex - 1) * 42 * layout.scale;
  const xBase = side === "primary" ? layout.primaryX : layout.secondaryX;
  const y = layout.coilTop + (layout.coilBottom - layout.coilTop) * progress;
  const turn = Math.sin(progress * Math.PI * 12);
  const depth = Math.cos(progress * Math.PI * 12);
  const x = xBase + laneOffset + turn * 24 * layout.scale;
  return { x, y, radius: (2.4 + Math.max(0, depth) * 2.2) * layout.scale };
}
