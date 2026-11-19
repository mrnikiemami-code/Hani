# Hani — TASKS

> وضعیت‌ها: ✅ Done | 🚧 In Progress | ⚠️ Partial | ⏳ Next | ❌ Not Started
> هر تسک باید حداکثر ۱ روز کاری باشد.

> **Baseline:** از این لحظه هر تسک باید به یک `GAP-xx` در [`baseline.json`](baseline.json) متصل باشد. Gate 6 فعال است: GAP-12/22/23/24/30/33/34.

## Baseline Task Index

| Gate | ID | تسک | وضعیت | GAP | DoD |
|---|---|---|---|---|---|
| 1 | TC-083 | Tour Content Model | ✅ | GAP-01 | itinerary/services/policies |
| 1 | TC-084 | Offer Accommodation + Flight Options + MealPlan | ✅ | GAP-02/03 | چند هتل/اتاق/پرواز |
| 1 | TC-082 | PriceComponent + TaxStatus + Snapshot + PaymentObligation + Commission per currency | ✅ | GAP-07/08 | چندارزی/مالیات/دفتر |
| 2 | TC-085 | Faceted Search + Sort | ✅ | GAP-04 | فیلترهای کامل |
| 2 | TC-097 | SEO + Landing + Sitemap | ✅ | GAP-28 | Canonical/JSON-LD |
| 3 | TC-086 | User Identity + OTP + Profile | ✅ | GAP-09/10 | auth/profile |
| 3 | TC-087 | Agency Onboarding + Panel | ✅ | GAP-26/27/31 | مجوز/پنل |
| 3 | TC-089 | Reviews + Photos + Claims | ✅ | GAP-11/20/32 | UGC/اعتماد |
| 4 | TC-088 | BookingMode + Request/Lead + RFQ | ✅ | GAP-05/06/19 | Online + Request + Lead |
| 4 | TC-098 | Installments + Offline Payment | ✅ | GAP-17/18 | اقساط/آفلاین |
| 5 | TC-090 | Hotels + Inquiry | ✅ | GAP-14 | هتل/استعلام |
| 5 | TC-091 | Visa + Documents | ✅ | GAP-15/21 | ویزا/مدارک |
| 5 | TC-092 | Flights Metasearch | ✅ | GAP-16 | جستجو/ارجاع |
| 5 | TC-094 | Places + Geo + Restaurant Reservation | ✅ | GAP-13/25/29 | دایرکتوری/نقشه |
| 6 | TC-093 | Content: Itineraries/Blog/Videos | ✅ | GAP-12 | محتوا |
| 6 | TC-095 | Media + Moderation | ✅ | GAP-32 | آپلود/مدیریت |
| 6 | TC-096 | SMS + Newsletter + Notifications | ✅ | GAP-22/33 | OTP/خبرنامه |
| 6 | TC-099 | Ranking + Ads + Analytics | ✅ | GAP-24/30/34 | رتبه/تبلیغ/آنالیتیکس |
| 6 | TC-100 | Campaigns + BlindTour | ✅ | GAP-23 | کمپین |

> Gate 7 (Channel/Billing) و Gate 8 (Hardening) در Baseline به‌عنوان Hani-Better تعریف شده‌اند و GAP مستقیم Lastsecond ندارند.

> **Gate 7 PASSED (Core).** Channel OAuth/API, Refund/Invoice, Settlement/Payout, Webhook/Dunning/Dashboard, Reconciliation/Chargeback.
> **Gate 8 PASSED (Core).** Search read model/indexes/batch/cache, content sitemap, Testcontainers, k6/SLO, DR drill, security controls, observability, ADR-0029.

## Phase 0 — Foundation ✅

| ID | تسک | وضعیت | وابستگی | DoD | Commit |
|---|---|---|---|---|---|
| TC-001 | Solution + ساختار پوشه | ✅ | — | build سبز | `825ed39` |
| TC-002 | Central Packages + lock | ✅ | TC-001 | restore locked | `825ed39` |
| TC-003 | Docker Compose | ✅ | — | Postgres/Redis/Seq بالا | `98ab18d` |
| TC-004 | Domain primitives | ✅ | TC-001 | تست واحد | `825ed39` |
| TC-005 | Result/Error | ✅ | TC-004 | تست واحد | `825ed39` |
| TC-006 | CQRS contracts | ✅ | TC-005 | تست واحد | `825ed39` |
| TC-007 | ValidationBehavior | ✅ | TC-006 | تست واحد | `825ed39` |
| TC-008 | LoggingBehavior + Serilog | ✅ | TC-007 | لاگ ساختاریافته | `98ab18d` |
| TC-009 | OpenTelemetry | ✅ | TC-008 | trace/OTLP | `98ab18d` |
| TC-010 | Idempotency | ⚠️ | TC-007 | InMemory + Behavior؛ پایدار نشده | `98ab18d` |
| TC-011 | Cache abstraction | ✅ | — | Memory/Redis/None | `98ab18d` |
| TC-012 | MassTransit + Outbox | ⚠️ | TC-011 | wired؛ Outbox خاموش | `ab3b2e7` |
| TC-013 | TenantContext | ✅ | — | تست ایزولاسیون پایه | `98ab18d` |
| TC-014 | Localization foundation | ✅ | — | config-driven languages + localized title | `d4b9465` / `5b956d3` |

