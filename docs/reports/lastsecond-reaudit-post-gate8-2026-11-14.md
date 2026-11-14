# بازبینی دوباره Lastsecond.ir پس از Gate 8

- تاریخ: 2026-11-14
- نوع سند: Re-audit / Parity Gap Register
- مرجع قبلی: `docs/reports/lastsecond-full-architecture-audit-2026-11-14.md` و `docs/reports/lastsecond-deviation-audit-post-gate6-2026-11-14.md`
- وضعیت Gate: Gate 8 در سطح Core PASS است، اما **Parity کامل با Lastsecond نیست**.

## ۱. نتیجه کوتاه

بازبینی صفحات عمومی Lastsecond نشان داد Gate 8 بخش‌های Hardening را بسته است،
اما **۱۰ انحراف شناخته‌شده (E-01..E-10) و ۳ انحراف تکمیلی** هنوز باز یا خارجی هستند.
بنابراین نمی‌توان گفت «هیچ گپ یا انحرافی نمانده است».

Baseline قبلی ۳۴ GAP دارد و همه آن‌ها در Gate 1..6 بسته شده‌اند. این انحراف‌ها
GAP جدید Baseline نیستند؛ **Parity Gapهای پس از Baseline** هستند و باید در
Gate 8.1 یا با Waiver/ADR ثبت شوند.

## ۲. صفحاتی که در این بازبینی دیده شد

- `/`
- `/tours`، `/tours/installment-tours`، یک Tour detail کامل
- `/hotels`، یک Hotel detail
- `/restaurants`، یک Restaurant detail
- `/attractions`، یک Attraction detail
- `/visa`، `/visa/thailand`، `/visa/dubai` (و `/visa/japan` که در زمان بررسی 500 داد)
- `/flights` و `/flights/thr-mhd`
- `/itineraries` و یک Travelogue detail
- `/blog`، یک Blog detail
- `/videos` و یک Video detail
- `/agencies` و یک Agency detail
- `/u/{username}` و `/badges/{username}`
- `/blind-tour`
- `/safarsaz`
- `/pages/aboutus`، `/pages/advertisement`
- `/requests/agency/general-info` (به ثبت‌نام/ورود هدایت شد)
- `robots.txt`، `/sitemap.xml` (404)

## ۳. آنچه در Hani وجود دارد و منطبق است

- Tour list/detail data، itinerary، hotel/room/meal options، flight options،
  occupancy prices، taxes، installment، cancellation policy، agency contact.
- Hotel/Place/Visa/Flight domain، gallery، amenities، menu، geo/nearby،
  review criteria، claim، media metadata.
- Restaurant reservation، Hotel inquiry، Visa application، Safarsaz/RFQ lead،
  dashboard/request aggregates.
- Content: Blog/Travelogue/Video، comments، likes، categories، sitemap content.
- Agency onboarding، public agency profile، reviews with criteria/proof/reply،
  gamification، badges، travel style.
- SEO: canonical/hreflang/JSON-LD for marketplace + verticals + content sitemap.
- Gate 8: search batching/index/cache، Testcontainers، k6/SLO، DR، security،
  observability.

## ۴. انحرافات باقی‌مانده — E Register

| ID | موضوع | شاهد Lastsecond | وضعیت Hani | وضعیت |
|---|---|---|---|---|
| E-01 | Frontend Next.js | کل تجربه عمومی، صفحات Tour/Hotel/Visa/Blog/Growth | هیچ Frontend در مخزن نیست؛ API-first | **باز / خارجی** |
| E-02 | واقعی Email/SMS provider | خبرنامه پیامکی، verification، retry | `LoggingNotificationSender` فقط log می‌کند | **باز** |
| E-03 | Content SEO | Blog/Travelogue/Video detail + JSON-LD | SEO title/description و sitemap هست؛ JSON-LD برای Blog/Travelogue/Video نیست | **Partial** |
| E-04 | Author profile aggregate | `/u/{username}` + `/badges/{username}` با آمار، سطح، امتیاز، نشان، سبک سفر | `AuthorDto` پایه + endpointهای جداگانه؛ aggregate واحد و Badge page ندارد؛ `TravelStyle` تک‌مقداری است | **Partial** |
| E-05 | Home/BFF aggregation | صفحه اصلی: تور ویژه، داخلی/خارجی، ویزا، مبدا، سفرنامه، بلاگ، Ads، Newsletter | endpoint Home/BFF وجود ندارد | **باز** |
| E-06 | Continent taxonomy | `/hotels/asia`، `/restaurants/europe`، `/attractions/africa` | `DestinationType` فقط Country/Province/City/Region؛ فیلتر slug دقیق است نه سلسله‌مراتبی | **باز** |
| E-07 | Flight provider واقعی | متاسرچ/Redirect با providerهای بیرونی | adapter + fallback وجود دارد؛ credential/قرارداد واقعی نیست | **خارجی** |
| E-08 | Media upload واقعی | آپلود عکس Review/Album | `MediaAsset` فقط URL ثبت می‌کند؛ upload binary/storage ندارد | **باز** |
| E-09 | Visa related content | لینک مقاله/راهنما در صفحه ویزا | Visa DTO لینک مقاله مرتبط ندارد | **باز** |
| E-10 | Hotel sort/rank | جدیدترین، تعداد نظر، الفبا، بازدید، رتبه در شهر | فقط `sort=rating`؛ `RankInCity` در list خالی است | **Partial** |

