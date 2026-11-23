"use client";
import React, { useEffect, useState } from "react";
import { SITE } from "@/app/config/site";
import BrandLines from "../brand/brandLines";
import {
  SEGMENTS,
  submitQuote,
  type QuoteRequest,
  type Segment,
} from "@/app/lib/quote/submitQuote";

const field =
  "w-full px-4 py-2 text-sm rounded-md bg-transparent text-white placeholder:text-white/50 border border-white/50 outline-none focus:border-yellow";
const label = "block text-sm font-semibold mb-1 text-left";

type Status = "idle" | "sending" | "sent" | "mail" | "error";

const QuoteSection = ({
  id,
  defaultSegment = "business",
}: {
  id?: string;
  defaultSegment?: Segment;
}) => {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [segment, setSegment] = useState<Segment>(defaultSegment);
  const [bill, setBill] = useState("");

  // A link such as "?segment=ev-home#quote" pre-selects what the quote is for.
  useEffect(() => {
    const wanted = new URLSearchParams(window.location.search).get("segment");
    if (wanted && SEGMENTS.some((s) => s.value === wanted)) setSegment(wanted as Segment);
    const billParam = new URLSearchParams(window.location.search).get("bill");
    if (billParam && /^\d+$/.test(billParam)) setBill(billParam);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const d = new FormData(form);
    // Spam trap: people never see this box, bots tick it. Show the normal
    // thank-you without sending anything.
    if (d.get("botcheck")) {
      setStatus("sent");
      return;
    }
    const request: QuoteRequest = {
      name: String(d.get("name") ?? "").trim(),
      businessName: String(d.get("businessName") ?? "").trim(),
      phone: String(d.get("phone") ?? "").trim(),
      segment: String(d.get("segment") ?? "business") as Segment,
      monthlyBill: String(d.get("monthlyBill") ?? "").trim(),
      location: String(d.get("location") ?? "").trim(),
    };
    setStatus("sending");
    const result = await submitQuote(request);
    if (result.status === "sent") {
      setStatus("sent");
      form.reset();
      setBill("");
    } else if (result.status === "opened-mail-app") {
      setStatus("mail");
    } else {
      setError(result.message);
      setStatus("error");
    }
  }

  return (
    <section id={id}>
      <div className="relative text-white bg-[#0D1B39] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/quote-background.jpg"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0D1B39] opacity-60"></div>
        </div>
        <BrandLines className="hidden lg:block -left-40 -bottom-52 w-[560px] opacity-70" />

        <div className="relative z-10 max-w-[1570px] mx-auto px-6 sm:px-20 py-14 lg:py-16 grid lg:grid-cols-[1fr_2fr] gap-8 lg:gap-14 items-start">
          <div className="space-y-4 text-center lg:text-left">
            <h2 className="font-bold text-3xl sm:text-4xl">Get a quote</h2>
            <p className="max-w-md mx-auto lg:mx-0 text-white/85">
              Tell us a little about your site and your electricity bill. We
              will get back to you to arrange a site assessment and a quote.
            </p>
          </div>

          {status === "sent" ? (
            <p
              role="status"
              className="text-center lg:text-left text-lg font-semibold self-center"
            >
              Thank you. We have your request and will call or WhatsApp you shortly.
            </p>
          ) : (
            <form
              onSubmit={onSubmit}
              className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4"
            >
              <input
                type="checkbox"
                name="botcheck"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />
              <div>
                <label htmlFor="q-name" className={label}>
                  Your name *
                </label>
                <input id="q-name" name="name" required autoComplete="name" className={field} />
              </div>
              <div>
                <label htmlFor="q-business" className={label}>
                  Business / organisation
                </label>
                <input id="q-business" name="businessName" autoComplete="organization" className={field} />
              </div>
              <div>
                <label htmlFor="q-phone" className={label}>
                  Phone / WhatsApp *
                </label>
                <input
                  id="q-phone"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  placeholder="+250 7…"
                  className={field}
                />
              </div>
              <div>
                <label htmlFor="q-segment" className={label}>
                  What is it for? *
                </label>
                <select
                  id="q-segment"
                  name="segment"
                  required
                  value={segment}
                  onChange={(e) => setSegment(e.target.value as Segment)}
                  className={`${field} [&>option]:text-black`}
                >
                  {SEGMENTS.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="q-bill" className={label}>
                  Approximate monthly electricity bill (RWF)
                </label>
                <input
                  id="q-bill"
                  name="monthlyBill"
                  value={bill}
                  onChange={(e) => setBill(e.target.value)}
                  type="number"
                  inputMode="numeric"
                  min={0}
                  step={1000}
                  placeholder="e.g. 200000"
                  className={field}
                />
              </div>
              <div>
                <label htmlFor="q-location" className={label}>
                  Location *
                </label>
                <input
                  id="q-location"
                  name="location"
                  required
                  placeholder="District / sector"
                  className={field}
                />
              </div>

              <div className="md:col-span-2 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-center sm:text-left pt-1">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="bg-yellow/80 text-dark-blue font-bold hover:bg-yellow px-6 py-3 text-sm rounded-md disabled:opacity-60"
                >
                  {status === "sending" ? "Sending…" : "Request my quote"}
                </button>
                <p className="text-xs text-white/80">
                  We use these details only to prepare your quote. See our{" "}
                  <a href="/privacy-policy" className="underline">
                    privacy policy
                  </a>
                  .
                </p>
                {status === "mail" && (
                  <p role="status" className="text-sm">
                    Your email app should have opened with your request. Press
                    send to finish. If it did not, message us on{" "}
                    <a href={SITE.whatsappUrl} className="underline">
                      WhatsApp
                    </a>
                    .
                  </p>
                )}
                {status === "error" && (
                  <p role="alert" className="text-sm text-yellow">
                    Sorry, that did not go through ({error}). Please try again
                    or message us on{" "}
                    <a href={SITE.whatsappUrl} className="underline">
                      WhatsApp
                    </a>
                    .
                  </p>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;
