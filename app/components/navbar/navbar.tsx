"use client";
import React, { useEffect, useRef, useState } from "react";
import logo1 from "@/public/images/logo/log1.png";
import logo from "@/public/images/logo/log2.png";
import Link from "next/link";
import Image from "next/image";
import Button from "../button/button";
import { HiChevronDown, HiMenu, HiX } from "react-icons/hi";
import { SITE } from "@/app/config/site";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/#about" },
  { name: "What We Do", href: "/#impact" },
  { name: "How We Work", href: "/#services" },
];

// Grouped under one "Solutions" menu so the bar stays short.
const solutionLinks = [
  { name: "For Businesses", href: "/solutions/businesses" },
  { name: "For Homes", href: "/solutions/homes" },
  { name: "Schools & Health", href: "/solutions/institutions" },
  { name: "Repairs & Upgrades", href: "/solutions/repairs" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const solutionsRef = useRef<HTMLLIElement>(null);

  // Close the Solutions menu on Escape or a click anywhere else.
  useEffect(() => {
    if (!solutionsOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSolutionsOpen(false);
    const onClick = (e: MouseEvent) => {
      if (!solutionsRef.current?.contains(e.target as Node)) setSolutionsOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [solutionsOpen]);

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
        <ul className="hidden lg:flex items-center gap-7 text-sm font-semibold whitespace-nowrap">
          {navLinks.slice(0, 3).map((link) => (
            <li key={link.name}>
              <Link href={link.href} className="hover:text-yellow transition-colors">
                {link.name}
              </Link>
            </li>
          ))}
          <li
            ref={solutionsRef}
            className="relative"
            onMouseEnter={() => setSolutionsOpen(true)}
            onMouseLeave={() => setSolutionsOpen(false)}
          >
            <button
              type="button"
              aria-expanded={solutionsOpen}
              aria-haspopup="true"
              onClick={() => setSolutionsOpen((o) => !o)}
              className="flex items-center gap-1 font-semibold hover:text-yellow transition-colors"
            >
              Solutions
              <HiChevronDown className={`transition-transform ${solutionsOpen ? "rotate-180" : ""}`} />
            </button>
            {solutionsOpen && (
              // pt-3 instead of a margin, so the pointer can cross the gap.
              <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3">
                <ul className="min-w-52 rounded-lg border border-gray-100 bg-white py-2 text-gray-800 shadow-lg">
                  {solutionLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        onClick={() => setSolutionsOpen(false)}
                        className="block px-5 py-2 hover:bg-gray-50 hover:text-amber-500 transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
          {navLinks.slice(3).map((link) => (
            <li key={link.name}>
              <Link href={link.href} className="hover:text-yellow transition-colors">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Buttons */}
        <div className="hidden lg:flex items-center space-x-4 whitespace-nowrap">
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
        <div className="lg:hidden text-3xl cursor-pointer">
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
          className={`lg:hidden bg-white text-black px-6 py-4 space-y-4 font-semibold`}
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
          <div className="space-y-3 border-l-2 border-yellow/60 pl-4">
            <p className="text-xs uppercase tracking-wider text-gray-400">Solutions</p>
            {solutionLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block hover:text-yellow"
                onClick={() => setMobileOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
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
