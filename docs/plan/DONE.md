# Hani — کارهای انجام‌شده (Done Ledger)

> فقط کارهایی که **واقعاً تحویل شده‌اند**. کارهای نیمه‌تمام در انتهای سند و جدا ثبت شده‌اند.

## ۱. Phase 0 — Foundation ✅

| # | تحویل | شاهد | Commit |
|---|---|---|---|
| D-01 | Solution و ساختار پروژه | `Hani.slnx` | `825ed39` |
| D-02 | Central Package Management + lock | `Directory.Packages.props` + `packages.lock.json` | `825ed39` |
| D-03 | Domain primitives | `Entity`, `AggregateRoot`, `IDomainEvent`, `Money` | `825ed39` |
| D-04 | CQRS + Result/Error | `ICommand`, `IQuery`, `Result`, `Error` | `825ed39` |
| D-05 | ValidationBehavior | `ValidationBehavior.cs` | `825ed39` |
| D-06 | LoggingBehavior | `LoggingBehavior.cs` | `98ab18d` |
| D-07 | Serilog + Toggle | `Program.cs` + `ObservabilityOptions` | `98ab18d` |
| D-08 | OpenTelemetry + OTLP | `ObservabilityServiceCollectionExtensions` | `98ab18d` |
| D-09 | Cache abstraction | `ICacheService` + Memory/Redis/None | `98ab18d` |
| D-10 | TenantContext + Middleware | `CurrentTenant` + `TenantMiddleware` | `98ab18d` |
| D-11 | Idempotency Behavior | `IIdempotentCommand`, `IdempotencyBehavior` | `98ab18d` |
| D-12 | MassTransit transports | InMemory / RabbitMQ / Postgres | `ab3b2e7` |
| D-13 | Outbox/Inbox entities + migration | `InitialSupply` | `ab3b2e7` |
| D-14 | Docker Compose | Postgres/Redis/RabbitMQ/Seq/OTel | `98ab18d` |
| D-15 | ArchitectureTests | ModuleBoundary + Layer + CQRS | `825ed39` |
| D-16 | BannedSymbols | RS0030 تأییدشده | `825ed39` |
| D-17 | CI + CODEOWNERS + PR Template | `.github/` | `825ed39` |
| D-18 | `scripts/verify.ps1` | build/test/migration/format | `98ab18d` |

## ۲. Phase 1 — Core Domain (موارد Done)

### Catalog

| # | تحویل | شاهد | Commit |
|---|---|---|---|
| D-19 | TourProduct مشترک | `TourProduct.cs` | `9fa5a3e` |
| D-20 | ترجمه FA/EN/AR | `TourProductTranslation.cs` | `9fa5a3e` |
| D-21 | Destination + Translation | `Destination.cs` | `9fa5a3e` |
| D-22 | Create TourProduct | Command/Handler/Validator | `9fa5a3e` |
| D-23 | Publish TourProduct | Command/Handler/Validator | `9fa5a3e` |
| D-24 | Query TourProduct | Query/Handler/Validator/DTO | `9fa5a3e` |
| D-25 | Catalog API | `/internal/v1/products`, `/market/v1/products` | `9fa5a3e` |
| D-26 | Catalog Migration | `InitialCatalog` | `9fa5a3e` |
| D-27 | Catalog Unit Tests | ۴ تست | `9fa5a3e` |

### Identity

| # | تحویل | شاهد | Commit |
|---|---|---|---|
| D-28 | Agency | `Agency.cs` + Status + Event | `af5b415` |
| D-29 | ApiClient | `ApiClient.cs` + Status + Event | `af5b415` |
| D-30 | Secret generation + SHA-256 | `SecretGenerator.cs` | `af5b415` |
| D-31 | Create Agency | Command/Handler/Validator | `af5b415` |
| D-32 | Create ApiClient | Command/Handler/Validator | `af5b415` |
| D-33 | Get Agency | Query/Handler/Validator/DTO | `af5b415` |
| D-34 | Identity API | `/internal/v1/agencies` | `af5b415` |
| D-35 | Identity Migration | `InitialIdentity` | `af5b415` |
| D-36 | Identity Unit Tests | ۴ تست | `af5b415` |

### Supply

