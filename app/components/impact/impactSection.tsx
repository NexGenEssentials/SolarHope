import React from "react";
import { BsArrowRight } from "react-icons/bs";
import pano1 from "@/public/images/pano1.png";
import pano2 from "@/public/images/pano2.png";
import pano3 from "@/public/images/pano3.png";

const ImpactSection = ({ id }: { id?: string }) => {
  return (
    <section id={id}>
    <div className="px-4 py-16 bg-white">
      <div className="max-w-[1570px] mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          {/* Text Content */}
          <div className="md:w-1/2 space-y-4">
            <h1 className="text-amber-500 text-lg">IMPACT</h1>

            <h2 className="text-3xl w-3/4 font-bold text-gray-800 mb-6">
              Empowering Communities with the Power of the Sun
            </h2>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              SolarHope Africa is a social-impact company dedicated to lighting
              up underserved communities through sustainable solar energy. We
              collaborate closely with governments, NGOs, and local leaders to
              illuminate homes, schools, and public infrastructure—transforming
              lives one village at a time.
            </p>

            <div className="flex items-end gap-4">
              <p className="text-amber-500 text-sm ">More Info</p>
              <BsArrowRight className="text-[#E58411] text-xl" />
            </div>
          </div>

          {/* Image/Visual Placeholder - Replace with actual image */}
          <div className="md:w-1/2 rounded-lg flex items-center gap-2 justify-center">
            <div className="flex flex-col items-center  gap-8 w-full h-full">
              <img
                src={pano2.src}
                alt="Impact Visual"
                className="w-56 h-60 object-cover rounded-lg "
              />
              <img
                src={pano3.src}
                alt="Impact Visual"
                className="w-56 h-72 object-cover rounded-lg shadow-2xl shadow-gray-500"
              />
            </div>
            <div className="flex w-full h-full">
              <img
                src={pano1.src}
                alt="Impact Visual"
                className="w-full h-full shadow-lg shadow-gray-500 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    </section>
  );
};

export default ImpactSection;
