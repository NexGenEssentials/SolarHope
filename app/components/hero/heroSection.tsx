import React from "react";
import Button from "../button/button";
import { GoDotFill } from "react-icons/go";

const HeroSection = () => {
  return (
    <div className="h-[40vh] relative ">
      <div className=" flex flex-col gap-8 w-1/2 mx-auto py-8 items-center justify-center text-white text-center rounded-lg">
        <h1 className="text-4xl bg-linear-to-r from-white to-yellow/80 bg-clip-text text-transparent font-bold">
          Light Up Dreams, The Solar Way
        </h1>
        <p className="text-[#BABABA]">
          At SolarHope Africa, we bring clean, sustainable solar energy to rural
          communities. Join us in transforming lives and empowering futures.
        </p>
        <div className="flex items-center gap-8 justify-center font-bold">
          <Button link="#get-involved" name="  Donate" />
          Partner
        </div>
      </div>
      <div className=" absolute top-1/3 right-18 w-8 h-8 border border-white backdrop-blur-sm flex items-center justify-center rounded-full bg-slate-500/60">
        <GoDotFill className="text-white" size={20}/>
      </div>
      <div className=" absolute top-4/5 left-18 bottom-0 w-8 h-8 border border-white backdrop-blur-sm flex items-center justify-center rounded-full bg-slate-500/60">
        <GoDotFill className="text-white" size={20}/>
      </div>
    </div>
  );
};

export default HeroSection;
