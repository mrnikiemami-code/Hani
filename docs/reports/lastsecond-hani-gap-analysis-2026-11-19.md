# Lastsecond → Hani Gap Analysis (2026-11-19)

## Scope

Reviewed as a senior architect against:

- Lastsecond public journey: visa → request, flights, foreign tour, domestic tour.
- Hani storefront: visa, flights, foreign/domestic tours.
- Hani agency dashboard: bookings, earnings, agency identity.
- Hani super admin: product/finance/support/agency operations.

## Lastsecond observed journeys

### Visa

- Country landing page with price matrix, required documents, steps, FAQs,
  related tours, and a prominent “ثبت درخواست”.
- The CTA opens a generic six-step request/offer workflow:
  1. request details
  2. agency offer approval
  3. deposit
  4. contract
  5. document upload
  6. final payment
- The request gets a tracking code and waits for a sales/agency offer. It is an
  RFQ workflow, not a direct embassy application.
- This is consistent with the foreign-tour “برای رزرو تماس بگیرید” and
  “سفرساز” request flows.

### Flights

- Metasearch form with one-way/round-trip/multi-city, origin/destination,
  dates, passengers, cabin class.
- Results are aggregated from external sellers; the page is a search layer, not
  a direct Hani-style checkout.

### Foreign tour

- Destination landing page with hotel packages, flight times, room/price
  matrix, “برای رزرو تماس بگیرید”, tour dates, and a custom “سفرساز” request.
- Detail page shows hotel options and per-room prices; booking is contact/RFQ
  oriented.

### Domestic tour

- Rich itinerary, included/excluded services, accommodation/meal table,
  departure calendar, passenger count, room type, price, and “تایید و ادامه”.
- This is closest to a direct booking flow.

## Hani current state

### Storefront

- Tour grid is backed by real search data (`productId`, slug, price,
  departure date, scope).
- Visa grid is backed by real visa countries, but the listing filtered out some
  rows with placeholder names.
- Visa and tour detail routes existed but re-exported static template pages with
  fake content (Egypt student visa, Rainbow Mountain Peru, fake reviews).
- Visa application page was a static Spain/Schengen demo with pre-uploaded fake
  documents and no API submission.
- Flight page is entirely template demo data (fake airlines, routes, dates,
  1920 results) and is not connected to the flight catalog.
- Tour/visa filters on listing pages are template filters and not all are wired
  to the real search API.

### Agency

- Agency dashboards use real read APIs for bookings/earnings, but the sidebar
  identity was hardcoded as “Chris Foxy / Member Since 10 May 2025”.
- Several agent booking modal templates still contain hardcoded demo traveler
  names and are not part of the primary Hani booking flow.
- No agency-facing offer/RFQ composer equivalent to Lastsecond’s agency offer
  approval step.

### Super admin

- Product, booking, finance, support, agency, RBAC, settings, audit, and exports
  are real and permission-checked.
- Gaps remain:
  - tour/visa/flight records can be created and published but not fully edited
    from a dedicated editor;
  - no explicit RFQ/offer queue for visa/flight/tour requests;
  - flight inventory admin is route/offer creation only, not provider sync.

## Batch 12 changes implemented

1. Added public tour lookup by slug:
   `GET /market/v1/products/by-slug/{slug}`.
2. Replaced static `/tours/[slug]` and `/tour/tour-details` destination with a
   real data-bound tour detail page:
   - localized title/summary/description
   - itinerary, included/excluded services, cancellation policy
   - real agency offers and departure dates
   - checkout CTA for online offers
3. Replaced static `/visa/[slug]` with a real visa detail page:
   - country name/description
   - real visa types, prices, processing/validity
   - documents, steps, FAQs
   - real application CTA
4. Replaced the static visa application page with a real form that submits to
   `POST /market/v1/visa-applications`; added a real confirmation page by
   application id.
5. Updated listing/home links to canonical `/tours/{slug}` and `/visa/{slug}`;
   legacy `/tour/tour-details` and `/visa/visa-details` now redirect to the
   canonical route instead of rendering fake template data.
6. Fixed agency sidebar identity to use `/api/agency/me` (authenticated profile)
   instead of the hardcoded demo name.
7. Documented the remaining flight/RFQ/admin gaps.

## Priority backlog after Batch 12

### P0

- Wire the Hani flight page to `SearchFlights` / real offers; remove fake airline
  and route data.
- Add real admin edit/publish screens for tour, visa, and flight records.
- Add visa document uploads to the real application flow and a customer
  application detail/tracking page.

### P1

- Add an RFQ/offer queue for visa, flight, and custom tour requests (Lastsecond
  six-step flow) with agency offer, contract, deposit, and final payment.
- Wire listing filters (tour type, price, duration, visa processing time) to the
  real search APIs and remove demo counters.
- Replace hardcoded agent modal traveler identity with authenticated data.

### P2

- Add provider sync for flight inventory and real ticketing.
- Add saved views/exports for the RFQ queue and product moderation.
- Add structured review data to real product detail pages instead of template
  reviews.
