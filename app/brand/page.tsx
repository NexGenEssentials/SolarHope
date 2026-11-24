import type { Metadata } from "next";
import HomeTemplates from "../components/templates/homeTemplates";
import BrandLines from "../components/brand/brandLines";
import LogoBuild from "../components/brand/logoBuild";
import Reveal from "../components/brand/reveal";
import Swatches from "../components/brand/swatches";
import SunPattern from "../components/brand/sunPattern";
import FunFacts from "../components/brand/funFacts";
import { SITE } from "../config/site";

const TITLE = "Behind the S: our brand | SolarHope Africa";
const DESCRIPTION =
  "The SolarHope Africa identity: how our logo was made from a solar panel grid, our colours, our pattern, and the brand in use.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/brand" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: ["/og-image.png"] },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/brand",
    siteName: SITE.name,
    images: ["/og-image.png"],
    type: "website",
  },
};

const IDEAS = [
  {
    title: "Solar, without being literal",
    text: "Panel cells, rearranged into a letter. It says solar at a glance and still looks modern.",
  },
  {
    title: "Always moving forward",
    text: "Modular cells that lean forward: a shape that stands for innovation and progress.",
  },
  {
    title: "An S you remember",
    text: "The mark works on its own, on a hard hat, a badge or the corner of a roof.",
  },
];

// Brand applications from the designer's presentation. Captions say what each
// one is, so they are never mistaken for photos of installations.
const IN_USE = [
  { src: "/images/brand/billboard.jpg", alt: "SolarHope billboard design beside a road in Kigali", caption: "Billboard: hard to miss on the way to work." },
  { src: "/images/brand/polos.jpg", alt: "White SolarHope polo shirts with gold panel shapes", caption: "Team polos: so sharp the panels get jealous." },
  { src: "/images/brand/safety-vest.jpg", alt: "High-visibility safety vest with the SolarHope logo, front and back", caption: "Safety vest: visible from space. Probably." },
  { src: "/images/brand/hard-hat.jpg", alt: "White hard hat with the SolarHope logo", caption: "Hard hat: safety first, style a close second." },
  { src: "/images/brand/id-badge.jpg", alt: "SolarHope staff ID badge on a gold lanyard", caption: "ID badge: your name here. Literally." },
  { src: "/images/brand/brand-photo.jpg", alt: "SolarHope brand image: a technician in front of solar panels with the gold S", caption: "Campaign image: the S, larger than life." },
  { src: "/images/brand/bottles.jpg", alt: "White and black SolarHope water bottles", caption: "Bottles: hydration, not solar-powered (yet)." },
  { src: "/images/brand/tote-bag.jpg", alt: "Navy SolarHope tote bag with green straps", caption: "Tote bag: carries groceries, not a charge." },
];

const label = "text-yellow text-lg uppercase";
const container = "max-w-[1570px] mx-auto px-6 sm:px-20";

