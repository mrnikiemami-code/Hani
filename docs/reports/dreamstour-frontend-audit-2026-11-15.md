# گزارش معماری و ارزیابی فرانت‌اند خریداری‌شده Dreamstour

- **تاریخ:** 2026-11-15
- **مسیر بررسی‌شده:** `D:\Hani\reference\dreamstour-v1.1.7\nextjs`
- **نوع بررسی:** Architecture / Frontend / i18n / RTL / Lastsecond Parity Audit
- **فرانت فعلی Hani:** `D:\Hani\frontend`
- **نتیجه کلی:** دارایی بصری با ارزش، اما **آماده Production نیست** و **به‌صورت مستقیم قابل جایگزینی با فرانت Hani نیست**.

---

## ۱. خلاصه اجرایی

این پکیج یک قالب تجاری Bootstrap/Next.js با تنوع صفحه‌ای بسیار زیاد است. ارزش اصلی آن در این موارد است:

- طراحی و CSS آماده برای چند vertical سفر
- کامپوننت‌های کارت تور، هتل، پرواز، ویزا، داشبورد کاربر و آژانس
- تعداد زیاد صفحه و فرم که می‌تواند به‌عنوان مرجع UI/UX استفاده شود
- پوشش اولیه سفرنامه/بلاگ، نظرات، wishlist، wallet، payout و booking

اما در وضعیت فعلی:

| محور | وضعیت |
|---|---|
| Build | ❌ شکست می‌خورد |
| Routing | ❌ دو درخت موازی با ۱۸۱ URL تکراری |
| API Integration | ❌ هیچ API واقعی ندارد؛ فقط mock |
| i18n | ❌ ندارد |
| RTL | ⚠️ فقط یک صفحه Demo |
| SEO | ❌ Metadata ثابت انگلیسی و بدون hreflang/JSON-LD |
| Auth | ❌ Email/Password؛ Hani به OTP نیاز دارد |
| Payment / Hani MoR | ❌ ندارد |
| Lastsecond Parity | ⚠️ اسکلت صفحه‌ها هست، محصول واقعی نه |
| تست | ❌ Unit/E2E/A11y ندارد |

**توصیه معماری:** این قالب را به‌عنوان «Design Kit» مصرف کنیم، نه به‌عنوان «App». یعنی SCSS، assetها، کارت‌ها و چند کامپوننت منتخب را به `frontend/` فعلی Hani منتقل کنیم و همان معماری `[locale]` + API client + next-intl فعلی را حفظ کنیم. کپی کردن `src/app` این قالب باعث ورود بدهی فنی و دوباره‌کاری i18n/RTL می‌شود.

---

## ۲. دارایی واقعی چه چیزی است؟

### ۲.۱. آمار پایه

| مورد | تعداد |
|---|---:|
| فایل `page.tsx` | ۳۶۴ |
| URL یکتا پس از حذف Route Groupها | ۱۸۳ |
| URL تکراری | ۱۸۱ |
| فایل mock | ۱۷ |
| فایل `.tsx` در `src/views` | ۳۳۴ |
| فایل `.tsx` در `src/components` | ۳۶۷ |
| Route Group تکراری | `(feature-module)` و `(public-pages)` |
| Auth Group تکراری | `(auth)` و `(auth-pages)` |
| Build Errors | **۴۷۱** |

### ۲.۲. صفحه‌ها بر اساس دامنه

| خانواده | URL یکتا | وضعیت برای Hani |
|---|---:|---|
| Home | ۱۲ | فقط ۱ نسخه لازم است |
| Auth | ۸ | باید با OTP بازنویسی شود |
| Tours | ۹ | قابل استفاده با بازنویسی داده |
| Hotels | ۹ | قابل استفاده با بازنویسی داده |
| Flights | ۸ | باید به Metasearch/Redirect کاهش یابد |
| Visa | ۹ | قابل استفاده با اتصال به Hani Visa API |
| Blog | ۳ | باید Blog/Travelogue/Video/Author شود |
| Static/Utility | ۲۰ | فقط بخشی لازم است |
| Traveler Dashboard | ۳۳ | باید به قابلیت‌های واقعی Hani کاهش یابد |
| Agency Dashboard | ۳۰ | باید به Supplier/Channel API وصل شود |
| Car / Cruise / Bus / Guide / Activity | ۴۱ | خارج از Baseline فعلی Hani |
| Become an Expert | ۱ | به Agency Onboarding تبدیل شود |