| # | تحویل | شاهد | Commit |
|---|---|---|---|
| D-37 | AgencyOffer Domain | `AgencyOffer.cs` + Event | `825ed39` |
| D-38 | Create AgencyOffer | Command/Handler/Validator | `825ed39` |
| D-39 | Get AgencyOffer | Query/Handler/Validator/DTO | `825ed39` |
| D-40 | Supply API | `/supplier/v1/offers` (Create/Get) | `825ed39` |
| D-41 | Supply Migration | `InitialSupply` | `ab3b2e7` |
| D-50 | TourDeparture Domain | `TourDeparture.cs` + Price + Status | `56a9243` |
| D-51 | Capacity + Concurrency | `UpdateAvailability` + `Version` | `56a9243` |
| D-52 | Departure Pricing | RoomType + Amount + Currency | `56a9243` |
| D-53 | Create/List Departure API | `/supplier/v1/offers/{id}/departures` | `56a9243` |
| D-54 | Availability API | `/supplier/v1/departures/{id}/availability` | `56a9243` |
| D-55 | Price API | `/supplier/v1/departures/{id}/prices` | `56a9243` |
| D-56 | Departure Migration | `AddTourDepartures` | `56a9243` |
| D-57 | Departure Unit Tests | ۶ تست | `56a9243` |
| D-58 | Supplier Upsert | `PUT /supplier/v1/offers/{externalId}` | `d4b9465` |
| D-59 | ExternalId + unique index | `agency_offers.external_id` | `d4b9465` |
| D-60 | Offer Lifecycle | Submit / Approve / Reject / Archive | `d4b9465` |
| D-61 | API Key Auth | `X-Api-Key` + `X-Api-Secret` | `d4b9465` |
| D-62 | Tenant Isolation | claim-based + 401/404 demo | `d4b9465` |
| D-63 | Localized Errors | FA/EN/AR titles + code | `d4b9465` |
| D-64 | Destination API | `POST /internal/v1/destinations` | `d4b9465` |
| D-65 | Offer Migration | `AddOfferLifecycle` | `d4b9465` |
| D-66 | Auth Unit Tests | 3 tests | `d4b9465` |
| D-67 | Localization Tests | 4 tests | `d4b9465` |
| D-68 | Lifecycle Tests | 5 tests | `d4b9465` |
| D-69 | Phase 1 Demo | `scripts/demo-phase1.ps1` | `d4b9465` |
| D-70 | Phase 1 Gate Report | `docs/reports/phase-1-gate.md` | `d4b9465` |
| D-71 | XML summaries | ???? type??? public | `8bc804c` |
| D-72 | Module READMEs | Supply / Catalog / Identity / BuildingBlocks / Api | `8bc804c` |
| D-73 | Documentation standard | `docs/engineering/code-documentation.md` | `8bc804c` |
| D-74 | DocumentationTests | ? ??? | `8bc804c` |
| D-75 | Agent documentation policy | `AGENTS.md` + Cursor + PR/DoD | AGENTS.md |
| D-76 | Config-driven localization | `LocalizationOptions` + `ILanguageCatalog` + `appsettings` | `5b956d3` |
| D-77 | IIdGenerator + UUIDv7 | `IIdGenerator` + `Uuid7IdGenerator` + ArchitectureTest | `5b956d3` |
| D-78 | Localization hard-code gate | `LocalizationHardcodeTests` + AGENTS checklist + verify | `783cd59` |
| D-79 | Central ProblemDetails + Correlation ID | `HaniProblemDetails` + `CorrelationIdMiddleware` + OpenAPI | `3b4c68e` |
| D-80 | Order + immutable Contract | Order/Contract aggregates + order endpoints + `AddOrdersAndContracts` | `f43339e` |
| D-81 | PaymentIntent + Gateway | Payments module + `InitialPayments` + Mock gateway | `dc76539` |
| D-82 | Payment webhook + verify | HMAC verify + `payment_webhook_events` + Order.Paid | `7b85652` |
| D-83 | Settlement ledger + commission | Commission rules/entries + balanced double-entry ledger | `0dd6fbe` |
| D-84 | Lastsecond baseline lock | `BASELINE.md` + `baseline.json` + `BaselineCoverageTests` + `check-baseline.ps1` | `3a8992b` |
| D-85 | Tour Content Model | Itinerary/meals/services/policies/required items + `AddTourContent` | `99d42ea` |
| D-86 | Offer Accommodation + Flight Options | Hotel/room/MealPlan + flight details + `AddOfferOptions` | `68a4895` |
| D-87 | Multi-currency + VAT/Duty + PaymentObligation | PriceComponent snapshot + OfferTaxRule + per-currency obligations/intents/commission | `79daeb7` |
| D-88 | Lastsecond Re-audit fixes | Per-currency minPrices + options/tax in compare + accommodation selection snapshot | `13cf435` |
| D-89 | Endpoint handler XML docs | Summary on every `*Endpoints.cs` handler + `DocumentationTests` guard | `a540530` |
| D-90 | Discovery & SEO | Faceted search/sort + canonical/hreflang + JSON-LD + landing + sitemap/robots | `d7921ac` |
| D-91 | Identity Core | User + OTP + JWT/refresh + profile + author + `AddUsersAndOtp` | `026724a` |
| D-92 | Trust, Agency & UGC | Onboarding/panel/trust + reviews/claims/media + `AddTrustAgencyAndEngagement` | `fc26e43` |
| D-93 | BookingMode/CollectionMode | Offer + Quote/Order/Contract snapshot + Search/Compare exposure + `AddBookingModes` | Gate 4 |
| D-94 | ReservationRequest | Domain + market/supplier/internal endpoints + TTL + ownership | Gate 4 |
| D-95 | Lead/RFQ | LeadRequest + Create/Get/List/Match/Distribute/Close + `AddLeadDistributions` | Gate 4 |
| D-96 | PriceDiscrepancy | Report + admin queue + Resolve | Gate 4 |
| D-97 | Installments | InstallmentPlan per currency + pay endpoint + `AddRequestsLeadsDiscrepanciesInstallments` | Gate 4 |
| D-98 | Offline Payment | Receipt Cash/Transfer/Cheque + Paid + commission + `AddOfflinePayments` | Gate 4 |
| D-99 | CollectionMode v2 | HaniOnline/AgencyOnline/AgencyOffline + SellerOfRecord/InvoiceIssuer + ADR-0026 | Audit Remediation |
| D-100 | InstallmentTerms | Down payment/monthly fee/cheque + eligibility + `installmentOnly` | Audit Remediation |
| D-101 | Review criteria/proof/reply | Per-target criteria + voucher/contract proof + owner reply | Audit Remediation |
| D-102 | Public agency profile | License type/date/file + manager/staff/address/province | Audit Remediation |
| D-103 | Canonical Hotel | Hotel aggregate + translations/amenities/geo + `HotelId` link | Audit Remediation |
| D-104 | Place/Geo/Nearby | Restaurant/Attraction aggregate + Haversine nearby API | Audit Remediation |
| D-105 | Flight ADR | Metasearch/Redirect decision (ADR-0027) | Audit Remediation |
| D-106 | Tour taxonomy | TourCategory/TravelType + search filters | Audit Remediation |
| D-107 | Hotel vertical | Catalog hotel search/detail/nearby + gallery + rating; Booking hotel inquiry | Gate 5 |
| D-108 | Restaurant/Attraction vertical | Place search/detail/nearby + restaurant menu + reservation | Gate 5 |
| D-109 | Visa vertical | VisaCountry/Type + price/documents/FAQ + VisaApplication workflow | Gate 5 |
| D-110 | Flight metasearch | FlightRoute/Offer + IFlightProvider + deep link (ADR-0027) | Gate 5 |
| D-111 | Geo + Vertical SEO | `/geo/nearby` + `/seo/{type}/{slug}` + full vertical sitemap | Gate 5 |
| D-112 | Vertical review aggregation | `IReviewSummaryReadService` + averageRating/reviewCount + `sort=rating` | Gate 5 |
| D-113 | Restaurant meal/diet | PlaceMealPeriod/PlaceDietaryOption + filters | Gate 5.1 |
| D-114 | Hotel rooms/board | HotelRoom + room pricing/occupancy in HotelDto | Gate 5.1 |
| D-115 | Hotel linked tours | IHotelOfferReadService + `/hotels/{slug}/tours` | Gate 5.1 |
| D-116 | Rank/recommendation | RankInCity + recommendationPercent | Gate 5.1 |
| D-117 | Review date/gallery | from/to filter + approved user photos | Gate 5.1 |
| D-118 | Flight depth | Airline/Airport + filters + external provider adapter | Gate 5.1 |
| D-119 | Visa depth | issuance type, document category, multi-applicant | Gate 5.1 |
| D-120 | Landing SEO/JSON-LD | vertical landing + AggregateRating/FAQPage + labels | Gate 5.1 |
| D-121 | Content module | Blog/Category/Travelogue/Video/Comment + migration | Gate 6 |
| D-122 | Growth | Ads/Newsletter/Campaign/Notification/Analytics | Gate 6 |
| D-123 | Gamification | UserGamification + BadgeDefinition/UserBadge | Gate 6 |
| D-124 | Recommendations | Product recommendations + trending content | Gate 6 |
| D-125 | Notification dispatcher | queue + retry + provider abstraction | Gate 6 |
| D-126 | Dashboard C-08 | UserMessage/UserDocument + summary/list APIs | Gate 6 |
| D-127 | Channel OAuth/API | client credentials + scopes + catalog/booking/cancel | Gate 7 |
| D-128 | Billing | Refund/Invoice + settlement terms/payout | Gate 7 |
| D-129 | Channel webhook/dunning | webhook publisher + invoice reminder | Gate 7 |
| D-130 | Dashboards + reconciliation | agency/traveler/admin dashboards + chargeback/reconciliation | Gate 7 |
| D-131 | Search hardening | batch offer hydration + 30s cache + no N+1 | Gate 8 |
| D-132 | Search indexes | published-product + pg_trgm GIN + offer status indexes | Gate 8 |
| D-133 | Content sitemap | `/content-sitemap.xml` + hreflang + robots | Gate 8 |
| D-134 | Integration tests | Testcontainers PostgreSQL + all module migrations | Gate 8 |
| D-135 | Load/SLO | k6 search/SEO + measured SLO report | Gate 8 |
| D-136 | DR drill | logical dump/restore + RTO/RPO runbook | Gate 8 |
| D-137 | Security | response headers + configurable rate limiting + review | Gate 8 |
| D-138 | Observability | live/ready health + SLO + dashboard + alerts | Gate 8 |
| D-139 | Architecture decision | ADR-0028 read model + ADR-0029 modular monolith | Gate 8 |
| D-140 | Continent hierarchy | Continent type + descendant destination filtering | Gate 8.1 |
| D-141 | Hotel sort/rank | newest/reviews/alphabetical/rating/rank + rank in city | Gate 8.1 |
| D-142 | Agency directory | public list/filter + rating/review/tour count | Gate 8.1 |
| D-143 | Author aggregate | author + content + gamification + review count BFF | Gate 8.1 |
| D-144 | Home BFF | tours/visas/itineraries/blog/campaigns aggregation | Gate 8.1 |
| D-145 | Content JSON-LD | BlogPosting/Article/VideoObject | Gate 8.1 |
| D-146 | Review criteria | per-criterion average endpoint | Gate 8.1 |
| D-147 | Blog tags/related | destination tags + related posts | Gate 8.1 |
| D-148 | Visa related guides | related article slugs on visa types | Gate 8.1 |
| D-149 | Media upload | multipart upload + storage abstraction | Gate 8.1 |
| D-150 | Notification provider | HTTP Email/SMS sender + logging fallback | Gate 8.1 |
| D-151 | External boundary | frontend, flight credentials, Lastgram SSO/competition | Gate 8.1 |
| D-152 | Next.js frontend | FA/EN/AR app shell + RTL/LTR + API client | Gate 9 |
| D-153 | Core public pages | home, tours, hotels, visa, content, agencies, author, places, flights | Gate 9 |
| D-154 | Frontend build | `npm run build` + smoke HTTP 200 | Gate 9 |
| D-155 | Frontend Docker | multi-stage Next.js image | Gate 9 |

