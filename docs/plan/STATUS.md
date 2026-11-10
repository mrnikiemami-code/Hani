# Hani — STATUS (وضعیت زنده)

> **تاریخ:** ۱۹ آبان ۱۴۰۵
> **فاز فعال:** Phase 1 — Core Domain
> **آخرین commit کد:** `af5b415`
> **وضعیت Gate:** باز

---

## ۱. نمای کلی فازها

| فاز | عنوان | وضعیت | پیشرفت |
|---|---|---|---|
| 0 | Foundation & Governance | ✅ Done | 100% |
| 1 | Core Domain: Catalog + Identity + Supply | 🚧 In Progress | ~۵۰٪ |
| 2 | Marketplace Read + Booking | ⏳ Next | 0% |
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

## ۳. Phase 1 — In Progress 🚧

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

### ناقص / باقی‌مانده

| مورد | وضعیت | تسک |
|---|---|---|
| Departure + Price + Capacity | ❌ | TC-021 |
| Supplier upsert + idempotency | ⚠️ فقط Create/Get | TC-022 |
| Moderation | ❌ | TC-023 |
| API Key Authentication | ❌ | TC-017 |
| Tenant isolation integration test | ❌ | TC-013A |
| Error resources FA/EN/AR | ⚠️ فقط کد | TC-014A |
| Update/Delete AgencyOffer | ❌ | TC-020 |
| User + Role | ❌ | TC-015 (باقی) |
| Hotel / Attraction / Visa | ❌ | TC-019 (باقی) |

---

## ۴. APIهای موجود

| متد | مسیر | وضعیت |
|---|---|---|
| POST | `/internal/v1/agencies` | ✅ |
| GET | `/internal/v1/agencies/{id}` | ✅ |
| POST | `/internal/v1/agencies/{id}/api-clients` | ✅ |
| POST | `/internal/v1/products` | ✅ |
| POST | `/internal/v1/products/{id}/publish` | ✅ |
| GET | `/market/v1/products/{id}` | ✅ |
| POST | `/supplier/v1/offers` | ✅ (Create) |
| GET | `/supplier/v1/offers/{id}` | ✅ |
| GET | `/health` | ✅ |

> هیچ‌کدام از این endpointها فعلاً احراز هویت اجباری ندارند. این در Phase 1 Gate بسته می‌شود.

---

## ۵. کیفیت

| شاخص | مقدار |
|---|---|
| Build | ۰ warning / ۰ error |
| Unit Tests | ۲۲ passed |
| Architecture Tests | ۱۳ passed |
| Migrations | Supply / Catalog / Identity |
| Format | clean |
| Vulnerable Packages | none |
| API Health | Healthy |

---

## ۶. تسک فعال / بعدی

**تسک فعال:** هیچ (آماده شروع)
**تسک بعدی:** `TC-021 — Departure + Price + Capacity`

### ۵ تسک بعدی

| ترتیب | تسک | وابستگی | خروجی |
|---|---|---|---|
| 1 | TC-021 Departure + Price + Capacity | TC-020 | سانس + قیمت + ظرفیت |
| 2 | TC-022 Supplier upsert + idempotency | TC-021 | upsert ایمن |
| 3 | TC-017 API Key Auth + tenant isolation | TC-016 | 401/403 |
| 4 | TC-023 Moderation | TC-022 | approve/reject |
| 5 | TC-020 Update/Delete Offer | TC-020 | CRUD کامل |

---

## ۷. Phase 1 Gate

- [ ] Agency → ApiClient → Product → Offer → Publish → Query (دمو)
- [ ] API Key اجباری روی Supplier API
- [ ] Tenant isolation test
- [ ] Departure + Price + Capacity
- [ ] Supplier upsert idempotent
- [ ] Moderation approve/reject
- [ ] Error resources FA/EN/AR
- [ ] `scripts/verify.ps1` سبز
- [ ] STATUS.md و TASKS.md به‌روز

---

## ۸. Commit Log (این مرحله)

| commit | موضوع |
|---|---|
| `825ed39` | Governance bootstrap |
| `98ab18d` | Observability / Cache / Tenant / Idempotency / Docker |
| `ab3b2e7` | MassTransit + Outbox |
| `9fa5a3e` | Catalog |
| `af5b415` | Identity |
