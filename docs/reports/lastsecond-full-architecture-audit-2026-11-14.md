# Lastsecond — Full Architecture & Domain Audit

- **تاریخ Audit:** 2026-11-14
- **نوع سند:** Senior Software Architecture / Domain Audit
- **دامنه بررسی:** `https://lastsecond.ir` — صفحات عمومی، ساختار URL، دامنه‌ها، مدل‌های قابل استنباط، SEO، فرم‌ها، ناوبری، داده‌های SSR و robots
- **وضعیت سند:** Final for review — این سند جایگزین Baseline نیست
- **مرجع مقایسه:** `docs/plan/baseline.json`، `docs/plan/PHASE-CONTRACT.md`، `docs/plan/STATUS.md`، گزارش‌های Gate 1–4
- **هدف:** ثبت مدل دامنه Lastsecond از دید یک معمار ارشد، مقایسه با Hani پس از Gate 4، و گزارش شکاف‌ها/انحرافات قبل از شروع Gate 5

---

## ۱. خلاصه اجرایی

Lastsecond یک **Marketplace محتوامحور و Lead-Gen** است، نه یک سیستم تراکنشی کامل. صفحه «درباره ما» صریحاً می‌گوید:

> «هیچ گونه تراکنش و خریدی در سایت صورت نمی‌گیرد و مسافران در صورت تمایل به خرید تور فقط می‌بایست با آژانس مسافرتی فوق تماس تلفنی حاصل نمایند.»

در صفحه تور هم برای هتل‌ها عبارت «برای رزرو تماس بگیرید» و برای تور «شماره تماس آژانس» دیده می‌شود. بنابراین Lastsecond:

- کاتالوگ/محتوا/نقد و بررسی/سفرنامه/ویدیو/آژانس‌ها را عرضه می‌کند.
- کاربر را به آژانس وصل می‌کند (Lead/Request/Phone).
- پرداخت، قرارداد و مسئولیت فروش نزد آژانس است.
- در برخی صفحات، «درخواست رزرو» یا «اعلام مغایرت قیمت» دارد، اما Checkout واقعی ندارد.

Hani آگاهانه **Hani MoR + Online Checkout** را اضافه کرده است. این یک **Hani-Better** است، نه یک شکاف Lastsecond. اما همین تصمیم، دامنه‌های جدیدی را الزامی می‌کند که در Lastsecond وجود ندارند: Refund، Cancellation، Invoice، Payout، Reconciliation و Chargeback. این‌ها باید در Gate 7/8 و بخشی به‌صورت پیش‌نیاز Gate 5 دیده شوند.

### نتیجه کلی Audit

| حوزه | نتیجه |
|---|---|
| Gate 1 — Tour/Pricing | ✅ پایه خوب؛ اما Hotel همچنان denormalized است |
| Gate 2 — Discovery/SEO | ⚠️ Partial؛ taxonomy و sitemap و SEO copy ناقص |
| Gate 3 — Identity/Trust/Agency | ⚠️ Partial؛ Review criteria و Agency profile و Gamification ناقص |
| Gate 4 — Booking/Request/Lead | ⚠️ Conditional PASS؛ CollectionMode و InstallmentTerms انحراف دارند |
| Gate 5 — Verticals | ❌ هنوز شروع نشده؛ بدون اصلاح چند پیش‌نیاز، ورود به آن خطرناک است |
| Gate 6 — Content/Growth | ❌ تقریباً تمام دامنه‌های محتوایی/گیمیفیکیشن/تبلیغات/خبرنامه غایب‌اند |
| Gate 7 — Channel/Billing | ❌ Refund/Invoice/Payout/Reconciliation غایب‌اند |
| Gate 8 — Hardening | ❌ Read Model/Search Index/N+1/Performance هنوز حل نشده |

**توصیه معماری:** Gate 5 نباید بلافاصله شروع شود. ابتدا یک **Gate 4 Corrective Patch** و چند تصمیم ADR لازم است. سپس Gate 5 با دامنه بازتعریف‌شده (Canonical Hotel/Place/Visa/Flight + Geo + Inquiry) اجرا شود.

---

## ۲. روش بررسی و محدودیت‌ها

### ۲.۱. روش

- دریافت HTML خام صفحات عمومی با `Invoke-WebRequest` و ذخیره در محیط موقت برای تحلیل.
- بررسی Markdown/text تولیدشده از صفحات برای استخراج محتوا، فرم‌ها، ناوبری و JSON-LD.
- بررسی `robots.txt`.
- بررسی `__NUXT__` و data attributes برای شناسایی routeها و stateهای سمت کلاینت.
- بررسی لینک‌های داخلی برای کشف الگوهای URL و موجودیت‌ها.
- بررسی صفحات جزئیات (Tour، Hotel، Restaurant، Attraction، Visa، Flight Route، Itinerary، Blog، Video، Agency، User، Badge).
- بررسی گزارش‌های Baseline و کد فعلی Hani برای مقایسه.

### ۲.۲. محدودیت‌ها

- صفحات پشت احراز هویت (Dashboard، پنل آژانس، Checkout، پیام‌ها، آپلود مدارک) فقط از route/menu و متن عمومی قابل استنباط بودند.
- JS bundleها decompile نشدند؛ مدل‌های دقیق داخلی از UI، URL، JSON-LD و `__NUXT__` استخراج شده‌اند، نه از کد سرور.
- Lastsecond API عمومی مستند نیست؛ هاست‌های `api.lastsecond.ir` و `rapi.lastsecond.ir` فقط از HTML قابل مشاهده‌اند.
- شمارش‌ها مربوط به لحظه Audit هستند و ممکن است تغییر کنند.
- این سند **Baseline را تغییر نمی‌دهد**. پیشنهادهای جدید باید طبق قرارداد Gate با نسخه جدید Baseline و ADR ثبت شوند.

---

## ۳. معماری مشاهده‌شده Lastsecond

### ۳.۱. Frontend

Lastsecond یک معماری **Hybrid** دارد:

| بخش | فناوری قابل مشاهده | شواهد |
|---|---|---|
| اکثر صفحات | Nuxt/Vue SSR | `data-n-head-ssr`، `__NUXT__`، assetهای `last6-assets` |
| Flight pages | Laravel/Blade + JS مستقل | assetهای `resources/desktop/js/pages/flights-*` |
| Blind Tour | SPA مستقل | assetهای `/blind-tour/build/assets/*` |
| CDN | `cdn.lastsecond.ir` + `last-cdn.com` | تصاویر و assetها |
| API | `api.lastsecond.ir`، `rapi.lastsecond.ir` | در HTML و Ads click |

این Hybrid بودن، نشانه مهاجرت تدریجی از Laravel به Nuxt است. Hani از ابتدا Modular Monolith + API-first است و Frontend آن (Next.js) هنوز شروع نشده؛ این تفاوت برای Hani یک **بی‌خطر بودن فنی** است، اما ریسک «دیر رسیدن Frontend» را دارد.

### ۳.۲. مدل کسب‌وکار فنی

