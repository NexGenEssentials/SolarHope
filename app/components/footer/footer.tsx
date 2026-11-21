import Link from "next/link";
import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import Image from "next/image";
import logo from "@/public/images/logo/log2.png";
import { SITE } from "@/app/config/site";
import CurrentYear from "./currentYear";

const exploreLinks = [
  { title: "Home", link: "/" },
  { title: "About Us", link: "/#about" },
  { title: "What We Do", link: "/#impact" },
  { title: "Services", link: "/#services" },
  { title: "Get a quote", link: "/#quote" },
];

const followLinks = [
  { title: "Facebook", link: SITE.social.facebook, icon: <FaFacebookF /> },
  { title: "Instagram", link: SITE.social.instagram, icon: <FaInstagram /> },
  { title: "LinkedIn", link: SITE.social.linkedin, icon: <FaLinkedinIn /> },
];

const Footer = () => {
  return (
    <footer className="bg-[#0D1B39] text-white">
      <div className="max-w-[1570px] mx-auto p-8 lg:p-28 ">
        <div className="flex flex-row w-full justify-between flex-wrap gap-10 border-b border-white pb-10">
          <Link href="/" className="text-2xl font-bold mb-4">
            <div className="relative w-48 h-26 text-lg font-bold">
              <Image
                src={logo}
                fill
                alt="SolarHope Africa — home"
                className="object-contain w-full h-full"
              />
            </div>
          </Link>

          <div className=" hidden md:flex flex-1 items-center flex-wrap flex-row justify-between gap-10">
            {/* Explore */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-4">Explore</h3>
              <div className="text-sm space-y-3">
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
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="text-sm space-y-3">
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
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="text-sm space-y-3">
              <a href={`mailto:${SITE.email}`} className="block hover:underline">
                {SITE.email}
              </a>
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
