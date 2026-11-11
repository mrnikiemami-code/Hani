using FluentValidation;

namespace Hani.Modules.Booking.Application.Commands.CreateQuote;

/// <summary>
/// Validation rules for creating a quote.
/// </summary>
public sealed class CreateQuoteCommandValidator : AbstractValidator<CreateQuoteCommand>
{
    /// <summary>
    /// Creates validation rules for departure, room type, and passengers.
    /// </summary>
    public CreateQuoteCommandValidator()
    {
        RuleFor(command => command.DepartureId)
            .NotEmpty()
            .WithErrorCode("HANI-BOOKING-2004");

        RuleFor(command => command.RoomType)
            .NotEmpty()
            .Must(roomType => roomType is
                "Double" or "Single" or "Triple" or "ChildWithBed" or "ChildWithoutBed" or "Infant")
            .WithErrorCode("HANI-BOOKING-2005");

        RuleFor(command => command.Adults)
            .InclusiveBetween(1, 10)
            .WithErrorCode("HANI-BOOKING-2006");

        RuleFor(command => command.Children)
            .InclusiveBetween(0, 10)
            .WithErrorCode("HANI-BOOKING-2007");

        RuleFor(command => command.Infants)
            .InclusiveBetween(0, 10)
            .WithErrorCode("HANI-BOOKING-2008");
    }
}
