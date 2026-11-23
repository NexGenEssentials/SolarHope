"use client";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

// Fun facts about the S. Every number is true of the logo itself.
const FACTS = [
  { n: 6, suffix: "", label: "panel cells make the S", sub: "Count them in the animation above." },
  { n: 13, suffix: "°", label: "forward lean", sub: "It never looks back." },
  { n: 4, suffix: "", label: "brand colours", sub: "Gold, green, navy and cream." },
  { n: 0, suffix: "", label: "dollar signs", sub: "It's an S. Promise." },
];

function Count({ to, run }: { to: number; run: boolean }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!run) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setV(to);
      return;
    }
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 1200);
      setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, run]);
  return <>{v}</>;
}

export default function FunFacts() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  return (
    <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6">
      {FACTS.map((f) => (
        <div key={f.label} className="space-y-1 border-l-2 border-yellow pl-5">
          <p className="text-5xl font-extrabold text-dark-blue tabular-nums">
            <Count to={f.n} run={inView} />
            {f.suffix}
          </p>
          <p className="font-semibold text-gray-800">{f.label}</p>
          <p className="text-sm text-gray-500">{f.sub}</p>
        </div>
      ))}
    </div>
  );
}
