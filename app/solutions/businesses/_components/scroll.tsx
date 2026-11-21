"use client";
import React, { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

/* ------------------------------------------------------------------ */
/* Parallax hero: the photo drifts slower than the page, the text lifts */
/* away as you scroll past.                                            */
/* ------------------------------------------------------------------ */
export function ParallaxHero({
  image,
  alt,
  children,
}: {
  image: string;
  alt: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "30%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.05, reduce ? 1.05 : 1.2]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -120]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, reduce ? 1 : 0]);

  return (
    <section ref={ref} className="relative h-[calc(100svh-6rem)] min-h-[560px] overflow-hidden">
      <motion.img
        src={image}
        alt={alt}
        style={{ y: imgY, scale: imgScale }}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-r from-dark-blue via-dark-blue/80 to-dark-blue/20" />
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative h-full max-w-6xl mx-auto px-6 sm:px-10 flex flex-col justify-center"
      >
        {children}
      </motion.div>
      <motion.div
        aria-hidden="true"
        style={{ opacity: textOpacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 text-xs tracking-[0.3em] uppercase"
      >
        Scroll
        <span className="block h-10 w-px bg-white/30 overflow-hidden">
          <span className="block h-1/2 w-px bg-yellow animate-[scrollcue_1.8s_ease-in-out_infinite]" />
        </span>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* A sentence that lights up word by word as it scrolls through view.  */
/* ------------------------------------------------------------------ */
function Word({
  children,
  progress,
  range,
  accent,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  accent: boolean;
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className={accent ? "text-amber-500 italic" : undefined}>
      {children}{" "}
    </motion.span>
  );
}

export function WordReveal({ text, accentFrom }: { text: string; accentFrom?: number }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className="text-3xl sm:text-5xl font-bold leading-[1.15] tracking-tight text-dark-blue">
      {words.map((w, i) =>
        reduce ? (
          <span key={i} className={accentFrom !== undefined && i >= accentFrom ? "text-amber-500 italic" : undefined}>
            {w}{" "}
          </span>
        ) : (
          <Word
            key={i}
            progress={scrollYProgress}
            range={[i / words.length, (i + 1) / words.length]}
            accent={accentFrom !== undefined && i >= accentFrom}
          >
            {w}
          </Word>
        ),
      )}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/* Parallax photo: the image moves inside its frame as you scroll.     */
/* ------------------------------------------------------------------ */
export function ParallaxImage({
  src,
  alt,
  className = "",
  strength = 12,
}: {
  src: string;
  alt: string;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [reduce ? "0%" : `-${strength}%`, reduce ? "0%" : `${strength}%`]);
  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        style={{ y, scale: 1 + (strength * 2.2) / 100 }}
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* One day, told by scrolling. The view holds still while the sky moves */
/* from morning to night, the sun crosses, and the battery fills by day */
/* and takes over after dark.                                          */
/* ------------------------------------------------------------------ */
const PHASES = [
  { time: "Morning", line: "The sun comes up and your panels get to work." },
  { time: "Midday", line: "You run on sunshine, and the battery quietly fills." },
  { time: "Evening", line: "The sun goes down. The battery takes over." },
  { time: "Night", line: "The lights stay on and the music keeps playing. You stay open." },
];

export function DayStory() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [phase, setPhase] = useState(0);
  useMotionValueEvent(p, "change", (v) => setPhase(Math.min(3, Math.floor(v * 4))));

  const sky = useTransform(
    p,
    [0, 0.25, 0.5, 0.62, 0.8, 1],
    ["#FFE9B8", "#BFE3FF", "#FFD089", "#E07B39", "#0D1B39", "#070E1F"],
  );
  const ink = useTransform(p, [0, 0.55, 0.7], ["#0f202e", "#0f202e", "#ffffff"]);
  const sunX = useTransform(p, [0, 0.6], ["42%", "94%"]);
  const sunY = useTransform(p, [0, 0.3, 0.6], ["78%", "26%", "80%"]);
  const sunOpacity = useTransform(p, [0.55, 0.65], [1, 0]);
  const moonOpacity = useTransform(p, [0.7, 0.8], [0, 1]);
  const battery = useTransform(p, [0.05, 0.5, 0.62, 1], ["15%", "100%", "100%", "35%"]);
  const batteryLabel = useTransform(p, (v) => (v < 0.55 ? "Charging from the sun" : "Powering your business"));
  const [label, setLabel] = useState("Charging from the sun");
  useMotionValueEvent(batteryLabel, "change", setLabel);

  if (reduce) {
    return (
      <div className="max-w-6xl mx-auto px-6 sm:px-10 py-24 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {PHASES.map((ph) => (
          <div key={ph.time} className="border-t border-gray-200 pt-5">
            <p className="text-sm text-amber-500 font-semibold">{ph.time}</p>
            <p className="mt-2 text-lg text-dark-blue font-semibold">{ph.line}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className="relative h-[400vh]">
      <motion.div style={{ backgroundColor: sky }} className="sticky top-0 h-screen overflow-hidden">
        {/* sun and moon */}
        <motion.div
          style={{ left: sunX, top: sunY, opacity: sunOpacity }}
          className="absolute -translate-x-1/2 -translate-y-1/2 w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-yellow shadow-[0_0_120px_40px_rgba(251,191,36,0.45)]"
        />
        <motion.div
          style={{ opacity: moonOpacity }}
          className="absolute right-[14%] top-[16%] w-16 h-16 rounded-full bg-white/90 shadow-[0_0_60px_10px_rgba(255,255,255,0.25)]"
        />

        <motion.div
          style={{ color: ink }}
          className="relative h-full max-w-6xl mx-auto px-6 sm:px-10 pt-32 pb-16 flex flex-col justify-between"
        >
          <div className="space-y-4 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] opacity-60">A day with solar</p>
            <motion.p
              key={phase}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="text-sm font-semibold text-amber-500"
            >
              {PHASES[phase].time}
            </motion.p>
            <motion.h2
              key={`l${phase}`}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="text-3xl sm:text-5xl font-bold italic leading-tight tracking-tight"
            >
              {PHASES[phase].line}
            </motion.h2>
          </div>

          <div className="space-y-3 max-w-md">
            <div className="flex items-center justify-between text-sm opacity-80">
              <span>Battery</span>
              <span>{label}</span>
            </div>
            <div className="relative h-3 rounded-full bg-current/15 overflow-hidden">
              <motion.div style={{ width: battery }} className="absolute inset-y-0 left-0 rounded-full bg-yellow" />
            </div>
            <div className="flex gap-2 pt-2">
              {PHASES.map((ph, i) => (
                <span
                  key={ph.time}
                  className={`h-1 flex-1 rounded-full transition-colors duration-500 ${i <= phase ? "bg-yellow" : "bg-current/20"}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
