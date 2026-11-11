using Hani.BuildingBlocks.Domain;

namespace Hani.Modules.Booking.Domain.Orders;

/// <summary>
/// Priced line in the order snapshot.
/// </summary>
public sealed class OrderLine : Entity<Guid>
{
    private OrderLine()
    {
    }

    internal OrderLine(
        Guid id,
        Guid orderId,
        string description,
        int quantity,
        decimal unitPrice,
        decimal total,
        string currency) : base(id)
    {
        OrderId = orderId;
        Description = description.Trim();
        Quantity = quantity;
        UnitPrice = unitPrice;
        Total = total;
        Currency = currency;
    }

    /// <summary>
    /// Owning order identifier.
    /// </summary>
    public Guid OrderId { get; private set; }

    /// <summary>
    /// Human-readable line description.
    /// </summary>
    public string Description { get; private set; } = string.Empty;

    /// <summary>
    /// Number of units included in this line.
    /// </summary>
    public int Quantity { get; private set; }

    /// <summary>
    /// Price per unit.
    /// </summary>
    public decimal UnitPrice { get; private set; }

    /// <summary>
    /// Line total.
    /// </summary>
    public decimal Total { get; private set; }

    /// <summary>
    /// ISO currency code.
    /// </summary>
    public string Currency { get; private set; } = string.Empty;
}
