using Hani.BuildingBlocks.Domain;

namespace Hani.Modules.Catalog.Domain.Flights;

/// <summary>
/// Canonical airline reference used by flight metasearch filters.
/// </summary>
public sealed class Airline : AggregateRoot<Guid>
{
    private Airline()
    {
    }

    private Airline(Guid id, string iata, string name, bool isActive) : base(id)
    {
        Iata = iata;
        Name = name;
        IsActive = isActive;
        CreatedAt = DateTimeOffset.UtcNow;
    }

    /// <summary>Two-letter IATA code.</summary>
    public string Iata { get; private set; } = string.Empty;

    /// <summary>Display name.</summary>
    public string Name { get; private set; } = string.Empty;

    /// <summary>Whether the airline is offered.</summary>
    public bool IsActive { get; private set; }

    /// <summary>Creation time.</summary>
    public DateTimeOffset CreatedAt { get; private set; }

    /// <summary>Creates a validated airline.</summary>
    public static Airline Create(IIdGenerator ids, string iata, string name, bool isActive = true)
    {
        if (string.IsNullOrWhiteSpace(iata) || iata.Trim().Length != 2)
        {
            throw new ArgumentException("Airline IATA code must contain two letters.", nameof(iata));
        }

        if (string.IsNullOrWhiteSpace(name))
        {
            throw new ArgumentException("Airline name is required.", nameof(name));
        }

        return new Airline(
            ids.NewId(),
            iata.Trim().ToUpperInvariant(),
            name.Trim(),
            isActive);
    }
}
