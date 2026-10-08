# Design System Master — Dormio

> **MANDATORY GOVERNANCE:**
> Every visible UI decision in Dormio comes from the **UI UX Pro Max** skill.
> When building or styling any page, check `design-system/dormio/pages/<page>.md` first.
> If a page spec exists, its layout and specific rules override this master file.
> For all shared tokens, typography, component behaviors, and core rules, follow this document strictly.

---

## 1. Selection Rationale

### 1.1 Styles Evaluated & Selection

We evaluated three style archetypes returned by the UI UX Pro Max skill against the brand brief (_warm, youthful, trustworthy, local, India_) and the strict bans in `docs/Design.md` §3:

1. **Alternative 1: `editorial-grid-magazine` (Rejected)**
   - _Skill Output:_ Asymmetric grid, pull quotes, column layout, high contrast `#000000` / `#FFFFFF`.
   - _Rejection Reason:_ Relies on harsh pure black `#000000` which violates Ban 2 (_No black surfaces, no harsh pure black_).
2. **Alternative 2: `neubrutalism` (Rejected)**
   - _Skill Output:_ `border: 3px solid #000`, `box-shadow: 4px 4px 0 #000`, aggressive high-saturation yellow/red/blue.
   - _Rejection Reason:_ Thick 3px black borders and harsh black drop shadows violate Ban 2 and feel aggressive rather than welcoming and trustworthy.
3. **Alternative 3: `flat-design` + `vibrant-and-block-based` (Selected)**
   - _Skill Output:_ Clean 2D blocks, high color contrast without pure black, flat solid fills, icon-heavy clarity, fast loading, no gradients, no glassmorphism, no artificial blur.
   - _Selection Justification:_ Satisfies Ban 1 (_No gradients_), Ban 2 (_No black / no dark theme_), Ban 3 (_No generic boxed-white pages_), and Ban 6 (_No glassmorphism, neon, or AI purple_). Provides distinct, warm color blocking tailored for students, residents, and property owners.

### 1.2 Color Profile Selection

Evaluated against `--domain color` databases:

