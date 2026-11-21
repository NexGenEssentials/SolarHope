"use client";
import React, { useEffect, useState } from "react";

// Panels, grid, inverter, battery and the business, with power flowing along
// the lines. Two modes: daytime (sun runs the business and fills the battery)
// and a power cut at night (battery takes over, the business stays lit).

type Mode = "day" | "night";

const MODES: { key: Mode; tab: string; caption: string }[] = [
  {
    key: "day",
    tab: "Daytime",
    caption: "The sun runs your business and fills the battery at the same time.",
  },
  {
    key: "night",
    tab: "Power cut at night",
    caption: "The grid goes off. The battery takes over by itself, and your lights stay on.",
  },
];

const GOLD = "#FBBF24";
const NAVY = "#0f202e";
const MUTED = "#CBD5E1";

/** A line that shows moving dashes when active. */
function Flow({ d, active, reverse = false }: { d: string; active: boolean; reverse?: boolean }) {
  return (
    <g>
      <path d={d} fill="none" stroke={MUTED} strokeWidth={3} strokeLinecap="round" />
      <path
        d={d}
        fill="none"
        stroke={GOLD}
        strokeWidth={4}
        strokeLinecap="round"
        strokeDasharray="10 22"
        className="animate-[flow_0.9s_linear_infinite] transition-opacity duration-500"
        style={{ opacity: active ? 1 : 0, animationDirection: reverse ? "reverse" : "normal" }}
      />
    </g>
  );
}

function Label({ x, y, light, children }: { x: number; y: number; light: boolean; children: string }) {
  return (
    <text x={x} y={y} textAnchor="middle" fontSize="21" fontWeight="700" fill={light ? "#fff" : NAVY}>
      {children}
    </text>
  );
}

