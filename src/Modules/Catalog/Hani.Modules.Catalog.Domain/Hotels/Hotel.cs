using Hani.BuildingBlocks.Domain;

namespace Hani.Modules.Catalog.Domain.Hotels;

/// <summary>Physical hotel/property category.</summary>
public enum HotelPropertyType
{
    Hotel = 0,
    Resort = 1,
    Apartment = 2,
    Boutique = 3,
    Villa = 4,
    Hostel = 5
}

/// <summary>Editorial and operational lifecycle of a hotel.</summary>
public enum HotelStatus
{
    Draft = 0,
    InReview = 1,
    Published = 2,
    Suspended = 3,
    Archived = 4
}

/// <summary>
/// Canonical hotel owned by the platform and referenced by agency offers.
/// </summary>
public sealed class Hotel : AggregateRoot<Guid>
{
    private readonly List<HotelTranslation> _translations = [];
    private readonly List<HotelAmenity> _amenities = [];
    private readonly List<HotelImage> _images = [];
    private readonly List<HotelRoom> _rooms = [];

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
        decimal? longitude,
        HotelPropertyType propertyType = HotelPropertyType.Hotel,
        string? contactPhone = null,
        string? websiteUrl = null,
        string? checkInTime = null,
        string? checkOutTime = null,
        string? seoTitle = null,
        string? seoDescription = null) : base(id)
    {
        Slug = slug;
        DestinationId = destinationId;
        Stars = stars;
        Address = address;
        Latitude = latitude;
        Longitude = longitude;
        PropertyType = propertyType;
        ContactPhone = contactPhone;
        WebsiteUrl = websiteUrl;
        CheckInTime = checkInTime;
        CheckOutTime = checkOutTime;
        SeoTitle = seoTitle;
        SeoDescription = seoDescription;
        Status = HotelStatus.Draft;
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

    /// <summary>Hotel/property category.</summary>
    public HotelPropertyType PropertyType { get; private set; }

    /// <summary>Public contact phone.</summary>
    public string? ContactPhone { get; private set; }

    /// <summary>Official website.</summary>
    public string? WebsiteUrl { get; private set; }

    /// <summary>Check-in time text such as 14:00.</summary>
    public string? CheckInTime { get; private set; }

    /// <summary>Check-out time text such as 12:00.</summary>
    public string? CheckOutTime { get; private set; }

    /// <summary>Lifecycle state.</summary>
    public HotelStatus Status { get; private set; }

    /// <summary>SEO title.</summary>
    public string? SeoTitle { get; private set; }

    /// <summary>SEO description.</summary>
    public string? SeoDescription { get; private set; }

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
    /// Gallery images in display order.
    /// </summary>
    public IReadOnlyCollection<HotelImage> Images => _images;

    /// <summary>
    /// Bookable room and board options.
    /// </summary>
    public IReadOnlyCollection<HotelRoom> Rooms => _rooms;

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
        decimal? longitude = null,
        HotelPropertyType propertyType = HotelPropertyType.Hotel,
        string? contactPhone = null,
        string? websiteUrl = null,
        string? checkInTime = null,
        string? checkOutTime = null,
        string? seoTitle = null,
        string? seoDescription = null)
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
            longitude,
            propertyType,
            string.IsNullOrWhiteSpace(contactPhone) ? null : contactPhone.Trim(),
            string.IsNullOrWhiteSpace(websiteUrl) ? null : websiteUrl.Trim(),
            string.IsNullOrWhiteSpace(checkInTime) ? null : checkInTime.Trim(),
            string.IsNullOrWhiteSpace(checkOutTime) ? null : checkOutTime.Trim(),
            string.IsNullOrWhiteSpace(seoTitle) ? null : seoTitle.Trim(),
            string.IsNullOrWhiteSpace(seoDescription) ? null : seoDescription.Trim());
    }

    /// <summary>
    /// Adds a localized translation.
    /// </summary>
    public HotelTranslation AddTranslation(
        IIdGenerator ids,
        string locale,
        string name,
        string? description = null,
        string? policies = null)
    {
        if (_translations.Any(item => string.Equals(item.Locale, locale, StringComparison.OrdinalIgnoreCase)))
        {
            throw new InvalidOperationException($"Translation '{locale}' already exists.");
        }

        var translation = new HotelTranslation(
            ids.NewId(), Id, locale, name, description, policies);
        _translations.Add(translation);
        Touch();
        return translation;
    }

    /// <summary>
    /// Replaces the gallery images.
    /// </summary>
    public void ReplaceImages(IIdGenerator ids, IEnumerable<HotelImageInput> images)
    {
        _images.Clear();

        foreach (var image in images)
        {
            if (string.IsNullOrWhiteSpace(image.Url))
            {
                throw new ArgumentException("Image URL is required.", nameof(images));
            }

            _images.Add(new HotelImage(
                ids.NewId(),
                Id,
                image.Url,
                image.Caption,
                image.SortOrder,
                image.Category,
                image.AltText,
                image.IsCover,
                image.Source,
                image.MediaAssetId));
        }

        Touch();
    }

    /// <summary>
    /// Replaces the amenity list.
    /// </summary>
    public void ReplaceAmenities(IIdGenerator ids, IEnumerable<HotelAmenityInput> amenities)
    {
        _amenities.Clear();

        foreach (var amenity in amenities)
        {
            _amenities.Add(new HotelAmenity(
                ids.NewId(),
                Id,
                amenity.Category,
                amenity.Name,
                amenity.Code,
                amenity.Icon,
                amenity.SortOrder));
        }

        Touch();
    }

    /// <summary>
    /// Replaces room and board options.
    /// </summary>
    public void ReplaceRooms(IIdGenerator ids, IEnumerable<HotelRoomInput> rooms)
    {
        _rooms.Clear();

        foreach (var room in rooms)
        {
            if (string.IsNullOrWhiteSpace(room.Name) ||
                string.IsNullOrWhiteSpace(room.RoomType) ||
                string.IsNullOrWhiteSpace(room.MealPlan) ||
                string.IsNullOrWhiteSpace(room.Currency) ||
                room.Price <= 0 ||
                room.Adults < 1 ||
                room.Children < 0)
            {
                throw new ArgumentException("Room pricing and occupancy are invalid.", nameof(rooms));
            }

            _rooms.Add(new HotelRoom(
                ids.NewId(),
                Id,
                room.Name,
                room.RoomType,
                room.MealPlan,
                room.Adults,
                room.Children,
                room.Price,
                room.Currency,
                room.Description,
                room.SortOrder,
                room.Inventory,
                room.MaxOccupancy,
                room.RoomSize,
                room.BedType,
                room.View,
                room.RatePlan,
                room.CancellationPolicy,
                room.TaxPercent,
                room.StopSell));
        }

        Touch();
    }

    /// <summary>Updates editable hotel content and lifecycle state.</summary>
    public void UpdateDetails(
        string slug,
        Guid destinationId,
        int stars,
        string? address,
        decimal? latitude,
        decimal? longitude,
        HotelPropertyType propertyType,
        string? contactPhone,
        string? websiteUrl,
        string? checkInTime,
        string? checkOutTime,
        HotelStatus status,
        string? seoTitle,
        string? seoDescription)
    {
        Slug = slug.Trim().ToLowerInvariant();
        DestinationId = destinationId;
        Stars = stars;
        Address = string.IsNullOrWhiteSpace(address) ? null : address.Trim();
        Latitude = latitude;
        Longitude = longitude;
        PropertyType = propertyType;
        ContactPhone = string.IsNullOrWhiteSpace(contactPhone) ? null : contactPhone.Trim();
        WebsiteUrl = string.IsNullOrWhiteSpace(websiteUrl) ? null : websiteUrl.Trim();
        CheckInTime = string.IsNullOrWhiteSpace(checkInTime) ? null : checkInTime.Trim();
        CheckOutTime = string.IsNullOrWhiteSpace(checkOutTime) ? null : checkOutTime.Trim();
        Status = status;
        SeoTitle = string.IsNullOrWhiteSpace(seoTitle) ? null : seoTitle.Trim();
        SeoDescription = string.IsNullOrWhiteSpace(seoDescription) ? null : seoDescription.Trim();
        Touch();
    }

    /// <summary>Replaces localized hotel content.</summary>
    public void ReplaceTranslations(IIdGenerator ids, IEnumerable<HotelTranslationInput> translations)
    {
        _translations.Clear();
        foreach (var translation in translations)
        {
            if (string.IsNullOrWhiteSpace(translation.Name))
            {
                throw new ArgumentException("Hotel translation name is required.", nameof(translations));
            }

            _translations.Add(new HotelTranslation(
                ids.NewId(),
                Id,
                translation.Locale,
                translation.Name,
                translation.Description,
                translation.Policies));
        }

        Touch();
    }

    /// <summary>Moves the hotel to published state.</summary>
    public void Publish()
    {
        Status = HotelStatus.Published;
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
        string? description,
        string? policies = null) : base(id)
    {
        HotelId = hotelId;
        Locale = locale.Trim().ToLowerInvariant();
        Name = name.Trim();
        Description = description?.Trim();
        Policies = policies?.Trim();
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

    /// <summary>Localized hotel policies text.</summary>
    public string? Policies { get; private set; }
}

