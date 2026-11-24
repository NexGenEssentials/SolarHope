import type { Metadata } from "next";
import HomeTemplates from "../../components/templates/homeTemplates";
import OneJob from "./oneJob";

// PROTOTYPE page for review. Not linked anywhere, not in the sitemap,
// and hidden from search engines.
export const metadata: Metadata = {
  title: "Lab: One installation, start to finish | SolarHope Africa",
  robots: { index: false, follow: false },
};

export default function OneJobLab() {
  return (
    <HomeTemplates>
      <div className="-mt-24">
        <OneJob />
      </div>
      <section className="bg-white">
        <div className="max-w-3xl mx-auto px-6 py-20 text-center space-y-3">
          <p className="text-yellow text-lg uppercase">Your turn</p>
          <h2 className="text-3xl font-bold text-gray-800">The same team, from the first visit to the monitoring screen.</h2>
        </div>
      </section>
    </HomeTemplates>
  );
}
