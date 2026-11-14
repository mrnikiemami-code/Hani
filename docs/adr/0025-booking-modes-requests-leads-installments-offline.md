# ADR-0025 — Booking Modes, Reservation Requests, Leads, Installments, and Offline Collection

- **Status:** Accepted
- **Date:** 2026-11-14
- **Decision owner:** Hani
- **Related:** ADR-0021 (Order and immutable Contract), ADR-0022 (Payments and MoR), ADR-0024 (multi-currency pricing and BookingMode)

## Context

Lastsecond supports more than instant online checkout:

- Some offers are **online-bookable** and are paid through the marketplace.
- Some offers require a **reservation request**: the customer submits dates/party size and the agency confirms availability before payment.
- Custom-travel and “Safarsaz” pages capture an **RFQ lead** instead of a quote.
- Customers can report a **displayed-price mismatch**.
- Some agencies collect payment **offline** (cash, bank transfer, cheque) or allow **installments**.
- Hotel inquiry and visa flows will reuse the same lead/reservation primitives in later gates.

Before Gate 4, `AgencyOffer` was implicitly online-only and there was no lead, reservation, discrepancy, installment, or offline-collection model. That made the marketplace unable to represent the baseline workflows without inventing state in the frontend.

## Decision

### 1. Booking and collection modes are offer-level facts

`AgencyOffer` owns two enums:

- `BookingMode`: `Online` or `ReservationRequest`
- `CollectionMode`: `Online` or `Offline`

The modes are copied into the immutable `PricingSnapshot` at quote creation and then into `Order` and `Contract`. A frontend must never infer the mode from price or agency; it reads the snapshot.

Public search exposes:

- `bookingModes` on each product result (union of matching offers)
- `bookingMode` and `collectionMode` on each compared offer

`onlineOnly=true` filters to offers whose `BookingMode` is `Online`. Request-mode offers remain visible in normal search.

### 2. Reservation requests do not consume capacity or create payment obligations

`ReservationRequest` is a separate aggregate in the Booking module:

- Created from a non-expired quote whose pricing snapshot is not `Online`.
- Holds contact details, party composition, room type, request pricing snapshot, and a 24-hour response deadline.
- Does **not** create a `Hold`, does **not** consume seats, and does **not** create a `PaymentObligation`.
- Agency confirms or rejects; customer accepts a confirmed request.
- Agency endpoints are tenant-scoped through the supplier API key; platform endpoints remain available for support operations.

This avoids blocking inventory for unconfirmed demand and keeps the instant-booking path unchanged.

### 3. Leads are the RFQ primitive for custom and vertical requests

`LeadRequest` captures:

- service type (`Tour`, `Hotel`, `Flight`, `Visa`, `Design`, `Custom`)
- destination, dates, party composition, optional budget/currency
- contact details and notes
- lifecycle (`Open → Matched → Closed`, plus `Cancelled`)

Matching has two operations:

- `MatchLead` invites one agency explicitly.
- `DistributeLead` invites every active agency and creates one idempotent `LeadAgencyInvitation` per agency, matching the Lastsecond “more than 2,000 active agencies” promise without duplicating invitations.

The domain records each invited agency and timestamp. Routing by destination/service coverage can be added later without changing the aggregate contract; the all-active distribution is the safe default while coverage data is incomplete.

### 4. Price-discrepancy reports are first-class review items

`PriceDiscrepancyReport` records the offer/departure, reporter contact, reported price and currency, and a required note. Review is explicit (`Open → Reviewed → Resolved`). Reports are additive and never mutate the offer or quote; investigations can compare the report with the immutable pricing snapshot.

### 5. Installments are a schedule over one order currency

`InstallmentPlan` is an order-scoped aggregate:

- one plan per `(orderId, currency)`
- 2–12 installments, 1–90 day intervals
- equal amounts with the final installment absorbing rounding
- each installment has sequence, due date, amount, and paid state
- plan completes when all installments are paid

The plan does not split the existing `PaymentObligation`; it is a collection schedule. Internal installment payment recording is the operations hook. A future online-installment PSP integration can attach provider references without changing the schedule or order snapshot.

### 6. Offline collection is explicit and auditable

When an order’s snapshot has `CollectionMode=Offline`:

- `CreatePaymentIntent` returns `409` and never calls the PSP.
- `RecordOfflinePayment` accepts only an amount equal to the matching currency obligation.
- The handler records an `OfflinePaymentReceipt` with method (`Cash`, `BankTransfer`, `Cheque`), reference, operator, and timestamp.
- The obligation is marked paid and commission is accrued through the same settlement contract used by online payments.

This keeps reporting and commission consistent across online and offline money.

### 7. Authentication default is a policy selector

Gate 4 added API-key protected supplier reservation endpoints while JWT remained the default for user endpoints. ASP.NET Core authentication now uses a policy scheme:

- request with `X-Api-Key` → API-key handler
- otherwise → JWT bearer

This ensures tenant middleware sees the agency claim before authorization for supplier requests, without weakening JWT endpoints.

## Alternatives considered

- **Reusing `Quote` for reservation requests:** rejected because request-mode quotes carry no capacity reservation and have a different agency decision lifecycle.
- **Creating a hold for every reservation request:** rejected because it would block sellable inventory for unconfirmed demand.
- **Using `PaymentIntent` for offline money:** rejected because no PSP exists and provider fields would be meaningless.
- **Splitting `PaymentObligation` per installment now:** rejected because multi-currency obligations and commission accrual are already settled per currency; splitting them would change Gate 1 contracts. The schedule is intentionally a separate collection concern.
- **Coverage-based lead routing:** deferred because agency destination/service coverage is not yet modeled; all-active distribution preserves the customer promise and remains auditable.

## Consequences

Positive:

- The baseline online / request / lead / offline flows are representable end to end.
- Instant booking and capacity semantics stay unchanged.
- Offline money produces the same commission and ledger effects as online money.
- Immutable snapshots preserve mode and tax context for support and disputes.

Trade-offs:

- Reservation requests need an operational queue and response SLA.
- Lead distribution targets all active agencies until coverage-based routing exists.
- Installment collection is recorded per installment but not yet tied to a PSP subscription or dunning process.
- `CollectionMode` is intentionally binary at this gate; the richer MoR variants from ADR-0024 can be added without changing the public booking flow.
