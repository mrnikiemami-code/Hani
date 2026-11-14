using Hani.BuildingBlocks.Domain;
using Hani.Modules.Catalog.Domain.Destinations;
using Hani.Modules.Catalog.Domain.TourProducts.Events;

namespace Hani.Modules.Catalog.Domain.TourProducts;

/// <summary>
/// Shared canonical tour product owned by the platform, not by an agency.
/// </summary>
public sealed class TourProduct : AggregateRoot<Guid>
{
    private readonly List<TourProductTranslation> _translations = [];
    private readonly List<TourProductDestination> _destinations = [];
    private readonly List<TourItineraryDay> _itineraryDays = [];

    private TourProduct()
    {
    }

    private TourProduct(
        Guid id,
        string slug,
        int durationDays,
        string tourType,
        Guid? originDestinationId,
        TourDifficulty difficulty,
        TourVehicleType vehicleType,
        TourVehicleType localVehicleType,
        TourAccommodationType accommodationType,
        TourCategory category,
        TravelType travelType) : base(id)
    {
        Slug = slug;
        DurationDays = durationDays;
        TourType = tourType;
        OriginDestinationId = originDestinationId;
        Difficulty = difficulty;
        VehicleType = vehicleType;
        LocalVehicleType = localVehicleType;
        AccommodationType = accommodationType;
        Category = category;
        TravelType = travelType;
        Status = TourProductStatus.Draft;
        CreatedAt = DateTimeOffset.UtcNow;
        UpdatedAt = CreatedAt;
    }

    public string Slug { get; private set; } = string.Empty;

    public int DurationDays { get; private set; }

    public string TourType { get; private set; } = string.Empty;

    /// <summary>
    /// Optional origin city destination.
    /// </summary>
    public Guid? OriginDestinationId { get; private set; }

    /// <summary>
    /// Tour difficulty.
    /// </summary>
    public TourDifficulty Difficulty { get; private set; }

    /// <summary>
    /// Primary transport type.
    /// </summary>
    public TourVehicleType VehicleType { get; private set; }

    /// <summary>
    /// Commercial tour category.
    /// </summary>
    public TourCategory Category { get; private set; }

    /// <summary>
    /// Primary travel mode.
    /// </summary>
    public TravelType TravelType { get; private set; }

    /// <summary>
    /// Local transport type.
    /// </summary>
    public TourVehicleType LocalVehicleType { get; private set; }

    /// <summary>
    /// Accommodation type.
    /// </summary>
    public TourAccommodationType AccommodationType { get; private set; }

    public TourProductStatus Status { get; private set; }

    public DateTimeOffset CreatedAt { get; private set; }

    public DateTimeOffset UpdatedAt { get; private set; }

    public IReadOnlyCollection<TourProductTranslation> Translations => _translations;

    public IReadOnlyCollection<TourProductDestination> Destinations => _destinations;

    /// <summary>
    /// Localized day-by-day itinerary.
    /// </summary>
    public IReadOnlyCollection<TourItineraryDay> ItineraryDays => _itineraryDays;

    public static TourProduct Create(
        IIdGenerator ids,
        string slug,
        int durationDays,
        string tourType,
        Guid? originDestinationId = null,
        TourDifficulty difficulty = TourDifficulty.Normal,
        TourVehicleType vehicleType = TourVehicleType.None,
        TourVehicleType localVehicleType = TourVehicleType.None,
        TourAccommodationType accommodationType = TourAccommodationType.Hotel,
        TourCategory category = TourCategory.Normal,
        TravelType travelType = TravelType.Other)
    {
        if (string.IsNullOrWhiteSpace(slug))
        {
            throw new ArgumentException("Slug is required.", nameof(slug));
        }

        ArgumentOutOfRangeException.ThrowIfNegativeOrZero(durationDays);

        if (string.IsNullOrWhiteSpace(tourType))
        {
            throw new ArgumentException("Tour type is required.", nameof(tourType));
        }

        var product = new TourProduct(
            ids.NewId(),
            slug.Trim(),
            durationDays,
            tourType.Trim(),
            originDestinationId,
            difficulty,
            vehicleType,
            localVehicleType,
            accommodationType,
            category,
            travelType);

        product.AddDomainEvent(new TourProductCreatedDomainEvent(ids.NewId(), product.Id));

        return product;
    }

