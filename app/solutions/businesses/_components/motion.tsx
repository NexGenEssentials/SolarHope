"use client";
import React, { useEffect, useRef, useState } from "react";
import { MotionConfig, animate, motion, useInView } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Respect the visitor's reduced-motion setting everywhere below it. */
export function MotionRoot({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

/** A quiet fade-in, once, when scrolled to. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Small section label: a short gold rule and uppercase text. */
export function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p
      className={`flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] ${
        light ? "text-white/60" : "text-gray-400"
      }`}
    >
      <span className="h-px w-8 bg-yellow" aria-hidden="true" />
      {children}
    </p>
  );
}

/** A thin battery outline that empties while the hours count up. */
export function DrainingBattery({ hours }: { hours: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [shown, setShown] = useState(hours);

  useEffect(() => {
    if (!inView) return;
    setShown(0);
    const controls = animate(0, hours, {
      duration: 1.8,
      ease: "easeOut",
      onUpdate: (v) => setShown(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, hours]);

  return (
    <div ref={ref} className="flex items-center gap-5">
      <div className="relative w-16 h-7 rounded-md border border-dark-blue/40 p-[3px] shrink-0">
        <span className="absolute -right-[5px] top-1/2 -translate-y-1/2 w-[3px] h-3 rounded-r bg-dark-blue/40" />
        <motion.div
          className="h-full rounded-[3px] bg-yellow"
          initial={{ width: "100%" }}
          animate={inView ? { width: "20%" } : { width: "100%" }}
          transition={{ duration: 1.8, ease: "easeOut" }}
        />
      </div>
      <p className="text-3xl font-bold text-dark-blue">
        about {shown} hours
      </p>
    </div>
  );
}
