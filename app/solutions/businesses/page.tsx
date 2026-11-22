import type { Metadata } from "next";
import HomeTemplates from "../../components/templates/homeTemplates";
import Button from "../../components/button/button";
import QuoteSection from "../../components/quote/quoteSection";
import { EQUIPMENT_BRANDS, SITE } from "../../config/site";
import EnergyFlow from "./_components/energyFlow";
import { LOWEST_PRICE_RWF, rwf } from "../../config/packages";
import teamInstalling from "@/public/images/projects/team-installing-inverter.jpg";
import withFinishedInstall from "@/public/images/projects/technician-with-finished-install.jpg";

export const metadata: Metadata = {
  title: "Solar for businesses in Rwanda | SolarHope Africa",
  description:
    "Stay open through power cuts, spend less on electricity and leave the generator behind. Solar with battery backup for any business in Rwanda, from a small shop to a large factory.",
  alternates: { canonical: "/solutions/businesses" },
  openGraph: {
    title: "Solar for businesses in Rwanda | SolarHope Africa",
    description:
      "Stay open through power cuts, spend less on electricity and leave the generator behind.",
    url: "/solutions/businesses",
    siteName: SITE.name,
    images: ["/og-image.png"],
    type: "website",
  },
};

const REASONS = [
  {
    title: "Power cuts cost you customers",
    text: "When the lights go out, sales stop. Customers walk away, drinks warm up and staff stand waiting. With solar and a battery, your business switches over automatically and carries on.",
  },
  {
    title: "Generators are an expensive fix",
    text: "Fuel every time the power goes, regular servicing, noise your customers can hear and fumes nobody wants near the door. Solar runs silently, burns nothing and needs no fuel at all.",
  },
  {
    title: "Electricity bills keep growing",
    text: "Every new fridge, light and machine adds to the monthly bill. With panels on your roof, you make much of your own power and buy far less of it.",
  },
];

const PROFILES = [
  {
    title: "Bars, restaurants and lounges",
    text: "Your busiest hours come after dark. The panels charge the battery through the quiet afternoon, and the battery carries you through the evening rush.",
  },
  {
    title: "Shops, offices and workshops",
    text: "You work in daylight, when the sun is strongest, so you use solar power as it is made and keep the battery for the evening and for power cuts.",
  },
  {
    title: "Factories and larger sites",
    text: "Bigger machines need a system built around them. We design yours after a site visit, so the equipment that must never stop is covered first.",
  },
];

const STEPS = [
  "A site visit and a system designed around your business",
  "Installation by our own trained technicians",
  "Full testing before we switch you on",
  "A walk-through for you and your staff",
  "Remote monitoring of your system once it is running",
];

const label = "text-amber-500 text-lg uppercase";
// One container so every section shares the same left and right edges.
const container = "max-w-[1570px] mx-auto px-6 sm:px-20";

