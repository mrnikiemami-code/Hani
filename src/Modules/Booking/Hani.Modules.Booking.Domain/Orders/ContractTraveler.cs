using Hani.BuildingBlocks.Domain;

namespace Hani.Modules.Booking.Domain.Orders;

/// <summary>
/// Immutable traveler snapshot captured on the contract.
/// </summary>
public sealed class ContractTraveler : Entity<Guid>
{
    private ContractTraveler()
    {
    }

    internal ContractTraveler(
        Guid id,
        Guid contractId,
        string fullName,
        TravelerType type,
        DateOnly? dateOfBirth) : base(id)
    {
        ContractId = contractId;
        FullName = fullName.Trim();
        Type = type;
        DateOfBirth = dateOfBirth;
    }

    /// <summary>
    /// Owning contract identifier.
    /// </summary>
    public Guid ContractId { get; private set; }

    /// <summary>
    /// Full name captured at contract issuance.
    /// </summary>
    public string FullName { get; private set; } = string.Empty;

    /// <summary>
    /// Passenger category captured at contract issuance.
    /// </summary>
    public TravelerType Type { get; private set; }

    /// <summary>
    /// Optional date of birth.
    /// </summary>
    public DateOnly? DateOfBirth { get; private set; }
}
