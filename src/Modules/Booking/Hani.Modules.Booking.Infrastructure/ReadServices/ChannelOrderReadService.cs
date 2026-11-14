using Hani.Contracts.Booking;
using Hani.Modules.Booking.Domain.Orders;
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
}
