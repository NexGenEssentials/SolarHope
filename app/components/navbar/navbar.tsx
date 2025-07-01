"use client";
import React, { useEffect, useState } from "react";
import logo from "@/public/images/logo/log2.png";
import Link from "next/link";
import Image from "next/image";
import Button from "../button/button";
import { HiMenu, HiX } from "react-icons/hi";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "#about" },
  { name: "Our Impact", href: "#impact" },
  { name: "Get Involved", href: "#get-involved" },
  { name: "Services", href: "#services" },
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
        <Link href="/" className="relative w-32 h-8">
          <Image
            src={logo}
            fill
            alt="Solar Hope Logo"
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
          <Link
            href="/#get-involved"
            className="font-bold hover:text-yellow transition-colors"
          >
            Join
          </Link>
          <Button link="#get-involved" name="Donate" />
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden text-3xl cursor-pointer">
          {mobileOpen ? (
            <HiX onClick={() => setMobileOpen(false)} />
          ) : (
            <HiMenu onClick={() => setMobileOpen(true)} />
          )}
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
          <Link
            href="/#get-involved"
            className="block hover:text-yellow"
            onClick={() => setMobileOpen(false)}
          >
            Join
          </Link>
          <Button link="#get-involved" name="Donate" />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
