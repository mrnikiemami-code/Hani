using Hani.BuildingBlocks.Application;
using Hani.BuildingBlocks.Domain;
using Hani.Modules.Catalog.Application.Abstractions;
using Hani.Modules.Catalog.Domain.Places;

namespace Hani.Modules.Catalog.Application.Commands.CreatePlace;

internal sealed class CreatePlaceCommandHandler(
    IPlaceRepository places,
    IIdGenerator ids)
    : ICommandHandler<CreatePlaceCommand, Guid>
{
    public async Task<Result<Guid>> Handle(
        CreatePlaceCommand request,
        CancellationToken cancellationToken)
    {
        try
        {
            var place = Place.Create(
                ids,
                request.Slug,
                request.Type,
                request.DestinationId,
                request.Category,
                request.Cuisine,
                request.PriceBand,
                request.Reservable,
                request.OnlineReservable,
                request.Latitude,
                request.Longitude);

            foreach (var translation in request.Translations)
            {
                place.AddTranslation(ids, translation.Locale, translation.Name, translation.Description);
            }

            place.ReplaceAmenities(ids, request.Amenities);
            place.ReplaceMenuItems(ids, request.MenuItems);
            place.ReplaceMealPeriods(ids, request.MealPeriods);
            place.ReplaceDietaryOptions(ids, request.DietaryOptions);
            await places.AddAsync(place, cancellationToken);
            return Result<Guid>.Success(place.Id);
        }
        catch (ArgumentException exception)
        {
            return Result<Guid>.Failure(Error.Validation("HANI-CATALOG-1501", exception.Message));
        }
        catch (InvalidOperationException exception)
        {
            return Result<Guid>.Failure(Error.Conflict("HANI-CATALOG-1502", exception.Message));
        }
    }
}
