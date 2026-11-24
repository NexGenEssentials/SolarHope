import type { Metadata } from "next";
import HomeTemplates from "../../components/templates/homeTemplates";
import Exploded from "./exploded";

// PROTOTYPE page for review. Not linked anywhere, not in the sitemap,
// and hidden from search engines.
export const metadata: Metadata = {
  title: "Lab: Inside a SolarHope system | SolarHope Africa",
  robots: { index: false, follow: false },
};

export default function ExplodedLab() {
  return (
    <HomeTemplates>
      <div className="-mt-24">
        <Exploded />
      </div>
      <section className="bg-white">
        <div className="max-w-3xl mx-auto px-6 py-20 text-center space-y-3">
          <p className="text-yellow text-lg uppercase">Plus the panels on your roof</p>
          <h2 className="text-3xl font-bold text-gray-800">Every part listed in your quote, nothing hidden.</h2>
        </div>
      </section>
    </HomeTemplates>
  );
}