| ویژگی | Lastsecond | Hani |
|---|---|---|
| Unit of value | Tour/Hotel/etc. listing + lead | Tour/Hotel/etc. product + order |
| Checkout | ندارد | دارد (MoR) |
| Payment | کاربر به آژانس پرداخت می‌کند | Hani پرداخت را جمع می‌کند |
| Seller of Record | آژانس | Hani (در Online) |
| Commission | نامشخص/خارج از سیستم | Settlement Ledger دارد |
| Cancellation | سیاست متنی آژانس | باید وارد Order/Refund شود |
| Invoice | ندارد/آژانس | باید Hani صادر کند |
| Refund | خارج از سیستم | باید داخل سیستم باشد |

**نتیجه:** Hani نمی‌تواند فقط Lastsecond را «کپی» کند؛ Hani باید **Transaction Backbone** قوی‌تری داشته باشد. این یک انحراف مثبت است، اما اگر Refund/Invoice/Payout اضافه نشود، Gate 5 و 6 روی یک هسته ناقص ساخته می‌شوند.

### ۳.۳. SEO و URL

الگوهای URL مشاهده‌شده:

| موجودیت | الگو |
|---|---|
| Tour | `/tours/{id}-{slug}?itinerary={date}&bundle={id}` |
| Tour Landing | `/tours/{destination-slug}`، `/tours/installment-tours` |
| Hotel | `/hotels/{id}-{slug}` و سلسله‌مراتب `/hotels/{continent}/{country}/{city}` |
| Restaurant | `/restaurants/{id}-{slug}` و `/restaurants/{province}/{city}` |
| Attraction | `/attractions/{id}-{slug}` و سلسله‌مراتب قاره/کشور/استان/شهر |
| Visa | `/visa/{country}` |
| Flight Route | `/flights/{origin-iata}-{destination-iata}` |
| Itinerary | `/itineraries/{s...-slug}`، `/itineraries/{destination}` |
| Blog | `/blog/{id}-{slug}`، `/blog/{category}` |
| Video | `/videos/{id}-{slug}` |
| Agency | `/agencies/{id}-{slug}`، `/agencies/{province}/{city}` |
| Author | `/u/{username}`، `/badges/{username}`، `/authors/{id}` |
| Dashboard | `/dashboard/...`، `/requests/...` |
| Blind Tour | `/blind-tour` |
| Safarsaz | `/safarsaz` |
| Ads click | `https://api.lastsecond.ir/base/ads/go/{id}` |

JSON-LD مشاهده‌شده:

- `BreadcrumbList` تقریباً در همه صفحات.
- `LodgingBusiness` + `AggregateRating` در هتل.
- `FAQPage` در ویزا و صفحات راهنما.
- `VideoObject` در ویدیو.
- `TravelAgency` + `AggregateRating` در آژانس.
- `TravelAgency`/`Organization` در صفحات عمومی.
- `TouristTrip` در Hani وجود دارد، اما در Lastsecond برای Tour مشاهده نشد.

`robots.txt`:

- `/auth`, `/comments`, `/violations`, `/reviews/*/create`, `/amends/*/create`, `/videos/play/*`, `/files/cache/*`, `/airlines`, `/airports`, `/tour-wizard-api` را Disallow می‌کند.
- تقریباً همه query filterها را Disallow می‌کند: `adults`, `agencies`, `airlines`, `amenities`, `cabin`, `children`, `duration`, `hotelReviewScore`, `mealTypes`, `onlineOnly`, `onlineReservation`, `priceRanges`, `review_category`, `review_period`, `score`, `sort`, `tourTypes`, `travelTypes`, `vehicleTypes`, `sources` و ده‌ها مورد دیگر.
- در `robots.txt` هیچ `Sitemap:` directive وجود ندارد.
- `/sitemap.xml` و `/sitemap_index.xml` در زمان Audit 404 بودند و `/sitemap` transport error داد. این یک ضعف SEO در Lastsecond است؛ Hani نباید آن را کپی کند.

---

## ۴. Domain Inventory — آنچه Lastsecond واقعاً دارد

### ۴.۱. Catalog / Discovery

#### Destination

- سلسله‌مراتب: قاره → کشور → استان → شهر → منطقه/مقصد.
- الگوهای صفحه: `/hotels/asia`، `/hotels/turkey`، `/hotels/istanbul`، `/restaurants/iran`، `/restaurants/mazandaran-province`، `/attractions/qazvin`، `/agencies/tehran-province`.
- در Hani: `Destination` با `Country/Province/City/Region` و `Latitude/Longitude` وجود دارد؛ **Continent** ندارد ولی `Region` قابل استفاده است. برای هم‌خوانی با Lastsecond، بهتر است `Continent` یا یک سطح `Continent` در taxonomy اضافه شود.

#### Tour Product / Tour Offer

صفحه تور شامل:

- عنوان، مدت (روز/شب)، نوع تور (عادی/اقساطی/لوکس)، نوع سفر (هوایی/اتوبوسی/ریلی).
- مبدأ/مقصد، تاریخ رفت/برگشت، ظرفیت.
- مسیر پرواز/قطار: ایرلاین، شماره، فرودگاه/ایستگاه، ساعت، مدت، کابین، بار مجاز.
- هتل‌های تور: نام هتل، ستاره، شهر، شب، MealPlan، قیمت Double/Single/ChildWithBed/ChildWithoutBed/Infant به تومان/دلار/یورو.
- برنامه سفر، خدمات آژانس، مدارک لازم، توضیحات تکمیلی، قوانین کنسلی.
- شرایط اقساطی (در برخی تورها): حداقل ۳۰٪ نقدی، ۲ تا ۱۰ ماه، کارمزد ۵٪ ماهانه، چک صیادی، تعهدنامه.
- آژانس برگزارکننده، امتیاز آژانس، تلفن ماسک‌شده، «برای رزرو تماس بگیرید» یا «خرید آنلاین» (در واقع لینک به همان تور با bundle).
- «در صورت مغایرت قیمت اعلامی ... به ما اطلاع دهید».
- لینک به هتل‌ها، آژانس، تقویم قیمت، تاریخ‌های تور.

**مدل پیشنهادی Lastsecond:**

- `TourProduct`: shared content.
- `TourOffer/Bundle`: agency-specific package با `AgencyId`, `TourProductId`, `HotelId`, `RoomType`, `MealPlan`, `Flight/Transport`, `Price`, `Currency`, `DepartureDate`, `Capacity`, `CancellationPolicy`, `InstallmentTerms`, `BookingMode`.
- `TourDeparture`: تاریخ + ظرفیت + قیمت‌ها.
- `TourBundle`: ترکیب هتل/پرواز/اتاق.

Hani فعلی:

- `TourProduct` + `TourItineraryDay` + `Destination` در Catalog.
- `AgencyOffer` + `OfferAccommodationOption` + `OfferFlightOption` + `OfferTaxRule` + `TourDeparture` + `DeparturePrice`.
- `BookingMode`/`CollectionMode` در Gate 4.
- کمبودها: `HotelId` واقعی، `TourCategory` (عادی/اقساطی/لوکس)، `TravelType` (هوایی/اتوبوسی/ریلی)، `BundleId`، `InstallmentTerms`، `CancellationPolicy` ساختاریافته، `BookingMode` در سطح Offer/Departure، `Gallery`، `TourReview` criteria.

#### Hotel

صفحه هتل:

