using Hani.Modules.Booking.Domain.HotelInquiries;
using Hani.Modules.Booking.Domain.Orders;
using Hani.Modules.Booking.Domain.ReservationRequests;
using Hani.Modules.Booking.Infrastructure.Persistence;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
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
        return app;
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