## Phase 1 ? Core Domain ? (Gate Passed)

| ID | تسک | وضعیت | وابستگی | DoD | Commit |
|---|---|---|---|---|---|
| TC-015 | Agency + User/Role | ⚠️ | TC-013 | Agency ✅ / User,Role ❌ | `af5b415` |
| TC-016 | ApiClient + Scope | ? | TC-015 | ???? ?????? + enforcement | `d4b9465` |
| TC-017 | API Key Auth + Tenant isolation | ? | TC-016 | 401/403 + demo | `d4b9465` |
| TC-018 | TourProduct + Translation | ✅ | TC-015 | CRUD + publish | `9fa5a3e` |
| TC-019 | Destination / Hotel / Attraction / Visa | ⚠️ | TC-018 | Destination ✅ / بقیه ❌ | `9fa5a3e` |
| TC-020 | AgencyOffer CRUD | ? | TC-018 | Upsert + Archive + Moderation | `d4b9465` |
| TC-021 | Departure + Price + Capacity | ✅ | TC-020 | سانس + ظرفیت + قیمت + Concurrency | `56a9243` |
| TC-022 | Supplier upsert + idempotency | ? | TC-021 | upsert + Idempotency-Key | `d4b9465` |
| TC-023 | Moderation | ? | TC-022 | Submit/Approve/Reject | `d4b9465` |
| TC-079 | Documentation | ✅ | TC-001 | XML summaries + module READMEs + DocumentationTests | `8bc804c` |
| TC-080 | Config-driven i18n + IIdGenerator | ✅ | TC-014 | زبان از تنظیمات؛ UUIDv7 از interface؛ LocalizationHardcodeTests | `5b956d3` |
| TC-081 | Central ProblemDetails + Correlation ID | ✅ | TC-080 | همه خطاها RFC 7807 + `X-Correlation-Id` + trace | `3b4c68e` |
| TC-024 | Search projection | ? | TC-018 | search + min price + offer count | `17b6415` |
| TC-025 | Compare API | ? | TC-024, TC-021 | offer comparison + agency names | `17b6415` |
| TC-026 | Quote + Hold | ? | TC-025 | TTL + release + atomic reserve | `422b06d` |
| TC-027 | Order + Contract | ✅ | TC-026 | snapshot immutable + consume hold | `f43339e` |
| TC-028 | PaymentIntent + Gateway | ✅ | TC-027 | idempotent initiate + Hani MoR | `dc76539` |
| TC-029 | Payment Webhook | ✅ | TC-028 | dedupe + verify + Order.Paid | `7b85652` |
| TC-030 | Settlement Ledger | ✅ | TC-028 | double-entry + commission accrual | `0dd6fbe` |
| TC-031 | Channel OAuth | ✅ | TC-017 | token + scope | Gate 7 |
| TC-032 | Channel Catalog/Availability | ✅ | TC-031, TC-021 | فقط Offer مجاز | Gate 7 |
| TC-033 | Channel Booking + Webhook | ✅ | TC-032, TC-026 | end-to-end | Gate 7 |
| TC-034 | Agency Dashboard | ✅ | TC-020 | مدیریت Offer/Departure | Gate 7 |
| TC-035 | Admin Dashboard | ✅ | TC-023 | moderation/settlement | Gate 7 |
| TC-036 | Traveler Dashboard | ✅ | TC-027 | سفارش/لغو | Gate 7 |
| TC-037 | Reviews | ❌ | TC-027 | نقد چندمعیاره | — |
| TC-038 | Content | ❌ | — | بلاگ/سفرنامه | — |
| TC-039 | SEO | ❌ | TC-018 | Slug/Sitemap/JSON-LD | — |
| TC-040 | Web shell + i18n + RTL | ❌ | — | سه زبان | — |
| TC-041 | Marketplace pages | ❌ | TC-025 | SSR/SEO | — |
| TC-042 | Agency/Admin panels | ❌ | TC-034, TC-035 | RBAC | — |
| TC-043 | E2E رزرو | ❌ | TC-033 | Playwright | — |
| TC-044 | CI/CD | ✅ | TC-001 | pipeline | `825ed39` |
| TC-045 | Load test + SLO | ❌ | TC-033 | گزارش | — |
| TC-046 | Backup/DR | ❌ | — | RTO/RPO | — |
| TC-047 | Security review | ❌ | TC-031 | رفع Highها | — |
| TC-048 | Microservice map | ❌ | — | ADR | — |

