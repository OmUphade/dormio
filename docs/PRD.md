# Product Requirements Document (PRD) — Dormio

**Version:** 0.3 | **Status:** Approved for build | **Budget:** ₹0 (100% free / open-source stack)
**Delivery:** Online website (public URL), installable as a PWA
**Build mode:** ~90–99% AI-built (Antigravity + GSD + UI UX Pro Max + Graphify + CodeRabbit), minimal human interaction

---

## 1. Product Overview

**Dormio is one place for everything around student and working-professional living: a marketplace to *find* a hostel, PG or mess, and an operating system to *live in and run* it.**

It is **not** a single-hostel management tool. It combines three concepts in one product:

| Concept | What it is | Examples |
|---|---|---|
| **1. Marketplace (discover)** | Anyone can search hostels, PGs and messes **by area**, compare, read ratings and reviews, see photos, rent, availability, rules and safety features, then enquire, book or subscribe | "PGs near my college under ₹8,000", "veg mess in this locality" |
| **2. Stay & subscription manager (live)** | Once someone books a hostel/PG or subscribes to a mess, they manage it inside Dormio: monthly rent, complaints, notices, outpass, QR entry, meal tokens, skip-meal | "Pay this month's rent", "raise a complaint", "show gate QR" |
| **3. Operator console (run)** | Owners list properties and run them: residents, rent tracking, security, entry/exit, mess operations, complaints, notices | Hostel/PG owner, mess owner, **colleges and institutions** running their own hostel + mess |

### Who is on the platform
- **Seekers / residents / subscribers** (students, working professionals, parents)
- **Property owners & managers** (hostel, PG, mess; individuals or businesses)
- **Institutions** (colleges, universities) running their own hostels and messes, optionally **not listed publicly**
- **Platform admins** (Dormio team) who verify listings and moderate

### Property kinds
| Kind | Description |
|---|---|
| **HOSTEL** | Multi-room, often institutional or larger; blocks/floors/rooms/beds |
| **PG** | Paying-guest accommodation; smaller, often owner-occupied building |
| **MESS** | Food service: standalone (any area) **or** linked to a hostel/PG as its in-house mess |

A person can hold several relationships at once (e.g., resident of a PG **and** subscriber of a different mess).

### Optional modules per property (feature flags)
Mess link, CCTV, visitors, outpass, AI assistant, reviews. Not every property has CCTV or a mess; a "CCTV-monitored" badge appears on the listing only when enabled. Feeds are never public.

---

## 2. Problem Statement

**Seekers**
1. Information is scattered across brokers, WhatsApp groups, and outdated websites; availability and rent are often wrong.
2. Hard to compare by area, budget, safety, food, and real resident ratings; fake listings and fake photos are common.
3. After moving in, there is no single place for rent, complaints, notices, or meals.

**Owners / operators**
4. Small hostels, PGs and messes have no digital presence and rely on word-of-mouth.
5. Rent is chased manually; complaints, entries and exits live in registers and WhatsApp.
6. Partial tools exist (booking only, or gate register only), so data is entered in several places.

**Institutions**
7. Hostel allotment, mess, security, and dues run on separate tools or paper, with no unified view.

**Market gap:** nobody combines *discovery + booking + daily living + operations* for **hostel, PG and mess** in one free platform. Existing chatbots in this space only answer FAQs; none take actions.

---

## 3. Vision, Goals, Non-Goals

**Vision:** *Find a place you trust in minutes, live there with zero paperwork, and let owners run it from their phone.*

### Goals
| # | Goal | Measure |
|---|---|---|
| G1 | Best free way to find a hostel/PG/mess in an area | Seeker can go from landing to a shortlist in < 3 minutes |
| G2 | Owners can list and be live fast | Listing wizard completed in < 15 min; approval < 24 h |
| G3 | Trustworthy marketplace | 100% of published listings owner-verified; reviews only from verified stays/subscriptions |
| G4 | One system for daily living and operations | Rent, complaints, notices, entry/exit, mess usable end-to-end |
| G5 | Fewer unpaid dues | ≥ 85% of rent paid by due date in pilot |
| G6 | Safer residents | 100% of gate events logged; parent alerts < 1 min where enabled |
| G7 | Zero running cost | Free tiers / self-hosted open source only |
| G8 | AI that acts, not just answers | ≥ 60% of resident requests resolved without staff; AI search concierge turns plain-language needs into filters |

