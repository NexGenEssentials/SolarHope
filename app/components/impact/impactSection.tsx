import React from "react";
import technicianOnArray from "@/public/images/projects/roof-technician-on-array.jpg";
import teamInstalling from "@/public/images/projects/team-installing-inverter.jpg";
import finishedArray from "@/public/images/projects/roof-finished-array.jpg";

const ImpactSection = ({ id }: { id?: string }) => {
  return (
    <section id={id}>
    <div className="px-4 py-16 bg-white">
      <div className="max-w-[1570px] mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          {/* Text Content */}
          <div className="md:w-1/2 space-y-4">
            <h1 className="text-amber-500 text-lg">WHAT WE DO</h1>

            <h2 className="text-3xl w-3/4 font-bold text-gray-800 mb-6">
              Empowering Communities with the Power of the Sun
            </h2>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              SolarHope Africa is a solar installation company based in Kigali,
              working at every scale: a modern family home, a bar or factory
              cutting its REG bill, a boarding school, a clinic, a large
              commercial site, or a rural site the grid has never reached. We
              assess the site, then design, supply and install the system,
              train your team, and stay on for warranty and remote monitoring.
            </p>
          </div>

          <div className="md:w-1/2 rounded-lg flex items-center gap-2 justify-center">
            <div className="flex flex-col items-center  gap-8 w-full h-full">
              <img
                src={teamInstalling.src}
                alt="Three SolarHope technicians installing a hybrid inverter and battery"
                className="w-56 h-60 object-cover rounded-lg "
              />
              <img
                src={finishedArray.src}
                alt="A finished SolarHope rooftop solar array"
                className="w-56 h-72 object-cover rounded-lg shadow-2xl shadow-gray-500"
              />
            </div>
            <div className="flex w-full h-full">
              <img
                src={technicianOnArray.src}
                alt="SolarHope technician walking across a newly installed rooftop solar array"
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
