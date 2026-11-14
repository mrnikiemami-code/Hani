# Baseline Gate 4 — Booking, Request & Lead

- **تاریخ:** 2026-11-14
- **وضعیت:** ✅ PASSED
- **Baseline:** `docs/plan/baseline.json` (نسخه ۱، `currentGate = 5`)
- **قرارداد:** `docs/plan/PHASE-CONTRACT.md` — بخش ۵
- **ADR:** `docs/adr/0025-booking-modes-requests-leads-installments-offline.md`
- **گزارش‌های قبلی:** `baseline-gate-1.md`, `baseline-gate-2.md`, `baseline-gate-3.md`

---

## ۱. GAPهای بسته‌شده

| GAP | تسک | خروجی | شاهد |
|---|---|---|---|
| GAP-05 — Booking/Request Modes (P0) | TC-088 | `BookingMode`/`CollectionMode` + `ReservationRequest` + انتشار در Search/Compare/Snapshot | `AgencyOffer`, `ReservationRequest`, `RequestEndpoints`, `SearchProductsQueryHandler`, `Gate4Tests` |
| GAP-06 — Lead/RFQ (P0) | TC-088 | `LeadRequest` + Match + Distribute به همه آژانس‌های Active + Close | `LeadRequest`, `LeadAgencyInvitation`, `DistributeLeadCommand`, `internal-booking-api-v1.openapi.yaml` |
| GAP-19 — Price Mismatch (P1) | TC-088 | `PriceDiscrepancyReport` + صف بررسی + Resolve | `PriceDiscrepancyReport`, `RequestCommandHandlers`, `RequestEndpoints` |
| GAP-17 — Installments (P1) | TC-098 | `InstallmentPlan` به تفکیک ارز + پرداخت قسط | `InstallmentPlan`, `InstallmentPlanConfiguration`, `Gate4Tests` |
| GAP-18 — Offline Payment (P0) | TC-098 | `CollectionMode=Offline` + رد PaymentIntent آنلاین + رسید + کمیسیون | `OfflinePaymentReceipt`, `RecordOfflinePaymentCommand`, `CreatePaymentIntentCommandHandler` |

هیچ GAP باز یا Waived در Gate 4 وجود ندارد. P0های Gateهای ۱ تا ۳ نیز همه Done هستند.

---

## ۲. Lastsecond Re-audit (2026-11-14)

صفحات بررسی‌شده:

- `https://lastsecond.ir/`
- `https://lastsecond.ir/safarsaz`
- یک صفحه تور نمونه: `https://lastsecond.ir/tours/276869-...` (تور پوکت پاییز ۱۴۰۵)

### ۲.۱. مشاهدات

| مشاهده Lastsecond | معنی برای Hani | وضعیت Hani |
|---|---|---|
| در کارت‌های تور، قیمت به تومان و بعضاً دلار کنار هم آمده | چندارزی بودن قیمت | Gate 1 — پاس شده |
| برچسب «اقساطی» روی برخی تورها | شرایط اقساط | Gate 4 — `InstallmentPlan` |
| در صفحه تور: «برای رزرو تماس بگیرید» | رزرو فوری برای برخی Offerها وجود ندارد | Gate 4 — `BookingMode=ReservationRequest` (UI می‌تواند متن «تماس/درخواست» را نشان دهد) |
| در صفحه تور: «در صورت مغایرت قیمت اعلامی ... حتما به ما اطلاع دهید» | فرم و پیگیری مغایرت قیمت | Gate 4 — `PriceDiscrepancyReport` |
| صفحه سفرساز: ۶ نوع درخواست (تور، هتل، بلیط، ویزا، طراحی، تور اختصاصی) | مدل Lead/RFQ چندنوعی | Gate 4 — `LeadServiceType` با همان ۶ مقدار |
| صفحه سفرساز: «تطبیق با بیش از ۲ هزار آژانس» | توزیع درخواست به همه آژانس‌ها | Gate 4 — `DistributeLead` به همه آژانس‌های Active + `LeadAgencyInvitation` یکتا |
| صفحه تور: هتل‌ها با «برای رزرو تماس بگیرید» و قیمت هر RoomType | استعلام هتل | Gate 5 — خارج از این Gate (GAP-14) |
| ویزا در صفحه اصلی و مسیر `/visa` | ماژول ویزا | Gate 5 — خارج از این Gate (GAP-15/21) |

### ۲.۲. نتیجه Audit

- هیچ تغییر جدیدی در Lastsecond که GAPهای Gate 4 را باز کند مشاهده نشد.
- «تماس بگیرید» به‌عنوان یک حالت غیرآنلاین پوشش داده شد؛ UI نهایی می‌تواند بر اساس `bookingMode` متن «رزرو آنلاین» یا «درخواست/تماس با آژانس» را انتخاب کند.
- توزیع Lead با همه آژانس‌های Active پیاده شد؛ تطبیق هوشمند بر اساس پوشش مقصد/سرویس به Gate 6 (Ranking/Recommendation) منتقل شد و در ADR-0025 ثبت است.
- استعلام هتل، ویزا، جاذبه و رستوران طبق قرارداد به Gate 5 منتقل شده‌اند.

---

## ۳. تغییرات فنی

### ۳.۱. Supply

