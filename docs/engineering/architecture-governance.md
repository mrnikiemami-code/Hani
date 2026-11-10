# حاکمیت معماری TravelCore (Architecture Governance)

> **هدف:** تضمین این‌که همه ماژول‌ها یکدست بمانند و هیچ تغییر یا تسکی — توسط انسان یا AI — از معماری قفل‌شده تخطی نکند.
>
> **اصل بنیادین:** «قول نمی‌دهم تخطی نکنم؛ کاری می‌کنم که تخطی **قابل کامپایل، قابل تست و قابل ادغام نباشد**.»
> هر قاعده‌ای که اجرایی/قابل‌سنجش نباشد، فقط یک توصیه است، نه حاکمیت.

---

## ۱. اصول

1. **Architecture as Code:** قواعد در تست، analyzer، CI و template کدگذاری می‌شوند.
2. **One Paved Road:** هر ماژول از یک قالب واحد متولد می‌شود؛ مسیر دیگری وجود ندارد.
3. **Fail Fast:** نقض معماری در PR باید build/test را شکست دهد، نه در review کشف شود.
4. **Explicit Exceptions:** استثنا فقط با ADR/waiver زمان‌دار و مالک مشخص.
5. **No Silent Upgrades:** نسخه پکیج‌ها و لایسنس‌ها قفل‌اند.
6. **Measure Uniformity:** یکدستی با متریک ماهانه سنجیده می‌شود، نه با حس.
7. **Small Tasks:** هر PR فقط یک ماژول/یک قابلیت کوچک را تغییر می‌دهد.

---

## ۲. مدل حاکمیت شش‌لایه

```
Layer 0 — تصمیم و سند       ADR، PLAN، C4، Module Template
Layer 1 — کامپایلر           Project References، Central Packages، SDK Pin
Layer 2 — تحلیل ایستا        Roslyn Analyzers، Banned APIs، dotnet format
Layer 3 — تست معماری         NetArchTest، Naming Tests، CQRS Tests
Layer 4 — قرارداد و داده     OpenAPI Diff، Event Schema، Migration Check
Layer 5 — زمان اجرا          Health، Metrics، SLO، Drift Report
Layer 6 — انسان              CODEOWNERS، PR Template، ARB، Waiver
```

اگر یک قاعده از Layer 1 تا 4 قابل اجرا نباشد، باید در Layer 6 با checklist و در Layer 5 با متریک پوشش داده شود.

---

## ۳. قواعد قفل‌شده و تغییر آن‌ها

### ۳.۱. لیست قفل

- `TourProduct` مشترک + `AgencyOffer` مستقل
- سه سطح API جدای Supplier / Channel / Marketplace
- ASP.NET Core 10 + Minimal API
- Next.js 16 + React 19
- Modular Monolith + Clean Architecture
- PostgreSQL + Schema per Module
- MediatR **12.5.0**
- MassTransit **8.5.12**
- FA/EN/AR
- Merchant = آژانس
- Standard / Professional
- Flights ماژول مستقل

### ۳.۲. تغییر

هر تغییر در لیست قفل فقط از این مسیر عبور می‌کند:

```
Proposal → ADR (Proposed) → ARB Approval → ADR (Accepted) → Implementation
```

- ADR باید شامل: زمینه، تصمیم، پیامدها، جایگزین‌ها، برنامه مهاجرت باشد.
- بدون ADR Accepted، هیچ PR مربوط به تغییر معماری merge نمی‌شود.
- ADRهای Superseded حذف نمی‌شوند؛ تاریخ‌دار می‌مانند.

### ۳.۳. استثنا (Waiver)

```markdown
# ARCH-WAIVER-0007
- Scope: TravelCore.Modules.Supply.Application
- Rule: No DbContext in Application
- Reason: مهاجرت موقت برای گزارش قدیمی
- Owner: @supply-lead
- Expires: 2026-12-31
- Remediation: TC-123
```

- Waiver بدون تاریخ انقضا پذیرفته نمی‌شود.
- CI وجود waiver را warning می‌کند؛ پس از انقضا build را fail می‌کند.
- حداکثر ۲ waiver فعال در هر ماژول.

