"use client";
import React, { useEffect, useRef, useState } from "react";
import { MdStorefront } from "react-icons/md";

// Energy flow built from SolarHope's own installation photos, styled after
// a monitoring app: glowing wires with a travelling pulse of light, and
// callouts (small label, bold status) joined to each part by a dotted line.
// Two modes: daytime and a power cut at night. Readings are illustrative.

type Mode = "day" | "night";

const MODES: { key: Mode; tab: string; caption: string }[] = [
  { key: "day", tab: "Daytime", caption: "The sun runs your business and fills the battery at the same time." },
  { key: "night", tab: "Power cut at night", caption: "The grid goes off. The battery takes over by itself, and your lights stay on." },
];

const GOLD = "#FBBF24";
const AMBER = "#F59E0B";
const NAVY = "#0f202e";

const PHOTOS = {
  panels: "/images/projects/roof-finished-array.jpg",
  grid: "/images/projects/grid-meter-board.jpg",
  inverter: "/images/projects/wall-install-inverter-battery.jpg",
};

/** A wire: a soft glowing line when live, with a bright pulse travelling along it. */
function Wire({ d, live, reverse = false, day }: { d: string; live: boolean; reverse?: boolean; day: boolean }) {
  return (
    <g>
      <path d={d} fill="none" stroke={day ? "#D5DCE6" : "#2C3E5C"} strokeWidth={5} strokeLinecap="round" />
      <g className="transition-opacity duration-700" style={{ opacity: live ? 1 : 0 }}>
        <path d={d} fill="none" stroke={GOLD} strokeWidth={10} strokeLinecap="round" opacity={0.25} filter="url(#glow)" />
        <path d={d} fill="none" stroke={GOLD} strokeWidth={4} strokeLinecap="round" opacity={0.9} />
        <path
          d={d}
          pathLength={100}
          fill="none"
          stroke="#FFF7D6"
          strokeWidth={6}
          strokeLinecap="round"
          strokeDasharray="14 86"
          filter="url(#glow)"
          className="animate-[comet_1.6s_linear_infinite]"
          style={{ animationDirection: reverse ? "reverse" : "normal" }}
        />
      </g>
    </g>
  );
}

/** Circular photo; gold ring and soft pulse when the part is active. */
function PhotoNode({ id, cx, cy, r, src, active, dim = false }: {
  id: string; cx: number; cy: number; r: number; src: string; active: boolean; dim?: boolean;
}) {
  return (
    <g>
      <defs>
        <clipPath id={`clip-${id}`}>
          <circle cx={cx} cy={cy} r={r} />
        </clipPath>
      </defs>
      {active && (
        <circle cx={cx} cy={cy} r={r + 6} fill="none" stroke={GOLD} strokeWidth={3}
          className="animate-[pulsering_2.2s_ease-out_infinite]" style={{ transformOrigin: `${cx}px ${cy}px` }} />
      )}
      <image href={src} x={cx - r} y={cy - r} width={r * 2} height={r * 2}
        preserveAspectRatio="xMidYMid slice" clipPath={`url(#clip-${id})`}
        style={{ filter: dim ? "grayscale(1) brightness(0.45)" : "none", transition: "filter 0.7s" }} />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={active ? GOLD : "#E2E8F0"} strokeWidth={5}
        style={{ transition: "stroke 0.5s" }} />
    </g>
  );
}

/** App-style callout: small label, bold status, dotted leader to the part. */
function Callout({ x, y, label, value, to, day, align = "start", valueColor }: {
  x: number; y: number; label: string; value: string; to: [number, number]; day: boolean;
  align?: "start" | "middle" | "end"; valueColor?: string;
}) {
  return (
    <g>
      <path d={`M ${x} ${y + 12} L ${to[0]} ${to[1]}`} stroke={AMBER} strokeWidth={1.5} strokeDasharray="2 5" fill="none" opacity={0.8} />
      <text x={x} y={y - 22} textAnchor={align} fontSize="14" fontWeight="600" letterSpacing="1.5" fill={day ? "#64748B" : "#94A3B8"}>
        {label}
      </text>
      <text x={x} y={y + 4} textAnchor={align} fontSize="26" fontWeight="800" fill={valueColor ?? (day ? NAVY : "#fff")}>
        {value}
      </text>
    </g>
  );
}

