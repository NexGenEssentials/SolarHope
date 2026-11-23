import type { Metadata } from "next";
import HomeTemplates from "../components/templates/homeTemplates";
import { SITE } from "../config/site";

export const metadata: Metadata = {
  title: "Privacy Policy | SolarHope Africa",
  description:
    "How SolarHope Africa collects, uses and protects the personal data you share with us.",
  alternates: { canonical: "/privacy-policy" },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | SolarHope Africa",
    description:
      "How SolarHope Africa collects, uses and protects the personal data you share with us.",
    images: ["/og-image.png"],
  },
  openGraph: {
    title: "Privacy Policy | SolarHope Africa",
    url: "/privacy-policy",
    siteName: SITE.name,
    images: ["/og-image.png"],
    type: "website",
  },
};

const LAST_UPDATED = "21 November 2026";

const h2 = "text-2xl font-bold text-yellow pt-6";

export default function PrivacyPolicy() {
  return (
    <HomeTemplates>
      <article className="max-w-3xl mx-auto px-6 py-16 space-y-4 leading-relaxed text-[#E6E6E6]">
        <h1 className="text-4xl font-bold text-white">Privacy Policy</h1>
        <p className="text-sm text-[#BABABA]">Last updated: {LAST_UPDATED}</p>

        <p>
          This policy explains what personal data {SITE.legalName} (&ldquo;SolarHope
          Africa&rdquo;, &ldquo;we&rdquo;) collects through this website and when you
          contact us, why we collect it, and what you can ask us to do with it.
          We handle personal data in line with Rwanda&rsquo;s law on the
          protection of personal data and privacy (Law No. 058/2021).
        </p>

        <h2 className={h2}>Who we are</h2>
        <p>
          {SITE.legalName} is a solar installation company based in{" "}
          {SITE.location}. For anything in this policy, contact us at{" "}
          <a className="underline" href={`mailto:${SITE.email}`}>
            {SITE.email}
          </a>{" "}
          or {SITE.phoneDisplay}.
        </p>

        <h2 className={h2}>What we collect</h2>
        <p>When you request a quote on this website, we collect:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>your name;</li>
          <li>your business or organisation name, if you give one;</li>
          <li>your phone or WhatsApp number;</li>
          <li>what the system is for (business, school, health facility, home, EV charging at home or repair);</li>
          <li>your approximate monthly electricity bill, if you give it;</li>
          <li>your location.</li>
        </ul>
        <p>
          If you email us, call us or message us on WhatsApp, we also receive
          whatever you choose to send, such as electricity bills or photos of
          your site.
        </p>
        <p>
          This website does not use cookies, analytics or advertising
          trackers.
        </p>

        <h2 className={h2}>Why we use it</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>to contact you about your request and arrange a site assessment;</li>
          <li>to size a system and prepare your quote;</li>
          <li>if you become a client, to carry out the installation, warranty and aftercare.</li>
        </ul>
        <p>
          We use your data because you asked us to, and because it is needed to
          prepare and carry out an agreement with you. We do not use it for
          marketing unless you agree to that separately.
        </p>

        <h2 className={h2}>Who we share it with</h2>
        <p>
          We do not sell your personal data, and we do not publish it. Quote
          requests sent through this website pass through a form-delivery
          service that forwards them to our email inbox, and our email and
          messaging providers store our correspondence. These providers may
          store data on servers outside Rwanda. We share data with anyone else
          only when the law requires it.
        </p>
        <p>
          We never name a client, or show photos in which a client can be
          identified, without that client&rsquo;s written permission.
        </p>

        <h2 className={h2}>How long we keep it</h2>
        <p>
          If you request a quote and do not go ahead, we keep your details for
          up to two years and then delete them. If you become a client, we keep
          your details for as long as your warranty and aftercare run, and for
          as long as tax and accounting law requires us to keep records.
        </p>

        <h2 className={h2}>Your rights</h2>
        <p>You can ask us at any time to:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>tell you what personal data we hold about you and give you a copy;</li>
          <li>correct anything that is wrong;</li>
          <li>delete your data, where we are not required by law to keep it;</li>
          <li>stop using your data for a particular purpose.</li>
        </ul>
        <p>
          Email{" "}
          <a className="underline" href={`mailto:${SITE.email}`}>
            {SITE.email}
          </a>{" "}
          and we will respond as quickly as we can. If you are not satisfied
          with our answer, you can complain to Rwanda&rsquo;s data protection
          supervisory authority, the National Cyber Security Authority (NCSA).
        </p>

        <h2 className={h2}>Changes to this policy</h2>
        <p>
          If we change how we handle personal data, we will update this page
          and the date at the top.
        </p>
      </article>
    </HomeTemplates>
  );
}
