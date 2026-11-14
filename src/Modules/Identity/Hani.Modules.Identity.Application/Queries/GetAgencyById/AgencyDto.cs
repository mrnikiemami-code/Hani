namespace Hani.Modules.Identity.Application.Queries.GetAgencyById;

/// <summary>
/// Agency document read model.
/// </summary>
public sealed record AgencyDocumentDto(
    Guid DocumentId,
    string Type,
    string FileUrl,
    string Status,
    DateTimeOffset UploadedAt);

/// <summary>
/// Agency read model returned to clients.
/// </summary>
public sealed record AgencyDto(
    Guid Id,
    string Slug,
    string Name,
    string LicenseNo,
    string City,
    string Status,
    DateOnly? SubscriptionValidUntil,
    DateTimeOffset CreatedAt,
    Guid? OwnerUserId,
    string? Website,
    string? ContactEmail,
    string? ContactPhone,
    string? About,
    DateTimeOffset? SubmittedAt,
    DateTimeOffset? ReviewedAt,
    string? RejectionReason,
    IReadOnlyList<AgencyDocumentDto> Documents,
    string? LicenseType,
    DateOnly? LicenseIssuedAt,
    string? ManagerName,
    int? StaffCount,
    string? Address,
    string? Province,
    string? LicenseFileUrl);
