# ADR-0027 — Flight Vertical: Metasearch and Redirect, Not Inventory

- **Status:** Accepted
- **Date:** 2026-11-14
- **Decision owner:** Hani
- **Related:** GAP-16 (Flights), Audit 2026-11-14

## Context

Lastsecond's flight pages are a metasearch experience:

- It presents itself as “خرید بلیط از معتبرترین وب‌سایت‌ها”.
- Routes are IATA pairs such as `/flights/thr-mhd`.
- Results are dynamic and point users to airline/ticket sellers.
- There is no evidence of airline inventory ownership, PNR issuance, ticketing, or Hani-style payment.

Hani's Gate 5 has to decide whether flights are:

1. **Metasearch/Redirect** — Hani indexes providers and redirects to the seller.
2. **Inventory/Booking** — Hani owns supplier contracts, PNRs, ticketing, refunds, and settlement.

Option 2 is a different business with much higher operational and compliance cost. It is not required to match Lastsecond's public behavior.

## Decision

Gate 5 implements flights as **Metasearch + Redirect**:

- `Airline`, `Airport`, and `FlightRoute` are canonical reference data.
- `FlightOffer` is a provider result with price, times, stops, cabin, baggage, and a deep link.
- Hani does not issue tickets or hold PNRs in this gate.
- Hani does not create a `PaymentObligation` for redirect flights.
- The response must include provider attribution and a `redirectUrl`.
- Flight search results are cached with a short TTL; provider availability is never implied as guaranteed.
- A future Inventory/Booking flight model requires a new ADR and a separate provider integration, not an extension by accident.

## Consequences

Positive:

- Matches Lastsecond's public flight behavior without pretending to own inventory.
- Keeps Booking/Payments/Settlement semantics clean.
- Lower regulatory and operational risk.

Trade-offs:

- No flight ticketing revenue in Gate 5.
- Provider deep links must be maintained and monitored.
- Flight SEO pages need canonical route pages and noindex controls for live search parameters.

## Follow-up

- Add `FlightRoute`, `Airline`, `Airport`, `FlightOffer`, and provider adapter contracts in Gate 5.
- Add provider attribution, deep-link redirect, and expiry.
- Revisit Inventory/Booking only with a new ADR.
