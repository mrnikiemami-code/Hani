using Hani.Modules.Admin.Application;

namespace Hani.Api;

/// <summary>Admin operational report endpoint.</summary>
public static class AdminReportEndpoints
{
    /// <summary>Maps admin report endpoints.</summary>
    public static IEndpointRouteBuilder MapAdminReportEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet("/internal/v1/admin/reports/overview", GetOverviewAsync)
            .WithTags("Internal.Admin.Reports")
            .WithName("Internal.GetAdminReportOverview")
            .RequireAuthorization("Admin")
            .Produces<AdminReportOverviewDto>();
        return app;
    }

    private static async Task<IResult> GetOverviewAsync(
        int? days,
        IAdminReportService reports,
        CancellationToken cancellationToken)
    {
        var result = await reports.GetOverviewAsync(days, cancellationToken);
        return Results.Ok(result);
    }
}
