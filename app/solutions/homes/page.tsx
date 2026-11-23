import type { Metadata } from "next";
import HomeTemplates from "../../components/templates/homeTemplates";
import ParallaxImage from "../../components/media/parallaxImage";
import Button from "../../components/button/button";
import QuoteSection from "../../components/quote/quoteSection";
import BrandMarquee from "../../components/brands/brandMarquee";
import SetupOptions from "../../components/setups/setupOptions";
import { SITE } from "../../config/site";
import { LOWEST_PRICE_RWF, rwf } from "../../config/packages";
import HomePicker from "./_components/homePicker";
import SolarScene from "../../components/scene/solarScene";
import { HOME_SCENE } from "../../components/scene/scenes";
import crewValley from "@/public/images/projects/roof-crew-valley-view.jpg";

export const metadata: Metadata = {
  title: "Solar for homes in Rwanda | SolarHope Africa",
  description:
    "Keep your home running through power cuts and bring your electricity bill down. See what your home can run, choose a package, and power your electric car charger with sunshine.",
  alternates: { canonical: "/solutions/homes" },
  twitter: {
    card: "summary_large_image",
    title: "Solar for homes in Rwanda | SolarHope Africa",
    description: "Keep your home running through power cuts and bring your electricity bill down.",
    images: ["/og-image.png"],
  },
  openGraph: {
    title: "Solar for homes in Rwanda | SolarHope Africa",
    description: "Keep your home running through power cuts and bring your electricity bill down.",
    url: "/solutions/homes",
    siteName: SITE.name,
    images: ["/og-image.png"],
    type: "website",
  },
};


const FAQ = [
  {
    q: "Do I stay connected to the grid?",
    a: "Yes. Your system works alongside your existing connection, and when the grid goes off, the battery takes over automatically. Depending on the set-up you choose, your home can also run on solar first and use the grid less.",
  },
  {
    q: "Is my roof suitable?",
    a: "We check this at the home visit: which way the roof faces, any shade from trees or buildings, and whether it is strong enough. If something needs fixing first, we tell you before you commit.",
  },
  {
    q: "How does payment work?",
    a: "The full project cost is paid before installation begins. Your quote lists every item, so you know exactly what you are paying for.",
  },
  {
    q: "What happens if something breaks?",
    a: "Panels are guaranteed for 10 years, the inverter and battery for 5, and our own installation work for 2. We also monitor your system remotely once it is running.",
  },
];

const label = "text-yellow text-lg uppercase";
// One container so every section shares the same left and right edges.
const container = "max-w-[1570px] mx-auto px-6 sm:px-20";

export default function HomesPage() {
  return (
    <HomeTemplates>
      {/* Hero: full-width home picture */}
      <section className="relative min-h-[520px] h-[70vh] overflow-hidden">
        <ParallaxImage
          src={crewValley.src}
          alt="SolarHope crew installing solar panels on a family home in Nyagatare"
          speed={0.25}
          priority
        />
        <div className="absolute inset-0 bg-linear-to-r from-dark-blue via-dark-blue/75 to-dark-blue/10" />
        <div className={`${container} relative h-full flex flex-col justify-center gap-6`}>
          <p className="text-yellow uppercase tracking-widest text-sm font-semibold">Solar for homes</p>
          <h1 className="text-4xl sm:text-5xl font-bold max-w-3xl leading-tight text-balance">
            Power your family can count on.
          </h1>
          <p className="text-white/80 text-lg max-w-xl">
            For any home in Rwanda, from a small apartment to a large family
            house. When the grid goes off, your home carries on.
          </p>
          <p className="text-yellow font-semibold">
            Packages from {rwf(LOWEST_PRICE_RWF)} RWF, excluding VAT
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 font-bold">
            <a
              href="#what-can-you-run"
              className="inline-block whitespace-nowrap bg-yellow/80 text-dark-blue hover:bg-yellow px-4 py-3 text-sm rounded-md"
            >
              What can my home run?
            </a>
          </div>
        </div>
      </section>

      {/* A power cut at home: one line, then the day/night scene */}
      <section className="bg-white py-16">
        <div className={`${container} space-y-8`}>
          <div className="space-y-3">
            <p className={label}>An ordinary evening</p>
            <h2 className="text-3xl font-bold text-gray-800">
              The only sign of a power cut is the dark street outside
            </h2>
          </div>
          <SolarScene config={HOME_SCENE} />
        </div>
      </section>

      <SetupOptions who="home" labelClass={label} container={container} variant="blue" />

      {/* What can your home run? */}
      <section id="what-can-you-run" className="bg-[#F2F4F7] py-20 scroll-mt-24">
        <div className={`${container} space-y-10`}>
          <div className="space-y-4 max-w-3xl">
            <p className={label}>Find your package</p>
            <h2 className="text-3xl font-bold text-gray-800">What does your home need to run?</h2>
            <p className="text-lg text-gray-600">
              Tap what you use, and we will show you a good place to start.
              Every Hope Series system can grow later.
            </p>
          </div>
          <HomePicker />
        </div>
      </section>

      {/* Questions */}
      <section className="bg-white py-16">
        <div className={`${container} space-y-8`}>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="space-y-3">
              <p className={label}>Your questions</p>
              <h2 className="text-3xl font-bold text-gray-800">What homeowners ask us</h2>
            </div>
            <p className="text-gray-600">
              Something else on your mind? Message us on{" "}
              <a href={SITE.whatsappUrl} target="_blank" rel="noopener noreferrer" className="underline">
                WhatsApp
              </a>
              .
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-x-10 border-t border-gray-200">
            {FAQ.map((f) => (
              <details key={f.q} className="group py-5 border-b border-gray-200">
                <summary className="flex justify-between items-center cursor-pointer list-none text-lg font-semibold text-gray-800">
                  {f.q}
                  <span className="text-yellow text-2xl transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-gray-600 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment we trust */}
      <section className="bg-white">
        <div className={`${container} pb-16 space-y-6`}>
          <p className={label}>Equipment we trust</p>
          <BrandMarquee />
        </div>
      </section>

      <QuoteSection id="quote" defaultSegment="home" />
    </HomeTemplates>
  );
}