### Non-Goals (v1)
- Native iOS/Android apps (PWA instead).
- Holding or moving money: **Dormio is not a payment aggregator.** UPI payments go directly to the owner's account.
- Public CCTV viewing; continuous video storage.
- Face recognition (post-MVP, needs legal review).
- Languages other than English at launch (i18n-ready).
- Broker/agent marketplace, roommate social network, furniture/rental add-ons.
- Taking commissions or paid promotion in v1 (kept in backlog).

---

## 4. Users and Roles

### Platform-level
| Role | Description |
|---|---|
| **Guest** | Not logged in. Can search and view listings; must log in to enquire, save, book, or see contact details |
| **User** | Any registered person (seeker, resident, subscriber, parent). One account, many relationships |
| **Platform Admin / Moderator** | Verifies owners and listings, moderates reviews/reports, sees platform analytics |

### Organization-level
| Role | Description |
|---|---|
| **Org Owner** | Individual, business, or **Institution** account that owns properties |

### Property-level (via `property_members`)
| Role | Description |
|---|---|
| **Owner / Manager / Warden** | Runs the property: listing, allocations, approvals, notices |
| **Accountant** | Rent verification, receipts, reports |
| **Mess Manager** | Menu, plans, meal scans, feedback |
| **Security Guard** | Gate scan, visitors, incidents, CCTV (if enabled) |
| **Maintenance Staff** | Assigned complaints |
| **Resident** | Lives in a hostel/PG (stay manager) |
| **Subscriber** | Has a mess plan |
| **Guardian** | Linked to a resident: alerts, dues, leave approvals |

Primary UX persona: **seeker or resident on a mid-range Android phone** with a slow network. Owner persona: **non-technical owner using a phone**.

---

## 5. Core Features

Priority: **P0** = MVP, **P1** = fast-follow, **P2** = later.

### 5.1 Discovery (marketplace)
| ID | Feature | Pri |
|---|---|---|
| DS-01 | **Home page**: area search, quick category tabs (Hostel / PG / Mess), featured and trending areas, how it works, trust signals | P0 |
| DS-02 | **Area-based search**: city/locality autocomplete, "near me", landmark or college name, radius | P0 |
| DS-03 | **Filters and sort**: kind, rent range, gender, sharing type (single/double/triple), AC, food included, veg/non-veg (mess), amenities, rating, verified only, available-from date, CCTV-monitored; sort by relevance/price/distance/rating | P0 |
| DS-04 | **Listing cards** (hostel/PG variant and mess variant): cover photo, name, locality, distance, rent-from, rating, availability badge, trust badges | P0 |
| DS-05 | **Map view** with clustered pins, "search this area", list/map sync | P1 |
| DS-06 | **Detail page**: gallery, room types and rent, availability (beds left / next vacancy), amenities, rules, safety (CCTV, guard, curfew), mess info, location + map, nearby (college/metro), reviews with rating breakdown, owner info (verified), sticky Book/Enquire panel | P0 |
| DS-07 | Mess detail page: sample weekly menu, timings, plans and prices, cuisine, veg/non-veg, hygiene info, trial meal option, reviews | P0 |
| DS-08 | **Compare** up to 3 listings side by side | P1 |
| DS-09 | **Shortlist / saved** listings and saved searches | P1 |
| DS-10 | Enquiry / contact form; contact details revealed after login; lead goes to owner inbox | P0 |
| DS-11 | Schedule-a-visit request | P1 |
| DS-12 | SEO landing pages per area (`/pg-in/<city>/<locality>`), sitemap, structured data, social share cards | P1 |
| DS-13 | AI search concierge: "PG for girls near X under ₹9k with food" → filters + ranked results + explanation | P1 |

### 5.2 Owner / operator onboarding and listing
| ID | Feature | Pri |
|---|---|---|
| OW-01 | "List your property" flow: create owner/org account (individual, business, institution) | P0 |
| OW-02 | Owner verification: KYC docs + property proof upload; admin approves | P0 |
| OW-03 | **Listing wizard** for hostel/PG: basics, location pin, photos, rooms/beds, rent and deposit, amenities, rules, curfew, UPI ID, feature flags | P0 |
| OW-04 | **Mess listing wizard**: cuisine, veg/non-veg, timings, plans, sample menu, photos, service area, hygiene info | P0 |
| OW-05 | Draft → pending review → approved/published workflow with preview | P0 |
| OW-06 | Unit and bed management: types, rent, availability, vacancy dates; "last updated" freshness indicator | P0 |
| OW-07 | Photo pipeline: compress to WebP, reorder, cover image, thumbnails | P0 |
| OW-08 | Lead inbox + enquiry follow-up statuses | P0 |
| OW-09 | **Institution workspace**: hidden from public search, bulk resident import (CSV), allotment lists, own branding | P1 |
| OW-10 | Multi-property owner dashboard (switch between properties) | P1 |

