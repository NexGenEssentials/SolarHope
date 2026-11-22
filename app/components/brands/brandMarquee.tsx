import React from "react";
import { EQUIPMENT_BRANDS } from "@/app/config/site";

// Single sliding row of the equipment brands SolarHope installs. The list is
// rendered twice so the CSS marquee loops seamlessly; pauses on hover; shows
// a static centred row under reduced motion.
export default function BrandMarquee() {
  return (
    <div className="overflow-hidden border-y border-gray-200 py-6 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <ul className="flex w-max items-center animate-[marquee_35s_linear_infinite] hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center">
        {[...EQUIPMENT_BRANDS, ...EQUIPMENT_BRANDS].map((b, i) => {
          const copy = i >= EQUIPMENT_BRANDS.length;
          return (
            <li
              key={i}
              aria-hidden={copy ? true : undefined}
              className={`group shrink-0 w-56 h-24 flex items-center justify-center px-8 ${copy ? "motion-reduce:hidden" : ""}`}
            >
              {b.logo ? (
                <img
                  src={b.logo}
                  alt={copy ? "" : b.name}
                  loading="lazy"
                  className={`${b.stacked ? "max-h-20" : "max-h-12"} max-w-full w-auto object-contain transition-transform duration-300 group-hover:scale-105`}
                />
              ) : (
                <span className="text-lg font-bold tracking-wide text-gray-500">{b.name}</span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