## Phase 2 — Marketplace Read + Booking

| ID | تسک | وضعیت | وابستگی | DoD |
|---|---|---|---|---|
| TC-049 | Search read model | ❌ | TC-024 | فیلتر + رتبه |
| TC-050 | Compare UI/API | ❌ | TC-025 | چند Offer |
| TC-051 | Booking flow | ❌ | TC-026/027 | end-to-end |
| TC-052 | Contract snapshot | ❌ | TC-027 | immutable |
| TC-053 | Payment callback | ❌ | TC-028 | idempotent |
| TC-054 | Traveler dashboard | ❌ | TC-036 | سفارش‌ها |

## Phase 3 — Channel + Billing + Settlement

| ID | تسک | وضعیت | وابستگی | DoD |
|---|---|---|---|---|
| TC-055 | OAuth2 + scopes | ✅ | TC-017 | token/scope |
| TC-056 | Entitlements + plans | ✅ | TC-055 | Standard/Pro |
| TC-057 | White-label | ✅ | TC-056 | custom domain |
| TC-058 | AgencyCommissionRule | ✅ | TC-015 | per agency/product |
| TC-059 | Invoice + Dunning | ✅ | TC-058 | فاکتور/یادآوری |
| TC-060 | SettlementTerms + Ledger | ✅ | TC-058 | تسویه |

## Phase 4 — Flights

| ID | تسک | وضعیت | وابستگی | DoD |
|---|---|---|---|---|
| TC-061 | Flight domain | ❌ | — | Airline/Airport/Route |
| TC-062 | Supplier adapter | ❌ | TC-061 | Mock + داخلی |
| TC-063 | International adapter | ❌ | TC-062 | GDS/Consolidator |
| TC-064 | PNR + Ticketing | ❌ | TC-062 | deadline job |
| TC-065 | Refund | ❌ | TC-064 | refund quote |

## Phase 5 — Content + Hotels + Visa + SEO

| ID | تسک | وضعیت | وابستگی | DoD |
|---|---|---|---|---|
| TC-066 | Hotels | ❌ | TC-019 | CRUD + media |
| TC-067 | Attractions | ❌ | TC-019 | CRUD + nearby |
| TC-068 | Visa | ❌ | TC-019 | قیمت + مدارک |
| TC-069 | Reviews | ❌ | TC-037 | تایید/پاسخ |
| TC-070 | Content | ❌ | TC-038 | ترجمه |
| TC-071 | SEO engine | ❌ | TC-039 | sitemap/JSON-LD |
| TC-072 | i18n content | ❌ | TC-070 | FA/EN/AR |

## Phase 6 — Hardening

| ID | تسک | وضعیت | وابستگی | DoD |
|---|---|---|---|---|
| TC-073 | Testcontainers | ✅ | TC-003 | integration tests |
| TC-074 | Load test | ✅ | TC-051 | k6 |
| TC-075 | DR drill | ✅ | TC-046 | RTO/RPO |
| TC-076 | Security review | ✅ | TC-055 | رفع High |
| TC-077 | Observability dashboards | ✅ | TC-009 | SLO |
| TC-078 | Microservice extraction | ✅ | TC-048 | ADR |

## Phase 6.1 — Lastsecond Parity (Gate 8.1)

| ID | تسک | وضعیت | وابستگی | DoD |
|---|---|---|---|---|
| G81-01 | Continent + hierarchy | ✅ | TC-094 | DestinationType.Continent + descendant filters |
| G81-02 | Hotel sort/rank | ✅ | TC-090 | newest/reviews/alphabetical/rating/rank |
| G81-03 | Agency directory | ✅ | TC-087 | public list/filter + rating/review |
| G81-04 | Agency profile enrichment | ✅ | G81-03 | profile + approved tour count |
| G81-05 | Author aggregate | ✅ | TC-086/093 | profile + stats + gamification + reviews |
| G81-06 | Home BFF | ✅ | TC-085/093 | tours/visas/itineraries/blog/campaigns |
| G81-07 | Content JSON-LD | ✅ | TC-093 | BlogPosting/Article/VideoObject |
| G81-08 | Review criteria aggregate | ✅ | TC-089 | per-criterion averages |
| G81-09 | Blog tags/related | ✅ | TC-093 | destination tags + related posts |
| G81-10 | Visa related articles | ✅ | TC-091 | related article slugs |
| G81-11 | Media upload | ✅ | TC-089 | multipart upload + storage |
| G81-12 | HTTP Email/SMS sender | ✅ | TC-096 | provider adapter + fallback |
| G81-13 | Frontend | ⏳ External | G81-06 | Next.js app |
| G81-14 | Real flight provider | ⏳ External | TC-092 | credentials/contract |
| G81-15 | Lastgram SSO/Competition | ⏳ External | TC-103 | external ecosystem |

