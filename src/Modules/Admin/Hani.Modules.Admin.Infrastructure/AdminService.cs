using Hani.BuildingBlocks.Application;
using Hani.BuildingBlocks.Domain;
using Hani.Modules.Admin.Application;
using Hani.Modules.Booking.Infrastructure.Persistence;
using Hani.Modules.Catalog.Infrastructure.Persistence;
using Hani.Modules.Content.Infrastructure.Persistence;
using Hani.Modules.Identity.Infrastructure.Persistence;
using Hani.Modules.Payments.Infrastructure.Persistence;
using Hani.Modules.Settlement.Infrastructure.Persistence;
using Hani.Modules.Supply.Infrastructure.Persistence;
using MediatR;

namespace Hani.Modules.Admin.Infrastructure;

/// <summary>
/// Composition service for cross-module admin read models and operations.
/// All persistence stays in Infrastructure; HTTP endpoints only call the
/// application interfaces.
/// </summary>
internal sealed partial class AdminService(
    BookingDbContext booking,
    PaymentsDbContext payments,
    SettlementDbContext settlement,
    SupplyDbContext supply,
    CatalogDbContext catalog,
    IdentityDbContext identity,
    ContentDbContext content,
    IIdGenerator ids,
    ILanguageCatalog languages,
    ISender sender) : IAdminReportService, IAdminUserService, IHotelFacetService, IAdminMarketingService, IAdminNotificationService, IAdminFinanceService, IAdminBookingService, IAdminHomeSettingsService, IAdminSupportService, IContentEntryService, IAdminCatalogService, IAdminGovernanceService, IAdminChannelService, IAdminSupplierService, IAdminRoleService, IAdminPlatformSettingsService, IAdminTourService;
