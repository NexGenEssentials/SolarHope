import React from "react";
import LoopVideo from "../media/loopVideo";
import crewFitting from "@/public/images/projects/roof-crew-fitting-panels.jpg";
import crewCloseUp from "@/public/images/projects/roof-crew-close-up.jpg";
import crewMidInstall from "@/public/images/projects/roof-crew-mid-install.jpg";
import crewValley from "@/public/images/projects/roof-crew-valley-view.jpg";
import finishedRows from "@/public/images/projects/roof-finished-rows.jpg";
import withFinishedInstall from "@/public/images/projects/technician-with-finished-install.jpg";
import wallInstall from "@/public/images/projects/wall-install-inverter-battery.jpg";
import crewWide from "@/public/images/projects/roof-crew-wide.jpg";
import wiringInverter from "@/public/images/projects/technician-wiring-inverter.jpg";
import urbanRoof from "@/public/images/projects/roof-urban-panels.jpg";
import finishedArray from "@/public/images/projects/roof-finished-array.jpg";

// SolarHope's own installation photos and silent clips in one sliding row.
// The list is rendered twice so the CSS marquee loops seamlessly; pauses on
// hover; under reduced motion it stops and the row can be scrolled by hand.
type Item =
  | { kind: "image"; src: string; alt: string }
  | { kind: "video"; src: string; poster: string; alt: string };

const items: Item[] = [
  { kind: "image", src: crewFitting.src, alt: "SolarHope technicians fitting solar panels on a family home in Nyagatare, with hills behind" },
  {
    kind: "video",
    src: "/videos/install-wiring.mp4",
    poster: "/videos/install-wiring-poster.jpg",
    alt: "SolarHope technician wiring a hybrid inverter",
  },
  { kind: "image", src: withFinishedInstall.src, alt: "SolarHope technician beside a finished inverter and battery installation" },
  { kind: "image", src: crewWide.src, alt: "SolarHope crew laying out solar panels on a roof in Nyagatare" },
  { kind: "image", src: urbanRoof.src, alt: "Solar panels installed on a steep city rooftop" },
  { kind: "image", src: wiringInverter.src, alt: "SolarHope technician wiring a hybrid inverter above its battery" },
  {
    kind: "video",
    src: "/videos/roof-panels.mp4",
    poster: "/videos/roof-panels-poster.jpg",
    alt: "SolarHope technician working at the top of a rooftop solar array",
  },
  { kind: "image", src: crewCloseUp.src, alt: "SolarHope crew securing a row of solar panels on a roof" },
  { kind: "image", src: crewValley.src, alt: "SolarHope crew on a rooftop installation in Nyagatare overlooking the valley" },
  { kind: "image", src: wallInstall.src, alt: "A wall-mounted hybrid inverter above its lithium battery, installed by SolarHope" },
  { kind: "image", src: crewMidInstall.src, alt: "SolarHope technicians fixing panels into place during an installation" },
  { kind: "image", src: finishedArray.src, alt: "A finished SolarHope rooftop solar array" },
  { kind: "image", src: finishedRows.src, alt: "Rows of newly installed solar panels on a corrugated roof in Nyagatare" },
];

const MarqueeSlider = () => {
  return (
    <div className="max-w-[1570px] mx-auto">
      <div className="overflow-hidden motion-reduce:overflow-x-auto py-16">
        <div className="flex w-max animate-[marquee_120s_linear_infinite] hover:[animation-play-state:paused]">
          {[...items, ...items].map((item, idx) => {
            const copy = idx >= items.length;
            const cls =
              "w-full h-full object-cover rounded-xl hover:grayscale-100 hover:scale-120 duration-300 transition-transform";
            return (
              <div
                key={idx}
                aria-hidden={copy ? true : undefined}
                className={`mr-4 w-[300px] h-[225px] sm:w-[400px] sm:h-[300px] flex-shrink-0 rounded-xl overflow-hidden ${copy ? "motion-reduce:hidden" : ""}`}
              >
                {item.kind === "video" ? (
                  <LoopVideo
                    src={item.src}
                    poster={item.poster}
                    label={copy ? "" : item.alt}
                    className={cls}
                  />
                ) : (
                  <img src={item.src} alt={copy ? "" : item.alt} loading="lazy" className={cls} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MarqueeSlider;
