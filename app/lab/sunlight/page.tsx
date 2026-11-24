import type { Metadata } from "next";
import HomeTemplates from "../../components/templates/homeTemplates";
import Sunlight from "./sunlight";

// PROTOTYPE page for review. Not linked anywhere, not in the sitemap,
// and hidden from search engines.
export const metadata: Metadata = {
  title: "Lab: Sunlight in motion | SolarHope Africa",
  robots: { index: false, follow: false },
};

export default function SunlightLab() {
  return (
    <HomeTemplates>
      <div className="-mt-24">
        <Sunlight
          src="/images/projects/roof-crew-valley-view.jpg"
          alt="SolarHope crew installing solar panels on a roof in Nyagatare, with the valley behind"
        />
      </div>
      <section className="bg-white">
        <div className="max-w-3xl mx-auto px-6 py-20 text-center space-y-3">
          <p className="text-yellow text-lg uppercase">Prototype</p>
          <p className="text-gray-600">
            A real SolarHope installation, lit live in the browser. The rest of
            the page would continue here.
          </p>
        </div>
      </section>
    </HomeTemplates>
  );
}
