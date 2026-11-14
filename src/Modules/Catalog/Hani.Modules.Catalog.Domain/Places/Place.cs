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
    private readonly List<PlaceMenuItem> _menuItems = [];
    private readonly List<PlaceMealPeriod> _mealPeriods = [];
    private readonly List<PlaceDietaryOption> _dietaryOptions = [];

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
    /// Menu items for restaurants; empty for attractions.
    /// </summary>
    public IReadOnlyCollection<PlaceMenuItem> MenuItems => _menuItems;

    /// <summary>
    /// Meal periods served by a restaurant.
    /// </summary>
    public IReadOnlyCollection<PlaceMealPeriod> MealPeriods => _mealPeriods;

    /// <summary>
    /// Dietary options supported by a restaurant.
    /// </summary>
    public IReadOnlyCollection<PlaceDietaryOption> DietaryOptions => _dietaryOptions;

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

    /// <summary>
    /// Replaces restaurant menu items.
    /// </summary>
    public void ReplaceMenuItems(IIdGenerator ids, IEnumerable<PlaceMenuItemInput> items)
    {
        if (Type != PlaceType.Restaurant && items.Any())
        {
            throw new InvalidOperationException("Only restaurants can have menu items.");
        }

        _menuItems.Clear();

        foreach (var item in items)
        {
            if (string.IsNullOrWhiteSpace(item.Name) || string.IsNullOrWhiteSpace(item.Section))
            {
                throw new ArgumentException("Menu section and name are required.", nameof(items));
            }

            if (item.Price < 0)
            {
                throw new ArgumentOutOfRangeException(nameof(items), "Menu price cannot be negative.");
            }

            _menuItems.Add(new PlaceMenuItem(
                ids.NewId(),
                Id,
                item.Section,
                item.Name,
                item.Description,
                item.Price,
                item.Currency,
                item.SortOrder));
        }

        Touch();
    }

    /// <summary>
    /// Replaces restaurant meal periods.
    /// </summary>
    public void ReplaceMealPeriods(IIdGenerator ids, IEnumerable<string> mealPeriods)
    {
        if (Type != PlaceType.Restaurant && mealPeriods.Any())
        {
            throw new InvalidOperationException("Only restaurants can have meal periods.");
        }

        _mealPeriods.Clear();

        foreach (var mealPeriod in mealPeriods
                     .Where(item => !string.IsNullOrWhiteSpace(item))
                     .Distinct(StringComparer.OrdinalIgnoreCase))
        {
            _mealPeriods.Add(new PlaceMealPeriod(ids.NewId(), Id, mealPeriod));
        }

        Touch();
    }

    /// <summary>
    /// Replaces restaurant dietary options.
    /// </summary>
    public void ReplaceDietaryOptions(IIdGenerator ids, IEnumerable<string> dietaryOptions)
    {
        if (Type != PlaceType.Restaurant && dietaryOptions.Any())
        {
            throw new InvalidOperationException("Only restaurants can have dietary options.");
        }

        _dietaryOptions.Clear();

        foreach (var option in dietaryOptions
                     .Where(item => !string.IsNullOrWhiteSpace(item))
                     .Distinct(StringComparer.OrdinalIgnoreCase))
        {
            _dietaryOptions.Add(new PlaceDietaryOption(ids.NewId(), Id, option));
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

/// <summary>
/// Restaurant menu item.
/// </summary>
public sealed class PlaceMenuItem : Entity<Guid>
{
    private PlaceMenuItem()
    {
    }

    internal PlaceMenuItem(
        Guid id,
        Guid placeId,
        string section,
        string name,
        string? description,
        decimal price,
        string currency,
        int sortOrder) : base(id)
    {
        PlaceId = placeId;
        Section = section.Trim();
        Name = name.Trim();
        Description = description?.Trim();
        Price = price;
        Currency = currency.Trim().ToUpperInvariant();
        SortOrder = sortOrder;
    }

    /// <summary>Parent place.</summary>
    public Guid PlaceId { get; private set; }

    /// <summary>Menu section such as Starters or Main courses.</summary>
    public string Section { get; private set; } = string.Empty;

    /// <summary>Item name.</summary>
    public string Name { get; private set; } = string.Empty;

    /// <summary>Optional description.</summary>
    public string? Description { get; private set; }

    /// <summary>Item price.</summary>
    public decimal Price { get; private set; }

    /// <summary>Price currency.</summary>
    public string Currency { get; private set; } = string.Empty;

    /// <summary>Display order within the section.</summary>
    public int SortOrder { get; private set; }
}

/// <summary>
/// Restaurant menu item input.
/// </summary>
public sealed record PlaceMenuItemInput(
    string Section,
    string Name,
    decimal Price,
    string Currency,
    string? Description = null,
    int SortOrder = 0);

/// <summary>
/// Meal period served by a restaurant.
/// </summary>
public sealed class PlaceMealPeriod : Entity<Guid>
{
    private PlaceMealPeriod()
    {
    }

    internal PlaceMealPeriod(Guid id, Guid placeId, string name) : base(id)
    {
        PlaceId = placeId;
        Name = name.Trim();
    }

    /// <summary>Parent place.</summary>
    public Guid PlaceId { get; private set; }

    /// <summary>Meal period name such as Breakfast, Lunch, or Dinner.</summary>
    public string Name { get; private set; } = string.Empty;
}

/// <summary>
/// Dietary option supported by a restaurant.
/// </summary>
public sealed class PlaceDietaryOption : Entity<Guid>
{
    private PlaceDietaryOption()
    {
    }

    internal PlaceDietaryOption(Guid id, Guid placeId, string name) : base(id)
    {
        PlaceId = placeId;
        Name = name.Trim();
    }

    /// <summary>Parent place.</summary>
    public Guid PlaceId { get; private set; }

    /// <summary>Dietary option such as Halal, Vegetarian, or GlutenFree.</summary>
    public string Name { get; private set; } = string.Empty;
}
