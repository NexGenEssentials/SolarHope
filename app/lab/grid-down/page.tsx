import type { Metadata } from "next";
import HomeTemplates from "../../components/templates/homeTemplates";
import GridDown from "./gridDown";
import crewValley from "@/public/images/projects/roof-crew-valley-view.jpg";
import teamInstalling from "@/public/images/projects/team-installing-inverter.jpg";

// PROTOTYPE page for review. Not linked anywhere, not in the sitemap,
// and hidden from search engines.
export const metadata: Metadata = {
  title: "Lab: The Grid Goes Down | SolarHope Africa",
  robots: { index: false, follow: false },
};

const container = "max-w-[1570px] mx-auto px-6 sm:px-20";

export default function GridDownLab() {
  return (
    <HomeTemplates>
      <GridDown>
        {/* Sample content, so the effect plays over a real-looking page */}
        <section className="relative min-h-[520px] h-[70vh] overflow-hidden mt-8">
          <img src={crewValley.src} alt="SolarHope crew installing panels on a family home" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-linear-to-r from-dark-blue via-dark-blue/75 to-dark-blue/10" />
          <div className={`relative ${container} h-full flex flex-col justify-center gap-6 text-white`}>
            <p className="text-yellow text-sm font-semibold uppercase tracking-wider">Solar for homes</p>
            <h1 className="text-4xl sm:text-5xl font-bold max-w-3xl leading-tight">Power your family can count on.</h1>
            <p className="text-white/85 max-w-xl">
              For any home in Rwanda, from a small apartment to a large family
              house. When the grid goes off, your home carries on.
            </p>
          </div>
        </section>

        <section className="bg-white">
          <div className={`${container} py-20 grid lg:grid-cols-2 gap-12 items-center`}>
            <div className="space-y-4 text-gray-600">
              <p className="text-yellow text-lg uppercase">Try it</p>
              <h2 className="text-3xl font-bold text-gray-800">Flip the switch above</h2>
              <p className="text-lg leading-relaxed">
                This page is wired like a SolarHope home. Cut the grid and watch
                what happens: everything goes dark for a moment, then the
                battery takes over and the lights come back, by themselves.
              </p>
            </div>
            <img src={teamInstalling.src} alt="SolarHope technicians installing an inverter and battery" className="w-full max-w-md h-[380px] object-cover rounded-lg shadow-lg shadow-gray-500 justify-self-center" />
          </div>
        </section>
      </GridDown>
    </HomeTemplates>
  );
}
