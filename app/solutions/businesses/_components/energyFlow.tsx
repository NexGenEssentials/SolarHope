"use client";
import React, { useEffect, useState } from "react";
import { MdStorefront } from "react-icons/md";

// Energy flow built from SolarHope's own installation photos: the panels on
// the roof, the meter and board (the grid connection), and the inverter and
// battery on the wall, flowing to the business. Two modes: daytime and a
// power cut at night.

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

const PHOTOS = {
  panels: "/images/projects/roof-finished-array.jpg",
  grid: "/images/projects/grid-meter-board.jpg",
  inverter: "/images/projects/wall-install-inverter-battery.jpg",
};

/** Line with moving dashes when power is flowing along it. */
function Flow({ d, active, reverse = false, light }: { d: string; active: boolean; reverse?: boolean; light: boolean }) {
  return (
    <g>
      <path d={d} fill="none" stroke={light ? "#CBD5E1" : "#334155"} strokeWidth={4} strokeLinecap="round" />
      <path
        d={d}
        fill="none"
        stroke={GOLD}
        strokeWidth={5}
        strokeLinecap="round"
        strokeDasharray="12 20"
        className="animate-[flow_0.9s_linear_infinite] transition-opacity duration-500"
        style={{
          opacity: active ? 1 : 0,
          animationDirection: reverse ? "reverse" : "normal",
          filter: "drop-shadow(0 0 4px rgba(251,191,36,0.8))",
        }}
      />
    </g>
  );
}

/** Circular photo with a ring that glows when the node is active. */
function PhotoNode({
  id,
  cx,
  cy,
  r,
  src,
  active,
  dim = false,
}: {
  id: string;
  cx: number;
  cy: number;
  r: number;
  src: string;
  active: boolean;
  dim?: boolean;
}) {
  return (
    <g>
      <defs>
        <clipPath id={`clip-${id}`}>
          <circle cx={cx} cy={cy} r={r} />
        </clipPath>
      </defs>
      {active && (
        <circle
          cx={cx}
          cy={cy}
          r={r + 6}
          fill="none"
          stroke={GOLD}
          strokeWidth={3}
          className="animate-[pulsering_2.2s_ease-out_infinite]"
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        />
      )}
      <image
        href={src}
        x={cx - r}
        y={cy - r}
        width={r * 2}
        height={r * 2}
        preserveAspectRatio="xMidYMid slice"
        clipPath={`url(#clip-${id})`}
        style={{
          filter: dim ? "grayscale(1) brightness(0.45)" : "none",
          transition: "filter 0.7s",
        }}
      />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={active ? GOLD : "#E2E8F0"} strokeWidth={5} style={{ transition: "stroke 0.5s" }} />
    </g>
  );
}

function Label({ x, y, light, children }: { x: number; y: number; light: boolean; children: string }) {
  return (
    <text x={x} y={y} textAnchor="middle" fontSize="21" fontWeight="700" fill={light ? NAVY : "#fff"}>
      {children}
    </text>
  );
}

export default function EnergyFlow() {
  const [mode, setMode] = useState<Mode>("day");
  const [auto, setAuto] = useState(true);
  const day = mode === "day";

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
        className={`rounded-2xl overflow-hidden transition-colors duration-700 ${
          day ? "bg-linear-to-br from-[#FFF7DB] to-[#E8F3FF]" : "bg-linear-to-br from-[#0f202e] to-[#1b2b4a]"
        }`}
      >
        <svg viewBox="0 0 900 440" className="w-full h-auto" role="img" aria-label={current.caption}>
          {/* sun / moon */}
          <g className="transition-opacity duration-700" style={{ opacity: day ? 1 : 0 }}>
            <circle cx="62" cy="52" r="34" fill={GOLD} opacity="0.25" className="animate-[pulsering_3s_ease-out_infinite]" style={{ transformOrigin: "62px 52px" }} />
            <circle cx="62" cy="52" r="20" fill={GOLD} />
          </g>
          <g className="transition-opacity duration-700" style={{ opacity: day ? 0 : 1 }}>
            <circle cx="62" cy="52" r="18" fill="#E2E8F0" />
            <circle cx="71" cy="45" r="15" fill="#13233a" />
            {[[130, 30], [190, 70], [820, 40], [760, 90], [560, 30]].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="2" fill="#fff" opacity="0.7" />
            ))}
          </g>

          {/* lines */}
          <Flow light={day} d="M 260 120 C 330 120, 330 200, 375 210" active={day} />
          <Flow light={day} d="M 250 330 C 330 330, 330 250, 375 245" active={false} />
          <Flow light={day} d="M 545 225 L 650 225" active />

          {/* grid off marker */}
          <g className="transition-opacity duration-500" style={{ opacity: day ? 0 : 1 }}>
            <circle cx="318" cy="292" r="17" fill="#EF4444" />
            <path d="M 311 285 L 325 299 M 325 285 L 311 299" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
          </g>

          {/* photo nodes */}
          <PhotoNode id="panels" cx={185} cy={120} r={75} src={PHOTOS.panels} active={day} dim={!day} />
          <Label x={185} y={226} light={day}>Your solar panels</Label>

          <PhotoNode id="grid" cx={185} cy={330} r={58} src={PHOTOS.grid} active={false} dim={!day} />
          <Label x={185} y={415} light={day}>{day ? "The grid" : "The grid: off"}</Label>

          <PhotoNode id="inverter" cx={460} cy={225} r={90} src={PHOTOS.inverter} active />
          <Label x={460} y={345} light={day}>Inverter and battery</Label>

          {/* battery level */}
          <g>
            <rect x="400" y="360" width="112" height="22" rx="6" fill="none" stroke={day ? NAVY : "#fff"} strokeWidth="2.5" />
            <rect x="512" y="365" width="6" height="12" rx="2" fill={day ? NAVY : "#fff"} />
            <rect
              x="404"
              y="364"
              height="14"
              rx="3"
              fill={GOLD}
              style={{ width: day ? 104 : 38, transition: "width 4.5s ease-in-out" }}
            />
            <text x="460" y="405" textAnchor="middle" fontSize="15" fill={day ? "#475569" : "#CBD5E1"}>
              {day ? "Battery charging" : "Battery powering you"}
            </text>
          </g>

          {/* business */}
          <g>
            <circle cx="740" cy="225" r="88" fill={GOLD} opacity="0.18" className="animate-[pulsering_2.6s_ease-out_infinite]" style={{ transformOrigin: "740px 225px" }} />
            <circle cx="740" cy="225" r="75" fill="#fff" stroke={GOLD} strokeWidth="5" />
            <MdStorefront x={690} y={175} size={100} color={NAVY} />
            <circle cx="740" cy="190" r="6" fill={GOLD} />
          </g>
          <Label x={740} y={330} light={day}>Your business</Label>
          <text x="740" y="356" textAnchor="middle" fontSize="15" fill={day ? "#475569" : "#FBBF24"}>
            Lights on, still trading
          </text>
        </svg>
      </div>

      <p key={mode} className="text-lg text-gray-700 font-medium animate-[rise_0.5s_ease-out_both]">
        {current.caption}
      </p>
    </div>
  );
}
