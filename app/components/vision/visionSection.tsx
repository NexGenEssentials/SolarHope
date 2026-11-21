import { SITE } from "@/app/config/site";
import React from "react";
import { LuLightbulbOff } from "react-icons/lu";
import { MdOutlineSolarPower, MdTransform } from "react-icons/md";
import Button from "../button/button";

const visions = [
  {
    icon: <MdTransform />,
    title: "Our Vision ",
    desc: " To become the leading ,most trusted clean energy provider powering lives and development across Africa, one household and institution at a time through smart, scalable solar power",
  },
  {
    icon: <MdOutlineSolarPower />,
    title: "Our Mission",
    desc: "To deliver affordable, scalable solar energy solutions that light up dreams, drive productivity, and build climate-resilient communities.",
  },
  {
    icon: <LuLightbulbOff />,
    title: "Light Up the Gap",
    desc: "Together, we can transform rural Africa with light.",
  },
];

const VisionSection = ({ id }: { id?: string }) =>  {
  return (
    <section id={id}>
    <div className="text-white bg-linear-to-b from-[#2C98F0]  from-10% to-95% to-[#044376]">
      <div className="max-w-[1570px] mx-auto p-8 sm:px-28 sm:py-28 space-y-16 ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-4">
            <span className="w-fit border border-yellow rounded-full bg-yellow/10 px-8 py-1 text-yellow font-semibold">
              Vision
            </span>
            <span className="font-bold text-4xl">
              Our Mission and Vision for the Future
            </span>
          </div>
          <div>
            <p className="">
              At SolarHope Africa, we envision a future where every home,
              business and institution, in the city or far from the grid, runs
              on reliable, affordable solar power. Our job is to make that
              practical: systems sized honestly to your load, installed
              properly, and looked after for years.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visions.map((item, idx) => (
            <div key={idx} className="p-4 bg-white/7 rounded space-y-6 w-full">
              <div className="text-5xl">{item.icon}</div>
              <h1 className="text-3xl font-bold leading-normal">
                {item.title}
              </h1>
              <p className="text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
        <div className="flex item-center flex-wrap gap-4">
          <Button link="/#quote" name="Get a quote" />
          <a
            href={SITE.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium self-center hover:text-yellow transition-colors"
          >
            WhatsApp us
          </a>
        </div>
      </div>
    </div>
    </section>
  );
};

export default VisionSection;
