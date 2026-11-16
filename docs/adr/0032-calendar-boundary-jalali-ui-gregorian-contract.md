# ADR-0032: Calendar Boundary — Jalali UI, Gregorian Contract

- Status: Proposed
- Date: 2026-11-16
- Gate: 9.1 (cross-cutting)
- Related: [ADR-0010](0010-i18n-and-seo.md), [ADR-0018](0018-config-driven-localization.md)

## Context

Persian users expect Jalali dates in every user-facing surface: search
filters, tour and flight results, checkout, invoices, reviews, dashboards,
notifications, emails, and admin reports.

Hani's canonical data model is already Gregorian:

- PostgreSQL stores `date` for calendar dates and `timestamptz` for instants.
- ASP.NET API requests and responses use `DateOnly` / `DateTimeOffset` and
  OpenAPI `format: date` / `format: date-time`.
- Server-side filters compare Gregorian values.

The frontend does not currently have one calendar boundary:

- PrimeReact `Calendar` renders a Gregorian month grid for every locale.
- `CommonDateRange` uses `date-fns` `faIR`; this localizes Gregorian month
  names but does not convert the Gregorian calendar to Jalali.
- Some pages use `Intl.DateTimeFormat(locale)`, some use raw
  `toLocaleDateString(locale)`, and checkout renders raw `YYYY-MM-DD` strings.
- `DatePicker` props accept `Date`, so date-only values inherit timezone and
  Gregorian assumptions.
- Server validators do not reject a Jalali-shaped year such as `1405-08-25`;
  `DateOnly` would accept it as Gregorian year 1405.

A page-by-page fix would produce inconsistent formatting, incorrect filters,
and future regressions. The calendar system must be a platform boundary.

## Decision

### 1. Canonical date types

The wire, API, cache, URL query, and database contract is always Gregorian:

- Date-only: ISO 8601 `YYYY-MM-DD`, no time and no timezone.
- Instant: ISO 8601 UTC with `Z` (`YYYY-MM-DDTHH:mm:ss.sssZ`).

No Jalali string, Jalali year, or local-time ISO string may cross the API
boundary.

Frontend types:

```ts
type IsoDate = string & { readonly __brand: "IsoDate" };
type IsoInstant = string & { readonly __brand: "IsoInstant" };
```

Runtime validation rejects invalid dates and impossible values.

### 2. One calendar resolver

A single locale-to-calendar mapping is the source of truth:

| Locale | Calendar | BCP-47 display tag | Week start |
|---|---|---|---|
| `fa` | Persian | `fa-IR-u-ca-persian` | Saturday |
| `en` | Gregorian | `en-GB-u-ca-gregory` | Monday |
| `ar` | Gregorian | `ar-u-ca-gregory` | Sunday |

No page checks `locale === "fa"` to choose a calendar. Shared helpers and
components resolve the calendar from the active locale.

`Intl.DateTimeFormat` is used for text formatting only. It is not used as a
date-picker engine.

### 3. One date-picker boundary

All date selection goes through Hani-owned primitives:

- `HaniDatePicker` for a single date.
- `HaniDateRangePicker` for a range.
- `HaniTimePicker` for time-only values.

Their public value contract is `IsoDate | null` and `IsoTime | null`; not
JavaScript `Date`. Internally they convert between the locale calendar and
the canonical Gregorian ISO value.

Feature pages must not import PrimeReact `Calendar` or a calendar library
directly. The template's visual classes and form layout remain the visual
source.

Recommended implementation: `react-multi-date-picker` v4.5.2 with its
Persian calendar and range support, wrapped in Hani styling. A short
accessibility/visual spike must approve it before adoption. If it fails, the
fallback is a headless calendar built on `jalaali-js`; the public Hani
primitive contract does not change.

### 4. Conversion is centralized

Only the calendar adapter converts values:

```text
Jalali display / picker
        ↕  Hani calendar adapter
IsoDate (Gregorian, YYYY-MM-DD)
        ↕  API client / URLSearchParams / JSON
ASP.NET DateOnly
        ↕
PostgreSQL date
```

