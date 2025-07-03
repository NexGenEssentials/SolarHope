import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Solor hope",
  description:
    "Solor hope is a platform for sharing and discovering solar energy solutions.",
  openGraph: {
    title: "Solor hope",
    description:
      "Solor hope is a platform for sharing and discovering solar energy solutions.",
    url: "https://solorhope.com",
    siteName: "Solor hope",
    images: [
      {
        url: "https://solorhope.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Solor hope OG Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        {/* <link rel="icon" href="/favicon.png" type="image/png" /> */}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
