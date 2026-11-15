using System.Security.Claims;
using Hani.BuildingBlocks.AspNetCore;
using Hani.Contracts.Booking;
using Hani.Modules.Identity.Application.Abstractions;
using IResult = Microsoft.AspNetCore.Http.IResult;

namespace Hani.Api;

/// <summary>
/// Authenticated traveler dashboard endpoints plus the internal operator views.
/// </summary>
public static class DashboardEndpoints
{
    /// <summary>Maps authenticated traveler and internal dashboard endpoints.</summary>
    public static IEndpointRouteBuilder MapDashboardEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/internal/v1/dashboard").WithTags("Internal.Dashboard");

        group.MapGet("/agency/{agencyId:guid}", GetAgencyAsync)
            .WithName("Internal.GetAgencyDashboard");
        group.MapGet("/traveler", GetTravelerAsync)
            .WithName("Internal.GetTravelerDashboard");
        group.MapGet("/admin", GetAdminAsync)
            .WithName("Internal.GetAdminDashboard");

        var me = app.MapGroup("/market/v1/me").WithTags("Marketplace.Dashboard");

        me.MapGet("/dashboard", GetMyDashboardAsync)
            .WithName("Marketplace.GetMyDashboard")
            .RequireAuthorization("User")
            .Produces<TravelerDashboardDto>()
            .ProducesProblem(StatusCodes.Status401Unauthorized);

        me.MapGet("/orders", GetMyOrdersAsync)
            .WithName("Marketplace.GetMyOrders")
            .RequireAuthorization("User")
            .Produces<TravelerOrderPage>()
            .ProducesProblem(StatusCodes.Status401Unauthorized);

        me.MapGet("/agency/dashboard", GetMyAgencyDashboardAsync)
            .WithName("Marketplace.GetMyAgencyDashboard")
            .RequireAuthorization("User")
            .Produces<AgencyDashboardDto>()
            .ProducesProblem(StatusCodes.Status401Unauthorized);

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

    /// <summary>
    /// Returns the authenticated traveler's totals and five most recent orders.
    /// Orders are matched by the user's email or mobile until order ownership is
    /// stored as a direct user id.
    /// </summary>
    private static async Task<IResult> GetMyDashboardAsync(
        HttpContext context,
        IUserRepository users,
        IChannelOrderReadService orders,
        CancellationToken cancellationToken)
    {
        if (!TryGetUserId(context, out var userId))
        {
            return context.ToProblem(
                Hani.BuildingBlocks.Application.Error.Unauthorized(
                    "HANI-IDENTITY-1202",
                    "Authenticated user is required."));
        }

        var user = await users.GetByIdAsync(userId, cancellationToken);
        var summary = await orders.GetTravelerDashboardByContactAsync(
            user?.Email,
            user?.Mobile,
            cancellationToken);
        var recent = await orders.ListTravelerOrdersAsync(
            user?.Email,
            user?.Mobile,
            0,
            5,
            cancellationToken);

        return Results.Ok(new TravelerDashboardDto(summary, recent.Items));
    }

    /// <summary>
    /// Returns the authenticated traveler's paged order history.
    /// </summary>
    private static async Task<IResult> GetMyOrdersAsync(
        int? page,
        int? pageSize,
        HttpContext context,
        IUserRepository users,
        IChannelOrderReadService orders,
        CancellationToken cancellationToken)
    {
        if (!TryGetUserId(context, out var userId))
        {
            return context.ToProblem(
                Hani.BuildingBlocks.Application.Error.Unauthorized(
                    "HANI-IDENTITY-1202",
                    "Authenticated user is required."));
        }

        var user = await users.GetByIdAsync(userId, cancellationToken);
        var currentPage = Math.Max(1, page ?? 1);
        var size = Math.Clamp(pageSize ?? 20, 1, 50);
        var result = await orders.ListTravelerOrdersAsync(
            user?.Email,
            user?.Mobile,
            (currentPage - 1) * size,
            size,
            cancellationToken);

        return Results.Ok(result);
    }

    /// <summary>
    /// Returns the authenticated agency owner's totals and recent orders. A user
    /// without an agency receives a zeroed response instead of an error so the
    /// dashboard can show the onboarding empty state.
    /// </summary>
    private static async Task<IResult> GetMyAgencyDashboardAsync(
        HttpContext context,
        IAgencyRepository agencies,
        IChannelOrderReadService orders,
        CancellationToken cancellationToken)
    {
        if (!TryGetUserId(context, out var userId))
        {
            return context.ToProblem(
                Hani.BuildingBlocks.Application.Error.Unauthorized(
                    "HANI-IDENTITY-1202",
                    "Authenticated user is required."));
        }

        var agency = await agencies.GetByOwnerUserIdAsync(userId, cancellationToken);
        if (agency is null)
        {
            return Results.Ok(new AgencyDashboardDto(
                null,
                null,
                0,
                0,
                0,
                0,
                0m,
                null,
                []));
        }

        var summary = await orders.GetAgencyDashboardAsync(agency.Id, cancellationToken);
        var recent = await orders.ListByAgencyAsync(
            agency.Id,
            null,
            null,
            0,
            5,
            cancellationToken);

        return Results.Ok(new AgencyDashboardDto(
            agency.Id,
            agency.Name,
            summary.OrderCount,
            summary.PendingCount,
            summary.PaidCount,
            summary.CancelledCount,
            summary.GrossPaid,
            summary.Currency,
            recent));
    }

    private static bool TryGetUserId(HttpContext context, out Guid userId)
    {
        var value = context.User.FindFirst("user_id")?.Value
            ?? context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value
            ?? context.User.FindFirst("sub")?.Value;
        return Guid.TryParse(value, out userId);
    }
}

/// <summary>
/// Authenticated traveler dashboard summary and recent order rows.
/// </summary>
public sealed record TravelerDashboardDto(
    TravelerBookingDashboardSummary Summary,
    IReadOnlyList<ChannelOrderSummary> RecentOrders);

/// <summary>
/// Authenticated agency owner dashboard. A null agency id means the user has not
/// completed onboarding yet.
/// </summary>
public sealed record AgencyDashboardDto(
    Guid? AgencyId,
    string? AgencyName,
    int OrderCount,
    int PendingCount,
    int PaidCount,
    int CancelledCount,
    decimal GrossPaid,
    string? Currency,
    IReadOnlyList<ChannelOrderSummary> RecentOrders);
