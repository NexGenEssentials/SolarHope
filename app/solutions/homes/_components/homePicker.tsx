"use client";
import React, { useMemo, useState } from "react";
import { DREAM_SERIES, HOPE_SERIES, rwf } from "@/app/config/packages";

// "What can your home run?" The visitor ticks what they use; the smallest Hope
// Series package whose "what it runs" list (from the September 2026 package
// sheet) covers all of it is recommended. Levels are indexes into HOPE_SERIES.
// This is a starting point only; the real size is confirmed at a home visit.

type Item = { key: string; label: string; level: number };

const ITEMS: Item[] = [
  { key: "lights", label: "Lights", level: 0 },
  { key: "charging", label: "Phone and laptop charging", level: 0 },
  { key: "tv", label: "TV and decoder", level: 0 },
  { key: "wifi", label: "Wi-Fi", level: 0 },
  { key: "fridge", label: "A fridge", level: 1 },
  { key: "fans", label: "Fans", level: 1 },
  { key: "microwave", label: "Microwave", level: 1 },
  { key: "kettle", label: "Kettle", level: 1 },
  { key: "iron", label: "Iron", level: 2 },
  { key: "washing", label: "Washing machine", level: 2 },
  { key: "freezer", label: "Chest freezer", level: 2 },
  { key: "fridge2", label: "A second fridge", level: 2 },
  { key: "cameras", label: "Security cameras", level: 2 },
  { key: "ac1", label: "One air conditioner", level: 2 },
  { key: "ac2", label: "Two air conditioners", level: 3 },
  { key: "pump", label: "Water pump", level: 3 },
  { key: "hotwater", label: "Hot water system", level: 4 },
];

const LITE = new Set(["lights", "charging"]);
const BEAM = new Set(["lights", "charging", "tv", "wifi"]);

export default function HomePicker() {
  const [picked, setPicked] = useState<Set<string>>(new Set(["lights", "charging", "tv", "wifi", "fridge"]));
  const [ev, setEv] = useState(false);

  const toggle = (k: string) =>
    setPicked((prev) => {
      const next = new Set(prev);
      if (next.has(k)) next.delete(k);
      else next.add(k);
      return next;
    });

  const { pkg, plugAndPlay } = useMemo(() => {
    const level = Math.max(0, ...ITEMS.filter((i) => picked.has(i.key)).map((i) => i.level));
    const onlyIn = (set: Set<string>) => picked.size > 0 && [...picked].every((k) => set.has(k));
    const plug = onlyIn(LITE)
      ? DREAM_SERIES.find((d) => d.name === "SHA Lite")
      : onlyIn(BEAM)
        ? DREAM_SERIES.find((d) => d.name === "SHA Beam")
        : undefined;
    return { pkg: HOPE_SERIES[level], plugAndPlay: plug };
  }, [picked]);

  return (
    <div className="grid lg:grid-cols-[1.3fr_1fr] gap-8 items-start">
      <div className="space-y-6">
        <fieldset>
          <legend className="sr-only">What do you use at home?</legend>
          <div className="flex flex-wrap gap-3">
            {ITEMS.map((i) => {
              const on = picked.has(i.key);
              return (
                <button
                  key={i.key}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggle(i.key)}
                  className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
                    on
                      ? "bg-dark-blue border-dark-blue text-white"
                      : "bg-white border-gray-300 text-gray-700 hover:border-gray-500"
                  }`}
                >
                  {on ? "✓ " : "+ "}
                  {i.label}
                </button>
              );
            })}
            <button
              type="button"
              aria-pressed={ev}
              onClick={() => setEv((v) => !v)}
              className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
                ev ? "bg-yellow border-yellow text-dark-blue" : "bg-white border-gray-300 text-gray-700 hover:border-gray-500"
              }`}
            >
              {ev ? "✓ " : "+ "}Electric car charger
            </button>
          </div>
        </fieldset>
        <p className="text-sm text-gray-500">
          Tap what you use at home. This gives you a starting point; we confirm
          the right size at a home visit, because it also depends on how much
          runs at the same time.
        </p>
      </div>

      <div aria-live="polite" className="rounded-xl bg-white border-t-4 border-yellow shadow-lg p-7 space-y-4">
        <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">A good place to start</p>
        <h3 className="text-3xl font-bold text-gray-800">{pkg.name}</h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          <span className="font-semibold text-gray-700">Runs: </span>
          {pkg.runs}
        </p>
        <p className="text-3xl font-extrabold text-dark-blue">
          {rwf(pkg.priceRwf)} <span className="text-base font-bold">RWF</span>
        </p>
        <p className="text-xs text-gray-500 -mt-3">excluding VAT</p>
        {ev && (
          <p className="text-sm bg-yellow/15 rounded-lg p-3 text-gray-700">
            With an electric car, we size the system around your charging too.
            That part is priced on request.
          </p>
        )}
        {plugAndPlay && (
          <p className="text-sm text-gray-600 border-t border-gray-100 pt-3">
            Only need the basics? A plug-and-play <strong>{plugAndPlay.name}</strong> unit also covers
            this, from {rwf(plugAndPlay.priceRwf)} RWF excl. VAT.
          </p>
        )}
        <a
          href={`?segment=${ev ? "ev-home" : "home"}#quote`}
          className="inline-block bg-yellow/80 text-dark-blue font-bold hover:bg-yellow px-5 py-3 text-sm rounded-md"
        >
          Get a quote for {pkg.name}
        </a>
      </div>
    </div>
  );
}
