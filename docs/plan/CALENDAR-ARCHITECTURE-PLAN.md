# Hani Calendar Architecture Plan

Date: 2026-11-16

Status: Proposed — planning only; no runtime behavior changed by this document.

Decision record: [`../adr/0032-calendar-boundary-jalali-ui-gregorian-contract.md`](../adr/0032-calendar-boundary-jalali-ui-gregorian-contract.md)

## 1. Objective

In Persian (`fa`), every user-facing date must be Jalali, including:

- date fields and date pickers;
- date ranges and presets;
- search result departure dates;
- checkout and booking summaries;
- invoices, payments, refunds, reviews, notifications;
- dashboards, admin tables, emails, PDFs, and reports.

The server, API, cache, URL contract, and database must use Gregorian dates
only. There is no Jalali column, Jalali query parameter, or Jalali cache key.

## 2. Current state audit

| Area | Current behavior | Gap |
|---|---|---|
| PostgreSQL | `date` / `timestamptz` | Correct; no schema change |
| ASP.NET contracts | `DateOnly`, `DateTimeOffset`, OpenAPI `format: date` | Correct format, missing Gregorian range validation |
| Marketplace search | `StartDate` / `EndDate` are `DateOnly` | No `start <= end` or reasonable-range validation |
| `appDatePicker.tsx` | PrimeReact Gregorian `Calendar` | No Jalali grid |
| `CommonDateRange.tsx` | PrimeReact Gregorian range + `date-fns` `faIR` | `faIR` localizes Gregorian names, does not convert calendar |
| `datePicker.tsx` | `MM/dd/yyyy`, English presets | Not localized/calendar-aware |
| Home/search cards | Mixed `Intl.DateTimeFormat(locale)` | Not centralized; some paths may use Gregorian |
| List/dashboard pages | Raw `toLocaleDateString(locale)` | Locale-dependent, no explicit calendar contract |
| Checkout | Raw `{item.startDate} — {item.endDate}` | Displays ISO Gregorian in Persian UI |
| `nextDepartureDate` | Raw ISO string formatted in one view | Inconsistent across cards |
| `DateTime.UtcNow` | Used for availability "today" | Business date may differ in Tehran |
| Emails/reports | Not yet on one formatter | Future inconsistency risk |

Representative files:

- `frontend/src/components/common-date-picker/appDatePicker.tsx`
- `frontend/src/components/common-date-picker/datePicker.tsx`
- `frontend/src/components/common-date-range-picker/CommonDateRange.tsx`
- `frontend/src/utils/dateFormat.ts`
- `frontend/src/features/home-experience/ui/HaniHomeTourSearch.tsx`
- `frontend/src/features/home-experience/ui/HaniLatestContent.tsx`
- `frontend/src/features/content/ui/ContentList.tsx`
- `frontend/src/features/content/ui/ContentDetail.tsx`
- `frontend/src/features/content/ui/BlogDetailView.tsx`
- `frontend/src/views/blog/blog-grid/blogGrid.tsx`
- `frontend/src/views/tour/tour-grid/tourGrid.tsx`
- `frontend/src/app/[locale]/(public-pages)/checkout/[productId]/page.tsx`
- `frontend/src/app/[locale]/(public-pages)/user/**/page.tsx`
- `frontend/src/app/[locale]/(public-pages)/agent/**/page.tsx`
- `frontend/src/views/user-dashboard/dashboard/dashboard.tsx`
- `src/Modules/Marketplace/Hani.Modules.Marketplace.Application/Queries/SearchProducts/SearchProductsQueryValidator.cs`
- `src/Modules/Marketplace/Hani.Modules.Marketplace.Presentation/MarketplaceEndpoints.cs`
- `src/Modules/Supply/Hani.Modules.Supply.Infrastructure/ReadServices/OfferReadService.cs`

## 3. Target architecture

