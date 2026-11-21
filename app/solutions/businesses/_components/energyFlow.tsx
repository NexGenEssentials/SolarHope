"use client";
import React, { useEffect, useRef, useState } from "react";

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

/** Rounded-rectangle photo in its own 3:4 shape, so the whole picture shows. */
function PhotoCard({ id, cx, cy, w, h, src }: { id: string; cx: number; cy: number; w: number; h: number; src: string }) {
  const x = cx - w / 2;
  const y = cy - h / 2;
  return (
    <g>
      <defs>
        <clipPath id={`clip-${id}`}>
          <rect x={x} y={y} width={w} height={h} rx={18} />
        </clipPath>
      </defs>
      <rect x={x - 6} y={y - 6} width={w + 12} height={h + 12} rx={22} fill="none" stroke={GOLD} strokeWidth={3}
        className="animate-[pulsering_2.2s_ease-out_infinite]" style={{ transformOrigin: `${cx}px ${cy}px` }} />
      <image href={src} x={x} y={y} width={w} height={h} preserveAspectRatio="xMidYMid slice" clipPath={`url(#clip-${id})`} />
      <rect x={x} y={y} width={w} height={h} rx={18} fill="none" stroke={GOLD} strokeWidth={5} />
    </g>
  );
}

/**
 * A small shop drawn in a 2.5D style: front and side walls, a pitched roof
 * carrying solar panels, a striped awning, a shop window and a door. The
 * windows stay lit in both modes; at night a warm glow shows it is still open.
 */
function Shop({ day }: { day: boolean }) {
  const wall = day ? "#FFFFFF" : "#E9EEF5";
  const side = day ? "#DCE4EE" : "#B8C3D3";
  const roof = day ? "#8B5A44" : "#6B4636";
  const roofSide = day ? "#6E4636" : "#4F3328";
  const lit = "#FDE68A";
  const panelCells = [];
  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 4; col++) {
      // front roof slope runs from y=228 (eave) up to y=176 (ridge); cells sit on it
      const t0 = 0.18 + row * 0.38;
      const t1 = t0 + 0.32;
      const yA = 228 - (228 - 176) * t0;
      const yB = 228 - (228 - 176) * t1;
      const inset = (t: number) => 18 + 22 * t; // slope narrows towards the ridge
      const xL = (t: number) => 660 + inset(t) + col * ((150 - 2 * inset(t)) / 4);
      const xR = (t: number) => xL(t) + (150 - 2 * inset(t)) / 4 - 4;
      panelCells.push(
        <polygon
          key={`${row}-${col}`}
          points={`${xL(t0)},${yA} ${xR(t0)},${yA} ${xR(t1)},${yB} ${xL(t1)},${yB}`}
          fill={day ? "#1E3A8A" : "#1E293B"}
          stroke={day ? "#93C5FD" : "#334155"}
          strokeWidth="1"
        />,
      );
    }
  }
  return (
    <g>
      {/* warm glow behind the building */}
      <ellipse cx="752" cy="262" rx="120" ry="95" fill={GOLD} opacity={day ? 0.12 : 0.22}
        className="animate-[pulsering_2.8s_ease-out_infinite]" style={{ transformOrigin: "752px 262px" }} />
      {/* ground shadow */}
      <ellipse cx="760" cy="338" rx="118" ry="13" fill={day ? "#CBD5E1" : "#0B1626"} opacity="0.8" />

      {/* side wall */}
      <polygon points="810,228 855,205 855,312 810,336" fill={side} stroke={NAVY} strokeWidth="2" strokeLinejoin="round" />
      {/* side roof slope */}
      <polygon points="822,228 868,205 840,166 798,176" fill={roofSide} stroke={NAVY} strokeWidth="2" strokeLinejoin="round" />
      {/* front wall */}
      <rect x="668" y="228" width="142" height="108" fill={wall} stroke={NAVY} strokeWidth="2" />
      {/* front roof slope with panels */}
      <polygon points="652,230 826,230 798,176 680,176" fill={roof} stroke={NAVY} strokeWidth="2" strokeLinejoin="round" />
      {panelCells}

      {/* awning */}
      <g>
        <rect x="676" y="244" width="78" height="12" fill={GOLD} stroke={NAVY} strokeWidth="1.5" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect key={i} x={676 + i * 13} y="244" width="6.5" height="12" fill="#fff" opacity="0.85" />
        ))}
        <path d="M 676 256 q 6.5 7 13 0 q 6.5 7 13 0 q 6.5 7 13 0 q 6.5 7 13 0 q 6.5 7 13 0 q 6.5 7 13 0"
          fill={GOLD} stroke={NAVY} strokeWidth="1.5" />
      </g>
      {/* shop window */}
      <rect x="680" y="266" width="70" height="44" rx="3" fill={lit} stroke={NAVY} strokeWidth="2" />
      <line x1="715" y1="266" x2="715" y2="310" stroke={NAVY} strokeWidth="1.5" />
      <rect x="686" y="292" width="58" height="4" fill="#F59E0B" opacity="0.6" />
      {/* door */}
      <rect x="764" y="262" width="34" height="74" rx="2" fill={lit} stroke={NAVY} strokeWidth="2" />
      <circle cx="791" cy="300" r="2.5" fill={NAVY} />
      {/* side window */}
      <polygon points="824,252 842,243 842,268 824,277" fill={lit} stroke={NAVY} strokeWidth="1.5" />
      {/* night light spill from windows */}
      <g className="transition-opacity duration-700" style={{ opacity: day ? 0 : 1 }}>
        <ellipse cx="715" cy="340" rx="44" ry="8" fill={lit} opacity="0.35" />
        <ellipse cx="781" cy="340" rx="24" ry="6" fill={lit} opacity="0.35" />
      </g>
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
          <Wire day={day} d="M 262 150 C 330 150, 330 225, 384 232" live={day} />
          <Wire day={day} d="M 245 360 C 330 360, 330 270, 384 262" live={false} />
          <Wire day={day} d="M 540 247 C 600 247, 610 288, 668 288" live />

          {/* grid off marker */}
          <g className="transition-opacity duration-500" style={{ opacity: day ? 0 : 1 }}>
            <circle cx="320" cy="318" r="16" fill="#EF4444" />
            <path d="M 313 311 L 327 325 M 327 311 L 313 325" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
          </g>

          {/* parts */}
          <PhotoNode id="panels" cx={190} cy={150} r={72} src={PHOTOS.panels} active={day} dim={!day} />
          <PhotoNode id="grid" cx={190} cy={360} r={55} src={PHOTOS.grid} active={false} dim={!day} />
          <PhotoCard id="inverter" cx={462} cy={247} w={156} h={208} src={PHOTOS.inverter} />

          <Shop day={day} />

          {/* callouts */}
          <Callout day={day} x={300} y={62} label="SOLAR PANELS" value={day ? "Producing" : "Resting"} to={[248, 104]} />
          <Callout day={day} x={300} y={440} label="THE GRID" value={day ? "Connected" : "Off"} to={[236, 392]}
            valueColor={day ? undefined : "#F87171"} />
          <Callout day={day} x={566} y={392} label="BATTERY" value={`${battery}%`} to={[542, 330]}
            valueColor={day ? undefined : GOLD} />
          <text x={566} y={418} textAnchor="start" fontSize="15" fill={day ? "#475569" : "#CBD5E1"}>
            {day ? "Charging from the sun" : "Powering your shop"}
          </text>
          <Callout day={day} x={752} y={80} align="middle" label="YOUR SHOP" value="Running" to={[738, 162]}
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
