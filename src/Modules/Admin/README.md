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
`IContentEntryService`, `IAdminCatalogService`, `IAdminGovernanceService`,
`IAdminChannelService`, `IAdminSupplierService`, `IAdminRoleService`,
`IAdminPlatformSettingsService`, `IAdminTourService`, `IAdminFlightService`,
`IAdminVisaService`, `IAdminFinanceSettingsService`, `IAdminAuditWriter`.

## Booking administration

`IAdminBookingService` composes reservation-request decisions, order
cancellation and contact updates, contract/voucher read models, order audit
history, and per-order refund reads. Commands that mutate booking state go
through Booking application commands; only projections use the Booking,
Identity, and Payments DbContexts.


## Finance administration

`IAdminFinanceService` provides finance reads, expected-vs-actual
reconciliation runs, and CSV exports. The expected amount of a reconciliation
is derived from successful payment intents for the selected provider, period,
and currency; the actual amount is entered by an administrator.

`IAdminFinanceSettingsService` persists bank accounts, active currencies,
rounding and FX metadata, tax/duty rules with effective dates, and the
settlement policy under the `finance` key in `identity.platform_settings`.
Every update is audited with before/after JSON.

Exports are available for payments, refunds, invoices, reconciliations,
commissions, payouts, ledger, and tax. The export endpoints require the
`report.export` permission in addition to `finance.view`.

## Support administration

`IAdminSupportService` composes ticket reads, replies/internal notes, status,
priority, real assignee selection, SLA evaluation, dispute workflow, and
support quality reporting. SLA targets are derived from priority in
`AdminSupportSlaPolicy`: Urgent 2h, High 8h, Normal 24h, Low 72h.

Disputes are separate aggregates in the Content module. Creating or closing a
dispute is audited by the API layer. The support report returns first-response
and resolution averages, SLA counts, category distribution, and assignee load.

## Product editing

`IAdminTourService`, `IAdminVisaService`, and `IAdminFlightService` expose
detail reads plus update operations for tour overview/content, visa country
content/types/pricing, and flight routes with replacement provider offers.
Updates are audited by the API layer and persist through the catalog
aggregates; no endpoint injects a `DbContext`.

## RFQ and lead queue

The admin booking page also reads `/internal/v1/leads` for the RFQ queue.
Leads remain in the Booking module; the admin surface only projects them and
offers CSV export through the Next.js BFF. Reservation requests continue to use
the existing confirm/reject commands.
