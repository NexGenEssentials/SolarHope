"use client";
import React, { useState } from "react";
import { MARK, piece, H, W, ROWS, bx } from "./logoBuild";

// The S mark for the Behind the S hero. Its four pieces drop in one by one;
// poke it and they burst apart, then snap back. Under reduced motion it just
// sits there looking good.

// Where each piece flies to when poked (px, px, deg).
const BURST: [number, number, number][] = [
  [60, -70, 25],
  [-90, -20, -20],
  [90, 25, 18],
  [-50, 75, -28],
];

const GOLD = "#EA9D13";

export default function PlayfulS() {
  const [burst, setBurst] = useState(false);
  const [pokes, setPokes] = useState(0);

  const poke = () => {
    if (burst) return;
    setBurst(true);
    setPokes((n) => n + 1);
    setTimeout(() => setBurst(false), 650);
  };

  // Crop the viewBox to the mark itself (rows 1–4, columns 1–3).
  const x0 = bx(4, 1) - 6;
  const x1 = bx(1, 3) + W + 6;
  const y0 = 1 * H - 6;
  const y1 = (ROWS - 1) * H + 6;

  const lines = ["Go on, poke it.", "Again?", "It always comes back.", "OK, it likes you."];

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        type="button"
        onClick={poke}
        aria-label="Poke the S"
        className="group cursor-pointer select-none"
      >
        <svg viewBox={`${x0} ${y0} ${x1 - x0} ${y1 - y0}`} className="w-36 sm:w-44 h-auto overflow-visible group-hover:animate-[wiggle_0.4s_ease-in-out]">
          {MARK.map(([r, c, n], i) => (
            <g
              key={i}
              className="transition-transform duration-500 ease-[cubic-bezier(.34,1.56,.64,1)]"
              style={{
                transform: burst
                  ? `translate(${BURST[i][0]}px, ${BURST[i][1]}px) rotate(${BURST[i][2]}deg)`
                  : "none",
                transformBox: "fill-box",
                transformOrigin: "center",
              }}
            >
              <path
                d={piece(r, c, n, 9)}
                fill={GOLD}
                className="animate-[drop-in_0.8s_ease-out_both]"
                style={{
                  animationDelay: `${200 + i * 180}ms`,
                  transformBox: "fill-box",
                  transformOrigin: "center",
                }}
              />
            </g>
          ))}
        </svg>
      </button>
      <p className="text-xs text-white/50 h-4" aria-live="polite">
        {lines[Math.min(pokes, lines.length - 1)]}
      </p>
    </div>
  );
}
