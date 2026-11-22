import React from "react";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";
import teamInstalling from "@/public/images/projects/team-installing-inverter.jpg";
import crewValley from "@/public/images/projects/roof-crew-valley-view.jpg";

// Sends visitors from the home page to the page written for them.
const DOORS = [
  {
    href: "/solutions/businesses",
    label: "For businesses",
    title: "Stay open. Spend less.",
    text: "From a small shop to a large factory: keep trading through power cuts and cut your electricity bill.",
    image: teamInstalling.src,
    alt: "SolarHope technicians installing an inverter and battery for a business",
  },
  {
    href: "/solutions/homes",
    label: "For homes",
    title: "Power your family can count on.",
    text: "Lights, fridge, TV and Wi-Fi that keep running when the grid goes off.",
    image: crewValley.src,
    alt: "SolarHope crew installing solar panels on a family home in Nyagatare",
  },
];

// Plain links (not client navigation) so the quote form reads ?segment= on load.
const OTHERS = [
  { name: "Schools", href: "/?segment=school#quote" },
  { name: "Health facilities", href: "/?segment=health#quote" },
  { name: "NGOs and institutions", href: "/?segment=business#quote" },
  { name: "Repairs and upgrades", href: "/?segment=repair#quote" },
];

const DoorsSection = () => {
  return (
    <section className="max-w-[1570px] mx-auto px-6 sm:px-20 pb-16 space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {DOORS.map((d) => (
          <Link
            key={d.href}
            href={d.href}
            className="group relative flex flex-col justify-end overflow-hidden rounded-xl min-h-[26rem] lg:min-h-[30rem]"
          >
            <img
              src={d.image}
              alt={d.alt}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-dark-blue via-dark-blue/60 to-transparent" />
            <div className="relative p-6 sm:p-8 pt-24 space-y-2">
              <p className="text-yellow text-sm font-semibold uppercase tracking-wider">
                {d.label}
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold">{d.title}</h2>
              <p className="text-white/80 max-w-md">{d.text}</p>
              <span className="inline-flex items-center gap-3 pt-2 font-semibold group-hover:text-yellow transition-colors">
                See how it works
                <BsArrowRight className="transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/15 pt-5 text-sm">
        <span className="text-white/60">We also work with</span>
        {OTHERS.map((o) => (
          <a key={o.name} href={o.href} className="font-semibold hover:text-yellow transition-colors">
            {o.name}
          </a>
        ))}
      </div>
    </section>
  );
};

export default DoorsSection;