- نام فارسی/انگلیسی، Slug، ستاره، آدرس، شهر/کشور، مختصات و نقشه.
- امتیاز کل + تعداد نظرات + رتبه در شهر + «پیشنهاد کاربران» (٪).
- امکانات گروه‌بندی‌شده: عمومی، تفریحی، اینترنت، رستوران، پارکینگ، ترانسفر، باشگاه، استخر، ماساژ، سونا و…
- گالری با دسته‌بندی: خوراک/رستوران، فضای عمومی، اتاق، حمام.
- نقد و بررسی با ۶ معیار: کیفیت غذا، تمیزی، کارکنان، تفریحات، موقعیت، ارزش قیمت.
- فیلتر زمانی (۱/۳/۶ ماه/۱ سال)، نوع سفر، مرتب‌سازی (جدیدترین/لایک/امتیاز).
- «درخواست رزرو هتل» با تاریخ ورود/خروج، اتاق، بزرگسال، کودک؛ متن: «کارشناسان موجودی و بهترین قیمت را استعلام می‌کنند».
- تورهای مرتبط با این هتل + لینک buy online.
- مالکیت: «ثبت ادعای مالکیت»، «گزارش تخلف».
- JSON-LD: `LodgingBusiness` + `AggregateRating`.

Hani فعلی:

- هتل فقط به‌صورت `OfferAccommodationOption` با `HotelName` رشته‌ای، `HotelStars`، `RoomType`، `MealPlan` و قیمت.
- **هیچ موجودیت مستقل Hotel، صفحه هتل، گالری، امکانات، مختصات، رتبه، Review اختصاصی، Inquiry اختصاصی یا لینک به تورها وجود ندارد.**
- این برای Gate 1 کافی بود، اما برای Gate 5 (GAP-14) یک **بلاکر معماری** است.

#### Restaurant

صفحه رستوران:

- نام فارسی/انگلیسی، Slug، نوع (رستوران/کافه/آبمیوه و بستنی/شیرینی و آجیل).
- شهر/کشور/استان، آدرس، مختصات، نقشه.
- وعده‌های غذایی: شام/نهار/میان‌وعده/نوشیدنی.
- بازه قیمتی: `$`/`$$`/`$$$`.
- «امکان رزرو» و «امکان رزرو آنلاین» به‌صورت فیلتر.
- سبک آشپزی (ایرانی/سنتی/فست‌فود/پیتزا/…)، رژیم (حلال/گیاه‌خواری/بدون گلوتن)، امکانات.
- امتیاز + ۴ معیار: کیفیت، سرویس، جو و اتمسفر، قیمت نسبت به کیفیت.
- «اطراف رستوران»: رستوران‌ها/هتل‌ها/جاذبه‌ها/فرودگاه با فاصله.
- Reviews, photos, claim, violation report.

Hani: **هیچ‌کدام وجود ندارد.** Gate 5 GAP-13/29.

#### Attraction

صفحه جاذبه:

- نام فارسی/انگلیسی، Slug، نوع جاذبه (موزه/حمام تاریخی/طبیعی/تفریحی/…).
- شهر/استان/کشور، مختصات، نقشه.
- امتیاز + تعداد نظرات + رتبه در شهر + پیشنهاد کاربران.
- «اطراف جاذبه»: رستوران‌ها، هتل‌ها، جاذبه‌ها، مراکز مهم/فرودگاه با فاصله.
- گالری، نقد و بررسی، claim، violation.
- داده‌های تاریخی/توصیفی طولانی (محتوای غنی).

Hani: **هیچ‌کدام وجود ندارد.** Gate 5 GAP-13/25.

#### Visa

صفحه ویزا:

- کشور، نوع ویزا (توریستی/تجاری/کاری/تحصیلی/درمانی/ترانزیت).
- قیمت به تفکیک بزرگسال/کودک و ارز (یورو/دلار/درهم/پوند).
- زمان اخذ، اعتبار پس از صدور، نوع (e-Visa/Label/On-Arrival).
- مدارک لازم (پاسپورت، عکس، کارت ملی، شناسنامه، تمکن، بلیط، واچر، فرم TDAC/دعوت‌نامه/…).
- مراحل درخواست، دلایل ریجکت، FAQ، فرم درخواست ویزا (نوع ویزا + تعداد مسافران).
- «تماس با تیم ویزا»، شماره تماس.

Hani: **هیچ‌کدام وجود ندارد.** Gate 5 GAP-15/21.

#### Flight

صفحه `/flights` و `/flights/{origin}-{destination}`:

- Lastsecond خود را «متاسرچ» معرفی می‌کند: «خرید بلیط از معتبرترین وب‌سایت‌ها».
- مسیرهای پیشنهادی: THR-MHD, MHD-THR, THR-KIH, SYZ-THR, THR-SYZ, AWZ-THR, TBZ-THR.
- صفحه مسیر با JS مستقل، «تاکنون {{ total }} پرواز یافت شده است»، فیلتر.
- مدل به‌نظر **Metasearch/Redirect** است، نه Supplier Inventory مستقیم و نه Payment.

Hani: **هیچ‌کدام وجود ندارد.** Gate 5 GAP-16. تصمیم معماری لازم: Hani می‌خواهد Metasearch/Redirect باشد یا Inventory/Booking؟ Lastsecond دومی نیست.

### ۴.۲. Content / UGC

#### Blog

- 10,625 مطلب در زمان Audit.
- دسته‌بندی‌ها: معرفی جاذبه‌ها، مطالب جالب، خبر گردشگری، راهنمای شهرها، رستوران/خوراک، اطلاعات ضروری، خبر ویزا، خبر سایت، مراکز خرید، پیشنهاد ایرانگردی و…
- فیلدها: slug، title، excerpt، body، category، destination tags، author، cover، publish date، view count، rating/score، comments count، related posts، SEO.
- نویسنده‌ها: پروفایل نویسنده، bio، عکس، سایر نوشته‌ها.

Hani: **هیچ BlogPost/Content module وجود ندارد.** Gate 6 GAP-12.

#### Travelogue / Itinerary

- 2,113 سفرنامه.
- slug، title، body (غنی با تصاویر)، مقاصد (چندگانه)، سری/چندقسمتی، نویسنده، تاریخ، بازدید، امتیاز/لایک، کامنت، ویدیوهای مرتبط.
- فیلتر مقصد (اروپا/فرانسه/…).
- صفحه نویسنده با تعداد سفرنامه/ویدیو/نقد/نظر، سطح کاربری، امتیاز، نشان‌ها.
- سفرنامه‌ها از نظر محتوایی بسیار غنی و رسانه‌ای هستند.

Hani: **هیچ Travelogue module وجود ندارد.** Gate 6 GAP-12. `User` فعلی فقط `Bio` و `AvatarUrl` دارد؛ آمار و نشان ندارد.

#### Video

- 1,532 ویدیو.
- slug، title، description، category/destination، uploader، duration، view count، «سطح» (۰ تا ۷)، cover، Aparat/MP4 URL، upload date، related videos.
- JSON-LD `VideoObject`.
- `/videos/play/{id}` در robots Disallow شده.
- سطح (Level) و امتیاز کاربر/محتوا بخشی از gamification است.

Hani: **هیچ Video module وجود ندارد.** Gate 6 GAP-12. Media فعلی فقط ReviewPhoto/ClaimEvidence/Avatar/Other است.

### ۴.۳. Identity / Trust / Gamification

#### User / Author

