# Hani Frontend Architecture

- **Status:** Accepted — Template-First — Gate 9.1
- **Date:** 2026-11-15
- **Scope:** `frontend/` (Hani web app)
- **Reference UI source:** `reference/dreamstour-v1.1.7/nextjs` — **application base and single visual source of truth**
- **Related:** `docs/plan/GATE-9.1-CONTRACT.md`, `docs/plan/LASTSECOND-SIMULATION-MAP.md`, `docs/adr/0030-frontend-architecture.md`
- **Mandatory i18n/RTL contract:** [`FRONTEND-I18N-RTL.md`](FRONTEND-I18N-RTL.md)

> **Non-negotiable:** The purchased Dreamstour template is the visual base.
> Hani adds platform concerns — API, auth, i18n, RTL, preferences, checkout —
> inside the template. We do **not** build a parallel design system and we do
> **not** redesign pages from scratch. Any missing feature or field is added
> using the template's existing layout, spacing, components, and visual language.
>
> **Non-negotiable:** Hani is multilingual (FA/EN/AR) and direction-aware
> (RTL/LTR). Locale and direction are architectural inputs, not a theme
> toggle. No page or component is complete without FA/EN/AR and RTL/LTR
> verification. See the mandatory contract above.

---

## 1. Purpose

This document defines the frontend architecture for Hani after the purchased
Dreamstour template is introduced.

The template is the **application base and the single visual source of truth**.
Hani adds its platform layer (API, auth, i18n, RTL, preferences, checkout)
inside the template. We do not build a parallel design system and we do not
redesign pages from scratch.

### Goals

- Use the purchased template as the only visual implementation.
- Keep all 12 Dreamstour home experiences, selectable by the user in settings.
- Map each home experience to its actual template view.
- Deliver FA/EN/AR and RTL/LTR by fixing and extending the template, not by
  replacing it.
- Connect template pages to Hani APIs with typed contracts.
- Add missing fields and features inside the template's existing patterns.
- Remove template defects: duplicate route trees, broken build, static export,
  demo-only RTL, mock data.
- Keep the UI consistent and accessible.
- Keep business logic out of React components.
- Make the frontend testable without a live backend.

### Non-goals

- Redesigning the template or inventing a new visual language.
- Building a second component library beside the template.
- Replacing template pages with custom Hani pages.
- Recreating every Dreamstour demo page.
- Keeping car/cruise/bus/guide/activity verticals in the Hani MVP.
- Building a second backend inside the frontend.
- Using mock data in production.

---

## 2. Architecture Principles

1. **Template-first**
   The Dreamstour template is the only visual source. Hani adds behavior,
   data, auth, i18n, and RTL; it does not invent a parallel design.

2. **Contract-first**
   Public DTOs come from Hani OpenAPI. TypeScript types are generated, not
   hand-copied.

3. **Server-first**
   Public pages are Server Components. Client Components are used only for
   interaction.

4. **Vertical slices**
   Each business capability owns its domain, application, infrastructure, and
   UI code.

5. **One source of truth for UI**
   No duplicate page trees, no duplicate header/footer, no duplicate card
   implementations, no custom replacement for a template page.

6. **Locale/RTL first**
   Direction and language are resolved on the server. RTL is not a client-side
   demo toggle.

7. **No business logic in JSX**
   Pages compose. Use cases, mappers, and validation live outside components.

8. **Progressive enhancement**
   Primary content must render without client-side JavaScript.

9. **Accessibility by default**
   WCAG 2.2 AA, keyboard-first, visible focus, semantic HTML.

---

## 3. Target Folder Structure

The template's `src` tree is the application base. Hani integration code lives
inside it; there is no second app tree and no parallel design system.