```text
┌──────────────────────────────────────────────────────────────┐
│ UI (fa = Jalali, en/ar = Gregorian)                         │
│  HaniDatePicker / HaniDateRangePicker / formatDate          │
└──────────────────────────────┬───────────────────────────────┘
                               │ IsoDate / IsoInstant
┌──────────────────────────────▼───────────────────────────────┐
│ Frontend boundary                                            │
│  calendar resolver + conversion + validation + API client   │
│  URLSearchParams always receives YYYY-MM-DD                 │
└──────────────────────────────┬───────────────────────────────┘
                               │ JSON / query string
┌──────────────────────────────▼───────────────────────────────┐
│ API contract                                                 │
│  DateOnly / DateTimeOffset; OpenAPI format date/date-time   │
│  Gregorian range validation + Problem Details                │
└──────────────────────────────┬───────────────────────────────┘
                               │
┌──────────────────────────────▼───────────────────────────────┐
│ PostgreSQL                                                   │
│  date / timestamptz — Gregorian only                         │
└──────────────────────────────────────────────────────────────┘
```

### 3.1 Canonical types

```ts
// Date-only: no time, no timezone. Example: "2026-11-16"
type IsoDate = string & { readonly __brand: "IsoDate" };

// Instant: UTC. Example: "2026-11-16T12:30:00.000Z"
type IsoInstant = string & { readonly __brand: "IsoInstant" };

// Time-only: no calendar. Example: "09:30"
type IsoTime = string & { readonly __brand: "IsoTime" };
```

Rules:

- `IsoDate` is created only by validated parsers/adapters.
- Never create an `IsoDate` with `new Date(...).toISOString()`.
- Never send a Jalali display string to the API.
- Never render an `IsoDate` directly in JSX.

### 3.2 Calendar resolver

`frontend/src/lib/hani/calendar/calendar-system.ts`

```ts
type CalendarSystem = "persian" | "gregorian";

resolveCalendar(locale): CalendarSystem
formatDate(isoDate, locale, style): string
formatDateTime(isoInstant, locale, style): string
formatWeekday(isoDate, locale): string
```

Display tags are explicit:

- `fa`: `fa-IR-u-ca-persian`
- `en`: `en-GB-u-ca-gregory`
- `ar`: `ar-u-ca-gregory`

No feature file hard-codes Persian month names, Jalali year math, or
`locale === "fa"` calendar branches.

### 3.3 Picker primitives

`frontend/src/components/hani/date/`

- `HaniDatePicker`
  - `value: IsoDate | null`
  - `onChange(value: IsoDate | null)`
  - `min?: IsoDate`, `max?: IsoDate`
  - localized label, placeholder, error, and helper text
- `HaniDateRangePicker`
  - `value: { start: IsoDate; end: IsoDate } | null`
  - `onChange(range)`
  - inclusive range
  - calendar-aware presets
- `HaniTimePicker`
  - `IsoTime` only; no calendar conversion.

The visual shell remains the existing template form control, popup, and
`.form-item` markup. The component may be headless internally.

### 3.4 Conversion rules

- Jalali -> Gregorian happens once, immediately before `onChange`.
- Gregorian -> Jalali happens once, when rendering the picker or display.
- Date-only conversion uses local calendar fields, never UTC shifts.
- Leap-year and month-length logic comes from the chosen calendar library,
  not custom formulas.
- `today` is the Hani business date in `Asia/Tehran`.

## 4. API and server contract

### 4.1 Query and body

All date filters use Gregorian ISO:

```text
GET /market/v1/search?locale=fa&startDate=2026-11-16&endDate=2026-11-20
```

The browser URL is also Gregorian. This is intentional: it is the technical
contract and must remain stable for caching, sharing, and server filters. The
UI field displays `۲۵ آبان ۱۴۰۵`.

### 4.2 Validation

Add a shared validator for date parameters:

- valid Gregorian date;
- search/booking range from `1900-01-01` to `2100-12-31`;
- `startDate <= endDate`;
- maximum range where a report requires it;
- `DateOnly` parameters never accept a time component.

A Jalali-shaped value such as `1405-08-25` must fail with a stable
`ProblemDetails` error code, not silently become Gregorian year 1405.

Apply the same rule to:

- marketplace search;
- flight search;
- hotel/booking requests;
- reviews from/to;
- payment/reconciliation periods;
- settlement periods;
- identity engagement from/to;
- agency license/subscription dates;
- admin reports and exports.

### 4.3 Business clock

