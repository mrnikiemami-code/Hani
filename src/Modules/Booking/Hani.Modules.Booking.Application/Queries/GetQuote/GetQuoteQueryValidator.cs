using FluentValidation;

namespace Hani.Modules.Booking.Application.Queries.GetQuote;

/// <summary>
/// Validation rules for reading a quote.
/// </summary>
public sealed class GetQuoteQueryValidator : AbstractValidator<GetQuoteQuery>
{
    /// <summary>
    /// Creates validation rules for the quote id.
    /// </summary>
    public GetQuoteQueryValidator()
    {
        RuleFor(query => query.QuoteId)
            .NotEmpty()
            .WithErrorCode("HANI-BOOKING-2302");
    }
}
