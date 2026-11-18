# Architecture Review: DbContext Access in HTTP Endpoints

- **Date:** 2026-11-18
- **Severity:** High
- **Status:** Resolved on 2026-11-19; no endpoint file injects DbContext and the debt allowlist is empty
- **Scope:** `src/Hani.Api`
- **Related:** Clean Architecture dependency rule, CQRS read models, ADR-0032 (contract boundaries)

## 1. Executive Summary

The admin API currently violates the Clean Architecture dependency rule in
13 endpoint files. Those files inject EF Core `DbContext` types and compose
LINQ queries directly in the HTTP delivery layer. This means the endpoint owns:

- query shape and projection
- filtering and pagination semantics
- cross-module joins
- persistence-specific behavior
- transaction and unit-of-work boundaries

This is not allowed. An endpoint may authenticate, validate transport input,
send an application command/query, map the result to HTTP, and return a
problem response. It must not know that PostgreSQL or EF Core exists.

`AdminAdsEndpoints.cs` was the reported example; the entire admin surface has
now been moved behind application interfaces/read models.

## 2. Evidence

At review time, 13 endpoint files contained both endpoint mappings and
`DbContext`/EF Core access. All of them have been removed from the API layer.

| Endpoint file | Direct DbContext references | Affected modules |
|---|---:|---|
| `AdminBookingEndpoints.cs` | 3 | Booking, Payments, Identity (audit) |
| `AdminCatalogEndpoints.cs` | 5 | Catalog |
| `AdminFinanceEndpoints.cs` | 8 | Payments, Settlement |
| `AdminGovernanceEndpoints.cs` | 11 | Identity, Payments, Settlement |
| `AdminMarketingEndpoints.cs` | 3 | Content, Identity (audit) |
| `AdminNotificationEndpoints.cs` | 3 | Content, Identity (audit) |
| `AdminReportEndpoints.cs` | 6 | Booking, Payments, Settlement, Catalog, Identity, Content |
| `AdminSupportEndpoints.cs` | 9 | Content, Identity (audit) |
| `AdminUsersEndpoints.cs` | 1 | Identity |
| `ContentEntryEndpoints.cs` | 12 | Content |
| `HomeSettingsEndpoints.cs` | 2 | Content |
| `HotelFacetEndpoints.cs` | 1 | Catalog |
| `MediaEndpoints.cs` | 8 | Content |

This was not a single bad endpoint. It was a repeated delivery-layer pattern
and is now closed.

## 3. Why This Is a Serious Problem

### 3.1 Dependency Rule violation

Clean Architecture points dependencies inward:

```text
Api -> Application -> Domain
Infrastructure -> Application -> Domain
```

The API must not depend on Infrastructure. Injecting `ContentDbContext`,
`IdentityDbContext`, or `BookingDbContext` into an endpoint makes the delivery
layer depend on EF Core and on database schema details.

### 3.2 Use cases disappear

A query such as "list ad slots with creatives and counters" is a use case. It
has rules, projection semantics, and future caching/pagination concerns. When
it lives in the endpoint, it cannot be reused by a worker, channel API, admin
BFF, or test without starting HTTP.

### 3.3 Cross-module coupling leaks into HTTP

`AdminReportEndpoints` joins Booking, Payments, Settlement, Catalog, Identity,
and Content contexts. A reporting use case should own that composition. The
HTTP layer should not know which schemas participate.

### 3.4 Security and scope are harder to enforce

Data-scope rules (global/agency/self) belong in application/query handlers.
Endpoint queries can accidentally bypass query filters, tenant scoping, or
future row-level authorization.

### 3.5 Tests become infrastructure tests

Testing an endpoint query requires a database or a mock `DbContext`. Testing
an application query handler requires only the read-model port.

### 3.6 Schema changes ripple into the API

Renaming a column or changing an owned collection forces edits in endpoint
files. That is a persistence change leaking into the delivery layer.

### 3.7 Transaction boundaries are unclear

Some endpoints save audit rows directly, some change module aggregates, and
some do both. The unit of work is implicit in HTTP code. Application handlers
should own this.

## 4. Root Cause

1. Admin read models were added quickly beside their pages.
2. There was no application-layer read-model port for admin queries.
3. There was no architecture test that rejected `DbContext` in endpoints.
4. Audit writing was exposed as a `DbContext`-taking helper, encouraging
   endpoints to own persistence.

## 5. Reference Fix: Advertising Slice

The reported `AdminAdsEndpoints.cs` is clean and is now the reference pattern
for every admin endpoint.

### Before

```csharp
private static async Task<IResult> ListAsync(
    ContentDbContext content,
    CancellationToken cancellationToken)
{
    var slots = await content.AdSlots...
}
```

