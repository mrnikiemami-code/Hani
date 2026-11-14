using FluentValidation;

namespace Hani.Modules.Booking.Application.Commands.Requests;

/// <summary>Validation rules for hotel inquiries.</summary>
public sealed class CreateHotelInquiryCommandValidator : AbstractValidator<CreateHotelInquiryCommand>
{
    /// <summary>Creates validation rules.</summary>
    public CreateHotelInquiryCommandValidator()
    {
        RuleFor(command => command.HotelId).NotEmpty().WithErrorCode("HANI-BOOKING-3410");
        RuleFor(command => command.Rooms).GreaterThanOrEqualTo(1).WithErrorCode("HANI-BOOKING-3411");
        RuleFor(command => command.Adults).GreaterThanOrEqualTo(1).WithErrorCode("HANI-BOOKING-3411");
        RuleFor(command => command.ContactEmail).NotEmpty().EmailAddress().WithErrorCode("HANI-BOOKING-3412");
        RuleFor(command => command.CheckOut).GreaterThan(command => command.CheckIn)
            .WithErrorCode("HANI-BOOKING-3413");
    }
}

/// <summary>Validation rules for hotel inquiry queries.</summary>
public sealed class GetHotelInquiryQueryValidator : AbstractValidator<GetHotelInquiryQuery>
{
    /// <summary>Creates validation rules.</summary>
    public GetHotelInquiryQueryValidator()
    {
        RuleFor(query => query.InquiryId).NotEmpty().WithErrorCode("HANI-BOOKING-3414");
    }
}

/// <summary>Validation rules for hotel inquiry lists.</summary>
public sealed class ListHotelInquiriesQueryValidator : AbstractValidator<ListHotelInquiriesQuery>
{
    /// <summary>Creates validation rules.</summary>
    public ListHotelInquiriesQueryValidator()
    {
        RuleFor(query => query.Page).GreaterThanOrEqualTo(1).WithErrorCode("HANI-BOOKING-3415");
        RuleFor(query => query.PageSize).InclusiveBetween(1, 50).WithErrorCode("HANI-BOOKING-3416");
    }
}

/// <summary>Validation rules for responding to hotel inquiries.</summary>
public sealed class RespondHotelInquiryCommandValidator : AbstractValidator<RespondHotelInquiryCommand>
{
    /// <summary>Creates validation rules.</summary>
    public RespondHotelInquiryCommandValidator()
    {
        RuleFor(command => command.InquiryId).NotEmpty().WithErrorCode("HANI-BOOKING-3414");
        RuleFor(command => command.ResponseNote).NotEmpty().MaximumLength(2000)
            .WithErrorCode("HANI-BOOKING-3417");
    }
}