### ۲.۳. نکته مهم: دو فرانت در یک فرانت

قالب دو پیاده‌سازی موازی دارد:

- `src/app/(feature-module)` + `src/views` + `src/core/common`
- `src/app/(public-pages)` + `src/components/pages` + `src/components/common-*`

این دو مجموعه تقریباً همان URLها را تولید می‌کنند. به همین دلیل Next.js در Build با خطای زیر متوقف می‌شود:

```text
You cannot have two parallel pages that resolve to the same path.
Please check /(auth)/login and /(auth-pages).
```

و ۴۷۱ خطای Build عمدتاً از همین دوگانگی است. قبل از هر کار دیگری باید یکی از دو درخت حذف شود.

---

## ۳. بلاکرهای P0

### P0-1. Build شکست می‌خورد

فرمان `npm run build` در وضعیت فعلی ناموفق است. علت اصلی: Route Groupهای موازی.

**اقدام:** یکی از دو مسیر زیر انتخاب شود:

1. `(feature-module)` + `views` + `core/common` نگه داشته شود و `(public-pages)` + `components/pages` حذف شود.
2. برعکس آن.

انتخاب باید بعد از مقایسه بصری یکی از صفحات انجام شود، نه بر اساس سلیقه. سپس تمام importها اصلاح شوند.

### P0-2. `output: "export"` با `redirects` سازگار نیست

در `next.config.ts`:

```ts
output: "export",
async redirects() {
  return [{ source: "/", destination: "/index-1", permanent: false }];
}
```

Next.js هشدار می‌دهد که `redirects` با `output: "export"` کار نمی‌کند. برای Hani که به OTP، Checkout، Middleware و SEO داینامیک نیاز دارد، Static Export مناسب نیست.

**اقدام:** `output: "export"` حذف شود و deployment به Node/Standalone یا پلتفرم SSR منتقل شود.

### P0-3. `basePath` وابسته به Production

در Production مسیرها به `/nextjs` تغییر می‌کنند. اگر فرانت روی دامنه اصلی Hani یا زیردامنه مستقل منتشر شود، این basePath باعث شکستن assetها و لینک‌ها می‌شود.

**اقدام:** `basePath` از Environment خوانده شود یا کامل حذف شود.

### P0-4. هیچ API Layer وجود ندارد

جستجو برای `fetch`, `axios`, `createApi` و `baseQuery` نتیجه‌ای در کدهای قالب ندارد. تمام داده‌ها از `src/core/data/mock` می‌آیند.

**اقدام:** یک `lib/api` مشترک با:

- Base URL از Environment
- Typeهای DTO
- Error Envelope استاندارد Hani
- CorrelationId
- Timeout / Retry / Abort
- Server Component support
- Auth token / Cookie strategy

ساخته شود. این دقیقاً همان چیزی است که در `frontend/lib/api.ts` فعلی Hani شروع شده و باید گسترش یابد.

### P0-5. دو Auth و دو Theme Store

- `(auth)` و `(auth-pages)` هر دو Login/Register/Forgot/Change Password دارند.
- `src/redux/slices/themeSettingSlice.ts` و `src/core/redux/themeSettingSlice.tsx` هر دو وجود دارند؛ یکی localStorage و دیگری sessionStorage.
- `ThemeSync` فقط `body.class="rtl"` را ست می‌کند، در حالی که بیشتر CSS با `[dir="rtl"]` کار می‌کند.

**اقدام:** یک Auth، یک Theme Store، یک منبع حقیقت برای `dir` و `locale`.

---

## ۴. وضعیت RTL

### ۴.۱. آنچه وجود دارد