```text
frontend/
  src/
    app/                    # TEMPLATE-OWNED route tree (one only)
      [locale]/             # locale wrapper added by Hani
        (public)/           # template public routes
        (auth)/             # template auth routes, patched to OTP
        (dashboard)/        # template user/agent dashboards
        checkout/           # Hani checkout flow inside template shell
    views/                  # TEMPLATE-OWNED page views
      home-service-one/
      home-service-two/
      home-one/
      home-two/
      home-three/
      home-four/
      home-five/
      home-six/
      home-seven/
      home-ten/
      home-eleven/
      home-twelve/
    components/             # TEMPLATE-OWNED components
      common-header/
      common-footer/
      common-sidebar/
      pages/
      ...
    core/                   # TEMPLATE-OWNED shared core
    style/                  # TEMPLATE-OWNED SCSS source of truth
    config/                 # template config + Hani config merge
    features/               # HANI-OWNED integration slices
      home-experience/      # registry, resolver, settings
      auth/                 # OTP/session integration
      checkout/             # quote/order/payment integration
      preferences/          # home experience, locale, currency
    lib/
      hani/                 # HANI-OWNED API client, generated types, mappers
      i18n/                 # HANI-OWNED next-intl routing/messages helpers
      seo/                  # HANI-OWNED metadata/JSON-LD builders
      analytics/            # HANI-OWNED event contracts
    messages/               # HANI-OWNED FA/EN/AR catalogs
    hooks/                  # template hooks + Hani hooks
    providers/              # template providers + Hani providers
    types/                  # template types + Hani view models
  public/
    assets/                 # TEMPLATE-OWNED images/icons
  tests/
    e2e/
    visual/
```

### Ownership Rule

| Area | Owner | Rule |
|---|---|---|
| `src/app` | Template + Hani patch | One app tree only |
| `src/views` | Template | Do not replace with custom pages |
| `src/components` | Template | Reuse; patch RTL/i18n/API binding |
| `src/core` | Template | Reuse; patch duplicated stores/headers |
| `src/style` | Template | Canonical visual system |
| `src/features` | Hani | Integration logic only |
| `src/lib/hani` | Hani | API contracts and adapters |
| `src/messages` | Hani | Locale catalogs |

### Dependency Rule

```text
src/app  ->  template views/components
src/app  ->  src/features/*  ->  src/lib/hani
src/features/domain  ->  no React/Next/HTTP
src/features/ui  ->  template components + view models
src/lib/hani  ->  generated OpenAPI types + mappers
```

Rules:

- Template pages stay the visual source; Hani wraps them, not replaces them.
- `src/features` may compose template components, but must not fork them.
- `src/features/domain` must not import React, Next.js, or HTTP.
- `src/features/ui` must not call `fetch`.
- `src/lib/hani` is the only layer that knows Hani endpoints.
- New UI components are allowed only when the template has no equivalent; they
  must reuse template tokens, spacing, typography, and behavior.
- No second `components/ui` design system.
- No custom `HomeExperienceFrame`; registry loaders point to template views.

---

## 4. Rendering Strategy

| Page type | Strategy | Reason |
|---|---|---|
| Home | Server Component + variant registry | SEO + personalization |
| Search/list | Server Component | SEO + fast first paint |
| Detail | Server Component + client interaction islands | SEO + booking actions |
| Checkout | Client-heavy with server data | Payment interaction |
| Traveler dashboard | Server shell + client tables | Auth + filters |
| Agency dashboard | Server shell + client tables | Auth + large data |
| Content | Server Component | SEO/JSON-LD |

Use `revalidate` and cache tags for public catalog/content data. Use
`no-store` for auth and checkout data.

---

## 5. Home Experience System

### 5.1. Decision

All 12 Dreamstour home layouts are retained as **Home Experiences**. They are
not 12 public routes. There is one public home route:

```text
/[locale]
```

The selected experience changes the layout, not the data contract.

### 5.2. Registry

```ts
// features/home/domain/home-experience.ts
export const HOME_EXPERIENCE_IDS = [
  "all-services-classic",
  "all-services-modern",
  "tour-classic",
  "hotel",
  "car",
  "flight",
  "cruise",
  "tour-editorial",
  "bus",
  "guide",
  "activity",
  "visa"
] as const;

export type HomeExperienceId = (typeof HOME_EXPERIENCE_IDS)[number];

export type HomeExperienceDefinition = {
  id: HomeExperienceId;
  source: string;
  labelKey: string;
  descriptionKey: string;
  previewImage: string;
  enabled: boolean;
  load: () => Promise<{ default: React.ComponentType<HomeExperienceProps> }>;
};
```

