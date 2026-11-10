# Blueprint صفحه جزئیات تور — «مدل لست‌سکند، بهتر»

> مرجع بررسی: `https://lastsecond.ir/tours/g2739-...` (تور دورهمی یزد)
> این سند **مشخصات محصول/UI** است، نه تصمیم دامنه. مدل دامنه Hani همان `TourProduct` مشترک + `AgencyOffer` مستقل است.

---

## ۱. آناتومی صفحه (از بالا به پایین)

```
Breadcrumb
Hero: عنوان + امتیاز + گالری + برچسب‌ها
«درباره تور» (توضیح کوتاه)
Sticky Tabs:
  ├─ در یک نگاه
  ├─ برنامه سفر
  ├─ پذیرایی و اقامت
  ├─ خدمات تور
  ├─ اطلاعات تکمیلی
  ├─ لوازم مورد نیاز
  └─ قوانین و مقررات
محتوای تب فعال
Sidebar (Sticky):
  ├─ تاریخ رفت/برگشت + تقویم
  ├─ کد آژانس / کد تور
  ├─ الزامات (محرمیت، بازه سنی، ظرفیت)
  ├─ گزارش تخلف
  ├─ تعداد مسافر
  ├─ نوع اتاق (دو/یک/سه تخته)
  ├─ مجموع قیمت
  ├─ CTA «تایید و ادامه»
  └─ پشتیبانی
تورهای مرتبط / مقصد / گروه
Footer
```

---

## ۲. داده‌های صفحه (مدل واقعی مشاهده‌شده)

### Trip

| فیلد | نمونه | معنا |
|---|---|---|
| `id` | 2739 | شناسه تور |
| `title` | تور دورهمی یزد… | عنوان |
| `slug` / `link` | تور-دورهمی-یزد… | URL |
| `duration` | 4 | تعداد روز |
| `departurePlace` | یزد | محل حرکت |
| `departureTime` | 06:00 | ساعت حرکت |
| `returnTime` | 12:00 | ساعت برگشت |
| `timespan` | شب یلدا | مناسبت/فصل |
| `marriageEvidence` | true | نیاز به مدارک محرمیت |
| `sharedAccommodation` | false | اقامت مشترک |
| `minAge` / `maxAge` | 6 / 75 | بازه سنی |
| `maximumPassengersCount` | 10 | حداکثر نفرات |
| `maxPassengersToSkipFullInfo` | 3 | آستانه اطلاعات کامل |
| `hardness` | LEVEL_3 / عادی | سختی |
| `primaryVehicle` | ندارد | وسیله اصلی |
| `secondaryVehicles` | مینی‌بوس توریستی | وسیله محلی |
| `stays` | هتل | نوع اقامت |
| `meals` | 3 صبحانه… | وعده‌ها |
| `snacks` | 2 میان‌وعده | میان‌وعده |
| `descriptionContent` | … | معرفی |
| `descriptionOther` | … | خدمات/توضیحات |
| `descriptionServices` | راهنما، بیمه | خدمات |
| `descriptionRules` | قیمت‌ها به تومان | قوانین |
| `refundPolicies` | غیرقابل استرداد | بازگشت وجه |
| `locations` | یزد | مقاصد |
| `groups` | شهرگردی | گروه تور |
| `media` | 5 تصویر | رسانه |
| `requiredTools` | 4 مورد | لوازم ضروری |
| `recommendedTools` | 3 مورد | لوازم پیشنهادی |
| `spotCoordinates` | 11 نقطه | نقشه |
| `reactionsCount` / `averageReactionScore` | 3 / 5 | واکنش‌ها |
| `agency` | id, titleFa, phones, rating | آژانس |

### Schedule (سانس) و قیمت

| فیلد | نمونه |
|---|---|
| `id` | 12131 |
| `startDate` / `endDate` | 2026-11-16 / 2026-11-19 |
| `capacity` | 4 |
| `condition` | OPEN / CLOSED |
| `price` | 14,990,000 |
| `allPrices[]` | Double: 15,590,000 (capacity 2) / Single: 20,990,000 (closed) / Triple: 14,990,000 (capacity 2) |

### Day و DayPackage

| فیلد | نمونه |
|---|---|
| `days[].dayNumber` / `label` | 1..4 / یزدگردی |
| `days[].itinerary` | متن روز |
| `days[].attractions` | لیست جاذبه‌ها |
| `days[].restaurants` | لیست رستوران‌ها |
| `days[].tips` | نکات |
| `tripDayPackages[]` | breakfast/lunch/dinner provider + place + hotel |

### Providerها

