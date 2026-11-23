import type { Metadata } from "next";
import Link from "next/link";
import HomeTemplates from "../../components/templates/homeTemplates";
import BrandLines from "../../components/brand/brandLines";
import { SITE } from "../../config/site";
import inverterSingle from "@/public/images/projects/install-inverter-battery-single.jpg";

const TITLE = "Aftercare and warranty | SolarHope Africa";
const DESCRIPTION =
  "We do not disappear after switch-on. Warranty on panels, inverter, battery and our own installation work, remote monitoring, and support from the team that installed your system.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/solutions/aftercare" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: ["/og-image.png"] },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/solutions/aftercare",
    siteName: SITE.name,
    images: ["/og-image.png"],
    type: "website",
  },
};

// Standard warranty terms (CLAUDE.md §4).
const WARRANTY = [
  { years: 10, item: "Solar panels" },
  { years: 5, item: "Inverter" },
  { years: 5, item: "Battery" },
  { years: 2, item: "Our installation work" },
];

const CARE = [
  {
    title: "A proper handover",
    text: "When your system is switched on, we walk you and your staff through it: what the screens mean, what to do in a power cut, and who to call.",
  },
  {
    title: "Remote monitoring",
    text: "Once your system is running, we can watch how it is performing from our side, so problems can be spotted early rather than when the lights go out.",
  },
  {
    title: "The same team when you need us",
    text: "If something is not right, message us. The technicians who installed your system are the ones who come back to look at it.",
  },
  {
    title: "Room to grow",
    text: "Bought a new fridge, opened longer hours? Hope Series systems can be expanded, so we build on what you have instead of starting again.",
  },
];

const TIPS = [
  "Keep the panels clear of leaves and heavy dust. A gentle rinse with water is enough; never climb on them.",
  "Keep the inverter and battery somewhere dry, shaded and with air around them. Do not stack things on top.",
  "During a long power cut, run what matters and switch off what does not. The battery lasts longer.",
  "Glance at the inverter screen now and then. If it shows a warning you do not recognise, send us a photo.",
];

const label = "text-yellow text-lg uppercase";
const container = "max-w-[1570px] mx-auto px-6 sm:px-20";

export default function AftercarePage() {
  return (
    <HomeTemplates>
      {/* Hero */}
      <div className="relative isolate overflow-hidden">
        <BrandLines className="hidden md:block -right-64 -top-28 w-[560px] lg:w-[720px] opacity-50 rotate-180" />
        <div className="flex flex-col gap-8 w-11/12 lg:w-4/5 mx-auto py-16 items-center text-center">
          <h1 className="text-3xl sm:text-4xl bg-linear-to-r from-white to-yellow/80 bg-clip-text text-transparent font-bold">
            We do not disappear after switch-on.
          </h1>
          <p className="text-[#BABABA] max-w-2xl">
            Your system is covered by warranty, watched remotely, and looked
            after by the team that installed it, for years after the day it goes
            live.
          </p>
        </div>
      </div>

      {/* Warranty */}
      <section className="bg-white">
        <div className={`${container} py-20 space-y-10`}>
          <div className="max-w-3xl space-y-4">
            <p className={label}>Warranty</p>
            <h2 className="text-3xl font-bold text-gray-800">A warranty you can hold us to</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Every system comes with a warranty on the equipment and on our own
              work. The exact terms are written into your contract.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {WARRANTY.map((w) => (
              <div key={w.item} className="rounded-lg bg-[#F2F4F7] p-6 space-y-1">
                <p className="text-4xl sm:text-5xl font-extrabold text-dark-blue whitespace-nowrap">
                  {w.years}
                  <span className="text-xl sm:text-2xl font-bold text-gray-500"> years</span>
                </p>
                <p className="font-semibold text-gray-800">{w.item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How we look after you */}
      <section className="relative isolate overflow-hidden text-white bg-linear-to-b from-[#2C98F0] from-10% to-95% to-[#044376]">
        <BrandLines className="hidden md:block -right-48 -bottom-40 w-[560px] opacity-40" />
        <div className={`${container} py-20 space-y-12`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-4">
              <span className="w-fit border border-yellow rounded-full bg-yellow/10 px-8 py-1 text-yellow font-semibold">
                After installation
              </span>
              <h2 className="font-bold text-3xl">How we look after your system</h2>
            </div>
            <p className="self-end">
              A solar system is a long-term investment. Our job is to keep it
              doing what you paid for.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {CARE.map((c) => (
              <div key={c.title} className="p-6 bg-white/7 rounded space-y-4">
                <h3 className="text-xl font-bold leading-normal">{c.title}</h3>
                <p className="text-sm leading-relaxed">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Simple care tips */}
      <section className="bg-white">
        <div className={`${container} py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center`}>
          <div className="space-y-5 text-gray-600 leading-relaxed">
            <p className={label}>Your part</p>
            <h2 className="text-3xl font-bold text-gray-800">Four simple habits</h2>
            <p className="text-lg">
              Solar needs very little from you. These few habits keep it working
              at its best.
            </p>
            <ul className="space-y-3">
              {TIPS.map((t) => (
                <li key={t} className="flex gap-3">
                  <span className="text-yellow font-bold">✓</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-center">
            <img
              src={inverterSingle.src}
              alt="A hybrid inverter above its lithium battery, installed by SolarHope"
              loading="lazy"
              className="w-full max-w-sm h-auto rounded-lg shadow-lg shadow-gray-500"
            />
          </div>
        </div>
      </section>

      {/* Get help */}
      <section className="bg-dark-blue text-white">
        <div className={`${container} py-14 flex flex-col lg:flex-row lg:items-center justify-between gap-8`}>
          <div className="space-y-2 max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-bold">Something not right with your system?</h2>
            <p className="text-white/75">
              Send us a message with a photo of the inverter screen. It often
              tells us what is wrong before we arrive.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 font-bold">
            <a
              href={SITE.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow/80 text-dark-blue hover:bg-yellow px-5 py-3 text-sm rounded-md"
            >
              WhatsApp us
            </a>
            <a href={SITE.phoneHref} className="hover:text-yellow transition-colors">
              Call {SITE.phoneDisplay}
            </a>
          </div>
        </div>
        <div className={`${container} pb-12`}>
          <p className="text-sm text-white/60 border-t border-white/15 pt-6">
            System installed by someone else?{" "}
            <Link href="/solutions/repairs" className="underline text-white hover:text-yellow">
              See repairs and upgrades
            </Link>
            .
          </p>
        </div>
      </section>
    </HomeTemplates>
  );
}
