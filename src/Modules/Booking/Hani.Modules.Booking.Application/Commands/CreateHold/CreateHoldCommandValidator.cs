using FluentValidation;

namespace Hani.Modules.Booking.Application.Commands.CreateHold;

/// <summary>
/// Validation rules for creating a hold.
/// </summary>
public sealed class CreateHoldCommandValidator : AbstractValidator<CreateHoldCommand>
{
    /// <summary>
    /// Creates validation rules for the quote id.
    /// </summary>
    public CreateHoldCommandValidator()
    {
        RuleFor(command => command.QuoteId)
            .NotEmpty()
            .WithErrorCode("HANI-BOOKING-2104");
    }
}
