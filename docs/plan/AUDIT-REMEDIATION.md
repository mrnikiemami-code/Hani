# Audit Remediation Plan — Lastsecond Full Audit 2026-11-14

- **مرجع Audit:** `docs/reports/lastsecond-full-architecture-audit-2026-11-14.md`
- **هدف:** تبدیل شکاف‌های Audit به Taskهای قابل‌پیگیری، با GAP، Gate، وابستگی و Acceptance Criteria
- **وضعیت:** A-01..A-08 ✅ Done؛ B/C/D برای Gateهای 5–8 برنامه‌ریزی شده‌اند
- **قاعده:** B/C/D بخشی از دامنه محصول Gateهای 5–8 هستند، نه «باگ Audit». بستن آن‌ها فقط در Gate مربوطه معنا دارد.

---

## ۱. تعریف «بسته‌شدن»

یک Action فقط وقتی `Done` است که:

1. کد + migration + تست داشته باشد.
2. OpenAPI/README مربوطه به‌روز باشد.
3. `verify.ps1` و `check-baseline.ps1` سبز باشند.
4. Evidence در همین سند و `baseline.json` (در صورت GAP) ثبت شود.
5. STATUS/TASKS به‌روز باشند.

---

## ۲. A — Audit Blockers (قبل از Gate 5)

| ID | عنوان | GAP موجود | Gate | Priority | وابستگی | Acceptance | Status |
|---|---|---|---|---|---|---|---|
| A-01 | `CollectionMode` v2 + `SellerOfRecord`/`InvoiceIssuer` | GAP-18 / ADR-0024 | 4 | P0 | — | سه حالت `HaniOnline/AgencyOnline/AgencyOffline`، snapshot، payment guards، ADR-0026، migration، تست | ✅ Done |
| A-02 | `InstallmentTerms` کامل + eligibility + filter | GAP-17 | 4 | P0 | A-01 | پیش‌پرداخت، MaxMonths، کارمزد ماهانه، چک، snapshot، فیلتر اقساطی، تست | ✅ Done |
| A-03 | Review criteria per target + proof + owner reply | GAP-11 | 3 | P0 | — | criteria برای Hotel/Restaurant/Agency/Attraction، proof، پاسخ مالک، migration، تست | ✅ Done |
| A-04 | تکمیل PublicAgency | GAP-26/27 | 3 | P0 | — | مجوز/تاریخ/مدیر/پرسنل/آدرس/فایل مجوز + DTO عمومی | ✅ Done |
| A-05 | Canonical Hotel + `HotelId` در Offer | GAP-14 | 5 | P0 | — | `Hotel` aggregate، ترجمه/امکانات/مختصات، لینک `HotelId`، API پایه، migration | ✅ Done |
| A-06 | Place/Geo/Nearby | GAP-13/25/29 | 5 | P0 | — | `Place` برای Restaurant/Attraction، مختصات، Nearby API با Haversine، migration | ✅ Done |
| A-07 | ADR تصمیم Flight | GAP-16 | 5 | P0 | — | ADR-0026/0027 انتخاب Metasearch/Redirect + provider abstraction | ✅ Done |
| A-08 | `TourCategory` + `TravelType` + filter | GAP-04 | 2/5 | P0 | — | enumها، migration، DTO، search filter، تست | ✅ Done |

---

## ۳. B — Gate 5 Verticals (پس از A)

| ID | عنوان | GAP | Priority | وابستگی | Acceptance | Status |
|---|---|---|---|---|---|---|
| B-01 | Hotel page + Inquiry + Hotel Review | GAP-14 | P0 | A-05/A-03 | Hotel page API، inquiry form، review criteria، gallery | ✅ Done |
| B-02 | Restaurant domain + menu/amenity/reservation | GAP-13/29 | P0 | A-06/A-03 | Restaurant page، reservation، filters | ✅ Done |
| B-03 | Attraction domain + nearby | GAP-13/25 | P1 | A-06 | Attraction page، nearby graph، map | ✅ Done |
| B-04 | VisaCountry/VisaType/VisaApplication | GAP-15/21 | P0 | — | Visa page، price table، documents، FAQ، request | ✅ Done |
| B-05 | FlightRoute/FlightOffer + deep link | GAP-16 | P1 | A-07 | Metasearch provider abstraction + route page | ✅ Done |
| B-06 | Geo search + city/province landing | GAP-13/25 | P1 | A-06 | Geo filter/distance + landing | ✅ Done |
| B-07 | Vertical SEO + sitemap | GAP-28 | P0 | B-01..B-05 | Schema/JSON-LD + sitemap per vertical | ✅ Done |
| B-08 | Vertical review aggregation/rank | GAP-11 | P1 | A-03 | Aggregate rating + rank per city | ✅ Done |

---

## ۴. C — Gate 6 Content & Growth

