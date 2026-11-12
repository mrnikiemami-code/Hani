# Hani — STATUS (وضعیت زنده)

> **تاریخ:** ۲۱ آبان ۱۴۰۵
> **فاز فعال:** Baseline Gate 1 — Tour Experience & Pricing
> **آخرین commit کد:** `3a8992b`
> **وضعیت Gate:** Gate 1 — In Progress
> **Baseline:** [`BASELINE.md`](BASELINE.md) + [`baseline.json`](baseline.json)
> **گزارش Gate:** [`../reports/phase-1-gate.md`](../reports/phase-1-gate.md)
> **دفتر کارهای انجام‌شده:** [`DONE.md`](DONE.md)

---

## ۱. نمای کلی فازها

| فاز | عنوان | وضعیت | پیشرفت |
|---|---|---|---|
| 0 | Foundation & Governance | ✅ Done | 100% |
| 1 | Core Domain: Catalog + Identity + Supply | ✅ Gate Passed | 100% |
| 2 | Marketplace Read + Booking | 🚧 Baseline Gate 1 | ~85% |
| 3 | Channel + Billing + Settlement | ⏳ Gate 7 | 0% |
| 4 | Flights | ⏳ Gate 5 | 0% |
| 5 | Content + Hotels + Visa + SEO/i18n | ⏳ Gate 1/5/6 | 0% |
| 6 | Hardening & Scale | ⏳ Gate 8 | 0% |

> از این لحظه، برنامه‌ریزی بر اساس `BASELINE.md` و Gateهای ۱ تا ۸ است. Phase 2 فعلی فقط تا زمان تکمیل Gate 1 به‌عنوان وضعیت تاریخی باقی می‌ماند.

---

## ۲. Phase 0 — Done ✅

| تحویل | وضعیت | شاهد |
|---|---|---|
| Solution + BuildingBlocks | ✅ | `Hani.slnx` |
| ArchitectureTests | ✅ | ۱۳ تست |
| BannedSymbols | ✅ | RS0030 |
| Central Packages + lock | ✅ | `Directory.Packages.props` |
| Docker Compose | ✅ | `deploy/docker` |
| Serilog + OTel | ✅ | `Observability` |
| Cache | ✅ | `ICacheService` |
| Tenant | ✅ | `TenantMiddleware` |
| Idempotency | ⚠️ | InMemory؛ پایدار نشده |
| MassTransit + Outbox | ⚠️ | wired؛ Outbox پیش‌فرض خاموش |
| CI + CODEOWNERS | ✅ | `.github` |

---

## ۳. Phase 1 — Done ✅ (Gate Passed)

### انجام‌شده

| مورد | جزئیات | commit |
|---|---|---|
| Catalog Domain | TourProduct + Translation + Destination | `9fa5a3e` |
| Catalog API | Create / Publish / Get | `9fa5a3e` |
| Catalog Migration | `InitialCatalog` | `9fa5a3e` |
| Identity Domain | Agency + ApiClient | `af5b415` |
| Identity API | Create Agency / Create ApiClient / Get Agency | `af5b415` |
| Identity Security | Secret generation + SHA-256 hash | `af5b415` |
| Identity Migration | `InitialIdentity` | `af5b415` |
| Supply | AgencyOffer Create/Get | `825ed39` |
| Supply Migration | `InitialSupply` + Outbox | `ab3b2e7` |
| Departure Domain | TourDeparture + Price + Capacity + Concurrency | `56a9243` |
| Departure API | Create/List/Availability/Price | `56a9243` |
| Departure Migration | `AddTourDepartures` | `56a9243` |
| Supplier Upsert | `PUT /offers/{externalId}` + Idempotency | `d4b9465` |
| Moderation | Submit / Approve / Reject | `d4b9465` |
| Archive Offer | `DELETE /offers/{id}` | `d4b9465` |
| API Key Auth | `X-Api-Key` + `X-Api-Secret` + scope | `d4b9465` |
| Tenant Isolation | claim + 401/404 | `d4b9465` |
| Localized Errors | عنوان FA/EN/AR + code | `d4b9465` |
| Destination API | `POST /internal/v1/destinations` | `d4b9465` |
| Offer Migration | `AddOfferLifecycle` | `d4b9465` |
| Gate Demo | `scripts/demo-phase1.ps1` | `d4b9465` |
| Documentation | XML summary + module README + test | `8bc804c` |
| Marketplace Search | Product search + min price + offer count | `17b6415` |
| Marketplace Compare | Compare approved offers + agency names | `17b6415` |
| Booking Quote | pricing + 15m TTL | `422b06d` |
| Booking Hold | atomic reserve + idempotent + release | `422b06d` |
| Booking Migration | InitialBooking | `422b06d` |
| Read Contracts | Catalog / Supply / Identity read services | `17b6415` |
| Localization config | زبان‌ها و عنوان خطاها از `Localization` در appsettings؛ بدون hard-code؛ `LocalizationHardcodeTests` | `5b956d3` / `783cd59` |
| ID Generator | `IIdGenerator` + `Uuid7IdGenerator`؛ حذف `Guid.*` مستقیم از دامنه/کاربرد | `5b956d3` |
| ProblemDetails | خروجی خطای مرکزی RFC 7807 + `X-Correlation-Id` + `traceId` | `3b4c68e` |
| Order + Contract | تبدیل Hold به Order + Contract immutable + مسافران/خطوط | `f43339e` |
| Payments | PaymentIntent + Gateway Adapter + MerchantScope=Hani | `dc76539` |
| Payment Webhook | HMAC verify + dedupe + Order.Paid | `7b85652` |
| Settlement | Commission Rule + CommissionEntry + Double-entry Ledger | `0dd6fbe` |
| Pricing architecture | ADR-0024: چندارزی + VAT/Duty + BookingMode + تفکیک MoR | docs only |
| Lastsecond gap analysis | گزارش بررسی صفحات و اولویت‌بندی شکاف‌ها | `docs/reports/lastsecond-gap-analysis-2026-11-12.md` |
| Tour Content Model | Itinerary/Meals/Services/Policies/RequiredItems چندزبانه (GAP-01) | این تغییر |
| Agent policy | `AGENTS.md` + Cursor rule + PR/DoD | AGENTS.md |

