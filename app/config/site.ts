// Single source for site-wide facts and switches. See /CLAUDE.md §1.

export const SITE = {
  url: "https://solarhopeafrica.com",
  name: "SolarHope Africa",
  legalName: "SolarHope Africa Ltd",
  slogan: "Solar Ni Sawa",
  sloganLine: "Switch to smarter energy today",
  tagline: "Light Up Dreams, The Solar Way",
  title: "SolarHope Africa | Solar systems for homes, businesses and institutions in Rwanda",
  description:
    "SolarHope Africa designs and installs solar systems across Rwanda for homes, businesses, schools, health facilities and large commercial sites. Hybrid systems with automatic changeover where there is grid, and stand-alone systems where there is none.",
  email: "info@solarhopeafrica.com",
  // Both addresses are always shown on the site (decided 24 Nov 2026).
  emails: ["info@solarhopeafrica.com", "solarhopeafrica@gmail.com"],
  phoneDisplay: "+250 780 348 624",
  phoneHref: "tel:+250780348624",
  whatsappUrl: "https://wa.me/250780348624",
  location: "Kigali, Rwanda",
  social: {
    facebook: "https://web.facebook.com/profile.php?id=61577751233011",
    instagram: "https://www.instagram.com/solarhopeafrica/",
    linkedin: "https://www.linkedin.com/company/solar-hope-africa/",
  },
} as const;

// Equipment manufacturers whose products SolarHope installs. Manufacturers
// only: never the distributor SolarHope buys through (CLAUDE.md §8). Add a
// `logo` path (e.g. "/images/brands/deye.svg") once official logo files are
// supplied; until then the name is shown as text. Logos are the official
// files from each manufacturer's own website.
export const EQUIPMENT_BRANDS: { name: string; logo?: string; stacked?: boolean }[] = [
  { name: "Felicity Solar", logo: "/images/brands/felicity-solar.png" },
  { name: "Deye", logo: "/images/brands/deye.svg" },
  { name: "SRNE", logo: "/images/brands/srne.png" },
  { name: "LVTOPSUN", logo: "/images/brands/lvtopsun.png", stacked: true },
  { name: "Dyness", logo: "/images/brands/dyness.svg" },
  { name: "Pheatech", logo: "/images/brands/pheatech.svg" },
];

// Phase 0.3 — the achievements counters stay off until the figures are worth
// publishing. Turning this on does nothing until every `total` in
// achievementSection.tsx is filled in with a real, checked number.
export const SHOW_ACHIEVEMENTS = false;

// Phase 0.6 — where quote requests go. See app/lib/quote/submitQuote.ts.
//   "web3forms": POST to Web3Forms, which emails the request to the address the
//                access key was created with (solarhopeafrica@gmail.com).
//   "mailto":    opens the visitor's mail app with the request filled in.
//   "crm":       reserved for the CRM endpoint once it exists.
// If "web3forms" is selected but no key is set, the adapter falls back to mailto.
export const QUOTE_TRANSPORT: "web3forms" | "mailto" | "crm" = "web3forms";

// Web3Forms access key. This is a public key by design (it only lets the site
// send messages to our inbox), so it lives here rather than in a secret.
// NEXT_PUBLIC_WEB3FORMS_KEY, if set at build time, overrides it.
export const WEB3FORMS_ACCESS_KEY = "5fd4bcc0-4890-4aa4-b4f3-6937366863e8";
