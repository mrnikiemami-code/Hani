# Hani Admin Panel — Architecture

- Status: Proposed for review
- Date: 2026-11-18
- Scope: Hani central administration (Super Admin + Agency management)
- Owner: Platform architecture

## 1. Executive decision

Hani Admin is a **separate admin route group inside the Hani Next.js application**, not a second frontend and not a fork of the public DreamsTour pages.

The public marketplace and the passenger panel remain in DreamsTour. The admin panel:

- uses the Hani API and existing modules;
- uses the purchased Dreamstour template as the visual and interaction source;
- reuses existing template pages, cards, tables, forms, modals, tabs, and settings screens;
- keeps the admin shell visually derived from the template's **Agent Dashboard**;
- adds no parallel design system and no second backend.

The template does not contain a page named `Super Admin`. The Super Admin panel is a Hani route group built from the template's existing management components.

## 2. Why this architecture

The template is strong in visual language and page composition, but its management pages are presentation-only. Hani's admin needs real permissions, real data, financial controls, and auditability.

The correct boundary is:

```text
Dreamstour template
  -> visual components, layout, cards, tables, forms, charts

Hani Next.js admin route group
  -> data binding, permissions, validation, server actions, server pagination

Hani ASP.NET Core modules
  -> business rules, authorization, persistence, audit, financial invariants
```

The template is never iframed. Its components are copied/recomposed into Hani's shared UI layer so Hani owns behavior and accessibility.

## 3. Non-negotiable principles

1. **Template-first**
   Use existing template pages/components before creating anything.
2. **No per-operation menu**
   A CRUD action is not a menu item. Operations live inside a section, tab, row action, or detail page.
3. **One admin shell**
   All admin pages use the same sidebar, header, breadcrumb, card, table, and form language.
4. **Permission-driven navigation**
   Menu items are rendered from permissions, not hardcoded role checks.
5. **Backend is the security boundary**
   Hiding a button is not authorization. Every admin operation is checked server-side.
6. **No parallel backend**
   Reuse Identity, Catalog, Booking, Payments, Settlement, Content, Messaging, and Reporting modules.
7. **No mixed currencies**
   IRR and USD totals are displayed separately. Conversion requires an explicit FX rate.
8. **No manual financial truth**
   Payment/settlement status cannot be changed by editing a field. Financial changes create a document/event.
9. **Audit everything sensitive**
   Actor, time, reason, before/after, and correlation ID.
10. **Jalali UI, Gregorian contract**
    Dates are Jalali in FA UI; API, DB, URLs, and cache keys stay Gregorian/UTC.
11. **RTL/LTR by locale**
    FA/AR admin is RTL, EN is LTR; numbers, currency, and dates use shared formatters.
12. **No new design system**
    New screens are composed from template cards, tables, tabs, forms, buttons, badges, modals, and pagination.

## 4. Current Hani assets

### 4.1 Existing admin routes

- `/[locale]/admin/home` — homepage composition
- `/[locale]/admin/media` — media library
- `/[locale]/admin/content` — content entries
- `/[locale]/admin/security` — OTP security settings

### 4.2 Existing admin shell

`frontend/src/features/home-experience/ui/AdminPageShell.tsx` already derives its layout from the template's agency dashboard:

- agency sidebar card
- user/profile header
- sidebar navigation
- breadcrumb
- content container
- responsive mobile navigation

This shell must become the single admin shell and gain grouped navigation.

### 4.3 Template assets to reuse

