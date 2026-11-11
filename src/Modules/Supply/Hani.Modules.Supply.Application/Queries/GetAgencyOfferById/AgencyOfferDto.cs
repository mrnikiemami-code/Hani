namespace Hani.Modules.Supply.Application.Queries.GetAgencyOfferById;

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
