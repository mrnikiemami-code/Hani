namespace Hani.Modules.Booking.Domain.Orders;

/// <summary>
/// Traveler details supplied when an order and contract are created.
/// </summary>
public sealed record TravelerDetails(
    string FullName,
    TravelerType Type,
    DateOnly? DateOfBirth = null);
