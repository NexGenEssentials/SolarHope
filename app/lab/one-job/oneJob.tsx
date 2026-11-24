"use client";
import React, { useEffect, useRef, useState } from "react";

// PROTOTYPE — "One installation, start to finish".
// A pinned, full-screen story told with SolarHope's own photos. Scrolling
// moves through the job: each photo pushes in slowly (camera move) and
// cross-fades into the next, with the step named and a progress rail.

type Step = { src: string; pos: string; step: string; text: string; alt: string };

const STEPS: Step[] = [
  { src: "/images/projects/roof-crew-wide.jpg", pos: "50% 55%", step: "Day one", text: "The crew lays out the panels on the roof.", alt: "SolarHope crew laying out solar panels on a roof" },
  { src: "/images/projects/roof-crew-fitting-panels.jpg", pos: "50% 40%", step: "Mounting", text: "Every panel fixed into place by our own technicians.", alt: "SolarHope technicians fixing solar panels into place" },
  { src: "/images/projects/roof-crew-close-up.jpg", pos: "50% 30%", step: "Checks", text: "Each row secured and checked before moving on.", alt: "SolarHope crew securing a row of solar panels" },
  { src: "/images/projects/roof-finished-rows.jpg", pos: "50% 55%", step: "On the roof", text: "The array, finished.", alt: "Rows of newly installed solar panels on a roof" },
  { src: "/images/projects/technician-wiring-inverter.jpg", pos: "50% 30%", step: "Inside", text: "Inverter and battery wired up on the wall.", alt: "SolarHope technician wiring a hybrid inverter above its battery" },
  { src: "/images/projects/wall-install-inverter-battery.jpg", pos: "50% 35%", step: "Testing", text: "Everything tested before we switch on.", alt: "A wall-mounted hybrid inverter above its lithium battery" },
  { src: "/images/projects/technician-with-finished-install.jpg", pos: "50% 22%", step: "Handover", text: "Switched on, and walked through with the client.", alt: "SolarHope technician beside a finished installation" },
  { src: "/images/projects/monitoring-screen.jpg", pos: "50% 55%", step: "After", text: "Watched from our monitoring room from day one.", alt: "SolarHope monitoring screen showing a client system" },
];

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (a: number, b: number, v: number) => {
  const t = clamp((v - a) / (b - a));
  return t * t * (3 - 2 * t);
};

export default function OneJob() {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0); // 0 .. STEPS.length - 1

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const prog = clamp(-r.top / (r.height - innerHeight));
      setP(prog * (STEPS.length - 1));
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    addEventListener("scroll", on, { passive: true });
    addEventListener("resize", on);
    return () => { removeEventListener("scroll", on); removeEventListener("resize", on); cancelAnimationFrame(raf); };
  }, []);

  const current = Math.min(STEPS.length - 1, Math.floor(p + 0.25));

  return (
    <div ref={ref} className="relative" style={{ height: `${STEPS.length * 95}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden bg-black">
        {STEPS.map((s, i) => {
          // Fully visible while it is the current step; cross-fades over the
          // last part of the scroll towards the next one.
          const opacity = i === 0 ? 1 : smooth(i - 0.45, i - 0.05, p);
          // Slow camera push-in across the photo's time on screen.
          const life = clamp((p - (i - 1)) / 2);
          const scale = 1.04 + life * 0.12;
          const drift = (life - 0.5) * (i % 2 ? 2 : -2);
          if (p < i - 1 || p > i + 1.2) return null;
          return (
            <img
              key={s.src}
              src={s.src}
              alt={i === current ? s.alt : ""}
              aria-hidden={i !== current}
              className="absolute inset-0 w-full h-full object-cover will-change-transform"
              style={{
                objectPosition: s.pos,
                opacity,
                transform: `scale(${scale.toFixed(4)}) translateX(${drift.toFixed(2)}%)`,
              }}
            />
          );
        })}

        {/* Readability */}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/75 via-black/10 to-black/30" />

        {/* Title */}
        <div className="pointer-events-none absolute left-6 sm:left-14 top-28 text-white">
          <p className="text-yellow text-xs sm:text-sm font-semibold uppercase tracking-[0.25em]">
            How a SolarHope installation comes together
          </p>
        </div>

        {/* Step caption */}
        <div className="pointer-events-none absolute left-6 sm:left-14 right-20 bottom-14 sm:bottom-20 max-w-2xl text-white">
          <div key={current} className="animate-[rise_0.6s_ease-out_both]">
            <p className="text-white/60 text-sm tabular-nums">
              {String(current + 1).padStart(2, "0")} / {String(STEPS.length).padStart(2, "0")}
            </p>
            <p className="mt-1 text-yellow text-lg sm:text-xl font-semibold">{STEPS[current].step}</p>
            <p className="mt-2 text-3xl sm:text-5xl font-bold leading-tight">{STEPS[current].text}</p>
          </div>
          {p < 0.15 && <p className="mt-6 text-white/70 text-sm animate-pulse">Scroll to follow the job ↓</p>}
        </div>

        {/* Progress rail */}
        <ol className="absolute right-4 sm:right-10 top-1/2 -translate-y-1/2 space-y-3 sm:space-y-4">
          {STEPS.map((s, i) => (
            <li key={s.step} className="flex items-center justify-end gap-3">
              <span
                className={`hidden md:block text-xs font-semibold uppercase tracking-wider transition-colors ${
                  i === current ? "text-white" : "text-white/40"
                }`}
              >
                {s.step}
              </span>
              <span
                className={`block rounded-full transition-all duration-300 ${
                  i === current ? "h-3 w-3 bg-yellow" : i < current ? "h-2 w-2 bg-yellow/60" : "h-2 w-2 bg-white/40"
                }`}
              />
            </li>
          ))}
        </ol>

        {/* Thin progress bar */}
        <div className="absolute left-0 right-0 bottom-0 h-1 bg-white/10">
          <div className="h-full bg-yellow" style={{ width: `${(p / (STEPS.length - 1)) * 100}%` }} />
        </div>
      </div>
    </div>
  );
}
