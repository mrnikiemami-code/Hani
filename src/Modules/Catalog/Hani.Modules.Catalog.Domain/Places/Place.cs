using Hani.BuildingBlocks.Domain;

namespace Hani.Modules.Catalog.Domain.Places;

/// <summary>
/// Place vertical kind.
/// </summary>
public enum PlaceType
{
    Restaurant = 0,
    Attraction = 1
}

/// <summary>
/// Canonical restaurant or attraction with geo coordinates.
/// </summary>
public sealed class Place : AggregateRoot<Guid>
{
    private readonly List<PlaceTranslation> _translations = [];
    private readonly List<PlaceAmenity> _amenities = [];

    private Place()
    {
    }

    private Place(
        Guid id,
        string slug,
        PlaceType type,
        Guid destinationId,
        string category,
        string? cuisine,
        string? priceBand,
        bool reservable,
        bool onlineReservable,
        decimal? latitude,
        decimal? longitude) : base(id)
    {
        Slug = slug;
        Type = type;
        DestinationId = destinationId;
        Category = category;
        Cuisine = cuisine;
        PriceBand = priceBand;
        Reservable = reservable;
        OnlineReservable = onlineReservable;
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
    /// Restaurant or attraction.
    /// </summary>
    public PlaceType Type { get; private set; }

    /// <summary>
    /// Destination/city.
    /// </summary>
    public Guid DestinationId { get; private set; }

    /// <summary>
    /// Primary category.
    /// </summary>
    public string Category { get; private set; } = string.Empty;

    /// <summary>
    /// Cuisine for restaurants.
    /// </summary>
    public string? Cuisine { get; private set; }

    /// <summary>
    /// Price band for restaurants.
    /// </summary>
    public string? PriceBand { get; private set; }

    /// <summary>
    /// Whether reservations are accepted.
    /// </summary>
    public bool Reservable { get; private set; }

    /// <summary>
    /// Whether online reservation is supported.
    /// </summary>
    public bool OnlineReservable { get; private set; }

    /// <summary>
    /// Latitude.
    /// </summary>
    public decimal? Latitude { get; private set; }

    /// <summary>
    /// Longitude.
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
    /// Localized content.
    /// </summary>
    public IReadOnlyCollection<PlaceTranslation> Translations => _translations;

    /// <summary>
    /// Amenities.
    /// </summary>
    public IReadOnlyCollection<PlaceAmenity> Amenities => _amenities;

    /// <summary>
    /// Creates a validated place.
    /// </summary>
    public static Place Create(
        IIdGenerator ids,
        string slug,
        PlaceType type,
        Guid destinationId,
        string category,
        string? cuisine = null,
        string? priceBand = null,
        bool reservable = false,
        bool onlineReservable = false,
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

        if (string.IsNullOrWhiteSpace(category))
        {
            throw new ArgumentException("Category is required.", nameof(category));
        }

        if (latitude is < -90m or > 90m || longitude is < -180m or > 180m)
        {
            throw new ArgumentOutOfRangeException(nameof(latitude), "Coordinates are invalid.");
        }

        return new Place(
            ids.NewId(),
            slug.Trim().ToLowerInvariant(),
            type,
            destinationId,
            category.Trim(),
            string.IsNullOrWhiteSpace(cuisine) ? null : cuisine.Trim(),
            string.IsNullOrWhiteSpace(priceBand) ? null : priceBand.Trim(),
            reservable,
            onlineReservable,
            latitude,
            longitude);
    }

    /// <summary>
    /// Adds a translation.
    /// </summary>
    public void AddTranslation(IIdGenerator ids, string locale, string name, string? description = null)
    {
        if (_translations.Any(item => string.Equals(item.Locale, locale, StringComparison.OrdinalIgnoreCase)))
        {
            throw new InvalidOperationException($"Translation '{locale}' already exists.");
        }

        _translations.Add(new PlaceTranslation(ids.NewId(), Id, locale, name, description));
        Touch();
    }

    /// <summary>
    /// Replaces amenities.
    /// </summary>
    public void ReplaceAmenities(IIdGenerator ids, IEnumerable<string> amenities)
    {
        _amenities.Clear();

        foreach (var amenity in amenities.Distinct(StringComparer.OrdinalIgnoreCase))
        {
            _amenities.Add(new PlaceAmenity(ids.NewId(), Id, amenity));
        }

        Touch();
    }

    private void Touch() => UpdatedAt = DateTimeOffset.UtcNow;
}

/// <summary>
/// Localized place content.
/// </summary>
public sealed class PlaceTranslation : Entity<Guid>
{
    private PlaceTranslation()
    {
    }

    internal PlaceTranslation(Guid id, Guid placeId, string locale, string name, string? description)
        : base(id)
    {
        PlaceId = placeId;
        Locale = locale.Trim().ToLowerInvariant();
        Name = name.Trim();
        Description = description?.Trim();
    }

    /// <summary>
    /// Parent place.
    /// </summary>
    public Guid PlaceId { get; private set; }

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
/// Place amenity.
/// </summary>
public sealed class PlaceAmenity : Entity<Guid>
{
    private PlaceAmenity()
    {
    }

    internal PlaceAmenity(Guid id, Guid placeId, string name) : base(id)
    {
        PlaceId = placeId;
        Name = name.Trim();
    }

    /// <summary>
    /// Parent place.
    /// </summary>
    public Guid PlaceId { get; private set; }

    /// <summary>
    /// Amenity name.
    /// </summary>
    public string Name { get; private set; } = string.Empty;
}

/// <summary>
/// Translation input for place creation.
/// </summary>
public sealed record PlaceTranslationInput(string Locale, string Name, string? Description = null);
