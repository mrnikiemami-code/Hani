namespace Hani.Modules.Supply.Application.Queries.GetAgencyOfferById;

/// <summary>
/// Agency offer read model returned to suppliers.
/// </summary>
public sealed record AgencyOfferDto(
    Guid Id,
    Guid AgencyId,
    string ExternalId,
    Guid TourProductId,
    string Title,
    decimal BasePrice,
    string Currency,
    string Status,
    string? RejectionReason,
    DateTimeOffset UpdatedAt);
