# Lastsecond Simulation Map

- **Status:** Planned — Gate 9.1
- **Date:** 2026-11-15
- **Purpose:** Map Lastsecond-style pages to Hani routes, APIs, data contracts, and delivery phases.

> **Template-first note:** `DONE (basic)` marks the temporary Gate 9 prototype.
> The target is to render the same route with the purchased Dreamstour template
> page, patched for Hani data, i18n, RTL, and missing states. Prototype pages
> are not the final design and must not be extended as a parallel UI.

---

## 1. Principles

1. One public route per page; no route groups with duplicate URLs.
2. Home has 12 selectable experiences, but one route.
3. Every page gets data from a repository port; HTTP adapter in production,
   mock adapter only in development/test.
4. Frontend types are generated from Hani OpenAPI.
5. Unsupported verticals are hidden, not faked.
6. Page status values: `PLANNED`, `IN_PROGRESS`, `DONE`, `EXTERNAL`.

---

## 2. Public Pages

| Route | Hani API | Key data | Status |
|---|---|---|---|
| `/[locale]` | `GET /market/v1/home` | hero, sections, tours, visas, content, campaigns | PLANNED |
| `/[locale]/tours` | `GET /market/v1/search` | filters, sort, page | DONE (basic) |
| `/[locale]/tours/[slug]` | `GET /market/v1/search?q=slug`, `GET /market/v1/products/{id}/compare`, `/recommendations`, `/seo` | offers, gallery, itinerary, reviews | DONE (basic) |
| `/[locale]/hotels` | `GET /market/v1/hotels` | stars, rating, price, image | DONE (basic) |
| `/[locale]/hotels/[slug]` | `GET /market/v1/hotels/{slug}`, `GET /market/v1/hotels/{slug}/tours` | rooms, amenities, policies, offers | DONE (basic) |
| `/[locale]/flights` | `GET /market/v1/flights/search` | offers, airline, times, price, deep link | DONE (basic) |
| `/[locale]/flights/[slug]` | `GET /market/v1/flights/routes/{slug}` | route detail + offers | PLANNED |
| `/[locale]/visa` | `GET /market/v1/visas` | country, type count, min price | DONE (basic) |
| `/[locale]/visa/[slug]` | `GET /market/v1/visas/{slug}` | types, documents, steps, FAQs | DONE (basic) |
| `/[locale]/visa/[slug]/apply` | `POST /market/v1/visa-applications` | application form | PLANNED |
| `/[locale]/visa/applications/[id]` | `GET /market/v1/visa-applications/{id}` | status, timeline, tracking | PLANNED |
| `/[locale]/restaurants` | `GET /market/v1/restaurants` | place cards, cuisine, rating | DONE (basic) |
| `/[locale]/restaurants/[slug]` | `GET /market/v1/restaurants/{slug}`, `POST /market/v1/restaurant-reservations` | menu, reservation | DONE (basic) |
| `/[locale]/attractions` | `GET /market/v1/attractions` | place cards, category | DONE (basic) |
| `/[locale]/attractions/[slug]` | `GET /market/v1/attractions/{slug}` | detail, nearby | DONE (basic) |
| `/[locale]/destinations/[slug]` | `GET /market/v1/destinations/{slug}/landing` | landing SEO, tours, hotels | PLANNED |
| `/[locale]/agencies` | `GET /market/v1/agencies` | directory, rating, tours | DONE (basic) |
| `/[locale]/agencies/[slug]` | `GET /market/v1/agencies/{slug}/profile` | profile, reviews, tours | DONE (basic) |
| `/[locale]/u/[username]` | `GET /market/v1/authors/{username}/profile` | author, content stats, badges | DONE (basic) |
| `/[locale]/blog` | `GET /market/v1/content/blog` | cards, tags, pagination | DONE (basic) |
| `/[locale]/blog/[slug]` | `GET /market/v1/content/blog/{slug}`, `/related`, `/seo` | body, related, comments, likes | DONE (basic) |
| `/[locale]/travelogues` | `GET /market/v1/content/travelogues` | cards, series | DONE (basic) |
| `/[locale]/travelogues/[slug]` | `GET /market/v1/content/travelogues/{slug}`, `/seo` | body, comments, likes | DONE (basic) |
| `/[locale]/videos` | `GET /market/v1/content/videos` | cards, duration | DONE (basic) |
| `/[locale]/videos/[slug]` | `GET /market/v1/content/videos/{slug}`, `/seo` | player, related, comments | DONE (basic) |
| `/[locale]/compare` | `GET /market/v1/products/{id}/compare` | product comparison | PLANNED |
| `/[locale]/wishlist` | local + `GET /market/v1/wishlist` (new) | saved items | PLANNED |
| `/[locale]/recently-viewed` | local storage | recent items | PLANNED |
| `/[locale]/campaigns` | `GET /content/v1/campaigns` | campaigns | PLANNED |
| `/[locale]/campaigns/[slug]` | `GET /content/v1/campaigns/{slug}`, `POST /register` | campaign detail/register | PLANNED |
| `/[locale]/about` | static | about | PLANNED |
| `/[locale]/contact` | static | contact | PLANNED |
| `/[locale]/faq` | static | FAQ | PLANNED |
| `/[locale]/terms` | static | terms | PLANNED |
| `/[locale]/privacy` | static | privacy | PLANNED |
| `/[locale]/trust` | `GET /market/v1/trust` | trust and claims | PLANNED |
| `/[locale]/search` | `GET /market/v1/search`, content search | global search | PLANNED |
| `/[locale]/settings/experience` | `GET/PUT /market/v1/me/preferences` | home experience, theme, locale, currency | PLANNED |

