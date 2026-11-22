import type { Metadata } from "next";
import HomeTemplates from "../../components/templates/homeTemplates";
import Button from "../../components/button/button";
import QuoteSection from "../../components/quote/quoteSection";
import BrandMarquee from "../../components/brands/brandMarquee";
import { SITE } from "../../config/site";
import { DREAM_SERIES, HOPE_SERIES, LOWEST_PRICE_RWF, rwf } from "../../config/packages";
import technicianOnArray from "@/public/images/projects/roof-technician-on-array.jpg";
import crewValley from "@/public/images/projects/roof-crew-valley-view.jpg";
import wallInstall from "@/public/images/projects/wall-install-inverter-battery.jpg";

export const metadata: Metadata = {
  title: "Solar for homes in Rwanda | SolarHope Africa",
  description:
    "Keep your home running through power cuts and bring your electricity bill down. Solar with battery backup for any home in Rwanda, and solar power for charging your electric car.",
  alternates: { canonical: "/solutions/homes" },
  openGraph: {
    title: "Solar for homes in Rwanda | SolarHope Africa",
    description: "Keep your home running through power cuts and bring your electricity bill down.",
    url: "/solutions/homes",
    siteName: SITE.name,
    images: ["/og-image.png"],
    type: "website",
  },
};

const REASONS = [
  {
    title: "Power cuts at the worst moment",
    text: "Dinner in the dark, a fridge warming up, no Wi-Fi for homework. With solar and a battery, your home switches over automatically and carries on.",
  },
  {
    title: "Generators are noisy and costly",
    text: "Fuel every time the power goes, regular servicing, and noise and fumes for you and your neighbours. Solar runs silently and needs no fuel at all.",
  },
  {
    title: "Bills keep creeping up",
    text: "Every new appliance adds to the monthly bill. With panels on your roof, you make much of your own power and buy far less of it.",
  },
];

const DAY = [
  {
    title: "Mornings",
    text: "Kettle, iron and getting everyone out of the door. The battery covers the early hours before the sun is strong.",
  },
  {
    title: "Daytime",
    text: "The house is quieter, so the panels run what is on and refill the battery while you are out.",
  },
  {
    title: "Evenings",
    text: "Cooking, TV, lights and charging phones. The battery carries the busiest hours after sunset.",
  },
];

const STEPS = [
  "A home visit and a system sized to how your family uses power",
  "Installation by our own trained technicians",
  "Full testing before we switch you on",
  "A walk-through so everyone at home knows how it works",
  "Remote monitoring of your system once it is running",
];

// Home-sized Hope Series systems; larger ones are mentioned below the cards.
const HOME_PACKAGES = HOPE_SERIES.slice(0, 3);

const label = "text-amber-500 text-lg uppercase";
// One container so every section shares the same left and right edges.
const container = "max-w-[1570px] mx-auto px-6 sm:px-20";

