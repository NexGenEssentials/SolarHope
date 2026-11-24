"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";

// PROTOTYPE — "The Grid Goes Down".
// Flip the switch: the whole page loses power (flicker, then dark), then light
// spreads back out from the battery, and the page carries on running on it.

type Phase = "on" | "cutting" | "dark" | "relight" | "backup" | "restoring";

const CUT_MS = 650; // flicker
const DARK_MS = 900; // full darkness
const RELIGHT_MS = 1600; // light spreading from the battery

export default function GridDown({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<Phase>("on");
  const [radius, setRadius] = useState(0);
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const [sound, setSound] = useState(false);
  const batteryRef = useRef<HTMLDivElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const raf = useRef(0);
  const audio = useRef<AudioContext | null>(null);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return () => {
      timers.current.forEach(clearTimeout);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  // A short relay "clunk", made in the browser (no audio files).
  const clunk = useCallback(
    (pitch = 90) => {
      if (!sound) return;
      const ctx = (audio.current ??= new AudioContext());
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "square";
      o.frequency.setValueAtTime(pitch, ctx.currentTime);
      o.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.08);
      g.gain.setValueAtTime(0.12, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12);
      o.connect(g).connect(ctx.destination);
      o.start();
      o.stop(ctx.currentTime + 0.13);
    },
    [sound],
  );

  const cut = () => {
    if (phase !== "on") return;
    timers.current.forEach(clearTimeout);
    clunk(120);
    const b = batteryRef.current?.getBoundingClientRect();
    const o = b ? { x: b.left + b.width / 2, y: b.top + b.height / 2 } : { x: innerWidth / 2, y: innerHeight / 2 };
    setOrigin(o);
    setRadius(0);
    setPhase("cutting");
    const cutMs = reduced.current ? 0 : CUT_MS;
    timers.current.push(setTimeout(() => setPhase("dark"), cutMs));
    timers.current.push(
      setTimeout(() => {
        clunk(70);
        setPhase("relight");
        // Farthest corner from the battery, so the light reaches everything.
        const max = Math.max(
          Math.hypot(o.x, o.y),
          Math.hypot(innerWidth - o.x, o.y),
          Math.hypot(o.x, innerHeight - o.y),
          Math.hypot(innerWidth - o.x, innerHeight - o.y),
        ) + 120;
        const start = performance.now();
        const dur = reduced.current ? 1 : RELIGHT_MS;
        const tick = (t: number) => {
          const p = Math.min(1, (t - start) / dur);
          setRadius(max * (1 - Math.pow(1 - p, 3)));
          if (p < 1) raf.current = requestAnimationFrame(tick);
          else setPhase("backup");
        };
        raf.current = requestAnimationFrame(tick);
      }, cutMs + (reduced.current ? 300 : DARK_MS)),
    );
  };

  const restore = () => {
    if (phase !== "backup") return;
    clunk(110);
    setPhase("restoring");
    timers.current.push(setTimeout(() => setPhase("on"), 2600));
  };

  const dark = phase === "cutting" || phase === "dark" || phase === "relight";
  const gridOn = phase === "on" || phase === "restoring";

  return (
    <>
      {/* Control bar */}
      <div className="sticky top-24 z-40 mx-auto max-w-3xl px-4">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-white/95 backdrop-blur shadow-xl border border-gray-200 px-5 py-4">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={gridOn ? cut : restore}
              disabled={dark}
              aria-pressed={!gridOn}
              className="group flex items-center gap-3 disabled:cursor-wait"
            >
              {/* The physical-looking switch */}
              <span
                className={`relative h-9 w-16 rounded-full border-2 transition-colors ${
                  gridOn ? "bg-green-500 border-green-600" : "bg-gray-300 border-gray-400"
                }`}
              >
                <span
                  className={`absolute top-0.5 h-7 w-7 rounded-full bg-white shadow-md transition-all duration-200 ${
                    gridOn ? "left-[calc(100%-1.9rem)]" : "left-0.5"
                  }`}
                />
              </span>
              <span className="text-left">
                <span className="block font-bold text-gray-900">
                  {gridOn ? "Cut the grid" : "Restore the grid"}
                </span>
                <span className="block text-xs text-gray-500">
                  {gridOn ? "See what a power cut looks like with SolarHope" : "Bring the grid back"}
                </span>
              </span>
            </button>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className={`flex items-center gap-2 rounded-full px-3 py-1 font-semibold ${gridOn ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}>
              <span className={`h-2 w-2 rounded-full ${gridOn ? "bg-green-500" : "bg-red-500 animate-pulse"}`} />
              Grid {gridOn ? "on" : "off"}
            </span>
            <label className="flex items-center gap-1.5 text-gray-500 cursor-pointer select-none">
              <input type="checkbox" checked={sound} onChange={(e) => setSound(e.target.checked)} />
              Sound
            </label>
          </div>
        </div>
      </div>

      {children}

      {/* The battery: where the light comes back from */}
      <div
        ref={batteryRef}
        className={`fixed bottom-6 right-6 z-[80] flex items-center gap-3 rounded-full px-4 py-2.5 shadow-2xl transition-colors duration-500 ${
          phase === "backup" || phase === "relight" ? "bg-yellow text-dark-blue" : "bg-dark-blue text-white"
        }`}
      >
        <span className="relative h-5 w-9 rounded-[5px] border-2 border-current">
          <span className="absolute -right-[5px] top-1/2 h-2 w-[3px] -translate-y-1/2 rounded-r bg-current" />
          <span className={`absolute inset-0.5 rounded-[2px] bg-current transition-all duration-700 ${phase === "backup" ? "right-[30%]" : "right-[12%]"}`} />
        </span>
        <span className="text-sm font-bold">
          {phase === "backup" || phase === "relight" ? "Running on battery" : "Battery ready"}
        </span>
      </div>

      {/* Darkness overlay with a hole of light growing from the battery */}
      {dark && (
        <div
          aria-hidden="true"
          className={`fixed inset-0 z-[70] pointer-events-none bg-[#02060d] ${
            phase === "cutting" ? "animate-[flicker_0.65s_steps(1,end)_both]" : ""
          }`}
          style={
            phase === "relight"
              ? {
                  maskImage: `radial-gradient(circle at ${origin.x}px ${origin.y}px, transparent ${radius}px, black ${radius + 140}px)`,
                  WebkitMaskImage: `radial-gradient(circle at ${origin.x}px ${origin.y}px, transparent ${radius}px, black ${radius + 140}px)`,
                }
              : { opacity: phase === "dark" ? 0.94 : undefined }
          }
        />
      )}

      {/* Gold ring riding the edge of the returning light */}
      {phase === "relight" && (
        <div
          aria-hidden="true"
          className="fixed z-[75] pointer-events-none rounded-full border-2 border-yellow"
          style={{
            left: origin.x - radius,
            top: origin.y - radius,
            width: radius * 2,
            height: radius * 2,
            boxShadow: "0 0 60px 10px rgba(234,157,19,0.45), inset 0 0 60px 10px rgba(234,157,19,0.25)",
            opacity: 0.9,
          }}
        />
      )}

      {/* "Power cut" label during the darkness */}
      {phase === "dark" && (
        <p className="fixed inset-x-0 top-1/2 z-[78] -translate-y-1/2 text-center text-white/70 text-lg tracking-[0.3em] uppercase pointer-events-none">
          Power cut
        </p>
      )}

      {/* Message once running on battery / grid back */}
      {(phase === "backup" || phase === "restoring") && (
        <div
          role="status"
          className="fixed left-1/2 bottom-24 z-[80] -translate-x-1/2 w-[min(92vw,520px)] rounded-2xl bg-dark-blue text-white px-6 py-5 shadow-2xl animate-[rise_0.5s_ease-out_both]"
        >
          {phase === "backup" ? (
            <>
              <p className="text-xl font-bold">
                A blink, and the lights are back.
              </p>
              <p className="mt-1 text-white/75 text-sm">
                Your SolarHope system switched to the battery by itself: no
                generator to start, no switch to flip.
              </p>
            </>
          ) : (
            <>
              <p className="text-xl font-bold">Grid back.</p>
              <p className="mt-1 text-white/75 text-sm">
                The system switched back by itself and is recharging the battery.
              </p>
            </>
          )}
        </div>
      )}
    </>
  );
}