---

## 3. Auth Pages

| Route | API | Notes |
|---|---|---|
| `/[locale]/auth/login` | `POST /market/v1/auth/otp/request` | mobile input |
| `/[locale]/auth/verify` | `POST /market/v1/auth/otp/verify` | OTP code, HttpOnly cookie |
| `/[locale]/auth/logout` | `POST /market/v1/auth/logout` (new) | clear session |
| `/[locale]/auth/lastgram` | external | feature-flagged |
| `/[locale]/auth/complete-profile` | `PUT /market/v1/me/profile` (new) | display name, email |

---

## 4. Traveler Dashboard

| Route | API | Notes |
|---|---|---|
| `/[locale]/dashboard` | `GET /market/v1/dashboard/{userId}` | overview |
| `/[locale]/dashboard/bookings` | `GET /market/v1/orders` (new list) | all bookings |
| `/[locale]/dashboard/bookings/[id]` | `GET /market/v1/orders/{id}`, `/contract` | detail/PDF |
| `/[locale]/dashboard/payments` | `GET /market/v1/payments` (new list) | payment history |
| `/[locale]/dashboard/invoices` | `GET /market/v1/invoices` (new list) | invoices |
| `/[locale]/dashboard/refunds` | `GET /market/v1/refunds` (new list) | refund/cancellation |
| `/[locale]/dashboard/installments` | `GET /market/v1/orders/{id}/installments` | installment plan |
| `/[locale]/dashboard/reviews` | `GET /market/v1/reviews?author=me` | my reviews |
| `/[locale]/dashboard/wishlist` | `GET /market/v1/wishlist` (new) | saved items |
| `/[locale]/dashboard/notifications` | `GET /content/v1/dashboard/{userId}/messages` | messages |
| `/[locale]/dashboard/profile` | `GET/PUT /market/v1/me/profile` (new) | profile |
| `/[locale]/dashboard/settings` | `GET/PUT /market/v1/me/preferences` | locale/currency/home/theme |

**MVP rule:** hide pages whose backend list endpoint is not ready. Do not ship
mock dashboards.

---

## 5. Agency Dashboard

| Route | API | Notes |
|---|---|---|
| `/[locale]/agency/onboarding` | `POST /market/v1/agencies/onboarding`, `GET /market/v1/agencies/me` | onboarding |
| `/[locale]/agency` | `GET /market/v1/channel/me/dashboard` | metrics |
| `/[locale]/agency/offers` | supplier/channel offer APIs | offers/departures |
| `/[locale]/agency/offers/[id]` | offer detail + departures | availability |
| `/[locale]/agency/bookings` | supplier/channel booking APIs | reservations |
| `/[locale]/agency/settlements` | `GET /market/v1/channel/settlements` | settlement |
| `/[locale]/agency/payouts` | `GET /market/v1/settlements/payouts/{agencyId}` | payouts |
| `/[locale]/agency/reviews` | reviews for agency | moderation/replies |
| `/[locale]/agency/settings` | agency profile + channel settings | profile |
| `/[locale]/agency/experience` | agency default home experience | optional |

