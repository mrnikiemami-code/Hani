using Hani.BuildingBlocks.Application;
using Hani.BuildingBlocks.Domain;
using Hani.BuildingBlocks.Domain.Pricing;
using Hani.Contracts.Supply;
using Hani.Modules.Booking.Application.Abstractions;
using Hani.Modules.Booking.Domain.Quotes;

namespace Hani.Modules.Booking.Application.Commands.CreateQuote;

internal sealed class CreateQuoteCommandHandler(
    IDeparturePricingService pricing,
    IQuoteRepository quotes,
    IIdGenerator ids)
    : ICommandHandler<CreateQuoteCommand, QuoteDto>
{
    public async Task<Result<QuoteDto>> Handle(
        CreateQuoteCommand request,
        CancellationToken cancellationToken)
    {
        var departure = await pricing.GetAsync(request.DepartureId, cancellationToken);

        if (departure is null)
        {
            return Result<QuoteDto>.Failure(
                Error.NotFound("HANI-BOOKING-2001", "Departure was not found."));
        }

        var roomType = request.RoomType.Trim();
        var selectedPrices = departure.Prices
            .Where(price => string.Equals(price.RoomType, roomType, StringComparison.OrdinalIgnoreCase))
            .OrderBy(price => price.Currency, StringComparer.OrdinalIgnoreCase)
            .ToArray();

        if (selectedPrices.Length == 0)
        {
            return Result<QuoteDto>.Failure(
                Error.Validation("HANI-BOOKING-2002", "Room type is not available for this departure."));
        }

        AccommodationOptionSnapshot? selectedAccommodation = null;

        if (request.AccommodationOptionId is { } accommodationOptionId)
        {
            selectedAccommodation = departure.AccommodationOptions
                .FirstOrDefault(option => option.OptionId == accommodationOptionId);

            if (selectedAccommodation is null)
            {
                return Result<QuoteDto>.Failure(
                    Error.Validation(
                        "HANI-BOOKING-2004",
                        "Accommodation option was not found for this departure."));
            }

            if (!string.Equals(
                    selectedAccommodation.RoomType,
                    roomType,
                    StringComparison.OrdinalIgnoreCase))
            {
                return Result<QuoteDto>.Failure(
                    Error.Validation(
                        "HANI-BOOKING-2005",
                        "Accommodation room type does not match the requested room type."));
            }
        }

        var seats = request.Adults + request.Children;

        if (seats < 1 || seats > departure.SeatsLeft)
        {
            return Result<QuoteDto>.Failure(
                Error.Conflict("HANI-BOOKING-2003", "Not enough seats for the requested passengers."));
        }

        var components = new List<PriceComponentSnapshot>(selectedPrices.Length);
        var primaryCurrency = selectedPrices[0].Currency;
        var primaryAdultPrice = selectedPrices[0].Amount;

        foreach (var selected in selectedPrices)
        {
            var childPrice = FindPrice(departure.Prices, "ChildWithBed", selected.Currency)
                ?? FindPrice(departure.Prices, "ChildWithoutBed", selected.Currency)
                ?? 0m;
            var infantPrice = FindPrice(departure.Prices, "Infant", selected.Currency) ?? 0m;

            var adultPrice = selectedAccommodation is null
                ? selected.Amount
                : FindAccommodationPrice(
                    departure.AccommodationOptions,
                    selectedAccommodation,
                    selected.Currency) ?? selected.Amount;

            if (string.Equals(selected.Currency, primaryCurrency, StringComparison.OrdinalIgnoreCase))
            {
                primaryAdultPrice = adultPrice;
            }

            var baseTotal = (request.Adults * adultPrice) +
                            (request.Children * childPrice) +
                            (request.Infants * infantPrice);

            var rule = departure.TaxRules.FirstOrDefault(item =>
                string.Equals(item.Currency, selected.Currency, StringComparison.OrdinalIgnoreCase));

            var vatStatus = ParseStatus(rule?.VatStatus);
            var dutyStatus = ParseStatus(rule?.DutyStatus);
            var vatRate = vatStatus == TaxStatus.Applicable ? rule?.VatRate ?? 0m : 0m;
            var dutyRate = dutyStatus == TaxStatus.Applicable ? rule?.DutyRate ?? 0m : 0m;
            var vat = Round(baseTotal * vatRate);
            var duty = Round(baseTotal * dutyRate);

            components.Add(new PriceComponentSnapshot(
                PriceComponentKind.Base,
                baseTotal,
                selected.Currency.ToUpperInvariant(),
                new TaxChargeSnapshot(dutyStatus, dutyRate, duty, rule?.ExemptionReason),
                new TaxChargeSnapshot(vatStatus, vatRate, vat, rule?.ExemptionReason),
                baseTotal + duty + vat));
        }

        var primary = components[0];
        var accommodation = selectedAccommodation is null
            ? null
            : new AccommodationSelectionSnapshot(
                selectedAccommodation.OptionId,
                selectedAccommodation.HotelName,
                selectedAccommodation.HotelStars,
                selectedAccommodation.RoomType,
                selectedAccommodation.MealPlan,
                selectedAccommodation.Currency.ToUpperInvariant());
        var snapshot = new PricingSnapshot(components, accommodation);

        var quote = Quote.Create(
            ids,
            departure.DepartureId,
            departure.AgencyOfferId,
            departure.AgencyId,
            roomType,
            request.Adults,
            request.Children,
            request.Infants,
            seats,
            primaryAdultPrice,
            primary.TotalAmount,
            primary.Currency,
            now: null,
            pricing: snapshot);

        await quotes.AddAsync(quote, cancellationToken);

        return Result<QuoteDto>.Success(Map(quote));
    }

    private static decimal? FindPrice(
        IReadOnlyList<DeparturePriceSnapshot> prices,
        string roomType,
        string currency)
        => prices
            .FirstOrDefault(price =>
                string.Equals(price.RoomType, roomType, StringComparison.OrdinalIgnoreCase) &&
                string.Equals(price.Currency, currency, StringComparison.OrdinalIgnoreCase))
            ?.Amount;

    private static decimal? FindAccommodationPrice(
        IReadOnlyList<AccommodationOptionSnapshot> options,
        AccommodationOptionSnapshot selected,
        string currency)
        => options
            .Where(option =>
                string.Equals(option.HotelName, selected.HotelName, StringComparison.OrdinalIgnoreCase) &&
                string.Equals(option.RoomType, selected.RoomType, StringComparison.OrdinalIgnoreCase) &&
                string.Equals(option.MealPlan, selected.MealPlan, StringComparison.OrdinalIgnoreCase) &&
                string.Equals(option.Currency, currency, StringComparison.OrdinalIgnoreCase))
            .Select(option => (decimal?)option.Amount)
            .FirstOrDefault();

    private static TaxStatus ParseStatus(string? value)
        => Enum.TryParse<TaxStatus>(value, ignoreCase: true, out var status)
            ? status
            : TaxStatus.NotApplicable;

    private static decimal Round(decimal amount)
        => Math.Round(amount, 2, MidpointRounding.AwayFromZero);

    private static QuoteDto Map(Quote quote)
        => new(
            quote.Id,
            quote.DepartureId,
            quote.AgencyOfferId,
            quote.AgencyId,
            quote.RoomType,
            quote.Adults,
            quote.Children,
            quote.Infants,
            quote.Seats,
            quote.UnitPrice,
            quote.Total,
            quote.Currency,
            quote.Status.ToString(),
            quote.ExpiresAt,
            quote.EffectivePricing.Components
                .Select(component => new PriceComponentDto(
                    component.Kind.ToString(),
                    component.BaseAmount,
                    component.Currency,
                    component.Duty.Status.ToString(),
                    component.Duty.Rate,
                    component.Duty.Amount,
                    component.Vat.Status.ToString(),
                    component.Vat.Rate,
                    component.Vat.Amount,
                    component.TotalAmount))
                .ToArray(),
            quote.EffectivePricing.Accommodation is { } accommodation
                ? new AccommodationSelectionDto(
                    accommodation.OptionId,
                    accommodation.HotelName,
                    accommodation.HotelStars,
                    accommodation.RoomType,
                    accommodation.MealPlan,
                    accommodation.Currency)
                : null);
}