- یک صفحه Demo در `/pages/rtl`
- هوک `useDocumentAttribute("dir", "rtl")` که فقط در همان صفحه اجرا می‌شود
- فایل `_rtl.scss` با overrides برای بعضی کامپوننت‌ها
- Bootstrap 5 که تا حدی از logical utilities پشتیبانی می‌کند
- `ThemeSync` که `body.class="rtl"` را ست می‌کند

### ۴.۲. چرا کافی نیست

- `app/layout.tsx` همیشه `lang="en"` دارد و `dir` ندارد.
- RTL فقط در یک صفحه و به‌صورت Client-Side فعال می‌شود.
- `body.class="rtl"` با CSSهایی که `[dir="rtl"]` را target می‌کنند هم‌راستا نیست.
- هیچ locale routing وجود ندارد؛ بنابراین `/fa`, `/en`, `/ar` نداریم.
- حدود **۳۷۵** تعریف `left`، **۳۶۷** تعریف `right`، **۹۷** `margin/padding-left` و **۱۸۴** `margin/padding-right` در SCSS وجود دارد. این‌ها باید به logical properties تبدیل شوند یا برای RTL override شوند.
- کاروسل‌ها، GSAP، Maps، DateRangePicker، PhoneInput، Charts، DataTables و Chat نیاز به بررسی جداگانه RTL دارند.
- آیکون‌های جهت‌دار (arrow, chevron, back, next, play) باید flip شوند.
- فونت فقط `IBM Plex Sans` است؛ برای فارسی/عربی fallback مناسب نداریم.
- شماره‌ها، مبلغ، تاریخ، اعتبار، شماره موبایل و کد ملی باید locale-aware باشند.

### ۴.۳. اقدامات RTL

1. `html` در Server Layout:
   ```tsx
   <html lang={locale} dir={locale === "en" ? "ltr" : "rtl"}>
   ```
2. حذف `body.class="rtl"` و استفاده از `[dir="rtl"]` یا `:dir(rtl)`.
3. تبدیل CSS به logical properties:
   ```scss
   margin-inline-start: 12px;
   padding-inline-end: 16px;
   inset-inline-start: 0;
   ```
4. تعریف سه فونت:
   - FA: Vazirmatn
   - AR: Noto Kufi Arabic / Noto Naskh Arabic
   - EN: Inter
5. تست RTL برای:
   - Header / Mega Menu / Offcanvas
   - Dropdown / Select / DatePicker
   - Tour/Hotel/Flight cards
   - Booking wizard و فرم‌های پرداخت
   - Dashboard tables و sidebar
   - Chat و timeline
   - Pagination / Breadcrumb
   - Swiper / Carousel / GSAP horizontal sections
6. برای مقادیر فنی از `dir="ltr"` استفاده شود:
   - Email
   - Phone
   - IBAN / Card Number
   - کد رهگیری
   - URL
7. تست خودکار:
   - Playwright screenshot برای `fa` و `ar`
   - `axe-core` برای Accessibility
   - Visual regression برای صفحات کلیدی

---

## ۵. وضعیت چندزبانه

### ۵.۱. آنچه وجود دارد

- Dropdown زبان در Header با Flagهای US / Arab / France
- Dropdown ارز با USD / YEN / EURO

### ۵.۲. چرا کافی نیست

- هیچ `next-intl` یا کتابخانه i18n وجود ندارد.
- هیچ locale segment مثل `/[locale]` وجود ندارد.
- همه متن‌ها به‌صورت Hard-coded انگلیسی هستند.
- Dropdown زبان فقط `href="#"` است و هیچ تغییری ایجاد نمی‌کند.
- Dropdown ارز هم فقط نمایشی است.
- `metadata` ثابت است:
  ```ts
  const APP_NAME = "DreamsTour - Travel and Tour Booking Next.js template";
  ```
- هیچ `hreflang`، canonical، alternate، sitemap چندزبانه یا JSON-LD وجود ندارد.
- هیچ fallback محتوایی از API وجود ندارد.
- تاریخ و مبلغ با `Intl` و locale نمایش داده نمی‌شوند.
- فرم‌ها، validation، خطاها، labelها و placeholderها همه انگلیسی هستند.

