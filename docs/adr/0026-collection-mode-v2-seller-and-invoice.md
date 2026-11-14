# ADR-0026 — Collection Mode v2, Seller of Record, and Invoice Issuer

- **Status:** Accepted
- **Date:** 2026-11-14
- **Decision owner:** Hani
- **Related:** ADR-0022 (Payments and MoR), ADR-0024 (multi-currency pricing and BookingMode), Audit 2026-11-14

## Context

ADR-0024 defined three collection modes:

- `HaniOnline`: Hani collects money and acts as Merchant of Record.
- `AgencyOnline`: the agency collects through its own PSP.
- `AgencyOffline`: the agency collects offline.

Gate 4 originally implemented only `Online` / `Offline`. That was sufficient for the first booking flow but left three architecture problems:

1. `AgencyOnline` could not be represented.
2. `SellerOfRecord` and `InvoiceIssuer` were not captured, although they may differ from the payment collector.
3. The payment module could not tell why an order should not create a Hani payment intent.

## Decision

`CollectionMode` has three values:

- `HaniOnline`
- `AgencyOnline`
- `AgencyOffline`

`AgencyOffer` also stores:

- `SellerOfRecord`: `Hani` or `Agency`
- `InvoiceIssuer`: `Hani` or `Agency`

All three facts are copied into the immutable `PricingSnapshot` at quote creation and therefore into `Order` and `Contract`.

### Payment behavior

- `CreatePaymentIntent` is allowed only when `CollectionMode == HaniOnline`.
- `AgencyOnline` and `AgencyOffline` return `409` for Hani payment intent creation.
- `RecordOfflinePayment` is allowed only when `CollectionMode == AgencyOffline`.
- Commission accrual and ledger effects remain based on the order snapshot and are not inferred from the PSP.

### Data migration

The migration converts old values:

- `Online` → `HaniOnline`
- `Offline` → `AgencyOffline`

Seller and invoice values default to `Hani` for `HaniOnline`; `Agency` for agency-collected offers.

## Consequences

Positive:

- The system can represent all three commercial models without lying about who holds money.
- Payment guards are explicit and testable.
- Future invoice/payout work can rely on snapshot fields instead of guessing from the PSP.

Trade-offs:

- `AgencyOnline` does not yet have a redirect/PSP adapter. It intentionally rejects Hani intents until a provider integration exists.
- Existing clients must use the new enum values in API contracts.