| ID | Source | Template view | Primary focus |
|---|---|---|---|
| `all-services-classic` | `index-1` | `@/views/home-service-one/homeServiceOne` | all services |
| `all-services-modern` | `index-2` | `@/views/home-service-two/homeServiceTwo` | all services |
| `tour-classic` | `index-3` | `@/views/home-one/homeOne` | tours |
| `hotel` | `index-4` | `@/views/home-two/homeTwo` | hotels |
| `car` | `index-5` | `@/views/home-three/homeThree` | cars |
| `flight` | `index-6` | `@/views/home-four/homeFour` | flights |
| `cruise` | `index-7` | `@/views/home-five/homeFive` | cruises |
| `tour-editorial` | `index-8` | `@/views/home-six/homeSix` | tours/editorial |
| `bus` | `index-9` | `@/views/home-seven/homeSeven` | buses |
| `guide` | `index-10` | `@/views/home-ten/homeTen` | guides |
| `activity` | `index-11` | `@/views/home-eleven/homeEleven` | activities |
| `visa` | `index-12` | `@/views/home-twelve/homeTwelve` | visa |

The registry is the only Hani abstraction around home layouts. Its loaders
point to the actual template views. There is no custom replacement frame.

```ts
// src/features/home-experience/infrastructure/registry.ts
export const HOME_EXPERIENCE_LOADERS = {
  "all-services-classic": () => import("@/views/home-service-one/homeServiceOne"),
  "all-services-modern": () => import("@/views/home-service-two/homeServiceTwo"),
  "tour-classic": () => import("@/views/home-one/homeOne"),
  "hotel": () => import("@/views/home-two/homeTwo"),
  "car": () => import("@/views/home-three/homeThree"),
  "flight": () => import("@/views/home-four/homeFour"),
  "cruise": () => import("@/views/home-five/homeFive"),
  "tour-editorial": () => import("@/views/home-six/homeSix"),
  "bus": () => import("@/views/home-seven/homeSeven"),
  "guide": () => import("@/views/home-ten/homeTen"),
  "activity": () => import("@/views/home-eleven/homeEleven"),
  "visa": () => import("@/views/home-twelve/homeTwelve")
};
```

Out-of-scope verticals can remain disabled by feature flag without deleting
their home experience.

### 5.3. Shared Data Contract

Every experience receives the same `HomeViewModel`:

```ts
type HomeViewModel = {
  hero: HomeHero;
  search: HomeSearchConfig;
  sections: HomeSection[];
  trust: HomeTrust;
  campaigns: CampaignCard[];
  editorial: EditorialBlock[];
  seo: HomeSeo;
};
```

Rules:

- Variants are presentation-only.
- Variants must not fetch data.
- Variants must not know API endpoints.
- Variants render sections they support; unknown sections are ignored.
- New sections are additive and backward-compatible.

### 5.4. Resolution Order

The server resolves one experience using a pure function:

```ts
resolveHomeExperience({
  userPreference,
  agencyDefault,
  experiment,
  cookie,
  defaultId
}) -> HomeExperienceId
```

Precedence:

1. Explicit user preference
2. Signed anonymous cookie
3. Agency/channel default
4. Experiment assignment
5. System default (`all-services-classic`)

The resolved ID is passed to the renderer and written to
`data-home-experience` for analytics. The client never re-resolves it, which
prevents hydration mismatch.

### 5.5. Code Splitting

Each experience is lazy-loaded:

```ts
const Experience = dynamic(definition.load, {
  ssr: true,
  loading: () => <HomeSkeleton />
});
```

The public home page loads only the selected variant. All 12 are retained in
the repository but not in the initial bundle.

### 5.6. Settings

Route:

```text
/[locale]/settings/experience
```

UI:

- Grid of experience cards with preview image
- Language-independent label/description keys
- Selected state
- Save button
- Reset to default

Persistence:

- Anonymous: signed cookie `hani_home_experience`
- Authenticated: `PUT /market/v1/me/preferences`
- Agency default: channel/agency settings (optional)

The server must validate the ID against the canonical registry. Unknown values
fall back to the system default; they must not cause a 500.

### 5.7. Backend Contract

Proposed endpoint:

```http
GET /market/v1/me/preferences
PUT /market/v1/me/preferences
```

```json
{
  "homeExperienceId": "hotel",
  "locale": "fa",
  "currency": "IRR",
  "theme": "system",
  "reducedMotion": false
}
```

Backend fields:

