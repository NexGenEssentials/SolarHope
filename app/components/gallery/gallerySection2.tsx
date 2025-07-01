"use client";

import { motion } from "framer-motion";
import React from "react";
import image1 from "@/public/images/gal1.png";
import image2 from "@/public/images/gal2.png";
import image3 from "@/public/images/gal3.png";
import image4 from "@/public/images/gal4.jpg";
import image5 from "@/public/images/gal5.jpg";
import image6 from "@/public/images/gal6.png";
import image7 from "@/public/images/gal7.jpg";

const images = [image1, image5, image3, image6, image2, image4, image7];

const MarqueeSlider = () => {
  return (
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
        {[...images, ...images].map((src, idx) => (
          <div
            key={idx}
            className="w-[400px] h-[300px] flex-shrink-0 rounded-xl overflow-hidden"
          >
            <img
              src={src.src}
              alt={`img-${idx}`}
              className="w-full h-full object-cover rounded-xl hover:grayscale-100 hover:scale-120 duration-300 transition-transform"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default MarqueeSlider;