---

## ۴. ابزارها

| لایه | ابزار | لایسنس |
|---|---|---|
| Project graph | `dotnet` references + `dotnet list reference` | MIT |
| Static analysis | Microsoft.CodeAnalysis.NetAnalyzers | MIT |
| Banned APIs | Microsoft.CodeAnalysis.BannedApiAnalyzers | MIT |
| Formatting | `dotnet format` | MIT |
| Architecture tests | NetArchTest.Rules | MIT |
| Test | xUnit + Shouldly | Apache-2.0 / BSD |
| Integration | Testcontainers | MIT |
| OpenAPI lint | Spectral | Apache-2.0 |
| OpenAPI diff | oasdiff | Apache-2.0 |
| Migration check | `dotnet ef migrations has-pending-model-changes` | MIT |
| Frontend boundaries | `eslint-plugin-boundaries` | MIT |
| Frontend graph | `dependency-cruiser` | MIT |
| Bundle budget | `size-limit` | MIT |
| SEO/Perf | Lighthouse CI | Apache-2.0 |
| Security | `dotnet list package --vulnerable`, `npm audit`, Trivy | MIT/Apache |
| License audit | `nuget-license` + custom allowlist | MIT |

> هیچ ابزار تجاری/لایسنس‌دار بدون ADR اضافه نمی‌شود.

---

## ۵. قواعد وابستگی

### ۵.۱. مجاز

```
Domain          → BuildingBlocks.Domain
Application     → Domain + BuildingBlocks.Application + Contracts
Infrastructure  → Application + BuildingBlocks.Infrastructure
Presentation    → Application + BuildingBlocks.AspNetCore
Api Host        → Presentation + Infrastructure (Composition Root)
Tests           → هر پروژه‌ای که تست می‌کند
```

### ۵.۲. ممنوع

- `Domain` → EF Core, ASP.NET, MassTransit, Redis, HttpClient, MediatR
- `Application` → Infrastructure, DbContext, HttpClient, MassTransit, Redis
- `Presentation` → DbContext, Repository, Domain Event Dispatch
- ماژول A → `Domain`/`Application`/`Infrastructure` ماژول B
- `BuildingBlocks` → هیچ ماژول دامنه‌ای
- `Contracts` → هیچ پروژه‌ای جز BuildingBlocks.Domain (ترجیحاً صفر وابستگی)

### ۵.۳. ارتباط بین ماژول‌ها

| نیاز | راه مجاز |
|---|---|
| خواندن داده ماژول دیگر | Read Model / Projection / Query Contract |
| تغییر داده ماژول دیگر | Integration Event / Command Contract |
| تراکنش مشترک | ❌ ممنوع؛ Saga/Outbox |
| دسترسی مستقیم DB | ❌ ممنوع |

---

## ۶. یکدستی ماژول‌ها

### ۶.۱. قالب اجباری

هر ماژول **دقیقاً** این ساختار را دارد:

```
Modules/{Module}/
├─ TravelCore.Modules.{Module}.Domain/
│  ├─ {Aggregate}/
│  ├─ Events/
│  ├─ ValueObjects/
│  └─ Abstractions/
├─ TravelCore.Modules.{Module}.Application/
│  ├─ Abstractions/
│  ├─ Commands/{UseCase}/
│  │  ├─ {UseCase}Command.cs
│  │  ├─ {UseCase}CommandHandler.cs
│  │  ├─ {UseCase}CommandValidator.cs
│  │  └─ {UseCase}Result.cs
│  ├─ Queries/{UseCase}/
│  │  ├─ {UseCase}Query.cs
│  │  ├─ {UseCase}QueryHandler.cs
│  │  ├─ {UseCase}QueryValidator.cs
│  │  └─ {UseCase}Dto.cs
│  ├─ Common/
│  └─ DependencyInjection.cs
├─ TravelCore.Modules.{Module}.Infrastructure/
│  ├─ Persistence/
│  │  ├─ {Module}DbContext.cs
│  │  ├─ Configurations/
│  │  └─ Migrations/
│  ├─ Repositories/
│  ├─ ReadServices/
│  └─ DependencyInjection.cs
└─ TravelCore.Modules.{Module}.Presentation/
   ├─ Supplier/
   ├─ Channel/
   ├─ Marketplace/
   └─ DependencyInjection.cs
```