- `BookingMode` (`Online`, `ReservationRequest`) و `CollectionMode` (`Online`, `Offline`) روی `AgencyOffer`.
- اعتبارسنجی و ذخیره در create/upsert، DTO و read contracts.
- Migration: `20261114034755_AddBookingModes`.

### ۳.۲. Booking

- `ReservationRequest` با TTL ۲۴ ساعت، بدون Hold/پرداخت، چرخه Pending → Confirmed/Rejected → Accepted/Expired.
- endpointهای عمومی، آژانس (tenant-scoped) و داخلی.
- `LeadRequest` + `LeadAgencyInvitation` + Match/Distribute/Close.
- `PriceDiscrepancyReport` + Resolve.
- `InstallmentPlan` یکتا برای `(orderId, currency)` با ۲ تا ۱۲ قسط.
- Migrationها: `20261114034801_AddRequestsLeadsDiscrepanciesInstallments`, `20261114035906_AddLeadDistributions`.

### ۳.۳. Payments

- `OfflinePaymentReceipt` با Cash/BankTransfer/Cheque و مرجع/اپراتور.
- `RecordOfflinePayment` مبلغ obligation همان ارز را بررسی، Paid و کمیسیون را ثبت می‌کند.
- `CreatePaymentIntent` برای سفارش Offline با `409` رد می‌شود.
- Migration: `20261114034808_AddOfflinePayments`.

### ۳.۴. Marketplace

- `bookingModes` در نتایج جستجو.
- `bookingMode`/`collectionMode` در compare.
- `onlineOnly` از no-op به فیلتر واقعی تبدیل شد.

### ۳.۵. Auth

- Policy scheme برای انتخاب API Key در صورت وجود `X-Api-Key` و JWT در غیر آن؛ تا TenantMiddleware برای endpointهای Supplier claim آژانس را ببیند.

---

## ۴. تست و Smoke

### ۴.۱. تست خودکار

| شاخص | نتیجه |
|---|---|
| Build | ۰ warning / ۰ error |
| Unit Tests | ۱۱۵ passed |
| Architecture Tests | ۳۴ passed |
| Total | **۱۴۹ passed** |
| Migration drift | ۰ (Supply/Catalog/Identity/Booking/Payments/Settlement) |

تست‌های Gate 4:

- `tests/Hani.UnitTests/Booking/Gate4Tests.cs`
  - ReservationRequest غیرآنلاین + Confirm/Reject
  - رد ReservationRequest برای Offer آنلاین
  - Lead Match و Distribute یکتا
  - PriceDiscrepancy lifecycle
  - InstallmentPlan sum/complete
  - OfflinePaymentReceipt validation
- `tests/Hani.UnitTests/Marketplace/SearchProductsHandlerTests.cs`
  - `onlineOnly` + `bookingModes`
- `tests/Hani.UnitTests/Marketplace/ProductComparisonHandlerTests.cs`
  - `bookingMode`/`collectionMode`

### ۴.۲. Smoke Test واقعی (PostgreSQL + API)

| سناریو | نتیجه |
|---|---|
| ساخت Offer با `ReservationRequest` + `Offline` | ✅ |
| Quote با mode صحیح | ✅ `booking=ReservationRequest collection=Offline` |
| ساخت ReservationRequest | ✅ `PendingAgencyReview` |
| Confirm آژانس | ✅ `Confirmed` |
| ساخت Order از Hold | ✅ `PendingPayment` |
| ساخت InstallmentPlan | ✅ ۳ قسط، جمع = ۲۷,۲۵۰,۰۰۰ IRR |
| ثبت پرداخت آفلاین | ✅ `Paid` + رسید Cash |
| ساخت Lead | ✅ `Open` |
| ساخت PriceDiscrepancy | ✅ `Open` |
| توزیع Lead به آژانس‌های Active | ✅ ۷ دعوت یکتا برای ۷ آژانس Active |
| لیست ReservationRequest توسط Supplier | ✅ tenant-scoped |

---

## ۵. Exit Criteria — Gate 4

- [x] همه GAPهای Gate 4 وضعیت Done دارند و evidence دارند.
- [x] Code + Tests + OpenAPI + README + ADR به‌روز است.
- [x] `verify.ps1` سبز است.
- [x] `check-baseline.ps1` سبز است.
- [x] Migration drift صفر است.
- [x] Deviation Audit علیه Lastsecond انجام شد.
- [x] هیچ P0 باز از Gateهای قبلی وجود ندارد.
- [x] گزارش Gate 4 ثبت شد.
- [x] `baseline.json` به `currentGate = 5` ارتقا یافت.

---

## ۶. ریسک‌ها و انتقال به Gate بعد

| مورد | تصمیم |
|---|---|
| UI متن «تماس با آژانس» | Frontend با `bookingMode` تصمیم می‌گیرد؛ بک‌اند فقط حالت را افشا می‌کند. |
| تطبیق هوشمند Lead بر اساس پوشش | فعلاً همه آژانس‌های Active؛ Ranking/Coverage در Gate 6. |
| PSP اقساطی و Dunning | Gate 7/8؛ اکنون فقط schedule + ثبت پرداخت. |
| Hotel Inquiry / Visa Request | Gate 5 با استفاده از همان Lead/Reservation primitives. |

**نتیجه نهایی: Gate 4 PASSED است و Gate 5 (Verticals) مجاز به شروع است.**
