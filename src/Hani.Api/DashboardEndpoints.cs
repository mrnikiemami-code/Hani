using Hani.Contracts.Booking;
using IResult = Microsoft.AspNetCore.Http.IResult;

namespace Hani.Api;

/// <summary>
/// Internal traveler/agency/admin dashboard endpoints.
/// </summary>
public static class DashboardEndpoints
{
    /// <summary>Maps internal dashboard endpoints.</summary>
    public static IEndpointRouteBuilder MapDashboardEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/internal/v1/dashboard").WithTags("Internal.Dashboard");

        group.MapGet("/agency/{agencyId:guid}", GetAgencyAsync)
            .WithName("Internal.GetAgencyDashboard");
        group.MapGet("/traveler", GetTravelerAsync)
            .WithName("Internal.GetTravelerDashboard");
        group.MapGet("/admin", GetAdminAsync)
            .WithName("Internal.GetAdminDashboard");
        return app;
    }

    /// <summary>Returns agency booking dashboard totals.</summary>
    private static async Task<IResult> GetAgencyAsync(
        Guid agencyId,
        IChannelOrderReadService orders,
        CancellationToken cancellationToken)
        => Results.Ok(await orders.GetAgencyDashboardAsync(agencyId, cancellationToken));

    /// <summary>Returns traveler booking dashboard totals by email.</summary>
    private static async Task<IResult> GetTravelerAsync(
        string email,
        IChannelOrderReadService orders,
        CancellationToken cancellationToken)
        => Results.Ok(await orders.GetTravelerDashboardAsync(email, cancellationToken));

    /// <summary>Returns admin booking dashboard totals.</summary>
    private static async Task<IResult> GetAdminAsync(
        IChannelOrderReadService orders,
        CancellationToken cancellationToken)
        => Results.Ok(await orders.GetAdminDashboardAsync(cancellationToken));
}
