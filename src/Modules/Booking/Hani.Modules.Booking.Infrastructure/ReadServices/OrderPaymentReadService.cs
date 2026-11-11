using Hani.Contracts.Booking;
using Hani.Modules.Booking.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Hani.Modules.Booking.Infrastructure.ReadServices;

internal sealed class OrderPaymentReadService(BookingDbContext dbContext)
    : IOrderPaymentReadService
{
    public Task<OrderPaymentSnapshot?> GetForPaymentAsync(
        Guid orderId,
        CancellationToken cancellationToken)
        => dbContext.Orders
            .Where(order => order.Id == orderId)
            .Select(order => new OrderPaymentSnapshot(
                order.Id,
                order.AgencyId,
                order.Total,
                order.Currency,
                order.Status.ToString(),
                order.PaymentDueAt))
            .FirstOrDefaultAsync(cancellationToken);
}