| Hani need | Template source |
|---|---|
| Dashboard cards/charts | `agent/agent-dashboard` |
| Listing/table/filter patterns | `agent/agent-listings` |
| Agency/profile settings | `agent/agent-settings`, `agent/agent-account-settings` |
| Security settings pattern | `agent/agent-security-settings` |
| Plans/subscription pattern | `agent/agent-plans`, `agent/agent-plans-settings` |
| Booking lists/details | `agent/agent-*-booking`, `agent/agent-booking-details` |
| Cancellation/refund patterns | `agent/agent-cancellation-request` |
| Financial summaries | `agent/agent-earnings`, `agent/agent-commission-summary` |
| Payouts/settlements | `agent/agent-pending-payouts`, `agent/agent-payout-request` |
| Product forms | `add-hotel`, `edit-hotel`, `add-tour`, `edit-tour`, `add-flight`, `edit-flight`, `add-visa`, `add-activity`, `edit-activity`, `add-guide`, `edit-guide`, `add-bus`, `edit-bus`, `add-car`, `edit-car`, `add-cruise`, `edit-cruise` |
| Content/media patterns | `/[locale]/admin/content`, `/[locale]/admin/media` |
| Support/chat patterns | `agent/agent-chat` |
| Public content pages | `blog`, `gallery`, `pages`, `faq`, `about-us` |

### 4.4 Template reference

The untouched template runs at `http://localhost:4023` for visual comparison only. It is not an admin backend and must not receive production data.

## 5. Information architecture

Twelve top-level sections. Submenus, tabs, detail pages, and row actions carry the detail.

```text
HANI ADMIN
├── 01 Dashboard
├── 02 Agencies
├── 03 Users & Access
├── 04 Travel Products
├── 05 Bookings & Orders
├── 06 Finance
├── 07 Content & SEO
├── 08 Marketing
├── 09 Support
├── 10 Integrations
├── 11 Reports
└── 12 Settings & Security
```

### 5.1 Dashboard — `/admin/dashboard`

**Purpose:** real business state, not decorative charts.

Blocks:

- gross sales by currency
- net sales
- commission revenue
- amount due for settlement
- failed payments
- pending requests
- conversion rate
- cancellation rate
- active agencies

Action queue:

- agencies awaiting approval
- bookings near expiry
- unreviewed refunds
- price mismatches
- overdue settlements

Filters:

- date range
- product
- agency
- sales channel
- currency
- status

Every KPI card links to the filtered record list behind it.
IRR and USD totals remain separate; no aggregated cross-currency total without a recorded FX rate.

Template reuse:

- `agent/agent-dashboard` cards and charts
- `agent/agent-pending-payouts` table patterns

### 5.2 Agencies — `/admin/agencies`

Pages:

- agency list: search, status, city, license, plan, activity
- create agency
- agency detail with tabs:
  - overview
  - legal information
  - documents
  - users
  - contracts
  - products
  - bookings
  - finance
  - API
  - activity
- documents and verification
- agency users and memberships
- contracts and commission terms
- commercial settings: default BookingMode, allowed products, limits
- status: active, pending, suspended, blocked
- finance accounts and settlement history
- subscription/API plan and quota
- performance: sales, complaints, cancellation, response time, score

Sensitive actions from the detail page:

- approve/reject
- suspend/activate
- create contract
- change commission
- restrict online sales

Every sensitive action requires a reason and an audit event.

Template reuse:

- `agent/agent-listings`
- `agent/agent-account-settings`
- `agent/agent-settings`
- `agent/agent-security-settings`
- `agent/agent-plans-settings`
- detail tabs built from template cards/tables

### 5.3 Users, Admins & Access — `/admin/users`

Pages:

- customers: profile, account status, orders, requests
- Hani admins: create admin, assign role, suspend
- roles and permissions
- agency staff memberships
- active sessions, forced logout, access reset
- activity history
- privacy requests: access/correction/deletion according to retention policy

Base roles:

- Super Admin
- Operations Manager
- Agency Manager
- Finance Manager
- Content Manager
- Support Agent
- Read-only Auditor

Permissions are operation + data scope, for example:

```text
agency.view
agency.approve
agency.suspend
agency.contract.manage
catalog.tour.publish
catalog.offer.approve
booking.view
booking.modify
finance.settlement.approve
finance.refund.approve
report.export
role.manage
```

