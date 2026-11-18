using Hani.BuildingBlocks.Application;

namespace Hani.Modules.Admin.Application;

/// <summary>Admin supplier offer row.</summary>
public sealed record AdminSupplierOfferDto(
    Guid Id,
    Guid AgencyId,
    string AgencyName,
    string ExternalId,
    string Title,
    string Status,
    string BookingMode,
    string CollectionMode,
    decimal Price,
    string Currency,
    DateTimeOffset CreatedAt,
    DateTimeOffset UpdatedAt);

/// <summary>Paged supplier offers.</summary>
public sealed record AdminSupplierOfferPageDto(
    IReadOnlyList<AdminSupplierOfferDto> Items,
    int Page,
    int PageSize,
    int Total);

/// <summary>Admin supplier offer moderation service.</summary>
public interface IAdminSupplierService
{
    Task<AdminSupplierOfferPageDto> ListOffersAsync(
        int page,
        int pageSize,
        string? q,
        string? status,
        CancellationToken cancellationToken);
    Task<Result<bool>> ApproveAsync(
        Guid offerId,
        CancellationToken cancellationToken);
    Task<Result<bool>> RejectAsync(
        Guid offerId,
        string reason,
        CancellationToken cancellationToken);
}