## ۳. مستندات

| # | سند | Commit |
|---|---|---|
| D-42 | `PLAN.md` نسخه ۱.۴ | `7df2265` |
| D-43 | ADR-0001 تا 0017 | متعدد |
| D-44 | `docs/product/tour-detail-page.md` | `5532a78` |
| D-45 | `docs/engineering/error-catalog.md` | `5532a78` |
| D-46 | `docs/plan/ROADMAP.md` | `7df2265` |
| D-47 | `docs/plan/STATUS.md` | `7df2265` |
| D-48 | `docs/plan/TASKS.md` | `7df2265` |
| D-49 | `docs/reports/architecture-drift-2026-11.md` | `af5b415` |

## ۴. تأیید کیفیت (آخرین اجرا)

| شاخص | مقدار |
|---|---|
| Build | ۰ warning / ۰ error |
| Unit Tests | 149 passed |
| Architecture Tests | 34 passed |
| Total | **183 passed** |
| Migrations | Supply (8) + Catalog (6) + Content (2) + Identity (6) + Booking (10) + Payments (8) + Settlement (3) |
| Format | clean |
| Vulnerable Packages | none |
| API `/health` | Healthy |
| Banned API | RS0030 تأییدشده |

## ۵. Partial — انجام‌شده اما کامل نیست

