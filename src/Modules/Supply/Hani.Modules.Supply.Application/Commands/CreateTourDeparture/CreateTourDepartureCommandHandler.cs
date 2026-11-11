using Hani.BuildingBlocks.Application;
using Hani.BuildingBlocks.Domain;
using Hani.Modules.Supply.Application.Abstractions;
using Hani.Modules.Supply.Domain.Departures;

namespace Hani.Modules.Supply.Application.Commands.CreateTourDeparture;

internal sealed class CreateTourDepartureCommandHandler(
    IAgencyOfferRepository offers,
    IDepartureRepository departures)
    : ICommandHandler<CreateTourDepartureCommand, Guid>
{
    public async Task<Result<Guid>> Handle(
        CreateTourDepartureCommand request,
        CancellationToken cancellationToken)
    {
        var offer = await offers.GetByIdAsync(request.AgencyOfferId, cancellationToken);

        if (offer is null)
        {
            return Result<Guid>.Failure(
                Error.NotFound("HANI-SUPPLY-1101", "Agency offer was not found."));
        }

        var prices = request.Prices
            .Select(price => (
                price.RoomType,
                Money.Of(price.Amount, price.Currency)))
            .ToArray();

        var departure = TourDeparture.Create(
            request.AgencyOfferId,
            request.StartDate,
            request.EndDate,
            request.Capacity,
            prices);

        await departures.AddAsync(departure, cancellationToken);

        return Result<Guid>.Success(departure.Id);
    }
}
