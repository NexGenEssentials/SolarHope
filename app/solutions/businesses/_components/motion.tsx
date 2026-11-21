"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  MotionConfig,
  animate,
  motion,
  useInView,
  type Variants,
} from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Respect the visitor's reduced-motion setting everywhere below it. */
export function MotionRoot({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

/** Fade and rise into view once, when scrolled to. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};
const staggerChild: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

/** Children appear one after another as the group scrolls into view. */
export function Stagger({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={staggerChild}>
      {children}
    </motion.div>
  );
}

/**
 * The stepped gold block mark from the logo, as a small decorative accent.
 */
export function BlockMark({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`inline-flex items-end gap-[3px] ${className}`}>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="block w-3 bg-yellow -skew-x-12 rounded-[2px]"
          style={{ height: 6 + i * 5 }}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 * i, duration: 0.4, ease: EASE }}
        />
      ))}
    </span>
  );
}

/** Section label with the block mark. */
export function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p
      className={`flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] ${
        light ? "text-yellow" : "text-amber-500"
      }`}
    >
      <BlockMark />
      {children}
    </p>
  );
}

/** Battery that drains while the backup hours count up. */
export function DrainingBattery({ hours }: { hours: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, hours, {
      duration: 2.2,
      ease: "easeOut",
      onUpdate: (v) => setShown(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, hours]);

  return (
    <div ref={ref} className="flex items-center gap-6">
      <div className="relative w-28 h-14 rounded-lg border-4 border-dark-blue p-1 shrink-0">
        <span className="absolute -right-3 top-1/2 -translate-y-1/2 w-2 h-5 rounded-r bg-dark-blue" />
        <motion.div
          className="h-full rounded-[4px] bg-linear-to-r from-amber-500 to-yellow"
          initial={{ width: "100%" }}
          animate={inView ? { width: "18%" } : { width: "100%" }}
          transition={{ duration: 2.2, ease: "easeOut" }}
        />
      </div>
      <p className="text-5xl font-extrabold italic text-dark-blue leading-none">
        <span className="text-2xl not-italic font-bold mr-1">about</span>
        {shown}
        <span className="text-2xl not-italic font-bold ml-1">hours</span>
      </p>
    </div>
  );
}