Agency managers must never read another agency's data, including through APIs.
The Finance Manager must not create a Super Admin by default.

### 5.4 Travel Products — `/admin/products`

Shared section, independent product forms and rules.

- Tours: master tour, destination, itinerary, services, documents, departures, capacity, agency offers, pricing, cancellation
- Hotels: hotel, location, amenities, images, rooms, rates, inventory, stay rules, supplier offers
- Flights: airlines, airports, routes, suppliers, fare offers, PNR, ticketing, refund
- Visas/travel services: service type, country, requirements, processing time, conditions, pricing, application status

Critical model decision:

```text
Master Tour        != Agency Offer
Shared itinerary    -> multiple agency offers
Agency offer        -> dates, hotel, price, terms, capacity
```

Hani admins control both the shared catalog and agency offers.
Publication flow:

```text
draft -> validation -> approval -> published
```

Price mismatch reports and offer suspension must be available.

Template reuse:

- add/edit tour, hotel, flight, visa, activity, guide forms
- hotel/tour detail pages for preview patterns

### 5.5 Bookings & Orders — `/admin/bookings`

Two sale models from day one.

Online order:

```text
Quote -> Hold -> Payment to Hani -> Confirm -> Documents -> Agency settlement
```

Reservation request:

```text
Request -> Agency review -> Final price -> Customer acceptance -> Payment to agency -> Recorded sale
```

Pages:

- all orders: number, passenger, agency, product, status
- online orders: payment, capacity, contract, fulfillment
- reservation requests: open, waiting for agency, rejected, accepted
- expiring holds, incomplete payments, no agency response
- modify booking: passenger, date, service, amount, history
- cancellation: request, penalty, review, approval
- refunds: request tracking linked to Finance
- contracts/vouchers: issue, view, download, version history

Order detail must show passenger, agency, product, booking state, payment state, price components by currency, commission, documents, events, and change history.

A paid order cannot become “paid” by manually editing a field. Financial transitions require a valid document/permission/accounting event.

Template reuse:

- agent booking lists and `agent-booking-details`
- cancellation request screens
- customer booking tables

### 5.6 Finance — `/admin/finance`

Sections:

- payment transactions: PSP state, reference, attempts, mismatches
- payment obligations: IRR/USD components per order
- commissions: rules, contract rates, calculation, adjustments
- agency settlements: payable balance, period, approval, transfer
- agency invoices: commission invoices for direct agency bookings
- refunds: refundable amount, penalty, refund state
- general ledger: debit/credit, corrections, accounting documents
- reconciliation: PSP/bank transactions vs orders
- bank accounts: acquiring and settlement accounts
- tax reports: tax/duty by product, currency, inclusion state
- currency management: active currencies, precision, FX source
- exports: CSV/Excel/accounting files

Rules:

- Online Booking: customer pays Hani; Hani settles agency after commission and valid deductions.
- Reservation Request: agency receives customer money; Hani records earned commission and receivables.
- Multi-currency:
  - IRR and USD sections stay independent.
  - VAT/Duty can be none, included, exempt, or not applicable per section.
  - Commission applies to the contracted final taxable amount.
  - FX conversion requires a recorded rate.
  - Every financial correction creates a new document; history is never deleted.
- Commission rule creation and settlement approval have separate permissions.

Template reuse:

- `agent-earnings`
- `agent-commission-summary`
- `agent-pending-payouts`
- `agent-payout-request`
- `agent-payment-history`

### 5.7 Content, Destinations & SEO — `/admin/content`

Pages:

- countries, provinces, cities: geography and multilingual names
- destinations: intro, images, season, related tours
- attractions: information, amenities, location, gallery
- restaurants/places
- blog: article, category, tags, author, publish
- travelogues: user submission, review, approve, publish
- reviews and ratings: report, approve, manage
- site pages: about, contact, legal, custom pages
- media: images, video, files, alt text, optimization
- SEO: title, description, canonical, index/noindex, sitemap
- translations: independent content per locale and completion state

