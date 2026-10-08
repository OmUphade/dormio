# Search Page — route `/search`

Purpose / primary action: Filter, compare, and browse hostels, PGs, and messes by location, budget, room sharing, gender, and amenities.
Audience: Seekers actively shortlisting places to visit or book.

## UI UX Pro Max evidence

Commands run (exact) and the result chosen from each:

- `python3 .agents/skills/ui-ux-pro-max/scripts/search.py "search filters map listing cards split view area geolocation" --design-system --persist -p "Dormio" --page "search"` → Pattern: Split-Screen Map + Result Stream; Style: Data-Responsive Flat; Colors: Slate (`#0F172A`), Terracotta (`#EA580C`), Action Blue (`#2563EB`).
- `python3 .agents/skills/ui-ux-pro-max/scripts/search.py "search filters map listing cards" --domain ux` → Dead-end protection: show alternative suggestions and expanded radius if 0 matches; provide debounced instant filtering.
- `python3 .agents/skills/ui-ux-pro-max/scripts/search.py "hostel accommodation map" --domain icons` → Phosphor Icons: `SlidersHorizontal`, `MapTrifold`, `ListBullets`, `MapPin`, `CurrencyInr`, `Users`.
- `python3 .agents/skills/ui-ux-pro-max/scripts/search.py "search" --stack nextjs` → URL search parameters for state synchronization (shareable filter URLs), ISR/SSR initial render, dynamic MapLibre component lazy loaded with SSR disabled.

Selection rationale:
Search requires fast comparison without pagination reload. The split-screen desktop layout pairs an interactive map with listing cards, while mobile features an ergonomic bottom-floating "Map / List" toggle pill.

## Composition

Pattern: Split-Screen Map & Results Feed (Desktop) / Toggle Sheet (Mobile).
How it differs from neighbouring pages (`/` and `/listings/[id]`): Unlike Home's editorial vertical stack and Listing Detail's single-property showcase, Search is a high-utility dual-pane comparison workspace with sticky filter bar and real-time map bounds.
Signature element: Sticky Filter Rail with active badge counts + Floating Map/List pill toggle on mobile.

### Layout sketch 360px:

```
[Sticky Header: Area Search Input + Filter Button with active count]
[Horizontal Scroll Filter Chips: Price < ₹8k · Boys · Double Sharing · Mess Attached]
[Results Header: "42 stays near COEP Pune" + Sort Dropdown]
[Listing Card Stream: (Photo Carousel, Title, Rent/mo, Distance, Gender, CCTV badge)]
[Floating Bottom Pill: [ 🗺️ View Map ] (sticky center-bottom)]
```

### Layout sketch 768px:

```
[Header with compact search bar + Auth]
[Sticky Filter Strip: All filters visible as pills with dropdowns]
[Dual-Pane: Left 55% scrollable listing cards | Right 45% sticky MapLibre view]
[Listing Card: Horizontal variant with 120px thumb, title, price, badges, Quick Enquire]
```

### Layout sketch 1280px:

```
[Header: Global navigation + Quick search]
[Secondary Filter Bar: Full filter parameters (Budget, Gender, Sharing, AC, Food, Curfew)]
[Split Container (calc(100vh - 120px))]:
  - Left Pane (60%): Scrollable list of rich horizontal ListingCards, total count, pagination/cursor
  - Right Pane (40%): Sticky interactive MapLibre map with price pins & hover highlight synchronization
```

## Components used and new components needed

- Used: `FilterBar`, `ListingCard`, `PriceTag`, `AvailabilityBadge`, `TrustBadges`
- New components: `MapView`, `MapPin`, `FilterSheet`, `ViewTogglePill`

## States

- **Loading:** Skeleton listing cards (pulsing placeholders for photo, title, price tag).
- **Empty:** "No stays found matching these filters." Clear CTA: "Reset filters" or "Increase search radius to 5km".
- **Error:** "Unable to load map data. Showing listings in text view." Retry button.
- **Offline:** "Showing cached search results for this area."

## Copy deck

- Header: "Stays & Messes in {Area}"
- Empty State: "We couldn't find any stays under ₹{MaxPrice} in this locality. Try adjusting your budget or exploring nearby areas."
- Filter Labels: "Budget (₹)", "Gender (Boys/Girls/Co-ed)", "Sharing (1/2/3/4)", "Attached Mess", "CCTV Security"

## Imagery needs

- Optimized thumbnail webp photos for each listing card with explicit dimensions (320x200px) and lazy loading.

## Screenshot review log

- Round 1: Captured and reviewed at 360px, 768px, 1280px, and mobile map toggle state. Verified split-screen desktop dual-pane (stream + synchronized map with price pins), both Hostel/PG and Mess card variants, filter rail with active counters, empty/loading/error/offline state switchers, and mobile ViewTogglePill. 100% token adherence, zero gradients, zero black. Passed all visual criteria.