| ID | عنوان | GAP | Priority | وابستگی | Acceptance | Status |
|---|---|---|---|---|---|---|
| C-01 | BlogPost/Category/Author/Comment | GAP-12 | P1 | A-04 | Blog model + API + SEO | ✅ Done |
| C-02 | Travelogue + series + media + comments | GAP-12 | P1 | C-01 | Travelogue model + API | ✅ Done |
| C-03 | Video + Aparat/MP4 + level/stats | GAP-12 | P1 | C-01 | Video model + API | ✅ Done |
| C-04 | Badge/Level/Points/TravelStyle | GAP-24 (New) | P2 | A-04 | Gamification aggregate + profile | ✅ Done |
| C-05 | Ads/AdSlot/AdEvent | GAP-30 | P2 | — | Ad model + click tracking | ✅ Done |
| C-06 | Newsletter/SMS consent/campaign | GAP-22 | P1 | — | Subscription + verification + campaign | ✅ Done |
| C-07 | BlindTour/Campaign | GAP-23 | P2 | C-06 | Campaign + registration + FAQ | ✅ Done |
| C-08 | Dashboard requests/passengers/documents/messages | GAP-27 (New) | P1 | A-04 | Request/passenger/document/message aggregates | ✅ Done |

---

## ۵. D — Gate 7/8 Transaction & Hardening

| ID | عنوان | GAP | Priority | وابستگی | Acceptance | Status |
|---|---|---|---|---|---|---|
| D-01 | CancellationPolicy + Order.Cancel | New GAP-45 | P0 | A-01 | Cancel + seat release + compensation | ⏳ Planned |
| D-02 | Refund + PSP refund + ledger reversal | New GAP-45 | P0 | D-01 | Refund aggregate + PSP + ledger | ⏳ Planned |
| D-03 | Invoice + SellerOfRecord/InvoiceIssuer | New GAP-45 | P0 | A-01 | Invoice aggregate + PDF/API | ⏳ Planned |
| D-04 | Agency payout + settlement terms | New GAP-46 | P1 | D-03 | Payout + settlement schedule | ⏳ Planned |
| D-05 | Reconciliation + chargeback | New GAP-46 | P1 | D-04 | Reconciliation + dispute | ⏳ Planned |
| D-06 | Search Read Model + index + cache | GAP-04 | P0 | A-08 | Projection + index + no N+1 | ⏳ Planned |
| D-07 | Sitemap/robots/SEO per vertical | GAP-28 | P1 | B-07 | Full sitemap + localized copy | ⏳ Planned |
| D-08 | Load tests + SLO | GAP-34 | P2 | D-06 | k6 + SLO report | ⏳ Planned |

---

## ۶. ترتیب اجرا

1. **A-01** → **A-02** (چون snapshot و payment به هم وابسته‌اند)
2. **A-03** → **A-04** (Trust قبل از Vertical Review)
3. **A-05** → **A-06** → **A-08** (مدل Vertical + taxonomy)
4. **A-07** (ADR، موازی)
5. Gate 5: B-01..B-08
6. Gate 6: C-01..C-08
7. Gate 7/8: D-01..D-08

---

## ۷. Evidence — A-01..A-08

| ID | Evidence |
|---|---|
| A-01 | `BookingMode.cs`, `PricingSnapshot.cs`, `AgencyOffer.cs`, `CreatePaymentIntentCommandHandler.cs`, `RecordOfflinePaymentCommand.cs`, `ADR-0026`, `20261114045541_AddAuditRemediationOfferFields` |
| A-02 | `InstallmentTerms.cs`, `InstallmentPlan.cs`, `InstallmentPlanConfiguration.cs`, `RequestCommandHandlers.cs`, `20261114045547_AddAuditRemediationBookingFields`, `AuditRemediationTests` |
| A-03 | `Review.cs`, `ReviewConfiguration.cs`, `EngagementCommands.cs`, `EngagementEndpoints.cs`, `20261114045553_AddAuditRemediationIdentityFields` |
| A-04 | `Agency.cs`, `AgencyConfiguration.cs`, `AgencyOnboardingCommands.cs`, `PublicAgencyDto`, `20261114045553_AddAuditRemediationIdentityFields` |
| A-05 | `Hotel.cs`, `HotelConfiguration.cs`, `HotelRepository.cs`, `OfferAccommodationOption.cs`, `20261114045534_AddHotelsPlacesAndTourTaxonomy` |
| A-06 | `Place.cs`, `PlaceConfiguration.cs`, `PlaceRepository.cs`, `GetPlaceQueryHandlers.cs`, `20261114045534_AddHotelsPlacesAndTourTaxonomy` |
| A-07 | `docs/adr/0027-flight-metasearch-redirect.md` |
| A-08 | `TourEnums.cs`, `TourProduct.cs`, `CatalogReadService.cs`, `SearchProductsQueryHandler.cs`, `20261114045534_AddHotelsPlacesAndTourTaxonomy` |

## ۸. Evidence — B-01..B-08

