using FluentValidation;

namespace Hani.Modules.Payments.Application.Commands.HandlePaymentWebhook;

/// <summary>
/// Validation rules for provider webhooks.
/// </summary>
public sealed class HandlePaymentWebhookCommandValidator
    : AbstractValidator<HandlePaymentWebhookCommand>
{
    /// <summary>
    /// Creates validation rules for payload and signature fields.
    /// </summary>
    public HandlePaymentWebhookCommandValidator()
    {
        RuleFor(command => command.Provider)
            .NotEmpty()
            .WithErrorCode("HANI-PAYMENT-1205");

        RuleFor(command => command.Payload)
            .NotEmpty()
            .WithErrorCode("HANI-PAYMENT-1206");

        RuleFor(command => command.Signature)
            .NotEmpty()
            .WithErrorCode("HANI-PAYMENT-1207");

        RuleFor(command => command.Timestamp)
            .NotEmpty()
            .WithErrorCode("HANI-PAYMENT-1208");
    }
}