- ثبت‌نام با موبایل، ورود با «موبایل / ایمیل / نام کاربری».
- Lastgram SSO/اتصال حساب.
- پروفایل عمومی: نام، شهر/استان، آواتار، bio، سفرنامه/ویدیو/نقد/نظر، سطح کاربری، امتیاز امسال/کل، نشان‌ها، سبک سفر.
- سبک سفر: با خانواده، عشق طبیعت، عشق تاریخ، بالای ۶۰ سال، گیاه‌خوار، شبگرد، شکم‌گرد.
- نشان‌ها (Badges): ۸ خانواده × ۵ سطح:
  - سفرنامه‌نویسی (۱/۳/۵/۱۰/۲۰ اثر)
  - ویدیوسازی (۱/۵/۱۵/۵۰/۱۰۰ اثر)
  - هتل‌گردی (۱/۵/۱۵/۵۰/۱۰۰ اثر)
  - رستوران‌گردی (۱/۵/۱۵/۵۰/۱۰۰ اثر)
  - جاذبه‌گردی (۱/۵/۱۵/۵۰/۱۰۰ اثر)
  - شهرگردی (۱/۵/۱۵/۵۰/۱۰۰ اثر)
  - نظرنویسی (۵/۲۵/۷۵/۲۵۰/۵۰۰ نظر)
  - برنامه‌ریز (۱/۳/۵/۱۰/۲۰ اثر — «به زودی»)
- سطح کاربری ۱ تا ۴ (نمونه: ۴).
- امتیازها باعث دسترسی به آفرها/تخفیف‌ها/قرعه‌کشی می‌شوند.
- محتوای تأییدشده توسط تیم بررسی، امتیاز می‌گیرد؛ صرف ارسال محتوا امتیاز نیست.

Hani فعلی: `User` با Mobile/Email/Username/Name/Bio/Avatar/Role/Status، OTP/JWT. **هیچ Level/Points/Badge/TravelStyle/Lastgram/Username-or-Email Login وجود ندارد.**

#### Review

- Target: Tour/Hotel/Agency/Attraction/Restaurant (در Hani enum هست).
- Lastsecond criteria به‌تفکیک نوع:
  - Hotel: food, cleanliness, staff, entertainment/facilities, location, value.
  - Restaurant: quality, service, atmosphere, price.
  - Agency: staff, location, documents, support, contract compliance, tour leader, price.
  - Attraction: overall only.
  - Tour: likely overall + criteria (مشاهده نشد).
- فیلدها: overall، criteria، title، body، travel type (family/solo/couple/business/other)، visit/stay date، photos، helpful، report.
- Proof:
  - Hotel داخل ایران: «واچر هتل» لازم است.
  - Agency: «قرارداد اسکن‌شده» لازم است.
- Owner response: «آیا شما صاحب این کسب‌وکار هستید؟ ... برای پاسخ به نظرات ... مالکیت خود را ثبت کنید».
- Moderation/ranking: helpful, report, sort.

Hani فعلی: `Review` با `FoodRating`, `CleanlinessRating`, `StaffRating`, `EntertainmentRating`, `LocationRating`, `ValueRating` — **مدل هتل‌محور**. برای Restaurant/Agency criteria ندارد. Proof هم ندارد. Owner reply ندارد. Aggregate rating per entity/rank ندارد.

#### Claim / Violation / Amendment

- Ownership Claim (`/requests?type=hotel&spotId=...`).
- Correction request (متن صفحه هتل: «اگر اطلاعات مغایرت دارد ... فرم مربوطه»).
- Violation report (`گزارش تخلف`) در آژانس/نظرات.
- Amendment (`/amends/*/create`) در robots.
- Hani فعلی: ClaimType فقط `Ownership` و `Correction`؛ **ViolationReport و AmendmentRequest ندارد.**

### ۴.۴. Agency

صفحه آژانس:

- نام فارسی/انگلیسی، slug، لوگو، about.
- مجوز: «بند ب»، شماره مجوز، تاریخ مجوز، فایل دانلود مجوز.
- مدیرعامل، تعداد پرسنل، آدرس، شهر/استان، تلفن ماسک‌شده، وب‌سایت، شبکه‌های اجتماعی.
- تاریخ عضویت، وضعیت (فعال/قطع همکاری)، تعداد تور.
- امتیاز + ۷ معیار: برخورد/دانش پرسنل، موقعیت، تحویل مدارک، پشتیبانی، پایبندی به قرارداد، تعهد تورلیدر، قیمت نسبت به بازار.
- تورهای آژانس، نقد و بررسی، claim، violation.
- «در این آژانس کار می‌کنم» (احتمالاً برای اتصال پرسنل).

Hani فعلی:

- `Agency` با Slug/Name/LicenseNo/City/Status/Subscription/Owner/Website/Contact/About/Documents.
- `PublicAgencyDto` بدون امتیاز، تعداد نظر، تعداد تور، مجوز (نوع/تاریخ/فایل)، مدیرعامل، پرسنل، آدرس، وضعیت عمومی، تلفن ماسک‌شده.
- **برای Gate 3 کافی نبوده/ناقص است؛ Gate 5 و 7 به آن وابسته‌اند.**

### ۴.۵. Lead / Request / Dashboard

#### Safarsaz

- ۶ نوع درخواست: رزرو تور، هتل، بلیط هواپیما، ویزا، طراحی، تور اختصاصی.
- تطبیق با «بیش از ۲۰۰۰ آژانس فعال».
- دریافت بهترین پیشنهادها.

Hani Gate 4: `LeadRequest` با ۶ نوع `Tour/Hotel/Flight/Visa/Design/Custom`، `DistributeLead` به همه آژانس‌های Active، Match/Close. ✅ پوشش خوب. کمبود: پاسخ آژانس‌ها/پیشنهاد قیمت در Lead و مقایسه پیشنهادها وجود ندارد؛ فقط دعوت و تطبیق (Match).

#### Dashboard (از `__NUXT__`):

- dashboard
- tour-requests
- trip-requests
- service-requests
- travel-requests
- payment-requests
- user-discrete-documents
- user_passengers
- comments
- violations
- reviews
- travelogues
- videos
- competitions
- amends
- messages

Hani: هیچ‌کدام از این dashboardها/aggregateها وجود ندارد (به‌جز review/claim/media). این‌ها در Gate 6/7 باید مدل شوند.

### ۴.۶. Ads / Growth

- صفحه تبلیغات: شرایط همکاری آژانس، مجوز بند ب، وب‌سایت فعال، حداقل یک نفر IT تمام‌وقت، به‌روزرسانی روزانه، اولویت آژانس‌های چارتر/مقاصد خاص/شهرستان.
- Ad slots: `home-below-tours`, `F`, `F+`, `K`, `A` (نمونه در HTML).
- Ad click API: `https://api.lastsecond.ir/base/ads/go/{id}`.
- Newsletter/SMS: «خبرنامه پیامکی»، دریافت موبایل، verification code، توکن، retry/cooldown.
- Call-back request: «شماره خود را وارد کنید تا ما با شما تماس بگیریم».
- Blind Tour: کمپین مستقل، ثبت‌نام آنلاین/تلفنی/حضوری، خبرنامه SMS، تاریخ/مقصد/قیمت/تخفیف/FAQ.
- Hani: هیچ Ads/Newsletter/SMS/Campaign/Competition ندارد. Gate 6 GAP-22/23/30/33.

### ۴.۷. Payment / Settlement / Refund