### ۶.۲. قواعد فایل

- یک نوع اصلی per file؛ نام فایل = نام نوع.
- `internal sealed` پیش‌فرض برای Handler/Validator/Repository.
- `public` فقط برای Contract/Port/Endpoint.
- پوشه `Common` فقط برای DTO/Mapping مشترک همان ماژول؛ نه Helper عمومی.
- ممنوع: `Helper`, `Manager`, `Utils`, `Service` عمومی، `BaseController`.

### ۶.۳. قالب‌ساز

- `dotnet new travelcore-module -n {Module}` (در فاز ۰ ساخته می‌شود).
- اسکریپت `scripts/new-module.ps1` همان ساختار را می‌سازد.
- ماژول جدید بدون template پذیرفته نمی‌شود.
- تست `ModuleTemplateTests` بررسی می‌کند همه ماژول‌ها ساختار یکسان دارند.

---

## ۷. تست‌های معماری (اجرایی)

نمونه‌ها در `docs/engineering/architecture-tests.md`. حداقل تست‌ها:

| # | تست | نتیجه نقض |
|---|---|---|
| A1 | Domain به EF/ASP.NET/MassTransit/Redis وابسته نباشد | build fail |
| A2 | Application به Infrastructure و DbContext وابسته نباشد | build fail |
| A3 | Presentation به DbContext/Repository وابسته نباشد | build fail |
| A4 | هیچ ماژولی به ماژول دیگر reference نداشته باشد | build fail |
| A5 | هر Command دقیقاً یک Handler داشته باشد | build fail |
| A6 | هر Command/Query یک Validator داشته باشد | build fail |
| A7 | Handlerها `internal sealed` باشند | build fail |
| A8 | Endpointها فقط `ISender` را صدا بزنند | build fail |
| A9 | هیچ نوع Public غیرمجاز در Domain نباشد | review/test |
| A10 | نام‌گذاری فایل/نوع/جدول مطابق قاعده باشد | build fail |

---

## ۸. Analyzerها و Banned APIs

### ۸.۱. BannedSymbols (در Application/Presentation)

```
T:System.DateTime;Use IDateTimeProvider
M:System.DateTime.get_Now;Use IDateTimeProvider
M:System.DateTime.get_UtcNow;Use IDateTimeProvider
M:System.Guid.NewGuid;Use IIdGenerator
T:System.Threading.Thread;Do not block request threads
M:System.Threading.Tasks.Task.Run``1(``0);Do not offload request work
T:Microsoft.EntityFrameworkCore.DbContext;Do not use DbContext here
T:System.Net.Http.HttpClient;Use an abstraction/port
T:System.Console;Use ILogger
```

### ۸.۲. قواعد تحلیل

- `<TreatWarningsAsErrors>true</TreatWarningsAsErrors>` در CI.
- `EnforceCodeStyleInBuild=true`.
- `AnalysisLevel=latest-recommended`.
- `dotnet format --verify-no-changes`.
- هشدارهای جدید بدون waiver مجاز نیستند.

---

## ۹. CI Quality Gates (اجباری)

| # | Gate | ابزار | شکست یعنی |
|---|---|---|---|
| G1 | Restore قفل‌شده | `dotnet restore --locked-mode` | پکیج خارج از lock |
| G2 | Build بدون warning | `dotnet build -warnaserror` | نقض analyzer |
| G3 | Format | `dotnet format --verify-no-changes` | سبک ناهمگون |
| G4 | Unit + Architecture Tests | `dotnet test` | نقض مرز/نام‌گذاری |
| G5 | Integration Tests | Testcontainers | نقض زیرساخت |
| G6 | Migration Check | `dotnet ef migrations has-pending-model-changes` | مدل بدون migration |
| G7 | OpenAPI Lint + Diff | Spectral + oasdiff | تغییر شکستنی API |
| G8 | Frontend Lint/Type/Boundaries | ESLint + tsc + boundaries | نقض مرز فرانت |
| G9 | Bundle Budget | size-limit | سنگین‌شدن JS |
| G10 | SEO/Perf | Lighthouse CI | افت CWV/SEO |
| G11 | Security | vulnerable + audit + Trivy | آسیب‌پذیری |
| G12 | License | allowlist | پکیج غیرمجاز |

