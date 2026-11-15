# Hani Frontend — i18n and Direction Contract

- **Status:** Required — Gate 9.1
- **Date:** 2026-11-15
- **Parent:** [`FRONTEND-ARCHITECTURE.md`](FRONTEND-ARCHITECTURE.md)

This document is a **non-negotiable frontend contract**. Multilingual support
and text direction are architectural inputs, not visual afterthoughts.

> **Template-first:** these rules are applied to the purchased Dreamstour
> template. RTL fixes patch the template layout and SCSS; they do not justify
> a custom replacement design.

---

## 1. Supported Locales

| Locale | Language | Direction | Default |
|---|---|---|---|
| `fa` | Persian | `rtl` | yes |
| `en` | English | `ltr` | no |
| `ar` | Arabic | `rtl` | no |

The supported list is defined in one place:

```ts
// frontend/i18n/routing.ts
export const routing = defineRouting({
  locales: ["fa", "en", "ar"],
  defaultLocale: "fa",
  localePrefix: "always"
});
```

Rules:

- No page or component may define its own language list.
- No fallback language may be hard-coded outside this configuration and the
  content API.
- Adding a language must not require editing page components.

---

## 2. Route Contract

Every user-facing route is locale-prefixed:

```text
/fa/...
/en/...
/ar/...
```

- `/` redirects to the default locale.
- Locale is resolved on the server.
- Locale is passed to every API call that returns localized content.
- Locale is preserved when switching language.
- Query strings are preserved when switching language.

---

## 3. Direction Contract

### Server Layout

```tsx
<html lang={locale} dir={directionFor(locale)}>
```

`directionFor` is a single helper:

```ts
const RTL_LOCALES = new Set(["fa", "ar"]);

export function directionFor(locale: string): "rtl" | "ltr" {
  return RTL_LOCALES.has(locale) ? "rtl" : "ltr";
}
```

### Rules

- `dir` is set on `<html>`, not on `<body>`.
- No `body.class="rtl"` toggling.
- No client-only direction switch.
- Components use CSS logical properties.
- Physical `left` / `right` requires a documented exception.
- Directional icons are mirrored.
- Technical values use `dir="ltr"`.

### Technical LTR Values

The following must be explicitly `dir="ltr"`:

- email
- phone number
- IBAN
- card number
- tracking code
- passport number
- URL
- latitude/longitude
- OTP code input

---

## 4. Message Contract

All user-facing text lives in:

```text
frontend/messages/fa.json
frontend/messages/en.json
frontend/messages/ar.json
```

Rules:

- No English text in JSX.
- No Persian text in JSX.
- No Arabic text in JSX.
- No hard-coded labels, placeholders, validation messages, empty states, or
  error messages.
- Use ICU plurals for counts.
- Use translation keys with stable namespaces.

Example:

```json
{
  "tours": {
    "title": "تورها",
    "empty": "توری برای نمایش وجود ندارد",
    "resultCount": "{count, plural, =0 {نتیجه‌ای نیست} one {یک نتیجه} other {# نتیجه}}"
  }
}
```

Missing-key detection must run in CI.

---

## 5. Component Contract

Every shared component must be verified in:

| Locale | Direction | Required |
|---|---|---|
| FA | RTL | yes |
| EN | LTR | yes |
| AR | RTL | yes |

A component is not done unless:

- labels come from messages;
- layout is correct in RTL;
- icons are mirrored where directional;
- focus order is correct;
- long Persian/Arabic text does not overflow;
- numbers and currency render correctly.

---

## 6. Formatting Contract

### Currency

```ts
new Intl.NumberFormat(locale, {
  style: "currency",
  currency
}).format(amount)
```

Never format money with string concatenation.

### Dates

```ts
new Intl.DateTimeFormat(locale, options).format(date)
```

Persian calendar:

```ts
new Intl.DateTimeFormat("fa-IR-u-ca-persian", options)
```

### Numbers

Use locale-aware number formatting for counts, ratings, prices, and distances.

---

## 7. SEO Contract

Every public page provides:

- localized `<title>`
- localized description
- canonical URL
- `hreflang` alternates
- Open Graph / Twitter metadata
- JSON-LD when applicable

Example:

```tsx
export async function generateMetadata({ params }) {
  const { locale } = await params;

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}/tours`,
      languages: {
        fa: "/fa/tours",
        en: "/en/tours",
        ar: "/ar/tours"
      }
    }
  };
}
```

---

## 8. API Contract

Every localized API call includes `locale`:

```text
GET /market/v1/search?locale=fa
GET /market/v1/hotels?locale=ar
GET /market/v1/content/blog?locale=en
```

Rules:

- Frontend never translates API content itself.
- Slug localization comes from the API.
- Content fallback is decided by the backend, not by a frontend locale switch.
- Currency is independent from locale.

---

## 9. Testing Contract

Required tests:

- `/fa`, `/en`, `/ar` smoke tests
- language switch preserves path and query
- RTL screenshots for home, search, detail, checkout, dashboard
- LTR screenshots for English
- long-text overflow checks
- form validation messages in all locales
- currency/date rendering in all locales
- axe accessibility in FA/EN/AR

A PR that changes shared layout, forms, cards, tables, or checkout must include
RTL evidence.

---

## 10. Definition of Done

A frontend task is not done unless:

- [ ] It is locale-prefixed.
- [ ] It has FA/EN/AR messages.
- [ ] It renders correctly in RTL and LTR.
- [ ] It uses logical CSS properties.
- [ ] It has locale-aware currency/date/number formatting.
- [ ] It has localized metadata and hreflang for public pages.
- [ ] It passes RTL and LTR visual checks.
- [ ] It has no hard-coded user-facing text.
