# Baseline Gate 1 Report — Tour Experience & Pricing

> **تاریخ:** ۱۲ نوامبر ۲۰۲۶
> **کد commit:** `79daeb7`
> **وضعیت:** ✅ **PASSED**
> **Gate بعدی:** Gate 2 — Discovery/SEO

---

## ۱. GAPهای بسته‌شده

| GAP | عنوان | تسک | شاهد اصلی |
|---|---|---|---|
| GAP-01 | Tour Content Model | TC-083 | `TourItineraryDay`, content translations, `AddTourContent` |
| GAP-02 | Accommodation Options | TC-084 | `OfferAccommodationOption`, `AddOfferOptions` |
| GAP-03 | Flight Details | TC-084 | `OfferFlightOption`, `AddOfferOptions` |
| GAP-07 | Multi-currency | TC-082 | `PricingSnapshot`, `PaymentObligation`, per-currency `PaymentIntent` |
| GAP-08 | VAT/Duty | TC-082 | `OfferTaxRule`, `TaxStatus`, `AddTaxRulesAndCurrencyPrices` |

---

## ۲. قابلیت‌های تحویل‌شده

- محتوای چندزبانه تور: itinerary روزانه، وعده‌ها، خدمات شامل/غیرشامل، سیاست لغو، اقلام الزامی.
- گزینه‌های اقامت: هتل، ستاره، نوع اتاق، MealPlan و قیمت.
- گزینه‌های پرواز: جهت، ایرلاین، شماره پرواز، فرودگاه/ساعت، مدت، کلاس پرواز و بار.
- قیمت چندارزی در Offer/Departure/Quote/Order/Contract با snapshot مالیاتی به تفکیک ارز.
- فرمول مالیات مطابق ADR-0024: `Duty = Base × DutyRate`, `VAT = Base × VATRate`, `Total = Base + Duty + VAT`.
- `PaymentObligation` مستقل به تفکیک ارز، `PaymentStatus` مستقل از lifecycle سفارش.
- یک `PaymentIntent` برای هر ارز و ارجاع به obligation.
- کمیسیون و Ledger به تفکیک ارز، با idempotency روی `(OrderId, Currency)`.

---

## ۳. شواهد End-to-End

سناریوی واقعی روی API اجرا شد:

```text
Offer: IRR+USD + tax rules
Departure: Double IRR 10,000,000 / USD 200; ChildWithBed IRR 5,000,000 / USD 100
Quote: 2 Adults + 1 Child
IRR: Base 25,000,000 + Duty 250,000 + VAT 2,250,000 = 27,500,000
USD: Base 500 + Duty 10 + VAT 25 = 535
Order: PaymentObligations = 2 (IRR, USD)
IRR paid -> Order.Status=PendingPayment / PaymentStatus=PartiallyPaid
USD paid -> Order.Status=Paid / PaymentStatus=Paid
Commission: IRR 2,750,000 / USD 53.50
```

---

## ۴. کیفیت

| شاخص | مقدار |
|---|---|
| Build | ۰ warning / ۰ error |
| Unit Tests | ۹۱ passed |
| Architecture Tests | ۳۳ passed |
| Total | **۱۲۴ passed** |
| Format | clean |
| Migration drift | none (Supply/Booking/Payments/Settlement) |
| Baseline gate | passed |

---

## ۵. تصمیم

Gate 1 بسته شد. کار بعدی Gate 2 است: Faceted Search/Sort (GAP-04) و SEO/Landing/Sitemap (GAP-28).