- **Rejected:** `Marketplace (P2P)` (#7C3AED Primary) — rejected under Ban 6 (_No "AI purple" aesthetics_).
- **Rejected:** `Real Estate/Property` (#0F766E Teal / #F0FDFA) — rejected as overly sterile/corporate.
- **Selected Core Palette:** `Food Delivery / Local Events & On-Demand`
  - Primary: `#EA580C` (Warm Terracotta / Clay Orange — warm, welcoming Indian hospitality)
  - Secondary: `#F97316` (Warm Tangerine — lively secondary highlights)
  - Accent / CTA: `#2563EB` (Action Blue / Map Blue — clear, high-contrast actions)
  - Background: `#FFF7ED` (Warm Linen / Sand Canvas — eliminates stark sterile white)
  - Foreground / Text: `#0F172A` (Deep Slate Navy — dark, readable text with zero pure black)
  - Card Surface: `#FFFFFF` with Warm Border `#FCEAE1`

### 1.3 Distinct Hue per Domain Module (from Skill Databases)

To prevent every screen from looking identical (Ban 5), each platform domain carries a distinct semantic hue derived from the skill's color models:

- **Hostel & PG (Stay):** `#EA580C` (Terracotta) + `#F97316`
- **Mess & Food:** `#059669` (Fresh Mint Green) + `#D97706` (Food Amber)
- **Rent & Payments:** `#0D9488` (Transaction Teal) + `#D97706` (Dues Warning)
- **Security & Gate:** `#0369A1` (Security Navy Blue) + `#16A34A` (Verified Green)
- **Community & Notices:** `#D97706` (Broadcast Amber)
- **AI & Assistive Search:** `#2563EB` (Concierge Blue — flat, reliable action color; never purple)

### 1.4 Typography Selection

Evaluated with `--domain typography`:

- **Rejected:** `Righteous` (too decorative/festival-oriented for invoices and gate logs).
- **Rejected:** `Playful Creative` (`Fredoka / Nunito` — overly childish).
- **Selected:** `Geometric Modern` + `Friendly SaaS`
  - **Heading Font:** `Outfit` (Geometric, warm, architectural, distinctive headlines)
  - **Body & UI Font:** `Plus Jakarta Sans` (Crisp humanist sans, high x-height, superb legibility on mobile screens down to 14px)

---

## 2. Design Tokens

### 2.1 Color Tokens (CSS Variables)

```css
:root {
  /* Brand Core */
  --color-primary: #ea580c;
  --color-on-primary: #ffffff;
  --color-secondary: #f97316;
  --color-on-secondary: #ffffff;
  --color-accent: #2563eb;
  --color-on-accent: #ffffff;

  /* Surfaces & Typography (Strictly Non-Black) */
  --color-background: #fff7ed; /* Warm Linen */
  --color-foreground: #0f172a; /* Deep Slate Navy (4.5:1+ contrast) */
  --color-card: #ffffff;
  --color-card-foreground: #0f172a;
  --color-muted: #fdf4f0; /* Tinted Muted Surface */
  --color-muted-foreground: #475569; /* Accessible Slate */
  --color-border: #fceae1; /* Warm Tinted Border */
  --color-ring: #ea580c;

  /* Semantic Feedback */
  --color-success: #16a34a;
  --color-on-success: #ffffff;
  --color-warning: #d97706;
  --color-on-warning: #ffffff;
  --color-destructive: #dc2626;
  --color-on-destructive: #ffffff;

  /* Module Specific Hues */
  --color-hostel: #ea580c;
  --color-mess: #059669;
  --color-payment: #0d9488;
  --color-security: #0369a1;
  --color-notice: #d97706;
  --color-ai: #2563eb;
}
```

### 2.2 Spacing Scale (4-px base rhythm)

| Token        | Value  | Rem       | Primary Usage                                |
| ------------ | ------ | --------- | -------------------------------------------- |
| `--space-1`  | `4px`  | `0.25rem` | Micro padding, tag gaps                      |
| `--space-2`  | `8px`  | `0.5rem`  | Icon-to-label gaps, chip padding             |
| `--space-3`  | `12px` | `0.75rem` | Input internal padding, compact card padding |
| `--space-4`  | `16px` | `1.0rem`  | Default container padding, standard gaps     |
| `--space-5`  | `20px` | `1.25rem` | Card body spacing                            |
| `--space-6`  | `24px` | `1.5rem`  | Section padding, grid gaps                   |
| `--space-8`  | `32px` | `2.0rem`  | Page gutters, major block separation         |
| `--space-10` | `40px` | `2.5rem`  | Large block separation                       |
| `--space-12` | `48px` | `3.0rem`  | Hero spacing, section breaks                 |
| `--space-16` | `64px` | `4.0rem`  | Landing hero vertical rhythm                 |

### 2.3 Border Radius & Shape Language: The Arch

Dormio embraces a signature Indian architectural motif: **The Arch**. Arched geometry conveys warmth, entryways, doorways, and hospitality.

| Token           | Value                 | Applied To                                 |
| --------------- | --------------------- | ------------------------------------------ |
| `--radius-sm`   | `6px`                 | Chips, tags, small badges, inline inputs   |
| `--radius-md`   | `10px`                | Form inputs, standard buttons, alert boxes |
| `--radius-lg`   | `16px`                | Standard cards, modal dialogs, drawers     |
| `--radius-arch` | `32px 32px 12px 12px` | Signature feature cards, hero image frames |
| `--radius-pill` | `9999px`              | Search bar, filter pills, status badges    |

### 2.4 Elevation & Shadows

No blurry neon or deep black shadows. Clean, soft, tinted ambient depth only:

- `--shadow-none`: `none`
- `--shadow-sm`: `0 1px 3px 0 rgba(15, 23, 42, 0.05), 0 1px 2px 0 rgba(15, 23, 42, 0.03)`
- `--shadow-md`: `0 4px 6px -1px rgba(15, 23, 42, 0.07), 0 2px 4px -2px rgba(15, 23, 42, 0.05)`
- `--shadow-lg`: `0 10px 15px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.04)`
- `--shadow-card`: `0 2px 8px 0 rgba(234, 88, 12, 0.06)` (Subtle warm amber cast)

---

## 3. Typography Scale & Fonts

### 3.1 Google Fonts Configuration

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
  rel="stylesheet"
/>
```

### 3.2 Type Hierarchy

| Level              | Font Family       | Size                | Weight | Line Height | Tracking  | Usage                         |
| ------------------ | ----------------- | ------------------- | ------ | ----------- | --------- | ----------------------------- |
| **Display 1**      | Outfit            | `36px` (`2.25rem`)  | `700`  | `1.15`      | `-0.02em` | Marketplace hero headlines    |
| **Heading 1**      | Outfit            | `28px` (`1.75rem`)  | `700`  | `1.2`       | `-0.02em` | Page titles, property names   |
| **Heading 2**      | Outfit            | `22px` (`1.375rem`) | `600`  | `1.25`      | `-0.01em` | Section headers, card titles  |
| **Heading 3**      | Outfit            | `18px` (`1.125rem`) | `600`  | `1.3`       | `0em`     | Widget titles, modal headers  |
| **Body Large**     | Plus Jakarta Sans | `16px` (`1.0rem`)   | `500`  | `1.5`       | `0em`     | Intro text, primary card copy |
| **Body Default**   | Plus Jakarta Sans | `14px` (`0.875rem`) | `400`  | `1.5`       | `0em`     | Standard text, inputs, tables |
| **Caption / Meta** | Plus Jakarta Sans | `12px` (`0.75rem`)  | `500`  | `1.4`       | `+0.01em` | Timestamps, tags, fine print  |

_Ban Check: Body text is strictly never smaller than 14px (`0.875rem`)._

---

## 4. Iconography

- **Family:** Phosphor Icons or Lucide Icons (outline style, 1.75px–2.0px stroke).
- **Size Standards:**
  - `16px` for inline meta text and tags
  - `20px` for buttons, navigation items, and list items
  - `24px` for prominent feature badges and header actions
- **No Emojis as UI icons:** Strictly banned. All icons are rendered via SVG components.

---

## 5. Component Standards

### 5.1 Buttons

- **Primary Button:** Solid flat fill `--color-accent` (`#2563EB`) or `--color-primary` (`#EA580C`), text `--color-on-accent` (`#FFFFFF`), `radius-md` (10px). Height minimum `44px` for touch targets.
- **Secondary Button:** Outlined with `2px solid var(--color-primary)`, transparent background, bold text.
- **Muted Button:** Flat `--color-muted` fill with `--color-foreground` text.
- **No Gradients:** Flat solid fills only.

### 5.2 Cards & Containers

- Clean warm border (`1px solid var(--color-border)`), warm white fill (`#FFFFFF`), rounded corners (`--radius-lg` or `--radius-arch`).
- No generic boxed monoculture: cards alternate with colored banner strips, sticky panels, and editorial content blocks.

### 5.3 Form Inputs

- Height minimum `44px`, padding `10px 14px`, border `1.5px solid #CBD5E1`.
- Focus state: `border-color: var(--color-primary)`, clear accessible ring (`box-shadow: 0 0 0 3px rgba(234, 88, 12, 0.25)`).

### 5.4 Status Chips & Trust Badges

- Pill shape (`--radius-pill`), 8px horizontal padding, 4px vertical padding, bold 12px text.
- Verified Badge: `#059669` text on `#ECFDF5` background.
- CCTV Badge: `#0369A1` text on `#F0F9FF` background.
- Mess Active: `#D97706` text on `#FEF3C7` background.

---

## 6. Motion & Interaction

- **Duration:** 150ms–250ms ease-out for hover, tap, and dialog transitions.
- **Micro-animations:** Subtle translate-y (`-1px` on hover) with crisp color shift.
- **No Layout Shift:** No scaling transforms (`scale-105`) that re-flow parent grids or sibling cards.
- **Accessibility:** Full `@media (prefers-reduced-motion: reduce)` support: disables transforms and transitions immediately.

---

## 7. Accessibility Standards (WCAG 2.1 AA)

- **Contrast:** Every text element must meet minimum 4.5:1 contrast against its background. Text on primary buttons meets 7:1.
- **Touch Targets:** Minimum 44px × 44px clickable bounding box on mobile devices.
- **Screen Sizes Tested:** Verified at 360px (mobile portrait, zero horizontal scroll), 768px (tablet portrait), and 1280px (desktop).
- **Keyboard Navigation:** High-visibility outline/ring on all interactive elements.

---

## 8. Strict "Do / Don't" Governance (docs/Design.md §3)

### DO:

- ✅ Use warm, tinted backgrounds (`#FFF7ED`, `#FDF4F0`) instead of stark cold white.
- ✅ Use deep slate navy (`#0F172A`) for high-contrast dark text.
- ✅ Apply the Arch shape (`--radius-arch`) to highlight key hero and gallery cards.
- ✅ Provide distinct module colors (Hostel: Orange, Mess: Green, Rent: Teal, Guard: Blue).
- ✅ Ensure every page has complete Loading, Empty, Error, and Offline states.
- ✅ Use SVG icons from Lucide/Phosphor.

### DON'T:

- ❌ **NO GRADIENTS:** Never use `bg-gradient-*`, `linear-gradient`, or multi-stop blends.
- ❌ **NO PURE BLACK:** Never use `#000000`, `black`, `bg-black`, or near-black slabs.
- ❌ **NO DARK THEME (v1):** Dormio v1 is exclusively warm light mode.
- ❌ **NO GENERIC "WHITE BOXES" MONOCULTURE:** Never build pages consisting only of uniform white boxes.
- ❌ **NO AI PURPLE / NEON / GLASS:** Strictly forbidden.
- ❌ **NO EMOJIS AS ICONS:** Emojis are never used for functional icons.
- ❌ **NO HARDCODED ARBITRARY VALUES:** Always use tokens from this design system.
- ❌ **NO TEXT BELOW 14PX:** Except secondary 12px metadata labels.
