"use client";
import React, { useMemo, useState } from "react";
import { rwf } from "@/app/config/packages";
import { sizeFromBill } from "@/app/lib/sizing";

const PRESETS = [50_000, 100_000, 200_000, 300_000, 500_000];

type Who = "business" | "home";

export default function SizingTool() {
  const [who, setWho] = useState<Who>("business");
  const [raw, setRaw] = useState("200000");
  const bill = Number(raw.replace(/[^\d]/g, ""));
  const result = useMemo(() => sizeFromBill(bill), [bill]);

  const quoteHref = `?segment=${who}${bill > 0 ? `&bill=${bill}` : ""}#quote`;
  const years = result?.kind === "package" ? Math.max(1, Math.round(result.paybackYears * 2) / 2) : 0;

  return (
    <div className="grid lg:grid-cols-[1fr_1.1fr] gap-8 items-start">
      {/* Inputs */}
      <div className="space-y-7">
        <div role="radiogroup" aria-label="Is this for a business or a home?" className="inline-flex rounded-full bg-[#F2F4F7] p-1">
          {(["business", "home"] as Who[]).map((w) => (
            <button
              key={w}
              type="button"
              role="radio"
              aria-checked={who === w}
              onClick={() => setWho(w)}
              className={`px-5 py-2 text-sm font-semibold rounded-full transition-colors ${
                who === w ? "bg-dark-blue text-white" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {w === "business" ? "For my business" : "For my home"}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          <label htmlFor="bill" className="block text-lg font-semibold text-gray-800">
            Your average monthly electricity bill
          </label>
          <div className="flex items-center rounded-xl border-2 border-gray-200 focus-within:border-yellow bg-white overflow-hidden">
            <input
              id="bill"
              inputMode="numeric"
              autoComplete="off"
              value={bill > 0 ? bill.toLocaleString("en-US") : raw}
              onChange={(e) => setRaw(e.target.value)}
              className="w-full px-5 py-4 text-3xl font-bold text-dark-blue outline-none"
              placeholder="e.g. 200,000"
            />
            <span className="px-5 text-gray-500 font-semibold">RWF</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setRaw(String(p))}
                className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                  bill === p ? "bg-dark-blue border-dark-blue text-white" : "border-gray-300 text-gray-700 hover:border-gray-500"
                }`}
              >
                {rwf(p)}
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-500">
            Not sure? Look at your last two or three bills and take a rough average.
          </p>
        </div>
      </div>

      {/* Result */}
      <div aria-live="polite" className="rounded-xl bg-white border-t-4 border-yellow shadow-lg p-7 space-y-5">
        {!result && <p className="text-gray-500">Enter your monthly bill to see a suggested system.</p>}

        {result?.kind === "custom" && (
          <>
            <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">A system designed for you</p>
            <h3 className="text-3xl font-bold text-gray-800">Larger than our standard packages</h3>
            <p className="text-gray-600 leading-relaxed">
              A bill this size needs a system built around your site. We design
              it after a visit, so it fits your roof, your equipment and your
              busiest hours.
            </p>
          </>
        )}

        {result?.kind === "package" && (
          <>
            <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">A good place to start</p>
            <h3 className="text-3xl font-bold text-gray-800">{result.pkg.name}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              <span className="font-semibold text-gray-700">Runs: </span>
              {result.pkg.runs}
            </p>
            <dl className="grid grid-cols-2 gap-4 border-y border-gray-100 py-5">
              <div>
                <dt className="text-xs uppercase tracking-wider text-gray-400">Price</dt>
                <dd className="text-xl font-extrabold text-dark-blue">{rwf(result.pkg.priceRwf)}</dd>
                <dd className="text-xs text-gray-500">RWF, excl. VAT</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-gray-400">Pays back</dt>
                <dd className="text-xl font-extrabold text-dark-blue">from ~{years} years</dd>
                <dd className="text-xs text-gray-500">if you use most of the solar power</dd>
              </div>
            </dl>
            {years > 6 ? (
              <p className="text-sm bg-yellow/15 rounded-lg p-3 text-gray-700">
                With a bill this size, solar pays for itself slowly. Most{" "}
                {who === "home" ? "households" : "businesses"} like yours choose it
                for power during cuts rather than for savings, and a backup
                set-up may suit you better.
              </p>
            ) : (
              <p className="text-sm text-gray-600">
                Your bill drops, but it won&rsquo;t disappear: how much depends on how
                much power you use after dark.
              </p>
            )}
          </>
        )}

        <a
          href={quoteHref}
          className="inline-block bg-yellow/80 text-dark-blue font-bold hover:bg-yellow px-5 py-3 text-sm rounded-md"
        >
          Get an exact quote
        </a>
        <details className="text-sm text-gray-500">
          <summary className="cursor-pointer text-gray-700 font-medium">How we estimate this</summary>
          <p className="mt-2 leading-relaxed">
            From your bill we work out roughly how much power you buy each month,
            then how many solar panels it takes to make that much on an average day
            in Rwanda, and match it to the nearest of our packages. Payback compares
            the price with what that solar power would otherwise cost you, assuming
            you use most of it. Everything here is indicative: your quote is based
            on your actual bills and a site visit.
          </p>
        </details>
      </div>
    </div>
  );
}