### ۵.۳. معماری پیشنهادی i18n

همان الگویی که در `frontend/` فعلی Hani داریم توسعه داده شود:

```text
frontend/
  app/[locale]/
  i18n/routing.ts
  i18n/request.ts
  i18n/navigation.ts
  messages/fa.json
  messages/en.json
  messages/ar.json
  proxy.ts
```

قواعد:

1. زبان‌ها از `ILanguageCatalog` یا کانفیگ مرکزی خوانده شوند؛ لیست زبان در کد Hard-code نشود.
2. `fa` زبان پیش‌فرض باشد؛ اما fallback محتوایی از API تصمیم‌گیری شود.
3. هر API call پارامتر `locale` داشته باشد.
4. Slugها از `seo.slugs` یا DTOهای Hani بیایند، نه ترجمه دستی در فرانت.
5. `generateMetadata` برای هر صفحه:
   - title
   - description
   - canonical
   - alternates/hreflang
   - OG/Twitter
6. JSON-LD از endpointهای Hani:
   - Product / Tour
   - Hotel
   - BlogPosting
   - Travelogue
   - VideoObject
   - Organization / Agency
7. Sitemap و robots از Hani API یا Route Handler پروکسی شوند.
8. Language Switcher مسیر فعلی را حفظ کند:
   ```text
   /fa/tours/paris?date=...
   -> /en/tours/paris?date=...
   ```
9. ارز جدا از زبان باشد. زبان و ارز دو انتخاب مستقل‌اند.
10. QA:
    - Missing key detection
    - Pseudo-locale
    - RTL screenshot
    - بررسی طول متن‌های فارسی/عربی در دکمه‌ها و کارت‌ها

---

## ۶. وضعیت Lastsecond Parity

### ۶.۱. چیزهایی که قالب دارد

- Home variants
- Tour / Hotel / Flight / Visa listing و detail
- Booking form و confirmation
- Blog grid/list/detail
- User dashboard
- Agent dashboard
- Wallet / wishlist / reviews / invoices / payout / cancellation
- About / Contact / FAQ / Terms / Privacy

### ۶.۲. چیزهایی که Lastsecond/Hani دارد و قالب ندارد

#### محتوا و UGC

- Travelogue (سفرنامه) با سری، author، view/like/comment
- Video content
- Author aggregate profile
- Related blog posts
- Blog destination tags
- Trending content
- Review criteria aggregate
- Campaigns / Newsletter / Ad slots
- Trust / Claims / Media verification
- Agency directory و Agency public profile
- Destination hierarchy (قاره/کشور/شهر)
- Home BFF aggregate

#### Commerce و Hani MoR

- Quote → Hold → Order
- Payment Intent + Webhook
- Installments
- Invoice / PDF
- Refund / Cancellation
- Chargeback / Reconciliation
- Settlement / Payout / Commission
- Idempotency
- Hani به‌عنوان Merchant of Record

#### Vertical-specific

- Flight: Metasearch + Deep Link، نه Seat Selection و Booking
- Hotel: Hotel detail + Hotel Tours + Inquiry، نه لزوماً Inventory مستقیم
- Visa: Visa application + tracking + requirements
- Restaurant / Attraction: Place detail + reservation/inquiry
- Tour: Product comparison + agency offers + departures + accommodation/flight options

#### Auth و Trust

- OTP Login
- Lastgram SSO (خارجی)
- Agency onboarding و approval
- RBAC
- Session/Cookie strategy
- Claims و moderation

---

## ۷. صفحه‌ها: نگه‌داشتن، تغییر دادن، حذف کردن

