# Admin Module

The Admin module is the application composition layer for cross-module admin
read models and operations. It exists so HTTP endpoint files never inject a
`DbContext` or compose EF Core queries.

## Structure

- `Hani.Modules.Admin.Application`
  - admin read models, service interfaces, and `IAdminAuditWriter`
  - no EF Core dependency
- `Hani.Modules.Admin.Infrastructure`
  - `AdminService` partial implementation
  - uses module DbContexts from Booking, Catalog, Content, Identity, Payments,
    and Settlement
  - `AdminAuditWriter` implementation

## Rules

- Endpoints call an admin application interface or `ISender`.
- EF Core projections stay in Infrastructure.
- Audit rows are append-only.
- The endpoint must not receive `DbContext`, `IQueryable`, or EF Core types.
- `EndpointDbContextRatchetTests` fails if a new endpoint introduces EF Core.

## Registered interfaces

`IAdminReportService`, `IAdminUserService`, `IHotelFacetService`,
`IAdminMarketingService`, `IAdminNotificationService`, `IAdminFinanceService`,
`IAdminBookingService`, `IAdminHomeSettingsService`, `IAdminSupportService`,
`IContentEntryService`, `IAdminCatalogService`, `IAdminGovernanceService`, `IAdminChannelService`,
`IAdminAuditWriter`.
