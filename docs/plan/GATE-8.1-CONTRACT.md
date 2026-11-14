# Gate 8.1 — Lastsecond Parity Closure Contract

- Gate: 8.1
- Status: PASSED (Core)
- Date: 2026-11-14
- Source audit: `docs/reports/lastsecond-reaudit-post-gate8-2026-11-14.md`
- Parent gate: Gate 8 — Hardening PASSED (Core)

## 1. Goal

Close every backend parity gap identified in the post-Gate-8 re-audit, while
keeping the intentional Hani-Better differences (Hani MoR, online checkout,
multilingual content, channel API, settlement ledger).

External integrations that require credentials or a separate frontend are
closed at the adapter/contract level and recorded as deployment deliverables.

## 2. Work packages

| ID | Parity ID | Work package | Acceptance |
|---|---|---|---|
| G81-01 | E-06 | Continent + hierarchical destination filter | `Continent` type exists; hotel/place/tour filters include descendants |
| G81-02 | E-10 | Hotel sort and city rank | `newest`, `reviews`, `alphabetical`, `rating`, `rank` work; rank populated |
| G81-03 | A-11 | Public agency directory | `GET /market/v1/agencies` with city/province/q/paging |
| G81-04 | A-12 | Agency profile enrichment | public profile includes rating, review count, approved tour count |
| G81-05 | E-04 | Author/badge aggregate | `GET /market/v1/authors/{username}/profile` returns profile, stats, level, points, badges, travel styles, review count |
| G81-06 | E-05 | Home/BFF aggregation | `GET /market/v1/home` returns tours, visas, itineraries, blog, campaigns |
| G81-07 | E-03 | Content JSON-LD | Blog/Travelogue/Video SEO endpoints return Article/VideoObject + BreadcrumbList |
| G81-08 | A-13 | Review criteria aggregate | public endpoint returns averages per criterion |
| G81-09 | A-14 | Blog destination tags + related | Blog detail exposes destination ids; related endpoint returns same-category/destination posts |
| G81-10 | E-09 | Visa related articles | Visa type exposes related article slugs and DTO |
| G81-11 | E-08 | Media upload | authenticated multipart upload stores file and registers `MediaAsset` |
| G81-12 | E-02 | HTTP email/SMS provider | configured HTTP provider sends; no config falls back to logging |
| G81-13 | E-01 | Frontend delivery | external Next.js app; backend OpenAPI/BFF contracts are the closure point |
| G81-14 | E-07 | Real flight provider | external provider credentials; adapter/fallback remains the closure point |
| G81-15 | A-15 | Competition/Lastgram SSO | external ecosystem integration; deferred with documented boundary |

## 3. External/deployment deliverables

| Item | Why it cannot be closed in this repository |
|---|---|
| E-01 Frontend | The Hani repository is API-first; the Next.js application is a separate deliverable |
| E-07 Flight credentials | Requires a commercial provider contract, credentials, and sandbox |
| A-15 Lastgram SSO/Competition | Requires Lastgram identity provider and competition rules/legal setup |
| Real SMS/Email sending | Adapter is implemented; the provider credential is deployment configuration |

## 4. Verification

- `dotnet build Hani.slnx -warnaserror`
- `dotnet test Hani.slnx`
- `dotnet ef migrations has-pending-model-changes` for touched contexts
- `scripts/verify.ps1`
- `scripts/check-baseline.ps1`
- OpenAPI updates for every new endpoint
- README updates for touched modules


## 5. Closure status

| ID | Status | Evidence |
|---|---|---|
| G81-01 | Done | `DestinationType.Continent`, `DestinationHierarchy`, catalog repositories |
| G81-02 | Done | `SearchHotelsQueryHandler` sort/rank, `ListByDestinationsAsync` |
| G81-03 | Done | `ListPublicAgenciesQuery`, `GET /market/v1/agencies` |
| G81-04 | Done | `PublicAgencyDto` rating/review count, agency profile BFF tour count |
| G81-05 | Done | `GET /market/v1/authors/{username}/profile` |
| G81-06 | Done | `GET /market/v1/home` |
| G81-07 | Done | content Blog/Travelogue/Video JSON-LD endpoints |
| G81-08 | Done | `GET /market/v1/reviews/criteria` |
| G81-09 | Done | blog destination tags + `/blog/{slug}/related` |
| G81-10 | Done | `VisaType.RelatedArticleSlugs` + migration |
| G81-11 | Done | `POST /market/v1/media/upload`, `IFileStorage`, local storage |
| G81-12 | Done | `HttpNotificationSender` with logging fallback |
| G81-13 | External | Next.js frontend delivery |
| G81-14 | External | Flight provider credentials |
| G81-15 | External | Lastgram SSO/Competition ecosystem |

## 6. Verification evidence

- Build: `dotnet build Hani.slnx -warnaserror`
- Tests: unit + architecture + integration (including agency directory,
  continent hierarchy, criteria aggregate, home feed, and content SEO)
- Migrations: `AddGate81VisaRelatedArticles`, `AddGate81BlogDestinations`
- OpenAPI: marketplace/content API updated
- `verify.ps1` and `check-baseline.ps1`
