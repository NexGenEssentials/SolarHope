import React from "react";
import Button from "../button/button";
import site2 from "@/public/images/site2.jpg";
import crewValley from "@/public/images/projects/roof-crew-valley-view.jpg";
import LoopVideo from "../media/loopVideo";
import inspecting from "@/public/images/projects/technician-inspecting-inverter.jpg";
import {  PiArrowBendUpRightBold } from "react-icons/pi";

const content = [
  {
    image: inspecting.src,
    alt: "SolarHope technician inspecting an inverter installation",
    title: "Site Assessment",
    description: "We visit your site, read your REG bills and work out what you actually use.",
  },
  {
    image: site2.src,
    alt: "Technician in a hard hat checking a tablet on a solar array",
    title: "Agreement",
    description: "We agree the system, the price and the timeline with you in writing.",
  },
  {
    image: crewValley.src,
    alt: "SolarHope crew installing panels on a roof",
    title: "Installation",
    description: "Our own technicians fit the panels, inverter and battery, then test everything before switch-on.",
  },
  {
    image: "/videos/db-check-poster.jpg",
    video: "/videos/db-check.mp4",
    alt: "SolarHope technician checking a distribution board",
    title: "Maintenance",
    description: "We watch your system remotely and come back when something needs attention.",
  },
];

const SolarJourneySection = ({ id }: { id?: string }) =>  {
  return (
    <section id={id}>
    <div className="bg-white text-dark-blue">
      <div className="max-w-[1570px] mx-auto p-8 sm:p-20">
        <div className="flex flex-col items-center gap-16">
          <h1 className="font-bold text-3xl sm:text-5xl text-center">
            The Solar Journey
          </h1>

          <div className="flex flex-wrap justify-center gap-12">
            {content.map((item, index) => (
              <div key={index} className="flex items-start gap-4">
                {/* Arrow between cards only */}
                {index > 0 && (
                  <PiArrowBendUpRightBold
                    className="max-lg:hidden text-8xl text-dark-blue mx-4 animate-pulse "
                    style={{
                      background: "linear-gradient(to right, #FFD700, #0D1B39)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  />
                )}
                <div className="flex flex-col items-center gap-6 relative max-w-[180px]">
                  {"video" in item && item.video ? (
                    <LoopVideo
                      src={item.video}
                      poster={item.image}
                      label={item.alt}
                      className="w-36 h-36 rounded-full object-cover shadow-lg border-4 border-yellow"
                    />
                  ) : (
                    <img
                      src={item.image}
                      alt={item.alt}
                      className="w-36 h-36 rounded-full object-cover shadow-lg border-4 border-yellow"
                    />
                  )}
                  <div className="absolute top-0 right-4 bg-yellow text-dark-blue font-bold text-sm px-3 py-2.5 rounded-full">
                    0{index + 1}
                  </div>
                  <h2 className="text-lg font-semibold text-center">
                    {item.title}
                  </h2>
                  <p className="text-sm text-center text-gray-600">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Button link="/#quote" name="Get a quote" />
        </div>
      </div>
    </div>
    </section>
  );
};

export default SolarJourneySection;