| خانواده | تصمیم | توضیح |
|---|---|---|
| ۱۲ Home | فقط ۱ | یک Home مدرن و data-driven با Home BFF |
| Auth | بازنویسی | OTP + Lastgram + Reset؛ حذف Email/Password |
| Tours | نگه‌داشتن UI | اتصال به Search/Compare/Booking API |
| Hotels | نگه‌داشتن UI | اتصال به Hotel API؛ حذف Add/Edit اگر Supplier نیست |
| Flights | کاهش | Search/List/Detail + Deep Link؛ حذف Seat Selection/Booking |
| Visa | نگه‌داشتن UI | اتصال به Visa Application API |
| Blog | گسترش | Blog + Travelogue + Video + Author + Related + SEO |
| User Dashboard | کاهش | فقط صفحات متصل به Hani: Orders, Payments, Invoices, Refunds, Reviews, Wishlist, Profile |
| Agent Dashboard | کاهش | Onboarding, Offers, Departures, Bookings, Settlements, Payouts, Cancellation |
| Car/Cruise/Bus/Guide/Activity | حذف/پارک | خارج از Baseline فعلی Hani |
| Static Pages | نگه‌داشتن منتخب | About/Contact/FAQ/Terms/Privacy/Trust |
| RTL Demo / Style Guide | حذف از Production | فقط مرجع توسعه |
| Become an Expert | تبدیل | به Agency Onboarding Hani |

---

## ۸. معماری هدف پیشنهادی

```text
frontend/
  app/
    [locale]/
      (public)/
        page.tsx
        tours/
        hotels/
        flights/
        visa/
        blog/
        travelogues/
        videos/
        destinations/
        agencies/
        u/[username]/
      (auth)/
        login/
        verify/
      (dashboard)/
        traveler/
        agency/
  components/
    ui/            # از قالب، تمیز و RTL-ready
    cards/
    forms/
    layout/
    seo/
  lib/
    api/
    auth/
    money/
    dates/
    seo/
  i18n/
  messages/
  styles/
```

### قواعد کلیدی

- Server Component برای صفحات SEO-sensitive
- Client Component فقط برای تعامل
- هیچ `output: export` برای Hani
- هیچ داده mock در Production
- هیچ locale hard-code
- هیچ رنگ/فونت/فاصله hard-code خارج از Design Token
- هیچ `fetch` پراکنده در کامپوننت‌ها
- هیچ متن کاربرپسند خارج از message catalog

---

## ۹. نقشه راه پیشنهادی

### Phase 0 — پاک‌سازی و Build

- انتخاب یک درخت App
- حذف درخت تکراری
- حذف ۱۱ Home اضافه
- اصلاح `next.config`
- سبز کردن `npm run build`
- حذف `output: export`

### Phase 1 — پایه i18n و RTL

- `app/[locale]`
- `next-intl`
- `html lang/dir`
- فونت‌های FA/AR/EN
- تبدیل CSS به logical properties
- Language Switcher واقعی
- RTL smoke tests

### Phase 2 — صفحات عمومی

- Home BFF
- Tours search/detail/compare
- Hotels list/detail
- Visa list/detail
- Flights metasearch
- Blog/Travelogue/Video
- Destinations
- Agencies/Author

### Phase 3 — Auth و Dashboard

- OTP Login
- Session/Cookie
- Traveler dashboard
- Agency dashboard
- RBAC

### Phase 4 — Commerce و Hani MoR

- Quote/Hold/Order
- Payment Intent
- Invoice
- Refund/Cancellation
- Settlement/Payout
- Idempotency

### Phase 5 — محتوا و SEO

- JSON-LD
- Sitemap/Robots
- hreflang
- Related/Trending
- Reviews criteria
- Newsletter/Campaign

### Phase 6 — کیفیت

- Playwright
- axe
- Lighthouse
- Bundle budget
- Visual regression FA/AR
- Error boundaries
- Loading/Empty states

---

## ۱۰. برآورد اولیه

با یک تیم کوچک (۱ Senior Frontend + ۱ Backend support):

| فاز | برآورد |
|---|---|
| Phase 0 | ۲ تا ۳ روز |
| Phase 1 | ۵ تا ۷ روز |
| Phase 2 | ۲ تا ۳ هفته |
| Phase 3 | ۲ تا ۳ هفته |
| Phase 4 | ۲ تا ۳ هفته |
| Phase 5 | ۱ تا ۲ هفته |
| Phase 6 | ۱ هفته |

