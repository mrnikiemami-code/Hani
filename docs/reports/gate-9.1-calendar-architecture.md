# Gate 9.1 — Calendar Architecture Implementation

Date: 2026-11-16

Decision: [ADR-0032](../adr/0032-calendar-boundary-jalali-ui-gregorian-contract.md)

Plan: [CALENDAR-ARCHITECTURE-PLAN.md](../plan/CALENDAR-ARCHITECTURE-PLAN.md)

## Result

The first calendar architecture slice is implemented.

- Persian (`fa`) date pickers now render a centered Jalali modal with
  Persian digits and no prefilled date.
- English and Arabic pickers stay Gregorian.
- Picker and display components exchange canonical Gregorian
  `YYYY-MM-DD` values.
- Server date filters accept Gregorian ISO only.
- A Jalali-shaped query value such as `startDate=1405-08-25` is rejected with
  `400` before it can become Gregorian year 1405.
- AGENTS.md now makes the date boundary mandatory for future agents.

## Implemented foundation

| File | Responsibility |
|---|---|
| `frontend/src/lib/hani/calendar/types.ts` | `IsoDate`/`IsoInstant`, Gregorian validation, day arithmetic |
| `frontend/src/lib/hani/calendar/format.ts` | Jalali/Gregorian display tags, date/instant formatters |
| `frontend/src/lib/hani/calendar/date-object.ts` | Picker conversions, Persian month range |
| `frontend/src/components/hani/date/HaniDatePicker.tsx` | Single date boundary |
| `frontend/src/components/hani/date/HaniDateRangePicker.tsx` | Range boundary, presets, custom trigger |
| `frontend/src/style/scss/components/_hani-datepicker.scss` | Template-compatible picker skin |

## Behavior

| Locale | Display | Picker | Canonical value |
|---|---|---|---|
| `fa` | `۱۴۰۵/۰۸/۲۵` | Jalali, week starts Saturday | `2026-11-16` |
| `en` | `16-11-2026` | Gregorian | `2026-11-16` |
| `ar` | Gregorian, Arabic digits | Gregorian | `2026-11-16` |

The browser URL and all API requests use the canonical Gregorian date. The
Jalali conversion exists only in the UI adapter.

## Migrated surfaces

- Home hero foreign range and domestic single date; both start empty and
  require user selection.
- Shared `CommonDateRange` used by template home variants.
- Legacy `DatePicker` facade, so existing template forms get Jalali UI
  without page-level calendar code.
- Dashboard `PredefinedDateRanges` box with calendar-aware month presets.
- Home hero dropdowns are self-contained, searchable, and progressively
  reveal more options on scroll.
- Public tour cards, home content, blog/content lists and details, agency
  profile, checkout, user/agent dashboards, invoices, payments, refunds,
  notifications and reviews now use the shared formatter.

## Server guards

- `Hani.BuildingBlocks.Application.GregorianDateGuards`
- Global MediatR `GregorianDateBehavior`: every command/query with `DateOnly`
  properties is checked before its handler runs.
- Marketplace search: start/end year range and ordering.
- Flight search: departure year range.
- OpenAPI documents the dates as Gregorian and includes examples.

## Verification

- Frontend production build: green.
- Playwright: 16 passed.
  - FA single picker is Jalali while `data-iso-value` is Gregorian.
  - FA range is Jalali while both canonical dates are Gregorian.
  - Selecting a day changes the canonical Gregorian value.
  - EN picker stays Gregorian.
  - Jalali-shaped API date returns `400`.
  - Valid Gregorian range returns `200`.
  - Mobile 390px has no overflow.
- Unit tests: 168 passed (includes guards and behavior tests).
- Architecture tests: 34 passed.
- Integration tests: 6 passed.
- Lighthouse: Accessibility 100, Best Practices 100, SEO 100 on:
  - `/fa`
  - `/en`
  - `/ar`
  - `/fa/tours?scope=domestic`
- `scripts/verify.ps1`: green.
- `npm run check:date-architecture`: green; verify now runs it as a gate.

## Screenshots

- `docs/reports/gate-9.1-home-default.png`
- `docs/reports/gate-9.1-home-en.png`
- `docs/reports/gate-9.1-home-ar.png`
- `docs/reports/gate-9.1-home-mobile-fa.png`
- `docs/reports/gate-9.1-home-jalali-modal-fa.png`
- `docs/reports/gate-9.1-home-jalali-modal-mobile-fa.png`

## Remaining

- Migrate the remaining template `DatePicker` call sites from `Date` props to
  `IsoDate` props; the facade is an explicitly documented compatibility layer.
- Apply the shared date guards to booking, review, payment, settlement,
  identity and report commands.
- Add localized server-side formatting for emails, PDFs and exports.
- CI guard is implemented as `frontend/scripts/check-date-architecture.mjs`
  and runs from `scripts/verify.ps1`.
