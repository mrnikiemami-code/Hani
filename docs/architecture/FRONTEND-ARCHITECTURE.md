# Hani Frontend Architecture

- **Status:** Proposed — Gate 9.1
- **Date:** 2026-11-15
- **Scope:** `frontend/` (Hani web app)
- **Reference UI source:** `reference/dreamstour-v1.1.7/nextjs` (design kit only)
- **Related:** `docs/plan/GATE-9.1-CONTRACT.md`, `docs/plan/LASTSECOND-SIMULATION-MAP.md`, `docs/adr/0030-frontend-architecture.md`

---

## 1. Purpose

This document defines the frontend architecture for Hani after the purchased
Dreamstour template is introduced.

The template is **not** copied as an application tree. It is consumed as a
design and component source. Hani keeps its own routing, i18n, API client,
authentication, and deployment model.

### Goals

- Keep all 12 Dreamstour home experiences, selectable by the user in settings.
- Make home experiences dynamic and code-split, without duplicating routes.
- Deliver FA/EN/AR with first-class RTL.
- Connect the frontend to Hani APIs with typed contracts.
- Recreate Lastsecond page coverage without copying 183 demo routes.
- Keep the UI consistent and accessible.
- Keep business logic out of React components.
- Make the frontend testable without a live backend.

### Non-goals

- Recreating every Dreamstour demo page.
- Keeping car/cruise/bus/guide/activity verticals in the Hani MVP.
- Building a second backend inside the frontend.
- Using mock data in production.

---

## 2. Architecture Principles

1. **Contract-first**
   Public DTOs come from Hani OpenAPI. TypeScript types are generated, not
   hand-copied.

2. **Server-first**
   Public pages are Server Components. Client Components are used only for
   interaction.

3. **Vertical slices**
   Each business capability owns its domain, application, infrastructure, and
   UI code.

4. **One source of truth for UI**
   No duplicate page trees, no duplicate header/footer, no duplicate card
   implementations.

5. **Locale/RTL first**
   Direction and language are resolved on the server. RTL is not a client-side
   demo toggle.

6. **No business logic in JSX**
   Pages compose. Use cases, mappers, and validation live outside components.

7. **Progressive enhancement**
   Primary content must render without client-side JavaScript.

8. **Accessibility by default**
   WCAG 2.2 AA, keyboard-first, visible focus, semantic HTML.

---

## 3. Target Folder Structure

```text
frontend/
  app/
    [locale]/
      (public)/
        page.tsx
        tours/
        hotels/
        flights/
        visa/
        restaurants/
        attractions/
        destinations/
        agencies/
        u/[username]/
        blog/
        travelogues/
        videos/
        compare/
        wishlist/
        settings/
      (auth)/
        login/
        verify/
        logout/
      (dashboard)/
        traveler/
        agency/
      checkout/
      payment/
      api/
        health/
  components/
    ui/                 # design-system primitives
    patterns/           # cards, filters, empty/error/loading states
    layout/             # header, footer, shell, breadcrumbs
    seo/                # JSON-LD, metadata helpers
  features/
    home/
    tours/
    hotels/
    flights/
    visa/
    places/
    destinations/
    content/
    agencies/
    authors/
    reviews/
    auth/
    traveler/
    agency/
    checkout/
    preferences/
  lib/
    api/                # HTTP client, generated schema, error mapping
    auth/               # session, guards, token/cookie strategy
    i18n/               # locale helpers
    money/              # Intl currency and formatting
    dates/              # locale-aware date/time
    seo/                # canonical, hreflang, JSON-LD builders
    analytics/          # event contracts
    config/             # environment validation
  messages/
    fa.json
    en.json
    ar.json
  styles/
    tokens.scss
    base.scss
    rtl.scss
    components/
  tests/
    unit/
    e2e/
    visual/
```

### Dependency Rule

```text
app  ->  features/ui  ->  features/application  ->  features/domain
                              |
                              v
                    features/infrastructure  ->  lib/api
components/ui  ->  styles/tokens only
```

Rules:

- `app/**` may import feature entry points and UI composition.
- `features/domain` must not import React, Next.js, or HTTP.
- `features/ui` must not call `fetch`.
- `features/infrastructure` is the only layer that knows Hani endpoints.
- `components/ui` must not know business entities.
- `lib` must not import features.

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

| ID | Source | Primary focus |
|---|---|---|
| `all-services-classic` | `index-1` | all services |
| `all-services-modern` | `index-2` | all services |
| `tour-classic` | `index-3` | tours |
| `hotel` | `index-4` | hotels |
| `car` | `index-5` | cars |
| `flight` | `index-6` | flights |
| `cruise` | `index-7` | cruises |
| `tour-editorial` | `index-8` | tours/editorial |
| `bus` | `index-9` | buses |
| `guide` | `index-10` | guides |
| `activity` | `index-11` | activities |
| `visa` | `index-12` | visa |

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

### 8.1. Design Tokens

`styles/tokens.scss` defines:

- color palette and semantic colors
- typography scale
- spacing scale (`4px` base)
- radius
- shadow
- z-index
- breakpoints
- motion durations

No raw color or spacing values in feature components.

### 8.2. Typography

| Locale | Font |
|---|---|
| FA | Vazirmatn |
| AR | Noto Kufi Arabic / Noto Naskh Arabic |
| EN | Inter |

Use `font-display: swap`, self-hosted fonts, and subset where possible.

### 8.3. Component Contract

Every shared component has:

- typed props
- no business API calls
- loading/empty/error variant where relevant
- RTL story
- mobile story
- accessibility notes

Primitives:

- Button, IconButton, Link
- Input, Textarea, Select, Checkbox, Radio, Switch
- DatePicker, DateRangePicker
- Tabs, Accordion, Dropdown
- Card, Badge, Rating, Price
- Breadcrumb, Pagination
- Modal, Drawer, Toast
- Skeleton, EmptyState, ErrorState
- DataTable
- SearchBar, FilterBar

### 8.4. Page Standard

Every page follows:

```text
PageShell
  Header
  Breadcrumb (optional)
  PageHeader (title, subtitle, actions)
  FilterBar (optional)
  Content
  Pagination (optional)
  Footer
```

Every data page handles:

- loading
- empty
- error
- unauthorized
- not found

### 8.5. Forms

- React Hook Form
- Zod validation
- field-level errors
- server error mapping
- disabled/pending state
- success/error toast
- no duplicate validation rules between client and server

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

- Copy SCSS tokens, assets, icons, and selected components.
- Port one home experience at a time into `features/home/ui/experiences`.
- Reuse visual patterns, not page logic.
- Replace demo data with Hani repositories.
- Keep Hani `app/[locale]` and `lib/api`.

### Do Not

- Copy `src/app` route tree.
- Keep both `(feature-module)` and `(public-pages)`.
- Copy 183 demo routes.
- Keep hard-coded English text.
- Keep static language/currency dropdowns.
- Keep `output: "export"`.
- Keep mock data in production.

---

## 13. Definition of Done for Frontend Work

A frontend task is done only when:

1. It uses generated API types or a documented contract.
2. It has loading, empty, error, and unauthorized states where relevant.
3. FA/EN/AR strings exist; no hard-coded text.
4. RTL is verified with a screenshot or test.
5. Keyboard and axe checks pass.
6. Metadata/hreflang/JSON-LD exist for public pages.
7. Unit or E2E coverage exists for the changed behavior.
8. `npm run build` and `npm run lint` pass.
9. No direct `fetch` in UI components.
10. Documentation/README is updated.