این برآورد تقریبی است و به میزان بازاستفاده از کامپوننت‌های قالب بستگی دارد.

---

## ۱۱. تصمیم‌های لازم از سمت شما

1. **کدام درخت App بماند؟**
   - `(feature-module)` + `views`
   - یا `(public-pages)` + `components/pages`

2. **کدام Home مبنا باشد؟**
   - پیشنهاد: یکی از `index-1` تا `index-12` که به Home BFF نزدیک‌تر است.

3. **کدام Verticalها در MVP باشند؟**
   - پیشنهاد: Tours, Hotels, Visa, Flights, Blog/Travelogue/Video, Agencies, Places
   - Car/Cruise/Bus/Guide/Activity فعلاً خارج از MVP

4. **استراتژی Frontend**
   - **A (پیشنهاد):** انتقال Design Kit قالب به `frontend/` فعلی Hani
   - **B:** کپی قالب و بازسازی i18n/API روی آن

5. **Auth**
   - OTP فقط
   - OTP + Lastgram SSO

---

## ۱۲. جمع‌بندی

قالب Dreamstour از نظر بصری و تعداد صفحه یک دارایی خوب است، اما از نظر معماری یک **قالب demo** است، نه یک **frontend محصول**. مشکلات اصلی آن:

- Build شکسته
- ۱۸۱ URL تکراری
- دو درخت UI موازی
- صفر اتصال API
- صفر i18n
- RTL فقط Demo
- SEO غیرقابل استفاده برای Lastsecond
- Auth و Payment ناسازگار با Hani

مسیر درست این است که قالب را به‌عنوان منبع طراحی مصرف کنیم و آن را روی پایه‌ای که در Gate 9 ساخته شد — یعنی `frontend/` با `[locale]`، `next-intl` و API client — منتقل کنیم. اگر کل `src/app` قالب را کپی کنیم، دوباره باید i18n، RTL، API، Auth و SEO را از صفر بسازیم و بدهی فنی قالب را هم به ارث می‌بریم.

---

## پیوست A — فهرست کامل URLهای یکتا

### Home (12)

`/index-1`, `/index-10`, `/index-11`, `/index-12`, `/index-2`, `/index-3`, `/index-4`, `/index-5`, `/index-6`, `/index-7`, `/index-8`, `/index-9`

### Auth (8)

`/change-password`, `/coming-soon`, `/error-404`, `/error-500`, `/forgot-password`, `/login`, `/register`, `/under-maintenance`

### Tours (9)

`/tour/add-tour`, `/tour/custom-package-builder`, `/tour/edit-tour`, `/tour/tour-booking`, `/tour/tour-bookingConfirmation`, `/tour/tour-details`, `/tour/tour-grid`, `/tour/tour-list`, `/tour/tour-map`

### Hotels (9)

`/hotel/add-hotel`, `/hotel/edit-hotel`, `/hotel/hotel-booking`, `/hotel/hotel-booking-confirmation`, `/hotel/hotel-details`, `/hotel/hotel-grid`, `/hotel/hotel-list`, `/hotel/hotel-map`, `/hotel/hotel-room-selection`

### Flights (8)

`/flight/add-flight`, `/flight/edit-flight`, `/flight/flight-booking`, `/flight/flight-booking-confirmation`, `/flight/flight-details`, `/flight/flight-grid`, `/flight/flight-list`, `/flight/flight-seat-selection`

### Visa (9)

`/visa/add-visa`, `/visa/track-visa`, `/visa/visa-application`, `/visa/visa-booking-confirmation`, `/visa/visa-booking-details`, `/visa/visa-details`, `/visa/visa-grid`, `/visa/visa-list`, `/visa/visa-requirements`

### Blog (3)

`/blog/blog-details`, `/blog/blog-grid`, `/blog/blog-list`

### Static / Utility (20)

