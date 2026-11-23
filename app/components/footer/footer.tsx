import Link from "next/link";
import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import Image from "next/image";
import logo from "@/public/images/logo/log2.png";
import { SITE } from "@/app/config/site";
import CurrentYear from "./currentYear";
import { BrandPattern } from "../brand/brandLines";

const exploreLinks = [
  { title: "Home", link: "/" },
  { title: "About Us", link: "/#about" },
  { title: "What We Do", link: "/#impact" },
  { title: "How We Work", link: "/#services" },
  { title: "For Businesses", link: "/solutions/businesses" },
  { title: "For Homes", link: "/solutions/homes" },
  { title: "Schools & Health", link: "/solutions/institutions" },
  { title: "Repairs & upgrades", link: "/solutions/repairs" },
  { title: "Our Brand", link: "/brand" },
  { title: "Get a quote", link: "/#quote" },
];

const followLinks = [
  { title: "Facebook", link: SITE.social.facebook, icon: <FaFacebookF /> },
  { title: "Instagram", link: SITE.social.instagram, icon: <FaInstagram /> },
  { title: "LinkedIn", link: SITE.social.linkedin, icon: <FaLinkedinIn /> },
];

const Footer = () => {
  return (
    <footer className="relative isolate overflow-hidden bg-[#0D1B39] text-white">
      <BrandPattern className="inset-0 w-full h-full opacity-40 [mask-image:linear-gradient(to_right,transparent_15%,black_45%,black_55%,transparent_85%)]" />
      <div className="max-w-[1570px] mx-auto px-6 sm:px-20 py-10 lg:py-12">
        <div className="flex flex-row w-full justify-between flex-wrap gap-8 border-b border-white/30 pb-8">
          <div className="space-y-2">
            <Link href="/" className="block">
              <div className="relative w-40 h-16 text-lg font-bold">
                <Image
                  src={logo}
                  fill
                  alt="SolarHope Africa home page"
                  className="object-contain w-full h-full"
                />
              </div>
            </Link>
            <p className="text-yellow italic font-semibold">{SITE.slogan}</p>
          </div>

          <div className=" hidden md:flex flex-1 items-start flex-wrap flex-row justify-between gap-10">
            {/* Explore */}
            <div className="flex-1">
              <h3 className="text-base font-semibold mb-3">Explore</h3>
              <div className="text-sm space-y-2">
                {exploreLinks.map(({ title, link }) => (
                  <Link
                    href={link}
                    key={title}
                    className="block hover:underline hover:text-hover-color"
                  >
                    {title}
                  </Link>
                ))}
              </div>
            </div>

            {/* Follow Us */}
            <div className="flex-1">
              <h3 className="text-base font-semibold mb-3">Follow Us</h3>
              <div className="text-sm space-y-2">
                {followLinks.map(({ title, link }) => (
                  <a
                    href={link}
                    key={title}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:underline hover:text-hover-color"
                  >
                    {title}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-base font-semibold mb-3">Contact Us</h3>
            <div className="text-sm space-y-2">
              {SITE.emails.map((e) => (
                <a key={e} href={`mailto:${e}`} className="block hover:underline">
                  {e}
                </a>
              ))}
              <a href={SITE.phoneHref} className="block hover:underline">
                Tel: {SITE.phoneDisplay}
              </a>
              <a
                href={SITE.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:underline"
              >
                WhatsApp: {SITE.phoneDisplay}
              </a>
              <p>{SITE.location}</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center text-sm gap-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p>
              © <CurrentYear /> {SITE.legalName}. All rights reserved.
            </p>
            <Link href="/privacy-policy" className="underline">
              Privacy Policy
            </Link>
          </div>
          <div className="flex items-center gap-4 text-white text-xl">
            {followLinks.map(({ title, link, icon }) => (
              <a
                key={title}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`SolarHope Africa on ${title}`}
                className="hover:text-yellow transition-colors"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
