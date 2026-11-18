using Hani.BuildingBlocks.AspNetCore;
using Hani.Modules.Admin.Application;
using Hani.Modules.Booking.Application.Commands.CancelOrder;
using Hani.Modules.Booking.Application.Commands.CreateOrder;
using Hani.Modules.Booking.Application.Queries.GetOrder;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Hani.Api;

/// <summary>Admin booking endpoints.</summary>
public static class AdminBookingEndpoints
{
    /// <summary>Maps admin booking endpoints.</summary>
    public static IEndpointRouteBuilder MapAdminBookingEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet("/internal/v1/admin/bookings", ListAsync)
            .WithTags("Internal.Admin.Booking")
            .WithName("Internal.ListAdminBookings")
            .RequireAuthorization("Admin")
            .Produces<AdminBookingsResponse>();

        app.MapGet("/internal/v1/admin/bookings/orders/{id:guid}", GetOrderAsync)
            .WithTags("Internal.Admin.Booking")
            .WithName("Internal.GetAdminOrder")
            .RequireAuthorization("Admin")
            .Produces<OrderDto>();

        app.MapPost("/internal/v1/admin/bookings/orders/{id:guid}/cancel", CancelOrderAsync)
            .WithTags("Internal.Admin.Booking")
            .WithName("Internal.CancelAdminOrder")
            .RequireAuthorization("Admin")
            .Produces<bool>();

        app.MapGet("/internal/v1/admin/bookings/orders/{id:guid}/payments", ListPaymentsAsync)
            .WithTags("Internal.Admin.Booking")
            .WithName("Internal.ListAdminOrderPayments")
            .RequireAuthorization("Admin")
            .Produces<IReadOnlyList<AdminOrderPaymentDto>>();
        return app;
    }

    private static async Task<IResult> ListAsync(
        [FromQuery] int page,
        [FromQuery] int pageSize,
        [FromQuery] string? q,
        IAdminBookingService bookings,
        CancellationToken cancellationToken)
        => Results.Ok(await bookings.ListAsync(
            page,
            pageSize,
            q,
            cancellationToken));

    private static async Task<IResult> GetOrderAsync(
        Guid id,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(new GetOrderQuery(id), cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    private static async Task<IResult> CancelOrderAsync(
        Guid id,
        CancelOrderRequest request,
        HttpContext context,
        ISender sender,
        IAdminAuditWriter audit,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(
            new CancelOrderCommand(id, request.Reason),
            cancellationToken);
        if (!result.IsSuccess)
        {
            return context.ToProblem(result.Error!);
        }

        await audit.RecordAsync(
            context,
            "booking.order.cancelled",
            "Order",
            id.ToString(),
            request.Reason,
            before: new { status = "Active" },
            after: new { status = "Cancelled" },
            cancellationToken: cancellationToken);
        return Results.Ok(result.Value);
    }

    private static async Task<IResult> ListPaymentsAsync(
        Guid id,
        IAdminBookingService bookings,
        CancellationToken cancellationToken)
        => Results.Ok(await bookings.ListPaymentsAsync(id, cancellationToken));
}

/// <summary>Admin order cancellation request.</summary>
public sealed record CancelOrderRequest(string Reason);
