using Hani.BuildingBlocks.Application;
using Hani.BuildingBlocks.Domain;
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
        var selected = departure.Prices.FirstOrDefault(price =>
            string.Equals(price.RoomType, roomType, StringComparison.OrdinalIgnoreCase));

        if (selected is null)
        {
            return Result<QuoteDto>.Failure(
                Error.Validation("HANI-BOOKING-2002", "Room type is not available for this departure."));
        }

        var childPrice = departure.Prices
            .FirstOrDefault(price => price.RoomType == "ChildWithBed")
            ?.Amount
            ?? departure.Prices
                .FirstOrDefault(price => price.RoomType == "ChildWithoutBed")
                ?.Amount
            ?? 0m;

        var infantPrice = departure.Prices
            .FirstOrDefault(price => price.RoomType == "Infant")
            ?.Amount
            ?? 0m;

        var seats = request.Adults + request.Children;

        if (seats < 1 || seats > departure.SeatsLeft)
        {
            return Result<QuoteDto>.Failure(
                Error.Conflict("HANI-BOOKING-2003", "Not enough seats for the requested passengers."));
        }

        var total = (request.Adults * selected.Amount) +
                    (request.Children * childPrice) +
                    (request.Infants * infantPrice);

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
            selected.Amount,
            total,
            selected.Currency);

        await quotes.AddAsync(quote, cancellationToken);

        return Result<QuoteDto>.Success(Map(quote));
    }

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
            quote.ExpiresAt);
}
