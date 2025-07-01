import React from "react";
import Button from "../button/button";

const JoinSection = () => {
  return (
    <div className="relative text-white bg-[#0D1B39] overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/images/pano4.png"
          alt="Join Background"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-[#0D1B39] opacity-60"></div>
      </div>

      <div className="relative z-10 max-w-[1570px] mx-auto p-8 sm:p-28 space-y-16">
        <div className="flex flex-col items-center justify-center gap-8 text-center">
          <h1 className="font-bold text-3xl sm:text-4xl">
            Join the SolarHope Movement
          </h1>
          <p className="max-w-2xl">
            Together, we can illuminate lives and empower communities through
            sustainable solar energy solutions.
          </p>
        </div>
        <div className="flex items-center justify-center gap-4">
          <Button link="#" name="Donate" />
          <button className="px-6 py-2 hover:border border-white rounded-md hover:bg-white hover:text-black transition">
            Partner
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinSection;
