# Hani — Roadmap فازی

> **قاعده طلایی:** یک فاز فعال، یک تحویل مشخص، یک Gate قابل‌سنجش.

## Phase 0 — Foundation & Governance ✅

**هدف:** زیرساخت اجرایی، یکدستی و قابلیت تست.

**تحویل‌دادنی‌ها:**
- Solution + BuildingBlocks
- ماژول نمونه Supply
- ArchitectureTests + BannedSymbols
- Central Package Management + lock files
- Docker Compose (Postgres/Redis/RabbitMQ/Seq/OTel)
- Serilog + OpenTelemetry با Toggle
- Cache (Memory/Redis/None)
- TenantContext
- Idempotency Behavior
- MassTransit + Outbox/Inbox + migration
- CI + CODEOWNERS + PR Template

**معیار پذیرش:**
- `scripts/verify.ps1` سبز
- ۳۵ تست (۲۲ Unit + ۱۳ Architecture)
- ۳ migration
- API `/health` = Healthy
- Banned API تأییدشده (RS0030)

**وضعیت:** ✅ بسته شد

---

## Phase 1 — Core Domain: Catalog + Identity + Supply 🚧

**هدف:** یک آژانس بتواند محصول تور بسازد، پیشنهاد بدهد و داده پایه را از API بخواند.

**تحویل‌دادنی‌ها:**
- Catalog:
  - TourProduct مشترک
  - Translation FA/EN/AR
  - Destination
  - Publish
- Identity:
  - Agency
  - ApiClient + Secret Hashing
- Supply:
  - AgencyOffer (Create/Get)
  - Departure + Capacity + Price
  - Supplier upsert + idempotency
  - Moderation
- Auth:
  - API Key validation
  - Tenant isolation
- Localization:
  - Error resources FA/EN/AR

**معیار پذیرش (Gate):**
1. `POST /internal/v1/agencies` → Agency
2. `POST /internal/v1/agencies/{id}/api-clients` → ClientId + Secret
3. `POST /internal/v1/products` → TourProduct
4. `POST /internal/v1/products/{id}/publish` → Published
5. `POST /supplier/v1/offers` با API Key → Offer
6. `GET /market/v1/products/{id}` → Product + Offers
7. درخواست بدون API Key → 401
8. درخواست tenant A به Offer tenant B → 404/403
9. `verify.ps1` سبز

**وضعیت:** 🚧 در حال انجام (~۵۰٪)

---

## Phase 2 — Marketplace Read + Booking

**هدف:** مشتری بتواند مقایسه کند و رزرو کامل انجام دهد.

**تحویل‌دادنی‌ها:**
- Search/read model + filters
- Compare Offers
- Quote + Hold
- Order + Contract snapshot
- PaymentIntent (Hani merchant)
- Payment webhook + idempotency
- Traveler dashboard APIs

**معیار پذیرش:**
- یک رزرو کامل با پرداخت Mock PSP
- جلوگیری از oversell
- قرارداد immutable
- `verify.ps1` سبز

---

## Phase 3 — Channel API + Billing + Settlement

**هدف:** فروش از کانال آژانس + درآمد و تسویه.

**تحویل‌دادنی‌ها:**
- OAuth2 Client Credentials
- Scopes + entitlements
- Standard/Professional + white-label
- AgencyCommissionRule (per agency + ProductType)
- Invoice + CreditLimit + Dunning
- SettlementTerms + Settlement + Ledger

**معیار پذیرش:**
- یک کانال تستی end-to-end
- محاسبه کمیسیون per product
- فاکتور + تسویه نمونه
- `verify.ps1` سبز

---

## Phase 4 — Flights

**هدف:** رزرو بلیط داخلی و بین‌المللی.

**تحویل‌دادنی‌ها:**
- Airline/Airport/Route/Schedule
- Supplier Adapter (Mock + داخلی + بین‌المللی)
- Search fan-out + cache
- PNR + Ticketing + Deadline Job
- Refund/Cancel
- Route SEO data

**معیار پذیرش:**
- یک بلیط داخلی end-to-end
- یک بلیط بین‌المللی end-to-end
- Ticketing Deadline و Refund
- `verify.ps1` سبز

---

## Phase 5 — Content + Hotels + Visa + SEO/i18n

**هدف:** تکمیل دامنه محتوایی و سئو.

**تحویل‌دادنی‌ها:**
- Hotels / Attractions / Restaurants
- Visa services
- Reviews
- Blog / Travelogues / Memories / Videos
- Sitemap / JSON-LD / hreflang
- FA/EN/AR content workflow

**معیار پذیرش:**
- صفحات سه‌زبانه indexable
- Sitemap معتبر
- JSON-LD معتبر
- Lighthouse SEO ≥ 95

---

## Phase 6 — Hardening & Scale

**هدف:** آمادگی تولید و مقیاس.

**تحویل‌دادنی‌ها:**
- Load test
- DR / Backup drill
- Security review
- Observability dashboards
- Microservice extraction readiness

**معیار پذیرش:**
- SLOها رعایت شوند
- RTO/RPO تست شود
- هیچ High security issue نماند