/** Battery percentage that counts towards its target. */
function useCountTo(target: number, ms = 4500) {
  const [v, setV] = useState(target);
  const from = useRef(target);
  useEffect(() => {
    const start = performance.now();
    const a = from.current;
    let raf = 0;
    const tick = (t: number) => {
      const k = Math.min(1, (t - start) / ms);
      const val = a + (target - a) * (1 - Math.pow(1 - k, 3));
      setV(val);
      from.current = val;
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, ms]);
  return Math.round(v);
}

export default function EnergyFlow() {
  const [mode, setMode] = useState<Mode>("day");
  const [auto, setAuto] = useState(true);
  const day = mode === "day";
  const battery = useCountTo(day ? 92 : 41);

  useEffect(() => {
    if (!auto) return;
    const t = setInterval(() => setMode((m) => (m === "day" ? "night" : "day")), 6000);
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
            onClick={() => { setAuto(false); setMode(m.key); }}
            className={`px-5 py-2 text-sm font-semibold rounded-full transition-colors ${
              mode === m.key ? "bg-dark-blue text-white" : "text-gray-500 hover:text-gray-800"
            }`}
          >
            {m.tab}
          </button>
        ))}
      </div>

      <div className={`rounded-2xl overflow-hidden transition-colors duration-700 ${
        day ? "bg-linear-to-b from-[#FFF8E1] via-[#F4F8FC] to-[#EAF1F8]" : "bg-linear-to-b from-[#0b1626] to-[#1b2b4a]"
      }`}>
        <svg viewBox="0 0 900 470" className="w-full h-auto" role="img" aria-label={current.caption}>
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="5" />
            </filter>
          </defs>

          {/* sun / moon */}
          <g className="transition-opacity duration-700" style={{ opacity: day ? 1 : 0 }}>
            <circle cx="60" cy="56" r="40" fill={GOLD} opacity="0.18" className="animate-[pulsering_3s_ease-out_infinite]" style={{ transformOrigin: "60px 56px" }} />
            <circle cx="60" cy="56" r="20" fill={GOLD} />
          </g>
          <g className="transition-opacity duration-700" style={{ opacity: day ? 0 : 1 }}>
            <circle cx="60" cy="56" r="18" fill="#E2E8F0" />
            <circle cx="69" cy="49" r="15" fill="#0f1d33" />
            {[[150, 26], [470, 40], [610, 22], [840, 60], [880, 150]].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="1.8" fill="#fff" opacity="0.7" />
            ))}
          </g>

          {/* wires */}
          <Wire day={day} d="M 262 150 C 330 150, 330 225, 372 232" live={day} />
          <Wire day={day} d="M 245 360 C 330 360, 330 270, 372 262" live={false} />
          <Wire day={day} d="M 552 247 L 662 247" live />

          {/* grid off marker */}
          <g className="transition-opacity duration-500" style={{ opacity: day ? 0 : 1 }}>
            <circle cx="320" cy="318" r="16" fill="#EF4444" />
            <path d="M 313 311 L 327 325 M 327 311 L 313 325" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
          </g>

          {/* parts */}
          <PhotoNode id="panels" cx={190} cy={150} r={72} src={PHOTOS.panels} active={day} dim={!day} />
          <PhotoNode id="grid" cx={190} cy={360} r={55} src={PHOTOS.grid} active={false} dim={!day} />
          <PhotoNode id="inverter" cx={462} cy={247} r={90} src={PHOTOS.inverter} active />

          <g>
            <circle cx="752" cy="247" r="88" fill={GOLD} opacity="0.16" className="animate-[pulsering_2.6s_ease-out_infinite]" style={{ transformOrigin: "752px 247px" }} />
            <circle cx="752" cy="247" r="74" fill="#fff" stroke={GOLD} strokeWidth="5" />
            <MdStorefront x={702} y={197} size={100} color={NAVY} />
            <circle cx="752" cy="212" r="6" fill={GOLD} />
          </g>

          {/* callouts */}
          <Callout day={day} x={300} y={62} label="SOLAR PANELS" value={day ? "Producing" : "Resting"} to={[248, 104]} />
          <Callout day={day} x={300} y={440} label="THE GRID" value={day ? "Connected" : "Off"} to={[236, 392]}
            valueColor={day ? undefined : "#F87171"} />
          <Callout day={day} x={462} y={385} align="middle" label="BATTERY" value={`${battery}%`} to={[462, 340]}
            valueColor={day ? undefined : GOLD} />
          <text x={462} y={410} textAnchor="middle" fontSize="15" fill={day ? "#475569" : "#CBD5E1"}>
            {day ? "Charging from the sun" : "Powering your shop"}
          </text>
          <Callout day={day} x={752} y={80} align="middle" label="YOUR SHOP" value="Running" to={[752, 170]}
            valueColor={day ? undefined : GOLD} />
        </svg>
      </div>

      <p key={mode} className="text-lg text-gray-700 font-medium animate-[rise_0.5s_ease-out_both]">
        {current.caption}
      </p>
      <p className="text-xs text-gray-400 -mt-4">Illustration. Your own system&rsquo;s readings appear in its monitoring app.</p>
    </div>
  );
}
