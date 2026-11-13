using Hani.Contracts.Supply;
using Hani.Modules.Supply.Domain.Departures;
using Hani.Modules.Supply.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Hani.Modules.Supply.Infrastructure.ReadServices;

internal sealed class DeparturePricingService(SupplyDbContext dbContext)
    : IDeparturePricingService
{
    public async Task<DeparturePricingSnapshot?> GetAsync(
        Guid departureId,
        CancellationToken cancellationToken)
    {
        var data = await (from departure in dbContext.TourDepartures.AsNoTracking()
                          join offer in dbContext.AgencyOffers
                              .AsNoTracking()
                              .AsSplitQuery()
                              .Include(item => item.TaxRules)
                              .Include(item => item.AccommodationOptions)
                              on departure.AgencyOfferId equals offer.Id
                          where departure.Id == departureId
                          select new { departure, offer })
            .FirstOrDefaultAsync(cancellationToken);

        if (data is null)
        {
            return null;
        }

        return new DeparturePricingSnapshot(
            data.departure.Id,
            data.departure.AgencyOfferId,
            data.offer.AgencyId,
            data.departure.Capacity,
            data.departure.SeatsLeft,
            data.departure.Prices
                .OrderBy(price => price.RoomType)
                .Select(price => new DeparturePriceSnapshot(
                    price.RoomType.ToString(),
                    price.Amount,
                    price.Currency))
                .ToArray(),
            data.offer.TaxRules
                .Select(rule => new DepartureTaxRuleSnapshot(
                    rule.Currency,
                    rule.VatStatus.ToString(),
                    rule.VatRate,
                    rule.DutyStatus.ToString(),
                    rule.DutyRate,
                    rule.ExemptionReason))
                .ToArray(),
            data.offer.AccommodationOptions
                .Select(option => new AccommodationOptionSnapshot(
                    option.Id,
                    option.HotelName,
                    option.HotelStars,
                    option.RoomType.ToString(),
                    option.MealPlan.ToString(),
                    option.Amount,
                    option.Currency,
                    option.Description))
                .ToArray());
    }
}

internal sealed class InventoryReservationService(SupplyDbContext dbContext)
    : IInventoryReservationService
{
    public async Task<bool> TryReserveAsync(
        Guid departureId,
        int seats,
        CancellationToken cancellationToken)
    {
        if (seats <= 0)
        {
            return false;
        }

        var affected = await dbContext.TourDepartures
            .Where(departure =>
                departure.Id == departureId &&
                departure.Status == DepartureStatus.Open &&
                departure.SeatsLeft >= seats)
            .ExecuteUpdateAsync(
                setters => setters.SetProperty(
                    departure => departure.SeatsLeft,
                    departure => departure.SeatsLeft - seats),
                cancellationToken);

        if (affected == 0)
        {
            return false;
        }

        await dbContext.TourDepartures
            .Where(departure =>
                departure.Id == departureId &&
                departure.SeatsLeft == 0 &&
                departure.Status == DepartureStatus.Open)
            .ExecuteUpdateAsync(
                setters => setters.SetProperty(
                    departure => departure.Status,
                    DepartureStatus.SoldOut),
                cancellationToken);

        return true;
    }

    public async Task ReleaseAsync(
        Guid departureId,
        int seats,
        CancellationToken cancellationToken)
    {
        if (seats <= 0)
        {
            return;
        }

        var departure = await dbContext.TourDepartures
            .FirstOrDefaultAsync(item => item.Id == departureId, cancellationToken);

        if (departure is null ||
            departure.Status is DepartureStatus.Closed or DepartureStatus.Cancelled)
        {
            return;
        }

        departure.Release(seats);
        await dbContext.SaveChangesAsync(cancellationToken);
    }
}
