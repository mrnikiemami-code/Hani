using Hani.Contracts.Booking;
using Hani.Modules.Booking.Domain.Orders;
using Hani.Modules.Booking.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Hani.Modules.Booking.Infrastructure.ReadServices;

internal sealed class OrderPaymentReadService(BookingDbContext dbContext)
    : IOrderPaymentReadService
{
    public async Task<OrderPaymentSnapshot?> GetForPaymentAsync(
        Guid orderId,
        CancellationToken cancellationToken)
    {
        var order = await dbContext.Orders
            .AsNoTracking()
            .FirstOrDefaultAsync(item => item.Id == orderId, cancellationToken);

        if (order is null)
        {
            return null;
        }

        var obligations = order.PaymentObligations.Count > 0
            ? order.PaymentObligations
                .Select(obligation => new OrderPaymentObligationSnapshot(
                    obligation.Id,
                    obligation.Currency,
                    obligation.Amount,
                    obligation.Status.ToString()))
                .ToArray()
            :
            [
                new OrderPaymentObligationSnapshot(
                    Guid.Empty,
                    order.Currency,
                    order.Total,
                    order.Status == OrderStatus.Paid
                        ? PaymentObligationStatus.Paid.ToString()
                        : PaymentObligationStatus.Unpaid.ToString())
            ];

        return new OrderPaymentSnapshot(
            order.Id,
            order.AgencyId,
            order.Total,
            order.Currency,
            order.Status.ToString(),
            order.PaymentDueAt,
            obligations,
            order.EffectivePricing.CollectionMode,
            order.EffectivePricing.SellerOfRecord,
            order.EffectivePricing.InvoiceIssuer);
    }
}
