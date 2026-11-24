import type { Metadata } from "next";
import HomeTemplates from "../../components/templates/homeTemplates";
import OneDay from "./oneDay";

// PROTOTYPE page for review. Not linked anywhere, not in the sitemap,
// and hidden from search engines.
export const metadata: Metadata = {
  title: "Lab: One Day in Kigali | SolarHope Africa",
  robots: { index: false, follow: false },
};

export default function OneDayLab() {
  return (
    <HomeTemplates>
      <div className="-mt-24">
        <OneDay />
      </div>
      <section className="bg-white">
        <div className="max-w-3xl mx-auto px-6 py-20 text-center space-y-4">
          <p className="text-yellow text-lg uppercase">That was one day</p>
          <h2 className="text-3xl font-bold text-gray-800">The sun you store by day carries you through the night.</h2>
          <p className="text-gray-600">
            Illustration only. How long your battery lasts depends on what you
            keep running; your quote shows the hours for your own equipment.
          </p>
        </div>
      </section>
    </HomeTemplates>
  );
}
