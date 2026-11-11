namespace Hani.Modules.Identity.Application.Queries.GetAgencyById;

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
    DateTimeOffset CreatedAt);
