"use client";
import React, { useEffect, useRef } from "react";

// A photo that moves a little slower than the page as you scroll (parallax).
// It fills its parent, which must be `relative overflow-hidden` and sized.
// The image is drawn slightly taller than its frame so the movement never
// shows an edge. Text and buttons are never moved, only pictures.
// Off for visitors who prefer reduced motion.

export default function ParallaxImage({
  src,
  alt,
  speed = 0.15,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  /** Fraction of the scroll distance the image lags behind (0.1–0.25). */
  speed?: number;
  className?: string;
  priority?: boolean;
}) {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    const frame = img?.parentElement;
    if (!img || !frame) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let visible = false;
    const update = () => {
      raf = 0;
      const r = frame.getBoundingClientRect();
      // 0 when the frame is centred in the window; +/- as it moves away.
      const offset = r.top + r.height / 2 - window.innerHeight / 2;
      const max = (r.height * (EXTRA / 100)) / 2;
      const y = Math.max(-max, Math.min(max, -offset * speed));
      img.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      if (visible && !raf) raf = requestAnimationFrame(update);
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) onScroll();
    });
    io.observe(frame);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [speed]);

  return (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      {...(priority ? { fetchPriority: "high" as const } : { loading: "lazy" as const })}
      className={`absolute left-0 w-full object-cover will-change-transform ${className}`}
      style={{ top: `-${EXTRA / 2}%`, height: `${100 + EXTRA}%` }}
    />
  );
}

// How much taller than its frame the image is drawn, in percent.
const EXTRA = 24;
