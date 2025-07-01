import Link from "next/link";
import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Image from "next/image";
import logo from "@/public/images/logo/log2.png";

const contactLinks = [
  { title: "Home", link: "/" },
  { title: "About Us", link: "#" },
  { title: "Projects", link: "#" },
  { title: "Partners", link: "#" },
  { title: "Donate", link: "#" },
];

const followLinks = [
  { title: "Facebook", link: "https://facebook.com" },
  { title: "Instagram", link: "https://instagram.com" },
  { title: "LinkedIn", link: "https://linkedin.com" },
  { title: "Contact Us", link: "/contact" },
  { title: "Newsletter", link: "/newsletter" },
];

const updateLinks = [
  { title: "Sign Up", link: "#" },
  { title: "Get Involved", link: "#" },
  { title: "Volunteer", link: "#" },
  { title: "Sponsor System", link: "#" },
  { title: "Support Us", link: "#" },
];

const Footer = () => {
  return (
    <footer className="bg-[#0D1B39] text-white">
      <div className="max-w-[1570px] mx-auto p-8 sm:p-28 ">
        <div className="flex flex-row w-full justify-between flex-wrap gap-10 border-b border-white pb-10">
        
            <Link href="/" className="text-2xl font-bold mb-4">
              <div className="relative w-32 h-8 text-lg font-bold">
                <Image
                  src={logo}
                  fill
                  alt="Solor Hope Logo"
                  className="object-cover w-full h-full"
                />
              </div>
            </Link>
         
          <div className="flex flex-1 items-center flex-wrap flex-row justify-between gap-10">
            {/* Contact Us */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <div className="text-sm space-y-3">
                {contactLinks.map(({ title, link }) => (
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
                  <Link
                    href={link}
                    key={title}
                    className="flex items-center gap-2 hover:underline hover:text-hover-color"
                  >
                    {title}
                  </Link>
                ))}
              </div>
            </div>

            {/* Stay Updated */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
              <div className="text-sm space-y-3">
                {updateLinks.map(({ title, link }) => (
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
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
            <p className="text-sm mb-6">
              Join our newsletter for updates on our projects and initiatives.
            </p>

            {/* Newsletter */}

            <form className="flex items-center w-full gap-3">
              <input
                type="email"
                placeholder="Your Email Here"
                className="w-4/5 px-4 py-2 text-sm rounded-md text-white/40 outline-none focus:outline-none border border-white/50 flex-grow"
              />
              <button
                type="submit"
                className=" text-default-blue border border-white/50 text-sm px-6 py-2 rounded-lg hoverStyle w-fit"
              >
                Subscribe
              </button>
            </form>

            <p className="text-xs mt-3">
              By subscribing, you agree to our Privacy Policy and consent to
              updates.
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center text-sm gap-2">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p>© 2024 SolarHope Africa. All rights reserved.</p>
            <div className="flex gap-8 text-default-white">
              <Link href="/privacy-policy" className="underline">
                Privacy Policy
              </Link>
              <Link href="/terms" className="underline">
                Terms of Service
              </Link>
              <Link href="/cookies" className="underline">
                Cookie Settings
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4 text-white text-xl">
            <FaFacebookF />
            <FaInstagram />
            <FaXTwitter />
            <FaLinkedinIn />
            <FaYoutube />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
