# بازبینی مجدد Lastsecond و تطبیق با Baseline/Hani

- **تاریخ:** 2026-11-13
- **هدف:** بررسی مجدد صفحات عمومی Lastsecond و کشف تناقض با گزارش Baseline و پیاده‌سازی Gate 1
- **نتیجه کلی:** بیشتر یافته‌های گزارش اولیه تأیید شد؛ ۴ تناقض/نقص در پیاده‌سازی و ۲ تغییر رفتاری در سایت پیدا و اصلاح/ثبت شد.

---

## ۱. روش و صفحات بررسی‌شده

صفحات زیر با درخواست واقعی بررسی شدند:

- `/`، `/tours`، صفحه جزئیات تور (ارمنستان)
- `/hotels`، صفحه جزئیات هتل (کوناک پارک)
- `/visa`، صفحه جزئیات ویزا (ژاپن)
- `/flights`
- `/safarsaz`، `/blind-tour`
- `/itineraries`، صفحه جزئیات سفرنامه
- `/attractions`، `/restaurants`
- `/videos/{id}` (صفحه ویدیو) و `/videos` (لندینگ)
- `/auth/login`، `/auth/register`
- `/requests/agency/general-info`
- `/blog`
- `robots.txt`

**محدودیت:** پنل کاربری/آژانس، Checkout واقعی و فرم‌های بعد از ورود بررسی نشدند. `/requests/agency/general-info` فعلاً به ثبت‌نام هدایت می‌شود و شرایط همکاری به‌صورت عمومی قابل مشاهده نیست.

---

## ۲. یافته‌های تأییدشده گزارش اولیه

- مارکت‌پلیس مصرف‌محور با تور، هتل، ویزا، پرواز، سفرساز، بلایندتور، سفرنامه، بلاگ، جاذبه، رستوران و ویدیو.
- تور چندارزی است؛ نمونه واقعی: `135,000,000 تومان + 1,390 دلار`.
- صفحه تور شامل چند هتل، اتاق/MealPlan، قیمت Double/Single/Triple/Child/Infant، پرواز outbound/inbound، آژانس و «برای رزرو تماس بگیرید» است.
- هتل و ویزا عمدتاً Inquiry/Request هستند، نه رزرو آنی.
- سفرساز یک Lead/RFQ Marketplace با تطبیق بیش از ۲۰۰۰ آژانس است.
- هتل‌ها/جاذبه‌ها/رستوران‌ها دایرکتوری بزرگ با فیلتر، امتیاز، رتبه در شهر و نقد هستند.
- SEO شامل BreadcrumbList، FAQPage، LodgingBusiness، VideoObject و URLهای خوانا است.
- `robots.txt` فیلترهای faceted را محدود می‌کند.
- Lastsecond تک‌زبانه فارسی است؛ چندزبانه بودن Hani یک Hani-Better عمدی است، نه تناقض.

---

## ۳. تناقض‌ها/نقص‌های پیدا‌شده و اصلاح‌شده

### 3.1. انتخاب حداقل قیمت بین ارزها

**مشکل:** `search` و `compare` همه قیمت‌ها را بدون تفکیک ارز مقایسه می‌کردند؛ مثلاً `200 USD` را ارزان‌تر از `40,000,000 IRR` می‌دیدند.

**اصلاح:**
- افزودن `minPrices` به تفکیک ارز در `SearchProducts` و `OfferComparison`.
- مقایسه/مرتب‌سازی فقط داخل هر ارز.
- `MinPrice`/`Currency` قدیمی برای سازگاری حفظ شد ولی از ارز اصلی snapshot می‌آید.
- تست `Search_Should_Group_Min_Price_By_Currency` اضافه شد.

### 3.2. عدم نمایش گزینه‌های هتل/پرواز/مالیات در API عمومی

**مشکل:** GAP-02/03 Done شده بود، اما compare عمومی فقط قیمت سانس را برمی‌گرداند.

**اصلاح:**
- `OfferSnapshot` و compare اکنون `accommodationOptions`، `flightOptions` و `taxRules` را برمی‌گردانند.
- `DeparturePricingSnapshot` نیز گزینه‌های اقامت را برای انتخاب در Quote دارد.
- OpenAPI و Marketplace README به‌روز شد.

### 3.3. عدم استفاده از هتل انتخابی در Quote/Order/Contract

**مشکل:** مدل هتل وجود داشت، اما Quote همیشه از قیمت سانس استفاده می‌کرد و هتل انتخابی در Order/Contract ثبت نمی‌شد.

**اصلاح:**
- `CreateQuoteCommand` و API اکنون `accommodationOptionId` اختیاری دارند.
- قیمت بزرگسال از هتل/اتاق/MealPlan انتخابی و در هر ارز موجود خوانده می‌شود؛ کودک/نوزاد از قیمت سانس همان ارز.
- هتل انتخابی در `PricingSnapshot` و سپس Quote/Order/Contract snapshot می‌شود.
- Smoke Test: Quote با «Grand Deniz» → `unitPrice=60,500,000 IRR` و `total=138,600,000 IRR`؛ Order و Contract همان هتل را برگرداندند.

### 3.4. نمایش حداقل قیمت با قیمت کودک/نوزاد

**مشکل:** «شروع قیمت از» می‌توانست قیمت کودک را نشان دهد (مثلاً ۵ میلیون به‌جای ۸ میلیون).

**اصلاح:** حداقل قیمت فقط از RoomTypeهای بزرگسال (`Double/Single/Triple`) محاسبه می‌شود و در نبود آن به همه قیمت‌ها fallback می‌کند.

---

## ۴. تفاوت‌های باقی‌مانده که تناقض نیستند

| مورد | وضعیت |
|---|---|
| پرواز وابسته به هر تاریخ سانس | مدل فعلی FlightOption در سطح Offer است؛ تنوع پرواز per-departure در Baseline وجود ندارد. در صورت نیاز، Task جدید لازم است. |
| جاذبه‌های هر روز itinerary | GAP-01 فقط itinerary/meals/services/policies/required items را الزام کرده؛ جاذبه روزانه به GAP-13/25 مرتبط است. |
| رزرو آنلاین در برابر تماس/استعلام | GAP-05/GAP-18 در Gate 4 برنامه‌ریزی شده‌اند؛ Hani فعلاً Online-only است. |
| هتل/ویزا/پرواز/سفرساز کامل | GAP-06/14/15/16 در Gateهای بعدی هستند. |
| Reviews/UGC/Ads/Newsletter/SEO | طبق GAP-11/12/22/28/30/32/33 در Gateهای بعدی. |
| `/videos` لندینگ | در بازبینی، `/videos` محتوای بلاگ برگرداند ولی `/videos/{id}` کار می‌کند؛ این تغییر رفتار سایت است و روی GAP-12 تأثیری ندارد. |

---

## ۵. کیفیت پس از اصلاح

| شاخص | مقدار |
|---|---|
| Build | ۰ warning / ۰ error |
| Unit Tests | ۹۲ passed |
| Architecture Tests | ۳۳ passed |
| Total | **۱۲۵ passed** |
| Smoke | compare/search چندارزی + Quote/Order/Contract با هتل انتخابی |
| Migration drift | ندارد؛ تغییرات این بازبینی Migration جدید لازم نداشت |

---

## ۶. تصمیم

Gate 1 همچنان **PASSED** است؛ تناقض‌های عمومی اصلاح شدند. Gate 2 (Faceted Search + SEO) بدون تغییر باقی می‌ماند.
