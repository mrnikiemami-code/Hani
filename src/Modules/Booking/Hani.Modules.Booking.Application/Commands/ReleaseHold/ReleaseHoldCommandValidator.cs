using FluentValidation;

namespace Hani.Modules.Booking.Application.Commands.ReleaseHold;

/// <summary>
/// Validation rules for releasing a hold.
/// </summary>
public sealed class ReleaseHoldCommandValidator : AbstractValidator<ReleaseHoldCommand>
{
    /// <summary>
    /// Creates validation rules for the hold id.
    /// </summary>
    public ReleaseHoldCommandValidator()
    {
        RuleFor(command => command.HoldId)
            .NotEmpty()
            .WithErrorCode("HANI-BOOKING-2202");
    }
}
