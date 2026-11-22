"use client";
import React, { useEffect, useState } from "react";
import logo1 from "@/public/images/logo/log1.png";
import logo from "@/public/images/logo/log2.png";
import Link from "next/link";
import Image from "next/image";
import Button from "../button/button";
import { HiMenu, HiX } from "react-icons/hi";
import { SITE } from "@/app/config/site";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/#about" },
  { name: "What We Do", href: "/#impact" },
  { name: "Services", href: "/#services" },
  { name: "For Businesses", href: "/solutions/businesses" },
  { name: "For Homes", href: "/solutions/homes" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md text-black" : "bg-transparent text-white"
      }`}
    >
      <div className="max-w-[1570px] mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="relative w-32 h-12">
          <Image
            src={scrolled ? logo1 : logo}
            fill
            priority
            sizes="128px"
            alt="SolarHope Africa"
            className="object-contain"
          />
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-8 text-sm font-semibold">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className="hover:text-yellow transition-colors"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <a
            href={SITE.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold hover:text-yellow transition-colors"
          >
            WhatsApp us
          </a>
          <Button link="/#quote" name="Get a quote" />
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden text-3xl cursor-pointer">
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className={`md:hidden bg-white text-black px-6 py-4 space-y-4 font-semibold`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="block hover:text-yellow"
              onClick={() => setMobileOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <a
            href={SITE.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block hover:text-yellow"
            onClick={() => setMobileOpen(false)}
          >
            WhatsApp us
          </a>
          <Button link="/#quote" name="Get a quote" />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
