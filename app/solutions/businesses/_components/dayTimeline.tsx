"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// A day from 6 am to 2 am, left to right. The sun crosses the daylight part;
// the soft band marks when the chosen business is busiest.
const START = 6;
const END = 26; // 2 am
const X0 = 30;
const X1 = 970;
const x = (h: number) => X0 + ((h - START) / (END - START)) * (X1 - X0);
const SUNSET = 18;
const BASE = 170;
const TOP = 40;

const ARC = Array.from({ length: 25 }, (_, i) => {
  const t = i / 24;
  return {
    cx: x(START + t * (SUNSET - START)),
    cy: BASE - Math.sin(Math.PI * t) * (BASE - TOP),
  };
});

const PROFILES = {
  bar: {
    tab: "Bar or restaurant",
    busy: [17, 26] as [number, number],
    text: "Your busy hours are after dark. The panels charge the battery through the quiet afternoon, and the battery carries you through the evening.",
  },
  shop: {
    tab: "Shop or office",
    busy: [8, 18] as [number, number],
    text: "Your busy hours are in daylight. You use solar power as it is made, and keep the battery for closing time and power cuts.",
  },
};
type Key = keyof typeof PROFILES;

const TICKS = [
  [6, "6 am"],
  [12, "Noon"],
  [18, "6 pm"],
  [24, "Midnight"],
] as const;

export default function DayTimeline() {
  const [key, setKey] = useState<Key>("bar");
  const p = PROFILES[key];

  return (
    <div className="space-y-6">
      <div role="tablist" aria-label="Type of business" className="flex gap-8 border-b border-gray-200">
        {(Object.keys(PROFILES) as Key[]).map((k) => (
          <button
            key={k}
            role="tab"
            aria-selected={k === key}
            onClick={() => setKey(k)}
            className={`relative pb-3 text-sm font-semibold transition-colors ${
              k === key ? "text-dark-blue" : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {PROFILES[k].tab}
            {k === key && (
              <motion.span
                layoutId="tab-underline"
                className="absolute left-0 right-0 -bottom-px h-0.5 bg-yellow"
              />
            )}
          </button>
        ))}
      </div>

      <svg viewBox="0 0 1000 230" className="w-full h-auto" role="img" aria-label={p.text}>
        {/* busy hours */}
        <motion.rect
          y="20"
          height="150"
          rx="8"
          fill="#FBBF24"
          fillOpacity="0.14"
          initial={false}
          animate={{ x: x(p.busy[0]), width: x(p.busy[1]) - x(p.busy[0]) }}
          transition={{ type: "spring", stiffness: 140, damping: 22 }}
        />
        <motion.text
          y="40"
          fill="#B45309"
          fontSize="13"
          fontWeight="600"
          letterSpacing="1.5"
          initial={false}
          animate={{ x: x(p.busy[0]) + 12 }}
          transition={{ type: "spring", stiffness: 140, damping: 22 }}
        >
          BUSY HOURS
        </motion.text>

        {/* sun path and sun */}
        <path
          d={`M ${ARC.map((a) => `${a.cx},${a.cy}`).join(" L ")}`}
          fill="none"
          stroke="#CBD5E1"
          strokeWidth="1.5"
          strokeDasharray="3 6"
        />
        <motion.circle
          r="10"
          fill="#FBBF24"
          animate={{ cx: ARC.map((a) => a.cx), cy: ARC.map((a) => a.cy) }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
        />

        {/* baseline: daylight then battery */}
        <line x1={x(START)} x2={x(SUNSET)} y1={BASE} y2={BASE} stroke="#FBBF24" strokeWidth="3" />
        <line x1={x(SUNSET)} x2={x(END)} y1={BASE} y2={BASE} stroke="#0f202e" strokeWidth="3" />
        <text x={x(12)} y={BASE + 24} fill="#64748B" fontSize="13" textAnchor="middle">
          Sun powers you and charges the battery
        </text>
        <text x={x(22)} y={BASE + 24} fill="#64748B" fontSize="13" textAnchor="middle">
          Battery takes over
        </text>
        {TICKS.map(([h, label]) => (
          <text key={h} x={x(h)} y={BASE + 50} fill="#94A3B8" fontSize="12" textAnchor="middle">
            {label}
          </text>
        ))}
      </svg>

      <AnimatePresence mode="wait">
        <motion.p
          key={key}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="text-gray-600 leading-relaxed max-w-2xl"
        >
          {p.text}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
