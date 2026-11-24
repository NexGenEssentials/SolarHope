import React from "react";
import LoopVideo from "../media/loopVideo";
const crewFitting = { src: "/images/gallery/roof-crew-fitting-panels.jpg" };
const crewCloseUp = { src: "/images/gallery/roof-crew-close-up.jpg" };
const crewMidInstall = { src: "/images/gallery/roof-crew-mid-install.jpg" };
const crewValley = { src: "/images/gallery/roof-crew-valley-view.jpg" };
const finishedRows = { src: "/images/gallery/roof-finished-rows.jpg" };
const withFinishedInstall = { src: "/images/gallery/technician-with-finished-install.jpg" };
const wallInstall = { src: "/images/gallery/wall-install-inverter-battery.jpg" };
const crewWide = { src: "/images/gallery/roof-crew-wide.jpg" };
const wiringInverter = { src: "/images/gallery/technician-wiring-inverter.jpg" };
const urbanRoof = { src: "/images/gallery/roof-urban-panels.jpg" };
const finishedArray = { src: "/images/gallery/roof-finished-array.jpg" };

// SolarHope's own installation photos and silent clips in one sliding row.
// Photos are tile-sized copies (800x600) in /images/gallery for fast loading.
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
                  <img
                    src={item.src}
                    alt={copy ? "" : item.alt}
                    // The first tiles are on screen at load; the rest can wait.
                    loading={idx < 4 ? "eager" : "lazy"}
                    fetchPriority={idx === 0 ? "high" : undefined}
                    decoding="async"
                    className={cls}
                  />
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