## Phase 6.2 — Gate 9.1 Tour Scope (2026-11-15)

> Baseline: `GAP-04` (Faceted Search) + `GAP-28` (SEO).

| ID | کار | وضعیت | وابستگی | DoD |
|---|---|---|---|---|
| G91-SCOPE-01 | `TourScope` + migration + EF index | ✅ | TC-018 | migration + build |
| G91-SCOPE-02 | `scope` در search/home + read model filter | ✅ | G91-SCOPE-01 | API + OpenAPI + tests |
| G91-SCOPE-03 | تب خانه + لندینگ SEO داخلی/خارجی | ✅ | G91-SCOPE-02 | FA/AR RTL + EN LTR |
| G91-SCOPE-04 | تب scope در لیست تور + شمارش واقعی | ✅ | G91-SCOPE-02 | template tabs + build |
| G91-SCOPE-05 | جستجوی کامل/فیلتر listing به query string | ⏳ Next | G91-SCOPE-04 | pagination + filter sync |
| G91-SCOPE-06 | seed/تمیزکاری داده demo | ⏳ Next | ops | domestic/foreign demo data |

## Phase 6.3 — Gate 9.1 C3 Preferences (2026-11-16)

> Baseline: `GAP-09` (Identity) + `GAP-10` (Profile).

| ID | کار | وضعیت | وابستگی | DoD |
|---|---|---|---|---|
| G91-PREF-01 | `UserPreferences` + migration + repository | ✅ | TC-086 | migration + tests |
| G91-PREF-02 | `GET/PUT /market/v1/me/preferences` | ✅ | G91-PREF-01 | auth + OpenAPI + fallback |
| G91-PREF-03 | Settings page + display preferences | ✅ | G91-PREF-02 | FA/AR RTL + EN LTR |
| G91-PREF-04 | user → cookie → default precedence | ✅ | G91-PREF-03 | home + settings |
| G91-PREF-05 | Apply theme/reducedMotion on `<html>` | ⏳ Next | G91-PREF-03 | no-flash server attrs |

## Phase 6.4 — Gate 9.1 C4/C5 Dashboard Core (2026-11-16)

> Baseline: `GAP-09` (Identity) + `GAP-05` (Orders) + `GAP-26` (Agency Dashboard).

| ID | کار | وضعیت | وابستگی | DoD |
|---|---|---|---|---|
| G91-DASH-01 | `/market/v1/me/dashboard` + `/me/orders` | ✅ | GAP-05 | summary + paging |
| G91-DASH-02 | Traveler dashboard real cards/orders | ✅ | G91-DASH-01 | FA/AR RTL + EN LTR |
| G91-DASH-03 | `/market/v1/me/agency/dashboard` | ✅ | GAP-26 | owner-only totals |
| G91-DASH-04 | Agency dashboard real cards | ✅ | G91-DASH-03 | empty state |
| G91-DASH-05 | Invoices/payments/refunds/wishlist lists | ⏳ Next | G91-DASH-01 | authenticated endpoints |
| G91-DASH-06 | Remove remaining mock dashboard sections | ⏳ Next | G91-DASH-04 | no mock data |

## Phase 6.5 — Gate 9.1 C6 Checkout Core (2026-11-16)

> Baseline: `GAP-05` (Booking) + `GAP-06` (Payment) + `GAP-07` (MoR).

| ID | کار | وضعیت | وابستگی | DoD |
|---|---|---|---|---|
| G91-CHK-01 | Checkout page + compare data | ✅ | G91-DASH-01 | price/availability from API |
| G91-CHK-02 | quote → hold → order → intent | ✅ | GAP-05/06 | Idempotency-Key |
| G91-CHK-03 | Confirmation page + local return URL | ✅ | G91-CHK-02 | order/payment state |
| G91-CHK-04 | Real PSP/webhook completion | ⏳ External | G91-CHK-02 | credentials/sandbox |
| G91-CHK-05 | Invoice/refund UI | ⏳ Next | G91-DASH-05 | traveler-visible |

## Phase 6.6 ? Gate 9.1 Data Completeness (2026-11-16)

> Baseline: `GAP-04` (Search) + `GAP-28` (SEO).

| ID | ??? | ????? | ??????? | DoD |
|---|---|---|---|---|
| G91-DATA-01 | Tour `CoverImageUrl` + migration | ? | G91-SCOPE-01 | API + card fallback |
| G91-DATA-02 | Blog/Travelogue author/reading time | ? | GAP-12 | summary + home card |
| G91-DATA-03 | Visa cover image | ? Next | GAP-15 | migration + card |
| G91-DATA-04 | Full tour filter query-string sync | ? Next | G91-SCOPE-04 | pagination + filters |
| G91-QA-03 | Template-wide axe/Lighthouse pass | ? Next | G91-QA-01 | ARIA/labels/contrast |

