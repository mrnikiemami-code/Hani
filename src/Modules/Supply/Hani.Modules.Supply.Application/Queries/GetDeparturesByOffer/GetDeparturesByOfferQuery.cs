using Hani.BuildingBlocks.Application;

namespace Hani.Modules.Supply.Application.Queries.GetDeparturesByOffer;

public sealed record GetDeparturesByOfferQuery(Guid AgencyId, Guid AgencyOfferId)
    : IQuery<IReadOnlyList<TourDepartureDto>>;
