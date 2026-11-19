using Hani.BuildingBlocks.Application;
using Hani.BuildingBlocks.Domain;
using Hani.Modules.Admin.Application;
using Hani.Modules.Booking.Infrastructure.Persistence;
using Hani.Modules.Catalog.Infrastructure.Persistence;
using Hani.Modules.Content.Application.Support;
using Hani.Modules.Content.Infrastructure.Persistence;
using Hani.Modules.Identity.Infrastructure.Persistence;
using Hani.Modules.Payments.Infrastructure.Persistence;
using Hani.Modules.Settlement.Infrastructure.Persistence;
using Hani.Modules.Supply.Infrastructure.Persistence;
using MediatR;
using Microsoft.Extensions.Logging;

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
    ISupportAttachmentStorage supportAttachments,
    ISupportAttachmentScanner supportAttachmentScanner,
    ISupportRealtimeNotifier supportRealtime,
    ILogger<AdminService> logger,
    IIdGenerator ids,
    ILanguageCatalog languages,
    ISender sender) : IAdminReportService, IAdminUserService, IHotelFacetService, IAdminMarketingService, IAdminNotificationService, IAdminFinanceService, IAdminFinanceSettingsService, IAdminBookingService, IAdminHomeSettingsService, IAdminSupportService, IContentEntryService, IAdminCatalogService, IAdminGovernanceService, IAdminChannelService, IAdminSupplierService, IAdminRoleService, IAdminPlatformSettingsService, IAdminTourService, IAdminFlightService, IAdminVisaService;
