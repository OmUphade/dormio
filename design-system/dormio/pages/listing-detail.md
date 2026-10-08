# Listing Detail Page — route `/listings/[id]`

Purpose / primary action: Present comprehensive property details, room/bed options, amenities, house rules, and enable booking or visit inquiry.
Audience: Seekers ready to make an enquiry or book a bed.

## UI UX Pro Max evidence

Commands run (exact) and the result chosen from each:

- `python3 .agents/skills/ui-ux-pro-max/scripts/search.py "hostel accommodation listing detail gallery amenities rent room sticky booking" --design-system --persist -p "Dormio" --page "listing-detail"` → Pattern: Gallery Showcase + Sticky Booking Panel; Style: Clean Architectural Block; Colors: Primary `#EA580C`, Accent `#2563EB`, Surface `#FFFFFF`.
- `python3 .agents/skills/ui-ux-pro-max/scripts/search.py "forms" --domain ux` → Clear breakdown of all costs upfront; single primary booking action; inline inquiry validation.
- `python3 .agents/skills/ui-ux-pro-max/scripts/search.py "hostel accommodation map" --domain icons` → Lucide/Phosphor: `Bed`, `Wifi`, `ShieldCheck`, `Clock`, `ForkKnife`, `Sparkles`, `ShareNetwork`, `Heart`.
- `python3 .agents/skills/ui-ux-pro-max/scripts/search.py "gallery" --stack nextjs` → Next.js Image with blur placeholder and aspect-ratio box; sticky desktop panel with CSS `sticky top-24`.

Selection rationale:
Hostel seekers decide based on photo authenticity, actual room sharing pricing, and rules (curfew/visitors). High transparency build: zero hidden fees, verified stay reviews only, and immediate owner response indicator.

## Composition

Pattern: Image-Led Architectural Showcase + Sticky Reservation Sidebar.
How it differs from neighbouring pages (`/search` and `/messes/[id]`): Deep single-property view with 5-photo collage grid, tabs for Rooms/Amenities/Rules/Reviews, and a sticky pricing card with direct UPI payment details.
Signature element: Arched 5-image photo collage with interactive lightbox + Floating bottom action bar on mobile.

### Layout sketch 360px:

```
[Header: Back button + Share + Favorite]
[Main Photo Carousel with counter: 1/12]
[Property Title + Area + Gender Badge + Verified Badge]
[Quick Stat Bar: ⭐ 4.6 (38 reviews) · CCTV Active · 150m from metro]
[Sharing Options Selector: (Single ₹12k) (Double ₹8.5k) (Triple ₹6k)]
[Amenities Grid: 8 icons with text labels]
[House Rules & Curfew Accordion: Curfew 10:00 PM · Notice 30 days]
[Verified Resident Reviews Breakdown]
[Location & Nearby Colleges Map]
[Sticky Bottom Bar: ₹8,500/mo (Double Sharing) | [ Book / Enquire Now ]]
```

### Layout sketch 768px:

```
[Breadcrumbs: Home > Pune > Kothrud > Sunshine Boys Hostel]
[3-Photo Grid: 1 large left, 2 stacked right with "View all 14 photos"]
[2-Column Body: 65% Details & Amenities | 35% Sticky Booking Card]
[Sticky Card: Rent calculation, deposit amount, UPI verification note, "Schedule Visit" & "Book Now"]
```

### Layout sketch 1280px:

```
[Container max-w-7xl]:
[Breadcrumbs + Property Title + Address + Verified Badges]
[5-Photo Collage: 1 hero left (60%), 4 grid right (40%) with rounded-lg edges]
[Main Content 2-Column (68% / 32%)]:
  - Left: Description, Room types & Bed availability tables, Amenities matrix, CCTV & Safety details, Rules, Reviews
  - Right: Sticky Card (`top-24`) with price selector, deposit info, verified owner contact badge, instant inquiry form
```

## Components used and new components needed

- Used: `TrustBadges`, `PriceTag`, `AvailabilityBadge`, `RatingBreakdown`, `ReviewCard`
- New components: `PhotoCollageGallery`, `RoomTypeSelector`, `StickyBookingCard`, `RulesAccordion`

## States

- **Loading:** Skeleton image grid, text bars, and booking card placeholder.
- **Empty:** If reviews list is empty, show "Be the first verified resident to review Sunshine Hostel!"
- **Error:** "Listing not found or currently unlisted by owner." Link back to search.
- **Offline:** Cached listing details with "Offline mode - inquiries will be sent when connection restores" banner.

## Copy deck

- Title: "{Property Name} - {Kind} in {Area}"
- Booking CTA: "Enquire / Book Room"
- Visit CTA: "Schedule Free Visit"
- Transparency Note: "Direct UPI to Owner: Dormio charges ₹0 platform fee."

## Imagery needs

- High-res room photos (wide angle, natural lighting, bathroom, study room, dining hall).

## Screenshot review log

- Round 1 (2026-10-09):
  - 1280px (`design-system/dormio/screenshots/listing-detail/1280.png`): 5-photo mosaic layout with rounded corners; 68/32 split cleanly isolates details from the sticky booking panel; room type selector displays clear rent, deposit, and availability count; house rules feature curfew, notice, and attached dining mess; rating breakdown and verified resident reviews render authentically; zero gradients or forbidden black used.
  - 768px (`design-system/dormio/screenshots/listing-detail/768.png`): Responsive 2-column layout maintains 65/35 ratio; room cards stack cleanly with clear borders; sticky booking panel remains comfortably in view; typography and spacing adhere to MASTER.md tokens.
  - 360px (`design-system/dormio/screenshots/listing-detail/360.png`): Mobile photo carousel with navigation arrows and counter pill (1/5); single-column content stack with comfortable touch targets; bottom floating action bar with dynamic rent and Book/Enquire CTA ensures high conversion without obscuring content; zero horizontal scroll.
