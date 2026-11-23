"use client";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { cell, SLANT } from "./brandLines";

// "Be the sun": a field of panel cells in the brand pattern's layout. Moving
// the pointer (or tapping) over it lights up the cells nearby, which then
// fade back. The faint outlines are always visible.

const CW = 150; // cell width
const CH = 100; // cell height
const GX = 26; // gaps
const GY = 22;
const TILT = -12; // the pattern's rotation, degrees
const RADIUS = 115; // how far the "sun" reaches, px in pattern space

type Cell = { id: number; d: string; cx: number; cy: number };

export default function SunPattern({
  width = 1600,
  height = 420,
}: {
  width?: number;
  height?: number;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [lit, setLit] = useState<Record<number, number>>({});

  const cells = useMemo<Cell[]>(() => {
    const out: Cell[] = [];
    let id = 0;
    const cols = Math.ceil(width / (CW + GX)) + 4;
    const rows = Math.ceil(height / (CH + GY)) + 4;
    for (let r = -2; r < rows; r++) {
      for (let c = -2; c < cols; c++) {
        // Offset every other row, like the brand pattern.
        const x = c * (CW + GX) + (r % 2 ? (CW + GX) / 2 : 0);
        const y = r * (CH + GY);
        out.push({
          id: id++,
          d: cell(x, y, CW - CH * SLANT, CH, 12),
          cx: x + CW / 2,
          cy: y + CH / 2,
        });
      }
    }
    return out;
  }, [width, height]);

  const shine = useCallback(
    (clientX: number, clientY: number) => {
      const svg = svgRef.current;
      if (!svg) return;
      const pt = svg.createSVGPoint();
      pt.x = clientX;
      pt.y = clientY;
      const g = svg.querySelector("g[data-grid]") as SVGGElement | null;
      const m = g?.getScreenCTM();
      if (!m) return;
      const p = pt.matrixTransform(m.inverse());
      const now = Date.now();
      setLit((prev) => {
        const next: Record<number, number> = {};
        for (const [k, t] of Object.entries(prev)) if (now - t < 500) next[+k] = t;
        for (const c of cells) {
          if (Math.hypot(c.cx - p.x, c.cy - p.y) < RADIUS) next[c.id] = now;
        }
        return next;
      });
    },
    [cells],
  );

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full -z-10 touch-none"
      onPointerMove={(e) => shine(e.clientX, e.clientY)}
      onPointerDown={(e) => shine(e.clientX, e.clientY)}
      aria-hidden="true"
    >
      <g data-grid transform={`rotate(${TILT} ${width / 2} ${height / 2})`}>
        {cells.map((c) => {
          const on = lit[c.id] !== undefined;
          return (
            <path
              key={c.id}
              d={c.d}
              stroke="#EA9D13"
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
              fill="#EA9D13"
              className="transition-[fill-opacity] ease-out"
              style={{
                fillOpacity: on ? 0.5 : 0,
                strokeOpacity: 0.55,
                transitionDuration: on ? "150ms" : "1200ms",
              }}
            />
          );
        })}
      </g>
    </svg>
  );
}
