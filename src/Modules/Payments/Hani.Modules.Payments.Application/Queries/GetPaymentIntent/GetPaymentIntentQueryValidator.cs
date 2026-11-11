using FluentValidation;

namespace Hani.Modules.Payments.Application.Queries.GetPaymentIntent;

/// <summary>
/// Validation rules for reading a payment intent.
/// </summary>
public sealed class GetPaymentIntentQueryValidator : AbstractValidator<GetPaymentIntentQuery>
{
    /// <summary>
    /// Creates validation rules for the payment intent id.
    /// </summary>
    public GetPaymentIntentQueryValidator()
    {
        RuleFor(query => query.PaymentIntentId)
            .NotEmpty()
            .WithErrorCode("HANI-PAYMENT-1102");
    }
}
