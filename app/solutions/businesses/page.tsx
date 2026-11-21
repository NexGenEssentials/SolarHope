import type { Metadata } from "next";
import HomeTemplates from "../../components/templates/homeTemplates";
import Button from "../../components/button/button";
import QuoteSection from "../../components/quote/quoteSection";
import { SITE } from "../../config/site";
import { LOWEST_PRICE_RWF, rwf } from "../../config/packages";
import { DrainingBattery, Eyebrow, MotionRoot, Reveal } from "./_components/motion";
import { DayStory, ParallaxHero, ParallaxImage, WordReveal } from "./_components/scroll";
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

const STEPS = [
  "A site visit and a system designed around your business",
  "Installation by our own trained technicians",
  "Full testing before we switch you on",
  "A walk-through for you and your staff",
  "Remote monitoring once it is running",
];

const BACKUP = [
  { who: "A small shop after dark", running: "Lights, two display fridges, the till and Wi-Fi", system: "SHA Shine", hours: 8 },
  { who: "A busy bar at night", running: "Lights, the sound system and three fridges", system: "SHA Bright", hours: 6 },
];

const STATEMENT =
  "Power cuts cost you customers. Generators cost you fuel, noise and fumes. Bills keep climbing. Solar with a battery quietly fixes all three.";

export default function BusinessesPage() {
  return (
    <HomeTemplates>
      <MotionRoot>
        {/* 1. Parallax hero */}
        <ParallaxHero
          image={teamInstalling.src}
          alt="Three SolarHope technicians installing a hybrid inverter and battery"
        >
          <div className="max-w-3xl space-y-7 animate-[rise_0.9s_cubic-bezier(0.22,1,0.36,1)_both]">
            <Eyebrow light>Solar for businesses</Eyebrow>
            <h1 className="text-[2.6rem] sm:text-7xl font-bold italic leading-[1.02] tracking-tight">
              <span className="block text-white">Keep the lights on.</span>
              <span className="block text-yellow">Keep the costs down.</span>
            </h1>
            <p className="text-white/75 text-lg max-w-xl">
              Solar power for bars, restaurants, shops, offices and factories
              across Rwanda. When the grid goes off, you stay open.
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
        </ParallaxHero>

        <div className="bg-white">
          {/* 2. Statement, lit word by word */}
          <section className="max-w-5xl mx-auto px-6 sm:px-10 py-32 sm:py-44">
            <WordReveal text={STATEMENT} accentFrom={STATEMENT.split(" ").length - 6} />
          </section>
        </div>

        {/* 3. One day, told by scrolling */}
        <DayStory />

        <div className="bg-white">
          {/* 4. One team */}
          <section className="max-w-6xl mx-auto px-6 sm:px-10 py-28 grid lg:grid-cols-2 gap-16 items-center">
            <ParallaxImage
              src={withFinishedInstall.src}
              alt="SolarHope technician beside a finished inverter and battery installation"
              className="h-[520px] rounded-lg"
            />
            <div className="space-y-8">
              <Reveal className="space-y-5">
                <Eyebrow>What you get</Eyebrow>
                <h2 className="text-3xl sm:text-4xl font-bold italic leading-tight tracking-tight">
                  <span className="block text-dark-blue">One team, from first visit</span>
                  <span className="block text-amber-500">to years of support.</span>
                </h2>
              </Reveal>
              <div role="list">
                {STEPS.map((s, i) => (
                  <Reveal key={s} delay={i * 0.07}>
                    <div role="listitem" className="flex gap-5 border-t border-gray-100 py-4">
                      <span className="text-sm text-amber-500 font-semibold w-5">{i + 1}</span>
                      <span className="text-gray-700">{s}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
              <Reveal>
                <p className="text-sm text-gray-500">
                  Panels guaranteed for 10 years, inverter and battery for 5,
                  our workmanship for 2.
                </p>
              </Reveal>
            </div>
          </section>

          {/* 5. Backup */}
          <section className="border-t border-gray-100">
            <div className="max-w-6xl mx-auto px-6 sm:px-10 py-28 space-y-14">
              <Reveal className="max-w-2xl space-y-5">
                <Eyebrow>When the power goes off</Eyebrow>
                <h2 className="text-3xl sm:text-4xl font-bold italic leading-tight tracking-tight">
                  <span className="block text-dark-blue">How long will</span>
                  <span className="block text-amber-500">you stay open?</span>
                </h2>
                <p className="text-gray-600">
                  It depends on what you keep running, so we never quote a
                  headline number. Two examples at night:
                </p>
              </Reveal>
              <div className="grid md:grid-cols-2 gap-12">
                {BACKUP.map((b, i) => (
                  <Reveal key={b.who} delay={i * 0.1} className="border-t border-gray-200 pt-6 space-y-5">
                    <div>
                      <h3 className="text-lg font-semibold text-dark-blue">{b.who}</h3>
                      <p className="text-gray-500">{b.running}</p>
                    </div>
                    <DrainingBattery hours={b.hours} />
                    <p className="text-sm text-gray-400">on {b.system}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* 6. Our work, full-bleed parallax */}
        <section className="relative">
          <ParallaxImage
            src={urbanRoof.src}
            alt="Solar panels installed by SolarHope on a city rooftop"
            className="h-[80vh] min-h-[520px]"
            strength={18}
          />
          <div className="absolute inset-0 bg-linear-to-t from-dark-blue via-dark-blue/50 to-transparent" />
          <div className="absolute inset-x-0 bottom-0">
            <div className="max-w-6xl mx-auto px-6 sm:px-10 pb-16">
            <Reveal className="max-w-2xl space-y-5">
              <Eyebrow light>Our work</Eyebrow>
              <h2 className="text-3xl sm:text-5xl font-bold italic leading-tight tracking-tight">
                <span className="block text-white">Trusted by businesses</span>
                <span className="block text-yellow">in Kigali.</span>
              </h2>
              <p className="text-white/75">
                Our business clients include a manufacturer in Kimironko and a
                bar in Kicukiro. We respect our clients&rsquo; privacy, so we
                describe them rather than name them.
              </p>
            </Reveal>
            </div>
          </div>
        </section>

        <QuoteSection id="quote" defaultSegment="business" />
      </MotionRoot>
    </HomeTemplates>
  );
}
