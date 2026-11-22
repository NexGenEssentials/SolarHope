"use client";
import React, { useState } from "react";
import { MdWbSunny, MdBatteryChargingFull, MdElectricalServices } from "react-icons/md";

// The three system set-ups SolarHope offers (CLAUDE.md §2), shown as a chooser:
// pick a set-up and see the role each power source plays. Roles are described
// in words, not percentages; bar lengths are only a visual guide.

type Source = { role: string; size: number; optional?: boolean };
type Setup = {
  n: string;
  title: string;
  short: string;
  text: (who: string) => string;
  suits: (who: string) => string;
  sun: Source;
  battery: Source;
  grid: Source;
};

const SETUPS: Setup[] = [
  {
    n: "1",
    title: "Backup for power cuts",
    short: "The grid as usual, a battery for cuts",
    text: (who) =>
      `Your ${who} runs on the grid as usual. When the power goes off, the battery takes over. It recharges from solar panels or from the grid, depending on what you need.`,
    suits: (who) => `A ${who} on a reliable bill that mainly wants to stop losing power during cuts.`,
    grid: { role: "Main source", size: 92 },
    battery: { role: "During power cuts", size: 40 },
    sun: { role: "Optional: recharges the battery", size: 28, optional: true },
  },
  {
    n: "2",
    title: "Hybrid",
    short: "Sun first, battery for evenings, grid tops up",
    text: () =>
      "The sun runs things first, the battery stores the extra for the evening, and the grid tops up when needed.",
    suits: (who) => `A ${who} that wants a much lower bill and to stay powered through cuts.`,
    sun: { role: "Main source by day", size: 85 },
    battery: { role: "Evenings and power cuts", size: 60 },
    grid: { role: "Tops up when needed", size: 35 },
  },
  {
    n: "3",
    title: "Off-grid first",
    short: "Run on sun and battery, grid as fallback",
    text: () => "",
    suits: (who) => `A ${who} with a weak or unreliable grid, or that wants to be as independent as possible.`,
    sun: { role: "Main source", size: 92 },
    battery: { role: "Evenings and nights", size: 82 },
    grid: { role: "Fallback only", size: 14 },
  },
];

function Bar({ icon, name, src }: { icon: React.ReactNode; name: string; src: Source }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="flex items-center gap-2 font-semibold text-gray-800">
          <span className="text-amber-500 text-lg">{icon}</span>
          {name}
        </span>
        <span className="text-gray-500">{src.role}</span>
      </div>
      <div className="h-2.5 rounded-full bg-gray-200 overflow-hidden">
        <div
          className={`h-full rounded-full transition-[width] duration-700 ease-out ${
            src.optional ? "bg-yellow/50" : "bg-yellow"
          }`}
          style={{ width: `${src.size}%` }}
        />
      </div>
    </div>
  );
}

export default function SetupOptions({
  who,
  labelClass,
  container,
  variant = "white",
}: {
  who: "home" | "business";
  labelClass: string;
  container: string;
  /** "blue" uses the businesses page blue-band design. */
  variant?: "white" | "blue";
}) {
  const [active, setActive] = useState(1);
  const s = SETUPS[active];
  const blue = variant === "blue";

  return (
    <section
      className={
        blue
          ? "text-white bg-linear-to-b from-[#2C98F0] from-10% to-95% to-[#044376] py-12"
          : "bg-white py-20"
      }
    >
      <div className={`${container} ${blue ? "space-y-7" : "space-y-10"}`}>
        <div className={blue ? "grid md:grid-cols-2 gap-x-10 gap-y-3 items-end" : "max-w-3xl space-y-4"}>
          <div className={blue ? "space-y-3" : "space-y-4"}>
          {blue ? (
            <span className="inline-block w-fit border border-yellow rounded-full bg-yellow/10 px-8 py-1 text-yellow font-semibold">
              Three ways to set it up
            </span>
          ) : (
            <p className={labelClass}>Three ways to set it up</p>
          )}
          <h2 className={`text-3xl font-bold ${blue ? "" : "text-gray-800"}`}>Choose how much you rely on the sun</h2>
          </div>
          <p className={`leading-relaxed ${blue ? "text-white/85" : "text-lg text-gray-600"}`}>
            Not sure which fits? We recommend one at the site visit, based on
            your bills, your power cuts and your budget.
          </p>
        </div>

        <div className={`grid lg:grid-cols-[1fr_1.2fr] items-stretch ${blue ? "gap-6" : "gap-8"}`}>
          <div role="tablist" aria-label="Set-ups" className="flex flex-col">
            <p className={`text-xs uppercase tracking-wider px-1 pb-3 ${blue ? "text-white/60" : "text-gray-400"}`}>
              From most grid to most sun
            </p>
            <div className={blue ? "space-y-2" : "space-y-3"}>
              {SETUPS.map((o, i) => {
                const on = i === active;
                return (
                  <button
                    key={o.n}
                    role="tab"
                    aria-selected={on}
                    onClick={() => setActive(i)}
                    className={`w-full text-left rounded-xl border-2 ${blue ? "px-4 py-3" : "p-5"} flex items-center gap-5 transition-colors ${
                      blue
                        ? on
                          ? "border-yellow bg-white/15"
                          : "border-white/25 bg-white/5 hover:border-white/50"
                        : on
                          ? "border-yellow bg-yellow/10"
                          : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <span
                      className={`flex ${blue ? "h-9 w-9" : "h-11 w-11"} shrink-0 items-center justify-center rounded-full text-lg font-extrabold ${
                        on ? "bg-yellow text-dark-blue" : blue ? "bg-white/15 text-white" : "bg-[#F2F4F7] text-gray-500"
                      }`}
                    >
                      {o.n}
                    </span>
                    <span>
                      <span className={`block font-bold ${blue ? "text-white" : "text-gray-800"}`}>{o.title}</span>
                      <span className={`block text-sm ${blue ? "text-white/70" : "text-gray-500"}`}>{o.short}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div key={active} className={`rounded-xl ${blue ? "bg-white shadow-xl" : "bg-[#F2F4F7]"} ${blue ? "p-6 space-y-4" : "p-7 sm:p-9 space-y-6"} animate-[rise_0.4s_ease-out_both]`}>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-gray-800">{s.title}</h3>
              {s.text(who) && <p className="text-gray-600 leading-relaxed">{s.text(who)}</p>}
            </div>
            <div className={blue ? "space-y-3" : "space-y-4"}>
              <p className="text-xs uppercase tracking-wider text-gray-400">Where your power comes from</p>
              <Bar icon={<MdWbSunny />} name="Sun" src={s.sun} />
              <Bar icon={<MdBatteryChargingFull />} name="Battery" src={s.battery} />
              <Bar icon={<MdElectricalServices />} name="Grid" src={s.grid} />
            </div>
            <p className="text-sm text-gray-700 border-t border-gray-200 pt-4">
              <span className="font-semibold">Best for: </span>
              {s.suits(who)}
            </p>
          </div>
        </div>

        <p className={`inline-flex flex-wrap items-center gap-2 rounded-full text-white text-sm px-5 py-2 ${blue ? "bg-white/15" : "bg-dark-blue"}`}>
          <span className="h-2 w-2 rounded-full bg-green-400" />
          Automatic switching as standard
          <span className="text-white/40">·</span>
          manual override included on every set-up
        </p>
      </div>
    </section>
  );
}
