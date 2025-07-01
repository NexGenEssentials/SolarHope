"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import image1 from "@/public/images/p1.jpg";
import image2 from "@/public/images/p2.jpg";
import image3 from "@/public/images/p3.jpg";
import image4 from "@/public/images/pano1.png";
import image5 from "@/public/images/pano4.png";
import image6 from "@/public/images/pano3.png";

const images = [
  image1,
  image5,
  image3,
  image6,
  image2,
  image4,
  
];

const AutoImageSlider = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
  });

  const [isHovered, setIsHovered] = useState(false);

  const autoplay = useCallback(() => {
    if (!emblaApi || isHovered) return;
    emblaApi.scrollNext();
  }, [emblaApi, isHovered]);

  useEffect(() => {
    const interval = setInterval(() => {
      autoplay();
    }, 2500); 

    return () => clearInterval(interval);
  }, [autoplay]);

  return (
    <div
      className="overflow-hidden w-full pt-16"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="embla" ref={emblaRef}>
        <div className="embla__container flex ">
          {images.map((src, index) => (
            <div
              className=" h-[300px] relative embla__slide flex-[0_0_auto] w-[400px] p-4 overflow-hidden rounded-xl"
              key={index}
            >
              <img
                src={src.src}
                alt={`Image ${index}`}
                className=" object-cover w-full h-full rounded-xl hover:grayscale-100 hover:scale-120 duration-300 transition-transform"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AutoImageSlider;