**هیچ Gate اختیاری نیست.** `main` فقط با همه Gateهای سبز merge می‌شود.

---

## ۱۰. حاکمیت فرانت‌اند

- `strict: true` در TypeScript.
- `eslint-plugin-boundaries`:
  - `features/*` فقط از `lib/*` و `components/*` عمومی استفاده کند.
  - `app/*` فقط از `features/*`.
  - هیچ feature به feature دیگر import نکند.
- `dependency-cruiser` برای cycle detection.
- Server Components پیش‌فرض؛ `use client` فقط با دلیل.
- `messages/{fa,en,ar}.json` منبع متن؛ متن hard-code ممنوع.
- `size-limit` برای routeهای اصلی.
- `Lighthouse CI` برای SEO/Performance/A11y.

---

## ۱۱. حاکمیت دیتابیس

- Schema per module؛ هر ماژول Migration مستقل.
- `migrations history` در همان Schema.
- ممنوع: Join بین Schemaها، Foreign Key بین Schemaها، Raw SQL بدون پارامتر.
- نام‌گذاری: `snake_case`، جدول جمع، `ix_`/`ux_`/`fk_`.
- پول: `bigint` minor units + `char(3)`.
- زمان: `timestamptz`.
- شناسه: UUIDv7.
- `tenant_id` در جدول‌های آژانس‌محور + تست ایزولاسیون.
- هر PR که مدل را تغییر می‌دهد باید Migration + تست Integration داشته باشد.

---

## ۱۲. حاکمیت API و Event

### API
- Contract-first: OpenAPI در `docs/api` قبل از پیاده‌سازی.
- `/v1`؛ شکستن قرارداد فقط `/v2`.
- ProblemDetails + `code` + `traceId`.
- Idempotency برای POST مالی.
- DTO جدا از Domain Entity.
- هر Endpoint: `.WithName`, `.WithTags`, `.ProducesProblem`, auth policy.
- Rate limit per client/tenant.
- `oasdiff` تغییر شکستنی را fail می‌کند.

### Event
- فقط در `Contracts`.
- `record` immutable + نسخه در نام: `travelcore.{module}.{event}.v1`.
- انتشار فقط با Outbox.
- Consumerها Inbox + idempotent.
- Schema event در تست contract بررسی می‌شود.

---

## ۱۳. حاکمیت لاگ و تلمتری

- `ILogger<T>` فقط در Application/Infrastructure؛ Domain لاگ نمی‌کند.
- `Console.WriteLine` ممنوع.
- PII در لاگ ممنوع؛ Redaction اجباری.
- هر ماژول `Telemetry` با `ActivitySource` و `Meter` دارد.
- `TraceId`/`SpanId`/`TenantId`/`AgencyId`/`Module` در همه لاگ‌ها.
- Audit Log جدا و همیشه روشن.
- Toggleها فقط از `ObservabilityOptions`.

---

## ۱۴. بازبینی انسانی

- `CODEOWNERS` برای هر ماژول.
- PR Template با checklist معماری.
- هر PR حداکثر ۴۰۰ خط تغییر مفید؛ بیشتر → شکستن.
- حداقل یک reviewer از تیم ماژول + یک reviewer معماری برای تغییرات Contracts/BuildingBlocks.
- ARB هفتگی ۳۰ دقیقه: ADRهای جدید، waiverها، drift report.

---

## ۱۵. Definition of Done (معماری)

- [ ] فقط در مرز ماژول تغییر کرده
- [ ] Project reference جدید غیرمجاز ندارد
- [ ] ArchitectureTests سبز
- [ ] Command/Query + Handler + Validator کامل
- [ ] Endpoint نازک است
- [ ] Migration + Integration Test (در صورت تغییر داده)
- [ ] OpenAPI/Event contract به‌روز
- [ ] لاگ ساختاریافته + Telemetry
- [ ] Idempotency (اگر POST مالی)
- [ ] بدون PII/Secret
- [ ] مستندات/ADR به‌روز
- [ ] `scripts/verify.ps1` سبز

