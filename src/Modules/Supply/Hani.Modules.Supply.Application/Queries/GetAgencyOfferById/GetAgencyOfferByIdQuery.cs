using Hani.BuildingBlocks.Application;

namespace Hani.Modules.Supply.Application.Queries.GetAgencyOfferById;

/// <summary>
/// Query that reads an agency offer inside the current tenant.
/// </summary>
public sealed record GetAgencyOfferByIdQuery(Guid OfferId, Guid AgencyId) : IQuery<AgencyOfferDto>;
