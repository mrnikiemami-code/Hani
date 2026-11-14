using Hani.BuildingBlocks.Application;
using Hani.BuildingBlocks.Domain;
using Hani.Modules.Identity.Application.Abstractions;
using Hani.Modules.Identity.Application.Queries;
using Hani.Modules.Identity.Application.Queries.GetAgencyById;
using Hani.Modules.Identity.Domain.Agencies;

namespace Hani.Modules.Identity.Application.Commands.AgencyOnboarding;

internal sealed class CreateAgencyOnboardingCommandHandler(
    IAgencyRepository agencies,
    IIdGenerator ids)
    : ICommandHandler<CreateAgencyOnboardingCommand, AgencyDto>
{
    public async Task<Result<AgencyDto>> Handle(
        CreateAgencyOnboardingCommand request,
        CancellationToken cancellationToken)
    {
        if (await agencies.SlugExistsAsync(request.Slug.Trim(), cancellationToken))
        {
            return Result<AgencyDto>.Failure(
                Error.Conflict("HANI-IDENTITY-1400", "Agency slug is already used."));
        }

        try
        {
            var agency = Agency.CreateOnboarding(
                ids,
                request.UserId,
                request.Slug,
                request.Name,
                request.LicenseNo,
                request.City,
                request.Website,
                request.ContactEmail,
                request.ContactPhone,
                request.About,
                request.Documents,
                request.LicenseType,
                request.LicenseIssuedAt,
                request.ManagerName,
                request.StaffCount,
                request.Address,
                request.Province,
                request.LicenseFileUrl);

            await agencies.AddAsync(agency, cancellationToken);
            return Result<AgencyDto>.Success(AgencyMappings.ToDto(agency));
        }
        catch (ArgumentException exception)
        {
            return Result<AgencyDto>.Failure(
                Error.Validation("HANI-IDENTITY-1401", exception.Message));
        }
    }
}

internal sealed class GetMyAgencyQueryHandler(IAgencyRepository agencies)
    : IQueryHandler<GetMyAgencyQuery, AgencyDto>
{
    public async Task<Result<AgencyDto>> Handle(
        GetMyAgencyQuery request,
        CancellationToken cancellationToken)
    {
        var agency = await agencies.GetByOwnerUserIdAsync(request.UserId, cancellationToken);

        return agency is null
            ? Result<AgencyDto>.Failure(
                Error.NotFound("HANI-IDENTITY-1402", "Agency onboarding was not found."))
            : Result<AgencyDto>.Success(AgencyMappings.ToDto(agency));
    }
}

internal sealed class ListAgenciesQueryHandler(IAgencyRepository agencies)
    : IQueryHandler<ListAgenciesQuery, IReadOnlyList<AgencyDto>>
{
    public async Task<Result<IReadOnlyList<AgencyDto>>> Handle(
        ListAgenciesQuery request,
        CancellationToken cancellationToken)
    {
        AgencyStatus? status = null;

        if (!string.IsNullOrWhiteSpace(request.Status))
        {
            if (!Enum.TryParse<AgencyStatus>(request.Status, ignoreCase: true, out var parsed))
            {
                return Result<IReadOnlyList<AgencyDto>>.Failure(
                    Error.Validation("HANI-IDENTITY-1403", "Agency status is invalid."));
            }

            status = parsed;
        }

        var items = await agencies.ListAsync(status, cancellationToken);
        return Result<IReadOnlyList<AgencyDto>>.Success(
            items.Select(AgencyMappings.ToDto).ToArray());
    }
}

internal sealed class GetPublicAgencyQueryHandler(IAgencyRepository agencies)
    : IQueryHandler<GetPublicAgencyQuery, PublicAgencyDto>
{
    public async Task<Result<PublicAgencyDto>> Handle(
        GetPublicAgencyQuery request,
        CancellationToken cancellationToken)
    {
        var agency = await agencies.GetBySlugAsync(
            request.Slug.Trim().ToLowerInvariant(),
            cancellationToken);

        if (agency is null || agency.Status != AgencyStatus.Active)
        {
            return Result<PublicAgencyDto>.Failure(
                Error.NotFound("HANI-IDENTITY-1404", "Agency was not found."));
        }

        return Result<PublicAgencyDto>.Success(new PublicAgencyDto(
            agency.Id,
            agency.Slug,
            agency.Name,
            agency.City,
            agency.Website,
            agency.ContactEmail,
            agency.ContactPhone,
            agency.About,
            agency.CreatedAt,
            agency.LicenseNo,
            agency.LicenseType,
            agency.LicenseIssuedAt,
            agency.ManagerName,
            agency.StaffCount,
            agency.Address,
            agency.Province,
            agency.LicenseFileUrl));
    }
}

internal sealed class ApproveAgencyCommandHandler(IAgencyRepository agencies)
    : ICommandHandler<ApproveAgencyCommand, bool>
{
    public async Task<Result<bool>> Handle(
        ApproveAgencyCommand request,
        CancellationToken cancellationToken)
    {
        var agency = await agencies.GetByIdAsync(request.AgencyId, cancellationToken);

        if (agency is null)
        {
            return Result<bool>.Failure(
                Error.NotFound("HANI-IDENTITY-1405", "Agency was not found."));
        }

        try
        {
            agency.Approve();
            await agencies.SaveChangesAsync(cancellationToken);
            return Result<bool>.Success(true);
        }
        catch (InvalidOperationException exception)
        {
            return Result<bool>.Failure(
                Error.Conflict("HANI-IDENTITY-1406", exception.Message));
        }
    }
}

internal sealed class RejectAgencyCommandHandler(IAgencyRepository agencies)
    : ICommandHandler<RejectAgencyCommand, bool>
{
    public async Task<Result<bool>> Handle(
        RejectAgencyCommand request,
        CancellationToken cancellationToken)
    {
        var agency = await agencies.GetByIdAsync(request.AgencyId, cancellationToken);

        if (agency is null)
        {
            return Result<bool>.Failure(
                Error.NotFound("HANI-IDENTITY-1405", "Agency was not found."));
        }

        try
        {
            agency.Reject(request.Reason);
            await agencies.SaveChangesAsync(cancellationToken);
            return Result<bool>.Success(true);
        }
        catch (InvalidOperationException exception)
        {
            return Result<bool>.Failure(
                Error.Conflict("HANI-IDENTITY-1406", exception.Message));
        }
        catch (ArgumentException exception)
        {
            return Result<bool>.Failure(
                Error.Validation("HANI-IDENTITY-1407", exception.Message));
        }
    }
}
