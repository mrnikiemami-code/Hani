namespace Hani.Modules.Catalog.Application.Queries.GetTourProductById;

/// <summary>
/// Localized tour product content returned to clients.
/// </summary>
public sealed record TourProductTranslationDto(
    string Locale,
    string Title,
    string Summary,
    string Description,
    string? SeoTitle,
    string? SeoDescription,
    string? MealsSummary = null,
    string? IncludedServices = null,
    string? ExcludedServices = null,
    string? CancellationPolicy = null,
    string? AdditionalInfo = null,
    string? RequiredItems = null);

/// <summary>
/// Localized itinerary day returned to clients.
/// </summary>
public sealed record TourItineraryDayDto(
    int DayNumber,
    bool Breakfast,
    bool Lunch,
    bool Dinner,
    IReadOnlyList<TourItineraryDayTranslationDto> Translations);

/// <summary>
/// Localized itinerary day text.
/// </summary>
public sealed record TourItineraryDayTranslationDto(
    string Locale,
    string Title,
    string Description,
    string? Accommodation);

/// <summary>
/// Tour product read model returned to clients.
/// </summary>
public sealed record TourProductDto(
    Guid Id,
    string Slug,
    int DurationDays,
    string TourType,
    string Status,
    Guid? OriginDestinationId,
    string Difficulty,
    string VehicleType,
    string LocalVehicleType,
    string AccommodationType,
    string Category,
    string TravelType,
    DateTimeOffset CreatedAt,
    IReadOnlyList<TourProductTranslationDto> Translations,
    IReadOnlyList<Guid> DestinationIds,
    IReadOnlyList<TourItineraryDayDto> ItineraryDays);
