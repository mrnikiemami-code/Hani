using FluentValidation;

namespace Hani.Modules.Booking.Application.Commands.Requests;

/// <summary>Validation rules for restaurant reservations.</summary>
public sealed class CreateRestaurantReservationCommandValidator
    : AbstractValidator<CreateRestaurantReservationCommand>
{
    /// <summary>Creates validation rules.</summary>
    public CreateRestaurantReservationCommandValidator()
    {
        RuleFor(command => command.PlaceId).NotEmpty().WithErrorCode("HANI-BOOKING-3510");
        RuleFor(command => command.PartySize).InclusiveBetween(1, 100).WithErrorCode("HANI-BOOKING-3511");
        RuleFor(command => command.ContactName).NotEmpty().MaximumLength(200).WithErrorCode("HANI-BOOKING-3512");
        RuleFor(command => command.ContactEmail).NotEmpty().EmailAddress().WithErrorCode("HANI-BOOKING-3513");
        RuleFor(command => command.ContactPhone).NotEmpty().MaximumLength(32).WithErrorCode("HANI-BOOKING-3514");
    }
}

/// <summary>Validation rules for restaurant reservation queries.</summary>
public sealed class GetRestaurantReservationQueryValidator
    : AbstractValidator<GetRestaurantReservationQuery>
{
    /// <summary>Creates validation rules.</summary>
    public GetRestaurantReservationQueryValidator()
    {
        RuleFor(query => query.ReservationId).NotEmpty().WithErrorCode("HANI-BOOKING-3515");
    }
}

/// <summary>Validation rules for restaurant reservation lists.</summary>
public sealed class ListRestaurantReservationsQueryValidator
    : AbstractValidator<ListRestaurantReservationsQuery>
{
    /// <summary>Creates validation rules.</summary>
    public ListRestaurantReservationsQueryValidator()
    {
        RuleFor(query => query.Page).GreaterThanOrEqualTo(1).WithErrorCode("HANI-BOOKING-3516");
        RuleFor(query => query.PageSize).InclusiveBetween(1, 50).WithErrorCode("HANI-BOOKING-3517");
    }
}

/// <summary>Validation rules for confirming reservations.</summary>
public sealed class ConfirmRestaurantReservationCommandValidator
    : AbstractValidator<ConfirmRestaurantReservationCommand>
{
    /// <summary>Creates validation rules.</summary>
    public ConfirmRestaurantReservationCommandValidator()
    {
        RuleFor(command => command.ReservationId).NotEmpty().WithErrorCode("HANI-BOOKING-3515");
    }
}

/// <summary>Validation rules for rejecting reservations.</summary>
public sealed class RejectRestaurantReservationCommandValidator
    : AbstractValidator<RejectRestaurantReservationCommand>
{
    /// <summary>Creates validation rules.</summary>
    public RejectRestaurantReservationCommandValidator()
    {
        RuleFor(command => command.ReservationId).NotEmpty().WithErrorCode("HANI-BOOKING-3515");
        RuleFor(command => command.Reason).NotEmpty().MaximumLength(500).WithErrorCode("HANI-BOOKING-3518");
    }
}