## Phase 6.7 ? Home Parity+ Phase 1 (2026-11-16)

| ID | ??? | ????? | DoD |
|---|---|---|---|
| H91-HOME-01 | Home BFF sections | ? | featured/domestic/foreign/originCities |
| H91-HOME-02 | Search options endpoint | ? | server-driven origins/destinations/durations/hotels |
| H91-HOME-03 | Tour origin name | ? | resolved in search DTO + unit test |
| H91-HOME-04 | Frontend home contract | ? | HomeFeed types + API filters |

## Phase 6.8 ? Home Parity+ Phase 2 (2026-11-16)

| ID | ??? | ????? | DoD |
|---|---|---|---|
| H91-HERO-01 | Tour default active service | ? | hero default Tour |
| H91-HERO-02 | Domestic/foreign scope tabs | ? | semantic tabs + no reload |
| H91-HERO-03 | Conditional field schema | ? | foreign/domestic fields |
| H91-HERO-04 | Search options fetch | ? | `/api/home/search-options` |
| H91-HERO-05 | Localized date labels | ? | FA/AR/EN |
| H91-HOME-05 | Latest domestic/foreign sections | ? | home feed scope lists |

## Phase 6.9 ? Home Parity+ Phase 3 (2026-11-16)

| ID | ??? | ????? | DoD |
|---|---|---|---|
| H91-HOME-06 | Origin cities section | ? | name/slug/count + link filter |
| H91-HOME-07 | Travelogue/blog split | ? | separate sections |
| H91-HOME-08 | Visa cover/processing | ? | migration + DTO + card |
| H91-HOME-09 | Destination translation loading | ? | explicit Include |

## Phase 6.10 ? Home Parity+ Phase 4 (2026-11-16)

| ID | ??? | ????? | DoD |
|---|---|---|---|
| H91-SEO-01 | Canonical/hreflang/OG/Twitter | ? | home + tours |
| H91-SEO-02 | JSON-LD | ? | Organization/WebSite/SearchAction/ItemList/BreadcrumbList |
| H91-SEO-03 | Sitemap/robots | ? | all locales + scope |
| H91-A11Y-01 | Topical H1 + main landmark + skip link | ? | home |
| H91-A11Y-02 | Keyboard tabs + labels + slider labels | ? | home/hero/tours |
| H91-QA-04 | Lighthouse home | ? | 100/100/100 |
| H91-QA-05 | Listing accessibility debt | ? | template filter/sidebar 100 |
| H91-QA-06 | FA/EN/AR Lighthouse | ? | home 100/100/100 |
| H91-QA-07 | Sitemap/robots/metadata regression tests | ? | Playwright 10 passed |

## Phase 6.11 ? Calendar architecture (planned, 2026-11-16)

| ID | ??? | ????? | DoD |
|---|---|---|---|
| H91-CAL-01 | ADR + calendar boundary | ? | ADR-0032 accepted |
| H91-CAL-02 | Jalali/Gregorian adapter + tests | ? | shared adapter + UI/API checks |
| H91-CAL-03 | Hani date picker primitives | ? | FA Jalali, EN/AR Gregorian, a11y |
| H91-CAL-04 | Replace all shared pickers | ? | shared pickers and legacy locale-aware facade |
| H91-CAL-05 | Migrate all date displays | ? Public | no raw formatting in migrated public pages |
| H91-CAL-06 | Server Gregorian validation + clock | ? | global MediatR DateOnly guard + marketplace/flight validators |
| H91-CAL-07 | Query/API payload guarantee | ? | Playwright checks Gregorian canonical values |
| H91-CAL-09 | Architecture guard | ? | verify fails on direct calendar/raw date UI |
| H91-CAL-08 | FA/EN/AR + mobile visual QA | ? | screenshots + Lighthouse 100 |

## Phase 6.12 ? Homepage control panel and agency advertising (2026-11-17)

| ID | ??? | ????? | DoD |
|---|---|---|---|
| H91-HOME-10 | Home settings storage/API | ? | JSONB per key+locale, public/admin endpoints |
| H91-HOME-11 | Admin homepage control panel | ? | hero image, section order, visibility |
| H91-HOME-12 | Lastsecond parity default order | ? | 7 core sections, static extras off |
| H91-HOME-13 | Agency contract model | ? Proposed | ADR-0033 + plan |
| H91-HOME-14 | Paid ad campaigns/creatives | ? Proposed | slots, campaign, billing, reports |
| H91-HOME-15 | Media library/upload | ? Blocked | storage/CDN credentials |

## Phase 6.13 ? Content media library (2026-11-17)