export default function HomesPage() {
  return (
    <HomeTemplates>
      {/* Hero */}
      <div className="flex flex-col gap-8 w-11/12 lg:w-4/5 mx-auto py-16 items-center text-center">
        <h1 className="text-3xl sm:text-4xl bg-linear-to-r from-white to-yellow/80 bg-clip-text text-transparent font-bold lg:whitespace-nowrap">
          <span className="block lg:inline">Keep your home running. </span>
          <span className="block lg:inline">Keep your bills down.</span>
        </h1>
        <p className="text-[#BABABA] max-w-2xl">
          Solar power for any home in Rwanda, from a small apartment to a large
          family house. When the grid goes off, your lights, fridge and Wi-Fi
          stay on.
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

      {/* Why homeowners switch */}
      <section className="bg-white py-20">
        <div className={`${container} space-y-12`}>
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2 space-y-4">
              <p className={label}>Why homeowners switch</p>
              <h2 className="text-3xl font-bold text-gray-800">
                Power your family can count on
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Power cuts, generator fuel and rising bills all get in the way
                of home life. A solar system with battery backup takes care of
                all three, quietly, every day.
              </p>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img
                src={technicianOnArray.src}
                alt="SolarHope technician on a newly installed rooftop solar array on a family home in Nyagatare"
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

      {/* Built around family life */}
      <section className="text-white bg-linear-to-b from-[#2C98F0] from-10% to-95% to-[#044376]">
        <div className={`${container} py-20 space-y-12`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-4">
              <span className="w-fit border border-yellow rounded-full bg-yellow/10 px-8 py-1 text-yellow font-semibold">
                Made to fit
              </span>
              <h2 className="font-bold text-3xl">Built around family life</h2>
            </div>
            <p className="self-end">
              Most homes use the most power in the morning and the evening,
              when the sun is weakest. That is why a good home system is as
              much about the battery as the panels.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {DAY.map((d) => (
              <div key={d.title} className="p-6 bg-white/7 rounded space-y-4">
                <h3 className="text-2xl font-bold leading-normal">{d.title}</h3>
                <p className="text-sm leading-relaxed">{d.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EV charging */}
      <section className="bg-white py-20">
        <div className={`${container} grid grid-cols-1 lg:grid-cols-2 gap-12 items-center`}>
          <div className="flex justify-center order-2 lg:order-1">
            <img
              src={crewValley.src}
              alt="SolarHope crew installing solar panels on a family home in Nyagatare"
              loading="lazy"
              className="w-full max-w-md h-[420px] object-cover rounded-lg shadow-lg shadow-gray-500"
            />
          </div>
          <div className="space-y-5 text-gray-600 leading-relaxed order-1 lg:order-2">
            <p className={label}>EV charging at home</p>
            <h2 className="text-3xl font-bold text-gray-800">Charge your car on sunshine</h2>
            <p className="text-lg">
              Already drive an electric car? We power your charger from your
              solar system: straight from the panels during the day, and from
              your battery at night.
            </p>
            <p>
              You keep your own charger. We size your system around how you
              drive, so the car charges without leaving the house short. At
              night the battery gives the car a top-up, so most of the charging
              happens in daylight.
            </p>
            <Button link="?segment=ev-home#quote" name="Ask about EV charging" />
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="bg-white text-[#637083] pb-20">
        <div className={container}>
          <div className="bg-[#F2F4F7] p-8 md:p-14 rounded-lg space-y-8">
            <div className="space-y-3 max-w-3xl">
              <p className={label}>Packages</p>
              <h2 className="text-3xl font-bold text-gray-800">
                Start with what you need. Grow when you are ready.
              </h2>
              <p>
                Our Hope Series is built from separate panels, inverter and
                battery, so you can start small and add more later. All prices
                exclude VAT.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {HOME_PACKAGES.map((pkg) => (
                <div key={pkg.name} className="bg-white rounded-lg p-6 flex flex-col gap-3 border-t-4 border-yellow">
                  <h3 className="text-xl font-bold text-gray-800">{pkg.name}</h3>
                  <p className="text-sm text-gray-500 font-semibold">What it runs</p>
                  <p className="text-sm flex-1">{pkg.runs}</p>
                  <p className="text-2xl font-extrabold text-dark-blue">{rwf(pkg.priceRwf)} RWF</p>
                  <p className="text-xs -mt-2">excluding VAT</p>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-lg p-6 space-y-4">
              <div>
                <h3 className="text-xl font-bold text-gray-800">Just need backup? Try our plug-and-play units</h3>
                <p className="text-sm">
                  Our Dream Series units are all-in-one and quick to set up.
                  They are fixed at purchase rather than expandable, which keeps
                  them simple and affordable.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {DREAM_SERIES.map((d) => (
                  <div key={d.name} className="space-y-1">
                    <p className="font-bold text-gray-800">{d.name}</p>
                    <p className="text-sm">{d.runs}</p>
                    <p className="font-extrabold text-dark-blue">
                      {rwf(d.priceRwf)} RWF <span className="text-xs font-normal text-[#637083]">excl. VAT</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-gray-800">
              Bigger house, or several air conditioners? Larger systems are
              available. Send us a recent electricity bill on{" "}
              <a href={SITE.whatsappUrl} target="_blank" rel="noopener noreferrer" className="underline">
                WhatsApp
              </a>{" "}
              and we will recommend the right size.
            </p>
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="bg-white">
        <div className={`${container} pb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center`}>
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
              src={wallInstall.src}
              alt="A hybrid inverter above its lithium battery, installed by SolarHope in a family home"
              loading="lazy"
              className="w-full max-w-md h-[460px] object-cover rounded-lg shadow-lg shadow-gray-500"
            />
          </div>
        </div>
      </section>

      {/* Equipment we trust */}
      <section className="bg-white text-gray-600">
        <div className={`${container} pb-20 space-y-10`}>
          <div className="max-w-3xl space-y-4 text-lg leading-relaxed">
            <p className={label}>Equipment we trust</p>
            <h2 className="text-3xl font-bold text-gray-800">Built with brands that last</h2>
            <p>
              We install inverters, batteries and panels from established
              manufacturers, so your system is backed twice: by the
              maker&rsquo;s warranty and by our own.
            </p>
          </div>
          <BrandMarquee />
        </div>
      </section>

      <QuoteSection id="quote" defaultSegment="home" />
    </HomeTemplates>
  );
}