export default function EnergyFlow() {
  const [mode, setMode] = useState<Mode>("day");
  const [auto, setAuto] = useState(true);
  const day = mode === "day";

  // Switch between the two modes on its own until the visitor picks one.
  useEffect(() => {
    if (!auto) return;
    const t = setInterval(() => setMode((m) => (m === "day" ? "night" : "day")), 5000);
    return () => clearInterval(t);
  }, [auto]);

  const current = MODES.find((m) => m.key === mode)!;

  return (
    <div className="space-y-6">
      <div role="tablist" aria-label="When" className="inline-flex rounded-full bg-[#F2F4F7] p-1">
        {MODES.map((m) => (
          <button
            key={m.key}
            role="tab"
            aria-selected={mode === m.key}
            onClick={() => {
              setAuto(false);
              setMode(m.key);
            }}
            className={`px-5 py-2 text-sm font-semibold rounded-full transition-colors ${
              mode === m.key ? "bg-dark-blue text-white" : "text-gray-500 hover:text-gray-800"
            }`}
          >
            {m.tab}
          </button>
        ))}
      </div>

      <div
        className={`rounded-2xl border border-gray-200 transition-colors duration-700 ${
          day ? "bg-[#FFFBEB]" : "bg-[#0f202e]"
        }`}
      >
        <svg viewBox="0 0 900 410" className="w-full h-auto" role="img" aria-label={current.caption}>
          {/* ---- lines ---- */}
          {/* panels -> inverter */}
          <Flow d="M 190 110 L 330 110 Q 360 110 360 140 L 360 170" active={day} />
          {/* grid -> inverter (idle in both modes; shown cut at night) */}
          <Flow d="M 190 300 L 330 300 Q 360 300 360 270 L 360 240" active={false} />
          {/* inverter <-> battery: charging by day, discharging at night */}
          <Flow d="M 450 245 L 450 300" active reverse={!day} />
          {/* inverter -> business */}
          <Flow d="M 540 205 L 700 205" active />

          {/* grid cut marker */}
          <g className="transition-opacity duration-500" style={{ opacity: day ? 0 : 1 }}>
            <circle cx="265" cy="300" r="16" fill="#EF4444" />
            <path d="M 258 293 L 272 307 M 272 293 L 258 307" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
            <text x="265" y="335" textAnchor="middle" fontSize="13" fontWeight="700" fill="#EF4444">
              Grid off
            </text>
          </g>

          {/* ---- sun / moon ---- */}
          <g className="transition-opacity duration-700" style={{ opacity: day ? 1 : 0 }}>
            <circle cx="70" cy="40" r="18" fill={GOLD} />
            {Array.from({ length: 8 }).map((_, i) => {
              const a = (i * Math.PI) / 4;
              return (
                <line
                  key={i}
                  x1={70 + Math.cos(a) * 25}
                  y1={40 + Math.sin(a) * 25}
                  x2={70 + Math.cos(a) * 33}
                  y2={40 + Math.sin(a) * 33}
                  stroke={GOLD}
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              );
            })}
          </g>
          <g className="transition-opacity duration-700" style={{ opacity: day ? 0 : 1 }}>
            <circle cx="70" cy="40" r="16" fill="#E2E8F0" />
            <circle cx="78" cy="34" r="14" fill="#0f202e" />
          </g>

          {/* ---- panels ---- */}
          <g transform="translate(60 80)">
            <path d="M 10 0 L 130 0 L 115 60 L -5 60 Z" fill={day ? "#1E3A5F" : "#334155"} stroke={NAVY} strokeWidth="2" />
            {[40, 80].map((x) => (
              <line key={x} x1={10 + x} y1="0" x2={-5 + x} y2="60" stroke="#94A3B8" strokeWidth="1.2" />
            ))}
            <line x1="2" y1="30" x2="122" y2="30" stroke="#94A3B8" strokeWidth="1.2" />
          </g>
          <Label x={125} y={170} light={!day}>Solar panels</Label>

          {/* ---- grid pylon ---- */}
          <g transform="translate(95 255)" stroke={day ? NAVY : "#64748B"} strokeWidth="2.5" fill="none" strokeLinecap="round">
            <path d="M 30 0 L 10 80 M 30 0 L 50 80 M 14 60 L 46 60 M 18 40 L 42 40 M 0 18 L 60 18" />
          </g>
          <Label x={125} y={360} light={!day}>The grid</Label>

          {/* ---- inverter ---- */}
          <g>
            <rect x="360" y="165" width="180" height="80" rx="14" fill="#fff" stroke={NAVY} strokeWidth="2.5" />
            <circle cx="410" cy="205" r="18" fill={NAVY} />
            <circle cx="410" cy="205" r="7" fill={GOLD} />
            <rect x="440" y="192" width="80" height="8" rx="4" fill="#E2E8F0" />
            <rect x="440" y="210" width="55" height="8" rx="4" fill="#E2E8F0" />
          </g>

          {/* ---- battery ---- */}
          <g>
            <rect x="400" y="300" width="100" height="70" rx="10" fill="#fff" stroke={NAVY} strokeWidth="2.5" />
            <rect x="500" y="322" width="8" height="26" rx="3" fill={NAVY} />
            <rect
              x="408"
              y="308"
              height="54"
              rx="5"
              fill={GOLD}
              style={{ width: day ? 84 : 34, transition: "width 4.5s ease-in-out" }}
            />
          </g>

          <Label x={450} y={392} light={!day}>Inverter and battery</Label>

          {/* ---- business ---- */}
          <g transform="translate(700 140)">
            <path d="M 0 40 L 20 0 L 140 0 L 160 40 Z" fill={GOLD} stroke={NAVY} strokeWidth="2.5" />
            <rect x="8" y="40" width="144" height="100" fill="#fff" stroke={NAVY} strokeWidth="2.5" />
            <rect x="24" y="60" width="50" height="40" rx="3" fill="#FEF3C7" stroke={NAVY} strokeWidth="2" />
            <rect x="92" y="60" width="44" height="80" rx="3" fill="#FEF3C7" stroke={NAVY} strokeWidth="2" />
            {/* lights stay on in both modes */}
            <circle cx="49" cy="80" r="9" fill={GOLD} />
            <circle cx="114" cy="90" r="7" fill={GOLD} />
          </g>
          <Label x={780} y={310} light={!day}>Your business</Label>
        </svg>
      </div>

      <p key={mode} className="text-lg text-gray-700 font-medium animate-[rise_0.5s_ease-out_both]">
        {current.caption}
      </p>
    </div>
  );
}
