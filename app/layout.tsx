import type { Metadata } from "next";
import "./globals.css";
import { SITE } from "./config/site";

// schema.org LocalBusiness. Only facts we can stand behind: no opening
// hours, ratings or street address until they are confirmed.
const ORGANIZATION = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE.url}/#business`,
  name: SITE.name,
  legalName: SITE.legalName,
  url: SITE.url,
  logo: `${SITE.url}/icon-512.png`,
  image: `${SITE.url}/og-image.png`,
  description: SITE.description,
  slogan: SITE.tagline,
  telephone: "+250780348624",
  email: SITE.emails,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kigali",
    addressCountry: "RW",
  },
  areaServed: { "@type": "Country", name: "Rwanda" },
  sameAs: [SITE.social.facebook, SITE.social.instagram, SITE.social.linkedin],
  knowsAbout: [
    "Solar panel installation",
    "Hybrid solar systems",
    "Battery backup",
    "Solar repairs and maintenance",
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: SITE.title,
  description: SITE.description,
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: SITE.title,
    description: SITE.description,
    url: "/",
    siteName: SITE.name,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${SITE.name}: ${SITE.tagline}`,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased"
      >
        {/* Structured data: tells search engines who we are and how to reach us. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION) }}
        />
        {children}
      </body>
    </html>
  );
}