Lastsecond تراکنش ندارد. Hani دارد.

Hani فعلی:

- PaymentIntent + PSP mock + webhook + HMAC + dedupe.
- PaymentObligation per currency.
- OfflinePaymentReceipt (Gate 4).
- CommissionEntry + Ledger (Gate 1).
- **Refund/Chargeback/Invoice/Payout/Reconciliation وجود ندارد.**
- **Order cancellation method وجود ندارد** (فقط enum `Cancelled`).
- **CancellationPolicy ساختاریافته وجود ندارد** (فقط متن در ترجمه تور).
- **InstallmentPlan** فقط schedule است؛ down payment/monthly fee/cheque/guarantee ندارد.

---

## ۵. Page Inventory — تمام صفحات بررسی‌شده

| # | صفحه | هدف | موجودیت‌های اصلی | اقدام‌ها | Auth | SEO/Schema | وضعیت Hani |
|---|---|---|---|---|---|---|---|
| 1 | `/` | Home | Tour, Hotel, Visa, Blog, Itinerary, Ad, Newsletter | Search, Ad click, SMS opt-in | عمومی | BreadcrumbList, Organization | Partial (Tour only) |
| 2 | `/tours` | Tour landing | Tour, Destination, Agency | Search, Filter | عمومی | Breadcrumb | Partial |
| 3 | `/tours?list` | Tour listing | Tour, Offer, Departure | Filter/Sort/Search | عمومی | Breadcrumb (filter noindex) | Partial |
| 4 | `/tours/installment-tours` | Installment landing | Tour, InstallmentTerms | Filter/Sort | عمومی | Breadcrumb, FAQPage | Partial (InstallmentPlan only) |
| 5 | `/tours/{id}-{slug}` | Tour detail | Tour, Hotel, Flight, Agency, Departure, Installment | Call, Bundle, Calendar, Price mismatch | عمومی | Breadcrumb | Partial |
| 6 | `/hotels` | Hotel landing | Hotel, Destination | Search/Filter | عمومی | Breadcrumb | ❌ |
| 7 | `/hotels?list` | Hotel listing | Hotel, City, Amenities, Review | Filter/Sort | عمومی | Breadcrumb (filter noindex) | ❌ |
| 8 | `/hotels/{id}-{slug}` | Hotel detail | Hotel, Room, Review, Tour, Claim | Inquiry, Review, Claim, Gallery | عمومی | LodgingBusiness, AggregateRating, Breadcrumb | ❌ |
| 9 | `/restaurants` | Restaurant landing | Restaurant, City | Search/Filter | عمومی | Breadcrumb | ❌ |
| 10 | `/restaurants?list` | Restaurant listing | Restaurant, Cuisine, Meal, PriceBand | Filter/Sort | عمومی | Breadcrumb | ❌ |
| 11 | `/restaurants/{id}-{slug}` | Restaurant detail | Restaurant, Review, Nearby | Review, Claim | عمومی | Breadcrumb (no Restaurant schema seen) | ❌ |
| 12 | `/attractions` | Attraction landing | Attraction, City | Search/Filter | عمومی | Breadcrumb | ❌ |
| 13 | `/attractions?list` | Attraction listing | Attraction, Category | Filter/Sort | عمومی | Breadcrumb | ❌ |
| 14 | `/attractions/{id}-{slug}` | Attraction detail | Attraction, Review, Nearby | Review, Claim | عمومی | Breadcrumb | ❌ |
| 15 | `/visa` | Visa landing | VisaCountry, VisaType | Search | عمومی | Breadcrumb, FAQPage | ❌ |
| 16 | `/visa/{country}` | Visa detail | VisaType, Price, Document, FAQ | Request, Call | عمومی | FAQPage, Breadcrumb | ❌ |
| 17 | `/flights` | Flight landing | Route, Provider | Search | عمومی | Breadcrumb, Organization | ❌ |
| 18 | `/flights/{origin}-{dest}` | Flight route | FlightOffer, Airline, Airport | Search/Filter/Redirect | عمومی (login for booking) | Breadcrumb | ❌ |
| 19 | `/safarsaz` | Lead/RFQ | LeadServiceType, Agency | Submit | عمومی | Breadcrumb? | ✅ (LeadRequest) |
| 20 | `/blind-tour` | Campaign | Campaign, Registration, FAQ | Newsletter, Accept rules | عمومی | Breadcrumb | ❌ |
| 21 | `/itineraries` | Travelogue listing | Travelogue, Destination, Author | Filter/Sort | عمومی | Breadcrumb | ❌ |
| 22 | `/itineraries?list` | Travelogue listing | Travelogue, Destination | Filter/Sort | عمومی | Breadcrumb | ❌ |
| 23 | `/itineraries/{slug}` | Travelogue detail | Travelogue, Author, Comment, Media | Comment, Like/Rating | عمومی | Breadcrumb | ❌ |
| 24 | `/blog/` | Blog listing | BlogPost, Category, Author | Search/Filter | عمومی | Breadcrumb | ❌ |
| 25 | `/blog/{slug}` | Blog detail | BlogPost, Author, Comment, Related | Comment, Rating | عمومی | Breadcrumb | ❌ |
| 26 | `/videos` | Video listing | Video, Author, Level | Search | عمومی | Breadcrumb | ❌ |
| 27 | `/videos?list` | Video listing | Video, Author, Level | Search | عمومی | Breadcrumb | ❌ |
| 28 | `/videos/{slug}` | Video detail | Video, Author, Related | View, Comment? | عمومی | VideoObject, Breadcrumb | ❌ |
| 29 | `/agencies` | Agency listing | Agency, City, License | Filter/Sort | عمومی | Breadcrumb | Partial |
| 30 | `/agencies?list` | Agency listing | Agency, City, Status | Filter/Sort | عمومی | Breadcrumb | Partial |
| 31 | `/agencies/{id}-{slug}` | Agency detail | Agency, License, Review, Tour | Claim, Review, Call | عمومی | TravelAgency, AggregateRating, Breadcrumb | Partial |
| 32 | `/u/{username}` | Author profile | User, Badge, Stats, TravelStyle | Follow? | عمومی | Breadcrumb | Partial |
| 33 | `/badges/{username}` | Badge profile | Badge, Level, Points | — | عمومی | Breadcrumb | ❌ |
| 34 | `/authors/{id}` | Author content | BlogPost, Author | — | عمومی | Breadcrumb | Partial |
| 35 | `/auth/login` | Login | User, Lastgram | Mobile/email/username | عمومی | noindex | ✅ (OTP only) |
| 36 | `/auth/register` | Register | User | Mobile OTP | عمومی | noindex | ✅ |
| 37 | `/reviews/create` | Review form | Review, Proof | Submit | Auth | noindex | Partial |
| 38 | `/requests?type=hotel&spotId=` | Claim/Request | Claim, Hotel | Submit | Auth | noindex | Partial |
| 39 | `/requests/agency/general-info` | Agency onboarding | Agency, License, Document | Submit/Register | Auth | noindex | Partial |
| 40 | `/pages/aboutus` | About | Company | — | عمومی | Breadcrumb | ✅ |
| 41 | `/pages/advertisement` | Advertise | Agency, Ad | Email | عمومی | Breadcrumb | ❌ |
| 42 | `/robots.txt` | Crawler policy | — | — | عمومی | — | Partial |
| 43 | `/sitemap.xml` (404) | Sitemap | — | — | عمومی | — | Partial (Hani better) |

