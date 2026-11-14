using Hani.BuildingBlocks.Application;
using Hani.Modules.Marketplace.Application.Queries.SearchProducts;

namespace Hani.Modules.Marketplace.Application.Queries.GetProductComparison;

/// <summary>
/// Query that returns one product with all approved agency offers for comparison.
/// </summary>
public sealed record GetProductComparisonQuery(Guid ProductId, string? Locale)
    : IQuery<ProductComparisonDto>;

/// <summary>
/// Product comparison read model.
/// </summary>
public sealed record ProductComparisonDto(
    Guid ProductId,
    string Slug,
    string Title,
    string Summary,
    string Description,
    int DurationDays,
    IReadOnlyList<OfferComparisonDto> Offers);

/// <summary>
/// One agency offer in the comparison table.
/// </summary>
public sealed record OfferComparisonDto(
    Guid OfferId,
    Guid AgencyId,
    string AgencyName,
    string Title,
    decimal MinPrice,
    string Currency,
    IReadOnlyList<CurrencyPriceDto> MinPrices,
    IReadOnlyList<AccommodationOptionComparisonDto> AccommodationOptions,
    IReadOnlyList<FlightOptionComparisonDto> FlightOptions,
    IReadOnlyList<TaxRuleComparisonDto> TaxRules,
    IReadOnlyList<DepartureComparisonDto> Departures,
    string BookingMode,
    string CollectionMode,
    InstallmentTermsComparisonDto? InstallmentTerms);

/// <summary>
/// Installment terms shown in offer comparison.
/// </summary>
public sealed record InstallmentTermsComparisonDto(
    bool IsEnabled,
    decimal MinDownPaymentRate,
    int MaxMonths,
    decimal MonthlyFeeRate,
    bool RequiresCheque);

/// <summary>
/// Accommodation option shown on a tour detail page.
/// </summary>
public sealed record AccommodationOptionComparisonDto(
    Guid OptionId,
    string HotelName,
    int HotelStars,
    string RoomType,
    string MealPlan,
    decimal Amount,
    string Currency,
    string? Description);

/// <summary>
/// Flight option shown on a tour detail page.
/// </summary>
public sealed record FlightOptionComparisonDto(
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
/// Tax rule shown on a tour detail page.
/// </summary>
public sealed record TaxRuleComparisonDto(
    string Currency,
    string VatStatus,
    decimal VatRate,
    string DutyStatus,
    decimal DutyRate,
    string? ExemptionReason);

/// <summary>
/// One departure option inside an offer.
/// </summary>
public sealed record DepartureComparisonDto(
    Guid Id,
    DateOnly StartDate,
    DateOnly EndDate,
    int SeatsLeft,
    string Status,
    IReadOnlyList<DeparturePriceComparisonDto> Prices);

/// <summary>
/// Price by room/passenger type.
/// </summary>
public sealed record DeparturePriceComparisonDto(
    string RoomType,
    decimal Amount,
    string Currency);
