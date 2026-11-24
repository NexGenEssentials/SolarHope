"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";

// PROTOTYPE — "Live from our monitoring room".
// An interactive version of the monitoring dashboard the SolarHope team uses.
// Pick a scenario and watch power move between panels, grid, battery and home.
// Values are illustrative, in the style of the real dashboard.

type Dir = 1 | -1 | 0; // 1 = towards the inverter, -1 = away from it, 0 = idle
type Scenario = {
  key: string;
  label: string;
  emoji: string;
  pv: number;
  grid: number; // + importing
  gridOn: boolean;
  battery: number; // + charging, - discharging
  soc: number; // %
  load: number;
  team: string;
  you: string;
  alarm?: string;
};

const SCENARIOS: Scenario[] = [
  {
    key: "sunny",
    label: "Sunny midday",
    emoji: "☀️",
    pv: 3850,
    grid: 0,
    gridOn: true,
    battery: 2600,
    soc: 78,
    load: 1250,
    team: "Panels are covering the whole house, and the extra is filling the battery.",
    you: "You are running on the sun. The grid is not needed right now.",
  },
  {
    key: "cloudy",
    label: "Cloudy",
    emoji: "☁️",
    pv: 950,
    grid: 220,
    gridOn: true,
    battery: 0,
    soc: 64,
    load: 1170,
    team: "Less sun. The panels still do most of the work; the grid tops up the rest.",
    you: "Nothing to do. The system decides where the power comes from.",
  },
  {
    key: "evening",
    label: "Evening",
    emoji: "🌆",
    pv: 0,
    grid: 0,
    gridOn: true,
    battery: -1480,
    soc: 82,
    load: 1400,
    team: "The sun is down. The battery is running the house with the power stored this afternoon.",
    you: "Your evening runs on today's sunshine.",
  },
  {
    key: "cut",
    label: "Power cut",
    emoji: "⚡",
    pv: 0,
    grid: 0,
    gridOn: false,
    battery: -520,
    soc: 69,
    load: 470,
    team: "Grid lost. The system switched to the battery by itself. We see it on this screen as it happens.",
    you: "The lights stay on. No generator, no switch to flip.",
    alarm: "Grid lost · switched to battery automatically",
  },
];

// ---------- live-ish numbers ----------
function useTween(target: number, ms = 900) {
  const [v, setV] = useState(target);
  const from = useRef(target);
  useEffect(() => {
    const a = from.current;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / ms);
      const val = a + (target - a) * (1 - Math.pow(1 - p, 3));
      from.current = val;
      setV(val);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, ms]);
  return v;
}

function useJitter(on: boolean) {
  const [j, setJ] = useState(1);
  useEffect(() => {
    if (!on) return;
    const t = setInterval(() => setJ(0.97 + Math.random() * 0.06), 1400);
    return () => clearInterval(t);
  }, [on]);
  return on ? j : 1;
}

const W = (n: number) => `${Math.round(Math.abs(n)).toLocaleString("en-US")}`;

// ---------- icons ----------
const PanelIcon = () => (
  <svg viewBox="0 0 48 40" className="h-10 w-12">
    {[0, 1, 2].map((r) =>
      [0, 1, 2].map((c) => (
        <path key={`${r}${c}`} d={`M${8 + c * 12 - r * 3} ${4 + r * 10} h10 l-3 8 h-10 Z`} fill="#3b6fd4" stroke="#9fc0ff" strokeWidth={0.8} />
      )),
    )}
  </svg>
);
const GridIcon = ({ on }: { on: boolean }) => (
  <svg viewBox="0 0 40 44" className="h-11 w-10">
    <path d="M20 2 L10 42 M20 2 L30 42 M12 16 H28 M10 26 H30 M16 2 H24" stroke="#cbd5e1" strokeWidth={2} fill="none" />
    {!on && (
      <g transform="translate(30 34)">
        <circle r={8} fill="#ef4444" />
        <path d="M-3 -3 L3 3 M3 -3 L-3 3" stroke="#fff" strokeWidth={2} strokeLinecap="round" />
      </g>
    )}
  </svg>
);
const BatteryIcon = ({ soc, charging }: { soc: number; charging: boolean }) => (
  <svg viewBox="0 0 30 44" className="h-11 w-8">
    <rect x={9} y={1} width={12} height={4} rx={1} fill="#94a3b8" />
    <rect x={2} y={5} width={26} height={37} rx={4} fill="#0f172a" stroke="#94a3b8" strokeWidth={2} />
    <rect x={5} y={8 + 31 * (1 - soc / 100)} width={20} height={31 * (soc / 100)} rx={2} fill="#4ade80" />
    {charging && <path d="M16 14 L11 25 H16 L13 35 L21 21 H16 L19 14 Z" fill="#fff" opacity={0.9} />}
  </svg>
);
const HomeIcon = () => (
  <svg viewBox="0 0 44 40" className="h-10 w-11">
    <path d="M4 19 L22 4 L40 19" stroke="#cbd5e1" strokeWidth={2.5} fill="none" strokeLinejoin="round" />
    <rect x={9} y={18} width={26} height={20} fill="#1e293b" stroke="#cbd5e1" strokeWidth={2} />
    <rect x={14} y={23} width={7} height={6} fill="#fcd34d" />
    <rect x={24} y={23} width={7} height={6} fill="#fcd34d" />
  </svg>
);

