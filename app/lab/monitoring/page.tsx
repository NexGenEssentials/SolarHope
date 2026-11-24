import type { Metadata } from "next";
import HomeTemplates from "../../components/templates/homeTemplates";
import Monitor from "./monitor";

// PROTOTYPE page for review. Not linked anywhere, not in the sitemap,
// and hidden from search engines.
export const metadata: Metadata = {
  title: "Lab: Live from our monitoring room | SolarHope Africa",
  robots: { index: false, follow: false },
};

export default function MonitoringLab() {
  return (
    <HomeTemplates>
      <section className="bg-[#F2F4F7] text-gray-800">
        <div className="max-w-[1570px] mx-auto px-4 sm:px-20 py-16 space-y-8">
          <div className="max-w-2xl space-y-3">
            <p className="text-yellow text-lg uppercase">Live from our monitoring room</p>
            <h1 className="text-3xl sm:text-4xl font-bold">See your system the way our team sees it</h1>
            <p className="text-gray-600 text-lg">
              Every day, our team watches client systems on this screen. Pick a
              moment below and see where the power comes from.
            </p>
          </div>
          <Monitor />
        </div>
      </section>
    </HomeTemplates>
  );
}
