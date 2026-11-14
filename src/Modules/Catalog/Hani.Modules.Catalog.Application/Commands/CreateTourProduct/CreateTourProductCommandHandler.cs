using Hani.BuildingBlocks.Application;
using Hani.BuildingBlocks.Domain;
using Hani.Modules.Catalog.Application.Abstractions;
using Hani.Modules.Catalog.Domain.TourProducts;

namespace Hani.Modules.Catalog.Application.Commands.CreateTourProduct;

internal sealed class CreateTourProductCommandHandler(
    ITourProductRepository tourProducts,
    IDestinationRepository destinations,
    IIdGenerator ids)
    : ICommandHandler<CreateTourProductCommand, Guid>
{
    public async Task<Result<Guid>> Handle(
        CreateTourProductCommand request,
        CancellationToken cancellationToken)
    {
        var destinationIds = request.DestinationIds.Distinct().ToArray();
        var foundDestinations = await destinations.GetByIdsAsync(destinationIds, cancellationToken);

        if (foundDestinations.Count != destinationIds.Length)
        {
            return Result<Guid>.Failure(
                Error.Validation("HANI-CATALOG-1001", "One or more destinations were not found."));
        }

        var content = request.Content;

        if (content?.OriginDestinationId is { } originId &&
            foundDestinations.All(destination => destination.Id != originId))
        {
            return Result<Guid>.Failure(
                Error.Validation("HANI-CATALOG-1014", "Origin destination was not found."));
        }

        var product = TourProduct.Create(
            ids,
            request.Slug,
            request.DurationDays,
            request.TourType,
            content?.OriginDestinationId,
            content?.Difficulty ?? TourDifficulty.Normal,
            content?.VehicleType ?? TourVehicleType.None,
            content?.LocalVehicleType ?? TourVehicleType.None,
            content?.AccommodationType ?? TourAccommodationType.Hotel,
            request.Category,
            request.TravelType);

        foreach (var translation in request.Translations)
        {
            product.AddTranslation(
                ids,
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
                translation.RequiredItems);
        }

        if (content is not null)
        {
            foreach (var day in content.ItineraryDays)
            {
                product.AddItineraryDay(
                    ids,
                    day.DayNumber,
                    day.Breakfast,
                    day.Lunch,
                    day.Dinner,
                    day.Translations
                        .Select(translation => new TourItineraryDayTranslationDetails(
                            translation.Locale,
                            translation.Title,
                            translation.Description,
                            translation.Accommodation))
                        .ToArray());
            }
        }

        var sortOrder = 0;
        foreach (var destination in foundDestinations)
        {
            product.AddDestination(ids, destination, sortOrder++);
        }

        await tourProducts.AddAsync(product, cancellationToken);

        return Result<Guid>.Success(product.Id);
    }
}
