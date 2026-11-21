import type { Metadata } from "next";
import HomeTemplates from "../../components/templates/homeTemplates";
import Button from "../../components/button/button";
import QuoteSection from "../../components/quote/quoteSection";
import { SITE } from "../../config/site";
import {
  DREAM_SERIES,
  HOPE_SERIES,
  LOWEST_PRICE_RWF,
  paybackYears,
  rwf,
} from "../../config/packages";
import { DrainingBattery, Eyebrow, MotionRoot, Reveal } from "./_components/motion";
import DayTimeline from "./_components/dayTimeline";
import teamInstalling from "@/public/images/projects/team-installing-inverter.jpg";
import urbanRoof from "@/public/images/projects/roof-urban-panels.jpg";
import withFinishedInstall from "@/public/images/projects/technician-with-finished-install.jpg";

export const metadata: Metadata = {
  title: "Solar for businesses in Rwanda | SolarHope Africa",
  description:
    "Stay open through power cuts, spend less on electricity and leave the generator behind. Solar with battery backup for bars, restaurants, shops, offices and factories across Rwanda.",
  alternates: { canonical: "/solutions/businesses" },
  openGraph: {
    title: "Solar for businesses in Rwanda | SolarHope Africa",
    url: "/solutions/businesses",
    siteName: SITE.name,
    images: ["/og-image.png"],
    type: "website",
  },
};

const REASONS = [
  {
    title: "Power cuts cost you customers",
    text: "When the lights go out, sales stop. With solar and a battery, your business switches over automatically and carries on.",
  },
  {
    title: "Generators are an expensive fix",
    text: "Fuel every time the power goes, servicing, noise and fumes. Solar runs silently and needs no fuel at all.",
  },
  {
    title: "Electricity bills keep growing",
    text: "With panels on your roof, you make much of your own power and buy far less of it.",
  },
];

const STEPS = [
  "A site visit and a system designed around your business",
  "Installation by our own trained technicians",
  "Full testing before we switch you on",
  "A walk-through for you and your staff",
  "Remote monitoring of your system once it is running",
];

const WARRANTY = [
  ["10 years", "Panels"],
  ["5 years", "Inverter"],
  ["5 years", "Battery"],
  ["2 years", "Our workmanship"],
];

const BACKUP = [
  {
    who: "A small shop after dark",
    running: "Lights, two display fridges, the till and Wi-Fi",
    system: "SHA Shine",
    hours: 8,
  },
  {
    who: "A busy bar at night",
    running: "Lights, the sound system and three fridges",
    system: "SHA Bright",
    hours: 6,
  },
];

function Headline({ first, second, light = false }: { first: string; second: string; light?: boolean }) {
  return (
    <h2 className="text-3xl sm:text-4xl font-bold italic leading-tight tracking-tight">
      <span className={`block ${light ? "text-white" : "text-dark-blue"}`}>{first}</span>
      <span className="block text-amber-500">{second}</span>
    </h2>
  );
}

const section = "max-w-6xl mx-auto px-6 sm:px-10";

