using FluentValidation;

namespace Hani.Modules.Payments.Application.Commands.RecordOfflinePayment;

/// <summary>
/// Validation rules for offline payment recording.
/// </summary>
public sealed class RecordOfflinePaymentCommandValidator
    : AbstractValidator<RecordOfflinePaymentCommand>
{
    /// <summary>
    /// Creates validation rules.
    /// </summary>
    public RecordOfflinePaymentCommandValidator()
    {
        RuleFor(command => command.OrderId).NotEmpty().WithErrorCode("HANI-PAYMENT-2010");
        RuleFor(command => command.Amount).GreaterThan(0).WithErrorCode("HANI-PAYMENT-2011");
        RuleFor(command => command.Currency).NotEmpty().Length(3).WithErrorCode("HANI-PAYMENT-2012");
        RuleFor(command => command.RecordedBy).NotEmpty().MaximumLength(200)
            .WithErrorCode("HANI-PAYMENT-2013");
    }
}
