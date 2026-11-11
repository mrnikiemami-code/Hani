using Hani.BuildingBlocks.Application;

namespace Hani.Modules.Supply.Application.Queries.GetAgencyOfferById;

public sealed record GetAgencyOfferByIdQuery(Guid OfferId, Guid AgencyId) : IQuery<AgencyOfferDto>;
