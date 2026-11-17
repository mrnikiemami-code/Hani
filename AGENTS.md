# Hani — Agent Instructions

> این فایل برای **هر Agent** (OpenCode / Cursor / AI) الزامی است. مستندسازی بخشی از تعریف «انجام‌شده» است، نه کار جانبی.

## 1. قبل از شروع

1. `PLAN.md` را بخوان.
2. `docs/plan/STATUS.md` و `docs/plan/TASKS.md` را بخوان.
3. ADR مرتبط در `docs/adr/` را بخوان.
4. فقط روی **فاز فعال** و تسک انتخاب‌شده کار کن.

## 2. قبل از هر commit (اجباری)

- [ ] برای هر `public class/interface/record/enum` جدید، `/// <summary>` نوشته شود.
- [ ] برای هر متد public اینترفیس، قرارداد و خطاها مستند شود.
- [ ] اگر API، جریان داده یا رفتار ماژول تغییر کرد، `src/Modules/{Module}/README.md` به‌روز شود.
- [ ] اگر قرارداد API تغییر کرد، `docs/api/*.openapi.yaml` به‌روز شود.
- [ ] اگر تصمیم معماری تغییر کرد، ADR جدید ثبت شود.
- [ ] هیچ کد زبان/کالچر در C# hard-code نشده باشد؛ `LocalizationHardcodeTests` باید سبز باشد.
- [ ] همه خطاهای endpoint از `HttpContext.ToProblem(...)` / `HaniProblemDetails` استفاده کنند؛ `ProblemDetailsConventionTests` باید سبز باشد.
- [ ] هر تسک به `GAP-xx` در `docs/plan/baseline.json` متصل باشد و `scripts/check-baseline.ps1` سبز باشد.
- [ ] `docs/plan/STATUS.md` و `docs/plan/DONE.md` به‌روز شوند.
- [ ] `scripts/verify.ps1` سبز باشد.
- [ ] commit + push انجام شود.

## 3. قواعد مستندسازی

| مورد | الزام |
|---|---|
| Public type | XML `<summary>` |
| Interface | هدف + قرارداد متدها |
| Command/Query | use case + side effect |
| Endpoint | auth، خطاهای اصلی، خروجی |
| Domain aggregate | invariantها و وضعیت‌ها |
| Module | README با مسئولیت، نوع‌ها، API، persistence |
| تصمیم | ADR |

- زبان کامنت: **انگلیسی**.
- «چرا» مهم‌تر از «چه» است.
- کد تولیدشده (Migrations) از این قاعده مستثناست.
- `DocumentationTests` در CI این قواعد را اجرا می‌کند.

## 4. ممنوع

- merge کد بدون XML summary برای type عمومی.
- تغییر API بدون به‌روزرسانی OpenAPI.
- تغییر معماری بدون ADR.
- ساخت GUID با `Guid.NewGuid`/`Guid.CreateVersion7` خارج از Infrastructure؛ از `IIdGenerator` استفاده شود.
- hard-code کردن فهرست زبان‌ها یا fallback زبانی؛ از `Localization` و `ILanguageCatalog` استفاده شود.
- ساخت خروجی خطای دستی در endpoint (`Results.Problem`/`Results.BadRequest`/...)؛ فقط `HttpContext.ToProblem(...)` مجاز است.
- حذف یا دور زدن `correlationId` در پاسخ‌های خطا.
- تغییر یا حذف یک `GAP` در Baseline بدون نسخه جدید و ADR/Waiver.
- بستن یک Gate با P0 باز از همان Gate یا Gateهای قبلی.
- رها کردن `STATUS.md` / `TASKS.md` / `DONE.md` به‌صورت کهنه.
- commit بدون اجرای `scripts/verify.ps1`.

## 5. تعریف Done

یک تسک فقط وقتی Done است که:

1. کد + تست دارد.
2. XML docs و README مرتبط به‌روز است.
3. `STATUS.md` و `DONE.md` به‌روز است.
4. `verify.ps1` سبز است.
5. commit و push شده است.

