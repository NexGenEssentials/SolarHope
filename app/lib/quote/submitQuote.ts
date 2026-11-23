// The one place that decides where a quote request goes. The form calls
// submitQuote() and knows nothing else; to switch to the CRM, implement the
// "crm" branch and change QUOTE_TRANSPORT in app/config/site.ts.

import { QUOTE_TRANSPORT, SITE, WEB3FORMS_ACCESS_KEY } from "@/app/config/site";

export const SEGMENTS = [
  { value: "business", label: "Business / commercial" },
  { value: "school", label: "School" },
  { value: "health", label: "Health facility" },
  { value: "home", label: "Home" },
  { value: "ev-home", label: "EV charging at home (power for your charger)" },
  { value: "repair", label: "Repair or upgrade of an existing system" },
] as const;

export type Segment = (typeof SEGMENTS)[number]["value"];

export type QuoteRequest = {
  name: string;
  businessName: string;
  phone: string;
  segment: Segment;
  monthlyBill: string; // RWF, as typed
  location: string;
};

export type SubmitResult =
  | { status: "sent" }
  | { status: "opened-mail-app" }
  | { status: "error"; message: string };

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || WEB3FORMS_ACCESS_KEY;

function segmentLabel(v: Segment) {
  return SEGMENTS.find((s) => s.value === v)?.label ?? v;
}

function toLines(q: QuoteRequest) {
  return [
    `Name: ${q.name}`,
    `Business / organisation: ${q.businessName || "—"}`,
    `Phone / WhatsApp: ${q.phone}`,
    `Segment: ${segmentLabel(q.segment)}`,
    `Approx. monthly electricity bill (RWF): ${q.monthlyBill || "—"}`,
    `Location: ${q.location}`,
  ];
}

async function viaWeb3Forms(q: QuoteRequest): Promise<SubmitResult> {
  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: WEB3FORMS_KEY,
      subject: `Quote request — ${segmentLabel(q.segment)} — ${q.name}`,
      from_name: "solarhopeafrica.com",
      message: toLines(q).join("\n"),
      ...q,
    }),
  });
  const data = await res.json().catch(() => null);
  if (res.ok && data?.success) return { status: "sent" };
  return {
    status: "error",
    message: data?.message ?? `Request failed (${res.status})`,
  };
}

function viaMailto(q: QuoteRequest): SubmitResult {
  const subject = encodeURIComponent(`Quote request — ${q.name}`);
  const body = encodeURIComponent(toLines(q).join("\n"));
  window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
  return { status: "opened-mail-app" };
}

export async function submitQuote(q: QuoteRequest): Promise<SubmitResult> {
  try {
    if (QUOTE_TRANSPORT === "web3forms" && WEB3FORMS_KEY) {
      return await viaWeb3Forms(q);
    }
    if (QUOTE_TRANSPORT === "crm") {
      // Not built yet — the CRM endpoint does not exist. Implement here.
      return { status: "error", message: "CRM transport not configured" };
    }
    return viaMailto(q);
  } catch (e) {
    return {
      status: "error",
      message: e instanceof Error ? e.message : "Network error",
    };
  }
}
