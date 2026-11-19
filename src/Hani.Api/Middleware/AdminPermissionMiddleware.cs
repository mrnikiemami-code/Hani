using Hani.BuildingBlocks.AspNetCore;

namespace Hani.Api.Middleware;

/// <summary>Enforces section permission claims for internal admin routes.</summary>
public sealed class AdminPermissionMiddleware(RequestDelegate next)
{
    private static readonly (string Prefix, string Permission)[] Rules =
    [
        ("/internal/v1/admin/roles", "role.manage"),
        ("/internal/v1/admin/users", "user.view"),
        ("/internal/v1/admin/agencies", "agency.view"),
        ("/internal/v1/admin/catalog", "catalog.view"),
        ("/internal/v1/admin/bookings", "booking.view"),
        ("/internal/v1/admin/finance", "finance.view"),
        ("/internal/v1/admin/approvals", "finance.view"),
        ("/internal/v1/admin/marketing", "marketing.view"),
        ("/internal/v1/admin/notifications", "support.view"),
        ("/internal/v1/admin/support", "support.view"),
        ("/internal/v1/admin/channel", "integration.view"),
        ("/internal/v1/admin/suppliers", "integration.view"),
        ("/internal/v1/admin/reports", "report.view"),
        ("/internal/v1/admin/audit", "audit.view"),
        ("/internal/v1/admin/platform-settings", "settings.view"),
        ("/internal/v1/agencies", "agency.view"),
        ("/internal/v1/content-entries", "content.view"),
        ("/internal/v1/content-media", "content.view"),
        ("/internal/v1/home-settings", "content.view")
    ];

    /// <summary>Checks the route prefix and the permission claim.</summary>
    public async Task InvokeAsync(HttpContext context)
    {
        var path = context.Request.Path.Value ?? string.Empty;
        if (!path.StartsWith("/internal/", StringComparison.OrdinalIgnoreCase) ||
            path.StartsWith("/internal/v1/admin/me", StringComparison.OrdinalIgnoreCase))
        {
            await next(context);
            return;
        }

        var rule = Rules.FirstOrDefault(item =>
            path.StartsWith(item.Prefix, StringComparison.OrdinalIgnoreCase));
        if (rule.Permission is null ||
            context.User.IsInRole("Admin") ||
            context.User.HasClaim("permission", rule.Permission))
        {
            await next(context);
            return;
        }

        context.Response.StatusCode = StatusCodes.Status403Forbidden;
        var problem = HaniProblemDetails.Create(context, StatusCodes.Status403Forbidden);
        await HaniProblemDetails.WriteAsync(context, problem);
    }
}
