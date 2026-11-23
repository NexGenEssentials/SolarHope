import type { Metadata } from "next";
import HomeTemplates from "../components/templates/homeTemplates";
import BrandLines from "../components/brand/brandLines";
import { SITE } from "../config/site";

const TITLE = "Our brand | SolarHope Africa";
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

const COLOURS = [
  { name: "Solar Gold", hex: "#EA9D13", text: "text-dark-blue" },
  { name: "Hope Green", hex: "#71AA1F", text: "text-dark-blue" },
  { name: "Night Navy", hex: "#091928", text: "text-white" },
  { name: "Daylight Cream", hex: "#FFF5E6", text: "text-dark-blue" },
];

// Brand applications from the designer's presentation. Captions say what each
// one is, so they are never mistaken for photos of installations.
const IN_USE = [
  { src: "/images/brand/billboard.jpg", alt: "SolarHope billboard design beside a road in Kigali", caption: "Billboard" },
  { src: "/images/brand/polos.jpg", alt: "White SolarHope polo shirts with gold panel shapes", caption: "Team polo shirts" },
  { src: "/images/brand/safety-vest.jpg", alt: "High-visibility safety vest with the SolarHope logo, front and back", caption: "Site safety vest" },
  { src: "/images/brand/hard-hat.jpg", alt: "White hard hat with the SolarHope logo", caption: "Hard hat" },
  { src: "/images/brand/id-badge.jpg", alt: "SolarHope staff ID badge on a gold lanyard", caption: "Staff ID badge" },
  { src: "/images/brand/brand-photo.jpg", alt: "SolarHope brand image: a technician in front of solar panels with the gold S", caption: "Campaign image" },
  { src: "/images/brand/bottles.jpg", alt: "White and black SolarHope water bottles", caption: "Water bottles" },
  { src: "/images/brand/tote-bag.jpg", alt: "Navy SolarHope tote bag with green straps", caption: "Tote bag" },
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
            Our brand
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
            <h2 className="text-3xl font-bold text-gray-800">An S made of solar panels</h2>
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
            <img
              src="/images/brand/logo-concept.jpg"
              alt="Diagram: highlighted cells in a solar panel grid form the S of the SolarHope logo"
              className="w-full max-w-lg h-auto"
            />
          </div>
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {COLOURS.map((c) => (
                <div
                  key={c.hex}
                  className={`rounded-lg h-40 p-5 flex flex-col justify-end border border-gray-100 ${c.text}`}
                  style={{ backgroundColor: c.hex }}
                >
                  <p className="font-bold">{c.name}</p>
                  <p className="text-sm opacity-80">{c.hex}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pattern */}
      <section className="relative isolate overflow-hidden bg-dark-blue">
        <img
          src="/images/brand/pattern.svg"
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="absolute inset-0 -z-10 w-full h-full object-cover opacity-80"
        />
        <div className={`${container} py-28 text-center`}>
          <p className="text-yellow text-lg uppercase">The pattern</p>
          <p className="mt-3 text-white/80 max-w-xl mx-auto">
            The panel cell, repeated: the same shape as the logo, laid out like
            an array on a roof.
          </p>
        </div>
      </section>

      {/* Brand in use */}
      <section className="bg-white">
        <div className={`${container} py-20 space-y-10`}>
          <div className="max-w-2xl space-y-4">
            <p className={label}>The brand in use</p>
            <h2 className="text-3xl font-bold text-gray-800">From the roof to the road</h2>
            <p className="text-gray-600 leading-relaxed">
              Designs for our team&rsquo;s kit, our signage and the things we
              hand out.
            </p>
          </div>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
            {IN_USE.map((m) => (
              <figure key={m.src} className="mb-6 break-inside-avoid space-y-2">
                <img src={m.src} alt={m.alt} loading="lazy" className="w-full h-auto rounded-lg" />
                <figcaption className="text-sm text-gray-500">{m.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Logo requests */}
      <section className="bg-[#F2F4F7]">
        <div className={`${container} py-12 flex flex-col md:flex-row md:items-center justify-between gap-4`}>
          <p className="text-lg font-semibold text-gray-800">
            Need our logo for a project, a report or an article?
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
    </HomeTemplates>
  );
}
