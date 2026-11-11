using Hani.BuildingBlocks.Application;

namespace Hani.Modules.Supply.Application.Queries.GetDeparturesByOffer;

/// <summary>
/// Query that lists departures for an offer inside the current tenant.
/// </summary>
public sealed record GetDeparturesByOfferQuery(Guid AgencyId, Guid AgencyOfferId)
    : IQuery<IReadOnlyList<TourDepartureDto>>;
