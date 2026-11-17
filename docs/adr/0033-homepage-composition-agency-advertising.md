# ADR-0033: Homepage Composition, Agency Contracts, and Paid Placements

- Status: Proposed
- Date: 2026-11-17
- Gate: 9.1 / commercial homepage

## Context

The homepage is currently a template composition with a few Hani API-backed
sections. Marketing needs a professional control panel to change section order,
visibility, and image slots without a deploy.

At the same time, Hani displays tours from multiple agencies. Placement must
respect agency contracts and roles, and must support a commercial model where
agencies pay for homepage images and sponsored tour placement.

Mixing paid placement into the organic search ranking would damage trust and
make SEO/result fairness impossible to audit. The paid layer must be separate
from the organic layer.

## Decision

1. **Home composition is data, not code.**
   Store `home_page_settings` per `key` and `locale` as JSONB. The public home
   reads it; only `Admin` can write it. Missing settings fall back to a
   versioned Lastsecond-parity default in the frontend.

2. **Default homepage is Lastsecond parity.**
   Featured tours, latest domestic, latest foreign, popular visas, origin
   cities, latest travelogues, and magazine are enabled in that order.
   Template marketing sections that are not in the reference IA are disabled
   by default and can be enabled from the control panel.

3. **Images are explicit slots.**
   The control panel exposes the hero image and section image overrides. A
   later media-library slice adds upload/storage and responsive variants. The
   API stores canonical URLs, not blobs.

4. **Organic eligibility is contract-driven.**
   `AgencyContract` determines service/destination coverage, commission,
   placement eligibility, priority, and validity dates. The search/home read
   model filters eligible agencies before ranking. A contract does not buy
   organic rank by itself.

5. **Paid placements are a separate layer.**
   `AdCampaign` targets a slot, locale, scope/destination, date range, budget,
   and pricing model. `AdCreative` contains image/mobile image/title/target.
   `AdEvent` records impression/click. Sponsored placements are labelled and
   do not mutate the organic result order.

6. **Billing is part of the placement lifecycle.**
   A campaign is prepaid or invoiced through the existing payments/settlement
   modules. Delivery stops when the budget or end date is reached. Reports
   expose slot, campaign, impressions, clicks, CTR, spend, and remaining
   budget.

7. **SEO and fairness rules.**
   Sponsored links carry a visible label and do not alter canonical URLs,
   organic ranking, or structured-data ItemList membership. No cloaking.

## Consequences

- The homepage can be operated without a deploy.
- Organic results stay explainable and testable.
- Paid inventory needs contract, campaign, creative, billing, and reporting
  work; this ADR does not implement billing yet.
- The admin control panel becomes the operational source for composition.
- Every placement change must be auditable and locale-aware.
