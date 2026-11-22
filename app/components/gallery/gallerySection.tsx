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
import crewWide from "@/public/images/projects/roof-crew-wide.jpg";
import wiringInverter from "@/public/images/projects/technician-wiring-inverter.jpg";

// SolarHope's own installation photos (rooftop set: a family home in Nyagatare).
const images = [
  { src: crewFitting, alt: "SolarHope technicians fitting solar panels on a family home in Nyagatare, with hills behind" },
  { src: withFinishedInstall, alt: "SolarHope technician beside a finished inverter and battery installation" },
  { src: crewWide, alt: "SolarHope crew laying out solar panels on a roof in Nyagatare" },
  { src: crewCloseUp, alt: "SolarHope crew securing a row of solar panels on a roof" },
  { src: wiringInverter, alt: "SolarHope technician wiring a hybrid inverter above its battery" },
  { src: crewValley, alt: "SolarHope crew on a rooftop installation in Nyagatare overlooking the valley" },
  { src: crewMidInstall, alt: "SolarHope technicians fixing panels into place during an installation" },
  { src: wallInstall, alt: "A wall-mounted hybrid inverter above its lithium battery, installed by SolarHope" },
  { src: finishedRows, alt: "Rows of newly installed solar panels on a corrugated roof in Nyagatare" },
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