Content connects to catalog: a destination links to articles, tours, hotels, and attractions.

Existing Hani admin pages migrate into this section:

- `/admin/content`
- `/admin/media`
- homepage composition (`/admin/home`) becomes a content/homepage subpage or Dashboard-adjacent “Homepage” page.

### 5.8 Marketing — `/admin/marketing`

Pages:

- discount codes: percentage/fixed, cap, validity, usage limit
- campaigns: products/agencies, scheduling
- ad slots: site banners, agency ads, publication window
- special offers: deal, last-minute, featured
- referrals: referral code, channel, partner commission
- marketing messages: notification, email, SMS consent
- campaign report: impressions, clicks, conversions, attributed sales

Every discount declares who funds it: Hani or the agency. This directly changes settlement and revenue.

### 5.9 Support & Disputes — `/admin/support`

Pages:

- ticket inbox
- customer complaints
- financial disputes
- price mismatch reports
- cancellation requests
- canned responses
- priority and SLA

Each case has owner, status, response deadline, documents, correspondence, actions, and resolution.
Support cannot refund or change settlement status without finance permission.

### 5.10 Integrations — `/admin/integrations`

Two connection directions:

- Supplier API: agencies/suppliers push inventory and prices
- Channel API: partners sell Hani inventory

Capabilities:

- Supplier/Channel API records
- client credentials and scopes
- quotas and request limits
- webhooks, failures, retries
- inventory/price sync state
- flight/hotel supplier connections
- error, latency, outage reports
- sandbox/test mode
- suspend one connection without disabling the whole agency

Secrets are shown once. Rotation and regeneration are audited.

### 5.11 Reports — `/admin/reports`

Base reports:

- sales by agency, destination, product, currency
- commission revenue
- settlements and debt
- agency performance
- cancellations/refunds
- reservation-request performance
- campaign effectiveness

Advanced:

- visit-to-booking funnel
- agency response time
- API sales
- low-activity agencies
- best-selling products

Every report supports filters, saved views, and export. Exporting sensitive data requires a separate permission.

### 5.12 Settings & Security — `/admin/settings`

Groups:

- general: brand, logo, company, maintenance mode
- language/localization: active languages, default, RTL/LTR, timezone
- currency/pricing: currencies, precision, rounding, display, FX
- tax/duty: inclusion states, rules, effective dates
- booking: hold expiry, approval/request rules
- settlement: periods, minimums, deadlines, approvers
- payments: PSPs, acquiring accounts, callbacks, methods
- agencies: required documents, approval, restrictions
- roles/security: password policy, MFA, sessions, admin access
- messaging: SMS/email templates, providers, events
- SEO/content: URLs, sitemap, publish/index rules
- infrastructure: service health, queues, feature flags, change log

Sensitive settings (PSP, tax, currency, settlement) are versioned with effective dates, change history, and review before publish.

Existing `/admin/security` (OTP policy) belongs here as a subpage.

## 6. Route map

```text
/[locale]/admin/dashboard
/[locale]/admin/agencies
/[locale]/admin/agencies/new
/[locale]/admin/agencies/[id]
/[locale]/admin/users
/[locale]/admin/users/customers
/[locale]/admin/users/admins
/[locale]/admin/users/roles
/[locale]/admin/users/activity
/[locale]/admin/products/tours
/[locale]/admin/products/tours/[id]
/[locale]/admin/products/hotels
/[locale]/admin/products/hotels/[id]
/[locale]/admin/products/flights
/[locale]/admin/products/visas
/[locale]/admin/bookings
/[locale]/admin/bookings/online
/[locale]/admin/bookings/requests
/[locale]/admin/bookings/orders/[id]
/[locale]/admin/finance/transactions
/[locale]/admin/finance/commissions
/[locale]/admin/finance/settlements
/[locale]/admin/finance/ledger
/[locale]/admin/finance/approvals
/[locale]/admin/content/pages
/[locale]/admin/content/blog
/[locale]/admin/content/destinations
/[locale]/admin/content/media
/[locale]/admin/content/seo
/[locale]/admin/marketing/discounts
/[locale]/admin/marketing/campaigns
/[locale]/admin/marketing/ads
/[locale]/admin/support/tickets
/[locale]/admin/support/disputes
/[locale]/admin/notifications
/[locale]/admin/channel
/[locale]/admin/integrations/suppliers
/[locale]/admin/integrations/channels
/[locale]/admin/reports
/[locale]/admin/settings
/[locale]/admin/settings/security
/[locale]/admin/audit
```

