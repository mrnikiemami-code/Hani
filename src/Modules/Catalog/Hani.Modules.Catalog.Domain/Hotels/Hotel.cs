using Hani.BuildingBlocks.Domain;

namespace Hani.Modules.Catalog.Domain.Hotels;

/// <summary>
/// Canonical hotel owned by the platform and referenced by agency offers.
/// </summary>
public sealed class Hotel : AggregateRoot<Guid>
{
    private readonly List<HotelTranslation> _translations = [];
    private readonly List<HotelAmenity> _amenities = [];

    private Hotel()
    {
    }

    private Hotel(
        Guid id,
        string slug,
        Guid destinationId,
        int stars,
        string? address,
        decimal? latitude,
        decimal? longitude) : base(id)
    {
        Slug = slug;
        DestinationId = destinationId;
        Stars = stars;
        Address = address;
        Latitude = latitude;
        Longitude = longitude;
        CreatedAt = DateTimeOffset.UtcNow;
        UpdatedAt = CreatedAt;
    }

    /// <summary>
    /// Unique public slug.
    /// </summary>
    public string Slug { get; private set; } = string.Empty;

    /// <summary>
    /// Destination/city where the hotel is located.
    /// </summary>
    public Guid DestinationId { get; private set; }

    /// <summary>
    /// Star rating from 1 to 5.
    /// </summary>
    public int Stars { get; private set; }

    /// <summary>
    /// Street address.
    /// </summary>
    public string? Address { get; private set; }

    /// <summary>
    /// Optional latitude.
    /// </summary>
    public decimal? Latitude { get; private set; }

    /// <summary>
    /// Optional longitude.
    /// </summary>
    public decimal? Longitude { get; private set; }

    /// <summary>
    /// Creation time.
    /// </summary>
    public DateTimeOffset CreatedAt { get; private set; }

    /// <summary>
    /// Last update time.
    /// </summary>
    public DateTimeOffset UpdatedAt { get; private set; }

    /// <summary>
    /// Localized names and descriptions.
    /// </summary>
    public IReadOnlyCollection<HotelTranslation> Translations => _translations;

    /// <summary>
    /// Hotel amenities grouped by category.
    /// </summary>
    public IReadOnlyCollection<HotelAmenity> Amenities => _amenities;

    /// <summary>
    /// Creates a validated hotel.
    /// </summary>
    public static Hotel Create(
        IIdGenerator ids,
        string slug,
        Guid destinationId,
        int stars,
        string? address = null,
        decimal? latitude = null,
        decimal? longitude = null)
    {
        if (string.IsNullOrWhiteSpace(slug))
        {
            throw new ArgumentException("Slug is required.", nameof(slug));
        }

        if (destinationId == Guid.Empty)
        {
            throw new ArgumentException("Destination is required.", nameof(destinationId));
        }

        if (stars is < 1 or > 5)
        {
            throw new ArgumentOutOfRangeException(nameof(stars), "Stars must be between 1 and 5.");
        }

        if (latitude is < -90m or > 90m || longitude is < -180m or > 180m)
        {
            throw new ArgumentOutOfRangeException(nameof(latitude), "Coordinates are invalid.");
        }

        return new Hotel(
            ids.NewId(),
            slug.Trim().ToLowerInvariant(),
            destinationId,
            stars,
            string.IsNullOrWhiteSpace(address) ? null : address.Trim(),
            latitude,
            longitude);
    }

    /// <summary>
    /// Adds a localized translation.
    /// </summary>
    public HotelTranslation AddTranslation(
        IIdGenerator ids,
        string locale,
        string name,
        string? description = null)
    {
        if (_translations.Any(item => string.Equals(item.Locale, locale, StringComparison.OrdinalIgnoreCase)))
        {
            throw new InvalidOperationException($"Translation '{locale}' already exists.");
        }

        var translation = new HotelTranslation(ids.NewId(), Id, locale, name, description);
        _translations.Add(translation);
        Touch();
        return translation;
    }

    /// <summary>
    /// Replaces the amenity list.
    /// </summary>
    public void ReplaceAmenities(IIdGenerator ids, IEnumerable<HotelAmenityInput> amenities)
    {
        _amenities.Clear();

        foreach (var amenity in amenities)
        {
            _amenities.Add(new HotelAmenity(ids.NewId(), Id, amenity.Category, amenity.Name));
        }

        Touch();
    }

    private void Touch() => UpdatedAt = DateTimeOffset.UtcNow;
}

/// <summary>
/// Localized hotel content.
/// </summary>
public sealed class HotelTranslation : Entity<Guid>
{
    private HotelTranslation()
    {
    }

    internal HotelTranslation(
        Guid id,
        Guid hotelId,
        string locale,
        string name,
        string? description) : base(id)
    {
        HotelId = hotelId;
        Locale = locale.Trim().ToLowerInvariant();
        Name = name.Trim();
        Description = description?.Trim();
    }

    /// <summary>
    /// Parent hotel.
    /// </summary>
    public Guid HotelId { get; private set; }

    /// <summary>
    /// Locale code.
    /// </summary>
    public string Locale { get; private set; } = string.Empty;

    /// <summary>
    /// Localized name.
    /// </summary>
    public string Name { get; private set; } = string.Empty;

    /// <summary>
    /// Localized description.
    /// </summary>
    public string? Description { get; private set; }
}

/// <summary>
/// Hotel amenity.
/// </summary>
public sealed class HotelAmenity : Entity<Guid>
{
    private HotelAmenity()
    {
    }

    internal HotelAmenity(Guid id, Guid hotelId, string category, string name) : base(id)
    {
        HotelId = hotelId;
        Category = category.Trim();
        Name = name.Trim();
    }

    /// <summary>
    /// Parent hotel.
    /// </summary>
    public Guid HotelId { get; private set; }

    /// <summary>
    /// Amenity category such as General, Recreation, or Internet.
    /// </summary>
    public string Category { get; private set; } = string.Empty;

    /// <summary>
    /// Amenity name.
    /// </summary>
    public string Name { get; private set; } = string.Empty;
}

/// <summary>
/// Amenity input used by hotel creation and replacement.
/// </summary>
public sealed record HotelAmenityInput(string Category, string Name);

/// <summary>
/// Translation input used by hotel creation.
/// </summary>
public sealed record HotelTranslationInput(string Locale, string Name, string? Description = null);
