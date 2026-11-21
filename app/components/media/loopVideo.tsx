"use client";
import React, { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

// A short, silent, looping clip. It loads nothing until it is near the screen,
// plays only while visible, and stays on its poster frame for visitors who
// have asked their device to reduce motion.
const LoopVideo = ({
  src,
  poster,
  label,
  className = "",
}: {
  src: string;
  poster: string;
  label: string;
  className?: string;
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { ref, inView } = useInView({ rootMargin: "200px" });
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (inView && !reduceMotion) {
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [inView, reduceMotion]);

  return (
    <video
      ref={(el) => {
        videoRef.current = el;
        ref(el);
      }}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-label={label}
      className={className}
    />
  );
};

export default LoopVideo;
