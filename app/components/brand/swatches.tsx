"use client";
import React, { useState } from "react";

// Brand colour swatches: lift and tilt on hover, copy the colour code on click.

const COLOURS = [
  {
    name: "Solar Gold",
    hex: "#EA9D13",
    text: "text-dark-blue",
    line: "The colour of 10 a.m. sunshine on your roof.",
  },
  {
    name: "Hope Green",
    hex: "#71AA1F",
    text: "text-dark-blue",
    line: "That feeling when the street goes dark and your lights stay on.",
  },
  {
    name: "Night Navy",
    hex: "#091928",
    text: "text-white",
    line: "The sky during a power cut. We are not scared of it.",
  },
  {
    name: "Daylight Cream",
    hex: "#FFF5E6",
    text: "text-dark-blue",
    line: "Morning light, before the panels wake up.",
  },
];

export default function Swatches() {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (hex: string) => {
    try {
      await navigator.clipboard.writeText(hex);
    } catch {
      // Clipboard can be blocked; the code is still shown on the card.
    }
    setCopied(hex);
    setTimeout(() => setCopied((c) => (c === hex ? null : c)), 1400);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {COLOURS.map((c, i) => (
        <button
          key={c.hex}
          type="button"
          onClick={() => copy(c.hex)}
          aria-label={`Copy ${c.name} colour code ${c.hex}`}
          className={`group relative text-left rounded-lg h-48 p-5 flex flex-col justify-end border border-gray-100 transition-transform duration-300 ease-[cubic-bezier(.34,1.56,.64,1)] hover:-translate-y-2 ${
            i % 2 ? "hover:rotate-1" : "hover:-rotate-1"
          } hover:shadow-xl ${c.text}`}
          style={{ backgroundColor: c.hex }}
        >
          <span className="absolute top-4 right-4 text-xs font-semibold opacity-0 group-hover:opacity-70 transition-opacity">
            Click to copy
          </span>
          {copied === c.hex && (
            <span className="absolute top-4 left-4 rounded-full bg-white text-dark-blue text-xs font-bold px-3 py-1 animate-[pop_0.4s_ease-out_both]">
              Copied!
            </span>
          )}
          <span className="block font-bold text-lg">{c.name}</span>
          <span className="block text-sm opacity-80">{c.hex}</span>
          <span className="block text-sm mt-2 opacity-90 leading-snug">{c.line}</span>
        </button>
      ))}
    </div>
  );
}
