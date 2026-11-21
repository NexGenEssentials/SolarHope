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
import {
  BlockMark,
  DrainingBattery,
  Eyebrow,
  MotionRoot,
  Reveal,
  Stagger,
  StaggerItem,
} from "./_components/motion";
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

const STEPS = [
  "A site visit and a system designed around your business",
  "Installation by our own trained technicians",
  "Full testing before we switch you on",
  "A walk-through for you and your staff",
  "Remote monitoring of your system once it is running",
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

// Two-colour italic headline, as in SolarHope's marketing material.
function Headline({
  first,
  second,
  light = false,
  className = "",
}: {
  first: string;
  second: string;
  light?: boolean;
  className?: string;
}) {
  return (
    <h2 className={`font-extrabold italic leading-[1.05] tracking-tight text-4xl sm:text-5xl ${className}`}>
      <span className={`block ${light ? "text-white" : "text-dark-blue"}`}>{first}</span>
      <span className="block text-amber-500">{second}</span>
    </h2>
  );
}

// Stair-step offsets so the package grid rises left to right on large screens.
const STEP_OFFSET = ["lg:mt-16", "lg:mt-8", "lg:mt-0"];

export default function BusinessesPage() {
  return (
    <HomeTemplates>
      <MotionRoot>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div aria-hidden="true" className="pointer-events-none absolute -right-24 top-6 hidden md:flex items-end gap-4 opacity-[0.08] animate-[drift_14s_ease-in-out_infinite]">
            <span className="block w-40 h-24 bg-yellow -skew-x-12 rounded-xl" />
            <span className="block w-40 h-44 bg-yellow -skew-x-12 rounded-xl" />
            <span className="block w-40 h-64 bg-yellow -skew-x-12 rounded-xl" />
          </div>

          <div className="relative max-w-[1570px] mx-auto px-6 sm:px-20 pt-16 pb-24 grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
            <div className="space-y-8">
              <div className="animate-[rise_0.8s_cubic-bezier(0.22,1,0.36,1)_both]" style={{ animationDelay: "0s" }}>
                <Eyebrow light>Solar for businesses</Eyebrow>
              </div>
              <h1 className="font-extrabold italic leading-[0.95] tracking-tight text-5xl sm:text-7xl">
                <span className="block animate-[rise_0.8s_cubic-bezier(0.22,1,0.36,1)_both]" style={{ animationDelay: "0.1s" }}>
                  <span className="block text-white">Keep the lights on.</span>
                </span>
                <span className="block animate-[rise_0.8s_cubic-bezier(0.22,1,0.36,1)_both]" style={{ animationDelay: "0.25s" }}>
                  <span className="block text-yellow">Keep the costs down.</span>
                </span>
              </h1>
              <div className="animate-[rise_0.8s_cubic-bezier(0.22,1,0.36,1)_both]" style={{ animationDelay: "0.4s" }}>
                <p className="text-[#BABABA] text-lg max-w-xl">
                  Solar power for bars, restaurants, shops, offices and
                  factories across Rwanda. When the grid goes off, your
                  business stays open.
                </p>
              </div>
              <div className="animate-[rise_0.8s_cubic-bezier(0.22,1,0.36,1)_both]" style={{ animationDelay: "0.5s" }}>
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
              </div>
              <div className="animate-[rise_0.8s_cubic-bezier(0.22,1,0.36,1)_both]" style={{ animationDelay: "0.6s" }}>
                <p className="inline-flex items-center gap-3 rounded-full border border-yellow/40 bg-yellow/10 px-5 py-2 text-yellow font-semibold">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-yellow opacity-75 animate-ping" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-yellow" />
                  </span>
                  Packages from {rwf(LOWEST_PRICE_RWF)} RWF, excluding VAT
                </p>
              </div>
            </div>

            <div className="relative animate-[rise_0.8s_cubic-bezier(0.22,1,0.36,1)_both]" style={{ animationDelay: "0.3s" }}>
              <img
                src={teamInstalling.src}
                alt="Three SolarHope technicians installing a hybrid inverter and battery"
                className="w-full h-[460px] object-cover rounded-2xl shadow-2xl rotate-[1.5deg]"
              />
              <div className="absolute -bottom-6 -left-6 bg-yellow text-dark-blue rounded-xl px-6 py-4 shadow-xl -rotate-2">
                <p className="text-xs font-bold uppercase tracking-widest">Our own team</p>
                <p className="text-lg font-extrabold italic">Installed. Tested. Supported.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why businesses switch */}
        <section className="bg-white px-6 sm:px-20 py-24">
          <div className="max-w-[1570px] mx-auto space-y-14">
            <Reveal className="grid md:grid-cols-2 gap-8 items-end">
              <div className="space-y-5">
                <Eyebrow>Why businesses switch</Eyebrow>
                <Headline first="Your power should work" second="as hard as you do" />
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                Power cuts, generator fuel and rising bills all eat into what
                you earn. A solar system with battery backup takes care of all
                three, quietly, every day.
              </p>
            </Reveal>
            <Stagger className="grid md:grid-cols-3 gap-6">
              {REASONS.map((r, i) => (
                <StaggerItem key={r.title}>
                  <div className="group relative h-full overflow-hidden rounded-2xl bg-[#F2F4F7] p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
                    <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-yellow transition-transform duration-500 group-hover:scale-x-100" />
                    <p className="text-6xl font-extrabold italic text-transparent [-webkit-text-stroke:1.5px_#f59e0b] leading-none">
                      0{i + 1}
                    </p>
                    <h3 className="mt-6 text-xl font-bold text-gray-800">{r.title}</h3>
                    <p className="mt-3 text-gray-600 leading-relaxed">{r.text}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* Day timeline */}
        <section className="relative text-white bg-linear-to-b from-[#2C98F0] from-10% to-95% to-[#044376] px-6 sm:px-20 py-24 overflow-hidden">
          <div className="max-w-[1570px] mx-auto grid lg:grid-cols-[1fr_1.6fr] gap-12 items-center">
            <Reveal className="space-y-6">
              <Eyebrow light>Made to fit</Eyebrow>
              <Headline light first="Built around" second="the way you trade" />
              <p className="text-white/85 text-lg leading-relaxed">
                A bar and a shop can have the same bill and still need very
                different systems. We design yours around when you are busiest,
                not around a standard kit.
              </p>
              <p className="text-white/70 text-sm leading-relaxed border-l-2 border-yellow pl-4">
                Running a factory or a larger site? Bigger machines need a
                system built around them. We design yours after a site visit,
                so the equipment that must never stop is covered first.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <DayTimeline />
            </Reveal>
          </div>
        </section>

        {/* What you get */}
        <section className="bg-white px-6 sm:px-20 py-24">
          <div className="max-w-[1570px] mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <Reveal y={40} className="relative order-2 lg:order-1">
              <img
                src={withFinishedInstall.src}
                loading="lazy"
                alt="SolarHope technician beside a finished inverter and battery installation"
                className="w-full max-w-lg h-[520px] object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute -right-2 sm:right-8 -bottom-8 bg-dark-blue text-white rounded-2xl p-6 shadow-2xl w-64">
                <p className="text-xs uppercase tracking-widest text-yellow font-bold">Covered for years</p>
                <ul className="mt-3 space-y-1 text-sm">
                  <li className="flex justify-between"><span>Panels</span><strong>10 years</strong></li>
                  <li className="flex justify-between"><span>Inverter</span><strong>5 years</strong></li>
                  <li className="flex justify-between"><span>Battery</span><strong>5 years</strong></li>
                  <li className="flex justify-between"><span>Our workmanship</span><strong>2 years</strong></li>
                </ul>
              </div>
            </Reveal>
            <div className="order-1 lg:order-2 space-y-6 text-gray-600 leading-relaxed">
              <Reveal className="space-y-5">
                <Eyebrow>What you get</Eyebrow>
                <Headline first="One team, from first visit" second="to years of support" />
                <p className="text-lg">
                  Panels on your roof, a battery on your wall, and a system
                  that works alongside the grid. You stay connected, and when
                  the power goes off, the switch happens by itself.
                </p>
              </Reveal>
              <Stagger className="space-y-3">
                {STEPS.map((s, i) => (
                  <StaggerItem key={s}>
                    <div className="flex items-center gap-4 rounded-xl border border-gray-200 px-5 py-4 transition-colors hover:border-yellow hover:bg-yellow/5">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-dark-blue text-yellow font-extrabold italic -skew-x-6">
                        {i + 1}
                      </span>
                      <span className="text-gray-800 font-medium">{s}</span>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </div>
        </section>

        {/* Packages */}
        <section className="relative bg-[#0D1B39] text-white px-6 sm:px-20 py-24 overflow-hidden">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:repeating-linear-gradient(115deg,#FBBF24_0_2px,transparent_2px_46px)]" />
          <div className="relative max-w-[1570px] mx-auto space-y-14">
            <Reveal className="grid md:grid-cols-2 gap-8 items-end">
              <div className="space-y-5">
                <Eyebrow light>Packages</Eyebrow>
                <Headline light first="Start with what you need." second="Grow when you are ready." />
              </div>
              <p className="text-white/80 text-lg leading-relaxed">
                You do not need a big system on day one. Our Hope Series is
                built from separate panels, inverter and battery, so you can
                start small and add more as your business grows. Few installers
                in Rwanda publish their prices. We do.
              </p>
            </Reveal>

            <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
              {HOPE_SERIES.map((pkg, i) => (
                <StaggerItem key={pkg.name} className={STEP_OFFSET[i % 3]}>
                  <div className="group relative flex flex-col gap-4 rounded-2xl bg-white text-[#637083] p-7 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_60px_-20px_rgba(251,191,36,0.55)]">
                    <span className="absolute left-7 top-0 h-1.5 w-16 rounded-b bg-yellow transition-all duration-500 group-hover:w-[calc(100%-3.5rem)]" />
                    <div className="flex items-start justify-between">
                      <h3 className="text-2xl font-extrabold italic text-dark-blue">{pkg.name}</h3>
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-yellow/15 rounded-full px-3 py-1">
                        Step {i + 1}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-[3px]" aria-label={`${pkg.panels} solar panels`}>
                      {Array.from({ length: pkg.panels }).map((_, n) => (
                        <span key={n} className="h-3 w-2 rounded-[1px] bg-dark-blue/80 -skew-x-12" />
                      ))}
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-400">What it runs</p>
                      <p className="mt-1 text-sm leading-relaxed">{pkg.runs}</p>
                    </div>
                    <div className="mt-auto pt-4 border-t border-gray-100">
                      <p className="text-3xl font-extrabold text-dark-blue">
                        {rwf(pkg.priceRwf)} <span className="text-base font-bold">RWF</span>
                      </p>
                      <p className="text-xs">excluding VAT</p>
                      <p className="mt-2 text-sm text-gray-800">
                        Can pay for itself in about{" "}
                        <strong>{Math.round(paybackYears(pkg) * 2) / 2} years</strong>
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal>
              <div className="rounded-2xl border border-yellow/30 bg-white/5 p-8 space-y-6">
                <div>
                  <h3 className="text-2xl font-extrabold italic">
                    Just need backup? <span className="text-yellow">Go plug-and-play.</span>
                  </h3>
                  <p className="mt-2 text-white/75 max-w-2xl">
                    Our Dream Series units are all-in-one and quick to set up.
                    They are fixed at purchase rather than expandable, which
                    keeps them simple and affordable.
                  </p>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  {DREAM_SERIES.map((d) => (
                    <div key={d.name} className="rounded-xl bg-white/5 p-5 transition-colors hover:bg-white/10">
                      <p className="font-extrabold italic text-yellow">{d.name}</p>
                      <p className="mt-2 text-sm text-white/80">{d.runs}</p>
                      <p className="mt-3 text-xl font-extrabold">
                        {rwf(d.priceRwf)} RWF{" "}
                        <span className="text-xs font-normal text-white/60">excl. VAT</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <details className="text-sm text-white/70 max-w-2xl">
                <summary className="cursor-pointer text-white font-semibold">
                  How we estimate payback
                </summary>
                <p className="mt-2 leading-relaxed">
                  We work out how much power each Hope Series system makes on
                  an average day in Rwanda and what that power would cost to
                  buy from the grid. The payback assumes you use all of it. How
                  close you get depends on when your business uses power, so
                  your bill will drop but will not disappear. Your quote shows
                  the figures for your own business.
                </p>
              </details>
              <p className="text-white/90 max-w-md">
                Not sure which one fits? Send us a recent electricity bill on{" "}
                <a href={SITE.whatsappUrl} target="_blank" rel="noopener noreferrer" className="underline text-yellow">
                  WhatsApp
                </a>{" "}
                and we will recommend the right size. Need something bigger?
                We design larger systems to order.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Outages */}
        <section className="bg-white px-6 sm:px-20 py-24">
          <div className="max-w-[1570px] mx-auto space-y-12">
            <Reveal className="grid md:grid-cols-2 gap-8 items-end">
              <div className="space-y-5">
                <Eyebrow>When the power goes off</Eyebrow>
                <Headline first="How long will" second="you stay open?" />
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">
                It depends on what you keep running. That is why we never quote
                a headline number. Here is what two of our systems do at night.
              </p>
            </Reveal>
            <Stagger className="grid md:grid-cols-2 gap-6">
              {BACKUP.map((b) => (
                <StaggerItem key={b.who}>
                  <div className="h-full rounded-2xl bg-[#F2F4F7] p-8 space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{b.who}</h3>
                      <p className="text-gray-600">{b.running}</p>
                    </div>
                    <DrainingBattery hours={b.hours} />
                    <p className="text-sm font-semibold text-amber-600">on {b.system}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
            <Reveal>
              <p className="max-w-3xl text-gray-600">
                During the day the panels keep supplying you as well, so you
                last even longer. Your quote will tell you exactly how many
                hours your own equipment gets.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Our work */}
        <section className="bg-white px-6 sm:px-20 pb-24">
          <div className="max-w-[1570px] mx-auto grid md:grid-cols-2 gap-0 items-stretch rounded-3xl bg-dark-blue text-white overflow-hidden">
            <Reveal className="p-10 sm:p-14 space-y-5">
              <Eyebrow light>Our work</Eyebrow>
              <Headline light first="Trusted by businesses" second="in Kigali" />
              <p className="text-white/80 text-lg leading-relaxed">
                Our business clients include a manufacturer in Kimironko and a
                bar in Kicukiro. We respect our clients&rsquo; privacy, so we
                describe them here rather than name them.
              </p>
              <div className="pt-2">
                <BlockMark className="scale-150 origin-left" />
              </div>
            </Reveal>
            <Reveal delay={0.15} className="h-full min-h-[360px]">
              <img
                src={urbanRoof.src}
                loading="lazy"
                alt="Solar panels installed by SolarHope on a city rooftop"
                className="w-full h-full object-cover"
              />
            </Reveal>
          </div>
        </section>

        <QuoteSection id="quote" defaultSegment="business" />
      </MotionRoot>
    </HomeTemplates>
  );
}
