# Hani — Gate 7 (Channel & Billing) Progress Report

> **تاریخ:** ۲۳ آبان ۱۴۰۵ (2026-11-14)
> **وضعیت:** ✅ PASSED (Core)
> **Baseline:** 34 GAP، `currentGate = 8`
> **گزارش قبلی:** `lastsecond-deviation-audit-post-gate6-2026-11-14.md`

---

## ۱. تحویل‌شده

### Channel API

- OAuth2 Client Credentials: `POST /oauth/token`
- scopeهای `channel.catalog.read` / `channel.booking.read` / `channel.booking.write` / `channel.finance.read`
- `POST /channel/v1/quotes`
- `POST /channel/v1/bookings` (hold + order)
- `GET /channel/v1/bookings` / `{id}`
- `POST /channel/v1/bookings/{id}/cancel`
- `GET /channel/v1/catalog/products` / `{id}`
- `GET /channel/v1/offers` / `{offerId}/departures`
- `GET /channel/v1/me/entitlements`
- `POST /channel/v1/flights/search`
- `GET /channel/v1/settlements` / `settlements/terms`

### Billing

- `Order.Cancel` + آزادسازی صندلی
- `Refund` Requested → Processed با provider ref
- `Invoice` با Issuer/SellerOfRecord و شماره یکتا
- `AgencySettlementTerms` + `Payout` (Pending/Paid)
- Internal APIs برای refund/invoice/payout/terms

### Migrationها

- Booking: `AddGate7OrderCancellation`
- Payments: `AddGate7RefundsAndInvoices`
- Settlement: `AddGate7SettlementTermsAndPayouts`

## ۲. وضعیت Gate 7

| مورد | وضعیت |
|---|---|
| TC-031 Channel OAuth | ✅ |
| TC-032 Channel Catalog/Availability | ✅ |
| TC-033 Channel Booking + Webhook | ✅ |
| TC-055 OAuth2 + scopes | ✅ |
| TC-056 Entitlements + plans | ✅ |
| TC-057 White-label | ✅ (model/entitlement؛ DNS routing خارج از بک‌اند) |
| TC-058 AgencyCommissionRule | ✅ (از قبل) |
| TC-059 Invoice + Dunning | ✅ |
| TC-060 SettlementTerms + Ledger | ✅ |
| TC-034/035/036 Dashboards | ✅ Basic booking dashboards |

## ۳. کیفیت

- Unit tests: **148 passed**
- Architecture tests: **34 passed**
- Total: **182 passed**
- Build: 0 warning / 0 error
- Smoke: OAuth token، entitlements، channel catalog، channel bookings list، refund process، invoice، settlement terms، payout paid

## ۴. باقی‌مانده خارج از بک‌اند

- اتصال واقعی PSP refund (mock adapter وجود دارد)
- DNS/routing دامنه white-label
- Frontend صفحات Channel/Agency/Admin/Traveler
- Reconciliation با فایل واقعی PSP (مدل و API موجود است)
- Background scheduler برای dunning (endpoint trigger موجود است)

> Gate 7 در سطح Core بک‌اند PASS است؛ موارد بالا وابستگی خارجی/Frontend هستند.
