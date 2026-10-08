# Owner Wizard Page — route `/owner/properties/new`

Purpose / primary action: Guided multi-step onboarding wizard for owners to register a property (Hostel, PG, or Mess), define rooms/beds, amenities, UPI ID, and submit for verification.
Audience: Property owners and hostel managers onboarding their facility.

## UI UX Pro Max evidence

Commands run (exact) and the result chosen from each:

- `python3 .agents/skills/ui-ux-pro-max/scripts/search.py "hostel owner property listing multi step wizard form onboarding live preview" --design-system --persist -p "Dormio" --page "owner-wizard"` → Pattern: Funnel (Progressive Disclosure) + Live Mobile Card Preview; Style: Functional Minimalist Stepper; Primary `#EA580C`, Surface `#FFFFFF`.
- `python3 .agents/skills/ui-ux-pro-max/scripts/search.py "forms" --domain ux` → Validate on blur for input fields; keep steps small and focused; use clear progress indicator; autofill support enabled.
- `python3 .agents/skills/ui-ux-pro-max/scripts/search.py "hostel accommodation map" --domain icons` → Phosphor Icons: `Buildings`, `Bed`, `Check`, `ArrowRight`, `ArrowLeft`, `UploadSimple`, `QrCode`, `Eye`.
- `python3 .agents/skills/ui-ux-pro-max/scripts/search.py "wizard" --stack nextjs` → Client-side form step state backed by session storage draft; React Hook Form + Zod schema validation per step.

Selection rationale:
Owners struggle with complicated paperwork. To hit G2 (listing wizard completed in <15 minutes), the form breaks onboarding into 5 bite-sized steps: 1. Basics, 2. Rooms & Rent, 3. Amenities & Rules, 4. Photos & UPI ID, 5. Verification Review with real-time mobile preview.

## Composition

Pattern: Multi-Step Guided Stepper Rail with Live Mobile Listing Preview.
How it differs from neighbouring pages (`/messes/[id]` and `/stay`): Wizard is an authoring flow with a sticky progress header, form inputs, file dropzone, and an interactive side preview phone frame.
Signature element: Interactive smartphone preview mockup on desktop showing the owner exactly how seekers will see their listing as they type.

### Layout sketch 360px:

```
[Sticky Header: Step 2 of 5: Rooms & Pricing | Save Draft]
[Progress Bar: 40% complete]
[Step Form Card:
  - Room Category (Single / Double / Triple)
  - Monthly Rent (₹ per bed)
  - Security Deposit (₹)
  - Number of Rooms available]
[Add Another Room Type (+ Button)]
[Navigation Footer: [ ← Back ] [ Continue to Amenities → ]]
```

### Layout sketch 768px:

```
[Header: Dormio Owner Portal · "List New Property"]
[Stepper Tracker: (1. Basics ✓) (2. Rooms ●) (3. Amenities ○) (4. Media ○) (5. Review ○)]
[Centered Form Card (max-w-2xl)]:
  - Form Fields with clear inline error messaging
  - Sticky bottom navigation bar with "Save & Exit" and "Next Step"
```

### Layout sketch 1280px:

```
[Container max-w-7xl 2-Column Split (65% Form / 35% Live Preview)]:
  - Left Pane:
    [Progress Stepper Rail at top]
    [Step Container: Title, Help tooltip, structured input groups, photo dropzone, UPI VPA verification field]
    [Action Bar: Back, Save as Draft, Continue]
  - Right Pane:
    [Sticky Desktop Frame: "Seeker View Preview"]
    [Scaled-down smartphone mockup reflecting current title, photos, price pills, and badges dynamically]
```

## Components used and new components needed

- Used: `PriceTag`, `AvailabilityBadge`, `TrustBadges`
- New components: `WizardStepper`, `LiveListingPreview`, `RoomUnitEditor`, `MediaDropzone`, `UpiValidatorField`

## States

- **Loading:** Skeleton loader when fetching saved drafts.
- **Empty:** "No photo uploaded yet. Drop at least 3 room photos."
- **Error:** Red accessible helper text directly beneath invalid fields on blur (e.g., "Enter a valid UPI ID like name@upi").
- **Offline:** "Draft saved locally to browser. You can resume when online."

## Copy deck

- Step 1: "Property Basics & Address"
- Step 2: "Room Types, Sharing & Monthly Rent"
- Step 3: "Amenities, Security Features & Curfew Rules"
- Step 4: "Photos & Owner UPI ID for Direct Rent"
- Step 5: "Review & Submit for Verification"
- Helper Note: "Dormio never takes commission. Residents pay 100% of rent directly to your UPI ID."

## Imagery needs

- Visual upload dropzone with thumbnail previews and primary cover photo badge.

## Screenshot review log

- Round 1: Planned for 360px, 768px, 1280px responsive review.
