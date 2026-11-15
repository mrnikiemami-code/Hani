# Frontend Design Consistency Contract

- **Status:** Mandatory — Gate 9.1+
- **Date:** 2026-11-15
- **Parent:** [`FRONTEND-ARCHITECTURE.md`](FRONTEND-ARCHITECTURE.md)
- **Related:** [`../../AGENTS.md`](../../AGENTS.md)

This document defines how missing fields and new data are added to the
purchased Dreamstour template without breaking visual consistency.

---

## 1. Core Rule

> The template is the only visual source of truth.
> A missing field is placed into an existing template slot.
> A new card, button, form, or section style is allowed only when the template
> has no equivalent.

No page may introduce a second design language.

---

## 2. Field Placement Map

### Tour Card

| Field | Template slot |
|---|---|
| cover image | image area |
| title | card title |
| destination | location line |
| tour type | category line |
| rating/reviews | rating badge + review text |
| price | price block |
| duration | bottom meta (calendar slot) |
| agency / next departure | bottom meta (secondary slot) |
| offers count | favorite/badge slot |

Rules:

- Do not add a new row if an existing meta/badge slot can hold the field.
- Long fields use `text-truncate` or template `.muted` equivalent.
- Price remains in the same visual hierarchy as template price.

### Hotel Card

| Field | Template slot |
|---|---|
| name | card title |
| stars | top badge |
| rating/reviews | rating line |
| address | location line |
| amenities count | facilities/meta line |
| rank in city | facilities/meta line |
| recommendation | price/CTA slot |
| cover image | image slider |

Rules:

- Hotel price must use the template price slot once `priceFrom` exists.
- Recommendation must not dominate the card more than price.
- Stars and rating must not compete; badge + rating line.

### Visa Card

| Field | Template slot |
|---|---|
| country name | card title |
| country code | badge |
| visa type count | processing/meta line |
| minimum price | price slot |
| cover image | image area |
| service label | mode/validity line |

Rules:

- Visa type count is secondary; price is primary.
- Country code stays in badge, not title.

### Home Sections

| Section | Template component |
|---|---|
| featured tours | `recommended-list-item` / `place-item` |
| visas | `recommended-list-item` |
| editorial | `article-item` |
| campaigns | template campaign/banner pattern |

Rules:

- New Hani home sections must reuse these classes and spacing.
- Headings use `section-header-eight`.
- Do not invent a new heading size or card radius.

---

## 3. Component Rules

- Use template CSS classes and SCSS variables.
- Do not introduce a parallel `components/ui` design system.
- Hani wrappers may only add:
  - API data
  - i18n text
  - RTL fixes
  - accessibility
  - loading/empty/error state
- A wrapper must not fork the visual structure of the template component.
- If a field has no natural slot, propose a slot in this document before coding.

---

## 4. RTL/LTR Rules

Every changed card/section must be checked in:

- FA / RTL
- AR / RTL
- EN / LTR

Check:

- icon order
- margin/padding side
- text alignment
- price and CTA alignment
- truncation
- card grid order
- badge placement

---

## 5. Visual Review Gate

A UI change is not done until:

- Screenshot exists for FA, EN, AR.
- The screenshot uses the template's spacing and typography.
- No new color, radius, shadow, or font is introduced without a design decision.
- The card/section is compared against the original template card.
- The visual preview is updated.

---

## 6. Current Adapters to Review

These Hani components currently use template classes but are new compositions:

- `features/home-experience/ui/HaniTrendingTours.tsx`
- `features/home-experience/ui/HaniRecommendedVisas.tsx`
- `features/home-experience/ui/HaniLatestContent.tsx`

They must pass the visual review gate before being considered final.

---

## 7. Known Field/Visual Gaps

| Gap | UI impact | Resolution |
|---|---|---|
| Tour `coverImageUrl` missing | fallback template images | add field + mapper |
| Hotel `priceFrom` missing | no real hotel price | add field + use price slot |
| Visa `coverImageUrl` missing | fallback images | add field + mapper |
| Content author missing | no real byline | add author summary |
| Blog seed corrupted | empty Blog Grid | clean seed data |

---

## 8. Definition of Done

- Uses template classes and tokens.
- Field mapped to an existing slot.
- No parallel visual language.
- FA/EN/AR + RTL screenshots.
- Visual preview updated.
- No layout regression in the template card.