> اگر یکی از این‌ها نباشد، تسک Done نیست — حتی اگر کد کار کند.


## 6. Date and calendar architecture (mandatory)

- Canonical contract: **Jalali UI, Gregorian storage/API**.
- PostgreSQL, API query strings, cache keys, JSON, and URL filters use
  Gregorian ISO only: `YYYY-MM-DD` for dates and UTC ISO for instants.
- Persian (`fa`) users see Jalali dates and a Jalali date picker. `en` and
  `ar` use the Gregorian calendar.
- Never send a Jalali string or a Jalali-shaped year to an API. A value such
  as `1405-08-25` is not a valid Hani API date.
- All new date selection uses `HaniDatePicker` or `HaniDateRangePicker` with
  `IsoDate` values. Do not import PrimeReact `Calendar` or a calendar library
  in a feature/page.
- All date display uses `formatIsoDate` / `formatIsoInstant`. Do not use raw
  `toLocaleDateString`, page-level `Intl.DateTimeFormat`, or raw ISO dates in
  JSX.
- Date-only values must not be created with `new Date("YYYY-MM-DD")` or
  `toISOString()`; that introduces timezone shifts.
- Date picker labels, presets, leap years, and month boundaries must resolve
  from the active locale, not from hard-coded Persian arrays.
- Search and booking date inputs must start empty. Do not silently prefill
  today/tomorrow; the user must choose the travel dates.
- Opening a date picker or search dropdown must never change `window.scrollY`.
  Use a centered modal or a body portal instead of scrolling the page.
- The server has a global MediatR `GregorianDateBehavior`; do not bypass it
  with direct `DateOnly` endpoint parameters without an equivalent guard.
- `scripts/verify.ps1` runs `frontend/scripts/check-date-architecture.mjs`;
  do not add a page-level calendar or raw date formatter to make a build pass.
- Homepage section order, visibility, and hero image are controlled by
  `home_page_settings` through the admin panel. Do not hardcode a new home
  section or reorder sections in a page component.
- Organic agency placement must be contract-driven; paid placement must be a
  separately labelled campaign and must never mutate organic ranking.
- Read `docs/adr/0032-calendar-boundary-jalali-ui-gregorian-contract.md` and
  `docs/plan/CALENDAR-ARCHITECTURE-PLAN.md` before changing date UI, filters,
  invoices, reports, or booking forms.

## 7. Frontend design consistency (mandatory)

- The purchased Dreamstour template is the only visual source of truth.
- Missing fields must be placed into existing template slots (title, meta,
  badge, price, CTA, image area), not into a new custom design.
- Do not create a parallel design system, a new card style, or a new button/
  form style when the template already has an equivalent.
- New Hani wrappers are allowed only for data binding, i18n, RTL, accessibility,
  and loading/empty/error states. They must not fork the template structure.
- Every UI change must be checked in FA/AR (RTL) and EN (LTR).
- Every UI change requires a screenshot and a visual review against the
  original template component.
- Read and follow `docs/architecture/FRONTEND-DESIGN-CONSISTENCY.md` before
  changing frontend cards, forms, tables, or home sections.


## 8. Lastsecond parity+ (mandatory)

- Benchmark `https://lastsecond.ir/` for each page before implementation.
- Match the user task and information architecture, not just the route name.
- The template is the visual source; Lastsecond is the UX/IA benchmark.
- If a template section does not serve the Lastsecond task, recompose it using
  template components instead of keeping it blindly.
- Hani must be equal or better than Lastsecond in clarity, speed, mobile use,
  RTL/LTR, accessibility, SEO, and data freshness.
- Example: home foreign/domestic tour tabs must be a server-driven `scope`
  filter, not two duplicated pages.
- Read `docs/architecture/LASTSECOND-PARITY-PLUS.md` before changing home,
  search, listing, or detail pages.
