import type { Metadata } from "next";
import HomeTemplates from "../../components/templates/homeTemplates";
import BrandLines from "../../components/brand/brandLines";
import QuoteSection from "../../components/quote/quoteSection";
import BrandMarquee from "../../components/brands/brandMarquee";
import { SITE } from "../../config/site";
import schoolCompound from "@/public/images/projects/school-compound.jpg";
import batteryBank from "@/public/images/projects/install-battery-bank.jpg";

const TITLE = "Solar for schools and health facilities in Rwanda | SolarHope Africa";
const DESCRIPTION =
  "Solar with battery backup for schools, clinics and health centres: evening study, computer labs, fridges and equipment that keep running through power cuts. Itemised quotes for funded and multi-site projects.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/solutions/institutions" },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.png"],
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/solutions/institutions",
    siteName: SITE.name,
    images: ["/og-image.png"],
    type: "website",
  },
};

const SCHOOL_USES = [
  "Lights for evening study and prep",
  "Computer labs that do not stop mid-lesson",
  "Dormitories and boarding facilities",
  "Security lighting around the compound",
  "Staff housing and offices",
];

const HEALTH_NEEDS = [
  {
    title: "Fridges that stay cold",
    text: "Vaccines and medicines cannot wait for the grid to come back. The fridges are connected to the battery, so they keep running through a cut.",
  },
  {
    title: "Equipment that keeps working",
    text: "Lights for night-time care, lab equipment and the devices your staff rely on, without waiting for a generator to start.",
  },
  {
    title: "The essentials come first",
    text: "We wire the critical equipment to the battery first, so it lasts longest. Your quote states how many hours it runs on battery alone.",
  },
];

const FUNDED = [
  "An itemised quote: every panel, the usable battery size and the backup hours, ready for your funding file",
  "One consistent design across several sites",
  "Training for the staff who will use the system",
  "Remote monitoring of every site once it is running",
];

const label = "text-yellow text-lg uppercase";
// One container so every section shares the same left and right edges.
const container = "max-w-[1570px] mx-auto px-6 sm:px-20";
const pill =
  "border border-white/40 rounded-full px-5 py-2 text-sm font-semibold hover:border-yellow hover:text-yellow transition-colors";

export default function InstitutionsPage() {
  return (
    <HomeTemplates>
      {/* Hero */}
      <div className="relative isolate overflow-hidden">
      <BrandLines className="hidden md:block -right-64 -top-28 w-[560px] lg:w-[720px] opacity-50 rotate-180" />
      <div className="flex flex-col gap-8 w-11/12 lg:w-4/5 mx-auto py-16 items-center text-center">
        <h1 className="text-3xl sm:text-4xl bg-linear-to-r from-white to-yellow/80 bg-clip-text text-transparent font-bold">
          Power for the places people depend on
        </h1>
        <p className="text-[#BABABA] max-w-2xl">
          Schools and health facilities cannot stop every time the grid goes
          off. We design solar systems that keep the essentials running, and
          spend less of your budget on electricity.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a href="#schools" className={pill}>Schools</a>
          <a href="#health" className={pill}>Health facilities</a>
          <a href="#funded" className={pill}>Funded projects</a>
        </div>
      </div>
      </div>

      {/* Schools */}
      <section id="schools" className="bg-white scroll-mt-24">
        <div className={`${container} py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center`}>
          <div className="space-y-5 text-gray-600 leading-relaxed">
            <p className={label}>Schools</p>
            <h2 className="text-3xl font-bold text-gray-800">
              Lessons and study that do not stop at dark
            </h2>
            <p className="text-lg">
              A power cut during evening prep or a computer lesson costs
              students time they do not get back. Solar keeps the lights and
              machines on, and the savings stay in your school budget.
            </p>
            <ul className="space-y-3">
              {SCHOOL_USES.map((u) => (
                <li key={u} className="flex gap-3">
                  <span className="text-yellow font-bold">✓</span>
                  <span>{u}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-center">
            <img
              src={schoolCompound.src}
              alt="The classroom blocks and courtyard of a secondary school powered by a SolarHope system"
              className="w-full max-w-xl h-auto rounded-lg shadow-lg shadow-gray-500"
            />
          </div>
        </div>
      </section>

      {/* Health facilities */}
      <section
        id="health"
        className="relative isolate overflow-hidden scroll-mt-24 text-white bg-linear-to-b from-[#2C98F0] from-10% to-95% to-[#044376]"
      >
        <BrandLines className="hidden md:block -right-48 -bottom-40 w-[560px] opacity-40" />
        <div className={`${container} py-20 space-y-12`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-4">
              <span className="w-fit border border-yellow rounded-full bg-yellow/10 px-8 py-1 text-yellow font-semibold">
                Health facilities
              </span>
              <h2 className="font-bold text-3xl">Care that cannot wait for the grid</h2>
            </div>
            <p className="self-end">
              Clinics and health centres have no room for outages. We plan your
              system around the equipment that must never go off.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {HEALTH_NEEDS.map((n) => (
              <div key={n.title} className="p-6 bg-white/7 rounded space-y-4">
                <h3 className="text-2xl font-bold leading-normal">{n.title}</h3>
                <p className="text-sm leading-relaxed">{n.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Funded and multi-site projects */}
      <section id="funded" className="bg-white scroll-mt-24">
        <div className={`${container} py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center`}>
          <div className="space-y-5 text-gray-600 leading-relaxed">
            <p className={label}>NGOs and funded projects</p>
            <h2 className="text-3xl font-bold text-gray-800">
              Working with a funder, or across several sites?
            </h2>
            <p className="text-lg">
              We install for NGOs and institutions whose projects are funded
              by grants or donors, often across more than one site. You get
              the detail your funder needs, and one team from design to
              handover.
            </p>
            <ul className="space-y-3">
              {FUNDED.map((f) => (
                <li key={f} className="flex gap-3">
                  <span className="text-yellow font-bold">✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-center">
            <img
              src={batteryBank.src}
              alt="A SolarHope installation: hybrid inverter, battery combiner box and two lithium batteries"
              className="w-full max-w-sm h-auto rounded-lg shadow-lg shadow-gray-500"
            />
          </div>
        </div>
      </section>

      {/* Equipment we trust */}
      <section className="bg-white">
        <div className={`${container} pb-16 space-y-6`}>
          <p className={label}>Equipment we trust</p>
          <BrandMarquee />
        </div>
      </section>

      <QuoteSection id="quote" defaultSegment="school" />
    </HomeTemplates>
  );
}