export default function BusinessesPage() {
  return (
    <HomeTemplates>
      <MotionRoot>
        {/* Hero */}
        <section className={`${section} pt-16 pb-24 grid lg:grid-cols-2 gap-14 items-center`}>
          <div className="space-y-7 animate-[rise_0.8s_cubic-bezier(0.22,1,0.36,1)_both]">
            <Eyebrow light>Solar for businesses</Eyebrow>
            <h1 className="text-4xl sm:text-5xl font-bold italic leading-[1.05] tracking-tight">
              <span className="block text-white">Keep the lights on.</span>
              <span className="block text-yellow">Keep the costs down.</span>
            </h1>
            <p className="text-[#BABABA] text-lg max-w-md">
              Solar power for bars, restaurants, shops, offices and factories
              across Rwanda. When the grid goes off, your business stays open.
            </p>
            <div className="flex flex-wrap items-center gap-8 font-bold">
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
            <p className="text-sm text-white/50">
              Packages from {rwf(LOWEST_PRICE_RWF)} RWF, excluding VAT
            </p>
          </div>
          <img
            src={teamInstalling.src}
            alt="Three SolarHope technicians installing a hybrid inverter and battery"
            className="w-full h-[440px] object-cover rounded-lg animate-[rise_0.8s_cubic-bezier(0.22,1,0.36,1)_both] [animation-delay:0.15s]"
          />
        </section>

        <div className="bg-white">
          {/* Why businesses switch */}
          <section className={`${section} py-24 space-y-14`}>
            <Reveal className="max-w-2xl space-y-5">
              <Eyebrow>Why businesses switch</Eyebrow>
              <Headline first="Your power should work" second="as hard as you do" />
            </Reveal>
            <div className="grid md:grid-cols-3 gap-10">
              {REASONS.map((r, i) => (
                <Reveal key={r.title} delay={i * 0.08} className="border-t border-gray-200 pt-6 space-y-3">
                  <p className="text-sm text-gray-400">0{i + 1}</p>
                  <h3 className="text-lg font-semibold text-dark-blue">{r.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{r.text}</p>
                </Reveal>
              ))}
            </div>
          </section>

          {/* Made to fit */}
          <section className="border-t border-gray-100">
            <div className={`${section} py-24 grid lg:grid-cols-[1fr_1.5fr] gap-14 items-start`}>
              <Reveal className="space-y-5">
                <Eyebrow>Made to fit</Eyebrow>
                <Headline first="Built around" second="the way you trade" />
                <p className="text-gray-600 leading-relaxed">
                  A bar and a shop can have the same bill and still need very
                  different systems. We design yours around when you are busiest.
                </p>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Factory or larger site? We design it after a site visit, so
                  the equipment that must never stop is covered first.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <DayTimeline />
              </Reveal>
            </div>
          </section>

          {/* What you get */}
          <section className="border-t border-gray-100">
            <div className={`${section} py-24 grid lg:grid-cols-2 gap-14 items-center`}>
              <Reveal>
                <img
                  src={withFinishedInstall.src}
                  loading="lazy"
                  alt="SolarHope technician beside a finished inverter and battery installation"
                  className="w-full h-[480px] object-cover rounded-lg"
                />
              </Reveal>
              <Reveal delay={0.1} className="space-y-8">
                <div className="space-y-5">
                  <Eyebrow>What you get</Eyebrow>
                  <Headline first="One team, from first visit" second="to years of support" />
                  <p className="text-gray-600 leading-relaxed">
                    Panels on your roof and a battery on your wall, working
                    alongside the grid. When the power goes off, the switch
                    happens by itself.
                  </p>
                </div>
                <ul className="divide-y divide-gray-100 border-y border-gray-100">
                  {STEPS.map((s) => (
                    <li key={s} className="py-3 text-gray-700">{s}</li>
                  ))}
                </ul>
                <dl className="grid grid-cols-4 gap-4">
                  {WARRANTY.map(([term, item]) => (
                    <div key={item}>
                      <dt className="text-xl font-bold text-dark-blue">{term}</dt>
                      <dd className="text-xs text-gray-500 mt-1">{item}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>
          </section>

          {/* Packages */}
          <section className="border-t border-gray-100 bg-[#FAFAFA]">
            <div className={`${section} py-24 space-y-14`}>
              <Reveal className="grid md:grid-cols-2 gap-8 items-end">
                <div className="space-y-5">
                  <Eyebrow>Packages</Eyebrow>
                  <Headline first="Start with what you need." second="Grow when you are ready." />
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Our Hope Series is built from separate panels, inverter and
                  battery, so you can start small and add more as your business
                  grows. All prices exclude VAT.
                </p>
              </Reveal>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200 border border-gray-200 rounded-lg overflow-hidden">
                {HOPE_SERIES.map((pkg, i) => (
                  <Reveal
                    key={pkg.name}
                    delay={(i % 3) * 0.06}
                    className="bg-white p-7 flex flex-col gap-4 transition-colors hover:bg-yellow/5"
                  >
                    <h3 className="text-xl font-bold italic text-dark-blue">{pkg.name}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed flex-1">{pkg.runs}</p>
                    <div>
                      <p className="text-2xl font-bold text-dark-blue">
                        {rwf(pkg.priceRwf)} <span className="text-sm font-medium text-gray-400">RWF</span>
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Pays for itself in about {Math.round(paybackYears(pkg) * 2) / 2} years
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-dark-blue">Just need backup?</h3>
                  <p className="text-gray-600">
                    Our Dream Series plug-and-play units are all-in-one and
                    quick to set up. They are fixed at purchase, not expandable.
                  </p>
                </div>
                <div className="grid md:grid-cols-3 gap-10">
                  {DREAM_SERIES.map((d) => (
                    <div key={d.name} className="border-t border-gray-200 pt-4 space-y-1">
                      <p className="font-semibold italic text-dark-blue">{d.name}</p>
                      <p className="text-sm text-gray-500">{d.runs}</p>
                      <p className="font-bold text-dark-blue pt-1">{rwf(d.priceRwf)} RWF</p>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal className="grid md:grid-cols-2 gap-8 text-sm text-gray-500">
                <details>
                  <summary className="cursor-pointer text-gray-700 font-medium">
                    How we estimate payback
                  </summary>
                  <p className="mt-2 leading-relaxed">
                    We work out how much power each Hope Series system makes on
                    an average day in Rwanda and what that power would cost from
                    the grid, assuming you use all of it. Your bill will drop
                    but will not disappear. Your quote shows the figures for
                    your own business.
                  </p>
                </details>
                <p>
                  Not sure which one fits? Send us a recent electricity bill on{" "}
                  <a href={SITE.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-dark-blue underline">
                    WhatsApp
                  </a>{" "}
                  and we will recommend the right size. Larger systems are
                  designed to order.
                </p>
              </Reveal>
            </div>
          </section>

          {/* Outages */}
          <section className="border-t border-gray-100">
            <div className={`${section} py-24 space-y-12`}>
              <Reveal className="max-w-2xl space-y-5">
                <Eyebrow>When the power goes off</Eyebrow>
                <Headline first="How long will" second="you stay open?" />
                <p className="text-gray-600 leading-relaxed">
                  It depends on what you keep running, so we never quote a
                  headline number. Two examples at night:
                </p>
              </Reveal>
              <div className="grid md:grid-cols-2 gap-10">
                {BACKUP.map((b, i) => (
                  <Reveal key={b.who} delay={i * 0.08} className="border-t border-gray-200 pt-6 space-y-5">
                    <div>
                      <h3 className="text-lg font-semibold text-dark-blue">{b.who}</h3>
                      <p className="text-gray-500">{b.running}</p>
                    </div>
                    <DrainingBattery hours={b.hours} />
                    <p className="text-sm text-gray-400">on {b.system}</p>
                  </Reveal>
                ))}
              </div>
              <Reveal>
                <p className="text-gray-500 max-w-2xl">
                  In the daytime the panels keep supplying you too, so you last
                  longer. Your quote shows the hours for your own equipment.
                </p>
              </Reveal>
            </div>
          </section>

          {/* Our work */}
          <section className="border-t border-gray-100">
            <div className={`${section} py-24 grid lg:grid-cols-2 gap-14 items-center`}>
              <Reveal className="space-y-5">
                <Eyebrow>Our work</Eyebrow>
                <Headline first="Trusted by businesses" second="in Kigali" />
                <p className="text-gray-600 leading-relaxed">
                  Our business clients include a manufacturer in Kimironko and
                  a bar in Kicukiro. We respect our clients&rsquo; privacy, so
                  we describe them rather than name them.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <img
                  src={urbanRoof.src}
                  loading="lazy"
                  alt="Solar panels installed by SolarHope on a city rooftop"
                  className="w-full h-[380px] object-cover rounded-lg"
                />
              </Reveal>
            </div>
          </section>
        </div>

        <QuoteSection id="quote" defaultSegment="business" />
      </MotionRoot>
    </HomeTemplates>
  );
}
