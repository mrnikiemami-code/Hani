using FluentValidation;
using Hani.Modules.Booking.Domain.Orders;

namespace Hani.Modules.Booking.Application.Commands.CreateOrder;

/// <summary>
/// Validation rules for creating an order from a hold.
/// </summary>
public sealed class CreateOrderCommandValidator : AbstractValidator<CreateOrderCommand>
{
    /// <summary>
    /// Creates validation rules for hold, contact, and travelers.
    /// </summary>
    public CreateOrderCommandValidator()
    {
        RuleFor(command => command.HoldId)
            .NotEmpty()
            .WithErrorCode("HANI-BOOKING-2407");

        RuleFor(command => command.ContactEmail)
            .NotEmpty()
            .EmailAddress()
            .MaximumLength(320)
            .WithErrorCode("HANI-BOOKING-2408");

        RuleFor(command => command.ContactPhone)
            .MaximumLength(32)
            .WithErrorCode("HANI-BOOKING-2409");

        RuleFor(command => command.Travelers)
            .NotNull()
            .NotEmpty()
            .WithErrorCode("HANI-BOOKING-2410");

        RuleForEach(command => command.Travelers)
            .ChildRules(traveler =>
            {
                traveler.RuleFor(item => item.FullName)
                    .NotEmpty()
                    .MaximumLength(200)
                    .WithErrorCode("HANI-BOOKING-2411");

                traveler.RuleFor(item => item.Type)
                    .NotEmpty()
                    .Must(type => Enum.TryParse<TravelerType>(type, ignoreCase: true, out _))
                    .WithErrorCode("HANI-BOOKING-2412");
            });
    }
}