> این‌ها در شمارش «Done» نیستند.

| مورد | وضعیت | باقی‌مانده |
|---|---|---|
| Idempotency | InMemory + Behavior | Postgres/Redis پایدار |
| MassTransit | wired + Outbox entities | Outbox فعال + Consumer |
| Localization | عنوان محلی config-driven | resx per-code (Phase 5) |
| Identity | Agency + ApiClient | User + Role + JWT |
| Catalog + Verticals | TourProduct + Destination + Hotel/Place/Visa/Flight | Blog/Content → Gate 6 |
| Tenant | Context + Middleware + demo | تست Integration DB |

## ۶. Commitهای کد

| Commit | موضوع |
|---|---|
| `825ed39` | Governance bootstrap |
| `98ab18d` | Observability / Cache / Tenant / Idempotency / Docker |
| `ab3b2e7` | MassTransit + Outbox |
| `9fa5a3e` | Catalog |
| `af5b415` | Identity |
| `56a9243` | Tour Departures |
| `d4b9465` | Auth / Upsert / Moderation / Gate |
| `8bc804c` | XML docs / module READMEs / DocumentationTests |
| `17b6415` | Marketplace search + compare |
| `422b06d` | Booking quote + hold |
| `f2b7a15` | Booking/Marketplace API docs |
| `5b956d3` | Config-driven localization + IIdGenerator |
| `783cd59` | Localization hard-code CI gate |
| `3b4c68e` | Central ProblemDetails + Correlation ID |
| `f43339e` | Order + immutable Contract |
| `dc76539` | PaymentIntent + Gateway adapter |
| `7b85652` | Payment webhook verification and dedupe |
| `0dd6fbe` | Settlement ledger and commission accrual |
| `3a8992b` | Lastsecond baseline lock and gate checks |
| `99d42ea` | Multilingual tour content model (TC-083) |
| `68a4895` | Offer accommodation and flight options (TC-084) |
| `79daeb7` | Multi-currency pricing, taxes, obligations, settlement (TC-082) |
| `13cf435` | Lastsecond re-audit fixes |
| `a540530` | Endpoint handler XML documentation guard |
| `d7921ac` | Faceted search and SEO (Gate 2) |
| `026724a` | Identity core: OTP, JWT, profiles |
| `fc26e43` | Trust, agency, reviews, claims, media (Gate 3) |
| `f91e461` | Booking modes, reservation/lead, installments, offline payment |
| `7083b45` | Audit remediation A-01..A-08 (CollectionMode v2, installments, reviews, hotel/place, taxonomy) |
| `1c202bd` | Gate 5 verticals, geo, vertical SEO, review aggregation |
| `f6d65ce` | Gate 5.1 vertical depth and parity residuals |
| `1a35e3c` | Gate 6 content, growth, and gamification foundation |
| `26e3b3a` | Gate 6 recommendation, notification dispatcher, dashboard |
| `09712c0` | Gate 7 channel OAuth, refunds, invoices, settlement payouts |
| `a532531` | Gate 7 webhooks, dunning, dashboards, chargebacks, reconciliation |
| `ddcb9f5` | Gate 7 PSP refund abstraction, PDF invoice, dunning scheduler, white-label resolver, dashboards |
| `18ea8bd` | Gate 8 search hardening, sitemap, Testcontainers, k6/SLO, DR, security, observability |
| `1e76231` | Gate 8.1 Lastsecond parity closure: hierarchy, sort, agency/author BFF, content JSON-LD, media upload, HTTP sender |
| `87827ef` | Gate 9 Next.js frontend: FA/EN/AR, core public pages, Docker build |
| `5ab00a7` | Gate 9.1 template-first architecture: Dreamstour as single visual source |
| `afaec28` | Gate 9.1 template base: one app tree, locale routing, 12 home views, build green |
| `2898d00` | Gate 9.1 template copy externalized: FA/AR translations + locale provider |
| `1d2f139` | Gate 9.1 data binding: Tour/Hotel API, search fields (destination/rating/agency/departure) |
| `4a72517` | Gate 9.1 translation coverage: 2,890 template strings FA/AR, RTL offcanvas fix |
| `1a8f2a3` | Gate 9.1 Visa Grid API binding and localized visa labels |
| `589ae13` | Gate 9.1 Home BFF and Blog Grid API binding |
| `54d8072` | Gate 9.1 Canonical Lastsecond routes + duplicate component tree removal |
| `c717ef2` | Gate 9.1 Lastsecond pages: restaurants, attractions, content, agencies, author, badges |
| `eee027e` | Gate 9.1 Blog detail API + content fallback for corrupted translations |
| `5032e31` | Gate 9.1 Home data strip for all experiences + hotel priceFrom |
| `7df2265` | Phase roadmap + status + tasks |
| `2fc16c3` | Gate 9.1 domestic/foreign tour scope: `TourScope`, `AddTourScope`, search/home scope, SEO routes, template tabs, unit test |
| `931855a` | Gate 9.1 C3 preferences: `UserPreferences`, `AddUserPreferences`, `/me/preferences`, settings page, cookie fallback, tests |
| `792aad2` | Gate 9.1 C4/C5 dashboard core: `/me/dashboard`, `/me/orders`, `/me/agency/dashboard`, real traveler/agency cards |
| `792aad2` | Gate 9.1 C6 checkout core: `/checkout/[productId]`, quote→hold→order→intent, local confirmation |
| `b3021be` | Gate 9.1 C4/C5 complete data: traveler payments/invoices/refunds/reviews/wishlist/profile, agency listings/orders/payouts/settings |
| `d1a5db3` | Gate 9.1 final data closure: inbox messages, real agency dashboard, mock payment completion, Playwright smoke |
| `1223a46` | Gate 9.1 data completeness: tour cover image, content author/reading time |
| `5493b6b` | Home parity Phase 1: home BFF sections, search options, origin-name resolution |
| `c498298` | Home parity Phase 2: Tour hero default, domestic/foreign fields, server options, localized dates, latest scope sections |
| `9c9429a` | Home parity Phase 3: origin cities, travelogue/blog split, visa cover/processing, destination translation loading |
| `5e05cb6` | Home parity Phase 4: SEO metadata/JSON-LD/sitemap, a11y landmarks/tabs/labels, Lighthouse home 100/100/100 |
| `061c64b` | Home parity Phase 4 closure: listing a11y template debt to Lighthouse 100, FA/EN/AR verification, regression tests, screenshots |
| `c232d80` | Calendar architecture slice 1: Jalali UI, Gregorian contract, shared pickers, server guards, AGENTS rule |
| `bceddc5` | Calendar phase 2: global MediatR GregorianDateBehavior, CI date-architecture gate, platform-wide display/picker migration |
| `55f1fd5` | Calendar UX closure: empty date inputs, centered Jalali modal, searchable/scrollable home dropdowns |
| `fea4cf6` | Calendar/dropdown QA: repaired FA/AR message strings and kept dropdown menus inside the viewport |
| `89cceb2` | Date/dropdown QA follow-up: single modal title, dropdown always below, message strings repaired |
| `e6248a8` | Date label/portal follow-up: conditional labels, portaled dropdown below trigger, repaired FA/AR strings |
| `c56fa80` | Home search polish: raised hero form, repaired demo labels, filtered test hotels, unique options test |
| `5c79553` | Search UX: no scroll jump on dropdown open, menu below and scroll-stable |
| `fb50871` | Homepage control panel: DB composition settings, admin editor, Lastsecond default order; agency advertising proposal |
| `aef1c9e` | Admin homepage panel moved into template-derived agency shell |
| `6dfddb6` | Content media library phase 1: WebP conversion, variants, local storage, admin media library |
| `16ed7e8` | Content media library phase 2: responsive WebP delivery, OG/preload, CDN switch, image sitemap |
| `5831b64` | Media Phase 3 backend foundation: folders, tags, focal metadata, replace endpoint |
| `87cd00b` | Media phase 3 core: folders/tags/focal, replace, bulk delete, usage/audit APIs, admin controls |
| `e42058b` | Content CMS core: entries/revisions, admin editor, public content page, draft/publish |
| `2fc1b34` | Content CMS completion: rich text, revision restore, scheduling, usage sync, sitemap, media hero |
| `7aeefbb` | Admin polish: 20MB uploads, chip tags, focal labels, CKEditor 5 GPL, SEO audit, mobile admin nav, content-media route |
| `7bf0218` | Media upload UX: aligned tag row, chips below, folder creation modal beside the folder select |
| `e835e68` | Media tag row: dedicated row with equal-width input, button, and hint |
| `e835e68` | Content admin table + separate editor routes; expanded CKEditor toolbar and sanitized styles |
| `c617368` | Media admin table: filters, pagination, create/edit routes |
| `af11753` | Media table layout: no nested scroll, responsive columns, always-visible pagination |
| `1b1fbf4` | Content UX + message system: Jalali schedule, RTL editor, translated labels, filters/pagination, save fix, toast/modal |
| `bb414a1` | OTP security phases 1-2: memory state provider, 120s timer/cooldown, IP/mobile changes, admin security settings |
| `1b6c42d` | Admin panel architecture document: 12-section IA, template reuse, RBAC, finance/audit, phases, acceptance |
| `91eacc5` | Admin phase 1 foundation: permission shell, dashboard, agencies, users, protected admin endpoints |
| `6d52c29` | Admin phase 2 opening: products overview, live hotel catalogue table/search/pagination |
| `b845415` | Hotel Lastsecond parity gap analysis added to phase 2 planning |
| `6534bac` | Hotel parity slice 1: content fields, gallery metadata, lifecycle/SEO, admin editor, published filtering |
| `40302e6` | Hotel parity slice 2: public detail, reviews, booking request, JSON-LD, sitemap, owner claim |
| `f86b072` | Hotel parity slice 3: policies, amenity metadata, room commerce fields, review actions, moderation |
| `8936c29` | Hotel parity completion: facet filters, policies, amenities, room commerce fields, review actions, moderation |
| `2d6c8d6` | Phase 3 opening: bookings and finance admin read models |
| `a1fc263` | Phase 3 operations: order detail/cancel, per-currency refunds, payout settlement, refunds/invoices/reconciliations/commissions/ledger admin tables |
| `c0d9a20` | Admin governance: append-only audit, two-person refund/settlement approvals, self-approval denial audit, payout bank evidence, approvals/audit pages |
| `00cd24e` | Phase 4 marketing: admin campaign list/create/activate, localized content, Jalali dates over Gregorian API, responsive table, audit events, desktop/tablet/mobile UI gate |
| `09c568f` | Phase 4 operations: reports, support ticket workspace, notification retry, ad slots/creatives, responsive UI sweep |
| `cd44438` | Architecture: ads endpoint moved to application query/read model, DbContext ratchet test, endpoint DB-access review report |
| `5e06011` | Architecture: all endpoint DbContext access moved to Admin application services/read models; audit writer moved; endpoint ratchet allowlist empty |
| `fb593c9` | Architecture: thin 12-line Program composition root, Configuration/Pipeline/Endpoints folders, middleware/health/audit folders, composition contract tests |
| `7f0cc03` | Phase 5 channel administration: API client create/list/revoke, one-time secret, plans, white-label domain, webhook, audit, responsive UI |
| `f62e672` | Phase 5 supplier integration: offer moderation, approve/reject with audit, supplier.write API scope, responsive admin UI |
| `138632e` | Admin Batch 1: dynamic role-permission matrix, user role assignment, platform base settings, agency detail/documents/contracts, responsive UI |
| `534df2b` | Admin RBAC follow-up: custom roles/role_definitions, permission claims + section middleware, public platform settings wired to header/footer |
| `c554db1` | Batch 2 start: admin hotel creation endpoint, create route, hotel editor create mode, responsive UI |
| `70f0f04` | Batch 2 tours: admin tour list/create/publish, localized content, cover/destination fields, responsive UI |
| `e2fc0af` | Batch 2 completion: flight routes/references/offers admin, visa countries/types, visa application status, product overview/nav live |
| `556bbbb` | Batch 3 booking workflow: reservation confirm/reject with audit, real cancellation reason, order contact update, contract/voucher pages, order history and refunds, responsive FA/EN/AR UI |
| `4074499` | Fix: admin order detail exposes current order contact while the issued contract snapshot stays immutable |
| `ea53d64` | Batch 4 finance: persisted bank/currency/tax/settlement settings, reconciliation runs, CSV exports with report.export, approval history filters, daily revenue/order BI trends, responsive FA/EN/AR UI |
| `be2e60e` | Batch 5 support: priority SLA states, real assignee selection, dispute aggregate/workflow/UI, support quality report, migration, responsive FA/EN/AR UI |
| `32e9348` | Batch 6 hardening: production config guard, JSON readiness checks, generic HTTPS PSP adapter, notification HTTP mode/idempotency, security headers, backup/restore scripts, production checklist, k6 readiness load |
| `ed29210` | Batch 7 customer support portal: owner-scoped ticket list/detail/reply, customer disputes, support notifications, sidebar/nav, responsive FA/EN/AR UI |
| `bbeb89c` | Batch 8 support attachments: private upload/download, 10 MB/type limits, message linking, internal-note isolation, unread counters, deep-link notifications, responsive FA/EN/AR UI |
| `9b41476` | Batch 9 support security: ClamAV scan port, 10/min upload limit, private WebP thumbnails, read receipts, quick replies/auto-refresh, HMAC inbound email-to-ticket, collision-safe ticket numbers |
| `3e9a3d3` | Batch 10 real-time support: SignalR ticket groups/events, cookie-authenticated hub, CORS, inbound email dedup, pending attachment retention, optional ClamAV compose profile |
| `cea1f8e` | Batch 11 provider parity: SignalR Redis backplane with cross-instance test, unique provider message dedup, ClamAV protocol rejection test, HTTP email provider delivery smoke, support load test |

