using System.Security.Claims;

namespace Hani.Api;

/// <summary>
/// Admin identity and permission catalog endpoint used by the permission-driven
/// admin navigation.
/// </summary>
public static class AdminIdentityEndpoints
{
    /// <summary>Permission identifiers for the twelve admin sections.</summary>
    public static class Permissions
    {
        public const string DashboardView = "dashboard.view";
        public const string AgencyView = "agency.view";
        public const string AgencyApprove = "agency.approve";
        public const string UserView = "user.view";
        public const string CatalogView = "catalog.view";
        public const string BookingView = "booking.view";
        public const string FinanceView = "finance.view";
        public const string ContentView = "content.view";
        public const string MarketingView = "marketing.view";
        public const string SupportView = "support.view";
        public const string IntegrationView = "integration.view";
        public const string ReportView = "report.view";
        public const string SettingsView = "settings.view";
        public const string AuditView = "audit.view";
        public const string RoleManage = "role.manage";

        /// <summary>All permissions granted to the Super Admin role today.</summary>
        public static readonly IReadOnlyList<string> All =
        [
            DashboardView,
            AgencyView,
            AgencyApprove,
            UserView,
            CatalogView,
            BookingView,
            FinanceView,
            ContentView,
            MarketingView,
            SupportView,
            IntegrationView,
            ReportView,
            SettingsView,
            AuditView,
            RoleManage
        ];
    }

    /// <summary>Maps the admin identity endpoint.</summary>
    public static IEndpointRouteBuilder MapAdminIdentityEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet("/internal/v1/admin/me", GetMeAsync)
            .WithTags("Internal.Admin")
            .WithName("Internal.GetAdminIdentity")
            .RequireAuthorization("Admin")
            .Produces<AdminIdentityDto>();

        return app;
    }

    private static IResult GetMeAsync(HttpContext context)
    {
        var role = context.User.FindFirst(ClaimTypes.Role)?.Value ?? "Admin";
        return Results.Ok(new AdminIdentityDto(role, Permissions.All));
    }
}

/// <summary>Authenticated admin identity and effective permissions.</summary>
public sealed record AdminIdentityDto(
    string Role,
    IReadOnlyList<string> Permissions);
