using Hani.BuildingBlocks.AspNetCore;
using Hani.Modules.Booking.Application.Commands.CancelOrder;
using Hani.Modules.Booking.Application.Commands.CreateOrder;
using Hani.Modules.Booking.Application.Queries.GetOrder;
using Hani.Modules.Booking.Infrastructure.Persistence;
using Hani.Modules.Identity.Infrastructure.Persistence;
using Hani.Modules.Payments.Infrastructure.Persistence;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using IResult = Microsoft.AspNetCore.Http.IResult;

namespace Hani.Api;

/// <summary>Admin booking operations read model.</summary>
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
        IdentityDbContext identity,
        AdminAuditWriter audit,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(
            new CancelOrderCommand(id, request.Reason),
            cancellationToken);
        if (!result.IsSuccess)
        {
            return context.ToProblem(result.Error!);
        }

        audit.Record(
            context,
            identity,
            "booking.order.cancelled",
            "Order",
            id.ToString(),
            request.Reason,
            before: new { status = "Active" },
            after: new { status = "Cancelled" });
        await identity.SaveChangesAsync(cancellationToken);
        return Results.Ok(result.Value);
    }

    private static async Task<IResult> ListPaymentsAsync(
        Guid id,
        PaymentsDbContext payments,
        CancellationToken cancellationToken)
    {
        var rows = await payments.PaymentIntents
            .AsNoTracking()
            .Where(item => item.OrderId == id)
            .OrderByDescending(item => item.CreatedAt)
            .Select(item => new AdminOrderPaymentDto(
                item.Id,
                item.Amount,
                item.Currency,
                item.Status.ToString(),
                item.Provider,
                item.CreatedAt))
            .ToArrayAsync(cancellationToken);
        return Results.Ok(rows);
    }

    private static async Task<IResult> ListAsync(
        [FromQuery] int page,
        [FromQuery] int pageSize,
        [FromQuery] string? q,
        BookingDbContext db,
        CancellationToken cancellationToken)
    {
        var normalizedPage = page <= 0 ? 1 : page;
        var normalizedPageSize = pageSize is <= 0 or > 100 ? 20 : pageSize;
        var term = q?.Trim();

        var ordersQuery = db.Orders.AsNoTracking();
        var requestsQuery = db.ReservationRequests.AsNoTracking();
        var inquiriesQuery = db.HotelInquiries.AsNoTracking();
        if (!string.IsNullOrWhiteSpace(term))
        {
            ordersQuery = ordersQuery.Where(item =>
                item.OrderNumber.Contains(term) || item.ContactEmail.Contains(term));
            requestsQuery = requestsQuery.Where(item =>
                item.RequestNumber.Contains(term) || item.ContactEmail.Contains(term));
            inquiriesQuery = inquiriesQuery.Where(item =>
                item.InquiryNumber.Contains(term) || item.ContactEmail.Contains(term));
        }

        var orderCount = await ordersQuery.CountAsync(cancellationToken);
        var requestCount = await requestsQuery.CountAsync(cancellationToken);
        var inquiryCount = await inquiriesQuery.CountAsync(cancellationToken);
        var orderRows = await ordersQuery
            .Include(item => item.PaymentObligations)
            .OrderByDescending(item => item.CreatedAt)
            .Skip((normalizedPage - 1) * normalizedPageSize)
            .Take(normalizedPageSize)
            .ToArrayAsync(cancellationToken);
        var orders = orderRows.Select(item => new AdminOrderDto(
            item.Id,
            item.OrderNumber,
            item.AgencyId,
            item.Status.ToString(),
            item.PaymentStatus.ToString(),
            item.Total,
            item.Currency,
            item.ContactEmail,
            item.CreatedAt,
            item.PaymentDueAt)).ToArray();
        var requests = await requestsQuery
            .OrderByDescending(item => item.CreatedAt)
            .Skip((normalizedPage - 1) * normalizedPageSize)
            .Take(normalizedPageSize)
            .Select(item => new AdminReservationDto(
                item.Id,
                item.RequestNumber,
                item.AgencyId,
                item.Status.ToString(),
                item.Total,
                item.Currency,
                item.ContactEmail,
                item.CreatedAt,
                item.ExpiresAt))
            .ToArrayAsync(cancellationToken);
        var inquiries = await inquiriesQuery
            .OrderByDescending(item => item.CreatedAt)
            .Skip((normalizedPage - 1) * normalizedPageSize)
            .Take(normalizedPageSize)
            .Select(item => new AdminHotelInquiryDto(
                item.Id,
                item.InquiryNumber,
                item.HotelId,
                item.CheckIn,
                item.CheckOut,
                item.Rooms,
                item.Adults,
                item.Children,
                item.Status.ToString(),
                item.ContactEmail,
                item.CreatedAt))
            .ToArrayAsync(cancellationToken);

        return Results.Ok(new AdminBookingsResponse(
            orderCount,
            requestCount,
            inquiryCount,
            orders,
            requests,
            inquiries));
    }
}

/// <summary>Admin booking list payload.</summary>
public sealed record AdminBookingsResponse(
    int OrderCount,
    int RequestCount,
    int InquiryCount,
    IReadOnlyList<AdminOrderDto> Orders,
    IReadOnlyList<AdminReservationDto> Requests,
    IReadOnlyList<AdminHotelInquiryDto> Inquiries);

/// <summary>Admin order payment row.</summary>
public sealed record AdminOrderPaymentDto(
    Guid PaymentIntentId,
    decimal Amount,
    string Currency,
    string Status,
    string Provider,
    DateTimeOffset CreatedAt);

/// <summary>Admin order cancellation request.</summary>
public sealed record CancelOrderRequest(string Reason);

/// <summary>Admin order row.</summary>
public sealed record AdminOrderDto(
    Guid Id,
    string Number,
    Guid AgencyId,
    string Status,
    string PaymentStatus,
    decimal Total,
    string Currency,
    string ContactEmail,
    DateTimeOffset CreatedAt,
    DateTimeOffset PaymentDueAt);

/// <summary>Admin reservation request row.</summary>
public sealed record AdminReservationDto(
    Guid Id,
    string Number,
    Guid AgencyId,
    string Status,
    decimal Total,
    string Currency,
    string ContactEmail,
    DateTimeOffset CreatedAt,
    DateTimeOffset ExpiresAt);

/// <summary>Admin hotel inquiry row.</summary>
public sealed record AdminHotelInquiryDto(
    Guid Id,
    string Number,
    Guid HotelId,
    DateOnly CheckIn,
    DateOnly CheckOut,
    int Rooms,
    int Adults,
    int Children,
    string Status,
    string ContactEmail,
    DateTimeOffset CreatedAt);