### 5.3 Booking and stay lifecycle
| ID | Feature | Pri |
|---|---|---|
| BK-01 | Booking request: choose unit/bed, move-in date, details, token amount | P0 |
| BK-02 | Owner approve / waitlist / reject with reason | P0 |
| BK-03 | Bed allocation, agreement PDF, check-in checklist | P0 |
| BK-04 | **My Stay hub** for residents: current stay, rent due, notices, complaints, QR pass, rules | P0 |
| BK-05 | Transfer, notice period, vacate/check-out, deposit refund workflow | P1 |
| BK-06 | Cancellation and refund policy rules per property | P1 |
| BK-07 | Booking history and rebook | P2 |
| BK-08 | Roommate matching (AI) | P2 |

### 5.4 Rent and payments (UPI-direct)
| ID | Feature | Pri |
|---|---|---|
| PY-01 | Fee structures, recurring monthly rent invoices, deposits | P0 |
| PY-02 | **UPI payments, zero fees**: each owner sets own UPI ID; QR + "Pay with UPI app" link; resident submits UTR (+ optional screenshot); staff verify; duplicate-UTR protection | P0 |
| PY-03 | Offline payment recording (cash/bank) | P0 |
| PY-04 | PDF receipts | P0 |
| PY-05 | Dues dashboard, reminders, late-fee rules | P1 |
| PY-06 | Bank-statement CSV import → auto-match by UTR/amount | P1 |
| PY-07 | Financial reports + CSV export | P1 |
| PY-08 | Gateway adapter (Razorpay/Cashfree) for owners who want auto-confirmation | P2 |

### 5.5 Mess (marketplace + operations)
| ID | Feature | Pri |
|---|---|---|
| MS-01 | Weekly menu (veg/non-veg/special), meal timings | P0 |
| MS-02 | Plans: monthly, per-meal count, day pass, trial meal | P0 |
| MS-03 | Subscribe and pay (UPI) from the mess page or from a linked hostel/PG | P0 |
| MS-04 | Coupons / QR meal tokens; guest meals | P0 |
| MS-05 | Meal scan at counter (deduct, prevent duplicates) | P0 |
| MS-06 | Skip-meal with cutoff and rebate | P1 |
| MS-07 | Menu feedback and ratings per meal; mess reviews | P1 |
| MS-08 | Mess dashboard: counts, revenue, feedback, wastage | P1 |
| MS-09 | Mess notices and special-meal announcements | P0 |
| MS-10 | Inventory | P2 |

### 5.6 Communication and complaints
| ID | Feature | Pri |
|---|---|---|
| CM-01 | Notice board with audience targeting (property/block/floor/role) | P0 |
| CM-02 | Circulars with read-acknowledgment | P0 |
| CM-03 | Emergency alerts (broadcast, banner, acknowledge) | P0 |
| CM-04 | Complaints: create with photos, categories, priority; track | P0 |
| CM-05 | Complaint workflow: assign, SLA timers, escalation, comments, feedback, reopen | P0 |
| CM-06 | Maintenance staff view | P1 |
| CM-07 | Outpass / leave with warden and guardian approval | P1 |
| CM-08 | Notifications: in-app, email, web push | P0 / P1 |

### 5.7 Security, entry/exit, CCTV (all per property)
| ID | Feature | Pri |
|---|---|---|
| SC-01 | Gate entry/exit by rotating QR scan | P0 |
| SC-02 | Curfew rules and late-entry flags | P0 |
| SC-03 | Visitor pre-registration and gate approval | P0 |
| SC-04 | Guardian notification on entry/exit | P1 |
| SC-05 | Guard PWA (large buttons, offline queue) | P1 |
| SC-06 | **CCTV optional module**: camera registry + "CCTV-monitored" badge; never public | P0 |
| SC-07 | Live view via on-site edge connector (go2rtc + tunnel), audit-logged | P1 |
| SC-08 | Motion/person events from NVR (Frigate) linked to incidents | P2 |
| SC-09 | Incident / theft reporting with evidence | P0 |
| SC-10 | Lost and found, patrol check-ins | P2 |

