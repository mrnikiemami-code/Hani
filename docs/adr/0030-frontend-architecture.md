# ADR-0030: Frontend architecture — template-first UI with Hani platform layer

- Status: Accepted
- Date: 2026-11-15
- Gate: 9.1

## Context

Hani has a minimal Next.js frontend from Gate 9. A commercial Bootstrap/Next.js
template (Dreamstour) was purchased to become the Lastsecond-style frontend.

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

The business wants to keep the 12 home layouts, allow users to select one from
settings, and use the purchased template as the actual frontend — not as loose
inspiration for a new design.

## Decision

1. **Template-first UI**
   The Dreamstour template is the application base and the single visual source
   of truth. Hani adds platform concerns inside it; Hani does not build a
   parallel design system or redesign pages from scratch.

2. **One app tree**
   Keep exactly one of the template's route trees. Default candidate:
   `(feature-module)` + `views` + `core/common`. The duplicate tree is deleted
   after build verification.

3. **Hani platform layer**
   Add Hani API contracts, OTP/session, i18n, RTL, preferences, checkout, and
   SEO inside the template structure. Patch the template in place.

4. **Home Experience Registry**
   - one public home route `/[locale]`;
   - all 12 layouts remain, mapped to their actual template views
     (`index-1` ... `index-12`);
   - the selected variant is persisted in user preferences or a signed
     anonymous cookie;
   - resolution precedence is user preference, anonymous cookie, agency
     default, experiment, system default;
   - no custom `HomeExperienceFrame` remains as the final implementation.

5. **Missing fields and features**
   Add missing fields to Hani DTOs and OpenAPI, then render them through the
   template's existing cards, forms, tables, and page layouts. Do not invent a
   new visual pattern.

6. **Clean integration architecture**
   Hani integration code lives in `src/features`, `src/lib/hani`, `src/i18n`,
   and `src/messages`. Template code lives in `src/app`, `src/views`,
   `src/components`, `src/core`, `src/style`, and `public/assets`.
   UI never calls `fetch` directly.

7. **RTL and i18n are non-negotiable**
   FA/EN/AR and RTL/LTR are applied to the template layout and styles. A page
   is not done without both directions.

8. **Remove template defects**
   Remove duplicate routes, `output: "export"`, demo-only RTL, static language
   and currency dropdowns, and mock data in production.

9. **Keep all 12 home layouts**
   No home layout is deleted. Unused vertical variants can be feature-flagged.

## Consequences

Positive:

- The purchased visual investment is preserved.
- Pages remain visually consistent because there is one design source.
- Backend fields and missing features are added inside existing patterns.
- Users can choose a home experience without 12 duplicate routes.
- i18n, RTL, auth, checkout, and SEO are integrated rather than rebuilt.

Negative:

- The template has technical debt that must be patched first.
- One route tree and one component tree must be selected and frozen.
- Some template pages and verticals will not be shipped in the MVP.
- Hani wrappers must stay thin to avoid forking the template.

## Compliance

- All public user-facing strings live in message catalogs.
- All API fields used by the UI must exist in DTOs and OpenAPI.
- Public pages must render metadata, canonical, hreflang, and JSON-LD.
- No mock repository may be selected in a deployed environment.
- No parallel design system or custom replacement page.
- A page is not done without RTL, accessibility, and error-state verification.
