import type { Metadata } from "next";
import HomeTemplates from "../../components/templates/homeTemplates";
import RwandaMap from "./rwandaMap";

// PROTOTYPE page for review. Not linked anywhere, not in the sitemap,
// and hidden from search engines.
export const metadata: Metadata = {
  title: "Lab: Light up Rwanda | SolarHope Africa",
  robots: { index: false, follow: false },
};

export default function RwandaMapLab() {
  return (
    <HomeTemplates>
      <section className="bg-dark-blue">
        <div className="max-w-[1570px] mx-auto px-6 sm:px-20 py-12 space-y-6">
          <div className="max-w-2xl space-y-3 text-white">
            <p className="text-yellow text-lg uppercase">Where we work</p>
            <h1 className="text-3xl sm:text-4xl font-bold">Lighting up Rwanda, one district at a time</h1>
            <p className="text-white/70 text-lg">
              Every cell on this map is a solar panel. The gold ones are where
              SolarHope systems are running today.
            </p>
            <p className="inline-block rounded-full bg-red-500/15 border border-red-400/40 text-red-300 text-xs font-semibold px-3 py-1">
              Prototype: sample data except Nyagatare. Replace with our real project list.
            </p>
          </div>
          <RwandaMap />
          <p className="text-xs text-white/30">District boundaries: geoBoundaries (CC BY 4.0).</p>
        </div>
      </section>
    </HomeTemplates>
  );
}
