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

const container = "max-w-[1570px] mx-auto px-6 sm:px-20";

export default function SizeMySystemPage() {
  return (
    <HomeTemplates>
      <div className="flex flex-col gap-5 w-11/12 lg:w-4/5 mx-auto py-14 items-center text-center">
        <p className="text-yellow uppercase tracking-widest text-sm font-semibold">Size my system</p>
        <h1 className="text-3xl sm:text-4xl bg-linear-to-r from-white to-yellow/80 bg-clip-text text-transparent font-bold">
          What size system do you need?
        </h1>
        <p className="text-[#BABABA] max-w-2xl">
          Start with your electricity bill. In a few seconds you&rsquo;ll see which
          package fits, what it costs and roughly how quickly it pays for itself.
        </p>
      </div>

      <section className="bg-[#F2F4F7] py-16">
        <div className={container}>
          <SizingTool />
        </div>
      </section>

      <QuoteSection id="quote" />
    </HomeTemplates>
  );
}
