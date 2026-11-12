namespace Hani.Modules.Booking.Domain.Orders;

/// <summary>
/// Payment state of an order, independent from its lifecycle state.
/// </summary>
public enum OrderPaymentStatus
{
    Unpaid = 0,
    PartiallyPaid = 1,
    Paid = 2
}

/// <summary>
/// State of one per-currency payment obligation.
/// </summary>
public enum PaymentObligationStatus
{
    Unpaid = 0,
    Paid = 1
}
