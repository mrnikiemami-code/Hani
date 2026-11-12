# گزارش شکاف معماری — چندارزی، مالیات/عوارض، مدل‌های رزرو و MoR

- **تاریخ:** 2026-11-12
- **وضعیت:** PARTIAL — ADR-0024 ثبت شد؛ پیاده‌سازی مرحله‌ای آغاز نشده است.
- **مرجع تصمیم:** ADR-0024

## ۱. شکاف‌های شناسایی‌شده

| # | شکاف | شدت | وضعیت فعلی |
|---|---|---|---|
| 1 | تفکیک Merchant of Record | Blocking | ADR-0011 بدون تفکیک Online/Reservation، Hani را MoR می‌داند. ADR-0024 آن را تعدیل کرد. |
| 2 | قیمت تک‌ارزی | High | `Money`، `AgencyOffer.BasePrice`، Quote/Order/Contract و PaymentIntent تک‌ارزی‌اند. |
| 3 | نبود VAT/Duty | High | هیچ فیلد مالیات/عوارض در Offer/Quote/Order/Contract/Invoice نیست. |
| 4 | نبود TaxStatus | High | Applicable / ZeroRated / NotApplicable / Exempt وجود ندارد. |
| 5 | نبود BookingMode | High | فقط جریان Online پیاده شده است. |
| 6 | PaymentIntent تک‌تعهدی | High | ایندکس یکتا روی `order_id`؛ چندارزی و چند تعهد پشتیبانی نمی‌شود. |
| 7 | OrderStatus ناکافی | High | وضعیت‌های Reservation و پرداخت ناقص چندارزی وجود ندارد. |
| 8 | Commission تک‌ارزی | High | `CommissionEntry` تک‌ارزی و unique روی Order است. |
| 9 | CommissionRule ناکافی | High | CurrencyScope، CommissionBase، AgreementId و شمول ارز ندارد. |
| 10 | Ledger ناسازگار | Blocking | `psp_cash` و `agency_payable` برای Hani-MoR طراحی شده‌اند. |
| 11 | نبود Invoice | High | ماژول Invoice/Billing وجود ندارد. |
| 12 | API تک‌ارزی | High | Offer/Quote/Order/Contract/Payment/Settlement APIs تک‌ارزی‌اند. |
| 13 | نبود Legacy | — | طبق تصمیم، Backfill تجاری لازم نیست؛ فقط داده آزمایشی قابل بازنشانی است. |

## ۲. تصمیم‌های قفل‌شده

- Online: Hani وجه را می‌گیرد و با آژانس تسویه می‌کند.
- ReservationRequest: آژانس وجه را می‌گیرد؛ Hani کمیسیون را مطالبه می‌کند.
- قیمت چندارزی بدون تبدیل اجباری.
- VAT و Duty مستقل برای هر جزء/ارز؛ ZeroRated ≠ NotApplicable؛ Exempt با دلیل.
- فرمول: `Duty = Base × DutyRate`, `VAT = Base × VatRate`, `Total = Base + Duty + VAT`.
- کمیسیون روی Total هر ارز.
- هر PaymentIntent تک‌ارزی؛ هر Order چند تعهد/چند Intent.
- BookingMode در AgencyOffer؛ پیش‌فرض از Agency.
- ReservationRequest بدون Hold؛ تغییر قیمت نیازمند پذیرش مشتری.
- فقط API v1؛ بدون v2 و بدون Backfill.
- InvoiceIssuer و SellerOfRecord قابل ثبت، نه حدسی.
- TaxLiabilityOwner باید صریح باشد؛ حدس قانونی ممنوع.

## ۳. فازهای پیاده‌سازی

| فاز | محدوده | خروجی |
|---|---|---|
| A | Pricing primitives + Offer components + TaxRules + BookingMode + Agency default | Domain/Contracts/Supply/Identity + migration + tests |
| B | Quote/Order/Contract PricingSnapshot + Reservation state machine | Booking + migration + tests |
| C | PaymentObligation + multi-currency PaymentIntent + CollectionMode | Payments + migration + tests |
| D | Commission per currency + Ledger separation + TaxLiabilityOwner + Invoice | Settlement/Billing + migration + tests |
| E | OpenAPI v1 بازتولید + E2E چندارزی/مالیات/رزرو + verify | docs + tests |

## ۴. تغییرات شکستنی API

- `POST/PUT /supplier/v1/offers`: `BasePrice/Currency` → `PriceComponents[]`, `TaxRules[]`, `BookingMode`
- `GET /supplier/v1/offers/{id}`: خروجی چندارزی
- `POST /market/v1/quotes`: خروجی PricingSnapshot
- `POST /market/v1/orders`: ورودی/خروجی Snapshot چندارزی
- `GET /market/v1/orders/{id}`
- `GET /market/v1/orders/{id}/contract`
- `POST /market/v1/payments/intents`: per obligation/currency
- `GET /internal/v1/settlements/commissions/{orderId}`: چندارزی
- OpenAPI هر سه API + internal settlement

## ۵. Migrationها

هیچ Migration جدیدی در این مرحله ساخته نشد.

Migrationهای لازم در فازها:

- Supply: price components + tax rules + booking mode
- Identity: Agency.DefaultBookingMode
- Booking: pricing snapshots + reservation statuses + payment obligations
- Payments: remove unique order index + add currency/obligation
- Settlement: commission per currency + new ledger accounts
- Billing/Invoice: جدول‌های جدید

## ۶. تست‌ها

- آخرین Gate قبل از این تغییر: **85 Unit + 31 Architecture = 116 passed**
- برای این تغییر، تست‌های زیر لازم است:
  - ZeroRated vs NotApplicable vs Exempt
  - VAT/Duty مستقل برای IRR و USD
  - Total چندارزی
  - Commission per currency
  - Payment ناقص چندارزی
  - ReservationRequest بدون Hold
  - تغییر قیمت و پذیرش مجدد مشتری
  - CollectionMode و Ledger تفکیک‌شده
  - Invoice breakdown

## ۷. وضعیت

**PARTIAL / ARCHITECTURE_LOCKED**

- ADR-0024 ثبت شد.
- ADR-0011/0022/0023 تعدیل شدند.
- پیاده‌سازی کد و Migration عمداً آغاز نشده تا Phase A به‌صورت کنترل‌شده و بدون مدل موازی انجام شود.
