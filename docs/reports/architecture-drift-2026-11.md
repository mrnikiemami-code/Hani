# Architecture Drift Report — 2026-11

> گزارش پس از **TC-001A** و ادامه زیرساخت بک‌اند (Observability / Cache / Tenant / Idempotency / Docker).

## وضعیت کلی

| متریک | مقدار | هدف | وضعیت |
|---|---|---|---|
| Architecture violations | 0 | 0 | ✅ |
| Cross-module references | 0 | 0 | ✅ |
| Build warnings | 0 | 0 | ✅ |
| Banned API usages | 0 | 0 | ✅ |
| Active waivers | 0 | ≤ 2/ماژول | ✅ |
| License violations | 0 | 0 | ✅ |
| Unit tests | 22 passed | — | ✅ |
| Architecture tests | 13 passed | — | ✅ |
| Locked restore | ✅ | ✅ | ✅ |
| Format check | ✅ | ✅ | ✅ |

## زیرساخت فعال

| قابلیت | وضعیت | جزئیات |
|---|---|---|
| Docker Compose | ✅ | Postgres / Redis / RabbitMQ / Seq / OTel Collector |
| Serilog | ✅ | Console + Seq، Toggle |
| OpenTelemetry | ✅ | AspNetCore + HttpClient + OTLP، Toggle |
| Cache | ✅ | Memory / Redis / None + `ICacheService` |
| Tenant | ✅ | `ICurrentTenant` + `X-Agency-Id` middleware |
| Idempotency | ✅ | `IIdempotencyStore` + InMemory + Behavior |
| Messaging | ✅ | MassTransit 8.5.12 + InMemory/RabbitMQ/Postgres + Outbox |
| Migrations | ✅ | `InitialSupply` + Outbox/Inbox + `InitialCatalog` |
| Catalog | ✅ | TourProduct + Translation + Destination |
| Identity | ✅ | Agency + ApiClient + Secret Hashing |
| Error codes | ✅ | `HANI-*` در Validation و ProblemDetails |
| Banned APIs | ✅ | RS0030 تأییدشده |

## ماژول‌ها

| ماژول | ساختار ۴ لایه | ArchitectureTests | وضعیت |
|---|---|---|---|
| Supply | ✅ | ✅ | نمونه پایلوت |
| Catalog | ✅ | ✅ | TourProduct + Destination |
| Identity | ✅ | ✅ | Agency + ApiClient |

## گیت‌های فعال

- `Directory.Packages.props` — نسخه‌های قفل‌شده (MediatR 12.5.0، MassTransit 8.5.12)
- `Directory.Build.props` — Central Package Management + lock files
- `BannedSymbols.txt` — RS0030 برای Application/Presentation
- `Hani.ArchitectureTests` — مرز ماژول، لایه، CQRS، Validator
- `scripts/verify.ps1` — build + test + format + vulnerability
- `.github/workflows/ci.yml` — همین گیت‌ها در CI
- `.github/CODEOWNERS` + PR template

## ریسک‌ها / اقدام بعدی

1. `IIdempotencyStore` فعلی InMemory است؛ برای پرداخت باید Postgres/Redis پایدار اضافه شود.
2. `Outbox.Enabled` پیش‌فرض `false` است؛ برای تولید باید همراه با RabbitMQ/Postgres فعال شود.
3. `dotnet new hani-module` هنوز ساخته نشده؛ `scripts/new-module.ps1` جایگزین است.
4. Frontend scaffold نشده؛ ESLint boundaries در فاز فرانت.
5. Integration tests (Testcontainers) هنوز فعال نیستند.

## تأیید

- `dotnet build Hani.slnx -warnaserror` → 0 warning
- `dotnet test Hani.slnx` → 21 passed
- `dotnet format --verify-no-changes` → clean
- `dotnet list package --vulnerable` → none
