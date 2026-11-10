using Hani.BuildingBlocks.Application;

namespace Hani.Modules.Identity.Application.Queries.GetAgencyById;

public sealed record GetAgencyByIdQuery(Guid AgencyId) : IQuery<AgencyDto>;