---

## ۱۶. گزارش انحراف (Drift Report)

ماهانه تولید می‌شود:

| متریک | هدف |
|---|---|
| Architecture violations | ۰ |
| Cross-module references | ۰ |
| Modules matching template | ۱۰۰٪ |
| Banned API usages | ۰ |
| Active waivers | ≤ ۲ به‌ازای هر ماژول |
| Build warnings | ۰ |
| License violations | ۰ |
| Coverage (Domain/Application) | ≥ ۸۰٪ |
| API breaking changes بدون v2 | ۰ |
| Outbox lag / SLO | مطابق NFR |

خروجی: یک فایل `docs/reports/architecture-drift-YYYY-MM.md` + نمودار وابستگی.

---

## ۱۷. من (AI Agent) چطور کار می‌کنم

قبل از هر تسک:

1. `PLAN.md` + ADR مرتبط + `module-template.md` را می‌خوانم.
2. فقط داخل مرز ماژول مربوطه تغییر می‌دهم.
3. از template استفاده می‌کنم؛ ساختار جدید اختراع نمی‌کنم.
4. `scripts/verify.ps1` را اجرا می‌کنم (build + format + tests + architecture).
5. اگر قاعده‌ای مانع شد:
   - **متوقف می‌شوم**،
   - ADR/Waiver پیشنهاد می‌دهم،
   - بدون تأیید شما bypass نمی‌کنم.
6. هیچ پکیج/نسخه/فریم‌ورکی را بدون بررسی لایسنس اضافه نمی‌کنم.
7. PR کوچک + commit Conventional + به‌روزرسانی مستندات.
8. بعد از هر تسک، commit و push به `main`/branch.

**تعهد:** اگر تست معماری شکست، آن را دور نمی‌زنم؛ یا کد را اصلاح می‌کنم یا ADR می‌نویسم و از شما تأیید می‌گیرم.

---

## ۱۸. سؤالاتی که باید تأیید کنی

1. **سخت‌گیری:** از روز اول build-breaking باشد؟ (پیشنهاد: بله برای ArchitectureTests و Banned APIs)
2. **Waiver:** حداکثر ۲ waiver فعال و تاریخ‌دار کافی است؟ (پیشنهاد: بله)
3. **CODEOWNERS:** تیم‌ها/افراد مالک هر ماژول را می‌دهی؟
4. **ARB:** تصمیم‌گیر نهایی ADR چه کسی است؟ (پیشنهاد: تو + معمار)
5. **قالب‌ساز:** `dotnet new travelcore-module` ساخته شود؟ (پیشنهاد: بله)
6. **پوشش تست:** حداقل ۸۰٪ برای Domain/Application کافی است؟ (پیشنهاد: بله)
7. **Frontend boundaries:** ESLint boundaries + dependency-cruiser هر دو؟ (پیشنهاد: بله)
8. **License allowlist:** فقط Apache/MIT/BSD/PostgreSQL؟ (پیشنهاد: بله)
9. **PR اندازه:** حداکثر ۴۰۰ خط مفید؟ (پیشنهاد: بله)
10. **Drift report:** ماهانه کافی است یا دو هفته‌ای؟ (پیشنهاد: ماهانه + هشدار CI)

---

## ۱۹. جمع‌بندی

یکدستی با «قرارداد» به دست نمی‌آید؛ با **قالب واحد + کامپایلر + تست + CI + بازبینی + گزارش** به دست می‌آید.

اگر این مدل تأیید شود، اولین تسک فاز ۰ این است:

> **TC-001A — Architecture Governance Bootstrap:** ساخت `Directory.Packages.props`، `BannedSymbols`، `ArchitectureTests`، `scripts/verify.ps1`، `CODEOWNERS`، `PR Template` و `dotnet new travelcore-module`.

تا این زیرساخت آماده نشود، هیچ کد دامنه‌ای نوشته نمی‌شود.