/// <summary>
/// Hotel amenity.
/// </summary>
public sealed class HotelAmenity : Entity<Guid>
{
    private HotelAmenity()
    {
    }

    internal HotelAmenity(
        Guid id,
        Guid hotelId,
        string category,
        string name,
        string? code = null,
        string? icon = null,
        int sortOrder = 0) : base(id)
    {
        HotelId = hotelId;
        Category = category.Trim();
        Name = name.Trim();
        Code = string.IsNullOrWhiteSpace(code)
            ? name.Trim().ToLowerInvariant().Replace(' ', '-')
            : code.Trim().ToLowerInvariant();
        Icon = string.IsNullOrWhiteSpace(icon) ? null : icon.Trim();
        SortOrder = sortOrder;
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

    /// <summary>Stable amenity code used by filters.</summary>
    public string Code { get; private set; } = string.Empty;

    /// <summary>Optional icon class/key.</summary>
    public string? Icon { get; private set; }

    /// <summary>Display order.</summary>
    public int SortOrder { get; private set; }
}

/// <summary>
/// Hotel gallery image.
/// </summary>
public sealed class HotelImage : Entity<Guid>
{
    private HotelImage()
    {
    }

    internal HotelImage(
        Guid id,
        Guid hotelId,
        string url,
        string? caption,
        int sortOrder,
        string? category = null,
        string? altText = null,
        bool isCover = false,
        string? source = null,
        Guid? mediaAssetId = null) : base(id)
    {
        HotelId = hotelId;
        Url = url.Trim();
        Caption = caption?.Trim();
        SortOrder = sortOrder;
        Category = string.IsNullOrWhiteSpace(category) ? null : category.Trim();
        AltText = string.IsNullOrWhiteSpace(altText) ? null : altText.Trim();
        IsCover = isCover;
        Source = string.IsNullOrWhiteSpace(source) ? "Hani" : source.Trim();
        MediaAssetId = mediaAssetId;
    }