| Field | Type | Notes |
|---|---|---|
| `homeExperienceId` | string | validated against registry |
| `locale` | string | `fa`, `en`, `ar` from `ILanguageCatalog` |
| `currency` | string | ISO 4217 |
| `theme` | string | `light`, `dark`, `system` |
| `reducedMotion` | bool | accessibility |
| `updatedAt` | datetime | server-managed |

---

## 6. Data Access

### 6.1. Generated Types

Use `openapi-typescript` against Hani OpenAPI:

```text
docs/api/marketplace-api-v1.openapi.yaml
docs/api/content-api-v1.openapi.yaml
```

Generated output:

```text
frontend/lib/api/generated/schema.d.ts
```

No hand-written duplicate DTO types in components.

### 6.2. Repository Ports

```ts
interface HomeRepository {
  getHome(locale: string, signal?: AbortSignal): Promise<HomeDto>;
}

interface TourRepository {
  search(input: TourSearchInput): Promise<PagedResult<TourSummaryDto>>;
  compare(productId: string, locale: string): Promise<TourComparisonDto>;
}
```

Adapters:

- `HttpHomeRepository`
- `MockHomeRepository` (development/test only)

### 6.3. Mappers

DTO -> ViewModel mapping belongs to `features/*/application/mappers`.

Examples:

- `mapTourSummary(dto, locale) -> TourCardViewModel`
- `mapHome(dto, locale) -> HomeViewModel`
- `mapHotelDetail(dto, locale) -> HotelDetailViewModel`

Components never read API field names directly.

### 6.4. Error Mapping

All API failures are normalized:

```ts
type AppError = {
  code: string;
  messageKey: string;
  status: number;
  correlationId?: string;
  fieldErrors?: Record<string, string[]>;
};
```

UI renders localized messages from `messageKey`. Raw server messages are never
shown to end users.

---

## 7. i18n and RTL

### 7.1. Routing

```text
/fa/...
/en/...
/ar/...
```

Default locale: `fa`.

Locale list comes from config/`ILanguageCatalog`, never from a hard-coded
array inside a component.

### 7.2. HTML Direction

```tsx
<html lang={locale} dir={locale === "en" ? "ltr" : "rtl"}>
```

No `body.class="rtl"`.

### 7.3. Messages

- All user-facing text lives in `messages/{locale}.json`.
- No text in page components.
- ICU pluralization for counts.
- Missing-key detection in CI.
- Fallback content comes from the API, not from a hard-coded locale.

### 7.4. RTL CSS

- Prefer logical properties:
  ```scss
  margin-inline-start
  padding-inline-end
  inset-inline-start
  border-inline-start
  ```
- Physical `left`/`right` requires a documented exception.
- Icons with direction are mirrored.
- Swiper/carousel direction is explicit.
- Maps, charts, date pickers, phone inputs, and data tables get dedicated RTL
  stories/tests.

### 7.5. Formatting

- Currency: `Intl.NumberFormat(locale, { style: "currency", currency })`
- Dates: `Intl.DateTimeFormat(locale, options)`
- Numbers: `Intl.NumberFormat(locale)`
- Persian calendar: use `fa-IR-u-ca-persian` where required.
- Technical values use `dir="ltr"`: email, phone, IBAN, card number, URL,
  tracking code.

### 7.6. SEO

Each page exports `generateMetadata`:

- localized title/description
- canonical
- hreflang alternates
- Open Graph/Twitter
- JSON-LD from Hani SEO endpoints

---

## 8. UI Standard

### 8.1. Design Source of Truth

The template's `src/style` SCSS is the canonical design system:

- color palette
- typography scale
- spacing scale
- radius
- shadow
- z-index
- breakpoints
- motion durations
- component classes

Rules:

- Do not create a second token system or a parallel component library.
- Hani may add semantic aliases, but they must map to template tokens.
- New UI must reuse template classes and components.
- If the template lacks a component, extend its existing pattern; do not invent
  a new visual language.
- No raw color or spacing values in Hani integration code.

### 8.2. Typography

| Locale | Font |
|---|---|
| FA | Vazirmatn |
| AR | Noto Kufi Arabic / Noto Naskh Arabic |
| EN | Inter |

The template font stack is patched by locale. Use `font-display: swap`,
self-hosted fonts, and subset where possible.

### 8.3. Component Contract

Use template components first:

