# My Stay Page — route `/stay`

Purpose / primary action: Resident daily command center for gate pass QR, upcoming rent status, mess menu quick glance, digital notices, and raising complaints.
Audience: Current residents staying in a hostel/PG or subscribers of a mess.

## UI UX Pro Max evidence

Commands run (exact) and the result chosen from each:

- `python3 .agents/skills/ui-ux-pro-max/scripts/search.py "resident student stay manager qr pass gate pass notices complaints quick access" --design-system --persist -p "Dormio" --page "my-stay"` → Pattern: Card Deck Command Center; Style: Clean Daily Utility; Primary `#EA580C`, Payment Teal `#0D9488`, Canvas `#FFF7ED`.
- `python3 .agents/skills/ui-ux-pro-max/scripts/search.py "search filters map listing cards" --domain ux` → High-priority glanceable actions above fold; one-tap access to gate pass; zero latency.
- `python3 .agents/skills/ui-ux-pro-max/scripts/search.py "hostel accommodation map" --domain icons` → Phosphor Icons: `QrCode`, `Receipt`, `WarningCircle`, `ForkKnife`, `Bell`, `DoorOpen`, `ChatCircleDots`.
- `python3 .agents/skills/ui-ux-pro-max/scripts/search.py "dashboard" --stack nextjs` → Next.js App Router route group `(stay)` with bottom tab bar navigation; optimistic complaint mutation.

Selection rationale:
Residents open this app daily at the entry gate, dining hall, or when rent is due. Requires instant readability under sunlight and simple card blocks with quick taps instead of complex menus.

## Composition

Pattern: Resident Card Deck Hub with Quick QR Action Drawer.
How it differs from neighbouring pages (`/owner/properties/new` and `/stay/rent`): My Stay is a mobile-first daily portal centered on identity, digital gate token, and active stay alerts, while `/stay/rent` is a detailed financial transaction ledger.
Signature element: Arched Resident ID Card with live rotating QR Gate Token (`--radius-arch`) and quick one-tap actions.

### Layout sketch 360px:

```
[Header: Dormio Stay · Property Switcher (Sunshine Boys Hostel) · Notifications]
[Resident Identity Card (Arch Frame):
  - Photo + Omkar Uphade · Room 304, Bed B
  - [ Show Gate QR Pass ] (Prominent action button)]
[Urgent Alert Banner (if rent pending or notice posted):
  - "Rent for October due in 3 days: ₹8,500" [ Pay Now ]]
[Quick Action Grid (2x2):
  - [ 🎫 Gate Pass ]      [ 💳 Pay Rent ]
  - [ 🛠️ Raise Issue ]    [ 🍲 Today's Menu ]]
[Recent Notices Pin Board (Last 2 announcements)]
[Active Complaints Timeline Widget (e.g. "Geyser repair - In Progress")]
[Bottom Navigation Tabs: (Home) (Stay *) (Rent) (Mess) (Profile)]
```

### Layout sketch 768px:

```
[Header with Property Name and Room Info]
[2-Column Dashboard]:
  - Left Column (45%):
    - Arched Resident Profile Card with Active QR Code
    - Gate Status (In Hostel / Outpass Active)
    - Quick Action Buttons
  - Right Column (55%):
    - Rent Overview & Quick UPI Pay Card
    - Today's Mess Schedule
    - Digital Notice Board with unread badges
```

### Layout sketch 1280px:

```
[Desktop Layout max-w-6xl]:
[Top Profile Ribbon with Room Details and Warden Contact Info]
[3-Column Widget Grid]:
  - Column 1: Gate Pass Ticket & Outpass Requests
  - Column 2: Rent Due Summary, Recent Invoices, and Direct UPI Status
  - Column 3: Notice Board Feed & Quick Complaint Drawer Launcher
```

## Components used and new components needed

- Used: `TrustBadges`, `PriceTag`
- New components: `ResidentIdCard`, `QrPassModal`, `RentAlertBanner`, `QuickActionGrid`, `NoticeCard`, `ComplaintTimelineWidget`

## States

- **Loading:** Skeleton resident card, action chips, and notice cards.
- **Empty:** If no active notices, show "All quiet! No new notices from the warden."
- **Error:** "Failed to refresh stay status. Check network connection."
- **Offline:** Cached offline Gate QR with local validity stamp.

## Copy deck

- Greeting: "Welcome back, {ResidentName}"
- Room Tag: "Room {RoomNumber} · Bed {BedCode}"
- Gate CTA: "Show Gate Entry Pass"
- Rent Banner: "Rent for {Month} is ₹{Amount}. Due on {DueDate}."

## Imagery needs

- Resident avatar photo (with default geometric initial fallback) and crisp QR code renderer.

## Screenshot review log

- Round 1: Planned for 360px, 768px, 1280px responsive review.
