# Homepage Control Panel and Agency Advertising Plan

Date: 2026-11-17

Status: Home composition slice implemented; agency contract/advertising model
proposed.

Decision record: [`../adr/0033-homepage-composition-agency-advertising.md`](../adr/0033-homepage-composition-agency-advertising.md)

## 1. What is implemented now

- Homepage composition is stored in `content.home_page_settings`
  (JSONB per key + locale).
- Public read: `GET /market/v1/home-settings?locale=fa`.
- Admin read/write: `GET/PUT /internal/v1/home-settings` with the `Admin`
  policy.
- Admin page: `/[locale]/admin/home`, wrapped in a template-derived
  agency-dashboard shell (sidebar, breadcrumb, cards, forms, tables).
- Admin can set:
  - hero image URL;
  - section visibility;
  - section order.
- Default order is Lastsecond parity:
  1. featured tours
  2. latest domestic tours
  3. latest foreign tours
  4. popular visas
  5. tours by origin city
  6. latest travelogues
  7. magazine
- Static template sections (destinations, delivery, guide, testimonials,
  why-choose) are off by default and can be enabled from the panel.
- The home hero uses the configured hero image when present.

## 2. Admin experience

The admin page is a professional control panel, not a raw JSON editor:

- hero image URL and live preview;
- ordered section table;
- visibility switches;
- move up/down controls;
- saved state and error state;
- admin-only access.

A media library/upload flow is the next slice; current image setting is a
canonical URL. This is intentional until storage/CDN credentials are
available.

## 3. Agency contract model

### 3.1 AgencyContract

Fields:

- `agencyId`
- `status` (Draft/Active/Suspended/Expired)
- `validFrom`, `validUntil`
- `serviceScopes` (Tour, Hotel, Visa, Flight, ...)
- `destinationCoverage` (destination ids or category rules)
- `commissionRate`
- `settlementTermsId`
- `organicPriority` (bounded; does not imply paid rank)
- `sponsoredEligible`
- `notes/documents`

Contract eligibility is applied before the search/home read model ranks
inventory. An agency with no active contract cannot receive organic placement
for covered services.

### 3.2 Display roles

- **Organic**: eligible agency offers, ranked by relevance, quality, rating,
  availability, and freshness.
- **Contracted priority**: a bounded tie-breaker for contracted agencies, not
  an unlimited rank override.
- **Sponsored**: a separately labelled campaign placement. It is not part of
  organic ranking.

## 4. Advertising model

### 4.1 Entities

| Entity | Purpose |
|---|---|
| `AdSlot` | stable placement code (`home.hero`, `home.featured`, `home.middle`, `search.top`, `listing.sidebar`) |
| `AdCampaign` | agency/contract, slot, locale, scope/destination, schedule, budget, pricing model, status |
| `AdCreative` | desktop/mobile image, title, target, product/agency, approval state |
| `AdEvent` | impression/click/viewable event with time, campaign, creative, slot |
| `AdInvoiceLine` | spend/billing link to payments and settlement |
| `AdReportSnapshot` | daily aggregated delivery and spend for fast dashboards |

### 4.2 Pricing models

- Flat monthly placement for premium image slots.
- CPM for impression-based brand campaigns.
- CPC for traffic campaigns.
- CPA/commission for conversion campaigns.
- Hybrid: minimum spend + CPA.

Recommended starting model:

- Homepage hero image: flat monthly + limited exclusivity per category.
- Featured/middle cards: CPM with a monthly minimum.
- Search/listing sponsored cards: CPC.
- Conversion-led agency campaigns: CPA with settlement deduction.

### 4.3 Delivery and billing rules

- Prepaid wallet or approved credit limit.
- Campaign stops at budget exhaustion or end date.
- Impression/click events are idempotent and bot-filtered.
- Invoice lines flow through Payments; commission/settlement flows through
  Settlement.
- Sponsored cards always show a visible `Sponsored` label.
- No paid placement can change organic ranking, canonical URLs, or
  structured-data membership.

### 4.4 Admin operations

- Campaign calendar and slot capacity.
- Creative preview by locale and device.
- Approve/reject creatives.
- Budget pacing and stop/start.
- Delivery report: impressions, clicks, CTR, spend, remaining budget.
- Agency contract coverage and eligibility report.
- Audit trail for every change.

## 5. API proposal

```text
GET    /market/v1/home-settings?locale=fa
GET    /market/v1/ads/slots/{code}?locale=fa&scope=Foreign
POST   /market/v1/ads/events

GET    /internal/v1/home-settings?key=default&locale=fa
PUT    /internal/v1/home-settings

GET    /internal/v1/agency-contracts
POST   /internal/v1/agency-contracts
PUT    /internal/v1/agency-contracts/{id}

GET    /internal/v1/ad-campaigns
POST   /internal/v1/ad-campaigns
PUT    /internal/v1/ad-campaigns/{id}
POST   /internal/v1/ad-campaigns/{id}/approve
GET    /internal/v1/ad-campaigns/{id}/report
```

## 6. Delivery phases

### Phase A — Home composition (done)

- settings table + migration;
- public/admin API;
- admin control panel;
- Lastsecond parity default order;
- hero image setting.

### Phase B — Media library

- upload endpoint + storage abstraction;
- image dimensions/alt text/responsive variants;
- admin preview and validation;
- CDN URL policy.

### Phase C — Agency contracts

- contract aggregate and admin review;
- eligibility in home/search read model;
- commission and settlement linkage;
- contract coverage report.

### Phase D — Paid placements

- campaigns/creatives/slots;
- campaign calendar and approval;
- impression/click events and reporting;
- prepaid wallet/invoice integration;
- sponsored labels and caps.

### Phase E — Optimization

- pacing, frequency caps, locale/scope targeting;
- quality score and anti-fraud;
- A/B experiments and revenue reporting.

## 7. Acceptance criteria

- Admin can change section order/visibility and hero image without deploy.
- Home renders only enabled sections in configured order.
- No organic result is silently promoted by a paid campaign.
- Sponsored placements are labelled and measurable.
- Agency contract eligibility is testable.
- Campaign spend and invoice lines reconcile with payments/settlement.
- FA/EN/AR and mobile layouts remain valid.