Date-only conversion must use calendar fields, not `new Date("YYYY-MM-DD")`
or `toISOString()`, because those introduce timezone shifts.

Weekday, month names, digits, leap years, and month lengths come from the
calendar adapter, not from hard-coded Persian arrays.

### 5. Display formatting is centralized

All UI date rendering uses a shared formatter:

- `formatDate(isoDate, locale, style)`
- `formatDateTime(isoInstant, locale, style)`
- `formatWeekday(isoDate, locale)`

Rules:

- `fa` renders Jalali with Persian digits.
- `en` and `ar` render Gregorian.
- Date-only values never shift by timezone.
- Instant values use the Hani business timezone (`Asia/Tehran`) unless a
  surface explicitly documents a user timezone.
- Raw `toLocaleDateString`, `new Intl.DateTimeFormat` in feature files, and
  raw ISO date strings in JSX are prohibited.

SEO/JSON-LD dates stay Gregorian ISO, as schema.org requires.

### 6. Server validation

Every date-only query or command validates:

- intended Gregorian range, for example `1900-01-01` to `2100-12-31` for
  search and booking filters;
- `start <= end`;
- valid calendar date;
- no Jalali year disguised as a Gregorian year.

This prevents `startDate=1405-08-25` from being accepted as Gregorian year
1405. Invalid values return the standard Problem Details response with a
stable error code.

The business "today" is computed through a clock abstraction using
`Asia/Tehran`, not `DateTime.UtcNow`, so availability and `disablePast`
agree at midnight.

### 7. Range semantics

- Date-only filters are inclusive: `startDate <= date <= endDate`.
- Instant filters use a half-open interval:
  `[start 00:00 Asia/Tehran, end+1 00:00 Asia/Tehran)` converted to UTC.
- Calendar-aware presets in `fa` use Jalali month boundaries; `en`/`ar` use
  Gregorian month boundaries.
- Booking departure dates remain Gregorian `DateOnly` end to end.

### 8. Emails, PDFs, exports, and notifications

The server stores and renders canonical Gregorian data. A server-side date
display service formats for the recipient locale:

- `fa` recipient: Jalali display;
- `en`/`ar` recipient: Gregorian display;
- CSV/API exports: Gregorian ISO, optionally with a separate localized
  display column.

## Rejected alternatives

- **Store Jalali in PostgreSQL.** Rejected: breaks range queries, indexes,
  sorting, provider interoperability, and timezone reasoning.
- **Store a Jalali string alongside every date.** Rejected: two sources of
  truth and drift.
- **Translate Gregorian month names in PrimeReact.** Rejected: the grid,
  leap years, and month lengths remain Gregorian; `date-fns` `faIR` has the
  same limitation.
- **Use `Intl` for everything.** Rejected: `Intl` formats text but does not
  provide a Jalali picker grid or range interaction.
- **Fix only the home or tour page.** Rejected: duplicates the boundary and
  guarantees inconsistent behavior across checkout, invoices, and admin.

## Consequences

- One conversion layer and one date-picker primitive must be maintained.
- All existing `Date`-based picker call sites need a mechanical migration to
  `IsoDate`.
- Server validation must be added to existing date parameters.
- Search URLs continue to carry Gregorian ISO dates; users see Jalali in the
  UI. URLs are a technical contract, not a display surface.
- Tests must cover conversion, leap years, timezone boundaries, query
  serialization, picker keyboard behavior, and FA/EN/AR screenshots.

## Migration outline

1. Add ADR, calendar foundation, and conversion tests.
2. Replace the shared picker primitives; no page-specific calendar logic.
3. Migrate all display sites to the shared formatter.
4. Add server date validation and business clock.
5. Wire filters/checkout/forms and assert network payloads in Playwright.
6. Add lint/test guards against raw date formatting and Jalali leakage.

Detailed execution plan: [`../plan/CALENDAR-ARCHITECTURE-PLAN.md`](../plan/CALENDAR-ARCHITECTURE-PLAN.md).
