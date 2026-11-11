# Hani — STATUS (وضعیت زنده)

> **تاریخ:** ۲۰ آبان ۱۴۰۵
> **فاز فعال:** Phase 2 — Marketplace Read + Booking
> **آخرین commit کد:** `5b956d3`
> **وضعیت Gate:** Phase 2 — In Progress
> **گزارش Gate:** [`../reports/phase-1-gate.md`](../reports/phase-1-gate.md)
> **دفتر کارهای انجام‌شده:** [`DONE.md`](DONE.md)

---

## ۱. نمای کلی فازها

| فاز | عنوان | وضعیت | پیشرفت |
|---|---|---|---|
| 0 | Foundation & Governance | ✅ Done | 100% |
| 1 | Core Domain: Catalog + Identity + Supply | ✅ Gate Passed | 100% |
| 2 | Marketplace Read + Booking | 🚧 In Progress | ~35% |
| 3 | Channel + Billing + Settlement | ⏳ Planned | 0% |
| 4 | Flights | ⏳ Planned | 0% |
| 5 | Content + Hotels + Visa + SEO/i18n | ⏳ Planned | 0% |
| 6 | Hardening & Scale | ⏳ Planned | 0% |

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
| Localization config | زبان‌ها و عنوان خطاها از `Localization` در appsettings؛ بدون hard-code | `5b956d3` |
| ID Generator | `IIdGenerator` + `Uuid7IdGenerator`؛ حذف `Guid.*` مستقیم از دامنه/کاربرد | `5b956d3` |
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
| GET | `/health` | ✅ |

> Supplier API با `X-Api-Key` + `X-Api-Secret` و scope `supplier.write` محافظت می‌شود.

---

## ۵. کیفیت

| شاخص | مقدار |
|---|---|
| Build | ۰ warning / ۰ error |
| Unit Tests | ۵۲ passed |
| Architecture Tests | ۲۲ passed |
| Total | **۷۴ passed** |
| Migrations | Supply (۳) / Catalog (۱) / Identity (۱) / Booking (۱) |
| Format | clean |
| Vulnerable Packages | none |
| API Health | Healthy |

---

## ۶. تسک فعال / بعدی

**تسک فعال:** TC-027 — Order + Contract (پس از تکمیل تغییرات عرضی زبان و شناسه)
**Phase 2:** در حال انجام

### ۵ تسک اول Phase 2 (پس از تأیید)

| ترتیب | تسک | وابستگی | خروجی |
|---|---|---|---|
| 1 | TC-024 Search projection | Phase 1 Gate | ایندکس جستجو |
| 2 | TC-025 Compare API | TC-024, TC-021 | مقایسه چند آژانس |
| 3 | TC-026 Quote + Hold | TC-025 | TTL + release |
| 4 | TC-027 Order + Contract | TC-026 | snapshot immutable |
| 5 | TC-028 PaymentIntent + Gateway | TC-027 | پرداخت Hani |

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
