# ADR-0024 — چندارزی، مالیات/عوارض، مدل‌های رزرو و تفکیک Merchant of Record

- **وضعیت:** Accepted (Locked for implementation)
- **تاریخ:** 2026-11-12
- **تصمیم‌گیرندگان:** تیم Hani
- **روابط:** ADR-0011، ADR-0012، ADR-0022 و ADR-0023 را تعدیل می‌کند؛ هیچ‌کدام حذف نمی‌شوند.

## زمینه

Hani یک مارکت‌پلیس گردشگری است و از ابتدا ساخته می‌شود؛ داده تجاری Legacy ندارد. مدل فعلی تمام قیمت‌ها، پرداخت‌ها و کمیسیون‌ها را تک‌ارزی و بدون VAT/Duty نگه می‌دارد. همچنین ADR-0011 بدون تفکیک مدل فروش، Hani را Merchant of Record معرفی کرده است. در واقعیت دو مدل فروش وجود دارد:

- **Online:** Hani وجه مشتری را دریافت و با آژانس تسویه می‌کند.
- **ReservationRequest:** آژانس وجه را دریافت می‌کند و Hani فقط کمیسیون را مطالبه می‌کند.

یک تور می‌تواند هم‌زمان چند جزء قیمت با ارزهای متفاوت داشته باشد؛ مثلاً `100,000,000 IRR + 1,500 USD`. VAT و Duty برای هر جزء و هر ارز مستقل‌اند و می‌توانند Applicable، ZeroRated، NotApplicable یا Exempt باشند.

## تصمیم

### ۱. Merchant of Record و CollectionMode

- ADR-0011 حذف یا Supersede نمی‌شود؛ اصل آن حفظ و با این ADR تعدیل می‌شود.
- `CollectionMode` در سطح سفارش/تعهد پرداخت مشخص می‌شود:
  - `HaniOnline`: Hani وجه را دریافت می‌کند.
  - `AgencyOnline`: آژانس وجه را آنلاین دریافت می‌کند.
  - `AgencyOffline`: پرداخت آفلاین توسط آژانس ثبت می‌شود.
- `SellerOfRecord` و `InvoiceIssuer` روی سفارش/فاکتور قابل ثبت‌اند و از روی CollectionMode حدس زده نمی‌شوند.
- برای Online، Hani رسید پرداخت و تسویه با آژانس را مدیریت می‌کند.
- برای ReservationRequest، Hani به‌صورت پیش‌فرض فقط وضعیت پرداخت اعلام‌شده آژانس را ثبت می‌کند.

### ۲. مدل قیمت چندارزی

- قیمت Offer یک `Money` واحد نیست؛ مجموعه‌ای از `OfferPriceComponent` است:
  - `Kind`: Base / Fee / Other
  - `BaseAmount`
  - `Currency`
- هر Offer مجموعه‌ای از `OfferTaxRule` به ازای هر ارز دارد:
  - `Currency`
  - `VatStatus`, `VatRate`
  - `DutyStatus`, `DutyRate`
  - `ExemptionReason?`
- `TaxStatus`:
  - `Applicable`
  - `ZeroRated`
  - `NotApplicable`
  - `Exempt` (با دلیل مستقل)
- نرخ صفر و عدم اعمال مالیات دو وضعیت متفاوت و قابل گزارش‌گیری هستند.
- فرمول پیش‌فرض برای هر جزء مشمول در ارز خودش:
  - `Duty = Base × DutyRate`
  - `VAT = Base × VatRate`
  - `Total = Base + Duty + VAT`
- مبنای قانونی/قراردادی نباید در کد hard-code شود؛ `TaxBase` قابل تنظیم است (پیش‌فرض `Base`).
- هیچ تبدیل اجباری به ریال وجود ندارد.

### ۳. Snapshot در Quote/Order/Contract

`PricingSnapshot` شامل این موارد است:

- اجزای قیمت با `Base`, `VAT`, `Duty`, `Total` و ارز.
- جمع‌ها به تفکیک ارز (`TotalsByCurrency`).
- `BookingMode`.
- `CollectionMode`.
- `SellerOfRecord` و `InvoiceIssuer`.
- snapshot نرخ‌ها و وضعیت مالیات/عوارض.
- snapshot کمیسیون به تفکیک ارز.

Quote snapshot در زمان صدور قفل می‌شود. تبدیل FX، در صورت استفاده، با نرخ، منبع، زمان و اعتبار ثبت می‌شود. Order و Contract snapshot را بدون تغییر نگه می‌دارند.

### ۴. کمیسیون

- کمیسیون روی **Total همان ارز** شامل VAT و Duty محاسبه می‌شود.
- نرخ، ارز، دامنه شمول (IRR/USD/All)، مبنا و مبلغ نهایی در PricingSnapshot ثبت می‌شوند.
- `AgencyCommissionRule` باید `CurrencyScope`، `CommissionBase` (پیش‌فرض Total)، `AgreementId/ContractId` و Effective window داشته باشد.
- برای هر ارز یک `CommissionEntry` و یک LedgerTransaction مستقل ایجاد می‌شود.
- شناسایی کمیسیون فقط پس از تحقق فروش طبق قرارداد انجام می‌شود؛ تأیید اولیه Reservation کافی نیست.