| ID | ??? | ????? | DoD |
|---|---|---|---|
| H91-MEDIA-01 | WebP conversion service | ? | ImageSharp ? WebP variants |
| H91-MEDIA-02 | Media DB and storage abstraction | ? | metadata + local storage |
| H91-MEDIA-03 | Admin media library | ? | upload, alt, list, delete |
| H91-MEDIA-04 | Responsive SEO delivery | ? | srcset/picture/LCP/OG/CDN/sitemap |
| H91-MEDIA-05 | Folders/tags/usage/replace | ? Core | folders/tags/focal/replace/bulk; usage/audit APIs; quota deferred |
| H91-MEDIA-06 | Content CMS and revisions | ? | rich text/revisions/schedule/admin/public/sitemap |
| H91-MEDIA-07 | S3/R2/cloud storage | ? Phase 5 | provider adapter |
| H91-MEDIA-08 | Admin media/content polish | ? | 20MB uploads, tag chips, focal labels, CKEditor GPL, SEO audit, mobile shell |
| H91-MEDIA-09 | Content admin table/editor split | ? | template table, create/edit/delete routes, rich editor toolbar |
| H91-MEDIA-10 | Media admin table/editor split | ? | filterable/paginated table, create/edit routes, folder filter |
| H91-MEDIA-11 | Content admin filters/pagination | ? | server search, type/status filters, page count, compact table |
| H91-MEDIA-12 | Unified message system | ? | toast + modal, timed display, success/warning/question/error |
| H91-SEC-01 | OTP security phases 1-2 | ? | memory state provider, 120s timer, IP/mobile limits, admin settings |
| H91-SEC-02 | OTP Redis adapter | ? Future | replace InMemoryOtpSecurityState with shared Redis implementation |
| H91-ADMIN-01 | Admin panel architecture | ? Planning | 12-section IA, template reuse map, RBAC, finance/audit rules, delivery phases |
| H91-ADMIN-02 | Admin phase 1 foundation | ? In progress | permission shell, dashboard, agencies, users; roles/audit/settings next |
| H91-ADMIN-03 | Admin phase 2 catalogue slice | ? In progress | products overview, hotels read model/search/pagination; tours/flights/visas/forms next |
| H91-HOTEL-01 | Hotel Lastsecond content parity | ? Partial | property type/contact/check-in/out/status/SEO done; policies remain |
| H91-HOTEL-02 | Hotel media/amenity parity | ? Done | categorized image/alt/cover/source/media and amenity code/icon/sort done |
| H91-HOTEL-03 | Hotel trust parity | ? Done | review breakdown/list/photos, recommendation, city rank, helpful/report, moderation |
| H91-HOTEL-04 | Hotel request/commerce parity | ? Done | request form, inventory/rates/tax/cancellation, stop-sell |
| H91-HOTEL-05 | Hotel public detail parity | ? Done | detail page, JSON-LD, sitemap, booking widget, owner claim, filters |
| H91-ADMIN-04 | Phase 3 bookings/finance operations | ? In progress | order detail/cancel, per-currency refunds, payout settlement, ledger/invoices/reconciliations; remaining phase-3 reads and operational polish |
| H91-ADMIN-05 | Admin governance: audit + dual approval | ? Done | append-only audit, two-person refund/settlement, self-approval denial, bank evidence, approvals/audit pages |
| H91-ADMIN-06 | Phase 4 marketing campaigns | ? Done | admin list/create/activate, localized content, Jalali dates, responsive table, audit |
| H91-ADMIN-07 | Phase 4 operational reports | ? Done | orders/revenue/refunds/commission/payouts/agencies/catalog/users/support KPIs, responsive tables |
| H91-ADMIN-08 | Phase 4 support + notifications | ? Done | ticket list/create/detail/reply/internal note/status, notification outbox + retry, audit |
| H91-ADMIN-09 | Phase 4 advertising | ? Done | ad slot/creative admin, impressions/clicks, audit |
| H91-ARCH-01 | Endpoint DbContext remediation: ads | ? Done | application query, read-model port, infrastructure implementation, ratchet test, architecture report |
| H91-ARCH-02 | Endpoint DbContext remediation: remaining admin | ? Done | all endpoints moved to application services/read models; audit writer moved; allowlist empty |
| H91-ARCH-03 | API composition-root cleanup | ? Done | thin Program, Configuration/Pipeline/Endpoints folders, middleware/health/audit folders, composition tests |
| H91-ADMIN-10 | Phase 5 channel API administration | ? Done | API clients create/list/revoke, one-time secret, plans, white-label, webhook, audit, responsive UI |
| H91-ADMIN-11 | Phase 5 supplier integration admin | ? Done | supplier offer moderation, approve/reject, audit, supplier scope, responsive UI |
| H91-ADMIN-12 | Phase 5 flight ticketing | ? Blocked | requires real flight provider credentials and ticketing contract |
| H91-ADMIN-13 | Phase 5 advanced BI | ? Partial | operational KPI reports done; exports/cohort/trend BI remains |
| H91-ADMIN-14 | Batch 1: roles, settings, agency detail | ? Done | role-permission matrix, user role assignment, platform base settings, agency documents/contracts, UI verified |
| H91-ADMIN-15 | Batch 2: hotel create | ? Done | admin create endpoint, create route, hotel editor create mode, responsive UI |
| H91-ADMIN-16 | Batch 2: tours/flights/visas | ? Done | tours create/publish, flight routes/references/offers, visa countries/types, application status |
| H91-ADMIN-17 | Batch 2: tours admin | ? Done | tour list/create/publish, localized content, responsive UI |
| H91-ADMIN-18 | Batch 3: booking decisions | ? Done | reservation request confirm/reject with audit, cancellation reason workflow, refund status list, order contact updates |
| H91-ADMIN-19 | Batch 3: contracts/vouchers/history | ? Done | immutable contract snapshot, printable voucher, order audit history, responsive FA/EN/AR UI |
| H91-ADMIN-20 | Batch 4: finance settings | ? Done | bank accounts, currencies/FX, tax rules, settlement policy persisted with audit |
| H91-ADMIN-21 | Batch 4: reconciliation/exports | ? Done | expected-vs-actual reconciliation runs, CSV exports with report.export permission, approval history |
| H91-ADMIN-22 | Batch 4: advanced BI trend | ? Done | daily revenue and order trend tables; cohort/visit funnel remains blocked by traffic data |
| H91-ADMIN-23 | Batch 5: support SLA and assignment | ? Done | priority SLA targets/states, first-response metadata, real admin assignee selector |
| H91-ADMIN-24 | Batch 5: dispute workflow | ? Done | dispute aggregate, create/list/status endpoints, ticket panel, disputes list, audit |
| H91-ADMIN-25 | Batch 5: support quality reports | ? Done | first-response/resolution averages, SLA breakdown, category and assignee load |
| H91-OPS-01 | Batch 6: production configuration guard | ? Done | fail-fast for dev secrets, Mock PSP, memory cache, InMemory messaging, wildcard hosts |
| H91-OPS-02 | Batch 6: health and security hardening | ? Done | JSON health, storage/payment/Redis readiness, no-store internal responses, CORP headers |
| H91-OPS-03 | Batch 6: provider adapters | ? Done | HTTP PSP checkout/refund/webhook adapter, notification mode and idempotent HTTP delivery |
| H91-OPS-04 | Batch 6: backup and release runbook | ? Done | checksummed backup/restore scripts, production checklist, DR updates |
| H91-OPS-05 | Batch 6: load/readiness smoke | ? Done | k6 readiness + search scenario with thresholds |
| H91-PORTAL-01 | Batch 7: customer ticket portal | ? Done | authenticated list/detail/reply with owner checks and hidden internal notes |
| H91-PORTAL-02 | Batch 7: customer disputes | ? Done | list/detail/open dispute from owned ticket with customer UI |
| H91-PORTAL-03 | Batch 7: support notifications and UX | ? Done | customer/admin reply and dispute notifications, sidebar links, responsive FA/EN/AR UI |
| H91-PORTAL-04 | Batch 8: support attachments | ? Done | private upload/download, type/size validation, internal-note isolation, customer/admin file UI |
| H91-PORTAL-05 | Batch 8: unread and deep links | ? Done | customer/admin read state, unread badges, support notification deepLink payloads |
| H91-PORTAL-06 | Batch 9: attachment security | ? Done | ClamAV scanner port, quarantine rejection, production requirement, upload rate limit, WebP thumbnails |
| H91-PORTAL-07 | Batch 9: read receipts and live refresh | ? Done | customer/support last-read display, 20s visible-tab thread refresh, admin quick replies |
| H91-PORTAL-08 | Batch 9: inbound email-to-ticket | ? Done | HMAC webhook, append-by-ticket-number, new email tickets, provider secret guard |
| H91-OPS-06 | Batch 10: real-time support | ? Done | authenticated SignalR hub, owner/agent groups, message/dispute events, polling fallback |
| H91-OPS-07 | Batch 10: provider dedup and retention | ? Done | ProviderMessageId dedup, pending attachment retention service |
| H91-OPS-08 | Batch 10: CORS/SignalR operations | ? Done | credential CORS origins, production guard, ClamAV security compose profile, realtime runbook |
| H91-OPS-09 | Batch 11: SignalR scale-out | ? Done | Redis backplane, production requirement, two-instance cross-node delivery test |
| H91-OPS-10 | Batch 11: race-safe provider dedup | ? Done | unique filtered index plus duplicate-key recovery |
| H91-OPS-11 | Batch 11: provider/scan smoke | ? Done | ClamAV protocol rejection test, HTTP email provider delivery smoke, multi-instance runbook |

