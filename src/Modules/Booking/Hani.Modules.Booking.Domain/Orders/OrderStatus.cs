namespace Hani.Modules.Booking.Domain.Orders;

/// <summary>
/// Lifecycle state of a marketplace order.
/// </summary>
public enum OrderStatus
{
    PendingPayment = 0,
    Paid = 1,
    Cancelled = 2,
    Expired = 3,
    PartiallyPaid = 4
}
