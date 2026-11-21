"use client";
import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { SHOW_ACHIEVEMENTS } from "@/app/config/site";

// Phase 0.3: hidden. The figures previously hard-coded here (200 / 35 / 18)
// were not real. Fill in each `total` with a checked figure, review the copy
// below, then set SHOW_ACHIEVEMENTS = true in app/config/site.ts.
const Achiev: { total: number | null; title: string; desc: string }[] = [
  {
    total: null,
    title: "Schools Powered",
    desc: "Empowering education through sustainable energy solutions.",
  },
  {
    total: null,
    title: "Clinics Lit Up",
    desc: "Bringing healthcare access to underserved communities.",
  },
  {
    total: null,
    title: "Partners Engaged",
    desc: "Collaborating for a brighter future.",
  },
];

const StatCard = ({
  total,
  title,
  desc,
}: {
  total: number;
  title: string;
  desc: string;
}) => {
  const { ref, inView } = useInView({ triggerOnce: true });
  return (
    <div ref={ref} className="p-8 bg-[#735CFF14] rounded-lg space-y-2 w-full">
      <div className="text-8xl font-extrabold text-[#FFE08F] pb-8">
        {inView ? <CountUp end={total} duration={2} separator="," /> : total}
      </div>
      <h3 className="text-lg font-bold leading-normal">{title}</h3>
      <p className="text-sm">{desc}</p>
    </div>
  );
};

const AchievementSection = () => {
  if (!SHOW_ACHIEVEMENTS || Achiev.some((a) => a.total === null)) return null;

  return (
    <div className="text-white bg-gradient-to-br from-[#3725C7] from-10% to-[#17122B]">
      <div className="max-w-[1570px] mx-auto p-8 sm:p-28 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <h2 className="font-bold text-3xl text-[#FFEEC2]">
            Our Achievements in Empowering Communities
          </h2>
          <p>
            At SolarHope Africa, we are proud of the tangible impact we have
            made in rural communities. Our initiatives have electrified homes,
            powered schools, and lit up clinics, transforming lives across the
            continent. Join us in celebrating these milestones that reflect our
            commitment to sustainable energy solutions.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Achiev.map((item) => (
            <StatCard
              key={item.title}
              total={item.total as number}
              title={item.title}
              desc={item.desc}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AchievementSection;
