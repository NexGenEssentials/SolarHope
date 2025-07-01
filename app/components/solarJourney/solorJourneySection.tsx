import React from "react";
import Button from "../button/button";
import site1 from "@/public/images/site1.webp";
import site2 from "@/public/images/site2.jpg";
import site3 from "@/public/images/site3.webp";
import site4 from "@/public/images/site4.webp";
import site5 from "@/public/images/site5.jpeg";
import {  PiArrowBendUpRightBold } from "react-icons/pi";

const content = [
  {
    image: site1.src,
    title: "Site Assessment",
    description: "We assess energy needs to deliver tailored solar solutions.",
  },
  {
    image: site2.src,
    title: "Agreement",
    description: "We define clear roles and timelines with community partners.",
  },
  {
    image: site3.src,
    title: "Installation",
    description: "Our team installs reliable solar systems with care.",
  },
  {
    image: site4.src,
    title: "Maintenance",
    description: "We ensure systems run smoothly with regular maintenance.",
  },
  // {
  //   image: site5.src,
  //   title: "Community Training",
  //   description: "We train locals to maintain and manage solar systems.",
  // },
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
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-36 h-36 rounded-full object-cover shadow-lg border-4 border-yellow"
                  />
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

          <Button link="#" name="Explore All Services" />
        </div>
      </div>
    </div>
    </section>
  );
};

export default SolarJourneySection;