> صفحه‌های Dashboard، Checkout، Messages، Documents، Passengers، Competitions، Amends، Violations فقط از routeها/منوها شناسایی شده‌اند و در این Audit محتوای پشت Auth بررسی نشده است.

---

## ۶. شمارش‌های عمومی (Audit Snapshot)

| موجودیت | تعداد قابل مشاهده | منبع |
|---|---|---|
| Tour (لیست خارجی جاری) | ۱۳۲ | `/tours?list` |
| Tour (ادعای صفحه) | ۸۰۰+ | `/tours` |
| Tour اقساطی | ۱۹ | `/tours/installment-tours` |
| Hotel | ۱۰,۰۶۲ | `/hotels?list` |
| Restaurant | ۸,۷۵۱ | `/restaurants?list` |
| Attraction | ۱۰,۴۴۳ | `/attractions?list` |
| Agency | ۲,۱۰۵ | `/agencies?list` |
| Travelogue | ۲,۱۱۳ | `/itineraries?list` |
| Blog | ۱۰,۶۲۵ | `/blog/` |
| Video | ۱,۵۳۲ | `/videos?list` |
| Visa country | ۲۵+ | `/visa` |
| Flight route | ۷ پیشنهادی | `/flights` |

---

## ۷. مقایسه با Hani پس از Gate 4

### ۷.۱. Covered / Mostly Covered

| قابلیت Lastsecond | Hani | وضعیت |
|---|---|---|
| Tour content + itinerary + services + policies | Gate 1 | ✅ |
| Multi-currency + VAT/Duty | Gate 1 | ✅ |
| Offer accommodation/flight options | Gate 1 | ✅ (denormalized) |
| Faceted search/sort | Gate 2 | ✅ (پایه) |
| Canonical/hreflang/JSON-LD/sitemap | Gate 2 | ⚠️ ناقص |
| User OTP/JWT/profile/author | Gate 3 | ✅ (پایه) |
| Agency onboarding/documents/admin | Gate 3 | ✅ (پایه) |
| Reviews multi-criteria/photos/report | Gate 3 | ⚠️ هتل‌محور |
| Claims | Gate 3 | ✅ (Ownership/Correction) |
| Media moderation | Gate 3 | ✅ (پایه) |
| Online booking/order/contract | Gate 4 | ✅ |
| Reservation request | Gate 4 | ✅ |
| Lead/RFQ + distribution | Gate 4 | ✅ |
| Price mismatch | Gate 4 | ✅ (فقط Offer) |
| Installments | Gate 4 | ⚠️ ساده‌شده |
| Offline payment | Gate 4 | ⚠️ دوحالتی |
| Payment/Commission/Ledger | Gate 1/4 | ✅ |

### ۷.۲. Partial / Deviation

| موضوع | Lastsecond | Hani | ریسک |
|---|---|---|---|
| CollectionMode | HaniOnline/AgencyOnline/AgencyOffline (ADR-0024) | `Online/Offline` | انحراف از ADR |
| SellerOfRecord/InvoiceIssuer | ندارد (همه آژانس) | تعریف نشده | برای MoR حیاتی |
| Installment | ۳۰٪ نقد، ۲–۱۰ ماه، ۵٪ ماهانه، چک صیادی، تعهدنامه | ۲–۱۲ قسط مساوی، بدون پیش‌پرداخت/کارمزد/چک | GAP-17 ناقص |
| Installment eligibility | تگ «اقساطی» روی تور + فیلتر | فقط plan بعد از Order | جستجو/فیلتر ندارد |
| Review criteria | per entity (Hotel/Restaurant/Agency/Attraction) | Hotel-centric | GAP-11 ناقص |
| Review proof | واچر هتل / قرارداد آژانس | ندارد | Trust gap |
| Agency public profile | مجوز/مدیر/پرسنل/آدرس/امتیاز/۷ معیار | فقط Name/City/About/Contact | GAP-26/27 ناقص |
| Hotel canonical | موجودیت Hotel + صفحه + Review + Inquiry | فقط نام رشته‌ای در Offer | Gate 5 blocker |
| Geo/Nearby | فاصله تا رستوران/هتل/جاذبه/فرودگاه | فقط Destination lat/lng | Gate 5 blocker |
| Search taxonomy | tourTypes/travelTypes/amenities/score/... | بخشی از فیلترها | Gate 2/5 gap |
| SEO | Breadcrumb/Lodging/FAQ/Video schema | فقط Tour/Destination | Gate 2/5/6 gap |
| Sitemap | ندارد (ضعف Lastsecond) | فقط Tour/Destination | Gate 2/5/6 gap |
| SEO copy | فارسی | بخشی hardcoded انگلیسی | i18n gap |
| Content | Blog/Travelogue/Video | ندارد | Gate 6 |
| Gamification | Badge/Level/Points/TravelStyle | ندارد | Gate 6/New |
| Ads/Newsletter/Campaign | دارد | ندارد | Gate 6 |
| Dashboard requests/passengers/documents/messages | دارد | ندارد | Gate 6/7 |
| Cancellation/Refund/Invoice/Payout | خارج از سیستم | ندارد | Gate 7/8 |
| Flight | Metasearch/Redirect | ندارد | Gate 5 |
| Visa | کامل | ندارد | Gate 5 |
| Restaurant/Attraction | کامل | ندارد | Gate 5 |

### ۷.۳. Hani-Better (عمدی)

| قابلیت | ارزش |
|---|---|
| Online Checkout + Hani MoR | تجربه خرید واقعی، درآمد کمیسیون، کنترل کیفیت |
| Multi-currency + VAT/Duty snapshot | شفافیت قیمت و حسابداری |
| ProblemDetails + CorrelationId | پشتیبانی و Observability بهتر |
| Config-driven FA/EN/AR | ورود به بازار چندزبانه (Lastsecond ندارد) |
| Supplier API + Channel API | مقیاس B2B (Lastsecond API عمومی ندارد) |
| Automated tests + Architecture tests | کیفیت بلندمدت |

**نتیجه:** Hani نباید Lastsecond را در «نداشتن تراکنش» کپی کند. اما باید دامنه‌های Transaction (Refund/Invoice/Payout) را جدی بگیرد.

---

## ۸. Deviation Register