    public void AddTranslation(
        IIdGenerator ids,
        string locale,
        string title,
        string summary,
        string description,
        string? seoTitle = null,
        string? seoDescription = null,
        string? mealsSummary = null,
        string? includedServices = null,
        string? excludedServices = null,
        string? cancellationPolicy = null,
        string? additionalInfo = null,
        string? requiredItems = null)
    {
        if (_translations.Any(item =>
                string.Equals(item.Locale, locale, StringComparison.OrdinalIgnoreCase)))
        {
            throw new InvalidOperationException($"Translation '{locale}' already exists.");
        }

        _translations.Add(new TourProductTranslation(
            ids.NewId(),
            Id,
            locale,
            title,
            summary,
            description,
            seoTitle,
            seoDescription,
            mealsSummary,
            includedServices,
            excludedServices,
            cancellationPolicy,
            additionalInfo,
            requiredItems));

        Touch();
    }

    public void AddDestination(IIdGenerator ids, Destination destination, int sortOrder = 0)
    {
        ArgumentNullException.ThrowIfNull(destination);

        if (_destinations.Any(item => item.DestinationId == destination.Id))
        {
            return;
        }

        _destinations.Add(new TourProductDestination(
            ids.NewId(),
            Id,
            destination.Id,
            sortOrder));

        Touch();
    }

    /// <summary>
    /// Adds one localized itinerary day.
    /// </summary>
    public void AddItineraryDay(
        IIdGenerator ids,
        int dayNumber,
        bool breakfast,
        bool lunch,
        bool dinner,
        IReadOnlyCollection<TourItineraryDayTranslationDetails> translations)
    {
        ArgumentOutOfRangeException.ThrowIfNegativeOrZero(dayNumber);

        if (_itineraryDays.Any(day => day.DayNumber == dayNumber))
        {
            throw new InvalidOperationException($"Itinerary day {dayNumber} already exists.");
        }

        if (translations.Count == 0)
        {
            throw new ArgumentException("Itinerary day needs at least one translation.", nameof(translations));
        }

        var day = new TourItineraryDay(
            ids.NewId(),
            Id,
            dayNumber,
            breakfast,
            lunch,
            dinner);

        foreach (var translation in translations)
        {
            day.AddTranslation(
                ids,
                translation.Locale,
                translation.Title,
                translation.Description,
                translation.Accommodation);
        }

        _itineraryDays.Add(day);
        Touch();
    }

    /// <summary>
    /// Updates the overview fields of the tour.
    /// </summary>
    public void SetOverview(
        Guid? originDestinationId,
        TourDifficulty difficulty,
        TourVehicleType vehicleType,
        TourVehicleType localVehicleType,
        TourAccommodationType accommodationType)
    {
        OriginDestinationId = originDestinationId;
        Difficulty = difficulty;
        VehicleType = vehicleType;
        LocalVehicleType = localVehicleType;
        AccommodationType = accommodationType;
        Touch();
    }

    public void Publish(IIdGenerator ids)
    {
        if (_translations.Count == 0)
        {
            throw new InvalidOperationException("A tour product needs at least one translation.");
        }

        if (_destinations.Count == 0)
        {
            throw new InvalidOperationException("A tour product needs at least one destination.");
        }

        Status = TourProductStatus.Published;
        Touch();
        AddDomainEvent(new TourProductPublishedDomainEvent(ids.NewId(), Id));
    }

    private void Touch() => UpdatedAt = DateTimeOffset.UtcNow;
}

/// <summary>
/// Localized content supplied for one itinerary day.
/// </summary>
public sealed record TourItineraryDayTranslationDetails(
    string Locale,
    string Title,
    string Description,
    string? Accommodation = null);
