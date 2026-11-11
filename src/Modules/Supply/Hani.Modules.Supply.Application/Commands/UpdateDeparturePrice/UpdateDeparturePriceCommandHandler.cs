using Hani.BuildingBlocks.Application;
using Hani.BuildingBlocks.Domain;
using Hani.Modules.Supply.Application.Abstractions;
using Hani.Modules.Supply.Domain.Departures;

namespace Hani.Modules.Supply.Application.Commands.UpdateDeparturePrice;

internal sealed class UpdateDeparturePriceCommandHandler(
    IDepartureRepository departures,
    IIdGenerator ids)
    : ICommandHandler<UpdateDeparturePriceCommand, bool>
{
    public async Task<Result<bool>> Handle(
        UpdateDeparturePriceCommand request,
        CancellationToken cancellationToken)
    {
        var departure = await departures.GetByIdForAgencyAsync(
            request.DepartureId,
            request.AgencyId,
            cancellationToken);

        if (departure is null)
        {
            return Result<bool>.Failure(
                Error.NotFound("HANI-SUPPLY-1115", "Departure was not found."));
        }

        try
        {
            departure.UpdatePrice(
                ids,
                request.RoomType,
                Money.Of(request.Amount, request.Currency),
                request.Version);
        }
        catch (DepartureConcurrencyException exception)
        {
            return Result<bool>.Failure(
                Error.Conflict("HANI-SUPPLY-1116", exception.Message));
        }

        await departures.SaveChangesAsync(cancellationToken);

        return Result<bool>.Success(true);
    }
}
