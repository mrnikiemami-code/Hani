namespace Hani.Modules.Booking.Domain.Quotes;

/// <summary>
/// Lifecycle state of a quote.
/// </summary>
public enum QuoteStatus
{
    Active = 0,
    Held = 1,
    Expired = 2,
    Converted = 3,
    Cancelled = 4
}
