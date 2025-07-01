"use client";
import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const Achiev = [
  {
    total: 200,
    title: "Schools Powered",
    desc: "Empowering education through sustainable energy solutions.",
  },
  {
    total: 35,
    title: "Clinics Lit Up",
    desc: "Bringing healthcare access to underserved communities.",
  },
  {
    total: 18,
    title: "Partners Engaged",
    desc: "Collaborating for a brighter future.",
  },
];

const AchievementSection = () => {
  return (
    <div className="text-white bg-gradient-to-br from-[#3725C7] from-10% to-[#17122B]">
      <div className="max-w-[1570px] mx-auto p-8 sm:p-28 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <h1 className="font-bold text-3xl text-[#FFEEC2]">
            Our Achievements in Empowering Communities
          </h1>
          <p>
            At SolarHope Africa, we are proud of the tangible impact we have
            made in rural communities. Our initiatives have electrified homes,
            powered schools, and lit up clinics, transforming lives across the
            continent. Join us in celebrating these milestones that reflect our
            commitment to sustainable energy solutions.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Achiev.map((item, idx) => {
            const { ref, inView } = useInView({ triggerOnce: true });

            return (
              <div
                key={idx}
                ref={ref}
                className="p-8 bg-[#735CFF14] rounded-lg space-y-2 w-full"
              >
                <div className="text-8xl font-extrabold text-[#FFE08F] pb-8">
                  {inView ? (
                    <CountUp
                      end={item.total}
                      duration={2}
                      separator=","
                      suffix={item.total >= 200 ? "+" : ""}
                    />
                  ) : (
                    "0"
                  )}
                </div>
                <h1 className="text-lg font-bold leading-normal">
                  {item.title}
                </h1>
                <p className="text-sm">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AchievementSection;
