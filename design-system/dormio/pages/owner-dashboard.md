# Owner Dashboard Page — route `/owner/dashboard`

Purpose / primary action: Operator command console for property owners and institution wardens to monitor bed occupancy, approve pending UTR payments, resolve resident complaints, and manage notices.
Audience: Hostel/PG owners, mess managers, and institutional staff.

## UI UX Pro Max evidence

Commands run (exact) and the result chosen from each:

- `python3 .agents/skills/ui-ux-pro-max/scripts/search.py "hostel owner operator dashboard kpi occupancy revenue action queue analytics" --design-system --persist -p "Dormio" --page "owner-dashboard"` → Pattern: KPI Strip + Action Queue & Operational Data Table; Style: Data-Dense Clean Flat; Primary `#EA580C`, Payment Teal `#0D9488`, Slate `#0F172A`.
- `python3 .agents/skills/ui-ux-pro-max/scripts/search.py "search filters map listing cards" --domain ux` → Action items prioritized at top; no clutter; clear numbers with trend cues; bulk action capability for payment approvals.
- `python3 .agents/skills/ui-ux-pro-max/scripts/search.py "hostel accommodation map" --domain icons` → Phosphor Icons: `Users`, `Bed`, `CurrencyInr`, `CheckCircle`, `WarningOctagon`, `ChartLineUp`, `Plus`, `Gear`.
- `python3 .agents/skills/ui-ux-pro-max/scripts/search.py "dashboard" --stack nextjs` → Server Component data fetching with dynamic KPI aggregation; client table with instant status filters.

Selection rationale:
Owners and managers want instant clarity over cash flow and vacant beds. This dashboard puts critical pending tasks (unverified payments, unassigned complaints, pending outpasses) right at the top in an "Action Queue" rather than burying them in secondary menus.

## Composition

Pattern: Top KPI Strip + High-Priority Action Queue + Occupancy Floor Matrix.
How it differs from neighbouring pages (`/guard/scan` and `/`): High-density administrative workspace with interactive data tables, status tabs, and bulk approval actions.
Signature element: "Action Queue Strip" highlighting count of tasks needing owner attention today (e.g. "3 UTR payments to verify · 2 maintenance issues").

### Layout sketch 360px:

```
[Header: Dormio Operator · Property Selector · Profile]
[KPI Carousel (Scroll horizontal):
  - Occupancy: 94% (48/51 beds filled)
  - Collected this Month: ₹3,82,500
  - Pending Dues: ₹25,500 (3 residents)
  - Open Complaints: 2]
[Urgent Action Queue Banner:
  - 3 UTR payments submitted by residents waiting for your match [ Review Now ]]
[Tab Strip: (Overview) (Residents) (Rooms) (Complaints)]
[Recent Activity Log Stream]
[Bottom Operator Bar: [ + Add Resident ] [ Broadcast Notice ]]
```

### Layout sketch 768px:

```
[Sidebar (collapsible) + Main Content Area]:
[Top KPI Strip (4-card grid: Occupancy, Monthly Revenue, Pending UTRs, Open Issues)]
[Action Queue Card (highlighted with warm amber border)]:
  - Pending UTR Approvals list with 1-click [ Verify ] or [ Reject ]
[Room Occupancy Overview (Floor-wise mini grid)]
[Recent Gate Entries & Outpass Alerts]
```

### Layout sketch 1280px:

```
[Desktop Layout: Left Navigation Sidebar (240px) + Main Content (flex-1)]:
[Header: Property Name, Quick Search, "Create Listing", Notification Bell, User Menu]
[Top KPI Row: 4 Metric Cards with trend pills and direct shortcut links]
[Main 2-Column Grid (65% / 35%)]:
  - Left Column (65%):
    - Priority Action Queue: Pending payment verifications table with resident name, room, amount, UTR, and [Verify] action
    - Active Maintenance Complaints with severity tags & assigned staff
  - Right Column (35%):
    - Bed Occupancy Breakdown by Room Type (Single / Double / Triple)
    - Quick Broadcast Notice composer
    - Quick Shortcuts: Room Allotment, Mess Token Scanner, Export Reports
```

## Components used and new components needed

- Used: `TrustBadges`, `PriceTag`, `AvailabilityBadge`
- New components: `KpiStrip`, `KpiCard`, `ActionQueueTable`, `FloorOccupancyMatrix`, `NoticeComposerDrawer`

## States

- **Loading:** Skeleton metric cards and animated table row placeholders.
- **Empty:** "All clear! Zero pending approvals in the action queue."
- **Error:** "Could not load dashboard statistics. Try refreshing."
- **Offline:** "Showing cached operational data from last sync."

## Copy deck

- Welcome: "{OwnerName}'s Operator Console"
- KPI Labels: "Bed Occupancy", "Collected Rent (Oct)", "Pending Payments", "Open Tickets"
- Action Header: "Action Needed Today"
- Verify Button: "Mark Verified (UTR Matched)"

## Imagery needs

- Clean SVG data visualizations (simple bar progress indicators) and resident thumbnail avatars.

## Screenshot review log

- Round 1: Planned for 360px, 768px, 1280px responsive review.
