using Hani.BuildingBlocks.Application;
using Hani.BuildingBlocks.Domain;
using Hani.Contracts.Identity;
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

internal sealed class ListPublicAgenciesQueryHandler(
    IAgencyRepository agencies,
    IReviewSummaryReadService reviewSummaries)
    : IQueryHandler<ListPublicAgenciesQuery, PagedResult<PublicAgencyDto>>
{
    public async Task<Result<PagedResult<PublicAgencyDto>>> Handle(
        ListPublicAgenciesQuery request,
        CancellationToken cancellationToken)
    {
        var page = Math.Max(1, request.Page);
        var pageSize = Math.Clamp(request.PageSize, 1, 50);
        var (items, total) = await agencies.SearchPublicAsync(
            request.City,
            request.Province,
            request.Q,
            (page - 1) * pageSize,
            pageSize,
            cancellationToken);

        var summaries = await reviewSummaries.GetSummariesAsync(
            "Agency",
            items.Select(agency => agency.Id).ToArray(),
            cancellationToken);

        return Result<PagedResult<PublicAgencyDto>>.Success(
            new PagedResult<PublicAgencyDto>(
                items.Select(agency => ToPublicDto(agency, summaries)).ToArray(),
                page,
                pageSize,
                total));
    }

    internal static PublicAgencyDto ToPublicDto(
        Agency agency,
        IReadOnlyDictionary<Guid, ReviewSummary> summaries)
    {
        summaries.TryGetValue(agency.Id, out var summary);
        return new PublicAgencyDto(
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
            agency.LicenseFileUrl,
            summary?.AverageRating,
            summary?.ReviewCount ?? 0);
    }
}

internal sealed class GetPublicAgencyQueryHandler(
    IAgencyRepository agencies,
    IReviewSummaryReadService reviewSummaries)
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

        var summaries = await reviewSummaries.GetSummariesAsync(
            "Agency",
            [agency.Id],
            cancellationToken);
        return Result<PublicAgencyDto>.Success(
            ListPublicAgenciesQueryHandler.ToPublicDto(agency, summaries));
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
