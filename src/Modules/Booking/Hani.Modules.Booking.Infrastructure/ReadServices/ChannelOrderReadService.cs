using Hani.Contracts.Booking;
using Hani.Modules.Booking.Domain.Orders;
using Hani.Modules.Booking.Domain.ReservationRequests;
using Hani.Modules.Booking.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Hani.Modules.Booking.Infrastructure.ReadServices;

internal sealed class ChannelOrderReadService(BookingDbContext dbContext) : IChannelOrderReadService
{
    public async Task<IReadOnlyList<ChannelOrderSummary>> ListByAgencyAsync(
        Guid agencyId,
        string? status,
        DateOnly? from,
        int skip,
        int take,
        CancellationToken cancellationToken)
    {
        var query = dbContext.Orders
            .AsNoTracking()
            .Where(order => order.AgencyId == agencyId);

        if (!string.IsNullOrWhiteSpace(status) &&
            Enum.TryParse<OrderStatus>(status, ignoreCase: true, out var parsedStatus))
        {
            query = query.Where(order => order.Status == parsedStatus);
        }

        if (from is not null)
        {
            var start = new DateTimeOffset(
                from.Value.ToDateTime(TimeOnly.MinValue),
                TimeSpan.Zero);
            query = query.Where(order => order.CreatedAt >= start);
        }

        return await query
            .OrderByDescending(order => order.CreatedAt)
            .Skip(skip)
            .Take(take)
            .Select(order => new ChannelOrderSummary(
                order.Id,
                order.OrderNumber,
                order.AgencyId,
                order.Status.ToString(),
                order.PaymentStatus.ToString(),
                order.Total,
                order.Currency,
                order.ContactEmail,
                order.CreatedAt))
            .ToArrayAsync(cancellationToken);
    }

    public async Task<AgencyBookingDashboardSummary> GetAgencyDashboardAsync(
        Guid agencyId,
        CancellationToken cancellationToken)
    {
        var orders = await dbContext.Orders
            .AsNoTracking()
            .Where(order => order.AgencyId == agencyId)
            .ToArrayAsync(cancellationToken);

        var paid = orders.Where(order => order.Status == OrderStatus.Paid).ToArray();
        return new AgencyBookingDashboardSummary(
            agencyId,
            orders.Length,
            orders.Count(order => order.Status == OrderStatus.PendingPayment),
            paid.Length,
            orders.Count(order => order.Status == OrderStatus.Cancelled),
            paid.Sum(order => order.Total),
            paid.FirstOrDefault()?.Currency);
    }

    public async Task<TravelerBookingDashboardSummary> GetTravelerDashboardAsync(
        string contactEmail,
        CancellationToken cancellationToken)
    {
        var email = contactEmail.Trim().ToLowerInvariant();
        var orders = await dbContext.Orders
            .AsNoTracking()
            .Where(order => order.ContactEmail == email)
            .ToArrayAsync(cancellationToken);
        var reservations = await dbContext.ReservationRequests
            .AsNoTracking()
            .CountAsync(request => request.ContactEmail == email, cancellationToken);
        var leads = await dbContext.Leads
            .AsNoTracking()
            .CountAsync(request => request.ContactEmail == email, cancellationToken);
        var paid = orders.Where(order => order.Status == OrderStatus.Paid).ToArray();

        return new TravelerBookingDashboardSummary(
            email,
            orders.Length,
            reservations,
            leads,
            paid.Sum(order => order.Total),
            paid.FirstOrDefault()?.Currency);
    }

    public async Task<AdminBookingDashboardSummary> GetAdminDashboardAsync(
        CancellationToken cancellationToken)
    {
        var orders = await dbContext.Orders.CountAsync(cancellationToken);
        var reservations = await dbContext.ReservationRequests.CountAsync(cancellationToken);
        var leads = await dbContext.Leads.CountAsync(cancellationToken);
        var pending = await dbContext.ReservationRequests.CountAsync(
            request => request.Status == ReservationRequestStatus.PendingAgencyReview,
            cancellationToken);

        return new AdminBookingDashboardSummary(orders, reservations, leads, pending);
    }
}
