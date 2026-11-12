using Hani.BuildingBlocks.Application;
using Hani.BuildingBlocks.Domain.Pricing;
using Hani.Modules.Supply.Domain.AgencyOffers;
using Hani.Modules.Supply.Domain.Departures;

namespace Hani.Modules.Supply.Application.Commands.CreateAgencyOffer;

/// <summary>
/// Tax/duty rule input for one offer currency.
/// </summary>
public sealed record TaxRuleInput(
    string Currency,
    TaxStatus VatStatus,
    decimal VatRate,
    TaxStatus DutyStatus,
    decimal DutyRate,
    string? ExemptionReason = null);

/// <summary>
/// Accommodation option input.
/// </summary>
public sealed record AccommodationOptionInput(
    string HotelName,
    int HotelStars,
    RoomType RoomType,
    MealPlanType MealPlan,
    decimal Amount,
    string Currency,
    string? Description = null);

/// <summary>
/// Flight option input.
/// </summary>
public sealed record FlightOptionInput(
    FlightDirection Direction,
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
/// Command that creates an agency offer.
/// </summary>
public sealed record CreateAgencyOfferCommand(
    Guid AgencyId,
    Guid TourProductId,
    string Title,
    decimal BasePrice,
    string Currency,
    IReadOnlyList<AccommodationOptionInput>? AccommodationOptions = null,
    IReadOnlyList<FlightOptionInput>? FlightOptions = null,
    IReadOnlyList<TaxRuleInput>? TaxRules = null) : ICommand<Guid>;
