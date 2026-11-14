using FluentValidation;

namespace Hani.Modules.Booking.Application.Commands.CancelOrder;

/// <summary>
/// Validation rules for order cancellation.
/// </summary>
public sealed class CancelOrderCommandValidator : AbstractValidator<CancelOrderCommand>
{
    /// <summary>
    /// Creates validation rules.
    /// </summary>
    public CancelOrderCommandValidator()
    {
        RuleFor(command => command.OrderId).NotEmpty().WithErrorCode("HANI-BOOKING-2510");
        RuleFor(command => command.Reason).NotEmpty().MaximumLength(500).WithErrorCode("HANI-BOOKING-2511");
    }
}
