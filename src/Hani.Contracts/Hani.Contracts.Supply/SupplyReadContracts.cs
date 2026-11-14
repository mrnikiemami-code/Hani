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
/// Accommodation option snapshot.
/// </summary>
public sealed record AccommodationOptionSnapshot(
    Guid OptionId,
    string HotelName,
    int HotelStars,
    string RoomType,
    string MealPlan,
    decimal Amount,
    string Currency,
    string? Description);

/// <summary>
/// Flight option snapshot.
/// </summary>
public sealed record FlightOptionSnapshot(
    Guid OptionId,
    string Direction,
    string Airline,
    string FlightNumber,
    string DepartureAirport,
    string ArrivalAirport,
    TimeOnly DepartureTime,
    TimeOnly ArrivalTime,
    int DurationMinutes,
    string Cabin,
    string BaggageAllowance);

/// <summary>
/// Tax and duty rule snapshot for an offer currency.
/// </summary>
public sealed record OfferTaxRuleSnapshot(
    string Currency,
    string VatStatus,
    decimal VatRate,
    string DutyStatus,
    decimal DutyRate,
    string? ExemptionReason);

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
    IReadOnlyList<DepartureSnapshot> Departures,
    IReadOnlyList<AccommodationOptionSnapshot> AccommodationOptions,
    IReadOnlyList<FlightOptionSnapshot> FlightOptions,
    IReadOnlyList<OfferTaxRuleSnapshot> TaxRules,
    string BookingMode = "Online",
    string CollectionMode = "Online");

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

/// <summary>
/// Tax and duty rule snapshot for a departure currency.
/// </summary>
public sealed record DepartureTaxRuleSnapshot(
    string Currency,
    string VatStatus,
    decimal VatRate,
    string DutyStatus,
    decimal DutyRate,
    string? ExemptionReason);

/// <summary>
/// Departure pricing snapshot used when creating a quote.
/// </summary>
public sealed record DeparturePricingSnapshot(
    Guid DepartureId,
    Guid AgencyOfferId,
    Guid AgencyId,
    int Capacity,
    int SeatsLeft,
    IReadOnlyList<DeparturePriceSnapshot> Prices,
    IReadOnlyList<DepartureTaxRuleSnapshot> TaxRules,
    IReadOnlyList<AccommodationOptionSnapshot> AccommodationOptions,
    string BookingMode = "Online",
    string CollectionMode = "Online");

/// <summary>
/// Read-side contract for departure pricing.
/// </summary>
public interface IDeparturePricingService
{
    /// <summary>
    /// Returns pricing and capacity for a departure, or <c>null</c>.
    /// </summary>
    Task<DeparturePricingSnapshot?> GetAsync(
        Guid departureId,
        CancellationToken cancellationToken);
}

/// <summary>
/// Write-side contract for reserving and releasing departure seats.
/// </summary>
public interface IInventoryReservationService
{
    /// <summary>
    /// Atomically reserves seats; returns <c>false</c> when capacity is insufficient.
    /// </summary>
    Task<bool> TryReserveAsync(
        Guid departureId,
        int seats,
        CancellationToken cancellationToken);

    /// <summary>
    /// Releases previously reserved seats.
    /// </summary>
    Task ReleaseAsync(
        Guid departureId,
        int seats,
        CancellationToken cancellationToken);
}
