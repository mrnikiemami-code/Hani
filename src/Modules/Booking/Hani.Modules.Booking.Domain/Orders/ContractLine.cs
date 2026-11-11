using Hani.BuildingBlocks.Domain;

namespace Hani.Modules.Booking.Domain.Orders;

/// <summary>
/// Immutable priced line captured on the contract.
/// </summary>
public sealed class ContractLine : Entity<Guid>
{
    private ContractLine()
    {
    }

    internal ContractLine(
        Guid id,
        Guid contractId,
        string description,
        int quantity,
        decimal unitPrice,
        decimal total,
        string currency) : base(id)
    {
        ContractId = contractId;
        Description = description.Trim();
        Quantity = quantity;
        UnitPrice = unitPrice;
        Total = total;
        Currency = currency;
    }

    /// <summary>
    /// Owning contract identifier.
    /// </summary>
    public Guid ContractId { get; private set; }

    /// <summary>
    /// Human-readable line description.
    /// </summary>
    public string Description { get; private set; } = string.Empty;

    /// <summary>
    /// Number of units captured at contract issuance.
    /// </summary>
    public int Quantity { get; private set; }

    /// <summary>
    /// Price per unit captured at contract issuance.
    /// </summary>
    public decimal UnitPrice { get; private set; }

    /// <summary>
    /// Line total captured at contract issuance.
    /// </summary>
    public decimal Total { get; private set; }

    /// <summary>
    /// ISO currency code.
    /// </summary>
    public string Currency { get; private set; } = string.Empty;
}
