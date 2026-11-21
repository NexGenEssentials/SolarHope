"use client";
import React, { useEffect, useRef, useState } from "react";

// A realistic scene of a small Kigali café on solar (original image made for
// SolarHope; day and night versions share the same framing). Glowing lines are
// drawn exactly over the cables in the picture, with a pulse of light moving
// along whichever runs are live. Labels are app-style cards. Illustrative only.

type Mode = "day" | "night";

const MODES: { key: Mode; tab: string; caption: string }[] = [
  { key: "day", tab: "Daytime", caption: "The sun runs your business and fills the battery at the same time." },
  { key: "night", tab: "Power cut at night", caption: "The grid goes off. The battery takes over by itself, and your lights stay on." },
];

// Image coordinate space (both images are 1672 × 941).
const W = 1672;
const H = 941;

// Cable runs traced from the picture.
const RUNS = {
  // roof panels -> under the eave -> down the wall conduit -> inverter
  panels: "M 520 262 L 360 262 Q 356 262 356 268 L 356 430 L 362 436",
  // pole top -> down the pole -> curve onto the wall -> inverter
  grid: "M 186 92 L 179 130 L 177 345 Q 178 425 250 426 L 362 428",
  // inverter -> the two battery cabinets
  battery: "M 392 510 L 392 568 M 406 510 L 406 556 L 476 556 L 476 568",
  // battery cabinets -> along the base of the wall -> into the café
  shop: "M 512 688 L 612 688 L 700 688",
};

const GREEN = "#4ADE80";

function Run({ d, live, reverse = false }: { d: string; live: boolean; reverse?: boolean }) {
  return (
    <g className="transition-opacity duration-700" style={{ opacity: live ? 1 : 0 }}>
      <path d={d} fill="none" stroke={GREEN} strokeWidth={18} strokeLinecap="round" strokeLinejoin="round" opacity={0.35} filter="url(#glow)" />
      <path d={d} fill="none" stroke={GREEN} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
      <path
        d={d}
        pathLength={100}
        fill="none"
        stroke="#F0FFF4"
        strokeWidth={9}
        strokeLinecap="round"
        strokeDasharray="10 90"
        filter="url(#glow)"
        className="animate-[comet_1.8s_linear_infinite]"
        style={{ animationDirection: reverse ? "reverse" : "normal" }}
      />
    </g>
  );
}

/** App-style card: small label, bold status, a dot on the part it describes. */
function Card({ x, y, label, value, to, tone = "#0f202e", w = 250, k = 1, anchorRight = false }: {
  x: number; y: number; label: string; value: string; to: [number, number]; tone?: string; w?: number;
  k?: number; anchorRight?: boolean;
}) {
  // k enlarges the card on narrow screens; anchorRight keeps right-hand cards inside the frame.
  const cw = w * k;
  const ch = 92 * k;
  const cx = anchorRight ? Math.min(x, W - cw - 16) : Math.min(x, W - cw - 16);
  return (
    <g>
      <line x1={cx + 20 * k} y1={y + ch} x2={to[0]} y2={to[1]} stroke="#fff" strokeWidth={3 * k} strokeDasharray={`${4 * k} ${8 * k}`} opacity={0.9} />
      <circle cx={to[0]} cy={to[1]} r={9 * k} fill={GREEN} stroke="#fff" strokeWidth={3 * k} />
      <rect x={cx} y={y} width={cw} height={ch} rx={18 * k} fill="#ffffff" opacity={0.93} />
      <text x={cx + 22 * k} y={y + 34 * k} fontSize={22 * k} fontWeight={600} letterSpacing={2 * k} fill="#64748B">{label}</text>
      <text x={cx + 22 * k} y={y + 74 * k} fontSize={36 * k} fontWeight={800} fill={tone}>{value}</text>
    </g>
  );
}

/** Scale factor for labels: 1 on wide screens, up to ~2 on phones. */
function useLabelScale(ref: React.RefObject<HTMLDivElement | null>) {
  const [k, setK] = useState(1);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => {
      const width = e.contentRect.width;
      setK(Math.max(1, Math.min(2.1, 760 / width)));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return k;
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
  const frame = useRef<HTMLDivElement>(null);
  const k = useLabelScale(frame);

  useEffect(() => {
    if (!auto) return;
    const t = setInterval(() => setMode((m) => (m === "day" ? "night" : "day")), 6000);
    return () => clearInterval(t);
  }, [auto]);

  const current = MODES.find((m) => m.key === mode)!;

  return (
    <div className="space-y-5">
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

      <div ref={frame} className="relative w-full overflow-hidden rounded-2xl shadow-xl" style={{ aspectRatio: `${W} / ${H}` }}>
        <img
          src="/images/scene/shop-day.jpg"
          alt="A café with solar panels on its roof and an inverter and batteries on its outside wall, in daylight"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <img
          src="/images/scene/shop-night.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
          style={{ opacity: day ? 0 : 1 }}
        />

        <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 w-full h-full" role="img" aria-label={current.caption}>
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" />
            </filter>
          </defs>

          <Run d={RUNS.panels} live={day} />
          <Run d={RUNS.grid} live={false} />
          <Run d={RUNS.battery} live reverse={!day} />
          <Run d={RUNS.shop} live />

          {/* grid off marker on the pole cable */}
          <g className="transition-opacity duration-500" style={{ opacity: day ? 0 : 1 }}>
            <circle cx="178" cy="300" r="26" fill="#EF4444" stroke="#fff" strokeWidth="4" />
            <path d="M 166 288 L 190 312 M 190 288 L 166 312" stroke="#fff" strokeWidth="6" strokeLinecap="round" />
          </g>

          <Card k={k} x={k > 1.2 ? 700 : 980} y={24} label="SOLAR PANELS" value={day ? "Producing" : "Resting"} to={[1040, 215]}
            tone={day ? "#0f202e" : "#64748B"} />
          <Card k={k} x={16} y={k > 1.2 ? 520 : 470} label="THE GRID" value={day ? "Connected" : "Off"} to={[178, 400]}
            tone={day ? "#0f202e" : "#DC2626"} w={230} />
          <Card k={k} x={560} y={k > 1.2 ? 720 : 560} label="BATTERY" value={`${battery}%`} to={[478, 600]} w={210} />
          <Card k={k} anchorRight x={1290} y={k > 1.2 ? 330 : 150} label="YOUR BUSINESS" value="Running" to={[1300, 470]} w={270} />
        </svg>
      </div>

      <p key={mode} className="text-lg text-gray-700 font-medium animate-[rise_0.5s_ease-out_both]">
        {current.caption}
      </p>
      <p className="text-xs text-gray-400 -mt-3">Illustration. Your own system&rsquo;s readings appear in its monitoring app.</p>
    </div>
  );
}
