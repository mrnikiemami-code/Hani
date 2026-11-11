using Hani.BuildingBlocks.Application;
using Hani.Modules.Supply.Application.Abstractions;

namespace Hani.Modules.Supply.Application.Queries.GetDeparturesByOffer;

internal sealed class GetDeparturesByOfferQueryHandler(
    IDepartureRepository departures,
    IAgencyOfferRepository offers)
    : IQueryHandler<GetDeparturesByOfferQuery, IReadOnlyList<TourDepartureDto>>
{
    public async Task<Result<IReadOnlyList<TourDepartureDto>>> Handle(
        GetDeparturesByOfferQuery request,
        CancellationToken cancellationToken)
    {
        var offer = await offers.GetByIdAsync(
            request.AgencyOfferId,
            request.AgencyId,
            cancellationToken);

        if (offer is null)
        {
            return Result<IReadOnlyList<TourDepartureDto>>.Failure(
                Error.NotFound("HANI-SUPPLY-1122", "Agency offer was not found."));
        }

        var items = await departures.GetByOfferIdAsync(request.AgencyOfferId, cancellationToken);

        var result = items
            .OrderBy(departure => departure.StartDate)
            .Select(departure => new TourDepartureDto(
                departure.Id,
                departure.AgencyOfferId,
                departure.StartDate,
                departure.EndDate,
                departure.Capacity,
                departure.SeatsLeft,
                departure.Status.ToString(),
                departure.Version,
                departure.Prices
                    .OrderBy(price => price.RoomType)
                    .Select(price => new DeparturePriceDto(
                        price.RoomType,
                        price.Amount,
                        price.Currency))
                    .ToArray()))
            .ToArray();

        return Result<IReadOnlyList<TourDepartureDto>>.Success(result);
    }
}