Add a shared `IHaniClock`/`TimeProvider` adapter returning:

- `UtcNow`;
- `TehranToday` (`DateOnly`);
- `TehranNow`.

Availability, `disablePast`, and "today" presets use `TehranToday`, not
`DateTime.UtcNow`. The frontend receives/derives the same business date
consistently.

## 5. Display contract

Every date display uses a formatter:

| Data | Contract | FA display |
|---|---|---|
| Tour departure | `IsoDate` | `۲۵ آبان ۱۴۰۵` |
| Hotel check-in | `IsoDate` | `۲۵ آبان ۱۴۰۵` |
| Invoice issued | `IsoInstant` | `۲۵ آبان ۱۴۰۵، ۱۵:۳۰` |
| Review created | `IsoInstant` | `۲۵ آبان ۱۴۰۵` |
| Blog published | `IsoInstant` | `۲۵ آبان ۱۴۰۵` |
| JSON-LD date | Gregorian ISO | `2026-11-16` (not Jalali) |

Prohibited in feature/page code:

- `toLocaleDateString(...)`
- `toLocaleString(...)` for dates
- `new Intl.DateTimeFormat(...)` for dates
- `new Date("YYYY-MM-DD")` for date-only domain values
- raw `{item.startDate}` in JSX
- `format(date, "dd-MM-yyyy")` for user-facing labels

## 6. Date picker library decision

Recommendation: `react-multi-date-picker` v4.5.2.

Reasons:

- Persian/Jalali calendar and range mode in one maintained package;
- React peer range includes React 19;
- supports custom styling so the template remains visual source;
- avoids hand-writing leap-year/month-length logic.

Mandatory spike before adoption:

1. keyboard navigation and screen-reader announcement;
2. RTL placement in the template form;
3. mobile popup at 390px;
4. visual match with the existing template date control;
5. bundle size and SSR behavior;
6. conversion of a range across a Persian year boundary.

Fallback: headless calendar using `jalaali-js` and Hani-owned markup. The
public `HaniDatePicker`/`HaniDateRangePicker` contract stays unchanged, so a
fallback does not leak into pages.

## 7. Migration phases

### Phase 0 — Contract and guards

- Add ADR-0032 and this plan.
- Add date types and lint/review rules.
- Inventory all date pickers, date displays, and date API parameters.
- No behavior change.

### Phase 1 — Calendar foundation

- Add calendar resolver, parser, formatter, and conversion adapter.
- Add unit tests for Jalali/Gregorian round trips.
- Add fixtures for:
  - `2025-03-20` <-> `1403-12-30`;
  - `2026-11-16` <-> `1405-08-25`;
  - `2028-02-29`;
  - Persian year boundaries;
  - Persian/Arabic digits.
- Add `IsoDate` validation.

### Phase 2 — Shared picker migration

- Replace the internals of `appDatePicker.tsx`, `CommonDateRange.tsx`, and
  `datePicker.tsx` with Hani primitives.
- FA uses Jalali grid; EN/AR use Gregorian.
- Keep template form markup and styles.
- Migrate all shared picker call sites mechanically from `Date` to `IsoDate`.
- Add accessibility tests and screenshots.

### Phase 3 — Display migration

- Replace every `toLocaleDateString`, raw `Intl` date format, and raw ISO
  display with `formatDate`/`formatDateTime`.
- Migrate:
  - tour cards and tour grid;
  - content/blog cards and details;
  - checkout and booking summaries;
  - user/agent dashboards;
  - invoices/payments/refunds;
  - reviews and notifications;
  - visa and hotel surfaces.
- Add a grep/test gate for prohibited patterns.

### Phase 4 — Query and server validation

- Wire date pickers into filters and forms.
- Ensure API client serializes `IsoDate` only.
- Add server date validators and `IHaniClock`.
- Update OpenAPI examples and descriptions.
- Add API tests rejecting Jalali-shaped years.

### Phase 5 — Reports, emails, and exports

- Add server-side localized date display for emails/PDFs/notifications.
- Exports use Gregorian ISO by default; optional localized display column.
- Admin report presets use locale calendar boundaries.

### Phase 6 — Full QA

