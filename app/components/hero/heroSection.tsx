import React from "react";
import Button from "../button/button";
import { GoDotFill } from "react-icons/go";
import { BsArrowRight } from "react-icons/bs";
import { SITE } from "@/app/config/site";

const HeroSection = () => {
  return (
    <div className="relative ">
      <div className=" flex flex-col gap-8 w-3/4 md:w-1/2 mx-auto py-8 items-center justify-center text-white text-center rounded-lg">
        <h1 className="text-4xl bg-linear-to-r from-white to-yellow/80 bg-clip-text text-transparent font-bold">
          Light Up Dreams, The Solar Way
        </h1>
        <p className="text-[#BABABA]">
          Solar systems for homes, businesses, schools, health facilities and
          large commercial sites across Rwanda: connected to the grid in town,
          and standing on their own where the grid does not reach. Designed,
          installed and looked after by one team based in Kigali.
        </p>
        <div className="flex items-center gap-8 justify-center font-bold">
          <Button link="/#quote" name="Get a quote" />
          <a
            href={SITE.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow transition-colors"
          >
            WhatsApp us
          </a>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-semibold">
          <a href="/solutions/businesses" className="flex items-center gap-2 text-yellow hover:underline">
            Solar for businesses <BsArrowRight />
          </a>
          <a href="/solutions/homes" className="flex items-center gap-2 text-yellow hover:underline">
            Solar for homes <BsArrowRight />
          </a>
        </div>
      </div>
      <div className=" absolute top-1/3 right-4 sm:right-18 w-8 h-8 border border-white backdrop-blur-sm flex items-center justify-center rounded-full bg-slate-500/60">
        <GoDotFill className="text-white" size={20}/>
      </div>
      <div className=" absolute top-4/5 left-4 sm:left-18 bottom-0 w-8 h-8 border border-white backdrop-blur-sm flex items-center justify-center rounded-full bg-slate-500/60">
        <GoDotFill className="text-white" size={20}/>
      </div>
    </div>
  );
};

export default HeroSection;
