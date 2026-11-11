namespace Hani.Contracts.Supply;

/// <summary>
/// Price snapshot for one room/passenger type.
/// </summary>
public sealed record DeparturePriceSnapshot(
    string RoomType,
    decimal Amount,
    string Currency);

/// <summary>
/// Departure snapshot exposed to marketplace reads.
/// </summary>
public sealed record DepartureSnapshot(
    Guid Id,
    DateOnly StartDate,
    DateOnly EndDate,
    int Capacity,
    int SeatsLeft,
    string Status,
    IReadOnlyList<DeparturePriceSnapshot> Prices);

/// <summary>
/// Approved agency offer snapshot for one shared product.
/// </summary>
public sealed record OfferSnapshot(
    Guid OfferId,
    Guid AgencyId,
    Guid TourProductId,
    string ExternalId,
    string Title,
    decimal BasePrice,
    string Currency,
    string Status,
    IReadOnlyList<DepartureSnapshot> Departures);

/// <summary>
/// Read-side contract exposed by the Supply module.
/// </summary>
public interface IOfferReadService
{
    /// <summary>
    /// Returns approved offers (with open departures) for a tour product.
    /// </summary>
    Task<IReadOnlyList<OfferSnapshot>> GetApprovedOffersAsync(
        Guid tourProductId,
        CancellationToken cancellationToken);
}