- Header / Footer / Sidebar
- Cards
- Forms
- DatePicker / DateRangePicker
- Tabs / Accordion / Dropdown
- Modal / Drawer / Toast
- DataTable / Pagination / Breadcrumb
- SearchBar / FilterBar
- Empty/Error/Loading patterns

Hani wrappers are allowed only for:

- API data binding
- i18n text
- RTL corrections
- accessibility corrections
- state handling

Wrappers must not fork the template's visual structure.

### 8.4. Page Standard

Every page follows the template's existing page composition, for example:

```text
Header
Breadcrumb
Page title / hero
Filterbar or search
Content grid/list
Pagination
Footer
```

Hani must not replace a template page with a custom page. The page is patched
in place for data, locale, direction, and missing states.

Every data page handles:

- loading
- empty
- error
- unauthorized
- not found

### 8.5. Forms

- Keep the template form layout and controls.
- Add React Hook Form and Zod validation.
- Field-level errors.
- Server error mapping.
- Disabled/pending state.
- Success/error toast.
- No duplicate validation rules between client and server.

### 8.6. Accessibility

- semantic landmarks
- labels for all inputs
- keyboard navigation
- visible focus
- contrast AA
- `prefers-reduced-motion`
- alt text from content API
- axe checks in Playwright

---

## 9. Auth and Session

- OTP request/verify against Hani Identity API.
- Access/refresh tokens stored in `HttpOnly`, `Secure`, `SameSite` cookies.
- No tokens in `localStorage`.
- Route guards in middleware/proxy.
- Server Components read the session from cookies.
- Client Components never receive refresh tokens.
- Lastgram SSO is an external integration; the callback route is defined but
  feature-flagged until credentials exist.

---

## 10. Error, Observability, and Security

- Error boundaries at route segment level.
- API `ProblemDetails` mapped to `AppError`.
- Correlation ID shown in support/debug UI.
- Structured client events for checkout failures and payment callbacks.
- CSP, HSTS, frame-ancestors, referrer policy.
- Validate all environment variables at startup.
- No secrets in client bundles.
- Image domains allowlisted.
- Rate-limit-sensitive actions handled server-side.

---

## 11. Testing

| Layer | Tool |
|---|---|
| Unit | Vitest |
| Component | Testing Library |
| Contract | generated OpenAPI types + Zod |
| E2E | Playwright |
| Accessibility | axe-core |
| Visual | Playwright screenshots |
| Performance | Lighthouse CI |

Required suites:

- FA/EN/AR route smoke
- RTL visual snapshots for home, search, detail, checkout, dashboard
- Home experience switching
- OTP login
- Tour search -> compare -> checkout
- Agency dashboard access control
- Error and empty states

---

## 12. Migration Strategy from Dreamstour

### Do

- Copy the template Next.js app into `frontend/src` as the base.
- Keep exactly one app tree. Default candidate: `(feature-module)` + `views` +
  `core/common`; final freeze after build verification.
- Delete the duplicate app tree and duplicate header/footer/page trees.
- Keep the template's SCSS, assets, layout, cards, forms, and home views.
- Patch the template for API, auth, i18n, RTL, preferences, and missing states.
- Point Home Experience loaders at the actual template home views.
- Add missing fields to Hani DTOs/OpenAPI, then bind them to the existing
  template cards/forms.
- Use template patterns for any new page or component.

### Do Not

- Redesign the template or create a parallel design system.
- Replace template pages with custom Hani pages.
- Keep a custom `HomeExperienceFrame` as the final home implementation.
- Keep both `(feature-module)` and `(public-pages)`.
- Keep `output: "export"`.
- Keep hard-coded English text.
- Keep static language/currency dropdowns.
- Keep mock data in production.
- Add a new card/button/form style when a template equivalent exists.

---

## 13. Definition of Done for Frontend Work

A frontend task is done only when:

1. It uses the template's visual components and tokens.
2. It does not introduce a parallel design system or a custom replacement page.
3. It uses generated API types or a documented contract.
4. It has loading, empty, error, and unauthorized states where relevant.
5. FA/EN/AR strings exist; no hard-coded text.
6. RTL is verified with a screenshot or test.
7. Keyboard and axe checks pass.
8. Metadata/hreflang/JSON-LD exist for public pages.
9. Unit or E2E coverage exists for the changed behavior.
10. `npm run build` and `npm run lint` pass.
11. No direct `fetch` in UI components.
12. Documentation/README is updated.
