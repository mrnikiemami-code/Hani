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
| D-92 | Trust, Agency & UGC | Onboarding/panel/trust + reviews/claims/media + `AddTrustAgencyAndEngagement` | این تغییر |

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
| Unit Tests | ۱۰۷ passed |
| Architecture Tests | ۳۴ passed |
| Total | **۱۴۱ passed** |
| Migrations | Supply + Catalog + Identity + Booking + Payments + Settlement |
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
| Catalog | TourProduct + Destination | Hotel + Attraction + Visa |
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
| `7df2265` | Phase roadmap + status + tasks |
