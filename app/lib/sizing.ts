// Bill-based sizing (roadmap 2.3, CLAUDE.md §4). The rate is used here only;
// it is never shown on the site.
import {
  HOPE_SERIES,
  KWH_PER_PANEL_PER_DAY,
  RATE_RWF_PER_KWH,
  type HopePackage,
} from "@/app/config/packages";

export type SizingResult =
  | {
      kind: "package";
      pkg: HopePackage;
      panelsNeeded: number;
      /** Value of the power the panels make in a month, capped at the bill. */
      monthlySavingRwf: number;
      paybackYears: number;
      /** True when the panels could cover about everything the client buys today. */
      coversBill: boolean;
    }
  | { kind: "custom"; panelsNeeded: number };

export function sizeFromBill(monthlyBillRwf: number): SizingResult | null {
  if (!Number.isFinite(monthlyBillRwf) || monthlyBillRwf <= 0) return null;
  const monthlyKwh = monthlyBillRwf / RATE_RWF_PER_KWH;
  const dailyKwh = monthlyKwh / 30;
  // Nearest whole panel, as in the roadmap reference table (2.3).
  const panelsNeeded = Math.max(1, Math.round(dailyKwh / KWH_PER_PANEL_PER_DAY));

  const pkg = HOPE_SERIES.find((p) => p.panels >= panelsNeeded);
  if (!pkg) return { kind: "custom", panelsNeeded };

  const generationValue = pkg.panels * KWH_PER_PANEL_PER_DAY * 30 * RATE_RWF_PER_KWH;
  const monthlySavingRwf = Math.min(generationValue, monthlyBillRwf);
  return {
    kind: "package",
    pkg,
    panelsNeeded,
    monthlySavingRwf,
    paybackYears: pkg.priceRwf / (monthlySavingRwf * 12),
    coversBill: generationValue >= monthlyBillRwf,
  };
}

/** Round money for display so it does not read as false precision. */
export const roundTo = (n: number, step: number) => Math.round(n / step) * step;
