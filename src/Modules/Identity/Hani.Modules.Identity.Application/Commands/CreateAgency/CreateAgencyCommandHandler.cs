using Hani.BuildingBlocks.Application;
using Hani.BuildingBlocks.Domain;
using Hani.Modules.Identity.Application.Abstractions;
using Hani.Modules.Identity.Domain.Agencies;

namespace Hani.Modules.Identity.Application.Commands.CreateAgency;

internal sealed class CreateAgencyCommandHandler(
    IAgencyRepository agencies,
    IIdGenerator ids)
    : ICommandHandler<CreateAgencyCommand, Guid>
{
    public async Task<Result<Guid>> Handle(
        CreateAgencyCommand request,
        CancellationToken cancellationToken)
    {
        var slug = request.Slug.Trim().ToLowerInvariant();

        if (await agencies.SlugExistsAsync(slug, cancellationToken))
        {
            return Result<Guid>.Failure(
                Error.Conflict("HANI-IDENTITY-1001", "Agency slug already exists."));
        }

        var agency = Agency.Create(
            ids,
            slug,
            request.Name,
            request.LicenseNo,
            request.City,
            request.SubscriptionValidUntil);

        await agencies.AddAsync(agency, cancellationToken);

        return Result<Guid>.Success(agency.Id);
    }
}
