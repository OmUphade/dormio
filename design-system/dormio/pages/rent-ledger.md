# Rent Ledger Page — route `/stay/rent`

Purpose / primary action: Track monthly rent dues, generate direct UPI QR links for payment, submit transaction UTRs, and view complete payment receipts.
Audience: Residents managing monthly rent payments and downloading verified receipts.

## UI UX Pro Max evidence

Commands run (exact) and the result chosen from each:

- `python3 .agents/skills/ui-ux-pro-max/scripts/search.py "rent payment ledger invoices upi transaction history financial table" --design-system --persist -p "Dormio" --page "rent-ledger"` → Pattern: Financial Statement / Ledger Timeline; Style: Trustworthy Clean FinTech; Payment Teal `#0D9488`, Amber `#D97706`, Success Green `#16A34A`.
- `python3 .agents/skills/ui-ux-pro-max/scripts/search.py "forms" --domain ux` → Precise UTR input validation (12 digits); instant copy-to-clipboard for UPI VPAs; explicit invoice download confirmation.
- `python3 .agents/skills/ui-ux-pro-max/scripts/search.py "hostel accommodation map" --domain icons` → Phosphor Icons: `Receipt`, `QrCode`, `CheckCircle`, `Clock`, `DownloadSimple`, `CopySimple`, `CurrencyInr`.
- `python3 .agents/skills/ui-ux-pro-max/scripts/search.py "payments" --stack nextjs` → Form submission for UTR entry with optimistic status update; PDF receipt generation with browser download.

Selection rationale:
Rent in Dormio is UPI-direct with staff or bank-statement verification. Zero gateway fees. Clear status badges (Unpaid, Verification Pending, Paid, Overdue) prevent disputes between resident and owner.

## Composition

Pattern: Active Dues Hero Card + Historical Transaction Ledger.
How it differs from neighbouring pages (`/stay` and `/guard/scan`): Focuses entirely on money, invoices, and payment proof verification; tabular timeline format rather than resident card deck.
Signature element: "Direct UPI Payment Sheet" displaying owner's verified UPI QR code, copyable VPA, and 12-digit UTR input form.

### Layout sketch 360px:

```
[Header: Back to Stay · "Rent & Invoices"]
[Current Dues Banner Card (Teal & Amber Tint):
  - Month: October 2026
  - Amount Due: ₹8,500 (Due by 5 Oct)
  - Status: [ Overdue / Pending ]
  - [ Pay via UPI Apps (GPay, PhonePe, Paytm) ]
  - [ Scan Owner QR Code ]]
[UTR Submission Drawer:
  - "Already paid? Enter 12-digit UPI UTR / Ref No."
  - [ 12-digit input ] -> [ Submit for Verification ]]
[Payment History Stream (Cards):
  - Sep 2026: ₹8,500 · Verified Paid · [ Receipt PDF ]
  - Aug 2026: ₹8,500 · Verified Paid · [ Receipt PDF ]
  - Deposit: ₹15,000 · Verified Paid · [ Receipt PDF ]]
```

### Layout sketch 768px:

```
[Header with Rent Summary: Total Paid this year, Deposit balance]
[2-Column Layout]:
  - Left Column (40%): Active Dues Card with Dynamic UPI QR Code, Copy VPA button, and UTR Submission Box
  - Right Column (60%): Ledger Table with Invoice ID, Month, Amount, Payment Date, UTR number, Status badge, Action
```

### Layout sketch 1280px:

```
[Container max-w-6xl]:
[Dues Summary KPI Strip: Current Due · Security Deposit Held · Next Invoice Date]
[Active Bill Breakdown Card with Itemized Charges: Base Rent ₹7,500 + Mess ₹1,000]
[Direct Owner UPI Payment Panel]:
  - Generated UPI Deep Link (mobile) & Scannable QR Code
  - UTR input field with inline validation
[Full Historical Ledger DataTable]:
  - Columns: Invoice # | Period | Amount | Method | UTR # | Verification Status | Receipt
  - Status Pills: Verified Paid (Green), Verification Pending (Amber), Overdue (Red)
```

## Components used and new components needed

- Used: `PriceTag`, `TrustBadges`
- New components: `RentDuesCard`, `UpiPaySheet`, `UtrSubmissionForm`, `LedgerTable`, `ReceiptModal`

## States

- **Loading:** Skeleton dues card and skeleton ledger rows.
- **Empty:** "No invoices generated yet for your stay."
- **Error:** "Could not load invoice data. Please try again."
- **Offline:** "Showing cached receipts. New payments require internet."

## Copy deck

- Active Due: "October 2026 Rent: ₹8,500"
- UPI Notice: "100% Direct to Owner. Dormio holds ₹0. Staff will verify your UTR number within 12 hours."
- UTR Input: "Enter 12-digit UTR number from your UPI app receipt"
- Status Paid: "Verified Paid by Staff"

## Imagery needs

- Dynamically rendered UPI QR code and SVG payment brand logos (GPay, PhonePe, Paytm, BHIM).

## Screenshot review log

- Round 1: Planned for 360px, 768px, 1280px responsive review.
