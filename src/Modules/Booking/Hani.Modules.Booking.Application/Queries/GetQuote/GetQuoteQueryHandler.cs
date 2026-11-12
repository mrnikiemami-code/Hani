using Hani.BuildingBlocks.Application;
using Hani.Modules.Booking.Application.Abstractions;
using Hani.Modules.Booking.Application.Commands.CreateQuote;
using Hani.Modules.Booking.Domain.Quotes;

namespace Hani.Modules.Booking.Application.Queries.GetQuote;

internal sealed class GetQuoteQueryHandler(IQuoteRepository quotes)
    : IQueryHandler<GetQuoteQuery, QuoteDto>
{
    public async Task<Result<QuoteDto>> Handle(
        GetQuoteQuery request,
        CancellationToken cancellationToken)
    {
        var quote = await quotes.GetByIdAsync(request.QuoteId, cancellationToken);

        if (quote is null)
        {
            return Result<QuoteDto>.Failure(
                Error.NotFound("HANI-BOOKING-2301", "Quote was not found."));
        }

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
                .ToArray());
}
