# solarhopeafrica.com — enhancement roadmap

Company context, product data, tariffs and tone rules are in `/CLAUDE.md`. Read that first.
This document is the work plan: what is broken, what to build, in what order.

Audit date: 21 November 2026.

---

## Phase 0 — Fix what is actively damaging (do this first, ~an afternoon)

None of this needs a redesign. All of it is currently costing credibility.

### 0.1 Replace the head metadata — highest priority

The site ships the unedited template's metadata:

```html
<title>Solor hope</title>
<meta name="description" content="Solor hope is a platform for sharing and discovering solar energy solutions.">
<meta property="og:title" content="Solor hope">
<meta property="og:description" content="Solor hope is a platform for sharing and discovering solar energy solutions.">
<meta property="og:url" content="https://solorhope.com">
<meta property="og:image" content="https://solorhope.com/og-image.png">
```

Consequences right now: Google lists the business as "Solor hope"; every share on
WhatsApp, LinkedIn or Facebook renders a preview card titled "Solor hope" with a broken
image requested from a third-party domain.

Replace with real metadata, add a canonical tag, add a favicon, and generate a proper
`og-image` on SolarHope's own domain. Per-page titles and descriptions once the pages in
Phase 2 exist.

### 0.2 Remove the charity framing

Delete **Donate**, **Volunteer**, **Sponsor System**, **Support Us**, and the "Join the
SolarHope Movement" CTA. Replace the primary CTA with **Get a quote** (routing to the form
in 0.6) and a secondary **WhatsApp us** linking to `https://wa.me/250780348624`.
See `/CLAUDE.md` §7.

### 0.3 Hide the statistics counters

They currently render `0` for Schools Powered, Clinics Lit Up and Partners Engaged.
The real figures exist but are still too small to be worth publishing, so **take the
section off the live site for now**. Keep the component in the codebase behind a flag or
config value so it can be switched back on, with real numbers, once the counts justify it.

### 0.4 Remove the placeholder testimonial

A testimonial attributed to "John Doe, farmer" is live on the site. No client has yet
agreed to be quoted publicly, so remove the section entirely rather than replacing it.
Build it back when Jackson has signed-off quotes.

### 0.5 Resolve every dead link

These all currently point at `#`: Vision, Learn More, Explore All Services, Projects,
Volunteer, Sponsor System, Support Us, Donate, Join, Partner. Wire each to a real
destination or remove the element.

### 0.6 Add a real contact / quote form

There is no form anywhere — only a `mailto:` and a phone number. Build a quote request
form capturing: name, business name, phone/WhatsApp, segment (business / school / health /
home / repair), approximate monthly electricity bill, and location.

**There is no CRM endpoint yet.** Submissions go to email for now. Put the submit behind a
single adapter (one function, one config value) so a CRM endpoint can be dropped in later
without touching the form itself — that integration is planned, just not yet available.

### 0.7 Housekeeping

- Copyright reads © 2024 — make it dynamic.
- Add `robots.txt` and `sitemap.xml`.
- Add alt text on all images.
- Check Lighthouse scores once the above is done.

---

## Phase 1 — Restructure

> **This is not a redesign.** The existing look and feel stays. Everything below is about
> structure and content — new routes, new sections, new copy — built using the design
> language already on the site. See `/CLAUDE.md` §5.

The site is a single page with anchor links (`#about`, `#impact`, `#services`,
`#get-involved`) presented as a navigation menu. There is nothing for search engines to
rank beyond one URL.

Convert to real routed pages. Target information architecture:

```
/                           Home
/solutions/businesses       Businesses & SMEs
/solutions/schools          Schools
/solutions/health           Health facilities
/solutions/homes            Homes
/solutions/repairs          Repairs & system upgrades
/packages                   Pricing and packages
/size-my-system             Bill-based sizing tool
/projects                   Case studies index
/projects/<slug>            Individual case study
/about                      About, team, credentials
/partners                   Partners & funders
/insights                   Articles index
/insights/<slug>            Individual article
/contact                    Contact and quote request
```

---

## Phase 2 — New pages, in build order

### 2.1 Segment pages (`/solutions/*`) — build these first

Five pages, one per segment. These are the commercial core and each one can rank for its
own search terms ("solar for schools Rwanda", "solar for clinics Kigali").

Shared template per page:

1. **Headline + the problem** in that segment's own words
2. **Why this segment is different** — the load profile argument (see below)
3. **What we install** — a typical system, in plain language
4. **What it costs and what it saves** — a worked example with real figures from `/CLAUDE.md` §4
5. **What happens during an outage** — honest hours at a named load
6. **A relevant case study card**
7. **CTA** — quote form, pre-filled with the segment

The load-profile argument is the strongest differentiator SolarHope has, and it is
genuinely different per segment:

- **Businesses / bars / restaurants** — peak demand is 17:00–02:00, when the panels
  produce nothing. The array charges the battery during the quiet day; the battery carries
  trading hours. Storage and control matter more than array size.
- **Schools** — daytime classes and computer labs coincide with generation, so energy is
  used as it is made. Evening prep and boarding facilities need battery.
- **Health facilities** — continuous load, no tolerance for interruption. Changeover speed
  and refrigeration continuity are the selling points.
- **Homes** — morning and evening peaks, modest daytime load.
- **Repairs** — a different page shape entirely; see 2.5.

### 2.2 `/packages` — publish the prices

Both product lines from `/CLAUDE.md` §3, with the plain-language "what it runs" copy from
the package sheet. Mark every price **excluding VAT**.

