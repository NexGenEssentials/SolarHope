"use client";
import React, { useEffect, useRef, useState } from "react";

// PROTOTYPE — "Inside a SolarHope system".
// A real photo of an installed inverter, breaker box and battery. As you
// scroll, each component lifts off the wall and floats apart in 3D, labelled
// in plain language; at the end they click back into place.

const IMG = "/images/lab/inverter-wall.jpg";
const IW = 900;
const IH = 1932;

type Piece = {
  key: string;
  // Rectangle in image pixels
  x: number; y: number; w: number; h: number;
  // Where it flies to, as fractions of the photo's on-screen width/height
  dx: number; dy: number; z: number; ry: number; rx: number;
  title: string;
  text: string;
  side: "left" | "right";
  // Phone: spread up and down instead of sideways
  mdx: number; mdy: number;
};

const PIECES: Piece[] = [
  {
    key: "inverter", x: 0, y: 0, w: 615, h: 780,
    dx: -0.62, dy: 0.1, z: 70, ry: 18, rx: -3,
    title: "The inverter",
    text: "The brain of the system. It turns sunlight into power for your home and decides, by itself, when to use the sun, the battery or the grid.",
    side: "left",
    mdx: -0.18, mdy: -0.12,
  },
  {
    key: "breakers", x: 560, y: 545, w: 175, h: 245,
    dx: 0.85, dy: -0.02, z: 90, ry: -18, rx: 4,
    title: "Protection",
    text: "Breakers that keep every circuit safe, and let our technicians isolate the system when they work on it.",
    side: "right",
    mdx: 0.55, mdy: -0.05,
  },
  {
    key: "battery", x: 0, y: 1030, w: 525, h: 770,
    dx: 0.75, dy: -0.04, z: 60, ry: -16, rx: 3,
    title: "The battery",
    text: "Stores the afternoon's sunshine for the evening and for power cuts. Your quote shows what you can really use, not just the size on the label.",
    side: "right",
    mdx: 0.2, mdy: 0.2,
  },
];

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export default function Exploded() {
  const wrap = useRef<HTMLDivElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);
  const [size, setSize] = useState({ w: 300, h: 640 });
  const [narrow, setNarrow] = useState(false);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = wrap.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setP(clamp(-r.top / (r.height - innerHeight)));
      const b = box.current?.getBoundingClientRect();
      if (b) setSize({ w: b.width, h: b.height });
      setNarrow(innerWidth < 768);
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    addEventListener("scroll", on, { passive: true });
    addEventListener("resize", on);
    return () => { removeEventListener("scroll", on); removeEventListener("resize", on); cancelAnimationFrame(raf); };
  }, []);

  // 0-0.12 still, 0.12-0.55 apart, 0.55-0.82 hold with labels, 0.82-1 back together
  const e = ease(clamp((p - 0.12) / 0.43)) * (1 - ease(clamp((p - 0.82) / 0.16)));
  const labels = clamp((e - 0.75) / 0.25);
  const sx = size.w / IW;
  const sy = size.h / IH;

  return (
    <div ref={wrap} className="relative h-[420vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-[#0b1220]">
        {/* Soft light behind the photo */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(234,157,19,0.14),transparent_60%)]" />

        <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: "1800px", perspectiveOrigin: "50% 50%" }}>
          <div
            ref={box}
            className="relative h-[52vh] sm:h-[70vh] aspect-[900/1932] -mt-10 sm:mt-16"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* The wall: dims and softens as the parts come off it */}
            <img
              src={IMG}
              alt="A SolarHope installation: hybrid inverter, breaker box and lithium battery on a wall"
              className="absolute inset-0 w-full h-full object-cover rounded-xl"
              style={{ filter: `brightness(${1 - e * 0.65}) blur(${e * 2}px)` }}
            />
            {/* Mounting outlines left behind on the wall */}
            {PIECES.map((pc) => (
              <div
                key={`hole-${pc.key}`}
                className="absolute rounded-md border-2 border-dashed border-yellow/70 bg-black/40"
                style={{ left: pc.x * sx, top: pc.y * sy, width: pc.w * sx, height: pc.h * sy, opacity: e }}
              />
            ))}

            {/* The components, cut from the same photo */}
            {PIECES.map((pc, i) => {
              const dx = (narrow ? pc.mdx : pc.dx) * size.w * e;
              const dy = (narrow ? pc.mdy : pc.dy) * size.h * e;
              return (
                <div
                  key={pc.key}
                  className="absolute rounded-md"
                  style={{
                    left: pc.x * sx,
                    top: pc.y * sy,
                    width: pc.w * sx,
                    height: pc.h * sy,
                    backgroundImage: `url(${IMG})`,
                    backgroundSize: `${size.w}px ${size.h}px`,
                    backgroundPosition: `${-pc.x * sx}px ${-pc.y * sy}px`,
                    transform: `translate3d(${dx}px, ${dy}px, ${pc.z * e}px) rotateY(${pc.ry * e}deg) rotateX(${pc.rx * e}deg)`,
                    boxShadow: `0 ${30 * e}px ${60 * e}px rgba(0,0,0,${0.55 * e}), 0 0 0 ${e > 0.05 ? 1 : 0}px rgba(234,157,19,${0.5 * e})`,
                    willChange: "transform",
                  }}
                >
                  {/* Label beside the part (desktop) */}
                  {!narrow && (
                    <div
                      className={`absolute top-1/2 w-64 -translate-y-1/2 text-white ${
                        pc.side === "left" ? "right-full mr-8 text-right" : "left-full ml-8"
                      }`}
                      style={{ opacity: labels, transform: `translateY(-50%) translateX(${(1 - labels) * (pc.side === "left" ? 12 : -12)}px)` }}
                    >
                      <span
                        className={`absolute top-1/2 h-px w-6 bg-yellow ${pc.side === "left" ? "-right-8" : "-left-8"}`}
                      />
                      <p className="text-yellow text-xs font-semibold uppercase tracking-widest">{String(i + 1).padStart(2, "0")}</p>
                      <p className="text-xl font-bold">{pc.title}</p>
                      <p className="mt-1 text-sm text-white/75 leading-relaxed">{pc.text}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Heading */}
        <div className="pointer-events-none absolute left-6 sm:left-14 top-24 sm:top-auto sm:bottom-14 max-w-sm text-white">
          <p className="text-yellow text-xs sm:text-sm font-semibold uppercase tracking-[0.25em]">Inside a SolarHope system</p>
          <p className="mt-2 text-2xl sm:text-3xl font-bold leading-tight" style={{ opacity: 1 - labels * 0.6 }}>
            {p < 0.82 ? "What is actually on your wall?" : "Back together. Working as one."}
          </p>
          {p < 0.08 && <p className="mt-3 text-white/60 text-sm animate-pulse">Scroll to take it apart ↓</p>}
        </div>

        {/* Labels on phones */}
        {narrow && (
          <div className="absolute left-4 right-4 bottom-5 grid grid-cols-3 gap-2" style={{ opacity: labels }}>
            {PIECES.map((pc, i) => (
              <div key={pc.key} className="rounded-xl bg-dark-blue/85 backdrop-blur px-3 py-2 text-white">
                <p className="text-xs font-bold">
                  <span className="text-yellow mr-2">{String(i + 1).padStart(2, "0")}</span>
                  {pc.title}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="absolute left-0 right-0 bottom-0 h-1 bg-white/10">
          <div className="h-full bg-yellow" style={{ width: `${p * 100}%` }} />
        </div>
      </div>
    </div>
  );
}