| ID | انحراف | شاهد | شدت | Gate مرتبط | اقدام |
|---|---|---|---|---|---|
| DEV-01 | Lastsecond تراکنش ندارد؛ Hani MoR دارد | About + Tour pages | Info | Gate 1/7 | ثبت به‌عنوان Hani-Better + تکمیل Refund/Invoice |
| DEV-02 | `CollectionMode` دوحالتی؛ ADR-0024 سه‌حالتی + Seller/Invoice | `PricingSnapshot.cs`, ADR-0024 | High | Gate 1/4 | ADR-0026 + migration |
| DEV-03 | InstallmentTerms کامل نیست | Tour 277731 | High | Gate 4 | down payment/fee/cheque/terms |
| DEV-04 | Review criteria هتل‌محور | `Review.cs` | High | Gate 3/5 | criteria template per target |
| DEV-05 | Review proof ندارد | Hotel/Agency pages | High | Gate 3 | proof type + moderation |
| DEV-06 | Agency public profile ناقص | `PublicAgencyDto` | Medium | Gate 3/5 | license/manager/staff/address/rating |
| DEV-07 | Hotel canonical ندارد | `OfferAccommodationOption` | Critical | Gate 5 | Hotel aggregate + HotelId |
| DEV-08 | Geo/Nearby graph ندارد | Attraction/Restaurant pages | Critical | Gate 5 | Place/Geo/Nearby |
| DEV-09 | Search taxonomy ناقص | `/tours?list` filters | High | Gate 2/5 | TourCategory/TravelType/MultiSelect |
| DEV-10 | Sitemap فقط Tour/Destination | `SeoMetadataBuilder` | Medium | Gate 2/5/6 | sitemap per vertical |
| DEV-11 | SEO copy hardcoded انگلیسی | `SeoQueryHandlers` | High | Gate 2 | localized copy from translations |
| DEV-12 | Content/Blog/Travelogue/Video غایب | `/blog`, `/itineraries`, `/videos` | High | Gate 6 | Content module |
| DEV-13 | Gamification غایب | `/badges`, `/u` | Medium | Gate 6/New | Badge/Level/Points |
| DEV-14 | Ads/Newsletter/Campaign غایب | `/pages/advertisement`, blind-tour | Medium | Gate 6 | Growth module |
| DEV-15 | Dashboard requests/passengers/documents/messages غایب | NUXT menu | High | Gate 6/7 | Request/Document/Message |
| DEV-16 | Refund/Cancellation/Invoice/Payout غایب | Payments README | Critical | Gate 7/8 | Refund/Invoice/Payout |
| DEV-17 | Order cancel method ندارد | `Order.cs` | High | Gate 4/7 | Cancel + compensation |
| DEV-18 | Auth فقط OTP؛ Lastsecond email/username/Lastgram | `/auth/login` | Low/Medium | Gate 3/7 | optional password/email/SSO |
| DEV-19 | Flight model مشخص نیست | `/flights` | High | Gate 5 | ADR: Metasearch vs Inventory |
| DEV-20 | Performance/read model ندارد | `SearchProductsQueryHandler` N+1 | High | Gate 8 | Read Model/Index |

---

## ۹. Action Register — پیش‌نیاز Gate 5

### 9.1. P0 — قبل از شروع Gate 5

| ID | اقدام | نتیجه |
|---|---|---|
| A-01 | ADR-0026: `CollectionMode` v2 + `SellerOfRecord`/`InvoiceIssuer` | رفع DEV-02 |
| A-02 | افزودن `InstallmentTerms` به Offer + snapshot + search filter | رفع DEV-03 |
| A-03 | Review criteria template per target + proof + owner reply | رفع DEV-04/05 |
| A-04 | تکمیل PublicAgency + license/manager/staff/address/rating | رفع DEV-06 |
| A-05 | طراحی Canonical Hotel + اتصال `OfferAccommodationOption.HotelId` | رفع DEV-07 |
| A-06 | طراحی Place/Geo/Nearby برای Restaurant/Attraction | رفع DEV-08 |
| A-07 | تصمیم ADR Flight (Metasearch/Redirect یا Inventory) | رفع DEV-19 |
| A-08 | افزودن `TourCategory` + `TravelType` + multi-select filters | رفع DEV-09 |

### 9.2. P1 — در Gate 5 همراه با Verticalها

| ID | اقدام |
|---|---|
| B-01 | Hotel aggregate + hotel page API + inquiry request |
| B-02 | Restaurant aggregate + menu/meal/price band/amenity + reservation |
| B-03 | Attraction aggregate + nearby graph |
| B-04 | VisaCountry/VisaType/VisaApplication + documents/FAQ/price |
| B-05 | FlightRoute/Airline/Airport/FlightOffer + deep link |
| B-06 | Geo search + distance + city/province landing |
| B-07 | Vertical SEO (Hotel/Restaurant/Attraction/Visa/Flight) + sitemap |
| B-08 | Vertical review criteria + aggregate ratings + rank |

### 9.3. P1 — Gate 6

| ID | اقدام |
|---|---|
| C-01 | BlogPost/Category/Author/Comment |
| C-02 | Travelogue + series + media + comments |
| C-03 | Video + Aparat/MP4 + level + stats |
| C-04 | Badge/Level/Points/TravelStyle + author profile |
| C-05 | Ads/AdSlot/AdEvent |
| C-06 | Newsletter/SMS consent/campaign |
| C-07 | BlindTour/Campaign |
| C-08 | Dashboard: tour/trip/service/travel/payment requests, passengers, documents, messages, competitions, amends, violations |

### 9.4. P0/P1 — Gate 7/8

| ID | اقدام |
|---|---|
| D-01 | CancellationPolicy + Order.Cancel + seat release |
| D-02 | Refund + PSP refund + ledger reversal |
| D-03 | Invoice + SellerOfRecord/InvoiceIssuer |
| D-04 | Agency payout + settlement terms |
| D-05 | Reconciliation + chargeback |
| D-06 | Search Read Model + index + cache + N+1 removal |
| D-07 | Sitemap/robots/SEO per vertical + localized copy |
| D-08 | Load tests + SLO |

---

## ۱۰. پیشنهاد Baseline v2 (بدون تغییر خاموش)

طبق قرارداد Gate، این Audit نباید `baseline.json` را دستی تغییر دهد. پیشنهاد می‌شود نسخه بعدی Baseline با ADR و تأیید، GAPهای زیر را اضافه/تفکیک کند:

| پیشنهاد | عنوان | اولویت | Gate |
|---|---|---|---|
| GAP-35 | Canonical Hotel + Hotel Review/Inquiry | P0 | 5 |
| GAP-36 | Place/Geo/Nearby Graph | P0 | 5 |
| GAP-37 | Review Criteria Templates + Proof | P0 | 3/5 |
| GAP-38 | Installment Terms + Cheque/DownPayment/Fee | P0 | 4 |
| GAP-39 | Order Cancellation/Refund/Invoice | P0 | 7 |
| GAP-40 | Content: Blog/Travelogue/Video | P1 | 6 |
| GAP-41 | Gamification: Badge/Level/Points/TravelStyle | P2 | 6 |
| GAP-42 | Ads + Newsletter + Campaign | P2 | 6 |
| GAP-43 | Dashboard Requests/Passengers/Documents/Messages | P1 | 6 |
| GAP-44 | Search Read Model/Performance | P1 | 8 |

> قبل از افزودن این‌ها به `baseline.json`، `BaselineCoverageTests` باید به‌روزرسانی شود و ADR مربوطه ثبت شود. این سند فقط پیشنهاد است.

---

## ۱۱. تصمیم‌های معماری پیشنهادی

| ADR | موضوع | چرا |
|---|---|---|
| ADR-0026 | CollectionMode v2 + SellerOfRecord/InvoiceIssuer | رفع انحراف ADR-0024 و آماده‌سازی MoR |
| ADR-0027 | Vertical Content Model: Hotel/Place/Visa/Flight | جلوگیری از مدل‌های موازی و denormalized |
| ADR-0028 | Search Read Model & Indexing | 10k+ hotel/restaurant/attraction و N+1 فعلی |
| ADR-0029 | Content/Gamification/Ads boundaries | Gate 6 بزرگ است؛ Bounded Context لازم |
| ADR-0030 | Refund/Cancellation/Invoice/Payout | Hani MoR بدون این‌ها ناقص است |

