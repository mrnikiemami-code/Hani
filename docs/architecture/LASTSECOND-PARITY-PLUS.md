# Lastsecond Parity+ UX Benchmark

- **Status:** Mandatory — Gate 9.1+
- **Date:** 2026-11-15
- **Benchmark:** `https://lastsecond.ir/`
- **Related:** `FRONTEND-DESIGN-CONSISTENCY.md`, `FRONTEND-ARCHITECTURE.md`

---

## 1. Principle

The target is not only **Lastsecond parity**. The target is:

> Same user task, clearer information architecture, and a better product
> experience than Lastsecond.

The Dreamstour template is the visual source. Lastsecond is the **UX/IA
benchmark**. A template section that does not serve the Lastsecond task must be
recomposed using template components, not kept blindly.

---

## 2. Required Benchmark Workflow

Before implementing any page:

1. Open the equivalent Lastsecond page.
2. Record:
   - page goal
   - primary action
   - information hierarchy
   - filters/tabs/search fields
   - card fields
   - empty/error states
   - mobile behavior
3. Map the task to the existing template components.
4. Define the Hani **Better Delta**.
5. Implement, then compare side-by-side.

No page is Done without a benchmark note.

---

## 3. Example — Home Tour Scope Tabs

Observed on Lastsecond home:

- Search area has two tabs:
  - `تورهای خارجی`
  - `تورهای داخلی`
- The selected scope changes the search intent and the home tour sections.
- The same home page then shows:
  - featured tours
  - latest domestic tours
  - latest foreign tours
  - visas
  - origin-city tours
  - itineraries
  - blog

### Hani implementation rule

Do **not** create two home pages or two duplicate tour pages.

Use one home and one search route with a scope state:

```text
scope = all | domestic | foreign
```

- UI: template-styled tabs.
- URL state: `?scope=domestic` or `?scope=foreign`.
- API: pass `scope` to the tour search/home BFF.
- Home sections can request both scopes to render:
  - latest domestic
  - latest foreign
- SEO: canonical/query handling documented.
- RTL/LTR: tabs and cards must be tested in FA/EN/AR.

### Backend contract

`SearchProductsQuery` and `HomeFeedDto` should support:

```text
scope: "all" | "domestic" | "foreign"
```

or an equivalent `isDomestic` filter derived from destination country.

No frontend-only filtering of the full result set is acceptable.

---

## 4. Parity+ Criteria

For each page, Hani must be at least equal in:

- task clarity
- search/filter speed
- card information hierarchy
- empty state
- mobile usability
- RTL/LTR correctness

And better in at least one of:

- real-time API data
- multilingual FA/EN/AR
- online checkout + Hani MoR
- multi-agency comparison
- review criteria
- accessibility
- performance
- SEO/JSON-LD
- consistent design system

---

## 5. Home IA Target

The home should eventually expose, in template visual language:

1. Hero search with scope tabs (domestic/foreign)
2. Featured tours
3. Latest domestic tours
4. Latest foreign tours
5. Popular visas
6. Tours by origin city
7. Latest itineraries
8. Travel magazine
9. Trust/agency proof

This is a benchmark target, not an instruction to implement now.

---

## 6. Definition of Done

- Lastsecond benchmark captured.
- Task and hierarchy mapped.
- Template components reused.
- `scope`/filters are server-driven.
- FA/EN/AR + RTL/LTR screenshots.
- Better Delta documented.
