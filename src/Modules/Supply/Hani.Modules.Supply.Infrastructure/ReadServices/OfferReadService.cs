using Hani.Contracts.Supply;
using Hani.Modules.Supply.Domain.AgencyOffers;
using Hani.Modules.Supply.Domain.Departures;
using Hani.Modules.Supply.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Hani.Modules.Supply.Infrastructure.ReadServices;

internal sealed class OfferReadService(SupplyDbContext dbContext)
    : IOfferReadService, IHotelOfferReadService
{
    public async Task<IReadOnlyList<OfferSnapshot>> GetApprovedOffersAsync(
        Guid tourProductId,
        CancellationToken cancellationToken)
    {
        var offers = await dbContext.AgencyOffers
            .AsNoTracking()
            .AsSplitQuery()
            .Include(offer => offer.AccommodationOptions)
            .Include(offer => offer.FlightOptions)
            .Include(offer => offer.TaxRules)
            .Where(offer =>
                offer.TourProductId == tourProductId &&
                offer.Status == AgencyOfferStatus.Approved)
            .ToArrayAsync(cancellationToken);

        return await MapAsync(offers, cancellationToken);
    }

    public async Task<IReadOnlyList<OfferSnapshot>> GetApprovedOffersByHotelAsync(
        Guid hotelId,
        CancellationToken cancellationToken)
    {
        var offers = await dbContext.AgencyOffers
            .AsNoTracking()
            .AsSplitQuery()
            .Include(offer => offer.AccommodationOptions)
            .Include(offer => offer.FlightOptions)
            .Include(offer => offer.TaxRules)
            .Where(offer =>
                offer.Status == AgencyOfferStatus.Approved &&
                offer.AccommodationOptions.Any(option => option.HotelId == hotelId))
            .ToArrayAsync(cancellationToken);

        return await MapAsync(offers, cancellationToken);
    }

    private async Task<IReadOnlyList<OfferSnapshot>> MapAsync(
        AgencyOffer[] offers,
        CancellationToken cancellationToken)
    {
        if (offers.Length == 0)
        {
            return [];
        }

        var sortedOffers = offers.OrderBy(offer => offer.BasePrice.Amount).ToArray();
        var offerIds = sortedOffers.Select(offer => offer.Id).ToArray();
        var today = DateOnly.FromDateTime(DateTime.UtcNow);

        var departures = await dbContext.TourDepartures
            .AsNoTracking()
            .Where(departure =>
                offerIds.Contains(departure.AgencyOfferId) &&
                departure.Status == DepartureStatus.Open &&
                departure.EndDate >= today)
            .OrderBy(departure => departure.StartDate)
            .ToArrayAsync(cancellationToken);

        var departuresByOffer = departures
            .GroupBy(departure => departure.AgencyOfferId)
            .ToDictionary(group => group.Key, group => group.ToArray());

        return sortedOffers
            .Select(offer => new OfferSnapshot(
                offer.Id,
                offer.AgencyId,
                offer.TourProductId,
                offer.ExternalId,
                offer.Title,
                offer.BasePrice.Amount,
                offer.BasePrice.Currency,
                offer.Status.ToString(),
                departuresByOffer.TryGetValue(offer.Id, out var offerDepartures)
                    ? offerDepartures.Select(MapDeparture).ToArray()
                    : [],
                offer.AccommodationOptions
                    .Select(option => new AccommodationOptionSnapshot(
                        option.Id,
                        option.HotelName,
                        option.HotelStars,
                        option.RoomType.ToString(),
                        option.MealPlan.ToString(),
                        option.Amount,
                        option.Currency,
                        option.Description,
                        option.HotelId))
                    .ToArray(),
                offer.FlightOptions
                    .Select(option => new FlightOptionSnapshot(
                        option.Id,
                        option.Direction.ToString(),
                        option.Airline,
                        option.FlightNumber,
                        option.DepartureAirport,
                        option.ArrivalAirport,
                        option.DepartureTime,
                        option.ArrivalTime,
                        option.DurationMinutes,
                        option.Cabin,
                        option.BaggageAllowance))
                    .ToArray(),
                offer.TaxRules
                    .Select(rule => new OfferTaxRuleSnapshot(
                        rule.Currency,
                        rule.VatStatus.ToString(),
                        rule.VatRate,
                        rule.DutyStatus.ToString(),
                        rule.DutyRate,
                        rule.ExemptionReason))
                    .ToArray(),
                offer.BookingMode.ToString(),
                offer.CollectionMode.ToString(),
                offer.SellerOfRecord.ToString(),
                offer.InvoiceIssuer.ToString(),
                MapInstallmentTerms(offer.InstallmentTerms)))
            .ToArray();
    }

    private static InstallmentTermsSnapshot? MapInstallmentTerms(InstallmentTerms terms)
        => terms.IsEnabled
            ? new InstallmentTermsSnapshot(
                terms.IsEnabled,
                terms.MinDownPaymentRate,
                terms.MaxMonths,
                terms.MonthlyFeeRate,
                terms.RequiresCheque)
            : null;

    private static DepartureSnapshot MapDeparture(TourDeparture departure)
        => new(
            departure.Id,
            departure.StartDate,
            departure.EndDate,
            departure.Capacity,
            departure.SeatsLeft,
            departure.Status.ToString(),
            departure.Prices
                .OrderBy(price => price.RoomType)
                .Select(price => new DeparturePriceSnapshot(
                    price.RoomType.ToString(),
                    price.Amount,
                    price.Currency))
                .ToArray());
}
