using Hani.BuildingBlocks.Application;
using Hani.Modules.Identity.Application.Queries.GetAgencyById;
using Hani.Modules.Identity.Domain.Agencies;

namespace Hani.Modules.Identity.Application.Commands.AgencyOnboarding;

/// <summary>
/// Command that creates a pending agency onboarding request for a user.
/// </summary>
public sealed record CreateAgencyOnboardingCommand(
    Guid UserId,
    string Slug,
    string Name,
    string LicenseNo,
    string City,
    string? Website,
    string? ContactEmail,
    string? ContactPhone,
    string? About,
    IReadOnlyList<AgencyDocumentInput> Documents,
    string? LicenseType = null,
    DateOnly? LicenseIssuedAt = null,
    string? ManagerName = null,
    int? StaffCount = null,
    string? Address = null,
    string? Province = null,
    string? LicenseFileUrl = null) : ICommand<AgencyDto>;

/// <summary>
/// Query that returns the current user's agency onboarding state.
/// </summary>
public sealed record GetMyAgencyQuery(Guid UserId) : IQuery<AgencyDto>;

/// <summary>
/// Query that lists agencies for the internal admin panel.
/// </summary>
public sealed record ListAgenciesQuery(string? Status) : IQuery<IReadOnlyList<AgencyDto>>;

/// <summary>
/// Query that returns a public approved agency profile.
/// </summary>
public sealed record GetPublicAgencyQuery(string Slug) : IQuery<PublicAgencyDto>;

/// <summary>
/// Command that approves a pending agency.
/// </summary>
public sealed record ApproveAgencyCommand(Guid AgencyId) : ICommand<bool>;

/// <summary>
/// Command that rejects a pending agency.
/// </summary>
public sealed record RejectAgencyCommand(Guid AgencyId, string Reason) : ICommand<bool>;

/// <summary>
/// Public agency profile read model without private onboarding fields.
/// </summary>
public sealed record PublicAgencyDto(
    Guid Id,
    string Slug,
    string Name,
    string City,
    string? Website,
    string? ContactEmail,
    string? ContactPhone,
    string? About,
    DateTimeOffset MemberSince,
    string LicenseNo,
    string? LicenseType,
    DateOnly? LicenseIssuedAt,
    string? ManagerName,
    int? StaffCount,
    string? Address,
    string? Province,
    string? LicenseFileUrl);
