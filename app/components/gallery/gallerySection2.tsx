"use client";

import { motion } from "framer-motion";
import React from "react";
import LoopVideo from "../media/loopVideo";
import urbanRoof from "@/public/images/projects/roof-urban-panels.jpg";
import finishedArray from "@/public/images/projects/roof-finished-array.jpg";

// SolarHope's own installation photos and silent clips.
type Item =
  | { kind: "image"; src: string; alt: string }
  | { kind: "video"; src: string; poster: string; alt: string };

const items: Item[] = [
  {
    kind: "video",
    src: "/videos/install-wiring.mp4",
    poster: "/videos/install-wiring-poster.jpg",
    alt: "SolarHope technician wiring a hybrid inverter",
  },
  { kind: "image", src: urbanRoof.src, alt: "Solar panels installed on a steep city rooftop" },
  {
    kind: "video",
    src: "/videos/roof-panels.mp4",
    poster: "/videos/roof-panels-poster.jpg",
    alt: "SolarHope technician working at the top of a rooftop solar array",
  },
  { kind: "image", src: finishedArray.src, alt: "A finished SolarHope rooftop solar array" },
];

const MarqueeSlider = () => {
  return (
    <div className="max-w-[1570px] mx-auto ">
      <div className="overflow-hidden whitespace-nowrap pb-16">
        <motion.div
          className="flex gap-4"
          animate={{ x: ["0%", "-100%"] }}
          transition={{
            repeat: Infinity,
            duration: 70,
            ease: "linear",
          }}
        >
          {[...items, ...items].map((item, idx) => {
            const copy = idx >= items.length;
            const cls =
              "w-full h-full object-cover rounded-xl hover:grayscale-100 hover:scale-120 duration-300 transition-transform";
            return (
              <div
                key={idx}
                aria-hidden={copy ? true : undefined}
                className="w-[400px] h-[300px] flex-shrink-0 rounded-xl overflow-hidden"
              >
                {item.kind === "video" ? (
                  <LoopVideo
                    src={item.src}
                    poster={item.poster}
                    label={copy ? "" : item.alt}
                    className={cls}
                  />
                ) : (
                  <img src={item.src} alt={copy ? "" : item.alt} className={cls} />
                )}
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default MarqueeSlider;
