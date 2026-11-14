using FluentValidation;

namespace Hani.Modules.Booking.Application.Commands.Requests;

/// <summary>Validation rules for visa applications.</summary>
public sealed class CreateVisaApplicationCommandValidator
    : AbstractValidator<CreateVisaApplicationCommand>
{
    /// <summary>Creates validation rules.</summary>
    public CreateVisaApplicationCommandValidator()
    {
        RuleFor(command => command.VisaCountryId).NotEmpty().WithErrorCode("HANI-BOOKING-3610");
        RuleFor(command => command.VisaTypeId).NotEmpty().WithErrorCode("HANI-BOOKING-3610");
        RuleFor(command => command.ApplicantName).NotEmpty().MaximumLength(200)
            .WithErrorCode("HANI-BOOKING-3611");
        RuleFor(command => command.PassportNo).NotEmpty().MaximumLength(32)
            .WithErrorCode("HANI-BOOKING-3612");
        RuleFor(command => command.Nationality).NotEmpty().MaximumLength(80)
            .WithErrorCode("HANI-BOOKING-3613");
        RuleFor(command => command.ContactEmail).NotEmpty().EmailAddress()
            .WithErrorCode("HANI-BOOKING-3614");
        RuleFor(command => command.ContactPhone).NotEmpty().MaximumLength(32)
            .WithErrorCode("HANI-BOOKING-3615");
        RuleFor(command => command.Documents).NotEmpty().WithErrorCode("HANI-BOOKING-3616");
    }
}

/// <summary>Validation rules for visa application queries.</summary>
public sealed class GetVisaApplicationQueryValidator : AbstractValidator<GetVisaApplicationQuery>
{
    /// <summary>Creates validation rules.</summary>
    public GetVisaApplicationQueryValidator()
    {
        RuleFor(query => query.ApplicationId).NotEmpty().WithErrorCode("HANI-BOOKING-3617");
    }
}

/// <summary>Validation rules for visa application lists.</summary>
public sealed class ListVisaApplicationsQueryValidator : AbstractValidator<ListVisaApplicationsQuery>
{
    /// <summary>Creates validation rules.</summary>
    public ListVisaApplicationsQueryValidator()
    {
        RuleFor(query => query.Page).GreaterThanOrEqualTo(1).WithErrorCode("HANI-BOOKING-3618");
        RuleFor(query => query.PageSize).InclusiveBetween(1, 50).WithErrorCode("HANI-BOOKING-3619");
    }
}

/// <summary>Validation rules for visa status updates.</summary>
public sealed class UpdateVisaApplicationStatusCommandValidator
    : AbstractValidator<UpdateVisaApplicationStatusCommand>
{
    /// <summary>Creates validation rules.</summary>
    public UpdateVisaApplicationStatusCommandValidator()
    {
        RuleFor(command => command.ApplicationId).NotEmpty().WithErrorCode("HANI-BOOKING-3617");
    }
}
