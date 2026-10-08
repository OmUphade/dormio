# Home Page — route `/`

Purpose / primary action: Area-based discovery for hostels, PGs, and messes with instant search by college or locality.
Audience: Seekers (students, working professionals, and parents looking for reliable housing).

## UI UX Pro Max evidence

Commands run (exact) and the result chosen from each:

- `python3 .agents/skills/ui-ux-pro-max/scripts/search.py "student accommodation hostel pg mess area search discovery hero trust" --design-system --persist -p "Dormio" --page "home"` → Pattern: Hero-Centric Design + Trust proof; Style: Vibrant & Block-based; Palette: Terracotta (`#EA580C`), Tangerine (`#F97316`), Action Blue (`#2563EB`), Linen Canvas (`#FFF7ED`).
- `python3 .agents/skills/ui-ux-pro-max/scripts/search.py "search filters map listing cards" --domain ux` → Autocomplete predictions on type; No results dead-end protection with instant fallback suggestions.
- `python3 .agents/skills/ui-ux-pro-max/scripts/search.py "flat" --domain style` → Flat Design: Clean 2D blocks, high color contrast, no gradients, no artificial blur.
- `python3 .agents/skills/ui-ux-pro-max/scripts/search.py "modern" --domain typography` → Heading Font: `Outfit` (600/700); Body Font: `Plus Jakarta Sans` (400/500).
- `python3 .agents/skills/ui-ux-pro-max/scripts/search.py "hostel accommodation map" --domain icons` → Phosphor Icons: `MapPin`, `MapTrifold`, `House`, `ForkKnife`, `ShieldCheck`.
- `python3 .agents/skills/ui-ux-pro-max/scripts/search.py "marketplace" --stack nextjs` → SSR for landing metadata, Server Components for featured area tiles, client search bar with debounced autocomplete.

Selection rationale:
Warm Indian student accommodation brand. Eliminates cold corporate layouts. The hero search bar dominates the initial viewport to achieve G1 (<3 min from landing to shortlist). Uses flat warm fills and zero gradients per `docs/Design.md` §3.

## Composition

Pattern: Hero-Centric + Trust + Featured Local Areas.
How it differs from neighbouring page (`/search`): Home uses an expansive centered hero, horizontal locality exploration tiles, and editorial proof strips, whereas `/search` uses a high-density two-pane split with interactive map and listing stream.
Signature element: Warm Arched Hero frame (`--radius-arch`) containing real photography and prominent pill search bar with quick category chips (Hostels · PGs · Messes).

### Layout sketch 360px:

```
[Header: Dormio logo + Auth button]
[Warm Hero Arch Banner: "Find your hostel, PG or mess near college"]
[Pill Search Bar: Area, College, or Landmark + Search Icon]
[Category Chips: (All) (Hostels) (PGs) (Messes)]
[Trust Strip: 100% Owner Verified · Direct UPI · Real Reviews]
[Section: Popular Areas in Pune / Kota (Horizontal scroll cards)]
[Section: Verified Reviews Carousel]
[Footer: Area links + Owner registration CTA]
```

### Layout sketch 768px:

```
[Header: Dormio logo + Category nav links + "List Property" + Login]
[Hero Section: 2-column (Headline & Search Bar left | Arched Photo Collage right)]
[Category Filter Bar (Pill buttons)]
[3-column Grid: Verified Student Stays & Messes]
[Proof Metrics Strip: 500+ Verified Stays · 12k Residents]
[Footer: 4-column link directory]
```

### Layout sketch 1280px:

```
[Header: Fixed bar with Logo, Area Selector, Navigation, Owner Portal CTA, Profile]
[Hero Container: Full-width warm canvas, prominent search card with auto-suggest dropdown, right visual arch]
[Curated Area Clusters: 4-column responsive grid with listing counts]
[Why Dormio Editorial Strip: Zero broker fees, direct UPI to owner, resident app included]
[Verified Resident Testimonials: 3-column card block with verified-stay badge]
[Footer]
```

## Components used and new components needed

- Used: `AreaSearchBar`, `CategoryTabs`, `AreaTile`, `TrustBadges`
- New components: `TestimonialCarousel`, `HeroBanner`

## States

- **Loading:** Skeleton placeholder for search input and animated skeleton cards for area tiles.
- **Empty:** When no listings exist in search dropdown, show "No properties found in [Area]. Explore popular nearby colleges:" with pill shortcuts.
- **Error:** Warm error alert banner with retry action for geocoding service failure.
- **Offline:** Service worker cached shell with "Showing saved search history (Offline)" banner.

## Copy deck

- Hero H1: "Find a place you trust in minutes. Live with zero paperwork."
- Subhead: "Verified student hostels, PGs, and daily meal messes near your campus."
- Search Placeholder: "Search by college, area, or landmark (e.g. FC Road, Kothrud)..."
- Trust Badges: "100% Verified Owners" · "Direct UPI to Owner" · "Resident App Included"

## Imagery needs

- High-quality, authentic photos of student rooms, clean study desks, and hygienic dining messes. No stock models with fake smiles.

## Screenshot review log

- Round 1: Captured at 360px, 768px, 1280px viewports. Found sticky header duplication in full-page stitch. Fixed Navbar container layout.
- Round 2: Re-captured and reviewed at 360px, 768px, 1280px. Verified all tokens, Outfit & Plus Jakarta Sans typography, Terracotta brand palette, Arch shape language, responsive 1/2/4 column layouts, real copy and imagery, and state switchers. Passed all visual criteria.