The route name is stable; permissions decide whether it is reachable and visible.

## 7. Navigation

The sidebar has 12 top-level items. Each item can expand to a small submenu. Do not add one item per CRUD operation.

- Desktop: grouped vertical sidebar using the template agency sidebar.
- Mobile: compact horizontal/scrollable top nav (already implemented in Hani admin shell).
- Breadcrumb: `Admin / Section / Page`.
- Active state is calculated from route + permissions.
- Counts/badges belong to actionable queues, not every menu item.

### Agency workspace

The agency panel is a separate route group (for example `/[locale]/agency`) with its own scoped navigation. It uses the same shell, cards, tables, forms, and message system, but it never shares the Super Admin menu.

- Agency manager: own agency only
- Booking operator: own agency bookings only
- Finance operator: own agency finance only
- No cross-agency query, export, or API access
- Agency routes are rendered from the same permission catalog with `scope=agency`

The passenger dashboard remains in the public DreamsTour experience; it is not part of the admin route group.

## 8. Standard admin page

Every list page uses this anatomy:

```text
Page header
  title + subtitle + primary action
Filter bar
  search + status + context filters + clear
Table
  server pagination, sorting, columns, selection, bulk actions, export
Row actions
  view / edit / contextual operation
Empty / loading / error / unauthorized states
Detail page
  summary + tabs + timeline + attachments + audit
```

Rules:

- Server-side pagination and filtering; no unbounded client tables.
- Bulk actions only when the permission and state allow it.
- Destructive actions use the unified confirmation modal.
- Success/error/warning/question use the unified toast/modal system.
- Forms validate on client and server; server validation is authoritative.
- Every form has dirty-state protection.
- No inline raw HTML or untranslated enum labels.
- No horizontal/vertical scroll inside the table; responsive columns collapse.

## 9. RBAC and data scope

Authentication and authorization:

- RBAC operation permissions.
- Data scope: `global`, `agency`, `self`.
- Agency users receive agency-scoped claims.
- Cross-agency access is denied in application handlers and query filters.
- Admin session supports forced logout and security events.
- Financial operations require explicit permission; high-risk actions require a second approver.

Suggested permission families:

```text
dashboard.view
agency.view/create/approve/suspend/contract.manage
user.view/manage
role.view/manage
catalog.tour.view/create/update/publish
catalog.offer.review/approve/suspend
booking.view/update/cancel/refund.request
finance.transaction.view
finance.commission.manage
finance.settlement.approve
finance.refund.approve
content.view/edit/publish
marketing.manage
support.manage
integration.manage
report.view/export
settings.view/update
audit.view
```

## 10. Financial and currency contract

- Store amounts with explicit currency; never a naked decimal.
- Keep IRR and USD balances separate.
- Do not sum currencies without a recorded FX rate and rate source.
- Commission rules are contract-versioned.
- Payment/settlement state transitions are event-driven.
- Every correction creates a new ledger entry/document.
- VAT/Duty inclusion is per component, not global.
- Export includes currency, rate, and effective date.

## 11. Audit and observability

Audit event fields:

```text
eventId, occurredAt, actorUserId, actorRole, agencyId,
action, entityType, entityId, before, after,
reason, correlationId, ipAddress, userAgent
```

Sensitive actions:

