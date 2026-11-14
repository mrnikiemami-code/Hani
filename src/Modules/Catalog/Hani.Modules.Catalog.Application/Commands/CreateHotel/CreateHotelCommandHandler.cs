using Hani.BuildingBlocks.Application;
using Hani.BuildingBlocks.Domain;
using Hani.Modules.Catalog.Application.Abstractions;
using Hani.Modules.Catalog.Domain.Hotels;

namespace Hani.Modules.Catalog.Application.Commands.CreateHotel;

internal sealed class CreateHotelCommandHandler(
    IHotelRepository hotels,
    IIdGenerator ids)
    : ICommandHandler<CreateHotelCommand, Guid>
{
    public async Task<Result<Guid>> Handle(
        CreateHotelCommand request,
        CancellationToken cancellationToken)
    {
        try
        {
            var hotel = Hotel.Create(
                ids,
                request.Slug,
                request.DestinationId,
                request.Stars,
                request.Address,
                request.Latitude,
                request.Longitude);

            foreach (var translation in request.Translations)
            {
                hotel.AddTranslation(ids, translation.Locale, translation.Name, translation.Description);
            }

            hotel.ReplaceAmenities(ids, request.Amenities);
            hotel.ReplaceImages(ids, request.Images);
            hotel.ReplaceRooms(ids, request.Rooms);
            await hotels.AddAsync(hotel, cancellationToken);
            return Result<Guid>.Success(hotel.Id);
        }
        catch (ArgumentException exception)
        {
            return Result<Guid>.Failure(Error.Validation("HANI-CATALOG-1401", exception.Message));
        }
        catch (InvalidOperationException exception)
        {
            return Result<Guid>.Failure(Error.Conflict("HANI-CATALOG-1402", exception.Message));
        }
    }
}
