using Hani.Modules.Booking.Presentation;
using Hani.Modules.Catalog.Presentation;
using Hani.Modules.Content.Presentation;
using Hani.Modules.Identity.Presentation;
using Hani.Modules.Marketplace.Presentation;
using Hani.Modules.Payments.Presentation;
using Hani.Modules.Settlement.Presentation;
using Hani.Modules.Supply.Presentation;

namespace Hani.Api.Endpoints;

/// <summary>Maps all HTTP endpoints owned by the API host.</summary>
public static class EndpointRegistration
{
    /// <summary>Maps module, public, channel, and admin endpoints.</summary>
    public static IEndpointRouteBuilder MapHaniEndpoints(this IEndpointRouteBuilder app)
    {
        MapModuleEndpoints(app);
        MapPublicEndpoints(app);
        MapAdminEndpoints(app);
        return app;
    }

    private static void MapModuleEndpoints(IEndpointRouteBuilder app)
    {
        app.MapSupplyEndpoints();
        app.MapCatalogEndpoints();
        app.MapContentEndpoints();
        app.MapIdentityEndpoints();
        app.MapGamificationEndpoints();
        app.MapIdentityAuthEndpoints();
        app.MapChannelAuthEndpoints();
        app.MapChannelSettingsEndpoints();
        app.MapAgencyOnboardingEndpoints();
        app.MapEngagementEndpoints();
        app.MapTrustEndpoints();
        app.MapMarketplaceEndpoints();
        app.MapChannelEndpoints();
        app.MapBookingEndpoints();
        app.MapRequestEndpoints();
        app.MapPaymentEndpoints();
        app.MapSettlementEndpoints();
    }

    private static void MapPublicEndpoints(IEndpointRouteBuilder app)
    {
        app.MapDashboardEndpoints();
        app.MapHomeSettingsEndpoints();
        app.MapHotelFacetEndpoints();
        app.MapLastsecondParityEndpoints();
        app.MapWishlistEndpoints();
    }

    private static void MapAdminEndpoints(IEndpointRouteBuilder app)
    {
        app.MapSecurityEndpoints();
        app.MapAdminIdentityEndpoints();
        app.MapAdminUsersEndpoints();
        app.MapAdminCatalogEndpoints();
        app.MapAdminBookingEndpoints();
        app.MapAdminFinanceEndpoints();
        app.MapAdminGovernanceEndpoints();
        app.MapAdminMarketingEndpoints();
        app.MapAdminAdsEndpoints();
        app.MapAdminReportEndpoints();
        app.MapAdminNotificationEndpoints();
        app.MapAdminSupportEndpoints();
        app.MapAdminChannelEndpoints();
        MapContentAdminEndpoints(app);
    }

    private static void MapContentAdminEndpoints(IEndpointRouteBuilder app)
    {
        app.MapMediaEndpoints();
        app.MapContentEntryEndpoints();
    }
}
