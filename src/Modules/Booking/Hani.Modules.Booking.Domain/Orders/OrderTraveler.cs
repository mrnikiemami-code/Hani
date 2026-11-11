using Hani.BuildingBlocks.Domain;

namespace Hani.Modules.Booking.Domain.Orders;

/// <summary>
/// Traveler attached to an order. The order snapshot is owned by the aggregate.
/// </summary>
public sealed class OrderTraveler : Entity<Guid>
{
    private OrderTraveler()
    {
    }

    internal OrderTraveler(
        Guid id,
        Guid orderId,
        string fullName,
        TravelerType type,
        DateOnly? dateOfBirth) : base(id)
    {
        OrderId = orderId;
        FullName = fullName.Trim();
        Type = type;
        DateOfBirth = dateOfBirth;
    }

    /// <summary>
    /// Owning order identifier.
    /// </summary>
    public Guid OrderId { get; private set; }

    /// <summary>
    /// Full name exactly as supplied at order creation.
    /// </summary>
    public string FullName { get; private set; } = string.Empty;

    /// <summary>
    /// Adult, child, or infant.
    /// </summary>
    public TravelerType Type { get; private set; }

    /// <summary>
    /// Optional date of birth.
    /// </summary>
    public DateOnly? DateOfBirth { get; private set; }
}
