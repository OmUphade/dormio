# Mess Detail Page — route `/messes/[id]`

Purpose / primary action: Showcase daily dining menu, meal schedules (breakfast/lunch/snacks/dinner), subscription plans, and hygiene certifications.
Audience: Students and working professionals looking for daily meal subscriptions or standalone mess food.

## UI UX Pro Max evidence

Commands run (exact) and the result chosen from each:

- `python3 .agents/skills/ui-ux-pro-max/scripts/search.py "food mess daily menu meal plan subscription food schedule" --design-system --persist -p "Dormio" --page "mess-detail"` → Pattern: Menu-Board + Daily Meal Cards; Style: Fresh Green & Amber Block; Primary `#059669` (Fresh Mint), Secondary `#D97706` (Food Amber), Background `#FFF7ED`.
- `python3 .agents/skills/ui-ux-pro-max/scripts/search.py "food" --domain color` → Fresh Green `#059669` and Food Amber `#D97706` for appetite appeal and clear veg/non-veg demarcation.
- `python3 .agents/skills/ui-ux-pro-max/scripts/search.py "hostel accommodation map" --domain icons` → Phosphor Icons: `ForkKnife`, `Clock`, `CalendarCheck`, `Sparkle`, `ShieldCheck`, `CheckCircle`.
- `python3 .agents/skills/ui-ux-pro-max/scripts/search.py "menu" --stack nextjs` → Dynamic Server Component for today's live menu with client tab switcher for 7-day schedule.

Selection rationale:
Mess decisions rely on daily menu variety, hygiene, and flexible plans (2 meals vs 3 meals, skip-meal policy). The design emphasizes clear day-of-week tabs and color-coded dietary tags (Veg green dot, Non-veg brown dot) without clutter.

## Composition

Pattern: Daily Menu Board + Subscription Tier Selector.
How it differs from neighbouring pages (`/listings/[id]` and `/owner/properties/new`): Focused specifically on culinary schedules and meal-pass subscriptions, featuring day tabs (Mon–Sun) and meal-time slots instead of room bed diagrams.
Signature element: "Today's Live Menu" board card with active meal badge (e.g., "Serving Lunch until 2:30 PM").

### Layout sketch 360px:

```
[Header: Back button + Mess name + Share]
[Mess Banner: Kitchen photo + Hygiene Rating 4.8 + Pure Veg / Non-Veg badge]
[Live Status Card: "Now Serving: Lunch (12:30 PM - 2:30 PM)"]
[Today's Menu Card:
  - Paneer Butter Masala
  - Dal Tadka & Jeera Rice
  - 3 Phulkas & Sweet Gulab Jamun]
[Day Switcher Pills: [ Mon ] [ Tue ] [ Wed* ] [ Thu ] [ Fri ] [ Sat ] [ Sun ]]
[Weekly Menu Accordion]
[Subscription Plans: Monthly 2-Meal (₹3,200) | Monthly 3-Meal (₹4,200)]
[Skip-Meal Policy Card: "Skip before 8 AM for meal credit"]
[Sticky Bottom Bar: "Subscribe from ₹3,200/mo" | [ Start Subscription ]]
```

### Layout sketch 768px:

```
[Header & Hygiene Badges: FSSAI Certified · In-house Kitchen]
[2-Column Layout]:
  - Left Column (60%): 7-Day Interactive Menu Board with Meal Tabs (Breakfast, Lunch, Snacks, Dinner)
  - Right Column (40%): Subscription Plan Cards (Weekly trial / Monthly pass) with UPI direct pay details
```

### Layout sketch 1280px:

```
[Container max-w-7xl]:
[Mess Hero Header: Name, Kitchen Photos, Dietary Badges, Timing Strip]
[Grid 3-Column (2 cols menu, 1 col subscription)]:
  - Today's Featured Spread (Live menu highlighting fresh items)
  - Full Weekly Schedule with diet filter toggle (Show all / Veg only / Non-veg days)
  - Sticky Subscription Panel: Plan selector, custom trial day option, direct owner QR
```

## Components used and new components needed

- Used: `TrustBadges`, `PriceTag`, `RatingBreakdown`, `ReviewCard`
- New components: `MenuBoard`, `MealSlotCard`, `SubscriptionTierCard`, `DayPickerTabs`

## States

- **Loading:** Skeleton meal slots and pricing cards.
- **Empty:** "No menu published for next week yet. Showing regular weekly schedule."
- **Error:** "Failed to load meal schedule. Please refresh."
- **Offline:** "Showing cached menu for today."

## Copy deck

- Active Meal: "Serving {MealName} until {EndTime}"
- Dietary Tag: "100% Pure Veg Kitchen" or "Veg & Non-Veg (Separate Cooking Areas)"
- Skip Meal Guarantee: "Notify 4 hours in advance to pause meals without losing money."
- CTA: "Subscribe to Monthly Pass"

## Imagery needs

- Genuine photos of actual meal thalis, dining tables, and spotless prep kitchen.

## Screenshot review log

- Round 1: Planned for 360px, 768px, 1280px responsive review.
