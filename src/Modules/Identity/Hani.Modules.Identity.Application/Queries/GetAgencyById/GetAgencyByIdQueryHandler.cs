using Hani.BuildingBlocks.Application;
using Hani.Modules.Identity.Application.Abstractions;

namespace Hani.Modules.Identity.Application.Queries.GetAgencyById;

internal sealed class GetAgencyByIdQueryHandler(IAgencyRepository agencies)
    : IQueryHandler<GetAgencyByIdQuery, AgencyDto>
{
    public async Task<Result<AgencyDto>> Handle(
        GetAgencyByIdQuery request,
        CancellationToken cancellationToken)
    {
        var agency = await agencies.GetByIdAsync(request.AgencyId, cancellationToken);

        if (agency is null)
        {
            return Result<AgencyDto>.Failure(
                Error.NotFound("HANI-IDENTITY-1010", "Agency was not found."));
        }

        return Result<AgencyDto>.Success(AgencyMappings.ToDto(agency));
    }
}