## Batch 12 ? Storefront truthfulness + agency identity

| ID | Task | Status | GAP | DoD |
|---|---|---|---|---|
| B12-01 | Tour product by slug public read | Done | GAP-01 | endpoint + integration assertion |
| B12-02 | Real tour detail page | Done | GAP-01 | localized content/itinerary/offers |
| B12-03 | Real visa detail page | Done | GAP-15/21 | types/prices/documents/steps/FAQ |
| B12-04 | Real visa application + confirmation | Done | GAP-15/21 | API submit + confirmation by id |
| B12-05 | Canonical detail links | Done | GAP-01/15 | listing/home links use `/{tours,visa}/{slug}` |
| B12-06 | Agency identity from session | Done | GAP-26 | `/api/agency/me` sidebar profile |
| B12-07 | Flight storefront real search | Next | GAP-16 | replace demo flights with `SearchFlights` |
| B12-08 | Admin product edit screens | Next | GAP-15/16 | edit/publish tour, visa, flight |
| B12-09 | Visa document uploads + tracking | Next | GAP-15/21 | upload + customer tracking |
| B12-10 | RFQ/offer queue | Next | GAP-05/06/19 | offer/contract/deposit/final payment |

## Batch 13 ? Remaining audit gaps

| ID | Task | Status | DoD |
|---|---|---|---|
| B13-01 | Real flight metasearch storefront | Done | real routes/offers/dates/prices |
| B13-02 | Real tour listing filters | Done | query/price/duration/type/sort |
| B13-03 | Real visa listing filters | Done | query/price/processing |
| B13-04 | Admin product edit screens | Done | tour/visa/flight GET+PUT |
| B13-05 | Visa document uploads | Done | multipart PDF/JPEG/PNG |
| B13-06 | Visa tracking | Done | number+contact lookup |
| B13-07 | RFQ lead queue + CSV export | Done | admin bookings + export |
| B13-08 | Agent hardcoded identity | Done | AgencyName across agent dashboard |
| B13-09 | Real tour reviews | Done | public reviews API |
| B13-10 | Flight inventory sync/ticketing | External | provider contract required |
| B13-11 | RFQ saved views | Next | optional CSV exists |

