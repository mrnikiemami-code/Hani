using FluentValidation;

namespace Hani.Modules.Payments.Application.Commands.CreatePaymentIntent;

/// <summary>
/// Validation rules for creating a payment intent.
/// </summary>
public sealed class CreatePaymentIntentCommandValidator : AbstractValidator<CreatePaymentIntentCommand>
{
    /// <summary>
    /// Creates validation rules for the order id.
    /// </summary>
    public CreatePaymentIntentCommandValidator()
    {
        RuleFor(command => command.OrderId)
            .NotEmpty()
            .WithErrorCode("HANI-PAYMENT-1004");

        RuleFor(command => command.Currency)
            .Length(3)
            .When(command => !string.IsNullOrWhiteSpace(command.Currency))
            .WithErrorCode("HANI-PAYMENT-1009");
    }
}