### 5.8 Reviews, ratings, trust and safety
| ID | Feature | Pri |
|---|---|---|
| TR-01 | **Verified reviews**: only residents/subscribers with a real stay/subscription; rating dimensions (cleanliness, safety, food, value, owner); mess: taste, hygiene, quantity, value | P0 |
| TR-02 | Owner reply to reviews | P1 |
| TR-03 | Verified-owner badge, verified-listing badge, trust score | P0 |
| TR-04 | Report listing / report review; moderation queue | P0 |
| TR-05 | Contact detail masking, enquiry rate limits, spam checks | P0 |
| TR-06 | Fake-review and stale-listing detection (rules, then AI) | P2 |
| TR-07 | Platform admin tools: verification queue, takedown, audit | P0 |

### 5.9 Dashboards
| ID | Feature | Pri |
|---|---|---|
| DB-01 | Owner dashboard: occupancy, rent collected/due, leads, complaints | P1 |
| DB-02 | Warden/manager dashboard | P1 |
| DB-03 | Institution dashboard and reports | P1 |
| DB-04 | Platform admin dashboard | P1 |
| DB-05 | Guardian portal | P1 |

### 5.10 AI features ("beyond a chatbot")
| ID | Feature | Pri |
|---|---|---|
| AI-01 | **AI search concierge** for seekers (natural language → filters, ranking, explanation, comparison) | P1 |
| AI-02 | **Agentic assistant** for residents: answers from property rules (RAG) and performs actions (raise complaint, check dues, skip meal, outpass) **only after explicit confirmation** | P0 (Q&A) / P1 (actions) |
| AI-03 | **Listing assistant for owners**: write descriptions, flag missing info, suggest rent from nearby listings | P1 |
| AI-04 | **Review summaries** (pros/cons) per listing | P1 |
| AI-05 | Complaint auto-triage (category, priority, duplicates, assignee) | P1 |
| AI-06 | Notice drafting, summarization (English; Hinglish input tolerated) | P1 |
| AI-07 | Mess demand forecasting and waste insights | P2 |
| AI-08 | Gate anomaly detection | P2 |
| AI-09 | Natural-language analytics for owners via whitelisted read-only report tools | P2 |
| AI-10 | Voice complaints (speech-to-text) | P2 |

**AI principles:** human confirmation on every write action; never expose other users' data; log every AI action; local-first models (Ollama) with free-tier cloud fallback for non-personal content only; label AI output.

---

## 6. Key User Journeys

1. **Seeker → Resident:** open Dormio → search "PG near <college>" → filter → map/compare → detail page → enquire or book → owner approves → pays token via UPI → bed allotted → My Stay hub.
2. **Mess seeker → Subscriber:** search mess in area → view sample menu + reviews → trial meal or plan → UPI pay → QR token → scan at counter → leave a rating.
3. **Owner:** sign up → verify → listing wizard → published → receives enquiries → approves booking → tracks rent → handles complaints.
4. **Institution admin:** create institution workspace → import student list → allot beds → run mess, gate, notices (listing hidden).
5. **Guard:** scan QR → allow/block/late → log visitor → report incident.
6. **Platform admin:** review verification queue → approve/reject listings → handle reports.

---

## 7. Marketplace Dynamics

- **Cold start:** launch in **one city/area cluster**; the owner (you) seeds listings by onboarding hostels/PGs/messes you know; free listing and free management for all owners in v1 (value for owners is the operations tools, which also keeps listings fresh).
- **Freshness:** availability must stay current. Owners are nudged to confirm vacancy every 7 days; stale listings are down-ranked and labeled.
- **Trust:** verified owners, verified-stay reviews, visible report button, no unverified contact details.
- **Monetization (backlog, not v1):** featured listings, lead packs, owner subscriptions, mess ad slots, commission on bookings. All via UPI to Dormio only after v1 proves demand.
- **Local compliance (owner/legal task):** many cities require PG/hostel owners to submit tenant details to the police or local authority; evaluate an export feature after legal advice.

---

## 8. Non-Functional Requirements