- FA/EN/AR screenshots (desktop + mobile).
- Playwright intercepts API request and asserts Gregorian payload.
- Date picker keyboard and screen-reader checks.
- Lighthouse accessibility remains 100.
- Regression test: no raw date formatting remains.

## 8. Test matrix

| Test | Expected |
|---|---|
| FA tour filter shows departure | `۲۵ آبان ۱۴۰۵` |
| FA picker month header | `آبان ۱۴۰۵` |
| FA selected date -> API | `startDate=2026-11-16` |
| EN picker | `16 November 2026` |
| EN selected date -> API | `startDate=2026-11-16` |
| AR picker calendar | Gregorian, Arabic locale digits |
| Range across Nowruz | `1403-12-30` to `1404-01-02` -> correct Gregorian interval |
| Leap day | `2028-02-29` displayed correctly |
| Invalid Jalali-shaped API value | `400 ProblemDetails` |
| `startDate > endDate` | `400 ProblemDetails` |
| Date-only timezone | no day shift in any timezone |
| Instant display | `Asia/Tehran` business timezone |
| Mobile 390px | no overflow; popup usable |
| Keyboard | open, arrow, select, close, focus return |
| SSR/hydration | stable display, no mismatch warning |

## 9. Acceptance criteria

- No Jalali value is sent to or stored by the server.
- No Gregorian picker is visible in FA.
- No raw ISO/Gregorian date is visible in FA user-facing UI.
- EN and AR remain Gregorian.
- One adapter and one picker primitive serve all pages.
- API/schema docs explicitly state Gregorian `format: date`.
- Existing home/tour Lighthouse 100 stays green.
- FA/EN/AR screenshots and mobile screenshot are reviewed.
- `scripts/verify.ps1` and the frontend build are green.

## 10. Risks and mitigations

| Risk | Mitigation |
|---|---|
| Timezone off-by-one on date-only values | Pure calendar-field conversion; never `new Date("YYYY-MM-DD")` |
| Jalali year accepted as Gregorian | Server range validation + Problem Details tests |
| Picker visual drift | Template shell, visual spike, screenshots |
| Hydration mismatch around "today" | Business clock + stable server-provided today |
| Duplicate conversion logic | Single adapter; lint guard |
| Report month boundaries | Calendar-aware presets, explicit tests |
| Large migration surface | Mechanical phase migration, shared primitives first |

## 11. Decisions needed before implementation

1. Approve the Gregorian URL contract (UI Jalali, URL Gregorian ISO).
2. Approve `react-multi-date-picker` after the spike, or choose the headless
   fallback.
3. Confirm `Asia/Tehran` as the business timezone for EN/AR operational
   dates too.
4. Confirm exports show Gregorian ISO only, or Gregorian plus localized
   display column.

No runtime code has been changed by this plan.


## 12. Implementation status (2026-11-16)

### Done in this slice

- Added `IsoDate`/`IsoInstant` types and Gregorian validation.
- Added locale calendar resolver and display formatters.
- Added `HaniDatePicker` and `HaniDateRangePicker`; fa renders Jalali,
  en/ar render Gregorian.
- Migrated the home hero date controls and the shared `CommonDateRange`.
- Replaced the template `DatePicker` internals with the locale-aware facade;
  legacy `Date` call sites keep working without page-level calendar logic.
- Migrated dashboard range box to the shared range primitive.
- Migrated public display sites off raw `toLocaleDateString`/`Intl` usage.
- Added Gregorian range guards to marketplace and flight search validators.
- Added `AGENTS.md` mandatory date architecture rules.
- Added Playwright coverage for Jalali display, Gregorian canonical values,
  EN Gregorian behavior, API rejection of `1405-08-25`, and mobile overflow.
- Added OpenAPI Gregorian examples and descriptions.

### Remaining migration

- Convert the remaining template `DatePicker` call sites from `Date` props to
  `IsoDate` props; the current facade is a compatibility layer, not the final
  shape.
- Apply the shared guards to every remaining date command (booking, reviews,
  payments, settlement, identity, reports).
- Add localized server-side formatting for emails/PDFs/exports.
- Add a lint/CI guard that rejects imports of PrimeReact `Calendar` in feature
  pages and raw date formatting in UI code.