## Batch 12S ? Security Review & Observability

| ID | Task | Status | DoD |
|---|---|---|---|
| B12S-01 | Redis distributed rate limiter | Done | shared atomic counters |
| B12S-02 | Production limiter guard | Done | Redis required in prod |
| B12S-03 | Frontend CSP/security headers | Done | CSP/HSTS/COOP/CORP |
| B12S-04 | Security regression tests | Done | headers + no-store |
| B12S-05 | Security/observability report | Done | findings and evidence |

## Phase 7 ? SEO, Performance & Launch Readiness

| ID | Task | Status | DoD |
|---|---|---|---|
| P7-01 | Lighthouse audit | Done | mobile/desktop baseline |
| P7-02 | Accessibility fixes | Done | mobile a11y 100 |
| P7-03 | Font subsetting | Done | iconsax/tabler/FA subsets |
| P7-04 | Remove Google Fonts import | Done | FCP 1.2s mobile |
| P7-05 | Sitemap coverage | Done | tours/hotels/visas included |
| P7-06 | Canonical/hreflang | Done | tour/visa/list pages |
| P7-07 | Structured data | Done | Tour/Offer/Service/FAQ/Breadcrumb |
| P7-08 | Robots private routes | Done | user/admin/agent/checkout/visa |
| P7-09 | Mobile LCP budget | In progress | legacy hero/HTML budget |

| P7-10 | Sitemap/robots revalidation | Done | hourly refresh |
| P7-11 | Lighthouse CI budgets | Done | `scripts/lighthouse-audit.ps1` |
| P7-12 | Hero paint optimization | Done | backdrop/fixed background removed |

| P7-13 | Conditional hero tab rendering | Done | only active pane in DOM |
| P7-14 | Tab switching verification | Done | FA hotel/tour pane switch |

## Planned ? Page Composition & Banner Platform

| ID | Task | Status | DoD |
|---|---|---|---|
| PC-00 | Page/image inventory and contracts | Planned | page keys, image slots, schemas |
| PC-01 | PageComposition aggregate and API | Planned | draft/publish, validation, migration |
| PC-02 | Admin page builder shell | Planned | page list, sections, media picker |
| PC-03 | Home completion | Planned | every home image/section editable |
| PC-04 | Global chrome/static pages | Planned | header/footer/about/contact/legal |
| PC-05 | Listing compositions | Planned | tours/visas/hotels/flights |
| PC-06 | Detail compositions + banners | Planned | tour/visa/hotel + ad placement |
| PC-07 | Governance and rollout | Planned | preview, audit, cache, SEO/Lighthouse |
