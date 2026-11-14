using Hani.BuildingBlocks.Domain;

namespace Hani.Modules.Catalog.Domain.Flights;

/// <summary>
/// Canonical airport reference used by flight routes and nearby airport maps.
/// </summary>
public sealed class Airport : AggregateRoot<Guid>
{
    private Airport()
    {
    }

    private Airport(
        Guid id,
        string iata,
        string name,
        string city,
        string countryCode,
        Guid? destinationId,
        decimal? latitude,
        decimal? longitude) : base(id)
    {
        Iata = iata;
        Name = name;
        City = city;
        CountryCode = countryCode;
        DestinationId = destinationId;
        Latitude = latitude;
        Longitude = longitude;
        CreatedAt = DateTimeOffset.UtcNow;
    }

    /// <summary>Three-letter IATA code.</summary>
    public string Iata { get; private set; } = string.Empty;

    /// <summary>Airport name.</summary>
    public string Name { get; private set; } = string.Empty;

    /// <summary>City display name.</summary>
    public string City { get; private set; } = string.Empty;

    /// <summary>ISO country code.</summary>
    public string CountryCode { get; private set; } = string.Empty;

    /// <summary>Optional destination link.</summary>
    public Guid? DestinationId { get; private set; }

    /// <summary>Optional latitude.</summary>
    public decimal? Latitude { get; private set; }

    /// <summary>Optional longitude.</summary>
    public decimal? Longitude { get; private set; }

    /// <summary>Creation time.</summary>
    public DateTimeOffset CreatedAt { get; private set; }

    /// <summary>Creates a validated airport.</summary>
    public static Airport Create(
        IIdGenerator ids,
        string iata,
        string name,
        string city,
        string countryCode,
        Guid? destinationId = null,
        decimal? latitude = null,
        decimal? longitude = null)
    {
        if (string.IsNullOrWhiteSpace(iata) || iata.Trim().Length != 3)
        {
            throw new ArgumentException("Airport IATA code must contain three letters.", nameof(iata));
        }

        if (string.IsNullOrWhiteSpace(name) || string.IsNullOrWhiteSpace(city))
        {
            throw new ArgumentException("Airport name and city are required.");
        }

        if (latitude is < -90m or > 90m || longitude is < -180m or > 180m)
        {
            throw new ArgumentOutOfRangeException(nameof(latitude), "Coordinates are invalid.");
        }

        return new Airport(
            ids.NewId(),
            iata.Trim().ToUpperInvariant(),
            name.Trim(),
            city.Trim(),
            countryCode.Trim().ToUpperInvariant(),
            destinationId,
            latitude,
            longitude);
    }
}