    /// <summary>Parent hotel.</summary>
    public Guid HotelId { get; private set; }

    /// <summary>Public image URL.</summary>
    public string Url { get; private set; } = string.Empty;

    /// <summary>Optional caption.</summary>
    public string? Caption { get; private set; }

    /// <summary>Display order.</summary>
    public int SortOrder { get; private set; }

    /// <summary>Gallery category such as Rooms, Restaurant, or Lobby.</summary>
    public string? Category { get; private set; }

    /// <summary>SEO alt text.</summary>
    public string? AltText { get; private set; }

    /// <summary>Whether this is the cover/hero image.</summary>
    public bool IsCover { get; private set; }

    /// <summary>Image source such as Hani, Agency, or User.</summary>
    public string? Source { get; private set; }

    /// <summary>Optional Media Library asset id.</summary>
    public Guid? MediaAssetId { get; private set; }
}

/// <summary>
/// Gallery image input used by hotel creation and replacement.
/// </summary>
public sealed record HotelImageInput(
    string Url,
    string? Caption = null,
    int SortOrder = 0,
    string? Category = null,
    string? AltText = null,
    bool IsCover = false,
    string? Source = null,
    Guid? MediaAssetId = null);

/// <summary>
/// Hotel room and board option.
/// </summary>
public sealed class HotelRoom : Entity<Guid>
{
    private HotelRoom()
    {
    }

