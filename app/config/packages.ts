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
};

// Hope Series, September 2026 package sheet. All prices confirmed for
// publication (SHA Peak confirmed 21 Nov 2026).
export const HOPE_SERIES: HopePackage[] = [
  { name: "SHA Spark", inverterKw: 1, panels: 3, batteryKwh: 2.56, priceRwf: 2_654_200 },
  { name: "SHA Glow", inverterKw: 4, panels: 9, batteryKwh: 5, priceRwf: 4_750_000 },
  { name: "SHA Shine", inverterKw: 6, panels: 12, batteryKwh: 10, priceRwf: 7_950_000 },
  { name: "SHA Bright", inverterKw: 8, panels: 18, batteryKwh: 15, priceRwf: 10_902_000 },
  { name: "SHA Blaze", inverterKw: 10, panels: 22, batteryKwh: 15, priceRwf: 11_991_300 },
  { name: "SHA Peak", inverterKw: 12, threePhase: true, panels: 26, batteryKwh: 30, priceRwf: 18_761_400 },
];

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
