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
| Unit Tests | ۲۲ passed |
| Architecture Tests | ۱۳ passed |
| Total | **۳۵ passed** |
| Migrations | Supply + Catalog + Identity |
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
| Localization | کد خطا | resx FA/EN/AR |
| Supplier API | Create/Get | Upsert + Availability + Moderation |
| AgencyOffer | Create/Get | Update/Delete |
| Identity | Agency + ApiClient | User + Role + JWT |
| Catalog | TourProduct + Destination | Hotel + Attraction + Visa |
| Tenant | Context + Middleware | تست ایزولاسیون DB |

## ۶. Commitهای کد

| Commit | موضوع |
|---|---|
| `825ed39` | Governance bootstrap |
| `98ab18d` | Observability / Cache / Tenant / Idempotency / Docker |
| `ab3b2e7` | MassTransit + Outbox |
| `9fa5a3e` | Catalog |
| `af5b415` | Identity |
| `7df2265` | Phase roadmap + status + tasks |