## Batch 12 ? Storefront truthfulness + agency identity (2026-11-19)

| # | Item | Artifact | Evidence |
|---|---|---|---|
| D-B12-01 | Tour lookup by slug | `GetTourProductBySlugQuery` + `/market/v1/products/by-slug/{slug}` | integration assertion |
| D-B12-02 | Real tour detail | `frontend/src/app/[locale]/(public-pages)/tours/[slug]/page.tsx` | FA/EN browser check |
| D-B12-03 | Real visa detail | `frontend/src/app/[locale]/(public-pages)/visa/[slug]/page.tsx` | turkey page browser check |
| D-B12-04 | Real visa application | `features/visa/ui/VisaApplicationForm.tsx` + `submit-visa-application.ts` | VSA application created + confirmation |
| D-B12-05 | Canonical detail links | tour/visa grid + home components | code review |
| D-B12-06 | Agency identity | `views/agent-dashboard/sidebar/sidebar.tsx` + `/api/agency/me` | build + code review |
| D-B12-07 | Gap report | `docs/reports/lastsecond-hani-gap-analysis-2026-11-19.md` | audit record |

## Batch 13 ? Remaining audit gaps (2026-11-19)

| # | Item | Artifact |
|---|---|---|
| D-B13-01 | Flight metasearch | `flights/page.tsx`, `flights/search/page.tsx`, `flights/[route]/page.tsx` |
| D-B13-02 | Tour filters | `features/tours/ui/TourFilters.tsx`, `tours-api.ts` |
| D-B13-03 | Visa filters | `features/visa/ui/VisaFilters.tsx`, `visa-grid/page.tsx` |
| D-B13-04 | Admin edit API/UI | admin catalog endpoints + edit pages/forms |
| D-B13-05 | Visa uploads | `VisaDocumentEndpoints.cs`, form action |
| D-B13-06 | Visa tracking | `TrackVisaApplicationQuery`, `/visa/track-visa` |
| D-B13-07 | RFQ queue/export | admin bookings leads table + BFF CSV route |
| D-B13-08 | Agent identity | `AgencyName` component |
| D-B13-09 | Tour reviews | `getTourReviews` + detail section |
| D-B13-10 | Domain update tests | `AdminEditDomainTests.cs` |