export default function BrandPage() {
  return (
    <HomeTemplates>
      {/* Hero */}
      <div className="relative isolate overflow-hidden">
        <BrandLines className="hidden md:block -left-64 -top-28 w-[560px] lg:w-[720px] opacity-60" />
        <div className="flex flex-col gap-6 w-11/12 lg:w-3/5 mx-auto py-16 items-center text-center">
          <h1 className="text-3xl sm:text-4xl bg-linear-to-r from-white to-yellow/80 bg-clip-text text-transparent font-bold">
            Behind the S
          </h1>
          <p className="text-[#BABABA] max-w-2xl">
            Our logo is built from the thing we install every day: the solar
            panel. Here is how it was made, the colours and pattern that go with
            it, and how it looks out in the world.
          </p>
        </div>
      </div>

      {/* Logo story */}
      <section className="bg-white">
        <div className={`${container} py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center`}>
          <div className="space-y-5 text-gray-600 leading-relaxed">
            <p className={label}>The logo</p>
            <h2 className="text-3xl font-bold text-gray-800">How a grid became an S</h2>
            <p className="text-lg">
              Take a grid of solar panel cells, light up the right ones, and an
              S appears: S for Solar, and for Hope.
            </p>
            <ul className="space-y-4 pt-2">
              {IDEAS.map((i) => (
                <li key={i.title}>
                  <p className="font-semibold text-gray-800">{i.title}</p>
                  <p>{i.text}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-center">
            <LogoBuild />
          </div>
        </div>
      </section>

      {/* Fun facts */}
      <section className="bg-white">
        <div className={`${container} pb-20 space-y-8`}>
          <p className={label}>Fun facts about the S</p>
          <FunFacts />
        </div>
      </section>

      {/* Logo versions and colours */}
      <section className="bg-white">
        <div className={`${container} pb-20 space-y-12`}>
          <img
            src="/images/brand/logo-versions.jpg"
            alt="The SolarHope logo and S mark on white and on dark backgrounds"
            loading="lazy"
            className="w-full h-auto rounded-lg border border-gray-100"
          />
          <div className="space-y-6">
            <p className={label}>Colours</p>
            <h2 className="text-3xl font-bold text-gray-800">Four colours. Zero beige.</h2>
            <Swatches />
          </div>
        </div>
      </section>

      {/* Pattern: be the sun */}
      <section className="relative isolate overflow-hidden bg-dark-blue">
        <SunPattern />
        <div className={`${container} py-28 text-center pointer-events-none`}>
          <p className="text-yellow text-lg uppercase">The pattern</p>
          <p className="mt-3 text-white text-2xl font-bold">Go on, be the sun.</p>
          <p className="mt-2 text-white/70 max-w-xl mx-auto">
            Move your mouse (or tap) across the panels and watch them light up.
            That is roughly what we do for a living.
          </p>
        </div>
      </section>

      {/* Brand in use */}
      <section className="bg-white">
        <div className={`${container} py-20 space-y-10`}>
          <div className="max-w-2xl space-y-4">
            <p className={label}>The brand in use</p>
            <h2 className="text-3xl font-bold text-gray-800">The S gets around</h2>
            <p className="text-gray-600 leading-relaxed">
              Designs for our team&rsquo;s kit, our signs and the things we hand
              out. Hover over them; they like the attention.
            </p>
          </div>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
            {IN_USE.map((m, i) => (
              <Reveal key={m.src} delay={(i % 3) * 120} className="mb-6 break-inside-avoid">
                <figure className="group space-y-2">
                  <img
                    src={m.src}
                    alt={m.alt}
                    loading="lazy"
                    className={`w-full h-auto rounded-lg transition-transform duration-300 ease-[cubic-bezier(.34,1.56,.64,1)] group-hover:-translate-y-1.5 group-hover:shadow-xl ${
                      i % 2 ? "group-hover:rotate-1" : "group-hover:-rotate-1"
                    }`}
                  />
                  <figcaption className="text-sm text-gray-500">{m.caption}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Logo requests */}
      <section className="bg-[#F2F4F7]">
        <div className={`${container} py-12 flex flex-col md:flex-row md:items-center justify-between gap-4`}>
          <p className="text-lg font-semibold text-gray-800">
            Want the S on your project, report or article?
          </p>
          <p className="text-gray-600">
            Email{" "}
            <a className="underline font-semibold text-gray-800" href={`mailto:${SITE.emails[0]}`}>
              {SITE.emails[0]}
            </a>{" "}
            or{" "}
            <a className="underline font-semibold text-gray-800" href={`mailto:${SITE.emails[1]}`}>
              {SITE.emails[1]}
            </a>
          </p>
        </div>
      </section>

      {/* Partner credit */}
      <section className="bg-white">
        <div className={`${container} py-12`}>
          <a
            href="https://250brands.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col sm:flex-row sm:items-center gap-6 rounded-xl border border-gray-200 p-6 sm:p-8 hover:border-yellow transition-colors"
          >
            <img
              src="/images/partners/250brands.png"
              alt="250Brands"
              loading="lazy"
              className="h-12 sm:h-14 w-auto self-start sm:self-center object-contain shrink-0"
            />
            <div className="space-y-1 sm:border-l sm:border-gray-200 sm:pl-6">
              <p className="text-xs uppercase tracking-wider text-gray-400">
                Brand, marketing and PR partners
              </p>
              <p className="text-gray-700">
                <span className="font-semibold text-gray-900">250Brands</span> has shaped our brand,
                marketing and PR since day one, from the S itself to everything on this page.
              </p>
              <p className="text-sm font-semibold text-gray-900 group-hover:text-yellow transition-colors">
                Visit 250Brands ↗
              </p>
            </div>
          </a>
        </div>
      </section>
    </HomeTemplates>
  );
}
