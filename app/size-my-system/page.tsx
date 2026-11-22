import type { Metadata } from "next";
import HomeTemplates from "../components/templates/homeTemplates";
import QuoteSection from "../components/quote/quoteSection";
import { SITE } from "../config/site";
import SizingTool from "./_components/sizingTool";

export const metadata: Metadata = {
  title: "What size solar system do I need? | SolarHope Africa",
  description:
    "Enter your monthly electricity bill and see which solar package fits, what it costs and roughly how quickly it pays for itself. For businesses and homes in Rwanda.",
  alternates: { canonical: "/size-my-system" },
  openGraph: {
    title: "What size solar system do I need? | SolarHope Africa",
    description: "Enter your monthly electricity bill and see which solar package fits.",
    url: "/size-my-system",
    siteName: SITE.name,
    images: ["/og-image.png"],
    type: "website",
  },
};

export default function SizeMySystemPage() {
  return (
    <HomeTemplates>
      <section className="max-w-[1570px] mx-auto px-6 sm:px-20 pt-10 pb-20 space-y-10">
        <div className="space-y-3">
          <p className="text-yellow uppercase tracking-widest text-sm font-semibold">Size my system</p>
          <h1 className="text-white/60 text-lg max-w-xl">
            Start with your electricity bill. We&rsquo;ll tell you which system fits.
          </h1>
        </div>
        <SizingTool />
      </section>

      <QuoteSection id="quote" />
    </HomeTemplates>
  );
}