Almost no Rwandan installer publishes prices. Doing so pre-qualifies leads before they
make contact, and it is consistent with the "honest quote" positioning.

SHA Peak price confirmed as 18,761,400 (21 Nov 2026) — no longer a blocker.

### 2.3 `/size-my-system` — the bill-based sizing tool

Highest-leverage single build on this list. Visitor enters their monthly electricity bill;
the page returns estimated monthly and daily consumption, panel count, suggested system,
indicative price and payback, then invites them to send their actual bill for a real quote.

Calculation, using `/CLAUDE.md` §4:

```
monthly kWh      = bill ÷ tariff
daily kWh        = monthly kWh ÷ 30
panels needed    = daily kWh ÷ 1.42          // 445 Wp panel, 4 PSH, 80% efficiency
monthly saving   = panels × 1.42 × 30 × tariff
payback (years)  = system price ÷ (monthly saving × 12)
```

Let the visitor pick their tariff category (business / school or health / home) so the
maths is right for them. Show the working — it reinforces the honesty positioning.
Capture the entered bill as a lead. Label all output **indicative**.

Reference points for sanity-checking the output, calculated at RWF 400/kWh:

| Monthly bill | kWh/month | kWh/day | Panels | System | Price (excl. VAT) | Payback |
|---|---|---|---|---|---|---|
| 150,000 | 375 | 12.5 | 9 | 4 kW, 5 kWh | 4,750,000 | 2.6 yrs |
| 200,000 | 500 | 16.7 | 12 | 6 kW, 10 kWh | 7,950,000 | 3.2 yrs |
| 300,000 | 750 | 25.0 | 18 | 8 kW, 15 kWh | 10,902,000 | 3.0 yrs |
| 450,000 | 1,125 | 37.5 | 26 | 12 kW, 30 kWh | 18,761,400 | 3.5 yrs |

### 2.4 `/projects` — case studies

The company has completed and assessed real installations across every segment: a boarding
school in Ruhango, a medical bureau office in Kacyiru, a manufacturer in Kimironko, a bar
in Kicukiro, residential installs, and revamps of failed systems at two NGO sites.

Three written up properly beats everything currently on the site. Each should carry: the
site and its problem, what was installed, the numbers (generation, coverage, backup hours,
saving), and a photo set.

This page does double duty — public case studies are evidence of completed similar
contracts, which is a recurring eligibility requirement in the tenders the company bids
for. Build it so a case study can be exported or printed cleanly.

> **No client has agreed to be named publicly yet.** Every case study must be anonymised:
> "a boarding school in Ruhango", "a medical bureau office in Kacyiru", "a manufacturer in
> Kimironko", "a lounge in Kicukiro". Do not use client names, logos, signage, or photos
> in which a business is identifiable. Build the data model with optional `clientName` and
> `logo` fields so named versions can be switched on per project once permission is
> obtained — that is the expected path, not a permanent constraint.

### 2.5 `/solutions/repairs` — the underserved market

Kigali has many failed or badly installed systems whose installers have disappeared.
This page sells a paid diagnostic: array tested string by string, real battery capacity
measured, earthing and DB work checked, written report with photos, then a quote for the
fix. Low cost to deliver, converts other installers' unhappy customers, and builds the
upgrade references that institutional tenders ask for.

### 2.6 `/about` — credentials

Company story, team, technician qualifications, and a credentials block: RDB registration,
TIN, RRA and RSSB compliance, manufacturer authorisations, warranty terms. Institutional
and government buyers look for exactly this before shortlisting. It also doubles as the
tender compliance pack.

### 2.7 `/partners` — funders and institutional programmes

Where the impact and development story belongs, kept separate from the commercial pages:
off-grid schools and clinics, mini-grids, multi-site programmes, and the company's
capacity to deliver and report on donor-funded work. Address funders, not donors — the
company is looking for organisations that pay to electrify facilities, not for charity.

### 2.8 `/insights` — articles

Repurpose the marketing content already produced:

- What solar actually costs in Rwanda — tariffs, system prices, payback
- How to read your REG bill and work out what system you need
- Three numbers a real solar quote must show you
- Why a bar, a school and a clinic need three different systems
- What actually happens in the first three seconds of a blackout

This is what brings organic search traffic, and it is the same material already working on
Instagram.

---

## Phase 3 — Later

- **Aftercare and monitoring page.** Every installed system reports generation, battery
  state and faults. Productising this as a monitored service with monthly reporting is a
  real differentiator and a recurring revenue line. Worth a page once the service exists.
- **Client portal.** System performance, savings to date, warranty status, service history.
- **Kinyarwanda version**, at minimum for the household-facing pages.
- Structured data (`LocalBusiness`, `Product`, `FAQPage`) once the content is stable.

---

## Decisions made (21 Nov 2026)

| # | Question | Decision |
|---|---|---|
| 1 | SHA Peak price — 18,761,400 or 16,645,600? | **18,761,400** (confirmed 21 Nov 2026). |
| 2 | Which tariff to publish? | **RWF 400/kWh.** Do not print 376 anywhere. |
| 3 | Which clients can be named? | **None yet.** Anonymise every case study. |
| 4 | Use the counter statistics? | **No** — real but too small. Hide the section, keep the component. |
| 5 | Redesign or extend? | **Extend.** Existing design stays; new sections match the brand. |
| 6 | CRM endpoint for the form? | **Not yet.** Email for now, behind a swappable adapter. |

Still to confirm: the brand hex values against the master brand file.