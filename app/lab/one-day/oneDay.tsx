"use client";
import React, { useEffect, useRef, useState } from "react";

// PROTOTYPE — "One Day in Kigali".
// A pinned, full-screen hillside scene. Scrolling moves the clock from dawn to
// midnight: the sky, sun, shadows and lights all follow. At 19:30 the grid
// fails; the neighbour, the street and the city go dark, the three SolarHope
// buildings stay lit on their batteries. Illustrative, not a measurement.

const START = 5.5;
const END = 24;
const CUT = 19.5;

// ---------- small helpers ----------
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (a: number, b: number, v: number) => {
  const t = clamp((v - a) / (b - a));
  return t * t * (3 - 2 * t);
};
const hex = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const mix = (a: string, b: string, t: number) => {
  const A = hex(a);
  const B = hex(b);
  return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * t)).join(",")})`;
};
function keyed(keys: [number, string][], h: number) {
  for (let i = 0; i < keys.length - 1; i++) {
    const [h0, c0] = keys[i];
    const [h1, c1] = keys[i + 1];
    if (h <= h1) return mix(c0, c1, smooth(h0, h1, h));
  }
  return keys[keys.length - 1][1];
}
const clock = (h: number) => {
  const hh = Math.floor(h) % 24;
  const mm = Math.floor((h % 1) * 60 / 5) * 5;
  return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
};

const SKY_TOP: [number, string][] = [
  [5.5, "#0b1430"], [6.3, "#33407a"], [7.5, "#5b9bd5"], [12, "#2f7fe0"],
  [16.5, "#4a8fd6"], [18, "#3d3f7d"], [19, "#1a1b44"], [20.5, "#070b1d"], [24, "#050816"],
];
const SKY_BOTTOM: [number, string][] = [
  [5.5, "#1b2a4a"], [6.3, "#f3a35b"], [7.5, "#ffd9a8"], [12, "#bfe2ff"],
  [16.5, "#ffe1a6"], [18, "#ff8a45"], [19, "#6a3c6e"], [20.5, "#141b36"], [24, "#0d1328"],
];

// Story beats shown as captions.
const BEATS: [number, string, string][] = [
  [5.5, "05:30", "Kigali before sunrise."],
  [6.4, "Sunrise", "The panels wake up with the sun."],
  [9, "Morning", "The sun is running the house. Whatever is left over goes into the battery."],
  [12, "Midday", "More power than the house needs. The battery keeps filling."],
  [16.5, "Afternoon", "Battery full. Ready for the evening."],
  [18.2, "Sunset", "The sun goes down. The battery takes over the evening."],
  [CUT, "Power cut", "The grid goes down. The street goes dark."],
  [20.2, "Evening", "Your lights stay on. Nobody had to flip a switch."],
  [22.5, "Late night", "Still running on the sun you stored this afternoon."],
];

// Fixed star field.
const STARS = Array.from({ length: 70 }, (_, i) => ({
  x: (i * 977) % 1600,
  y: (i * 613) % 380,
  r: 0.6 + ((i * 37) % 10) / 10,
}));
// Distant city lights on the far hill.
const CITY = Array.from({ length: 46 }, (_, i) => ({
  x: 40 + ((i * 331) % 1520),
  y: 470 + ((i * 97) % 60),
}));

// ---------- building pieces ----------
function Panels({ x, y, w, glint }: { x: number; y: number; w: number; glint: number }) {
  const n = Math.max(2, Math.round(w / 34));
  const cw = w / n;
  return (
    <g>
      {Array.from({ length: n }, (_, i) => (
        <path
          key={i}
          d={`M ${x + i * cw + 6} ${y} h ${cw - 3} l -6 16 h ${-(cw - 3)} Z`}
          fill="#1d3766"
          stroke="#9fb3d1"
          strokeWidth={0.8}
        />
      ))}
      <path d={`M ${x + 6} ${y} h ${w - 3} l -6 16 h ${-(w - 3)} Z`} fill="#ffe9b0" opacity={glint * 0.45} />
    </g>
  );
}

function Windows({ xs, y, w, h, lit }: { xs: number[]; y: number; w: number; h: number; lit: number }) {
  return (
    <g>
      {xs.map((x) => (
        <g key={x}>
          {lit > 0.02 && <rect x={x - 6} y={y - 6} width={w + 12} height={h + 12} rx={6} fill="#ffcf6b" opacity={lit * 0.25} />}
          <rect x={x} y={y} width={w} height={h} rx={2} fill={mix("#3a4a66", "#ffd27a", lit)} />
        </g>
      ))}
    </g>
  );
}

function Flow({ d, on, reverse = false }: { d: string; on: number; reverse?: boolean }) {
  if (on < 0.05) return null;
  return (
    <g opacity={on}>
      <path d={d} fill="none" stroke="#4ADE80" strokeWidth={6} opacity={0.25} strokeLinecap="round" />
      <path
        d={d}
        fill="none"
        stroke="#bbf7d0"
        strokeWidth={3}
        strokeDasharray="6 14"
        strokeLinecap="round"
        className="animate-[flow_0.7s_linear_infinite]"
        style={{ animationDirection: reverse ? "reverse" : "normal" }}
      />
    </g>
  );
}

export default function OneDay() {
  const ref = useRef<HTMLDivElement>(null);
  const [h, setH] = useState(START);
  // Phones: frame the scene on the home and the neighbour.
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setNarrow(mq.matches);
    const on = (e: MediaQueryListEvent) => setNarrow(e.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = clamp(-r.top / total);
      setH(START + p * (END - START));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // ---------- derived state ----------
  const sunUp = clamp(Math.sin((Math.PI * (h - 6)) / 12.5), 0, 1); // 0..1 elevation
  const light = Math.max(sunUp, 0.12 * smooth(5.5, 6.5, h) * (1 - smooth(19, 20.5, h)));
  const dusk = smooth(17.6, 19.2, h); // indoor lights come on
  const gridOn = h < CUT;
  const cutFade = smooth(CUT - 0.05, CUT + 0.15, h); // the moment of the cut
  const night = smooth(18.4, 20.3, h);

  // Battery: illustrative only. Fills by day, drains slowly in the evening.
  const battery = Math.round(
    h < 6.5 ? 38 : h < 15 ? 38 + (62 * (h - 6.5)) / 8.5 : h < 18 ? 100 : 100 - (55 * (h - 18)) / 6,
  );

  const sunX = narrow ? 200 + ((h - 6) / 12.5) * 400 : 100 + ((h - 6) / 12.5) * 1400;
  const sunY = 640 - sunUp * 470;
  const moonOn = smooth(19.5, 21, h);
  const moonX = narrow ? 260 + ((h - 19.5) / 4.5) * 250 : 300 + ((h - 19.5) / 4.5) * 600;

  const hillFar = mix("#123049", "#7aa6b8", light);
  const hillMid = mix("#0d2438", "#5f8f4e", light);
  const hillNear = mix("#0a1b2a", "#3f6b3a", light);
  const wall = mix("#2a3346", "#f4efe6", light);
  const wallShade = mix("#1e2636", "#d9d0c0", light);
  const roof = mix("#1c2230", "#7b4a35", light);
  const road = mix("#141a24", "#6b6f75", light);

  const solarLit = dusk; // SolarHope buildings: stay lit after the cut
  const neighbourLit = dusk * (1 - cutFade); // neighbour: goes dark at the cut
  const streetLit = smooth(18.3, 18.9, h) * (1 - cutFade);
  const cityLit = smooth(18.4, 19.2, h) * (1 - cutFade);

  const dayFlow = smooth(6.6, 8, h) * (1 - smooth(17.5, 18.4, h));
  const nightFlow = smooth(18, 18.8, h);

  const beat = [...BEATS].reverse().find(([t]) => h >= t) ?? BEATS[0];

  // Shadow direction follows the sun.
  const shadowSkew = ((h - 12) / 6) * 40;

  return (
    <div ref={ref} className="relative h-[700vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <svg viewBox={narrow ? "150 0 660 900" : "0 0 1600 900"} preserveAspectRatio="xMidYMax slice" className="absolute inset-0 w-full h-full" aria-hidden="true">
          <defs>
            <linearGradient id="od-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={keyed(SKY_TOP, h)} />
              <stop offset="1" stopColor={keyed(SKY_BOTTOM, h)} />
            </linearGradient>
            <radialGradient id="od-sun">
              <stop offset="0" stopColor="#fff7d6" />
              <stop offset="0.35" stopColor="#ffd36b" />
              <stop offset="1" stopColor="#ffb02e" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="od-lamp">
              <stop offset="0" stopColor="#ffd98a" stopOpacity="0.9" />
              <stop offset="1" stopColor="#ffd98a" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Sky */}
          <rect width="1600" height="900" fill="url(#od-sky)" />

          {/* Stars and moon */}
          <g opacity={night}>
            {STARS.map((s, i) => (
              <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#fff" opacity={0.5 + (i % 3) * 0.2} />
            ))}
          </g>
          <circle cx={moonX} cy={150} r={26} fill="#f4f1e6" opacity={moonOn * 0.9} />

          {/* Sun */}
          {h > 5.6 && h < 18.8 && (
            <g opacity={smooth(5.6, 6.3, h) * (1 - smooth(18.2, 18.8, h))}>
              <circle cx={sunX} cy={sunY} r={150} fill="url(#od-sun)" opacity={0.6} />
              <circle cx={sunX} cy={sunY} r={34} fill="#fff3c4" />
            </g>
          )}

          {/* Far hill with the city */}
          <path d="M0 520 C 180 440 360 470 520 455 C 700 435 860 500 1040 470 C 1220 440 1400 470 1600 445 L1600 900 L0 900 Z" fill={hillFar} />
          <g>
            {CITY.map((c, i) => (
              <circle key={i} cx={c.x} cy={c.y} r={1.8} fill="#ffd27a" opacity={cityLit * (0.5 + (i % 4) * 0.15)} />
            ))}
          </g>

          {/* Mid hill */}
          <path d="M0 600 C 200 540 420 590 640 560 C 860 530 1080 600 1300 570 C 1430 552 1520 560 1600 555 L1600 900 L0 900 Z" fill={hillMid} />

          {/* Power line across the scene */}
          <g opacity={0.9}>
            <path d="M40 520 L 70 470 L 100 520 M 70 470 L 70 640" stroke={mix("#3b4658", "#8a94a3", light)} strokeWidth={4} fill="none" />
            <path
              d="M70 480 C 400 560 800 560 1560 500"
              stroke={gridOn ? mix("#3b4658", "#5b6573", light) : "#7f1d1d"}
              strokeWidth={2.5}
              strokeDasharray={gridOn ? undefined : "10 8"}
              fill="none"
            />
            {!gridOn && (
              <g transform="translate(70 455)" opacity={cutFade}>
                <circle r={16} fill="#ef4444" stroke="#fff" strokeWidth={3} />
                <path d="M -6 -6 L 6 6 M 6 -6 L -6 6" stroke="#fff" strokeWidth={3.5} strokeLinecap="round" />
              </g>
            )}
          </g>

          {/* Near hill and road */}
          <path d="M0 700 C 300 660 600 690 900 672 C 1200 655 1400 680 1600 668 L1600 900 L0 900 Z" fill={hillNear} />
          <path d="M0 800 C 400 770 900 790 1600 760 L1600 812 C 900 842 400 822 0 852 Z" fill={road} />

          {/* Street lamps */}
          {[220, 620, 1020, 1420].map((x, i) => {
            const y = 800 - i * 10;
            return (
              <g key={x}>
                <circle cx={x + 14} cy={y - 92} r={70} fill="url(#od-lamp)" opacity={streetLit} />
                <path d={`M${x} ${y} V ${y - 90} h 16`} stroke={mix("#2c3442", "#4b5563", light)} strokeWidth={4} fill="none" />
                <circle cx={x + 16} cy={y - 90} r={5} fill={streetLit > 0.3 ? "#ffe2a0" : mix("#2c3442", "#9ca3af", light)} />
              </g>
            );
          })}

          {/* ---------- Buildings ---------- */}
          {/* Shadows */}
          <g opacity={0.25 * sunUp}>
            {[[150, 330], [560, 380], [1010, 420], [1380, 170]].map(([x, w]) => (
              <path key={x} d={`M${x} 716 l ${w} 0 l ${shadowSkew} 22 l ${-w} 0 Z`} fill="#000" />
            ))}
          </g>

          {/* Home (SolarHope) */}
          <g>
            <rect x={150} y={560} width={330} height={156} fill={wall} />
            <path d="M130 566 L315 470 L500 566 Z" fill={roof} />
            <Panels x={258} y={500} w={150} glint={sunUp} />
            <Windows xs={[185, 270, 395]} y={600} w={55} h={45} lit={solarLit} />
            <rect x={340} y={640} width={40} height={76} fill={wallShade} />
            {/* battery box */}
            <rect x={455} y={650} width={16} height={34} rx={3} fill="#e5e7eb" stroke="#9ca3af" />
            <rect x={458} y={653 + 28 * (1 - battery / 100)} width={10} height={28 * (battery / 100)} fill="#4ADE80" />
            <Flow d="M330 520 C 360 560 440 600 462 650" on={dayFlow} />
            <Flow d="M462 660 C 420 640 330 630 240 622" on={nightFlow} />
          </g>

          {/* Neighbour without solar */}
          <g>
            <rect x={560} y={600} width={210} height={116} fill={wallShade} />
            <path d="M545 604 L665 540 L785 604 Z" fill={roof} />
            <Windows xs={[590, 690]} y={630} w={48} h={40} lit={neighbourLit} />
            <text x={665} y={760} textAnchor="middle" fontSize={15} fill={mix("#94a3b8", "#334155", light)} opacity={0.9}>
              Neighbour, no solar
            </text>
          </g>

          {/* Shop (SolarHope) */}
          <g>
            <rect x={850} y={590} width={320} height={126} fill={wall} />
            <rect x={840} y={570} width={340} height={26} fill={roof} />
            <Panels x={870} y={548} w={280} glint={sunUp} />
            <rect x={880} y={620} width={160} height={80} rx={3} fill={mix("#3a4a66", "#ffdd8a", solarLit)} />
            {solarLit > 0.05 && <rect x={870} y={610} width={180} height={100} rx={8} fill="#ffcf6b" opacity={solarLit * 0.2} />}
            <text x={960} y={666} textAnchor="middle" fontSize={20} fontWeight={700} fill={mix("#94a3b8", "#7a3d10", solarLit)}>
              OPEN
            </text>
            <Windows xs={[1070]} y={625} w={70} h={50} lit={solarLit} />
            <rect x={1150} y={650} width={16} height={34} rx={3} fill="#e5e7eb" stroke="#9ca3af" />
            <rect x={1153} y={653 + 28 * (1 - battery / 100)} width={10} height={28 * (battery / 100)} fill="#4ADE80" />
            <Flow d="M1010 566 C 1060 600 1140 620 1158 650" on={dayFlow} />
            <Flow d="M1158 660 C 1100 650 1020 660 960 662" on={nightFlow} />
          </g>

          {/* School (SolarHope) */}
          <g>
            <rect x={1250} y={610} width={300} height={106} fill={wall} />
            <path d="M1236 614 L1400 556 L1564 614 Z" fill={roof} />
            <Panels x={1320} y={572} w={170} glint={sunUp} />
            <Windows xs={[1275, 1350, 1425, 1495]} y={640} w={40} h={36} lit={solarLit} />
            <rect x={1530} y={660} width={14} height={30} rx={3} fill="#e5e7eb" stroke="#9ca3af" />
            <Flow d="M1400 590 C 1460 620 1520 640 1537 660" on={dayFlow} />
          </g>

          {/* Labels on the SolarHope buildings */}
          {[[315, "Home"], [1010, "Shop"], [1400, "School"]].map(([x, t]) => (
            <g key={t as string}>
              <rect x={(x as number) - 46} y={742} width={92} height={26} rx={13} fill="#EA9D13" />
              <text x={x as number} y={760} textAnchor="middle" fontSize={14} fontWeight={700} fill="#091928">
                {t as string}
              </text>
            </g>
          ))}
        </svg>

        {/* Clock and status card */}
        <div className="absolute top-24 right-4 sm:right-8 w-56 rounded-2xl bg-dark-blue/80 backdrop-blur-md text-white p-4 shadow-2xl border border-white/10">
          <p className="text-4xl font-extrabold tabular-nums tracking-tight">{clock(h)}</p>
          <div className="mt-3 space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-white/60">Grid</span>
              <span className={`flex items-center gap-1.5 font-semibold ${gridOn ? "text-green-400" : "text-red-400"}`}>
                <span className={`h-2 w-2 rounded-full ${gridOn ? "bg-green-400" : "bg-red-500 animate-pulse"}`} />
                {gridOn ? "On" : "Off"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/60">Sun</span>
              <span className="font-semibold">{sunUp > 0.05 ? "Charging" : "—"}</span>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <span className="text-white/60">Battery</span>
                <span className="font-semibold tabular-nums">{battery}%</span>
              </div>
              <div className="mt-1 h-2 rounded-full bg-white/15 overflow-hidden">
                <div className="h-full rounded-full bg-green-400" style={{ width: `${battery}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Story caption */}
        <div className="absolute left-4 right-4 sm:right-auto sm:left-12 top-[18.5rem] sm:top-24 max-w-md">
          <div key={beat[1]} className="rounded-2xl bg-dark-blue/75 backdrop-blur-md text-white px-6 py-5 shadow-2xl animate-[rise_0.5s_ease-out_both]">
            <p className="text-yellow text-xs font-semibold uppercase tracking-widest">{beat[1]}</p>
            <p className="mt-1 text-xl sm:text-2xl font-bold leading-snug">{beat[2]}</p>
          </div>
          {h < 6.2 && (
            <p className="mt-3 text-white/70 text-sm animate-pulse">Scroll to move the sun ↓</p>
          )}
        </div>

        {/* Progress along the day */}
        <div className="absolute left-0 right-0 bottom-0 h-1 bg-white/10">
          <div className="h-full bg-yellow" style={{ width: `${((h - START) / (END - START)) * 100}%` }} />
        </div>
      </div>
    </div>
  );
}
