"use client";
import React, { useEffect, useRef } from "react";

// A photo that moves a little slower than the page as you scroll (parallax).
// It fills its parent, which must be `relative overflow-hidden` and sized.
// The image is scaled up (from the frame and window size) so the movement
// never shows an edge. Text and buttons are never moved, only pictures.
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
  /** How much slower than the page the image moves (0.15 gentle – 0.4 strong). */
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
      if (!r.height) return;
      // Furthest the image travels while the frame is on screen.
      const travel = ((window.innerHeight + r.height) / 2) * speed;
      // Enlarge with scale (not width/height) so the page never "jumps":
      // transforms do not move anything else, and do not count as layout shift.
      const k = (r.height + 2 * travel) / r.height;
      // 0 when the frame is centred in the window; +/- as it moves away.
      const offset = r.top + r.height / 2 - window.innerHeight / 2;
      const y = Math.max(-travel, Math.min(travel, -offset * speed));
      img.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0) scale(${k.toFixed(3)})`;
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
      className={`absolute left-0 top-0 w-full h-full object-cover will-change-transform ${className}`}
    />
  );
}
