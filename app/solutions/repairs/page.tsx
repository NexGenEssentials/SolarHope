import type { Metadata } from "next";
import HomeTemplates from "../../components/templates/homeTemplates";
import QuoteSection from "../../components/quote/quoteSection";
import { SITE } from "../../config/site";
import inspecting from "@/public/images/projects/technician-inspecting-inverter.jpg";
import wiringInverter from "@/public/images/projects/technician-wiring-inverter.jpg";

const TITLE = "Solar repairs and upgrades in Rwanda | SolarHope Africa";
const DESCRIPTION =
  "Solar system not working the way it should? We find out why and fix it properly, whoever installed it. Repairs, battery and panel upgrades, and automatic switching.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/solutions/repairs" },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.png"],
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/solutions/repairs",
    siteName: SITE.name,
    images: ["/og-image.png"],
    type: "website",
  },
};

const PROBLEMS = [
  {
    title: "The battery runs out too early",
    text: "It was meant to last the evening and it is empty by eight. The battery may be too small for what you run, worn out, or never as big as you were told.",
  },
  {
    title: "The power goes off and nothing takes over",
    text: "You still sit in the dark during cuts, or someone has to flip a switch. The changeover is often wired wrongly, or was never set up at all.",
  },
  {
    title: "Your bill has hardly come down",
    text: "Too few panels, panels in the shade, or settings that buy power from the grid when the sun could be doing the work.",
  },
  {
    title: "Tripping, alarms or warm cables",
    text: "Cables that are too thin, loose connections or missing protection. These are safety problems: switch the system off and call us.",
  },
];

const STEPS = [
  {
    title: "Tell us what is happening",
    text: "Send us a message on WhatsApp with photos of the inverter screen, the battery and the panels. It often tells us a lot before we visit.",
  },
  {
    title: "We inspect the whole system",
    text: "We test the panels, wiring, inverter and battery, and tell you plainly what is wrong. We confirm the cost of the visit before we come.",
  },
  {
    title: "You get a clear quote",
    text: "Repair, replace or upgrade: we explain each option and what it costs, so you decide what to do. No work starts without your go-ahead.",
  },
  {
    title: "We fix it and test it",
    text: "Our own technicians do the work, test everything before they leave, and show you how your system should now behave.",
  },
];

const UPGRADES = [
  "Add battery storage so you last longer through the evening and power cuts",
  "Add panels so you make more of your own power",
  "Change to automatic switching, so cuts no longer need anyone to flip a switch",
  "Add remote monitoring, so problems are spotted early",
];

const label = "text-amber-500 text-lg uppercase";
// One container so every section shares the same left and right edges.
const container = "max-w-[1570px] mx-auto px-6 sm:px-20";

export default function RepairsPage() {
  return (
    <HomeTemplates>
      {/* Hero */}
      <div className="flex flex-col gap-8 w-11/12 lg:w-4/5 mx-auto py-16 items-center text-center">
        <h1 className="text-3xl sm:text-4xl bg-linear-to-r from-white to-yellow/80 bg-clip-text text-transparent font-bold">
          Solar not working the way it should?
        </h1>
        <p className="text-[#BABABA] max-w-2xl">
          We repair and upgrade solar systems, including ones installed by
          someone else. We find out what is really wrong and fix it properly,
          so your system finally does what you paid for.
        </p>
      </div>

      {/* Common problems */}
      <section className="bg-white py-20">
        <div className={`${container} space-y-12`}>
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2 space-y-4">
              <p className={label}>Sound familiar?</p>
              <h2 className="text-3xl font-bold text-gray-800">
                The problems we fix most often
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Most failing systems are not broken beyond repair. They were
                sized too small, wired in a hurry or never set up properly.
                Once the real cause is found, they can usually be put right.
              </p>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img
                src={inspecting.src}
                alt="SolarHope technician inspecting an inverter installation"
                className="w-full max-w-md h-[380px] object-cover rounded-lg shadow-lg shadow-gray-500"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PROBLEMS.map((p) => (
              <div key={p.title} className="p-6 bg-[#F2F4F7] rounded-lg space-y-3">
                <h3 className="text-xl font-bold text-gray-800">{p.title}</h3>
                <p className="text-gray-600 leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How a repair works */}
      <section className="text-white bg-linear-to-b from-[#2C98F0] from-10% to-95% to-[#044376]">
        <div className={`${container} py-20 space-y-12`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-4">
              <span className="w-fit border border-yellow rounded-full bg-yellow/10 px-8 py-1 text-yellow font-semibold">
                How it works
              </span>
              <h2 className="font-bold text-3xl">From first message to fixed</h2>
            </div>
            <p className="self-end">
              You always know what is wrong and what it will cost before any
              work is done.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map((s, i) => (
              <div key={s.title} className="p-6 bg-white/7 rounded space-y-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow text-dark-blue font-extrabold">
                  {i + 1}
                </span>
                <h3 className="text-xl font-bold leading-normal">{s.title}</h3>
                <p className="text-sm leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upgrades */}
      <section className="bg-white">
        <div className={`${container} py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center`}>
          <div className="space-y-5 text-gray-600 leading-relaxed">
            <p className={label}>Upgrades</p>
            <h2 className="text-3xl font-bold text-gray-800">
              Already have solar? Make it do more.
            </h2>
            <p className="text-lg">
              Your needs grow: a new fridge, more staff, longer hours. Where
              your equipment allows, we build on what you already have instead
              of starting again.
            </p>
            <ul className="space-y-3">
              {UPGRADES.map((u) => (
                <li key={u} className="flex gap-3">
                  <span className="text-amber-500 font-bold">✓</span>
                  <span>{u}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-center">
            <img
              src={wiringInverter.src}
              alt="SolarHope technician wiring a hybrid inverter above its battery"
              className="w-full max-w-md h-[460px] object-cover rounded-lg shadow-lg shadow-gray-500"
            />
          </div>
        </div>
      </section>

      <QuoteSection id="quote" defaultSegment="repair" />
    </HomeTemplates>
  );
}
