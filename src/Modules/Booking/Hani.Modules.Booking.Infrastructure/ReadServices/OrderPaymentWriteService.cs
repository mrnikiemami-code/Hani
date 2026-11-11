using Hani.Contracts.Booking;
using Hani.Modules.Booking.Domain.Orders;
using Hani.Modules.Booking.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Hani.Modules.Booking.Infrastructure.ReadServices;

internal sealed class OrderPaymentWriteService(BookingDbContext dbContext)
    : IOrderPaymentWriteService
{
    public async Task<bool> MarkPaidAsync(Guid orderId, CancellationToken cancellationToken)
    {
        var order = await dbContext.Orders
            .FirstOrDefaultAsync(item => item.Id == orderId, cancellationToken);

        if (order is null)
        {
            return false;
        }

        if (order.Status == OrderStatus.Paid)
        {
            return true;
        }

        if (order.Status != OrderStatus.PendingPayment)
        {
            return false;
        }

        order.MarkPaid();
        await dbContext.SaveChangesAsync(cancellationToken);
        return true;
    }
}