export default function BusinessesPage() {
  return (
    <HomeTemplates>
      {/* Hero */}
      <div className="flex flex-col gap-8 w-11/12 lg:w-4/5 mx-auto py-16 items-center text-center">
        <h1 className="text-3xl sm:text-4xl bg-linear-to-r from-white to-yellow/80 bg-clip-text text-transparent font-bold lg:whitespace-nowrap">
          <span className="block lg:inline">Keep the lights on. </span>
          <span className="block lg:inline">Keep the costs down.</span>
        </h1>
        <p className="text-[#BABABA] max-w-2xl">
          Solar power for any business in Rwanda, from a small shop to a
          large factory. When the grid goes off, your business stays open.
        </p>
        <p className="text-yellow font-semibold">
          Packages from {rwf(LOWEST_PRICE_RWF)} RWF, excluding VAT
        </p>
        <div className="flex items-center gap-8 justify-center font-bold">
          <Button link="#quote" name="Get a quote" />
          <a
            href={SITE.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-yellow transition-colors"
          >
            WhatsApp us
          </a>
        </div>
      </div>

      {/* Why businesses switch */}
      <section className="bg-white py-20">
        <div className={`${container} space-y-12`}>
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2 space-y-4">
              <p className={label}>Why businesses switch</p>
              <h2 className="text-3xl font-bold text-gray-800">
                Your power should work as hard as you do
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Power cuts, generator fuel and rising bills all eat into what
                you earn. A solar system with battery backup takes care of all
                three, quietly, every day.
              </p>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img
                src={teamInstalling.src}
                alt="Three SolarHope technicians installing a hybrid inverter and battery"
                className="w-full max-w-md h-[380px] object-cover rounded-lg shadow-lg shadow-gray-500"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {REASONS.map((r) => (
              <div key={r.title} className="p-6 bg-[#F2F4F7] rounded-lg space-y-3">
                <h3 className="text-xl font-bold text-gray-800">{r.title}</h3>
                <p className="text-gray-600 leading-relaxed">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Built around how you trade */}
      <section className="text-white bg-linear-to-b from-[#2C98F0] from-10% to-95% to-[#044376]">
        <div className={`${container} py-20 space-y-12`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-4">
              <span className="w-fit border border-yellow rounded-full bg-yellow/10 px-8 py-1 text-yellow font-semibold">
                Made to fit
              </span>
              <h2 className="font-bold text-3xl">
                Built around the way your business runs
              </h2>
            </div>
            <p className="self-end">
              A bar and a shop can have the same bill and still need very
              different systems. We design yours around when you are busiest,
              not around a standard kit.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROFILES.map((p) => (
              <div key={p.title} className="p-6 bg-white/7 rounded space-y-4">
                <h3 className="text-2xl font-bold leading-normal">{p.title}</h3>
                <p className="text-sm leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="bg-white">
        <div className={`${container} py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center`}>
          <div className="space-y-5 text-gray-600 leading-relaxed">
            <p className={label}>What you get</p>
            <h2 className="text-3xl font-bold text-gray-800">
              One team, from the first visit to years of support
            </h2>
            <p className="text-lg">
              Panels on your roof, a battery on your wall, and a system that
              works alongside the grid. You stay connected, and when the power
              goes off, the switch happens by itself.
            </p>
            <ul className="space-y-2">
              {STEPS.map((s) => (
                <li key={s} className="flex gap-3">
                  <span className="text-amber-500 font-bold">✓</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-center">
            <img
              src={withFinishedInstall.src}
              alt="SolarHope technician beside a finished inverter and battery installation"
              className="w-full max-w-md h-[460px] object-cover rounded-lg shadow-lg shadow-gray-500"
            />
          </div>
        </div>
      </section>

      {/* Outages */}
      <section className="bg-white text-gray-600">
        <div className={`${container} pb-20 space-y-10`}>
            <div className="space-y-4 max-w-3xl">
              <p className={label}>When the power goes off</p>
              <h2 className="text-3xl font-bold text-gray-800">
                How long will you stay open?
              </h2>
              <p className="text-lg leading-relaxed">
                Your system works alongside the grid. When the power goes off,
                the battery takes over by itself, with no switch to flip and no
                generator to start.
              </p>
              <p className="leading-relaxed">
                How long it lasts depends on what you keep running, so we never
                quote a headline number. Your quote shows the hours for your own
                equipment.
              </p>
            </div>
            <EnergyFlow />
        </div>
      </section>

      {/* Equipment we trust */}
      <section className="bg-white text-gray-600">
        <div className={`${container} pb-20 space-y-10`}>
          <div className="max-w-3xl space-y-4 text-lg leading-relaxed">
            <p className={label}>Equipment we trust</p>
            <h2 className="text-3xl font-bold text-gray-800">
              Built with brands that last
            </h2>
            <p>
              We install inverters, batteries and panels from established
              manufacturers, so your system is backed twice: by the
              maker&rsquo;s warranty and by our own.
            </p>
          </div>
          <div className="overflow-hidden border-y border-gray-200 py-6 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <ul className="flex w-max items-center animate-[marquee_35s_linear_infinite] hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center">
              {[...EQUIPMENT_BRANDS, ...EQUIPMENT_BRANDS].map((b, i) => {
                const copy = i >= EQUIPMENT_BRANDS.length;
                return (
                  <li
                    key={i}
                    aria-hidden={copy ? true : undefined}
                    className={`group shrink-0 w-56 h-24 flex items-center justify-center px-8 ${copy ? "motion-reduce:hidden" : ""}`}
                  >
                    {b.logo ? (
                      <img
                        src={b.logo}
                        alt={copy ? "" : b.name}
                        loading="lazy"
                        className={`${b.stacked ? "max-h-20" : "max-h-12"} max-w-full w-auto object-contain transition-transform duration-300 group-hover:scale-105`}
                      />
                    ) : (
                      <span className="text-lg font-bold tracking-wide text-gray-500">
                        {b.name}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      <QuoteSection id="quote" defaultSegment="business" />
    </HomeTemplates>
  );
}