- agency approval/suspension
- contract/commission change
- catalog/offer publish/suspend
- booking modification/cancellation
- refund/settlement/payment correction
- role/permission change
- API key rotation
- security setting change

Audit records are immutable for normal admins. The system records denied attempts too.

## 12. Delivery phases

### Phase 1 — Admin foundation

- secure admin login/session
- roles and permissions
- admin shell/menu from permissions
- users/admins
- agencies, documents, contracts
- base settings and audit log

### Phase 2 — Catalog

- destinations
- tours/hotels/flights/visas
- agency offers
- multi-currency prices
- inventory/capacity
- validation, approval, publication

Hotel scope is expanded by the Lastsecond parity review in
[`docs/plan/PHASE-2-HOTEL-LASTSECOND-GAP.md`](../plan/PHASE-2-HOTEL-LASTSECOND-GAP.md):
contact/policies, categorized media, amenity catalog, review breakdown,
recommendation/rank, booking request, LodgingBusiness JSON-LD, and hotel
publication/audit states are required before the hotel form is considered
complete.

### Phase 3 — Booking, payment, settlement

- online bookings
- reservation requests
- payment attempts
- commission
- ledger
- agency invoices
- settlement
- refunds

### Phase 4 — Content and operations

- CMS, SEO
- reviews
- banners
- discounts/campaigns
- support
- notifications
- operational reports

### Phase 5 — Commercial and advanced

- Channel API
- subscription plans
- white-label
- supplier integrations
- flight ticketing
- advanced BI

## 13. Acceptance scenario

### UI verification gate

No admin page or action is accepted from code review alone. Every change must
be exercised directly in a browser at:

- Desktop: 1440x900
- Tablet: 820x1180
- Mobile: 390x844

For each viewport, verify FA/RTL, AR/RTL, and EN/LTR, including navigation,
forms, tables, modals, empty/loading/error states, and horizontal overflow.
Playwright output is the minimum evidence; screenshots are required when the
visual structure changes.

The first operational release is accepted only when this scenario works end to end:

1. Super Admin signs in and creates an agency.
2. Agency documents are recorded and approved; a limited agency manager is created.
3. Contract and commission are configured.
4. Agency publishes a tour offer with IRR and USD pricing; tax/duty components are independent.
5. Hani admin reviews and publishes the offer; it appears in DreamsTour.
6. A customer completes an online booking; money reaches Hani and a settlement payable is recorded.
7. Another customer submits a reservation request; agency approves it and receives payment directly.
8. Finance sees online settlement and reservation-request commission separately.
9. Every event in the cycle is traceable by actor, time, and reason.

If this cycle works, the panel is an operational marketplace core, not a visual mockup.

## 14. What must not happen

- Do not create a second admin frontend.
- Do not create a second backend.
- Do not copy the template and leave it disconnected from APIs.
- Do not create a custom design system beside the template.
- Do not add a menu item for every CRUD action.
- Do not rely on hidden buttons for authorization.
- Do not sum IRR and USD.
- Do not allow manual “paid” or “settled” status edits without financial documents.
- Do not show raw API keys after creation.
- Do not hardcode role menus or language lists.
- Do not add a new admin page without updating route, permission, audit, and empty/loading/error states.

## 15. References

- `docs/architecture/FRONTEND-DESIGN-CONSISTENCY.md`
- `docs/architecture/LASTSECOND-PARITY-PLUS.md`
- `docs/adr/0032-calendar-boundary-jalali-ui-gregorian-contract.md`
- `docs/adr/0034-content-media-library.md`
- `docs/adr/0035-unified-admin-message-system.md`
- `docs/adr/0036-otp-security-state.md`
- Template reference: `reference/dreamstour-preview`
- Template preview: `http://localhost:4023`
- Existing Hani admin shell: `frontend/src/features/home-experience/ui/AdminPageShell.tsx`
- Existing admin pages: `/[locale]/admin/home`, `/content`, `/media`, `/security`
