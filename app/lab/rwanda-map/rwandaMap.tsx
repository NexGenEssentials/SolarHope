"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";
import { CELLS, CENTROIDS, DISTRICTS, MAP_H, MAP_W, OUTLINES } from "./mapData";

// PROTOTYPE — "Light up Rwanda".
// Rwanda drawn in SolarHope's slanted panel cells. Cells fly in and assemble
// into the country (sweeping east like the sunrise); districts with
// installations glow gold. Hover or tap a district to see what is there.

// SAMPLE DATA — replace with the real project list (district + type only,
// no client names without written permission).
const PROJECTS: Record<string, { label: string; real?: boolean }[]> = {
  Nyagatare: [{ label: "Family home · rooftop system", real: true }],
  Gasabo: [{ label: "Bar & restaurant (sample)" }, { label: "Family home (sample)" }],
  Kicukiro: [{ label: "Office (sample)" }],
  Nyarugenge: [{ label: "Shop (sample)" }],
  Ruhango: [{ label: "Boarding school (sample)" }],
  Musanze: [{ label: "Health centre (sample)" }],
  Rwamagana: [{ label: "Workshop (sample)" }],
};

const SLANT = Math.tan((13 * Math.PI) / 180);
const CW = 24;
const CH = 16;
const cellPath = (x: number, y: number) => {
  const s = CH * SLANT;
  const x0 = x - CW / 2;
  const y0 = y - CH / 2;
  return `M${(x0 + s).toFixed(1)} ${y0.toFixed(1)}h${CW - s}l${-s} ${CH}h${-(CW - s)}Z`;
};

// Stable pseudo-random scatter for the fly-in.
const rand = (i: number, k: number) => {
  const v = Math.sin(i * 12.9898 + k * 78.233) * 43758.5453;
  return v - Math.floor(v);
};

export default function RwandaMap() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.25 });
  const [assembled, setAssembled] = useState(false);
  // Scatter positions are only computed in the browser (avoids a server/client
  // mismatch); the server renders the cells hidden and in place.
  const [mounted, setMounted] = useState(false);
  const [hover, setHover] = useState<number | null>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(matchMedia("(prefers-reduced-motion: reduce)").matches);
    setMounted(true);
  }, []);
  useEffect(() => {
    if (!inView || !mounted) return;
    const t = setTimeout(() => setAssembled(true), 60);
    return () => clearTimeout(t);
  }, [inView, mounted]);

  const active = useMemo(() => new Set(DISTRICTS.map((d, i) => (PROJECTS[d] ? i : -1)).filter((i) => i >= 0)), []);
  const projectCount = Object.values(PROJECTS).reduce((n, p) => n + p.length, 0);
  const sel = hover ?? DISTRICTS.indexOf("Nyagatare");
  const selName = DISTRICTS[sel];
  const selProjects = PROJECTS[selName];

  return (
    <div ref={ref} className="grid lg:grid-cols-[1.7fr_1fr] gap-10 items-center">
      <div className="relative">
        <svg viewBox={`-20 -20 ${MAP_W + 40} ${MAP_H + 40}`} className="w-full h-auto max-h-[78vh] overflow-visible" role="img"
          aria-label="Map of Rwanda made of solar panel cells; districts with SolarHope installations glow gold">
          <defs>
            <filter id="rm-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Faint district borders, highlighted on hover */}
          {OUTLINES.map((d, i) => (
            <path key={i} d={d} fill="none" stroke={i === hover ? "#EA9D13" : "#ffffff"} strokeOpacity={i === hover ? 0.9 : 0.06}
              strokeWidth={i === hover ? 2 : 1} style={{ transition: "stroke-opacity 0.3s" }} />
          ))}

          {CELLS.map(([x, y, d], i) => {
            const on = active.has(d);
            const hl = d === hover;
            // Fly in from a scattered position, sweeping west -> east.
            const delay = reduced ? 0 : (x / MAP_W) * 900 + rand(i, 1) * 350;
            const scatter = mounted && !assembled && !reduced;
            const tx = scatter ? Math.round((rand(i, 2) - 0.5) * 260) : 0;
            const ty = scatter ? Math.round((rand(i, 3) - 0.5) * 260 - 60) : 0;
            const rot = scatter ? Math.round((rand(i, 4) - 0.5) * 90) : 0;
            return (
              <path
                key={i}
                d={cellPath(x, y)}
                onMouseEnter={() => setHover(d)}
                onClick={() => setHover(d)}
                fill={on ? "#EA9D13" : hl ? "#EA9D13" : "#1c3352"}
                fillOpacity={on ? (hl ? 1 : 0.85) : hl ? 0.35 : 1}
                stroke={on ? "#ffd27a" : "#2d4a73"}
                strokeWidth={0.8}
                filter={on && hl ? "url(#rm-glow)" : undefined}
                className={on && assembled && !reduced ? "animate-[cellglow_3s_ease-in-out_infinite]" : ""}
                style={{
                  cursor: "pointer",
                  opacity: assembled || (mounted && reduced) ? 1 : 0,
                  transform: `translate(${tx}px, ${ty}px) rotate(${rot}deg)`,
                  transformBox: "fill-box",
                  transformOrigin: "center",
                  transition: assembled
                    ? `transform 1.1s cubic-bezier(.2,.8,.2,1) ${Math.round(delay)}ms, opacity 0.8s ease ${Math.round(delay)}ms, fill-opacity 0.3s`
                    : "none",
                  animationDelay: `${((x / MAP_W) * 2).toFixed(2)}s`,
                }}
              />
            );
          })}

          {/* Pins on active districts */}
          {[...active].map((d) => {
            const [cx, cy] = CENTROIDS[d];
            return (
              <g key={d} style={{ opacity: assembled ? 1 : 0, transition: "opacity 0.6s ease 1.6s" }} pointerEvents="none">
                <circle cx={cx} cy={cy} r={7} fill="#fff" />
                <circle cx={cx} cy={cy} r={7} fill="none" stroke="#fff" strokeWidth={2}
                  className={reduced ? "" : "animate-ping"} style={{ transformBox: "fill-box", transformOrigin: "center" }} />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Side panel */}
      <div className="space-y-6 text-white">
        <div className="grid grid-cols-2 gap-4">
          <div className="border-l-2 border-yellow pl-4">
            <p className="text-4xl font-extrabold tabular-nums">{active.size}</p>
            <p className="text-sm text-white/60">districts lit up</p>
          </div>
          <div className="border-l-2 border-yellow pl-4">
            <p className="text-4xl font-extrabold tabular-nums">{projectCount}</p>
            <p className="text-sm text-white/60">installations</p>
          </div>
        </div>

        <div key={selName} className="rounded-2xl bg-white/5 border border-white/10 p-6 animate-[rise_0.35s_ease-out_both]">
          <p className="text-xs uppercase tracking-widest text-yellow">District</p>
          <p className="mt-1 text-2xl font-bold">{selName}</p>
          {selProjects ? (
            <ul className="mt-4 space-y-2">
              {selProjects.map((p) => (
                <li key={p.label} className="flex items-center gap-3 text-white/85">
                  <span className="h-2.5 w-4 -skew-x-12 rounded-sm bg-yellow" />
                  {p.label}
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-4 space-y-3">
              <p className="text-white/70">No SolarHope installation here yet.</p>
              <a href="/#quote" className="inline-block rounded-md bg-yellow/90 hover:bg-yellow text-dark-blue font-bold text-sm px-4 py-2">
                Be the first in {selName}
              </a>
            </div>
          )}
        </div>
        <p className="text-sm text-white/50">Hover or tap any district.</p>
      </div>
    </div>
  );
}
