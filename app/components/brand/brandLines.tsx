import React from "react";

// Thin gold outlines of the logo's slanted, rounded "panel cell", as used on
// the brand presentation (dark slides, ID badge, bottle, tote bag). Purely
// decorative: place inside a `relative overflow-hidden` dark section.

// The logo cells lean right by about 13 degrees.
const SLANT = Math.tan((13 * Math.PI) / 180);

/** Rounded parallelogram: top edge from (x + s, y), leaning right. */
function cell(x: number, y: number, w: number, h: number, r: number) {
  const s = h * SLANT;
  const pts: [number, number][] = [
    [x + s, y],
    [x + s + w, y],
    [x + w, y + h],
    [x, y + h],
  ];
  const n = pts.length;
  let d = "";
  for (let i = 0; i < n; i++) {
    const [px, py] = pts[i];
    const [ax, ay] = pts[(i - 1 + n) % n];
    const [bx, by] = pts[(i + 1) % n];
    const la = Math.hypot(ax - px, ay - py);
    const lb = Math.hypot(bx - px, by - py);
    const inX = px + ((ax - px) / la) * r;
    const inY = py + ((ay - py) / la) * r;
    const outX = px + ((bx - px) / lb) * r;
    const outY = py + ((by - py) / lb) * r;
    d += `${i === 0 ? "M" : "L"} ${inX.toFixed(1)} ${inY.toFixed(1)} Q ${px} ${py} ${outX.toFixed(1)} ${outY.toFixed(1)} `;
  }
  return d + "Z";
}

// Two cells side by side and one below, offset like the logo's "S".
const W = 360;
const H = 250;
const GAP = 22;
const R = 22;
const PATHS = [
  cell(0, 0, W, H, R),
  cell(W + GAP, 0, W, H, R),
  cell(-H * SLANT - GAP * 0.2, H + GAP, W, H, R),
];

export default function BrandLines({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox={`${-H * SLANT - 40} -10 ${2 * W + GAP + H * SLANT + 120} ${2 * H + GAP + 20}`}
      className={`pointer-events-none absolute ${className}`}
      fill="none"
    >
      {PATHS.map((d, i) => (
        <path key={i} d={d} stroke="#EA9D13" strokeWidth={1.2} vectorEffect="non-scaling-stroke" />
      ))}
    </svg>
  );
}

/**
 * One solid gold logo cell, cut off by the section edge, as on the brand
 * polo shirts and bottle. Bolder than the lines: use in one place only.
 */
export function BrandBlock({ className = "" }: { className?: string }) {
  const w = 420;
  const h = 300;
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox={`0 0 ${w + h * SLANT} ${h}`}
      className={`pointer-events-none absolute ${className}`}
    >
      <path d={cell(0, 0, w, h, 34)} fill="#EA9D13" />
    </svg>
  );
}