## Batch 12S ? Security Review & Observability (2026-11-19)

| # | Item | Artifact |
|---|---|---|
| D-B12S-01 | Redis rate limiter | `RedisFixedWindowRateLimiter.cs` |
| D-B12S-02 | Limiter config/guard | `RateLimitingOptions`, `ProductionConfigurationGuard` |
| D-B12S-03 | Frontend headers | `frontend/next.config.ts` |
| D-B12S-04 | Regression tests | `HardeningEndpointsTests` |
| D-B12S-05 | Review report | `docs/reports/security-observability-review-2026-11-19.md` |

## Phase 7 ? SEO, Performance & Launch Readiness (2026-11-19)

| # | Item | Artifact |
|---|---|---|
| D-P7-01 | Lighthouse audit | `docs/reports/phase7-seo-performance-audit-2026-11-19.md` |
| D-P7-02 | A11y fixes | home search, footer, date pickers |
| D-P7-03 | Font subsets | `iconsax-subset.woff2`, `tabler-icons-subset.woff2`, `fa-*-subset.woff2` |
| D-P7-04 | Sitemap coverage | `frontend/src/app/sitemap.ts` |
| D-P7-05 | Canonical/hreflang | tour/visa detail and visa listing metadata |
| D-P7-06 | Structured data | `TourDetailStructuredData`, `VisaStructuredData` |
| D-P7-07 | Robots private routes | `frontend/src/app/robots.ts` |

| D-P7-08 | Sitemap/robots revalidation | `frontend/src/app/sitemap.ts`, `robots.ts` |
| D-P7-09 | Lighthouse budgets | `scripts/lighthouse-audit.ps1` |
| D-P7-10 | Hero paint optimization | `_home-08.scss` |

| D-P7-11 | Conditional hero tabs | `homeServiceOne.tsx` |
| D-P7-12 | Tab switching check | FA browser verification |

## Page Composition Phase 1 foundation (2026-11-20)

| # | Item | Artifact |
|---|---|---|
| D-PC-01 | Composition contracts/service | `PageCompositionContracts`, `PageCompositionService` |
| D-PC-02 | Composition endpoints | `/market/v1/pages/{pageKey}`, `/internal/v1/page-compositions` |
| D-PC-03 | Admin pages list | `/admin/content/pages` |
| D-PC-04 | Page builder shell | `/admin/content/pages/[pageKey]` |
| D-PC-05 | Home composition integration | `page.tsx` published composition fallback |

| D-PC-06 | Generic composition section renderer | `CompositionSection` |
| D-PC-07 | Composed hero title | `homeServiceOne` + composition prop |
