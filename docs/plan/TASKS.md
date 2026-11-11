# Hani — TASKS

> وضعیت‌ها: ✅ Done | 🚧 In Progress | ⚠️ Partial | ⏳ Next | ❌ Not Started
> هر تسک باید حداکثر ۱ روز کاری باشد.

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
| TC-029 | Payment Webhook | ❌ | TC-028 | dedupe | — |
| TC-030 | Settlement Ledger | ❌ | TC-028 | double-entry | — |
| TC-031 | Channel OAuth | ❌ | TC-017 | token + scope | — |
| TC-032 | Channel Catalog/Availability | ❌ | TC-031, TC-021 | فقط Offer مجاز | — |
| TC-033 | Channel Booking + Webhook | ❌ | TC-032, TC-026 | end-to-end | — |
| TC-034 | Agency Dashboard | ❌ | TC-020 | مدیریت Offer/Departure | — |
| TC-035 | Admin Dashboard | ❌ | TC-023 | moderation/settlement | — |
| TC-036 | Traveler Dashboard | ❌ | TC-027 | سفارش/لغو | — |
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
| TC-055 | OAuth2 + scopes | ❌ | TC-017 | token/scope |
| TC-056 | Entitlements + plans | ❌ | TC-055 | Standard/Pro |
| TC-057 | White-label | ❌ | TC-056 | custom domain |
| TC-058 | AgencyCommissionRule | ❌ | TC-015 | per agency/product |
| TC-059 | Invoice + Dunning | ❌ | TC-058 | فاکتور/یادآوری |
| TC-060 | SettlementTerms + Ledger | ❌ | TC-058 | تسویه |

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
| TC-073 | Testcontainers | ❌ | TC-003 | integration tests |
| TC-074 | Load test | ❌ | TC-051 | k6 |
| TC-075 | DR drill | ❌ | TC-046 | RTO/RPO |
| TC-076 | Security review | ❌ | TC-055 | رفع High |
| TC-077 | Observability dashboards | ❌ | TC-009 | SLO |
| TC-078 | Microservice extraction | ❌ | TC-048 | ADR |