---

## ۱۲. ریسک‌ها

| ریسک | اثر | کاهش |
|---|---|---|
| ورود به Gate 5 با هتل denormalized | بازنویسی گسترده Offer/Booking | A-05 قبل از Gate 5 |
| Installment بدون cheque/terms | عدم تطابق با بازار ایران | A-02 |
| Review هتل‌محور | نمی‌توان Restaurant/Agency را معتبر سنجید | A-03 |
| Sitemap ناقص | از دست رفتن SEO 10k+ صفحه | B-07/D-07 |
| Search N+1 | افت شدید performance با 10k+ موجودیت | D-06 |
| Refund/Invoice غایب | شکست عملیاتی MoR | D-01..D-05 |
| Gamification/Content غایب | از دست رفتن تمایز UGC و بازگشت کاربر | Gate 6 |
| Lastsecond content copy | ریسک کپی‌رایت/کیفیت | تولید محتوای اصیل و ترجمه |

---

## ۱۳. نتیجه‌گیری

Lastsecond از دید معماری، یک **Content + UGC + Lead-Gen Marketplace** است با عمق زیاد در دامنه‌های:

- Tour/Hotel/Restaurant/Attraction/Visa/Flight discovery
- Reviewهای چندمعیاره با proof
- Travelogue/Video/Blog
- Agency/Trust
- Lead/Safarsaz
- Ads/Newsletter/Gamification

Hani پس از Gate 4 در **Transaction Backbone** قوی‌تر است، اما در **Vertical Depth** و **Content/UGC/Growth** بسیار عقب‌تر است. Gate 5 و 6 باید این عقب‌ماندگی را جبران کنند؛ نه با کپی سطحی، بلکه با مدل‌های دامنه درست.

### حکم نهایی Audit

- **Gate 4 از نظر قابلیت‌های اصلی PASS است، اما از نظر دو انحراف مهم (CollectionMode و InstallmentTerms) Conditional PASS است.**
- **Gate 5 نباید قبل از A-01 تا A-08 شروع شود.**
- **Baseline فعلی برای Gate 5 کافی نیست؛ باید با GAPهای Canonical Hotel/Place/Geo/Review/Content توسعه یابد.**
- **Hani-Better (MoR/Online/Multilingual) باید حفظ شود، اما Refund/Invoice/Payout باید به Gate 7 اضافه شود.**

---

## پیوست A — URLهای بررسی‌شده

- `https://lastsecond.ir/`
- `https://lastsecond.ir/tours`
- `https://lastsecond.ir/tours?list`
- `https://lastsecond.ir/tours/installment-tours`
- `https://lastsecond.ir/tours/276869-...`
- `https://lastsecond.ir/tours/277731-...`
- `https://lastsecond.ir/tours/278021-...?...`
- `https://lastsecond.ir/hotels`
- `https://lastsecond.ir/hotels?list`
- `https://lastsecond.ir/hotels/11603-tryp-by-wyndham-istanbul-beyoglu`
- `https://lastsecond.ir/restaurants`
- `https://lastsecond.ir/restaurants?list`
- `https://lastsecond.ir/restaurants/3637-gilaneh-restaurant`
- `https://lastsecond.ir/attractions`
- `https://lastsecond.ir/attractions?list`
- `https://lastsecond.ir/attractions/4252-qajar-bath`
- `https://lastsecond.ir/visa`
- `https://lastsecond.ir/visa/thailand`
- `https://lastsecond.ir/flights`
- `https://lastsecond.ir/flights/thr-mhd`
- `https://lastsecond.ir/safarsaz`
- `https://lastsecond.ir/blind-tour`
- `https://lastsecond.ir/itineraries`
- `https://lastsecond.ir/itineraries?list`
- `https://lastsecond.ir/itineraries/s0527033-mel-a-city-to-rediscover`
- `https://lastsecond.ir/blog/`
- `https://lastsecond.ir/blog/11201-talesh-best-restaurants`
- `https://lastsecond.ir/videos`
- `https://lastsecond.ir/videos?list`
- `https://lastsecond.ir/videos/1026-world-most-dangerous-food-streets-china`
- `https://lastsecond.ir/agencies`
- `https://lastsecond.ir/agencies?list`
- `https://lastsecond.ir/agencies/2579-safarsaaz`
- `https://lastsecond.ir/u/bp0555`
- `https://lastsecond.ir/badges/bp0555`
- `https://lastsecond.ir/authors/398587`
- `https://lastsecond.ir/reviews/create?type=hotel&id=11603`
- `https://lastsecond.ir/requests?type=hotel&spotId=11603`
- `https://lastsecond.ir/requests/agency/general-info`
- `https://lastsecond.ir/auth/login`
- `https://lastsecond.ir/pages/aboutus`
- `https://lastsecond.ir/pages/advertisement`
- `https://lastsecond.ir/robots.txt`
- `https://lastsecond.ir/sitemap.xml` (404)
- `https://lastsecond.ir/sitemap_index.xml` (404)

## پیوست B — فایل‌های Hani مرجع در مقایسه

- `src/Modules/Catalog/Hani.Modules.Catalog.Domain/TourProducts/TourProduct.cs`
- `src/Modules/Catalog/Hani.Modules.Catalog.Domain/Destinations/Destination.cs`
- `src/Modules/Supply/Hani.Modules.Supply.Domain/AgencyOffers/AgencyOffer.cs`
- `src/Modules/Supply/Hani.Modules.Supply.Domain/AgencyOffers/OfferAccommodationOption.cs`
- `src/Modules/Supply/Hani.Modules.Supply.Domain/AgencyOffers/OfferFlightOption.cs`
- `src/Modules/Booking/Hani.Modules.Booking.Domain/Orders/Order.cs`
- `src/Modules/Booking/Hani.Modules.Booking.Domain/Installments/InstallmentPlan.cs`
- `src/Modules/Booking/Hani.Modules.Booking.Domain/ReservationRequests/ReservationRequest.cs`
- `src/Modules/Booking/Hani.Modules.Booking.Domain/Leads/LeadRequest.cs`
- `src/Modules/Identity/Hani.Modules.Identity.Domain/Reviews/Review.cs`
- `src/Modules/Identity/Hani.Modules.Identity.Domain/Agencies/Agency.cs`
- `src/Modules/Identity/Hani.Modules.Identity.Domain/Users/User.cs`
- `src/Modules/Identity/Hani.Modules.Identity.Domain/Claims/OwnershipClaim.cs`
- `src/Modules/Identity/Hani.Modules.Identity.Domain/Media/MediaAsset.cs`
- `src/Modules/Payments/Hani.Modules.Payments.Domain/OfflinePayments/OfflinePaymentReceipt.cs`
- `src/Modules/Marketplace/Hani.Modules.Marketplace.Application/Queries/SearchProducts/SearchProductsQueryHandler.cs`
- `src/Modules/Marketplace/Hani.Modules.Marketplace.Application/Queries/Seo/SeoMetadataBuilder.cs`
- `docs/adr/0024-multicurrency-taxes-booking-and-mor.md`
- `docs/adr/0025-booking-modes-requests-leads-installments-offline.md`
- `docs/plan/PHASE-CONTRACT.md`
- `docs/plan/baseline.json`