### خارج از Gate (به فاز بعد منتقل شد)

| مورد | فاز مقصد |
|---|---|
| User + Role + JWT | Phase 2/3 |
| Hotel / Attraction / Visa | Phase 5 |
| ترجمه per-code با resx کامل | Phase 5 |
| Postgres Idempotency پایدار | Phase 2 |
| Outbox فعال + Consumer | Phase 2 |

---

## ۴. APIهای موجود

| متد | مسیر | وضعیت |
|---|---|---|
| POST | `/internal/v1/agencies` | ✅ |
| GET | `/internal/v1/agencies/{id}` | ✅ |
| POST | `/internal/v1/agencies/{id}/api-clients` | ✅ |
| POST | `/internal/v1/destinations` | ✅ |
| POST | `/internal/v1/products` | ✅ |
| POST | `/internal/v1/products/{id}/publish` | ✅ |
| GET | `/market/v1/products/{id}` | ✅ |
| POST | `/supplier/v1/offers` | ✅ |
| PUT | `/supplier/v1/offers/{externalId}` | ✅ (Idempotent) |
| GET | `/supplier/v1/offers/{id}` | ✅ |
| POST | `/supplier/v1/offers/{id}/submit` | ✅ |
| DELETE | `/supplier/v1/offers/{id}` | ✅ (Archive) |
| POST | `/internal/v1/offers/{id}/approve` | ✅ |
| POST | `/internal/v1/offers/{id}/reject` | ✅ |
| POST | `/supplier/v1/offers/{id}/departures` | ✅ |
| GET | `/supplier/v1/offers/{id}/departures` | ✅ |
| PATCH | `/supplier/v1/departures/{id}/availability` | ✅ |
| PUT | `/supplier/v1/departures/{id}/prices` | ✅ |
| POST | `/market/v1/orders` | ✅ (Idempotent) |
| GET | `/market/v1/orders/{id}` | ✅ |
| GET | `/market/v1/orders/{id}/contract` | ✅ |
| POST | `/market/v1/payments/intents` | ✅ (Idempotent) |
| GET | `/market/v1/payments/intents/{id}` | ✅ |
| POST | `/market/v1/payments/webhook/{provider}` | ✅ (HMAC) |
| POST | `/internal/v1/settlements/commission-rules` | ✅ |
| GET | `/internal/v1/settlements/commissions/{orderId}` | ✅ |
| GET | `/internal/v1/settlements/ledger/{transactionId}` | ✅ |
| GET | `/health` | ✅ |

> Supplier API با `X-Api-Key` + `X-Api-Secret` و scope `supplier.write` محافظت می‌شود.

---

## ۵. کیفیت

| شاخص | مقدار |
|---|---|
| Build | ۰ warning / ۰ error |
| Unit Tests | ۸۸ passed |
| Architecture Tests | ۳۳ passed |
| Total | **۱۲۱ passed** |
| Migrations | Supply (۳) / Catalog (۲) / Identity (۱) / Booking (۲) / Payments (۲) / Settlement (۱) |
| Format | clean |
| Vulnerable Packages | none |
| API Health | Healthy |

---

## ۶. تسک فعال / بعدی

**تسک فعال:** Gate 1 — Tour Experience & Pricing
**GAPهای Gate 1:** GAP-01 (Tour Content)، GAP-02 (Accommodation)، GAP-03 (Flight)، GAP-07 (Multi-currency)، GAP-08 (VAT/Duty)
**Baseline:** ۳۴ GAP ثبت‌شده؛ ۰ P0 باز در Gateهای قبلی

### ۵ تسک اول Baseline Gate 1

| ترتیب | تسک | GAP | خروجی |
|---|---|---|---|
| 1 | Tour Content Model | GAP-01 | برنامه سفر/خدمات/قوانین |
| 2 | Accommodation + Flight Options | GAP-02/03 | چند هتل/اتاق/MealPlan/پرواز |
| 3 | PriceComponent + TaxStatus | GAP-07/08 | مدل قیمت چندارزی/مالیاتی |
| 4 | Quote/Order/Contract Snapshot | GAP-07/08 | snapshot چندارزی |
| 5 | PaymentObligation + Commission/Ledger | GAP-07/08 | پرداخت/کمیسیون چندارزی |

---

## ۷. Phase 1 Gate

- [x] Agency → ApiClient → Product → Offer → Publish → Query (دمو)
- [x] API Key اجباری روی Supplier API
- [x] Tenant isolation test
- [x] Departure + Price + Capacity (`56a9243`)
- [x] Supplier upsert idempotent
- [x] Moderation approve/reject
- [x] خطاهای کددار + عنوان محلی FA/EN/AR
- [x] `scripts/verify.ps1` سبز
- [x] STATUS.md و TASKS.md به‌روز

**نتیجه:** ✅ **PASSED** — گزارش: [`../reports/phase-1-gate.md`](../reports/phase-1-gate.md)

---

## ۸. Commit Log (این مرحله)

| commit | موضوع |
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
