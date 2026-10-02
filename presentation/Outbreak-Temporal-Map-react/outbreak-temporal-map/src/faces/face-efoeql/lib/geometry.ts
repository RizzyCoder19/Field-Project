export const MONTH_KEYS = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
] as const;

export const BAND_W = 1100;
export const BAND_H = 120;
export const BAND_BASE = 106;
export const BAND_TOP = 10;
export const SCALE_MAX = 40;

export function xAt(i: number) {
  return (i / 11) * BAND_W;
}

export function yAt(v: number) {
  const span = BAND_BASE - BAND_TOP;
  const clamped = Math.max(0, Math.min(SCALE_MAX, v));
  return BAND_BASE - (clamped / SCALE_MAX) * span;
}

/** Catmull-Rom through the points, converted to cubic beziers. */
export function smoothPath(values: number[]) {
  const pts = values.map((v, i) => ({ x: xAt(i), y: yAt(v) }));
  if (pts.length === 0) return "";
  let d = `M ${pts[0].x.toFixed(2)} ${pts[0].y.toFixed(2)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? pts[i + 1];
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = Math.min(BAND_BASE, p1.y + (p2.y - p0.y) / 6);
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = Math.min(BAND_BASE, p2.y - (p3.y - p1.y) / 6);
    d += ` C ${c1x.toFixed(2)} ${c1y.toFixed(2)}, ${c2x.toFixed(2)} ${c2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
  }
  return d;
}

export function areaPath(values: number[]) {
  const line = smoothPath(values);
  if (!line) return "";
  return `${line} L ${BAND_W} ${BAND_BASE} L 0 ${BAND_BASE} Z`;
}

export const SERIES_COLORS = [
  "var(--ember)",
  "var(--petrol)",
  "var(--chartreuse)",
  "var(--ink)",
  "var(--rule-strong)",
];

export function parseRow(row: Record<string, unknown>) {
  return MONTH_KEYS.map((k) => {
    const n = Number(String(row[k] ?? "0").replace(/[^0-9.-]/g, ""));
    return Number.isFinite(n) ? n : 0;
  });
}

export function parsePeaks(raw: string, monthLabels: string[]) {
  return String(raw ?? "")
    .split(/[,/]/)
    .map((s) => s.trim().toUpperCase())
    .filter(Boolean)
    .map((label) => monthLabels.findIndex((m) => m.toUpperCase() === label))
    .filter((i) => i >= 0);
}
