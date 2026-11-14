using Hani.BuildingBlocks.Application;
using Hani.Modules.Catalog.Domain.TourProducts;

namespace Hani.Modules.Catalog.Application.Commands.CreateTourProduct;

/// <summary>
/// Input translation for a tour product command.
/// </summary>
public sealed record TourProductTranslationInput(
    string Locale,
    string Title,
    string Summary,
    string Description,
    string? SeoTitle = null,
    string? SeoDescription = null,
    string? MealsSummary = null,
    string? IncludedServices = null,
    string? ExcludedServices = null,
    string? CancellationPolicy = null,
    string? AdditionalInfo = null,
    string? RequiredItems = null);

/// <summary>
/// Overview and day-by-day content for a tour product.
/// </summary>
public sealed record TourProductContentInput(
    Guid? OriginDestinationId,
    TourDifficulty Difficulty,
    TourVehicleType VehicleType,
    TourVehicleType LocalVehicleType,
    TourAccommodationType AccommodationType,
    IReadOnlyList<TourItineraryDayInput> ItineraryDays);

/// <summary>
/// One localized itinerary day supplied in a command.
/// </summary>
public sealed record TourItineraryDayInput(
    int DayNumber,
    bool Breakfast,
    bool Lunch,
    bool Dinner,
    IReadOnlyList<TourItineraryDayTranslationInput> Translations);

/// <summary>
/// Localized text for one itinerary day.
/// </summary>
public sealed record TourItineraryDayTranslationInput(
    string Locale,
    string Title,
    string Description,
    string? Accommodation = null);

/// <summary>
/// Command that creates a shared tour product with translations.
/// </summary>
public sealed record CreateTourProductCommand(
    string Slug,
    int DurationDays,
    string TourType,
    IReadOnlyList<TourProductTranslationInput> Translations,
    IReadOnlyList<Guid> DestinationIds,
    TourProductContentInput? Content = null,
    TourCategory Category = TourCategory.Normal,
    TravelType TravelType = TravelType.Other) : ICommand<Guid>;
