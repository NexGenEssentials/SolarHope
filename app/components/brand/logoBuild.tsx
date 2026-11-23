"use client";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { cell, SLANT } from "./brandLines";

// The logo concept as an animation: cells of a solar panel grid light up one
// by one, tracing an S; then the grid fades and the cells join into the mark.
// Plays once when scrolled into view; "Watch again" replays it. Visitors who
// prefer reduced motion see the finished mark straight away.

export const COLS = 5;
export const ROWS = 6;
export const W = 66; // column pitch
export const H = 44; // row pitch
const S = H * SLANT; // horizontal shift per row (the logo's lean)
const GAP = 2.5;
const RAD = 6;
const GOLD = "#EA9D13";

/** Bottom-left x of the cell at row r, column c. */
export const bx = (r: number, c: number) => c * W + (ROWS - r - 1) * S;

/** Parallelogram covering `n` cells from (r, c), inset by GAP. */
export const piece = (r: number, c: number, n = 1, rad = RAD) =>
  cell(bx(r, c) + GAP, r * H + GAP, n * W - 2 * GAP, H - 2 * GAP, rad);

// The S, cell by cell, in the order it is "drawn".
const ORDER: [number, number][] = [
  [1, 2],
  [2, 2],
  [2, 1],
  [3, 2],
  [3, 3],
  [4, 2],
];
// The finished mark: top cell, two bars, bottom cell.
export const MARK: [number, number, number][] = [
  [1, 2, 1],
  [2, 1, 2],
  [3, 2, 2],
  [4, 2, 1],
];

const STEP = 260; // ms between cells
const VIEW_W = COLS * W + ROWS * S;
const VIEW_H = ROWS * H;

export default function LogoBuild() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.4 });
  // 0 = grid only, 1 = cells lighting up, 2 = finished mark
  const [phase, setPhase] = useState(0);
  const [run, setRun] = useState(0);
  const [caption, setCaption] = useState("A solar panel grid. Boring? Watch.");

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase(2);
      setCaption("Ta-da! S for Solar (and for Hope).");
      return;
    }
    setPhase(0);
    setCaption("A solar panel grid. Boring? Watch.");
    const steps: [number, string][] = [
      [400, "One panel…"],
      [400 + 2 * STEP, "Two… three…"],
      [400 + 4 * STEP, "Getting there…"],
    ];
    const timers = steps.map(([t, text]) => setTimeout(() => setCaption(text), t));
    timers.push(setTimeout(() => setPhase(1), 400));
    timers.push(
      setTimeout(() => {
        setPhase(2);
        setCaption("Ta-da! S for Solar (and for Hope).");
      }, 400 + ORDER.length * STEP + 700),
    );
    return () => timers.forEach(clearTimeout);
  }, [inView, run]);

  return (
    <div ref={ref} className="w-full max-w-lg space-y-4">
      <svg
        viewBox={`-10 -10 ${VIEW_W + 20} ${VIEW_H + 20}`}
        className="w-full h-auto"
        role="img"
        aria-label="Cells of a solar panel grid light up to form the S of the SolarHope logo"
      >
        {/* The panel grid */}
        <g
          className="transition-opacity duration-1000"
          style={{ opacity: phase === 2 ? 0 : 1 }}
        >
          {Array.from({ length: ROWS }, (_, r) =>
            Array.from({ length: COLS }, (_, c) => (
              <path
                key={`${r}-${c}`}
                d={cell(bx(r, c), r * H, W, H, 0)}
                fill="none"
                stroke="#CBD5E1"
                strokeWidth={1}
                vectorEffect="non-scaling-stroke"
              />
            )),
          )}
        </g>

        {/* Cells lighting up in order */}
        {ORDER.map(([r, c], i) => (
          <path
            key={`lit-${r}-${c}`}
            d={piece(r, c)}
            fill={GOLD}
            className="transition-opacity duration-500"
            style={{
              opacity: phase === 1 ? 1 : 0,
              transitionDelay: phase === 1 ? `${i * STEP}ms` : "0ms",
            }}
          />
        ))}

        {/* The finished mark */}
        {MARK.map(([r, c, n]) => (
          <path
            key={`mark-${r}-${c}`}
            d={piece(r, c, n, 9)}
            fill={GOLD}
            className="transition-opacity duration-700"
            style={{ opacity: phase === 2 ? 1 : 0 }}
          />
        ))}
      </svg>

      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-sm">
        <p className="text-gray-500">
          {caption}
        </p>
        <button
          type="button"
          onClick={() => setRun((n) => n + 1)}
          className={`font-semibold text-gray-800 hover:text-yellow transition-opacity ${
            phase === 2 ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          Watch again ↻
        </button>
      </div>
    </div>
  );
}