---

## 6. Checkout and MoR

| Route | API | Notes |
|---|---|---|
| `/[locale]/checkout/[productId]` | `POST /market/v1/quotes`, `POST /market/v1/holds` | quote/hold |
| `/[locale]/checkout/review` | `POST /market/v1/orders` | order creation |
| `/[locale]/checkout/payment` | `POST /payments/v1/intents` | provider redirect |
| `/[locale]/checkout/confirmation` | `GET /market/v1/orders/{id}` | success |
| `/[locale]/payment/callback` | provider callback | state reconciliation |
| `/[locale]/orders/[id]/invoice` | `GET /payments/v1/invoices/{id}` / PDF | invoice |
| `/[locale]/orders/[id]/refund` | refund request | cancellation/refund |

**Rule:** price, availability, tax, discount, and payment state are server
authoritative. The frontend never computes the final payable amount.

---

## 7. Home Experiences

All 12 are retained and selectable. They share `HomeViewModel`.

| ID | Source | Status |
|---|---|---|
| `all-services-classic` | `index-1` | PLANNED |
| `all-services-modern` | `index-2` | PLANNED |
| `tour-classic` | `index-3` | PLANNED |
| `hotel` | `index-4` | PLANNED |
| `car` | `index-5` | PLANNED (vertical may be disabled) |
| `flight` | `index-6` | PLANNED |
| `cruise` | `index-7` | PLANNED (vertical may be disabled) |
| `tour-editorial` | `index-8` | PLANNED |
| `bus` | `index-9` | PLANNED (vertical may be disabled) |
| `guide` | `index-10` | PLANNED (vertical may be disabled) |
| `activity` | `index-11` | PLANNED (vertical may be disabled) |
| `visa` | `index-12` | PLANNED |

Selection is stored in settings; it is not a route.

---

## 8. Simulation Adapters

To build pages before every backend field exists:

```text
features/<domain>/infrastructure/
  http-<domain>-repository.ts
  mock-<domain>-repository.ts
```

Rules:

- `NEXT_PUBLIC_DATA_SOURCE=api|mock`.
- `api` is the default in all deployed environments.
- `mock` is allowed only in development/test.
- Mock fixtures use the same ViewModel as HTTP adapters.
- MSW handlers are generated from OpenAPI examples.
- Storybook uses mock repositories, never raw JSON in components.

This keeps the UI buildable while contracts are being completed.

---

## 9. Phased Delivery

### Sprint A — Public shell

- Home registry + one experience
- Header/footer/locale shell
- Tours list/detail
- Hotels list/detail
- Visa list/detail

### Sprint B — Discovery and content

- Flights
- Restaurants/attractions
- Blog/travelogues/videos
- Destinations
- Agencies/author

### Sprint C — Account

- OTP
- Traveler dashboard
- Preferences/home experience settings

### Sprint D — Agency

- Onboarding
- Offers/bookings
- Settlements/payouts

### Sprint E — Commerce

- Quote/hold/order
- Payment
- Invoice/refund
- Installments

### Sprint F — Quality

- SEO/JSON-LD
- RTL visual tests
- E2E
- Accessibility
- Performance

---

## 10. Definition of Page Done

A page is DONE only when:

- [ ] It uses a real Hani API or an approved mock adapter.
- [ ] It has loading, empty, error, and unauthorized states.
- [ ] FA/EN/AR strings exist.
- [ ] RTL is verified.
- [ ] Metadata/hreflang/JSON-LD exist for public pages.
- [ ] Keyboard and axe checks pass.
- [ ] Mobile layout is verified.
- [ ] No raw API DTO is used directly in UI.
- [ ] No hard-coded user-facing text.
- [ ] No client-side price calculation as source of truth.
