using System.Security.Claims;
using Hani.BuildingBlocks.AspNetCore;
using Hani.Contracts.Booking;
using Hani.Contracts.Supply;
using Hani.Modules.Content.Application.Queries.Dashboard;
using Hani.Modules.Identity.Application.Abstractions;
using Hani.Modules.Payments.Application.Queries.TravelerFinance;
using Hani.Modules.Settlement.Application.Payouts;
using MediatR;
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
            .WithName("Internal.GetAdminDashboard")
            .RequireAuthorization("Admin");

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

        me.MapGet("/messages", GetMyMessagesAsync)
            .WithName("Marketplace.GetMyMessages")
            .RequireAuthorization("User")
            .ProducesProblem(StatusCodes.Status401Unauthorized);

        me.MapPost("/messages/{messageId:guid}/read", MarkMyMessageReadAsync)
            .WithName("Marketplace.MarkMyMessageRead")
            .RequireAuthorization("User")
            .ProducesProblem(StatusCodes.Status401Unauthorized);

        me.MapGet("/payments", GetMyPaymentsAsync)
            .WithName("Marketplace.GetMyPayments")
            .RequireAuthorization("User")
            .ProducesProblem(StatusCodes.Status401Unauthorized);

        me.MapGet("/invoices", GetMyInvoicesAsync)
            .WithName("Marketplace.GetMyInvoices")
            .RequireAuthorization("User")
            .ProducesProblem(StatusCodes.Status401Unauthorized);

        me.MapGet("/refunds", GetMyRefundsAsync)
            .WithName("Marketplace.GetMyRefunds")
            .RequireAuthorization("User")
            .ProducesProblem(StatusCodes.Status401Unauthorized);

        me.MapGet("/agency/listings", GetMyAgencyListingsAsync)
            .WithName("Marketplace.GetMyAgencyListings")
            .RequireAuthorization("User")
            .Produces<IReadOnlyList<OfferSnapshot>>()
            .ProducesProblem(StatusCodes.Status401Unauthorized);

        me.MapGet("/agency/orders", GetMyAgencyOrdersAsync)
            .WithName("Marketplace.GetMyAgencyOrders")
            .RequireAuthorization("User")
            .Produces<TravelerOrderPage>()
            .ProducesProblem(StatusCodes.Status401Unauthorized);

        me.MapGet("/agency/payouts", GetMyAgencyPayoutsAsync)
            .WithName("Marketplace.GetMyAgencyPayouts")
            .RequireAuthorization("User")
            .Produces<IReadOnlyList<PayoutDto>>()
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

    /// <summary>
    /// Returns dashboard inbox messages for the authenticated user.
    /// </summary>
    private static async Task<IResult> GetMyMessagesAsync(
        int? page,
        int? pageSize,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        if (!TryGetUserId(context, out var userId))
        {
            return Unauthorized(context);
        }

        var result = await sender.Send(
            new ListUserMessagesQuery(userId, page ?? 1, pageSize ?? 20),
            cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>
    /// Marks one dashboard inbox message as read.
    /// </summary>
    private static async Task<IResult> MarkMyMessageReadAsync(
        Guid messageId,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        if (!TryGetUserId(context, out _))
        {
            return Unauthorized(context);
        }

        var result = await sender.Send(
            new MarkUserMessageReadCommand(messageId),
            cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>
    /// Returns the authenticated traveler's payment intents for all owned orders.
    /// </summary>
    private static async Task<IResult> GetMyPaymentsAsync(
        HttpContext context,
        IUserRepository users,
        IChannelOrderReadService orders,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var orderIds = await ResolveMyOrderIdsAsync(context, users, orders, cancellationToken);
        if (orderIds is null)
        {
            return Unauthorized(context);
        }

        var result = await sender.Send(
            new ListTravelerPaymentsQuery(orderIds),
            cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>
    /// Returns the authenticated traveler's invoices for all owned orders.
    /// </summary>
    private static async Task<IResult> GetMyInvoicesAsync(
        HttpContext context,
        IUserRepository users,
        IChannelOrderReadService orders,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var orderIds = await ResolveMyOrderIdsAsync(context, users, orders, cancellationToken);
        if (orderIds is null)
        {
            return Unauthorized(context);
        }

        var result = await sender.Send(
            new ListTravelerInvoicesQuery(orderIds),
            cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>
    /// Returns the authenticated traveler's refunds for all owned orders.
    /// </summary>
    private static async Task<IResult> GetMyRefundsAsync(
        HttpContext context,
        IUserRepository users,
        IChannelOrderReadService orders,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var orderIds = await ResolveMyOrderIdsAsync(context, users, orders, cancellationToken);
        if (orderIds is null)
        {
            return Unauthorized(context);
        }

        var result = await sender.Send(
            new ListTravelerRefundsQuery(orderIds),
            cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>
    /// Returns offers owned by the authenticated agency owner.
    /// </summary>
    private static async Task<IResult> GetMyAgencyListingsAsync(
        HttpContext context,
        IAgencyRepository agencies,
        IOfferReadService offers,
        CancellationToken cancellationToken)
    {
        var agency = await ResolveAgencyAsync(context, agencies, cancellationToken);
        if (agency is null)
        {
            return Unauthorized(context);
        }

        return Results.Ok(await offers.GetOffersByAgencyAsync(agency.Id, cancellationToken));
    }

    /// <summary>
    /// Returns a paged order list for the authenticated agency owner.
    /// </summary>
    private static async Task<IResult> GetMyAgencyOrdersAsync(
        int? page,
        int? pageSize,
        HttpContext context,
        IAgencyRepository agencies,
        IChannelOrderReadService orders,
        CancellationToken cancellationToken)
    {
        var agency = await ResolveAgencyAsync(context, agencies, cancellationToken);
        if (agency is null)
        {
            return Unauthorized(context);
        }

        var currentPage = Math.Max(1, page ?? 1);
        var size = Math.Clamp(pageSize ?? 20, 1, 50);
        var items = await orders.ListByAgencyAsync(
            agency.Id,
            null,
            null,
            (currentPage - 1) * size,
            size,
            cancellationToken);

        return Results.Ok(new TravelerOrderPage(items, items.Count));
    }

    /// <summary>
    /// Returns payouts for the authenticated agency owner.
    /// </summary>
    private static async Task<IResult> GetMyAgencyPayoutsAsync(
        HttpContext context,
        IAgencyRepository agencies,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var agency = await ResolveAgencyAsync(context, agencies, cancellationToken);
        if (agency is null)
        {
            return Unauthorized(context);
        }

        var result = await sender.Send(
            new ListPayoutsQuery(agency.Id),
            cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    private static async Task<Hani.Modules.Identity.Domain.Agencies.Agency?> ResolveAgencyAsync(
        HttpContext context,
        IAgencyRepository agencies,
        CancellationToken cancellationToken)
    {
        if (!TryGetUserId(context, out var userId))
        {
            return null;
        }

        return await agencies.GetByOwnerUserIdAsync(userId, cancellationToken);
    }

    private static async Task<IReadOnlyList<Guid>?> ResolveMyOrderIdsAsync(
        HttpContext context,
        IUserRepository users,
        IChannelOrderReadService orders,
        CancellationToken cancellationToken)
    {
        if (!TryGetUserId(context, out var userId))
        {
            return null;
        }

        var user = await users.GetByIdAsync(userId, cancellationToken);
        return await orders.ListTravelerOrderIdsAsync(
            user?.Email,
            user?.Mobile,
            cancellationToken);
    }

    private static IResult Unauthorized(HttpContext context)
        => context.ToProblem(
            Hani.BuildingBlocks.Application.Error.Unauthorized(
                "HANI-IDENTITY-1202",
                "Authenticated user is required."));

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
