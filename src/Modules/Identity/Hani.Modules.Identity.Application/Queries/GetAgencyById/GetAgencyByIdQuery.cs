using Hani.BuildingBlocks.Application;

namespace Hani.Modules.Identity.Application.Queries.GetAgencyById;

/// <summary>
/// Query that reads an agency by id.
/// </summary>
public sealed record GetAgencyByIdQuery(Guid AgencyId) : IQuery<AgencyDto>;
