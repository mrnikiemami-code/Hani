using Hani.Modules.Catalog.Domain.TourProducts;

namespace Hani.Modules.Catalog.Application.Queries.GetTourProductById;

internal static class TourProductMappings
{
    public static TourProductDto ToDto(TourProduct product)
        => new(
            product.Id,
            product.Slug,
            product.DurationDays,
            product.TourType,
            product.Status.ToString(),
            product.OriginDestinationId,
            product.Difficulty.ToString(),
            product.VehicleType.ToString(),
            product.LocalVehicleType.ToString(),
            product.AccommodationType.ToString(),
            product.Category.ToString(),
            product.TravelType.ToString(),
            product.CreatedAt,
            product.Translations
                .Select(translation => new TourProductTranslationDto(
                    translation.Locale,
                    translation.Title,
                    translation.Summary,
                    translation.Description,
                    translation.SeoTitle,
                    translation.SeoDescription,
                    translation.MealsSummary,
                    translation.IncludedServices,
                    translation.ExcludedServices,
                    translation.CancellationPolicy,
                    translation.AdditionalInfo,
                    translation.RequiredItems))
                .ToArray(),
            product.Destinations
                .OrderBy(destination => destination.SortOrder)
                .Select(destination => destination.DestinationId)
                .ToArray(),
            product.ItineraryDays
                .OrderBy(day => day.DayNumber)
                .Select(day => new TourItineraryDayDto(
                    day.DayNumber,
                    day.Breakfast,
                    day.Lunch,
                    day.Dinner,
                    day.Translations
                        .Select(translation => new TourItineraryDayTranslationDto(
                            translation.Locale,
                            translation.Title,
                            translation.Description,
                            translation.Accommodation))
                        .ToArray()))
                .ToArray(),
            product.Scope.ToString(),
            product.CoverImageUrl);
}
