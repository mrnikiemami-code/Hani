# ADR-0030: Frontend architecture and Home Experience Registry

- Status: Proposed
- Date: 2026-11-15
- Gate: 9.1

## Context

Hani has a minimal Next.js frontend from Gate 9. A commercial Bootstrap/Next.js
template (Dreamstour) was purchased to accelerate the Lastsecond-style UI.

The template provides 183 unique URLs and 12 home layouts, but it is not a
production frontend:

- its build fails because `(feature-module)` and `(public-pages)` resolve to
  the same routes;
- it contains two parallel UI trees (`views` and `components/pages`);
- it has no API integration and only mock data;
- it has no locale routing or message catalogs;
- RTL is a single demo page, while the root layout is hard-coded to
  `lang="en"` without `dir`;
- it uses `output: "export"` together with unsupported redirects;
- its auth is email/password, while Hani requires OTP.

The business wants to keep the 12 home layouts and allow users to select one
from settings.

## Decision

1. Use the purchased template as a **design kit**, not as an application tree.
2. Keep the Hani `frontend/` application shell, locale routing, API client,
   and auth flows.
3. Introduce a **Home Experience Registry**:
   - one public home route `/[locale]`;
   - all 12 layouts remain as lazy-loaded presentation variants;
   - all variants consume the same `HomeViewModel`;
   - the selected variant is persisted in user preferences or a signed
     anonymous cookie;
   - resolution precedence is user preference, anonymous cookie, agency
     default, experiment, system default.
4. Apply a vertical-slice/Clean Architecture structure:
   - `app` is delivery;
   - `features/*/{domain,application,infrastructure,ui}`;
   - `components/ui` is the design system;
   - `lib` is cross-cutting;
   - UI never calls `fetch` directly.
5. Generate TypeScript API types from Hani OpenAPI and map DTOs to ViewModels.
6. Keep FA/EN/AR and RTL as first-class architecture concerns, not a theme
   toggle.
7. Do not copy the template's route tree or its 183 demo pages.
8. Do not remove the 12 home layouts; keep unused vertical variants behind
   feature flags without deleting them.

## Consequences

Positive:

- The UI can reuse the template's visual investment without inheriting its
  technical debt.
- Users can choose a home experience without 12 duplicate routes.
- Home variants share one data contract, so API changes are implemented once.
- i18n, RTL, auth, SEO, and checkout remain under Hani control.
- The frontend becomes testable with repository ports and mock adapters.

Negative:

- The template's components must be ported and cleaned rather than used
  directly.
- The Home Experience Registry adds one abstraction layer.
- The initial migration requires a build-cleanup phase.
- Some template pages and verticals will not be shipped in the MVP.

## Compliance

- All public user-facing strings live in message catalogs.
- All API fields used by the UI must exist in DTOs and OpenAPI.
- Public pages must render metadata, canonical, hreflang, and JSON-LD.
- No mock repository may be selected in a deployed environment.
- A page is not done without RTL, accessibility, and error-state verification.
