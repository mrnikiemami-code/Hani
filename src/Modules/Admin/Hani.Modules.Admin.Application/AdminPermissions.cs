namespace Hani.Modules.Admin.Application;

/// <summary>Stable permission catalog for the 12 admin sections.</summary>
public static class AdminPermissions
{
    /// <summary>Dashboard access.</summary>
    public const string DashboardView = "dashboard.view";
    /// <summary>Agency directory access.</summary>
    public const string AgencyView = "agency.view";
    /// <summary>Agency approval access.</summary>
    public const string AgencyApprove = "agency.approve";
    /// <summary>User directory access.</summary>
    public const string UserView = "user.view";
    /// <summary>Catalog access.</summary>
    public const string CatalogView = "catalog.view";
    /// <summary>Booking access.</summary>
    public const string BookingView = "booking.view";
    /// <summary>Finance access.</summary>
    public const string FinanceView = "finance.view";
    /// <summary>Content access.</summary>
    public const string ContentView = "content.view";
    /// <summary>Marketing access.</summary>
    public const string MarketingView = "marketing.view";
    /// <summary>Support access.</summary>
    public const string SupportView = "support.view";
    /// <summary>Integration access.</summary>
    public const string IntegrationView = "integration.view";
    /// <summary>Reports access.</summary>
    public const string ReportView = "report.view";
    /// <summary>Settings access.</summary>
    public const string SettingsView = "settings.view";
    /// <summary>Audit log access.</summary>
    public const string AuditView = "audit.view";
    /// <summary>Role and permission management.</summary>
    public const string RoleManage = "role.manage";

    /// <summary>All known permissions.</summary>
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
