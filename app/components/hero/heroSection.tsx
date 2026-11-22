import React from "react";
import Button from "../button/button";
import { SITE } from "@/app/config/site";

const HeroSection = () => {
  return (
    <div className="relative ">
      <div className=" flex flex-col gap-8 w-11/12 md:w-1/2 mx-auto pt-8 pb-14 items-center justify-center text-white text-center rounded-lg">
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
      </div>
    </div>
  );
};

export default HeroSection;
