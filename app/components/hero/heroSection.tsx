import React from "react";
import BrandLines from "../brand/brandLines";

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden">
      <BrandLines className="hidden md:block -left-64 -top-28 w-[560px] lg:w-[720px] opacity-60" />
      <div className=" flex flex-col gap-8 w-3/4 md:w-1/2 mx-auto pt-8 pb-14 items-center justify-center text-white text-center rounded-lg">
        <h1 className="text-4xl bg-linear-to-r from-white to-yellow/80 bg-clip-text text-transparent font-bold">
          Light Up Dreams, The Solar Way
        </h1>
        <p className="text-[#BABABA]">
          Solar systems for homes, businesses, schools, health facilities and
          large commercial sites across Rwanda: connected to the grid in town,
          and standing on their own where the grid does not reach. Designed,
          installed and looked after by one team based in Kigali.
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
