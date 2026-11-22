import React from "react";

// The three system set-ups SolarHope offers (CLAUDE.md §2). Shared by the
// solution pages; `who` adjusts the wording for homes or businesses.

const SETUPS = (who: "home" | "business") => [
  {
    n: "1",
    title: "Backup for power cuts",
    text: `Sits ready and only takes over when the grid goes off. It recharges from solar panels or from the grid, depending on what your ${who} needs.`,
  },
  {
    n: "2",
    title: "Hybrid",
    text: "The sun runs things first, the battery stores the extra for the evening, and the grid tops up when needed.",
  },
  {
    n: "3",
    title: "Off-grid first",
    text: "You run on solar and battery, and the grid only comes in when the battery runs low or during long cloudy spells.",
  },
];

export default function SetupOptions({
  who,
  labelClass,
  container,
}: {
  who: "home" | "business";
  labelClass: string;
  container: string;
}) {
  return (
    <section className="bg-white py-20">
      <div className={`${container} space-y-10`}>
        <div className="max-w-3xl space-y-4">
          <p className={labelClass}>Three ways to set it up</p>
          <h2 className="text-3xl font-bold text-gray-800">
            Choose how much you rely on the sun
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Not sure which fits? We recommend one at the site visit, based on
            your bills, your power cuts and your budget.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SETUPS(who).map((s) => (
            <div key={s.n} className="rounded-lg bg-[#F2F4F7] p-7 space-y-3 border-t-4 border-yellow">
              <p className="text-4xl font-extrabold text-amber-500 leading-none">{s.n}</p>
              <h3 className="text-xl font-bold text-gray-800">{s.title}</h3>
              <p className="text-gray-600 leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
        <p className="text-gray-600 max-w-3xl">
          <strong className="text-gray-800">Switching:</strong> every set-up
          switches over automatically as standard, and you can still switch
          manually whenever you want to take control.
        </p>
      </div>
    </section>
  );
}
