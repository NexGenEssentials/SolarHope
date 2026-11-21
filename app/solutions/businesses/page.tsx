import type { Metadata } from "next";
import HomeTemplates from "../../components/templates/homeTemplates";
import Button from "../../components/button/button";
import QuoteSection from "../../components/quote/quoteSection";
import { SITE } from "../../config/site";
import {
  KWH_PER_PANEL_PER_DAY,
  RATE_RWF_PER_KWH,
  dailyKwh,
  monthlyValueRwf,
  packageByName,
  paybackYears,
  rwf,
  usableBatteryKwh,
} from "../../config/packages";
import teamInstalling from "@/public/images/projects/team-installing-inverter.jpg";
import urbanRoof from "@/public/images/projects/roof-urban-panels.jpg";
import withFinishedInstall from "@/public/images/projects/technician-with-finished-install.jpg";

export const metadata: Metadata = {
  title: "Solar for businesses in Rwanda | SolarHope Africa",
  description:
    "Cut your REG bill and keep trading through outages. Hybrid solar with battery for bars, restaurants, shops, offices, workshops and factories in Kigali and across Rwanda. Prices published, excluding VAT.",
  alternates: { canonical: "/solutions/businesses" },
  openGraph: {
    title: "Solar for businesses in Rwanda | SolarHope Africa",
    url: "/solutions/businesses",
    siteName: SITE.name,
    images: ["/og-image.png"],
    type: "website",
  },
};

// Packages shown on this page, smallest to largest.
const BUSINESS_PACKAGES = ["SHA Shine", "SHA Bright", "SHA Blaze", "SHA Peak"].map(
  packageByName,
);

// Backup examples. Hours are usable battery ÷ load, rounded down to allow for
// inverter losses. Usable = 90% of nominal (CLAUDE.md §4).
const shine = packageByName("SHA Shine");
const bright = packageByName("SHA Bright");
const BACKUP_EXAMPLES = [
  {
    who: "A shop after dark",
    load: "lights, two display fridges, the till and Wi-Fi",
    loadKw: 1,
    pkg: shine,
    hours: 8,
  },
  {
    who: "A bar in full swing",
    load: "lights, the sound system and three fridges",
    loadKw: 2,
    pkg: bright,
    hours: 6,
  },
];

const PROFILES = [
  {
    title: "Bars, restaurants and lounges",
    text: "Your busiest hours run from about 5 pm to 2 am, when the panels make nothing. The panels charge the battery through the quiet afternoon, and the battery carries the evening. For you, the size of the battery matters more than the number of panels.",
  },
  {
    title: "Shops, offices and workshops",
    text: "You trade in daylight, while the panels are producing, so most of their power is used as it is made. The battery covers closing time and keeps you open when REG drops during the day.",
  },
  {
    title: "Factories and larger sites",
    text: "Bigger machines and often a three-phase supply. We design these from your bills and a site visit rather than from a package, and size the system to the loads that cannot stop.",
  },
];

const WARRANTY = [
  ["Solar panels", "10 years"],
  ["Inverter", "5 years"],
  ["Battery", "5 years"],
  ["Our installation work", "2 years"],
];

const label = "text-amber-500 text-lg uppercase";

