// Package data and the sizing rules from /CLAUDE.md §3–4. Every price, saving
// and payback figure on the site should be derived from here, so pages cannot
// disagree with each other.

export const RATE_RWF_PER_KWH = 400; // decided rate for all public copy (§4)
export const KWH_PER_PANEL_PER_DAY = 1.42; // 445 Wp × 4.0 PSH × 0.80
export const USABLE_BATTERY_FRACTION = 0.9; // LiFePO4 depth of discharge

export type HopePackage = {
  name: string;
  inverterKw: number;
  threePhase?: boolean;
  panels: number;
  batteryKwh: number;
  priceRwf: number; // excluding VAT
  runs: string; // "What it runs", from the package sheet
};

// Hope Series, September 2026 package sheet: full installed systems built from
// separate panels, inverter and battery, expandable over time. All prices
// confirmed for publication (SHA Peak confirmed 21 Nov 2026).
export const HOPE_SERIES: HopePackage[] = [
  {
    name: "SHA Spark", inverterKw: 1, panels: 3, batteryKwh: 2.56, priceRwf: 2_654_200,
    runs: "Lighting, phone and laptop charging, a TV, Wi-Fi and a radio",
  },
  {
    name: "SHA Glow", inverterKw: 4, panels: 9, batteryKwh: 5, priceRwf: 4_750_000,
    runs: "Everything in Spark, plus a fridge, a couple of fans, a microwave and a kettle",
  },
  {
    name: "SHA Shine", inverterKw: 6, panels: 12, batteryKwh: 10, priceRwf: 7_950_000,
    runs: "Two fridges, a chest freezer, a washing machine, an air conditioner and security cameras",
  },
  {
    name: "SHA Bright", inverterKw: 8, panels: 18, batteryKwh: 15, priceRwf: 10_902_000,
    runs: "Two fridges, a freezer, two air conditioners, a few computers, a printer, a small water pump and security cameras",
  },
  {
    name: "SHA Blaze", inverterKw: 10, panels: 22, batteryKwh: 15, priceRwf: 11_991_300,
    runs: "Everything Bright runs, all at the same time, plus a hot water system and a third air conditioner",
  },
  {
    name: "SHA Peak", inverterKw: 12, threePhase: true, panels: 26, batteryKwh: 30, priceRwf: 18_761_400,
    runs: "Two large display fridges, a backroom fridge, an air conditioner, checkout systems, security cameras and around 30 lights",
  },
];

// Dream Series: self-contained plug-and-play units. Simple and fast, but fixed
// at purchase and not expandable. "Runs" text and hours are from the sheet.
export type DreamPackage = { name: string; priceRwf: number; runs: string };
export const DREAM_SERIES: DreamPackage[] = [
  { name: "SHA Lite", priceRwf: 905_000, runs: "A few lights and phone charging, for around 5 hours" },
  { name: "SHA Beam", priceRwf: 1_980_000, runs: "Lights, phone and laptop charging, a TV, Wi-Fi and DSTV, for around 6 to 8 hours" },
  { name: "SHA Flare", priceRwf: 5_469_500, runs: "A fridge, fans, a microwave and short use of a kettle, for over 12 hours" },
];

export const LOWEST_PRICE_RWF = Math.min(
  ...HOPE_SERIES.map((p) => p.priceRwf),
  ...DREAM_SERIES.map((p) => p.priceRwf),
);

export function packageByName(name: string) {
  const p = HOPE_SERIES.find((x) => x.name === name);
  if (!p) throw new Error(`Unknown package ${name}`);
  return p;
}

export function dailyKwh(p: HopePackage) {
  return p.panels * KWH_PER_PANEL_PER_DAY;
}

export function usableBatteryKwh(p: HopePackage) {
  return p.batteryKwh * USABLE_BATTERY_FRACTION;
}

/** Value of everything the panels make in a month, at the public rate. */
export function monthlyValueRwf(p: HopePackage) {
  return dailyKwh(p) * 30 * RATE_RWF_PER_KWH;
}

/** Years to pay back the price if every unit the panels make is used. */
export function paybackYears(p: HopePackage) {
  return p.priceRwf / (monthlyValueRwf(p) * 12);
}

export const rwf = (n: number) => Math.round(n).toLocaleString("en-US");
