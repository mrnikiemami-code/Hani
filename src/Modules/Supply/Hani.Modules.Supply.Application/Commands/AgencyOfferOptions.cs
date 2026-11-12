using Hani.BuildingBlocks.Domain;
using Hani.Modules.Supply.Application.Commands.CreateAgencyOffer;
using Hani.Modules.Supply.Domain.AgencyOffers;

namespace Hani.Modules.Supply.Application.Commands;

internal static class AgencyOfferOptions
{
    public static IReadOnlyCollection<OfferAccommodationOptionDetails>? MapAccommodation(
        IReadOnlyList<AccommodationOptionInput>? options)
        => options?
            .Select(option => new OfferAccommodationOptionDetails(
                option.HotelName,
                option.HotelStars,
                option.RoomType,
                option.MealPlan,
                Money.Of(option.Amount, option.Currency),
                option.Description))
            .ToArray();

    public static IReadOnlyCollection<OfferFlightOptionDetails>? MapFlights(
        IReadOnlyList<FlightOptionInput>? options)
        => options?
            .Select(option => new OfferFlightOptionDetails(
                option.Direction,
                option.Airline,
                option.FlightNumber,
                option.DepartureAirport,
                option.ArrivalAirport,
                option.DepartureTime,
                option.ArrivalTime,
                option.DurationMinutes,
                option.Cabin,
                option.BaggageAllowance))
            .ToArray();

    public static IReadOnlyCollection<OfferTaxRuleDetails>? MapTaxRules(
        IReadOnlyList<TaxRuleInput>? rules)
        => rules?
            .Select(rule => new OfferTaxRuleDetails(
                rule.Currency,
                rule.VatStatus,
                rule.VatRate,
                rule.DutyStatus,
                rule.DutyRate,
                rule.ExemptionReason))
            .ToArray();
}