`/pages/about-us`, `/pages/booking-confirmation`, `/pages/compare`, `/pages/contact-us`, `/pages/destination`, `/pages/destination-details`, `/pages/destrination-details`, `/pages/faq`, `/pages/gallery`, `/pages/invoices`, `/pages/pricing-plan`, `/pages/pricing-plan-two`, `/pages/privacy-policy`, `/pages/recently-viewed`, `/pages/rtl`, `/pages/style-guide`, `/pages/team`, `/pages/terms-conditions`, `/pages/testimonials`, `/pages/under-maintenance`

### Traveler Dashboard (33)

`/user/chat`, `/user/customer-activities-booking`, `/user/customer-all-bookings`, `/user/customer-bus-booking`, `/user/customer-cancellation-refunds`, `/user/customer-car-booking`, `/user/customer-coupons`, `/user/customer-cruise-booking`, `/user/customer-flight-booking`, `/user/customer-gift-cards`, `/user/customer-hotel-booking`, `/user/customer-invoices`, `/user/customer-loyalty-points`, `/user/customer-referral-program`, `/user/customer-reward-history`, `/user/customer-tour-booking`, `/user/customer-tour-guides-booking`, `/user/customer-trip-details`, `/user/customer-visa-booking`, `/user/dashboard`, `/user/integration-settings`, `/user/manage-booking`, `/user/my-profile`, `/user/notification-settings`, `/user/notifications`, `/user/payment`, `/user/preferences-settings`, `/user/profile-settings`, `/user/review`, `/user/security-settings`, `/user/travel-voucher`, `/user/wallet`, `/user/wishlist`

### Agency Dashboard (30)

`/agent/agent-account-settings`, `/agent/agent-activities-booking`, `/agent/agent-booking-details`, `/agent/agent-bus-booking`, `/agent/agent-bussiness-details`, `/agent/agent-cancellation-request`, `/agent/agent-car-booking`, `/agent/agent-chat`, `/agent/agent-commission-summary`, `/agent/agent-cruise-booking`, `/agent/agent-dashboard`, `/agent/agent-earnings`, `/agent/agent-enquirers`, `/agent/agent-enquiry-details`, `/agent/agent-flight-booking`, `/agent/agent-guide-booking`, `/agent/agent-hotel-booking`, `/agent/agent-listings`, `/agent/agent-notification`, `/agent/agent-notification-settings`, `/agent/agent-payment-history`, `/agent/agent-payout-request`, `/agent/agent-pending-payouts`, `/agent/agent-plans`, `/agent/agent-plans-settings`, `/agent/agent-review`, `/agent/agent-security-settings`, `/agent/agent-settings`, `/agent/agent-tour-booking`, `/agent/agent-visa-booking`

### Agency Onboarding (1)

`/become-an-expert`

### Out-of-scope verticals (41)

`/activity/activity-booking`, `/activity/activity-booking-confirmation`, `/activity/activity-details`, `/activity/activity-grid`, `/activity/activity-list`, `/activity/activity-map`, `/activity/add-activity`, `/activity/edit-activity`, `/bus/add-bus`, `/bus/bus-booking`, `/bus/bus-booking-confirmation`, `/bus/bus-details`, `/bus/bus-left-sidebar`, `/bus/bus-list`, `/bus/bus-right-sidebar`, `/bus/bus-seat-selection`, `/bus/edit-bus`, `/car/add-car`, `/car/car-booking`, `/car/car-booking-confirmation`, `/car/car-details`, `/car/car-grid`, `/car/car-list`, `/car/car-map`, `/car/edit-car`, `/cruise/add-cruise`, `/cruise/cruise-booking`, `/cruise/cruise-booking-confirmation`, `/cruise/cruise-cabin-selection`, `/cruise/cruise-details`, `/cruise/cruise-grid`, `/cruise/cruise-list`, `/cruise/cruise-map`, `/cruise/edit-cruise`, `/guide/add-guide`, `/guide/edit-guide`, `/guide/guide-booking`, `/guide/guide-booking-confirmation`, `/guide/guide-details`, `/guide/guide-grid`, `/guide/guide-list`