### ۵. پرداخت چندارزی

- هر `PaymentIntent` فقط یک ارز دارد.
- هر Order می‌تواند چند `PaymentObligation` و چند `PaymentIntent` داشته باشد.
- یک Order مجموعه‌ای از تعهدات پرداخت است؛ پرداخت موفق یک ارز به معنای Paid شدن کل Order نیست.
- `PaymentStatus` مستقل از `OrderLifecycleStatus` است:
  - `Unpaid`, `PartiallyPaid`, `Paid`, `OfflineRecorded`.
- هر تعهد می‌تواند چند PaymentAttempt داشته باشد.
- در Online، Hani PaymentIntent و PSP را مدیریت می‌کند.
- در Reservation، Hani پیش‌فرض PaymentIntent با حساب Hani نمی‌سازد؛ وضعیت اعلام‌شده آژانس را ثبت می‌کند.
- اعلام پرداخت آژانس از تأیید واقعی پرداخت تفکیک می‌شود.

### ۶. BookingMode

- `BookingMode` در سطح `AgencyOffer` تعریف می‌شود.
- `Agency.DefaultBookingMode` مقدار پیش‌فرض را تعیین می‌کند.
- `Online`: Quote → Hold → Order → Payment → Confirmed.
- `ReservationRequest`: Request → PendingAgencyReview → AgencyConfirmed/Rejected → CustomerAcceptance → Payment/OfflineRecord → Confirmed.
- در ReservationRequest به‌صورت پیش‌فرض Hold ایجاد نمی‌شود.
- تغییر قیمت توسط آژانس نیازمند پذیرش مجدد مشتری است.
- پرداخت Reservation می‌تواند Online یا Offline باشد.

### ۷. Ledger

- دفتر دریافت وجه مشتری و دفتر کمیسیون Hani تفکیک می‌شوند.
- در Online، Hani وجه را دریافت می‌کند و می‌تواند `psp_cash` را در دفتر خود ثبت کند؛ تسویه با آژانس و بدهی مالیات/عوارض جدا ثبت می‌شود.
- در Reservation، Hani وجه مشتری را به‌عنوان نقد خود ثبت نمی‌کند.
- کمیسیون Hani در Reservation:
  - `Dr agency_commission_receivable`
  - `Cr commission_revenue`
- مالیات فاکتور کمیسیون Hani مستقل از VAT/Duty تور محاسبه می‌شود.
- حساب‌های `vat_payable` و `duty_payable` فقط در صورتی استفاده می‌شوند که مسئولیت مالیات با Hani باشد؛ `TaxLiabilityOwner` باید صریح ثبت شود.

### ۸. Invoice

- Customer Payment Receipt و Sales Invoice دو سند جدا هستند.
- `InvoiceIssuer` و `SellerOfRecord` روی فاکتور ثبت می‌شوند.
- خطوط فاکتور شامل `Base`, `VAT`, `Duty`, `Total` و `Currency` هستند.
- جمع‌ها به تفکیک ارز نگهداری می‌شوند.
- فاکتور کمیسیون Hani و فاکتور اشتراک Hani اسناد مستقل هستند.

### ۹. API و Legacy

- فقط API v1 وجود دارد؛ v2 ساخته نمی‌شود.
- قراردادهای v1 فعلی مستقیماً اصلاح می‌شوند؛ سازگاری عقب‌رو با قراردادهای آزمایشی لازم نیست.
- Migration/Backfill برای Legacy تجاری ساخته نمی‌شود.
- داده‌های آزمایشی فقط پس از تأیید محیط آزمایشی قابل بازنشانی هستند.
- OpenAPI بر اساس مدل نهایی بازتولید می‌شود.

## پیامدها

- `Money` تک‌ارزی برای Ledger باقی می‌ماند، اما PricingSnapshot چندارزی است.
- Offer، Quote، Order، Contract، Payment و Settlement همگی باید هم‌زمان تغییر کنند؛ انتشار نیمه‌کاره مجاز نیست.
- `PaymentIntent` دیگر unique روی Order نیست.
- `CommissionEntry` دیگر unique روی Order نیست؛ unique روی `(OrderId, Currency, Scope)` خواهد بود.
- همه رزروهای جدید باید PricingSnapshot و وضعیت مالیات/عوارض داشته باشند.
- هیچ نرخ قانونی VAT/Duty در کد hard-code نمی‌شود.

## موارد باز

- `TaxLiabilityOwner` (Hani یا Agency) باید در قرارداد/Offer صریح باشد و پیش‌فرض قانونی حدس زده نشود.
- نرخ‌های واقعی VAT/Duty و پشتیبانی PSPهای چندارزی خارج از این ADR و نیازمند تأیید جداگانه‌اند.

## جایگزین‌های رد شده

- **Supersede کامل ADR-0011:** مدل Online همچنان Hani-MoR است؛ حذف آن اشتباه است.
- **تبدیل اجباری همه ارزها به ریال:** خلاف تصمیم کسب‌وکار و نیاز مشتری.
- **ساخت v2:** پروژه تازه است و قرارداد آزمایشی ارزش حفظ ندارد.
- **ادامه مدل تک‌ارزی با فیلدهای tax جانبی:** چندارزی و گزارش‌گیری مالیاتی را نمی‌تواند پوشش دهد.