## ۵. انحرافات تکمیلی که در گزارش قبلی کمرنگ بود

| ID | موضوع | شاهد Lastsecond | وضعیت Hani | وضعیت |
|---|---|---|---|---|
| A-11 | Public agency directory | `/agencies`، `/agencies/{city}`، ۲۱۰۵ آژانس، امتیاز/تعداد تور/وضعیت | فقط `GET /market/v1/agencies/{slug}` و list داخلی؛ list عمومی/فیلتر شهر/q ندارد | **باز** |
| A-12 | Agency profile parity | مجوز، مدیرعامل، پرسنل، آدرس، امتیاز، ۷ معیار، تورها، تعداد نظر | `PublicAgencyDto` فیلدهای مجوز/مدیر/پرسنل را دارد ولی rating/reviewCount/tourCount ندارد | **Partial** |
| A-13 | Review aggregate criteria | میانگین ۶ معیار هتل، ۴ معیار رستوران، ۷ معیار آژانس | Domain criteria را دارد؛ `ReviewSummary` فقط overall/rating/count می‌دهد | **Partial** |
| A-14 | Blog related/destination tags | Blog detail: related posts، category، author | Blog category دارد؛ destination tags/related posts ندارد | **Partial/Low** |
| A-15 | Competition/Lastgram SSO | Badge page از مسابقات و Lastgram حرف می‌زند | Gamification عمومی هست؛ Competition و Lastgram SSO نیست | **خارجی/Low** |
| A-16 | Home callback request | «شماره خود را وارد کنید تا تماس بگیریم» | Lead/Newsletter هست؛ callback اختصاصی نیست | **Low** |

> `/sitemap.xml` در Lastsecond 404 است؛ Hani این ضعف را کپی نکرده و sitemap دارد.
> این یک Hani-Better است.

## ۶. مقایسه با فازهای انجام‌شده

| فاز | وضعیت | نتیجه بازبینی |
|---|---|---|
| Gate 1 — Tour/Pricing | PASS | منطبق؛ Tour/Offer/Departure/قیمت/مالیات/اقساط دارد |
| Gate 2 — Discovery/SEO | PASS | Search/SEO/sitemap دارد؛ Continent و Hotel sort باقی است |
| Gate 3 — Identity/Trust/Agency | PASS | Review criteria/proof/reply/claim دارد؛ Agency directory و Author aggregate ناقص است |
| Gate 4 — Booking/Request/Lead | PASS | Tour/Hotel/Visa/Restaurant/Safarsaz پوشش دارد |
| Gate 5 — Verticals | PASS | Hotel/Place/Visa/Flight + Geo + Inquiry/Reservation دارد |
| Gate 6 — Content/Growth | PASS | Blog/Travelogue/Video/Ads/Newsletter/Campaign/Gamification دارد؛ Content JSON-LD و upload واقعی ناقص است |
| Gate 7 — Channel/Billing | PASS (Core) | منطبق/بهتر؛ Hani MoR/Refund/Invoice/Payout دارد |
| Gate 8 — Hardening | PASS (Core) | Search/Testcontainers/k6/DR/security/observability دارد |

**نتیجه:** Baseline ۳۴ GAP بسته است، اما Parity کامل Lastsecond بسته نیست.
حداقل ۶ مورد Backend قابل‌رفع (E-02..E-06, E-08..E-10, A-11..A-13) و
۴ مورد خارجی/Frontend (E-01, E-07, A-15, بخشی از E-02) باقی است.

