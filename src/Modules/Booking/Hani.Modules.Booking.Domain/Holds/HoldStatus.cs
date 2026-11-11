namespace Hani.Modules.Booking.Domain.Holds;

/// <summary>
/// Lifecycle state of a seat hold.
/// </summary>
public enum HoldStatus
{
    Active = 0,
    Released = 1,
    Consumed = 2,
    Expired = 3
}
