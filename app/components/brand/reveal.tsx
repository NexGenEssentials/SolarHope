"use client";
import React from "react";
import { useInView } from "react-intersection-observer";

// Gentle fade-up when an element scrolls into view (once). Under reduced
// motion the content is simply shown.
export default function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });
  return (
    <div
      ref={ref}
      className={`${className} ${
        inView ? "animate-[rise_0.8s_ease-out_both]" : "opacity-0 motion-reduce:opacity-100"
      }`}
      style={inView ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
