"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import crewFitting from "@/public/images/projects/roof-crew-fitting-panels.jpg";
import crewCloseUp from "@/public/images/projects/roof-crew-close-up.jpg";
import crewMidInstall from "@/public/images/projects/roof-crew-mid-install.jpg";
import crewValley from "@/public/images/projects/roof-crew-valley-view.jpg";
import finishedRows from "@/public/images/projects/roof-finished-rows.jpg";
import withFinishedInstall from "@/public/images/projects/technician-with-finished-install.jpg";
import wallInstall from "@/public/images/projects/wall-install-inverter-battery.jpg";

// SolarHope's own installation photos.
const images = [
  { src: crewFitting, alt: "SolarHope technicians fitting solar panels on a roof, with hills behind" },
  { src: withFinishedInstall, alt: "SolarHope technician beside a finished inverter and battery installation" },
  { src: crewCloseUp, alt: "SolarHope crew securing a row of solar panels on a roof" },
  { src: crewValley, alt: "SolarHope crew on a roof installation overlooking a valley" },
  { src: crewMidInstall, alt: "SolarHope technicians fixing panels into place during an installation" },
  { src: wallInstall, alt: "A wall-mounted hybrid inverter above its lithium battery, installed by SolarHope" },
  { src: finishedRows, alt: "Rows of newly installed solar panels on a corrugated roof" },
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
    <div className="max-w-[1570px] mx-auto">
      <div
        className="overflow-hidden w-full pt-16"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="embla" ref={emblaRef}>
          <div className="embla__container flex ">
            {images.map(({ src, alt }, index) => (
              <div
                className=" h-[300px] relative embla__slide flex-[0_0_auto] w-[400px] p-4 overflow-hidden rounded-xl"
                key={index}
              >
                <img
                  src={src.src}
                  alt={alt}
                  className=" object-cover w-full h-full rounded-xl hover:grayscale-100 hover:scale-120 duration-300 transition-transform"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutoImageSlider;
