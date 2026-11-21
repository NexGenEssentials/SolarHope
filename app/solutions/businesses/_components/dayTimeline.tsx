"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// A day from 6 am to 2 am, drawn left to right. The sun crosses the daylight
// half; the highlighted band is when the chosen business is busiest.
const START = 6;
const END = 26; // 2 am
const X0 = 40;
const X1 = 960;
const x = (h: number) => X0 + ((h - START) / (END - START)) * (X1 - X0);

const SUNSET = 18;
const ARC_TOP = 50;
const ARC_BASE = 210;

// Points along the sun's arc, for the animation.
const ARC = Array.from({ length: 25 }, (_, i) => {
  const t = i / 24;
  const h = START + t * (SUNSET - START);
  return { cx: x(h), cy: ARC_BASE - Math.sin(Math.PI * t) * (ARC_BASE - ARC_TOP) };
});

const PROFILES = {
  bar: {
    tab: "Bar or restaurant",
    busy: [17, 26] as [number, number],
    title: "Your busy hours are after dark",
    text: "The panels quietly charge the battery through the afternoon. When the evening rush starts, the battery takes over and carries you through the night.",
  },
  shop: {
    tab: "Shop or office",
    busy: [8, 18] as [number, number],
    title: "Your busy hours are in daylight",
    text: "You use solar power the moment it is made, while the sun is strongest. The battery is kept for closing time and for power cuts.",
  },
};

type Key = keyof typeof PROFILES;

const TICKS = [
  [6, "6 am"],
  [9, "9 am"],
  [12, "Noon"],
  [15, "3 pm"],
  [18, "6 pm"],
  [21, "9 pm"],
  [24, "Midnight"],
  [26, "2 am"],
] as const;

export default function DayTimeline() {
  const [key, setKey] = useState<Key>("bar");
  const p = PROFILES[key];

  return (
    <div className="space-y-8">
      <div role="tablist" aria-label="Type of business" className="inline-flex rounded-full bg-white/10 p-1">
        {(Object.keys(PROFILES) as Key[]).map((k) => (
          <button
            key={k}
            role="tab"
            aria-selected={k === key}
            onClick={() => setKey(k)}
            className={`relative px-5 py-2 text-sm font-bold rounded-full transition-colors ${
              k === key ? "text-dark-blue" : "text-white/80 hover:text-white"
            }`}
          >
            {k === key && (
              <motion.span
                layoutId="tab-pill"
                className="absolute inset-0 rounded-full bg-yellow"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative">{PROFILES[k].tab}</span>
          </button>
        ))}
      </div>

      <div className="rounded-2xl overflow-hidden ring-1 ring-white/15 shadow-2xl">
        <svg viewBox="0 0 1000 300" className="w-full h-auto block" role="img" aria-label={`${p.title}. ${p.text}`}>
          <defs>
            <linearGradient id="sky" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="30%" stopColor="#7CC4F5" />
              <stop offset="55%" stopColor="#2C98F0" />
              <stop offset="64%" stopColor="#F59E0B" />
              <stop offset="74%" stopColor="#0D1B39" />
              <stop offset="100%" stopColor="#060D1C" />
            </linearGradient>
            <radialGradient id="sunGlow">
              <stop offset="0%" stopColor="#FFF7D6" />
              <stop offset="45%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor="#FBBF24" stopOpacity="0" />
            </radialGradient>
          </defs>

          <rect x="0" y="0" width="1000" height="300" fill="url(#sky)" />

          {/* stars over the night side */}
          {[
            [700, 40], [760, 90], [820, 30], [880, 75], [930, 120], [735, 140], [860, 160], [960, 50],
          ].map(([sx, sy], i) => (
            <motion.circle
              key={i}
              cx={sx}
              cy={sy}
              r={1.6}
              fill="#fff"
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.3 }}
            />
          ))}

          {/* sun path */}
          <path
            d={`M ${ARC.map((a) => `${a.cx},${a.cy}`).join(" L ")}`}
            fill="none"
            stroke="#fff"
            strokeOpacity="0.45"
            strokeDasharray="4 8"
            strokeWidth="2"
          />

          {/* busy hours band */}
          <motion.rect
            y="18"
            height="216"
            rx="14"
            fill="#fff"
            fillOpacity="0.14"
            stroke="#FBBF24"
            strokeWidth="2.5"
            strokeDasharray="10 6"
            initial={false}
            animate={{ x: x(p.busy[0]), width: x(p.busy[1]) - x(p.busy[0]) }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          />
          <motion.text
            y="44"
            fill="#FBBF24"
            fontSize="17"
            fontWeight="800"
            fontStyle="italic"
            initial={false}
            animate={{ x: x(p.busy[0]) + 16 }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          >
            YOUR BUSY HOURS
          </motion.text>

          {/* sun travelling across the day */}
          <motion.g
            animate={{
              x: ARC.map((a) => a.cx),
              y: ARC.map((a) => a.cy),
            }}
            transition={{ duration: 9, repeat: Infinity, ease: "linear", repeatDelay: 1.2 }}
          >
            <circle r="38" fill="url(#sunGlow)" />
            <circle r="15" fill="#FFF3C4" />
          </motion.g>

          {/* ground: where the power comes from */}
          <rect x="0" y="236" width="1000" height="64" fill="#0D1B39" fillOpacity="0.88" />
          <rect x={x(START)} y="236" width={x(SUNSET) - x(START)} height="6" fill="#FBBF24" />
          <rect x={x(SUNSET)} y="236" width={x(END) - x(SUNSET)} height="6" fill="#22C55E" />
          <text x={x(12)} y="262" fill="#FBBF24" fontSize="15" fontWeight="700" textAnchor="middle">
            Sun powers you and charges the battery
          </text>
          <text x={x(22)} y="262" fill="#4ADE80" fontSize="15" fontWeight="700" textAnchor="middle">
            Battery takes over
          </text>
          {TICKS.map(([h, label]) => (
            <text key={h} x={x(h)} y="288" fill="#fff" fillOpacity="0.6" fontSize="12" textAnchor="middle">
              {label}
            </text>
          ))}
        </svg>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={key}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35 }}
          className="max-w-2xl space-y-2"
        >
          <h3 className="text-2xl font-extrabold italic">{p.title}</h3>
          <p className="text-white/85 leading-relaxed">{p.text}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