// ---------- flow line ----------
function Line({ d, dir, color = "#38bdf8" }: { d: string; dir: Dir; color?: string }) {
  return (
    <g>
      <path d={d} fill="none" stroke="#1e3a5f" strokeWidth={3} />
      {dir !== 0 && (
        <>
          <path d={d} fill="none" stroke={color} strokeWidth={3} opacity={0.35} />
          <path
            d={d}
            fill="none"
            stroke={color}
            strokeWidth={6}
            strokeLinecap="round"
            strokeDasharray="0.1 31.9"
            className="animate-[flow_0.9s_linear_infinite]"
            style={{ animationDirection: dir === 1 ? "normal" : "reverse", filter: `drop-shadow(0 0 4px ${color})` }}
          />
        </>
      )}
    </g>
  );
}

export default function Monitor() {
  const [i, setI] = useState(0);
  const s = SCENARIOS[i];
  const [now, setNow] = useState<Date | null>(null);
  const [events, setEvents] = useState<{ t: string; text: string }[]>([]);
  const live = useJitter(true);

  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const pick = (n: number) => {
    setI(n);
    const sc = SCENARIOS[n];
    if (sc.alarm) {
      const t = new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
      setEvents((e) => [{ t, text: sc.alarm! }, ...e].slice(0, 4));
    }
  };

  const pv = useTween(s.pv * (s.pv ? live : 1));
  const grid = useTween(s.grid * (s.grid ? live : 1));
  const bat = useTween(s.battery * (s.battery ? live : 1));
  const load = useTween(s.load * live);
  const soc = useTween(s.soc, 1600);

  const dirs = useMemo(
    () => ({
      pv: (s.pv > 0 ? 1 : 0) as Dir,
      grid: (s.grid > 0 ? 1 : 0) as Dir,
      bat: (s.battery > 0 ? -1 : s.battery < 0 ? 1 : 0) as Dir,
      load: -1 as Dir,
    }),
    [s],
  );

  const stamp = now
    ? now.toLocaleString("en-CA", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }).replace(",", "")
    : "";

  return (
    <div className="grid lg:grid-cols-[1.6fr_1fr] gap-5">
      {/* Flow graph card, styled like the real dashboard */}
      <div className="rounded-2xl bg-[#262626] text-white shadow-2xl overflow-hidden border border-white/5">
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-white/10">
          <p className="font-bold">Flow Graph</p>
          <p className="text-xs text-white/60 tabular-nums">Update time: {stamp} <span className="text-green-400">● live</span></p>
        </div>

        <div className="relative px-3 sm:px-6 py-6">
          <svg viewBox="0 0 800 360" className="w-full h-auto">
            {/* lines into the inverter at (400,180) */}
            <Line d="M120 90 V 160 H 380" dir={dirs.pv} color="#facc15" />
            <Line d="M680 90 V 160 H 420" dir={dirs.grid} color="#38bdf8" />
            <Line d="M120 270 V 200 H 380" dir={dirs.bat} color="#4ade80" />
            <Line d="M680 270 V 200 H 420" dir={dirs.load} color="#38bdf8" />
            {/* inverter */}
            <rect x={370} y={150} width={60} height={60} rx={12} fill="#fff" />
            <path d="M392 168 h12 l-2 6 h-12 Z M388 177 h18 l-2 6 h-18 Z M386 186 h12 l-2 6 h-12 Z" fill="#EA9D13" transform="translate(4 0)" />
          </svg>

          {/* Node labels positioned over the SVG */}
          <div className="absolute left-[6%] top-[6%] flex items-center gap-3">
            <PanelIcon />
            <div>
              <p className="text-xs text-white/60">Solar panels</p>
              <p className="text-xl font-bold tabular-nums">{W(pv)} <span className="text-sm font-normal text-white/60">W</span></p>
            </div>
          </div>
          <div className="absolute right-[5%] top-[6%] flex items-center gap-3 text-right">
            <div>
              <p className="text-xs text-white/60">Grid</p>
              <p className={`text-xl font-bold tabular-nums ${s.gridOn ? "" : "text-red-400"}`}>
                {s.gridOn ? <>{W(grid)} <span className="text-sm font-normal text-white/60">W</span></> : "OFF"}
              </p>
            </div>
            <GridIcon on={s.gridOn} />
          </div>
          <div className="absolute left-[6%] bottom-[8%] flex items-center gap-3">
            <BatteryIcon soc={soc} charging={s.battery > 0} />
            <div>
              <p className="text-xs text-white/60">{s.battery > 0 ? "Charging" : s.battery < 0 ? "Discharging" : "Battery idle"}</p>
              <p className="text-xl font-bold tabular-nums">{W(bat)} <span className="text-sm font-normal text-white/60">W</span></p>
              <p className="text-sm font-bold text-green-400 tabular-nums">{Math.round(soc)}%</p>
            </div>
          </div>
          <div className="absolute right-[5%] bottom-[8%] flex items-center gap-3 text-right">
            <div>
              <p className="text-xs text-white/60">Home</p>
              <p className="text-xl font-bold tabular-nums">{W(load)} <span className="text-sm font-normal text-white/60">W</span></p>
            </div>
            <HomeIcon />
          </div>
        </div>

        {/* Scenario tabs, styled like the dashboard's pill buttons */}
        <div className="flex flex-wrap gap-2 px-5 pb-5">
          {SCENARIOS.map((sc, n) => (
            <button
              key={sc.key}
              type="button"
              onClick={() => pick(n)}
              aria-pressed={n === i}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                n === i ? "bg-[#c2410c] text-white" : "bg-white/10 text-white/80 hover:bg-white/20"
              }`}
            >
              <span className="mr-1.5">{sc.emoji}</span>
              {sc.label}
            </button>
          ))}
        </div>
      </div>

      {/* What it means */}
      <div className="space-y-4">
        <div key={s.key} className="rounded-2xl bg-white p-6 shadow-xl animate-[rise_0.4s_ease-out_both]">
          <p className="text-xs uppercase tracking-wider text-gray-400">What our team sees</p>
          <p className="mt-2 text-lg font-semibold text-gray-900 leading-snug">{s.team}</p>
          <div className="mt-5 border-t border-gray-100 pt-4">
            <p className="text-xs uppercase tracking-wider text-gray-400">What you notice</p>
            <p className="mt-2 text-gray-700">{s.you}</p>
          </div>
        </div>

        <div className="rounded-2xl bg-[#262626] text-white p-5 shadow-xl">
          <p className="font-bold">Alarm</p>
          {events.length === 0 ? (
            <p className="mt-2 text-sm text-white/50">No alarms. Try &ldquo;Power cut&rdquo;.</p>
          ) : (
            <ul className="mt-3 space-y-2">
              {events.map((e, n) => (
                <li key={e.t + n} className={`flex gap-3 text-sm ${n === 0 ? "animate-[rise_0.4s_ease-out_both]" : "opacity-60"}`}>
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-red-500" />
                  <span>
                    <span className="text-white/50 tabular-nums mr-2">{e.t}</span>
                    {e.text}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <p className="text-xs text-gray-500">Illustrative values, in the style of our real monitoring dashboard.</p>
      </div>
    </div>
  );
}