    internal HotelRoom(
        Guid id,
        Guid hotelId,
        string name,
        string roomType,
        string mealPlan,
        int adults,
        int children,
        decimal price,
        string currency,
        string? description,
        int sortOrder,
        int inventory = 0,
        int maxOccupancy = 0,
        decimal? roomSize = null,
        string? bedType = null,
        string? view = null,
        string? ratePlan = null,
        string? cancellationPolicy = null,
        decimal? taxPercent = null,
        bool stopSell = false) : base(id)
    {
        HotelId = hotelId;
        Name = name.Trim();
        RoomType = roomType.Trim();
        MealPlan = mealPlan.Trim();
        Adults = adults;
        Children = children;
        Price = price;
        Currency = currency.Trim().ToUpperInvariant();
        Description = description?.Trim();
        SortOrder = sortOrder;
        Inventory = inventory;
        MaxOccupancy = maxOccupancy;
        RoomSize = roomSize;
        BedType = string.IsNullOrWhiteSpace(bedType) ? null : bedType.Trim();
        View = string.IsNullOrWhiteSpace(view) ? null : view.Trim();
        RatePlan = string.IsNullOrWhiteSpace(ratePlan) ? null : ratePlan.Trim();
        CancellationPolicy = string.IsNullOrWhiteSpace(cancellationPolicy)
            ? null
            : cancellationPolicy.Trim();
        TaxPercent = taxPercent;
        StopSell = stopSell;
    }

    /// <summary>Parent hotel.</summary>
    public Guid HotelId { get; private set; }

    /// <summary>Room display name.</summary>
    public string Name { get; private set; } = string.Empty;

    /// <summary>Room type such as Double, Single, or Suite.</summary>
    public string RoomType { get; private set; } = string.Empty;

    /// <summary>Board basis such as BB, HB, FB, or RO.</summary>
    public string MealPlan { get; private set; } = string.Empty;

    /// <summary>Adult capacity.</summary>
    public int Adults { get; private set; }

    /// <summary>Child capacity.</summary>
    public int Children { get; private set; }

    /// <summary>Price per night.</summary>
    public decimal Price { get; private set; }

    /// <summary>Price currency.</summary>
    public string Currency { get; private set; } = string.Empty;

    /// <summary>Optional description.</summary>
    public string? Description { get; private set; }

    /// <summary>Display order.</summary>
    public int SortOrder { get; private set; }

    /// <summary>Room inventory/allotment.</summary>
    public int Inventory { get; private set; }

    /// <summary>Maximum occupancy.</summary>
    public int MaxOccupancy { get; private set; }

    /// <summary>Room size in square metres.</summary>
    public decimal? RoomSize { get; private set; }

    /// <summary>Bed configuration.</summary>
    public string? BedType { get; private set; }

    /// <summary>Room view.</summary>
    public string? View { get; private set; }

    /// <summary>Rate plan label.</summary>
    public string? RatePlan { get; private set; }

    /// <summary>Cancellation policy text.</summary>
    public string? CancellationPolicy { get; private set; }

    /// <summary>Tax percentage.</summary>
    public decimal? TaxPercent { get; private set; }

    /// <summary>Stop-sell flag.</summary>
    public bool StopSell { get; private set; }
}

/// <summary>
/// Hotel room input.
/// </summary>
public sealed record HotelRoomInput(
    string Name,
    string RoomType,
    string MealPlan,
    int Adults,
    int Children,
    decimal Price,
    string Currency,
    string? Description = null,
    int SortOrder = 0,
    int Inventory = 0,
    int MaxOccupancy = 0,
    decimal? RoomSize = null,
    string? BedType = null,
    string? View = null,
    string? RatePlan = null,
    string? CancellationPolicy = null,
    decimal? TaxPercent = null,
    bool StopSell = false);

/// <summary>
/// Amenity input used by hotel creation and replacement.
/// </summary>
public sealed record HotelAmenityInput(
    string Category,
    string Name,
    string? Code = null,
    string? Icon = null,
    int SortOrder = 0);

/// <summary>
/// Translation input used by hotel creation.
/// </summary>
public sealed record HotelTranslationInput(
    string Locale,
    string Name,
    string? Description = null,
    string? Policies = null);