## ۷. پیشنهاد Gate 8.1

### Backend closure

1. **E-06**: افزودن `Continent` به `DestinationType` و فیلتر سلسله‌مراتبی
   `Continent → Country → Province → City → Region` برای Hotel/Place/Tour.
2. **E-10**: افزودن sortهای `newest`, `reviews`, `alphabetical`, `rank`
   و محاسبه `RankInCity` در list.
3. **E-04 + A-11 + A-12**: BFF پروفایل نویسنده/نشان‌ها + public agency directory
   با فیلتر شهر/استان/q و غنی‌سازی rating/reviewCount/tourCount.
4. **E-05**: `GET /market/v1/home?locale=` برای aggregation صفحه اصلی.
5. **E-03 + A-13 + A-14**: JSON-LD برای Blog/Travelogue/Video،
   aggregate criteria در ReviewSummary، related/destination tags برای Blog.
6. **E-08**: `POST /market/v1/media/upload` با `IFileStorage` (Local/S3)
   و اعتبارسنجی MIME/size.
7. **E-02**: `HttpNotificationSender` برای Email/SMS با config و fallback
   به logging وقتی credential نیست.
8. **E-09**: `relatedArticleSlugs` یا BFF mapping در Visa detail.

### خارجی/غیرقابل بستن در Backend

- E-01: Frontend Next.js
- E-07: credential و قرارداد Flight Provider
- A-15: Lastgram SSO و Competition
- بخشی از E-02: تأمین‌کننده واقعی SMS/Email

## ۸. تصمیم

**Gate 8.1 پیشنهاد می‌شود و Gate 9 نباید قبل از تصمیم درباره این residuals شروع شود.**
این سند جایگزین Baseline نیست و هیچ GAP جدیدی را بدون نسخه/ADR به Baseline اضافه نمی‌کند.

## ۹. Evidence

- `docs/reports/lastsecond-full-architecture-audit-2026-11-14.md`
- `docs/reports/lastsecond-deviation-audit-post-gate6-2026-11-14.md`
- `src/Modules/Catalog/Hani.Modules.Catalog.Domain/Destinations/DestinationType.cs`
- `src/Modules/Catalog/Hani.Modules.Catalog.Infrastructure/Repositories/HotelRepository.cs`
- `src/Modules/Identity/Hani.Modules.Identity.Application/Commands/Auth/AuthCommands.cs`
- `src/Modules/Identity/Hani.Modules.Identity.Application/Commands/AgencyOnboarding/AgencyOnboardingCommands.cs`
- `src/Modules/Identity/Hani.Modules.Identity.Presentation/AgencyOnboardingEndpoints.cs`
- `src/Modules/Content/Hani.Modules.Content.Application/Queries/Editorial/EditorialQueries.cs`
- `src/Modules/Content/Hani.Modules.Content.Domain/Content/EditorialContent.cs`
- `src/Hani.Contracts/Hani.Contracts.Identity/IdentityReadContracts.cs`


## ??. Gate 8.1 Closure Update (2026-11-14)

The backend residuals in this report were closed in Gate 8.1. The external
deliverables are still outside this repository.

| ID | Final status | Evidence |
|---|---|---|
| E-01 | ✅ Closed (Gate 9 Core) | Next.js frontend in `frontend/` |
| E-02 | ? Closed (adapter) | `HttpNotificationSender` + logging fallback |
| E-03 | ? Closed | Blog/Travelogue/Video JSON-LD endpoints |
| E-04 | ? Closed | `/market/v1/authors/{username}/profile` |
| E-05 | ? Closed | `/market/v1/home` |
| E-06 | ? Closed | `DestinationType.Continent` + hierarchy resolver |
| E-07 | External | Flight provider credentials/contract |
| E-08 | ? Closed | `/market/v1/media/upload` + `IFileStorage` |
| E-09 | ? Closed | `VisaType.RelatedArticleSlugs` |
| E-10 | ? Closed | Hotel sort/rank + `RankInCity` |
| A-11 | ? Closed | Public agency directory |
| A-12 | ? Closed | Agency rating/review + tour count BFF |
| A-13 | ? Closed | `/market/v1/reviews/criteria` |
| A-14 | ? Closed | Blog destination tags + related endpoint |
| A-15 | External | Lastgram SSO/Competition ecosystem |

Contract: [`../plan/GATE-8.1-CONTRACT.md`](../plan/GATE-8.1-CONTRACT.md).