| کد | معنا |
|---|---|
| 1 | توسط آژانس |
| 2 | توسط مسافر |
| 3 | توسط هتل |

---

## ۳. جریان رزرو (مشاهده‌شده)

```
انتخاب تاریخ + نوع اتاق + تعداد مسافر
        ↓
POST {TRIP_WIZARD_API}/check-capacity
        ↓
اگر کاربر لاگین نیست:
  مودال ۵ ثانیه‌ای → Login / Profile Mobile با nextUrl
  ذخیره Pending Purchase در کوکی ۳۰ دقیقه
        ↓
ایجاد TripRequest
        ↓
/trip-wizard/{request}/passengers
        ↓
مسافران → قرارداد → پرداخت → بلیط/واچر
```

- `TRIP_WIZARD_API = https://lastsecond.ir/trip-request-api/`
- خطای ظرفیت: `POST /check-capacity`
- خطا فعلی: Toast با `response.data.message` خام (بدون کد/ترجمه) — **نقطه بهبود Hani**.

---

## ۴. نقاط قوت مدل لست‌سکند (که می‌گیریم)

- صفحه محصول بسیار کامل: برنامه روزبه‌روز، غذا/اقامت، خدمات، لوازم، قوانین.
- Sticky tabs + sidebar رزرو.
- نمایش ظرفیت، بازه سنی، الزامات (محرمیت)، کد آژانس/تور.
- انتخاب نوع اتاق و محاسبه مجموع.
- جریان رزرو با check-capacity قبل از ثبت.
- محتوای مرتبط (تورهای یزد/شهرگردی) برای سئو و کشف.

## ۵. نقاط ضعف (که Hani بهتر می‌کند)

| ضعف | بهبود Hani |
|---|---|
| JSON-LD فقط BreadcrumbList | `TouristTrip` + `Offer` + `AggregateOffer` + `AggregateRating` + `FAQPage` |
| بدون hreflang | FA/EN/AR + `x-default` |
| قیمت meta با قیمت صفحه ناسازگار | یک منبع قیمت + تست سازگاری |
| خطای خام بدون کد | `HANI-BOOKING-xxxx` + ترجمه + traceId |
| فقط مجموع قیمت | نمایش قیمت هر نوع اتاق + تفکیک نفرات |
| داده ناقص آژانس (`titleFa` خالی) | الزام تکمیل پروفایل آژانس |
| تایپو در `stays` («هنل») | اعتبارسنجی داده + moderation |
| دسترس‌پذیری (zoom/کنتراست) | WCAG + Lighthouse |
| بدون نمایش صریح سیاست کنسلی در CTA | خلاصه کنسلی کنار قیمت |

---

## ۶. نقشه به دامنه Hani

| UI | Hani |
|---|---|
| Trip | `TourProduct` (+ `TourProductTranslation`) |
| Schedule | `TourDeparture` |
| allPrices | `DeparturePrice` (DOUBLE/SINGLE/TRIPLE/CHILD/INFANT) |
| days | `TourItineraryDay` |
| tripDayPackages | `TourDayMealPlan` |
| services/tools/rules | `TourInclusion`, `TourRequirement`, `TourPolicy` |
| agency | `Agency` |
| reviews/reactions | `Review` / `Reaction` |
| media | `MediaAsset` |
| locations | `Destination` |
| groups | `TourCategory` |

> **مهم:** `Trip` در لست‌سکند هم Product و هم Offer را قاطی کرده است. در Hani این‌ها جدا می‌شوند:
> `TourProduct` (مشترک) ← `AgencyOffer` (آژانس) ← `TourDeparture` (سانس/قیمت/ظرفیت).

---

## ۷. چک‌لیست پذیرش صفحه

- [ ] Breadcrumb + canonical + hreflang
- [ ] JSON-LD کامل و معتبر
- [ ] گالری + تصاویر بهینه
- [ ] Sticky tabs با لینک لنگر
- [ ] در یک نگاه (مقصد، مبدا، مدت، سختی، وسیله، اقامت، وعده)
- [ ] برنامه روزبه‌روز + جاذبه/رستوران هر روز
- [ ] جدول پذیرایی و اقامت
- [ ] خدمات + لوازم + قوانین + کنسلی
- [ ] Sidebar: تاریخ، ظرفیت، بازه سنی، الزامات، اتاق‌ها، قیمت، CTA
- [ ] check-capacity قبل از رزرو
- [ ] گیت لاگین + بازگشت به همان نقطه
- [ ] خطاهای کددار و چندزبانه
- [ ] حالت‌های Loading/Empty/Error/Sold-out
- [ ] موبایل + RTL/LTR + سه زبان
- [ ] Lighthouse SEO/Performance/A11y