| ID | Evidence |
|---|---|
| B-01 | `Hotel.cs`, `HotelImage`, `HotelConfiguration.cs`, `HotelRepository.cs`, `HotelInquiry.cs`, `RequestEndpoints.cs`, `20261114053204_AddGate5VerticalMedia`, `20261114052322_AddGate5Requests` |
| B-02 | `Place.cs`, `PlaceMenuItem`, `PlaceConfiguration.cs`, `PlaceRepository.cs`, `RestaurantReservation.cs`, `SearchPlacesQueryHandler.cs`, `20261114053204_AddGate5VerticalMedia` |
| B-03 | `Place.cs`, `GetPlaceQueryHandlers.cs`, `GetGeoNearbyQueryHandler.cs`, `20261114045534_AddHotelsPlacesAndTourTaxonomy` |
| B-04 | `VisaCountry.cs`, `VisaCountryConfiguration.cs`, `VisaRepository.cs`, `VisaApplication.cs`, `VisaApplicationConfiguration.cs`, `20261114052316_AddGate5Verticals`, `20261114052322_AddGate5Requests` |
| B-05 | `FlightRoute.cs`, `FlightRouteConfiguration.cs`, `FlightRouteRepository.cs`, `IFlightProvider`, `CatalogFlightProvider`, `ADR-0027`, `20261114052316_AddGate5Verticals` |
| B-06 | `GetGeoNearbyQueryHandler.cs`, `/market/v1/geo/nearby`, `SeoQueryHandlers.cs` destination landing |
| B-07 | `GetVerticalSeoQueryHandler`, `SeoMetadataBuilder.BuildVerticalJsonLd`, `CatalogReadService.GetVerticalSitemapEntriesAsync`, `20261114052316_AddGate5Verticals` |
| B-08 | `IReviewSummaryReadService`, `ReviewSummaryReadService.cs`, `HotelSearchQueryHandler`, `SearchPlacesQueryHandler`, `sort=rating` |

### Gate 5.1 — residual evidence

| مورد | Evidence |
|---|---|
| Restaurant meal/diet | `Place.cs`, `PlaceConfiguration.cs`, `SearchPlacesQuery.cs`, `20261114060152_AddGate51VerticalDepth` |
| Hotel rooms | `Hotel.cs`, `HotelConfiguration.cs`, `HotelDto`, `20261114060152_AddGate51VerticalDepth` |
| Hotel-linked tours | `IHotelOfferReadService`, `OfferReadService.cs`, `GetHotelToursQueryHandler`, `/market/v1/hotels/{slug}/tours` |
| Rank/recommendation | `ReviewSummary.RecommendedCount`, `HotelDto.RankInCity`, `PlaceDto.RankInCity` |
| Review date/gallery | `GetReviewsQuery` from/to, `IReviewMediaReadService`, `GetHotelBySlugQueryHandler` |
| Airline/Airport + filters | `Airline.cs`, `Airport.cs`, `FlightReferenceRepository.cs`, `ExternalFlightProvider`, `/market/v1/flights/references` |
| Visa depth | `VisaCountry.cs` (`IssuanceType`, document category), `VisaApplication.Applicants`, `20261114060158_AddGate51VisaApplicants` |
| Landing/JSON-LD labels | `GetVerticalLandingSeoQueryHandler`, `SeoLabels.cs`, `BuildVerticalJsonLd`, appsettings `Seo:Labels` |
| Violation/Amendment | `ClaimType.cs` enum values |

### Gate 6 — C-01..C-07 evidence

| ID | Evidence |
|---|---|
| C-01 | `BlogPost.cs`, `ContentRepository.cs`, `ContentEndpoints.cs`, `20261114062343_InitialContent`, `content-api-v1.openapi.yaml` |
| C-02 | `Travelogue.cs`, `ContentComment.cs`, `ContentRepository.cs`, `20261114062343_InitialContent` |
| C-03 | `Video.cs`, `ContentRepository.cs`, `ContentEndpoints.cs`, `20261114062343_InitialContent` |
| C-04 | `Gamification.cs`, `GamificationRepository.cs`, `GamificationEndpoints.cs`, `20261114062348_AddGate6Gamification` |
| C-05 | `GrowthAggregates.cs` (`AdSlot`, `AdEvent`), `ContentEndpoints.cs`, `20261114062343_InitialContent` |
| C-06 | `NewsletterSubscription`, `SubscribeNewsletterCommandHandler`, `ContentEndpoints.cs` |
| C-07 | `Campaign`, `CampaignRegistration`, `CreateCampaignCommandHandler`, `ContentEndpoints.cs` |
| C-08 | `UserMessage`, `UserDocument`, `GetDashboardSummaryQueryHandler`, `ContentEndpoints.cs`, `20261114112636_AddGate6DashboardAndNotificationRetry` |

## ۹. وضعیت Baseline

- `baseline.json` فعلاً ۳۴ GAP دارد و تغییر نکرده است.
- GAPهای جدید (`GAP-35..46`) فقط در این سند و Audit Report پیشنهاد شده‌اند.
- افزودن آن‌ها به `baseline.json` نیازمند:
  - ADR نسخه Baseline
  - به‌روزرسانی `BaselineCoverageTests`
  - ثبت Evidence
- تا آن زمان، A-01..A-08 با GAPهای موجود map شده‌اند.
