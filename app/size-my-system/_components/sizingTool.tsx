"use client";
import React, { useMemo, useState } from "react";
import { rwf } from "@/app/config/packages";
import { sizeFromBill } from "@/app/lib/sizing";

// Fill-in-the-sentence sizing tool, set on the dark hero. The rate behind the
// calculation is never shown (CLAUDE.md §4).

type Who = "business" | "home";

// Slider stops: fine steps for small bills, coarser for large ones.
const STOPS = [
  ...Array.from({ length: 9 }, (_, i) => 20_000 + i * 10_000), // 20k–100k
  ...Array.from({ length: 16 }, (_, i) => 125_000 + i * 25_000), // 125k–500k
  ...Array.from({ length: 10 }, (_, i) => 600_000 + i * 100_000), // 600k–1.5M
];
const nearestStop = (v: number) =>
  STOPS.reduce((best, s, i) => (Math.abs(s - v) < Math.abs(STOPS[best] - v) ? i : best), 0);

export default function SizingTool() {
  const [who, setWho] = useState<Who>("business");
  const [bill, setBill] = useState(200_000);
  const result = useMemo(() => sizeFromBill(bill), [bill]);
  const years = result?.kind === "package" ? Math.max(1, Math.round(result.paybackYears * 2) / 2) : 0;
  const quoteHref = `?segment=${who}${bill > 0 ? `&bill=${bill}` : ""}#quote`;
  const shown = bill > 0 ? bill.toLocaleString("en-US") : "";

  const whoButton = (w: Who) => (
    <button
      type="button"
      role="radio"
      aria-checked={who === w}
      onClick={() => setWho(w)}
      className={`underline decoration-2 underline-offset-8 transition-colors ${
        who === w ? "text-yellow decoration-yellow" : "text-white/35 decoration-transparent hover:text-white/70"
      }`}
    >
      {w}
    </button>
  );

  return (
    <div className="space-y-12">
      {/* The sentence */}
      <div className="space-y-8">
        <p className="text-3xl sm:text-5xl font-bold leading-[1.35] text-white">
          My{" "}
          <span role="radiogroup" aria-label="Business or home" className="inline-flex gap-3">
            {whoButton("business")}
            <span className="text-white/25">/</span>
            {whoButton("home")}
          </span>{" "}
          pays about{" "}
          <label htmlFor="bill" className="sr-only">Monthly electricity bill in RWF</label>
          <input
            id="bill"
            inputMode="numeric"
            autoComplete="off"
            value={shown}
            onChange={(e) => setBill(Number(e.target.value.replace(/[^\d]/g, "")) || 0)}
            style={{ width: `${Math.max(shown.length, 3) + 0.5}ch` }}
            className="bg-transparent text-yellow border-b-2 border-yellow/60 focus:border-yellow outline-none text-center"
          />{" "}
          RWF a month for electricity.
        </p>

        <div className="max-w-3xl space-y-2">
          <input
            type="range"
            aria-label="Adjust your monthly bill"
            min={0}
            max={STOPS.length - 1}
            value={nearestStop(bill)}
            onChange={(e) => setBill(STOPS[Number(e.target.value)])}
            className="w-full accent-[#FBBF24] cursor-pointer"
          />
          <div className="flex justify-between text-xs text-white/40">
            <span>20,000</span>
            <span>Drag, or type your bill above</span>
            <span>1,500,000</span>
          </div>
        </div>
      </div>

      <div className="h-px bg-white/15" />

      {/* The answer */}
      <div aria-live="polite" className="space-y-6">
        {!result && <p className="text-2xl text-white/60">Type your monthly bill to see what you need.</p>}

        {result?.kind === "custom" && (
          <>
            <p className="text-3xl sm:text-5xl font-bold text-white">
              You need a system <span className="text-yellow">built for your site.</span>
            </p>
            <p className="text-white/70 max-w-2xl text-lg">
              A bill this size is beyond our standard packages. We design it after
              a visit, around your roof, your equipment and your busiest hours.
            </p>
          </>
        )}

        {result?.kind === "package" && (
          <>
            <p className="text-3xl sm:text-5xl font-bold text-white">
              You need <span className="text-yellow">{result.pkg.name}.</span>
            </p>
            <p className="text-white/70 max-w-2xl text-lg">It runs {result.pkg.runs.charAt(0).toLowerCase() + result.pkg.runs.slice(1)}.</p>
            <dl className="flex flex-wrap gap-y-4 text-white">
              <div className="w-full sm:w-auto sm:pr-8 sm:mr-8 sm:border-r border-white/15">
                <dt className="text-sm text-white/50">Price, excl. VAT</dt>
                <dd className="text-2xl font-bold">{rwf(result.pkg.priceRwf)} RWF</dd>
              </div>
              <div>
                <dt className="text-sm text-white/50">Pays for itself</dt>
                <dd className="text-2xl font-bold">from about {years} years</dd>
              </div>
            </dl>
            <p className="text-white/60 max-w-2xl">
              {years > 6
                ? `At this bill size solar pays back slowly, so most ${who === "home" ? "households" : "businesses"} like yours choose it for power during cuts. A backup set-up may suit you better.`
                : "Your bill drops, but it won’t disappear: how much depends on how much power you use after dark."}
            </p>
          </>
        )}

        <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-2">
          <a
            href={quoteHref}
            className="bg-yellow text-dark-blue font-bold hover:bg-yellow/90 px-6 py-3 rounded-md"
          >
            Get an exact quote
          </a>
          <details className="text-white/60 text-sm max-w-xl">
            <summary className="cursor-pointer hover:text-white">How we estimate this</summary>
            <p className="mt-2 leading-relaxed">
              From your bill we work out roughly how much power you buy each month,
              how many solar panels it takes to make that much on an average day in
              Rwanda, and match it to the nearest of our packages. Payback compares
              the price with what that solar power would otherwise cost you,
              assuming you use most of it. It is a starting point: your quote is
              based on your actual bills and a site visit.
            </p>
          </details>
        </div>
      </div>
    </div>
  );
}