### After

```csharp
private static async Task<IResult> ListAsync(
    HttpContext context,
    ISender sender,
    CancellationToken cancellationToken)
{
    var result = await sender.Send(
        new ListAdminAdSlotsQuery(),
        cancellationToken);
    return result.IsSuccess
        ? Results.Ok(result.Value)
        : context.ToProblem(result.Error!);
}
```

New pieces:

```text
Content.Application/Queries/AdminAds/AdminAdQueries.cs
  ListAdminAdSlotsQuery
  AdminAdSlotDto / AdminAdCreativeDto
  IAdminAdsReadModel (port)

Content.Application/Queries/AdminAds/AdminAdQueryHandlers.cs
  ListAdminAdSlotsQueryHandler

Content.Infrastructure/ReadModels/AdminAdsReadModel.cs
  EF Core implementation of IAdminAdsReadModel
```

The endpoint has zero `DbContext`, `Microsoft.EntityFrameworkCore`, and
`Infrastructure.Persistence` references.

Audit writes now use `AdminAuditWriter.RecordAsync(...)`, so the endpoint does
not receive `IdentityDbContext`. The audit writer remains a transitional
service in `Hani.Api`; it should later move behind an Identity application
interface and Infrastructure implementation.

## 6. Regression Gate

Added `tests/Hani.ArchitectureTests/EndpointDbContextRatchetTests.cs`.

Rules:

1. Any new endpoint file that contains endpoint mappings and `DbContext`/EF
   Core fails the architecture suite.
2. The allowlist is now empty.
3. `AdminAdsEndpoints.cs` has a dedicated assertion that it uses
   `ListAdminAdSlotsQuery` and no persistence types.

No endpoint file in `src/Hani.Api` references `DbContext` or EF Core. Only
`Program.cs` registers DbContexts as the composition root.

## 7. Completed Remediation

### Step 1 - Ads (done)

- Application query + read-model port.
- Infrastructure implementation.
- Endpoint uses `ISender` only.
- Ratchet test added.

### Step 2 - Phase 4 admin endpoints (done)

Moved to application interfaces/read models:

- `AdminMarketingEndpoints`
- `AdminNotificationEndpoints`
- `AdminSupportEndpoints`
- `AdminReportEndpoints`

Target port shape:

```csharp
public interface IAdminSupportReadModel
{
    Task<AdminSupportTicketPageDto> ListAsync(
        SupportTicketFilter filter,
        CancellationToken cancellationToken);
}
```

### Step 3 - Financial and booking admin (done)

- `AdminBookingEndpoints`
- `AdminFinanceEndpoints`
- `AdminGovernanceEndpoints`
- `AdminCatalogEndpoints`

Commands must stay as commands. Only query composition moves.

### Step 4 - Content, media, settings, facets (done)

- `ContentEntryEndpoints`
- `MediaEndpoints`
- `HomeSettingsEndpoints`
- `HotelFacetEndpoints`
- `AdminUsersEndpoints`

### Step 5 - Audit writer boundary (done)

Moved `AdminAuditWriter` from `Hani.Api` to:

```text
Identity.Application: IAdminAuditWriter
Identity.Infrastructure: AdminAuditWriter
```

Endpoints now depend on `IAdminAuditWriter` from
`Hani.Modules.Admin.Application`; the EF implementation lives in
`Hani.Modules.Admin.Infrastructure`.

## 8. Acceptance Criteria for Debt Closure

- No file under `src/Hani.Api` that maps endpoints references `DbContext` or
  `Microsoft.EntityFrameworkCore`.
- Every admin list/detail query is an application service/read model.
- Every EF Core projection lives in `Hani.Modules.Admin.Infrastructure` or
the owning module Infrastructure.
- The ratchet allowlist is empty. (done)
- Architecture tests fail if a `DbContext` returns to the API layer.
- Endpoint unit tests use `ISender` fakes; no database is required.

## 9. Migration Risk

- Behavior drift is the main risk. Each move must preserve filtering,
  pagination, ordering, currency separation, and empty-state behavior.
- UI regression tests must remain green for FA/EN/AR at desktop, tablet, and
  mobile.
- No schema migration is required for this refactor; it is a boundary and
  code-ownership change.

## 10. Final Architecture

The cross-module admin surface now lives in a dedicated composition module:

```text
Hani.Modules.Admin.Application
  service interfaces + read models + IAdminAuditWriter

Hani.Modules.Admin.Infrastructure
  AdminService partial implementation
  AdminAuditWriter implementation
```

Module-local media operations remain in Content.Application/Infrastructure.
No endpoint file in `src/Hani.Api` references DbContext or EF Core. The only
DbContext registration is `Program.cs`, which is the composition root.
