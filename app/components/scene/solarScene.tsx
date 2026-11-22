"use client";
import React, { useEffect, useRef, useState } from "react";

// Realistic day/night scene with glowing current drawn over the cables in the
// pictures. Each mode has its own image and its own traced runs and cards, so
// day and night pictures do not need identical framing. Illustrative only.

export type Mode = "day" | "night";

export type SceneCard = {
  x: number;
  y: number;
  /** Positions used on narrow screens, where cards are enlarged. */
  xNarrow?: number;
  yNarrow?: number;
  w?: number;
  label: string;
  /** Use "%BATTERY%" to show the animated battery percentage. */
  value: string;
  to: [number, number];
  tone?: string;
};

export type SceneLayer = {
  image: string;
  alt: string;
  /** Live cable runs (SVG path data in image pixels). */
  runs: { d: string; reverse?: boolean }[];
  cards: SceneCard[];
  /** Red "off" marker, e.g. on the grid cable during a power cut. */
  offMarker?: [number, number];
};

export type SceneConfig = {
  width: number;
  height: number;
  /** Band of the picture shown on wide screens (narrow screens show it all). */
  crop: { y0: number; hc: number };
  day: SceneLayer;
  night: SceneLayer;
  captions: Record<Mode, string>;
  battery: Record<Mode, number>;
};

const GREEN = "#4ADE80";

function Run({ d, reverse = false }: { d: string; reverse?: boolean }) {
  const flow = { animationDirection: reverse ? "reverse" : "normal" } as const;
  return (
    <g>
      <path d={d} fill="none" stroke={GREEN} strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" opacity={0.22} filter="url(#scene-glow)" />
      <path d={d} fill="none" stroke={GREEN} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" opacity={0.45} />
      <path d={d} fill="none" stroke={GREEN} strokeWidth={14} strokeLinecap="round" strokeLinejoin="round"
        strokeDasharray="10 22" filter="url(#scene-glow)" opacity={0.95}
        className="animate-[flow_0.7s_linear_infinite]" style={flow} />
      <path d={d} fill="none" stroke="#ECFDF5" strokeWidth={6} strokeLinecap="round" strokeLinejoin="round"
        strokeDasharray="3 29" className="animate-[flow_0.7s_linear_infinite]" style={flow} />
    </g>
  );
}

function useCountTo(target: number, ms = 4500) {
  const [v, setV] = useState(target);
  const from = useRef(target);
  useEffect(() => {
    const start = performance.now();
    const a = from.current;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / ms);
      const val = a + (target - a) * (1 - Math.pow(1 - p, 3));
      setV(val);
      from.current = val;
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, ms]);
  return Math.round(v);
}

const TABS: { key: Mode; tab: string }[] = [
  { key: "day", tab: "Daytime" },
  { key: "night", tab: "Power cut at night" },
];

export default function SolarScene({ config }: { config: SceneConfig }) {
  const [mode, setMode] = useState<Mode>("day");
  const [auto, setAuto] = useState(true);
  const battery = useCountTo(config.battery[mode]);
  const { width: W, height: H } = config;
  // With no labels on the picture, the short band works on every screen size.
  const { y0, hc } = config.crop;
  const objectPosition = `50% ${hc === H ? 0 : (y0 / (H - hc)) * 100}%`;

  useEffect(() => {
    if (!auto) return;
    const t = setInterval(() => setMode((m) => (m === "day" ? "night" : "day")), 6000);
    return () => clearInterval(t);
  }, [auto]);

  const layer = (m: Mode) => {
    const L = config[m];
    return (
      <div key={m} className="absolute inset-0 transition-opacity duration-1000" style={{ opacity: mode === m ? 1 : 0 }} aria-hidden={mode !== m}>
        <img src={L.image} alt={L.alt} className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition }} />
        <svg viewBox={`0 ${y0} ${W} ${hc}`} className="absolute inset-0 w-full h-full">
          {L.runs.map((r, i) => (
            <Run key={i} d={r.d} reverse={r.reverse} />
          ))}
          {L.offMarker && (
            <g>
              <circle cx={L.offMarker[0]} cy={L.offMarker[1]} r={26} fill="#EF4444" stroke="#fff" strokeWidth={4} />
              <path
                d={`M ${L.offMarker[0] - 12} ${L.offMarker[1] - 12} L ${L.offMarker[0] + 12} ${L.offMarker[1] + 12} M ${L.offMarker[0] + 12} ${L.offMarker[1] - 12} L ${L.offMarker[0] - 12} ${L.offMarker[1] + 12}`}
                stroke="#fff" strokeWidth={6} strokeLinecap="round"
              />
            </g>
          )}
        </svg>
      </div>
    );
  };

  return (
    <div className="space-y-5">
      <div role="tablist" aria-label="When" className="inline-flex rounded-full bg-[#F2F4F7] p-1">
        {TABS.map((m) => (
          <button
            key={m.key}
            role="tab"
            aria-selected={mode === m.key}
            onClick={() => { setAuto(false); setMode(m.key); }}
            className={`px-5 py-2 text-sm font-semibold rounded-full transition-colors ${
              mode === m.key ? "bg-dark-blue text-white" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {m.tab}
          </button>
        ))}
      </div>

      <div role="img" aria-label={config.captions[mode]}
        className="relative w-full overflow-hidden rounded-2xl shadow-xl" style={{ aspectRatio: `${W} / ${hc}` }}>
        <svg width="0" height="0" className="absolute">
          <defs>
            <filter id="scene-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" />
            </filter>
          </defs>
        </svg>
        {layer("day")}
        {layer("night")}
      </div>

      <ul className="flex flex-wrap gap-2" aria-label="System status">
        {config[mode].cards.map((c) => {
          const value = c.value.replace("%BATTERY%", `${battery}%`);
          const tone =
            c.tone === "#DC2626" ? "text-red-600" : c.tone === "#64748B" ? "text-gray-500" : "text-dark-blue";
          return (
            <li key={c.label} className="flex items-center gap-2 rounded-full bg-[#F2F4F7] px-3 py-1.5 text-sm">
              <span
                className={`h-2 w-2 rounded-full ${
                  c.tone === "#DC2626" ? "bg-red-500" : c.tone === "#64748B" ? "bg-gray-400" : "bg-green-500"
                }`}
              />
              <span className="text-gray-500 capitalize">{c.label.toLowerCase()}</span>
              <span className={`font-semibold ${tone}`}>{value}</span>
            </li>
          );
        })}
      </ul>

      <p key={mode} className="text-lg text-gray-700 font-medium animate-[rise_0.5s_ease-out_both]">
        {config.captions[mode]}
      </p>
    </div>
  );
}