| Area | Requirement |
|---|---|
| **Performance** | Search/home LCP < 2.5 s on 4G; search API p95 < 500 ms; listing page server-rendered and cacheable |
| **SEO** | SSR/ISR for public pages, sitemap, structured data, clean URLs |
| **Scalability** | v1: 500 properties, 20,000 users on one free VM |
| **Availability** | Best effort ~99%; daily DB backups |
| **Security** | OWASP Top 10; argon2; httpOnly cookies; rate limits; strict tenant (property/org) isolation; public endpoints expose only public listing fields |
| **Privacy** | DPDP Act 2023: consent, minimization, retention, export/delete; guardian consent for minors |
| **Accessibility** | WCAG 2.1 AA |
| **Usability** | Mobile-first; works at 360 px; owner flows usable by non-technical people |
| **Localization** | English UI (i18n-ready); INR; IST |
| **Maintainability** | JavaScript with JSDoc + Zod runtime validation; tests on money/permissions/search; documented modules |
| **Design quality** | All UI produced through the UI UX Pro Max workflow (see `rules.md` §12 and `Design.md`); automated UI rule checks |

---

## 9. Constraints and Assumptions

- Zero budget: free tiers / open-source only; free OSM-based maps and geocoding with caching (respect usage policies, or self-host Photon later).
- Each owner provides their own UPI ID (merchant/current-account VPA preferred).
- Cameras and NVRs are owned and managed by the hostel; Dormio connects through an on-site connector.
- Users have smartphones with modern browsers.

## 10. Risks and Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Marketplace cold start (no supply/demand) | High | Single-area launch, owner-seeded listings, free tools for owners, SEO pages |
| Fake or stale listings | High | Owner KYC + admin approval, freshness nudges, report button, down-ranking |
| Fake reviews | High | Verified-stay-only reviews, rate limits, moderation, detection rules |
| UPI fraud (fake screenshots, reused UTR) | High | UTR required and unique; staff verification; statement reconciliation; no auto-paid from screenshot |
| Free geocoding/map limits | Medium | Cache results, debounce, attribution, switch to self-hosted Photon/Nominatim if needed |
| Scope too large | High | Strict phases; MVP slicing; AI agents follow `task.md` |
| AI design looks generic | High | Mandatory UI UX Pro Max gate, anti-pattern bans, screenshot review |
| AI takes wrong action | High | Confirmation step, RBAC at tool layer, audit log, evals |
| Privacy/legal (CCTV, minors, KYC) | High | Metadata-only CCTV, consent flows, retention policy, legal review before launch |

## 11. Release Plan

| Release | Contents | Phases (task.md) |
|---|---|---|
| **Alpha: "Find"** | Marketplace live: owner onboarding, listings, search, detail pages, enquiries | 1–5 |
| **Beta: "Live"** | Mess marketplace, booking, My Stay, UPI rent, notices, complaints, gate QR, reviews | 6–11 (core items) |
| **v1.0: "Run"** | Dashboards, institution workspace, AI concierge and agentic actions, CCTV live view, PWA | 12–15 |
| **v1.x** | Forecasting, anomaly detection, NL analytics, voice, monetization experiments | Backlog |

## 12. Success Metrics (Pilot)

- ≥ 30 verified properties live (hostels, PGs, messes) in the launch area within 4 weeks.
- ≥ 500 monthly unique seekers; ≥ 8% search-to-enquiry conversion.
- ≥ 70% weekly-active residents in onboarded properties; ≥ 85% rent paid on time.
- Complaint median resolution time down ≥ 40%.
- 0 confirmed fake listings live > 24 h; 0 harmful AI actions in audit sample.

## 13. Resolved Decisions (owner)

| # | Decision |
|---|---|
| 1 | Name: **Dormio** |
| 2 | Scope: marketplace **plus** stay/subscription manager **plus** owner/institution console, for hostels, PGs and messes |
| 3 | Serves commercial owners and institutions; per-property settings and feature flags handle differences |
| 4 | Payments: **UPI-direct**, free, verified by staff; no gateway in MVP |
| 5 | CCTV: optional per property; badge on listing; never public; managed by the property |
| 6 | Language: English only (i18n-ready) |
| 7 | Hosting: free online website; see architecture |
| 8 | UI: **entire UI must go through UI UX Pro Max** workflow; no agent-invented designs |
| 9 | Build: ~90–99% AI-built with minimal human interaction |

Remaining open items: `memory.md` §7.

## 14. Glossary

**Property:** a hostel, PG, or mess managed in Dormio. **Listing:** the public profile of a property. **Org:** owner account (individual, business, institution). **UPI / VPA / UTR:** Indian instant-payment system / UPI ID / transaction reference. **RAG:** retrieval-augmented generation. **NVR:** network video recorder. **PG:** paying guest accommodation. **DPDP:** Digital Personal Data Protection Act 2023.
