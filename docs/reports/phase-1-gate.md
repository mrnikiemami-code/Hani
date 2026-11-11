# Phase 1 Gate Report

> **تاریخ:** ۱۱ نوامبر ۲۰۲۶
> **کد commit:** `d4b9465`
> **وضعیت:** ✅ **PASSED**
> **فاز فعال بعدی:** Phase 2 — شروع نشده (در انتظار بازبینی)

---

## ۱. معیارهای Gate

| # | معیار | نتیجه | شاهد |
|---|---|---|---|
| 1 | Agency → ApiClient → Product → Offer → Publish → Query | ✅ | `scripts/demo-phase1.ps1` |
| 2 | API Key اجباری روی Supplier API | ✅ | بدون هدر → `401` |
| 3 | Tenant isolation | ✅ | آژانس دوم → `404` |
| 4 | Departure + Price + Capacity | ✅ | SeatsLeft=2 / Version=2 |
| 5 | Supplier upsert idempotent | ✅ | same OfferId با همان Idempotency-Key |
| 6 | Moderation | ✅ | Status=Approved |
| 7 | خطاهای کددار + عنوان محلی FA/EN/AR | ✅ | `ProblemDetailsLocalizer` + تست |
| 8 | `scripts/verify.ps1` | ✅ | All gates passed |
| 9 | تست‌ها | ✅ | ۴۰ Unit + ۱۳ Architecture |
| 10 | Migration بدون تغییر معلق | ✅ | Supply / Catalog / Identity |

---

## ۲. خروجی دمو

```
AgencyId: ...
ClientId: ag_...
DestinationId: ...
ProductId: ... (published)
OfferId: ... / Created: True
SameOffer: True / Created: True
DepartureId: ...
Availability updated
SeatsLeft: 2 / Version: 2
OfferStatus: Approved
Translations: 3 / Destinations: 1
Unauthorized supplier request: 401
Tenant isolation: 404
Demo complete.
```

اجرا:

```powershell
docker compose -f deploy/docker/docker-compose.yml up -d postgres redis seq
dotnet run --project src/Hani.Api --urls http://localhost:5094
.\scripts\demo-phase1.ps1 -BaseUrl http://localhost:5094
```

---

## ۳. کیفیت

| شاخص | مقدار |
|---|---|
| Build | ۰ warning / ۰ error |
| Unit Tests | ۴۰ passed |
| Architecture Tests | ۱۳ passed |
| Total | **۵۳ passed** |
| Migrations | Supply (۳) / Catalog (۱) / Identity (۱) |
| Format | clean |
| Vulnerable Packages | none |
| API Health | Healthy |

---

## ۴. موارد خارج از Gate (به فاز بعد منتقل شد)

| مورد | فاز مقصد |
|---|---|
| User + Role + JWT | Phase 2/3 |
| Hotel / Attraction / Visa | Phase 5 |
| ترجمه per-code با resx کامل | Phase 5 |
| Postgres Idempotency پایدار | Phase 2 |
| Outbox فعال + Consumer | Phase 2 |
| Frontend | بعد از دریافت قالب |

---

## ۵. تصمیم

Phase 1 بسته شد. **Phase 2 شروع نشده** و منتظر بازبینی کاربر است.
