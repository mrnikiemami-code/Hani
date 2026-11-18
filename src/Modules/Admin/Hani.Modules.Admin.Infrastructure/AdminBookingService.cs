using Hani.Modules.Admin.Application;
using Microsoft.EntityFrameworkCore;

namespace Hani.Modules.Admin.Infrastructure;

internal sealed partial class AdminService : IAdminBookingService
{
    public async Task<AdminBookingsResponse> ListAsync(
        int page,
        int pageSize,
        string? q,
        CancellationToken cancellationToken)
    {
        var normalizedPage = page <= 0 ? 1 : page;
        var normalizedPageSize = pageSize is <= 0 or > 100 ? 20 : pageSize;
        var term = q?.Trim();

        var ordersQuery = booking.Orders.AsNoTracking();
        var requestsQuery = booking.ReservationRequests.AsNoTracking();
        var inquiriesQuery = booking.HotelInquiries.AsNoTracking();
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

        return new AdminBookingsResponse(
            orderCount,
            requestCount,
            inquiryCount,
            orders,
            requests,
            inquiries);
    }

    public async Task<IReadOnlyList<AdminOrderPaymentDto>> ListPaymentsAsync(
        Guid orderId,
        CancellationToken cancellationToken)
        => await payments.PaymentIntents
            .AsNoTracking()
            .Where(item => item.OrderId == orderId)
            .OrderByDescending(item => item.CreatedAt)
            .Select(item => new AdminOrderPaymentDto(
                item.Id,
                item.Amount,
                item.Currency,
                item.Status.ToString(),
                item.Provider,
                item.CreatedAt))
            .ToArrayAsync(cancellationToken);
}