export default function BusinessesPage() {
  return (
    <HomeTemplates>
      {/* Hero */}
      <div className="flex flex-col gap-8 w-3/4 md:w-1/2 mx-auto py-16 items-center text-center">
        <h1 className="text-4xl bg-linear-to-r from-white to-yellow/80 bg-clip-text text-transparent font-bold">
          Solar for businesses
        </h1>
        <p className="text-[#BABABA]">
          Cut your REG bill and keep trading when the power goes. We install
          solar panels and a battery alongside your grid connection, and the
          system switches over on its own during an outage.
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

      {/* The problem */}
      <section className="px-4 py-16 bg-white">
        <div className="max-w-[1570px] mx-auto flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2 space-y-4 text-gray-600 text-lg leading-relaxed">
            <p className={label}>The problem</p>
            <h2 className="text-3xl font-bold text-gray-800">
              Two costs every business in Kigali knows
            </h2>
            <p>
              The first is the REG bill. Once every charge is added, business
              power comes to about {RATE_RWF_PER_KWH} RWF for each unit you
              use, and the bill grows with every fridge, light and machine you
              add.
            </p>
            <p>
              The second is the outage. When the grid drops, the music stops,
              the fridges start to warm up and customers leave. A generator
              helps, but you pay for fuel every hour it runs.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img
              src={teamInstalling.src}
              alt="Three SolarHope technicians installing a hybrid inverter and battery"
              className="w-full max-w-md h-[420px] object-cover rounded-lg shadow-lg shadow-gray-500"
            />
          </div>
        </div>
      </section>

      {/* Load profile */}
      <section className="text-white bg-linear-to-b from-[#2C98F0] from-10% to-95% to-[#044376]">
        <div className="max-w-[1570px] mx-auto p-8 sm:px-28 sm:py-28 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-4">
              <span className="w-fit border border-yellow rounded-full bg-yellow/10 px-8 py-1 text-yellow font-semibold">
                Why it differs
              </span>
              <h2 className="font-bold text-4xl">
                When you use power matters more than how much
              </h2>
            </div>
            <p className="self-end">
              Panels only produce during the day. So the right system for your
              business depends on when you are busy, and two businesses with
              the same bill can need quite different set-ups.
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

      {/* What we install */}
      <section className="bg-white text-dark-blue">
        <div className="max-w-[1570px] mx-auto p-8 sm:p-20 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p className={label}>What we install</p>
            <h2 className="text-3xl font-bold text-gray-800">
              Your grid connection stays. The outages stop mattering.
            </h2>
            <p>
              Solar panels on your roof, a hybrid inverter and a lithium
              battery, wired in alongside your REG connection. You stay on the
              grid. When REG goes off, the system switches over by itself and
              your lights and fridges keep running from the battery.
            </p>
            <p>Every job includes:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>a site visit, and a design based on your actual bills</li>
              <li>supply and installation by our own technicians</li>
              <li>testing before the system is switched on</li>
              <li>showing your staff how it works</li>
              <li>remote monitoring once it is running</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">Warranty</h3>
            <table className="w-full text-left text-gray-700">
              <tbody>
                {WARRANTY.map(([item, term]) => (
                  <tr key={item} className="border-b border-gray-200">
                    <td className="py-3">{item}</td>
                    <td className="py-3 font-semibold text-right">{term}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <img
              src={withFinishedInstall.src}
              alt="SolarHope technician beside a finished inverter and battery installation"
              className="w-full h-64 object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Costs and savings */}
      <section className="bg-white text-[#637083]">
        <div className="max-w-[1570px] mx-auto px-8 sm:px-20 pb-20">
          <div className="bg-[#F2F4F7] p-8 md:p-14 rounded-lg space-y-6">
            <p className={label}>Prices</p>
            <h2 className="text-3xl font-bold text-gray-800">
              What it costs and what it saves
            </h2>
            <p>
              These are our standard business systems. All prices exclude VAT.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead className="text-gray-800">
                  <tr className="border-b border-gray-300">
                    <th className="py-3 pr-4">System</th>
                    <th className="py-3 pr-4">Panels</th>
                    <th className="py-3 pr-4">Usable battery</th>
                    <th className="py-3 pr-4">Made on an average day</th>
                    <th className="py-3 pr-4">Worth per month*</th>
                    <th className="py-3 pr-4">Price (excl. VAT)</th>
                    <th className="py-3">Pays back in*</th>
                  </tr>
                </thead>
                <tbody>
                  {BUSINESS_PACKAGES.map((p) => (
                    <tr key={p.name} className="border-b border-gray-200">
                      <td className="py-3 pr-4 font-semibold text-gray-800">
                        {p.name}
                        {p.threePhase ? " (three-phase)" : ""}
                      </td>
                      <td className="py-3 pr-4">{p.panels}</td>
                      <td className="py-3 pr-4">
                        {usableBatteryKwh(p).toFixed(1)} kWh
                      </td>
                      <td className="py-3 pr-4">{dailyKwh(p).toFixed(1)} kWh</td>
                      <td className="py-3 pr-4">
                        {rwf(Math.round(monthlyValueRwf(p) / 1000) * 1000)} RWF
                      </td>
                      <td className="py-3 pr-4 font-semibold text-gray-800">
                        {rwf(p.priceRwf)} RWF
                      </td>
                      <td className="py-3">
                        about {paybackYears(p).toFixed(1)} years
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="text-sm space-y-2">
              <p>
                * <strong>How we worked it out.</strong> Each panel makes about{" "}
                {KWH_PER_PANEL_PER_DAY} kWh on an average day here (a 445-watt
                panel, 4 hours of full sun, 80% system efficiency). &ldquo;Worth
                per month&rdquo; is that output over 30 days at{" "}
                {RATE_RWF_PER_KWH} RWF a unit, which is what the same power
                would cost you from REG. Payback is the price divided by a
                year of that.
              </p>
              <p>
                Both figures assume you use everything the panels make. Power
                you can neither use nor store saves nothing, so a business that
                does most of its trade after dark will save less unless the
                battery is big enough. Your REG bill goes down, but it does not
                go to zero.
              </p>
            </div>
            <p className="text-gray-800">
              Not sure which size you need? Send us a recent REG bill on{" "}
              <a
                href={SITE.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                WhatsApp
              </a>{" "}
              and we will size it for you. Bigger site than this? We design
              larger systems from your bills and a site visit.
            </p>
          </div>
        </div>
      </section>

      {/* Outages */}
      <section className="bg-white text-gray-600">
        <div className="max-w-[1570px] mx-auto px-8 sm:px-20 pb-20 space-y-8">
          <div className="max-w-3xl space-y-4">
            <p className={label}>During an outage</p>
            <h2 className="text-3xl font-bold text-gray-800">
              How long will it keep you going?
            </h2>
            <p className="text-lg leading-relaxed">
              It depends on what you leave running, so we give backup in hours
              at a load you can picture, never as a single headline number.
              Two examples at night, with the panels making nothing:
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {BACKUP_EXAMPLES.map((ex) => (
              <div
                key={ex.who}
                className="p-8 rounded-lg border-2 border-yellow/60 space-y-3"
              >
                <h3 className="text-xl font-bold text-gray-800">{ex.who}</h3>
                <p>
                  Running {ex.load}, on {ex.pkg.name}:
                </p>
                <p className="text-4xl font-extrabold text-dark-blue">
                  about {ex.hours} hours
                </p>
                <p className="text-sm">
                  That load is about {ex.loadKw} kW. The battery holds{" "}
                  {usableBatteryKwh(ex.pkg).toFixed(1)} kWh you can use, so{" "}
                  {usableBatteryKwh(ex.pkg).toFixed(1)} ÷ {ex.loadKw} ={" "}
                  {(usableBatteryKwh(ex.pkg) / ex.loadKw).toFixed(1)} hours,
                  less a little lost in the inverter.
                </p>
              </div>
            ))}
          </div>
          <p className="max-w-3xl">
            If the grid goes off during the day, the panels keep supplying you
            too, so you last longer. Your own quote will show the hours at
            your real load.
          </p>
        </div>
      </section>

      {/* Our work */}
      <section className="bg-white text-gray-600">
        <div className="max-w-[1570px] mx-auto px-8 sm:px-20 pb-20 flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2 space-y-4 text-lg leading-relaxed">
            <p className={label}>Our work</p>
            <h2 className="text-3xl font-bold text-gray-800">
              Businesses we have worked with
            </h2>
            <p>
              Our business clients include a manufacturer in Kimironko and a
              bar in Kicukiro. We do not name clients without their written
              permission, so you will see them described rather than named.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img
              src={urbanRoof.src}
              alt="Solar panels installed by SolarHope on a steep city rooftop"
              className="w-full max-w-md h-[360px] object-cover rounded-lg shadow-lg shadow-gray-500"
            />
          </div>
        </div>
      </section>

      <QuoteSection id="quote" defaultSegment="business" />
    </HomeTemplates>
  );
}
