using FluentValidation;

namespace Hani.Modules.Booking.Application.Commands.Requests;

/// <summary>Validation rules for reservation requests.</summary>
public sealed class CreateReservationRequestCommandValidator : AbstractValidator<CreateReservationRequestCommand>
{
    /// <summary>Creates validation rules.</summary>
    public CreateReservationRequestCommandValidator()
    {
        RuleFor(command => command.QuoteId).NotEmpty().WithErrorCode("HANI-BOOKING-3010");
        RuleFor(command => command.ContactEmail).NotEmpty().EmailAddress().WithErrorCode("HANI-BOOKING-3011");
    }
}

/// <summary>Validation rules for reservation queries.</summary>
public sealed class GetReservationRequestQueryValidator : AbstractValidator<GetReservationRequestQuery>
{
    /// <summary>Creates validation rules.</summary>
    public GetReservationRequestQueryValidator()
    {
        RuleFor(query => query.RequestId).NotEmpty().WithErrorCode("HANI-BOOKING-3012");
    }
}

/// <summary>Validation rules for reservation request lists.</summary>
public sealed class ListReservationRequestsQueryValidator : AbstractValidator<ListReservationRequestsQuery>
{
    /// <summary>Creates validation rules.</summary>
    public ListReservationRequestsQueryValidator()
    {
        RuleFor(query => query.AgencyId).NotEmpty().WithErrorCode("HANI-BOOKING-3014");
    }
}

/// <summary>Validation rules for reservation confirmation.</summary>
public sealed class ConfirmReservationRequestCommandValidator : AbstractValidator<ConfirmReservationRequestCommand>
{
    /// <summary>Creates validation rules.</summary>
    public ConfirmReservationRequestCommandValidator()
    {
        RuleFor(command => command.RequestId).NotEmpty().WithErrorCode("HANI-BOOKING-3012");
    }
}

/// <summary>Validation rules for reservation rejection.</summary>
public sealed class RejectReservationRequestCommandValidator : AbstractValidator<RejectReservationRequestCommand>
{
    /// <summary>Creates validation rules.</summary>
    public RejectReservationRequestCommandValidator()
    {
        RuleFor(command => command.RequestId).NotEmpty().WithErrorCode("HANI-BOOKING-3012");
        RuleFor(command => command.Reason).NotEmpty().MaximumLength(500).WithErrorCode("HANI-BOOKING-3013");
    }
}

/// <summary>Validation rules for reservation acceptance.</summary>
public sealed class AcceptReservationRequestCommandValidator : AbstractValidator<AcceptReservationRequestCommand>
{
    /// <summary>Creates validation rules.</summary>
    public AcceptReservationRequestCommandValidator()
    {
        RuleFor(command => command.RequestId).NotEmpty().WithErrorCode("HANI-BOOKING-3012");
    }
}

/// <summary>Validation rules for leads.</summary>
public sealed class CreateLeadCommandValidator : AbstractValidator<CreateLeadCommand>
{
    /// <summary>Creates validation rules.</summary>
    public CreateLeadCommandValidator()
    {
        RuleFor(command => command.Adults).GreaterThanOrEqualTo(1).WithErrorCode("HANI-BOOKING-3110");
        RuleFor(command => command.ContactName).NotEmpty().MaximumLength(200).WithErrorCode("HANI-BOOKING-3111");
        RuleFor(command => command.ContactEmail).NotEmpty().EmailAddress().WithErrorCode("HANI-BOOKING-3112");
        RuleFor(command => command.ContactPhone).NotEmpty().MaximumLength(32).WithErrorCode("HANI-BOOKING-3113");
    }
}

/// <summary>Validation rules for lead queries.</summary>
public sealed class GetLeadQueryValidator : AbstractValidator<GetLeadQuery>
{
    /// <summary>Creates validation rules.</summary>
    public GetLeadQueryValidator()
    {
        RuleFor(query => query.LeadId).NotEmpty().WithErrorCode("HANI-BOOKING-3114");
    }
}

/// <summary>Validation rules for lead lists.</summary>
public sealed class ListLeadsQueryValidator : AbstractValidator<ListLeadsQuery>
{
    /// <summary>Creates paging rules.</summary>
    public ListLeadsQueryValidator()
    {
        RuleFor(query => query.Page).GreaterThanOrEqualTo(1).WithErrorCode("HANI-BOOKING-3115");
        RuleFor(query => query.PageSize).InclusiveBetween(1, 50).WithErrorCode("HANI-BOOKING-3116");
    }
}

/// <summary>Validation rules for lead matching.</summary>
public sealed class MatchLeadCommandValidator : AbstractValidator<MatchLeadCommand>
{
    /// <summary>Creates validation rules.</summary>
    public MatchLeadCommandValidator()
    {
        RuleFor(command => command.LeadId).NotEmpty().WithErrorCode("HANI-BOOKING-3114");
        RuleFor(command => command.AgencyId).NotEmpty().WithErrorCode("HANI-BOOKING-3117");
    }
}

/// <summary>Validation rules for lead distribution.</summary>
public sealed class DistributeLeadCommandValidator : AbstractValidator<DistributeLeadCommand>
{
    /// <summary>Creates validation rules.</summary>
    public DistributeLeadCommandValidator()
    {
        RuleFor(command => command.LeadId).NotEmpty().WithErrorCode("HANI-BOOKING-3114");
    }
}

/// <summary>Validation rules for closing leads.</summary>
public sealed class CloseLeadCommandValidator : AbstractValidator<CloseLeadCommand>
{
    /// <summary>Creates validation rules.</summary>
    public CloseLeadCommandValidator()
    {
        RuleFor(command => command.LeadId).NotEmpty().WithErrorCode("HANI-BOOKING-3114");
    }
}

/// <summary>Validation rules for price discrepancies.</summary>
public sealed class CreatePriceDiscrepancyCommandValidator : AbstractValidator<CreatePriceDiscrepancyCommand>
{
    /// <summary>Creates validation rules.</summary>
    public CreatePriceDiscrepancyCommandValidator()
    {
        RuleFor(command => command.AgencyOfferId).NotEmpty().WithErrorCode("HANI-BOOKING-3210");
        RuleFor(command => command.ReportedPrice).GreaterThan(0).WithErrorCode("HANI-BOOKING-3211");
        RuleFor(command => command.Currency).NotEmpty().Length(3).WithErrorCode("HANI-BOOKING-3212");
        RuleFor(command => command.Note).NotEmpty().MinimumLength(5).MaximumLength(2000).WithErrorCode("HANI-BOOKING-3213");
    }
}

/// <summary>Validation rules for discrepancy lists.</summary>
public sealed class ListPriceDiscrepanciesQueryValidator : AbstractValidator<ListPriceDiscrepanciesQuery>
{
    /// <summary>Creates paging rules.</summary>
    public ListPriceDiscrepanciesQueryValidator()
    {
        RuleFor(query => query.Page).GreaterThanOrEqualTo(1).WithErrorCode("HANI-BOOKING-3214");
        RuleFor(query => query.PageSize).InclusiveBetween(1, 50).WithErrorCode("HANI-BOOKING-3215");
    }
}

/// <summary>Validation rules for resolving discrepancies.</summary>
public sealed class ResolvePriceDiscrepancyCommandValidator : AbstractValidator<ResolvePriceDiscrepancyCommand>
{
    /// <summary>Creates validation rules.</summary>
    public ResolvePriceDiscrepancyCommandValidator()
    {
        RuleFor(command => command.ReportId).NotEmpty().WithErrorCode("HANI-BOOKING-3216");
        RuleFor(command => command.Resolution).NotEmpty().MaximumLength(1000).WithErrorCode("HANI-BOOKING-3217");
    }
}

/// <summary>Validation rules for installment plans.</summary>
public sealed class CreateInstallmentPlanCommandValidator : AbstractValidator<CreateInstallmentPlanCommand>
{
    /// <summary>Creates validation rules.</summary>
    public CreateInstallmentPlanCommandValidator()
    {
        RuleFor(command => command.OrderId).NotEmpty().WithErrorCode("HANI-BOOKING-3310");
        RuleFor(command => command.Currency).NotEmpty().Length(3).WithErrorCode("HANI-BOOKING-3311");
        RuleFor(command => command.InstallmentCount).InclusiveBetween(2, 12).WithErrorCode("HANI-BOOKING-3312");
        RuleFor(command => command.IntervalDays).InclusiveBetween(1, 90).WithErrorCode("HANI-BOOKING-3313");
    }
}

/// <summary>Validation rules for installment queries.</summary>
public sealed class GetInstallmentPlanQueryValidator : AbstractValidator<GetInstallmentPlanQuery>
{
    /// <summary>Creates validation rules.</summary>
    public GetInstallmentPlanQueryValidator()
    {
        RuleFor(query => query.OrderId).NotEmpty().WithErrorCode("HANI-BOOKING-3310");
        RuleFor(query => query.Currency).NotEmpty().Length(3).WithErrorCode("HANI-BOOKING-3311");
    }
}

/// <summary>Validation rules for paying installments.</summary>
public sealed class PayInstallmentCommandValidator : AbstractValidator<PayInstallmentCommand>
{
    /// <summary>Creates validation rules.</summary>
    public PayInstallmentCommandValidator()
    {
        RuleFor(command => command.OrderId).NotEmpty().WithErrorCode("HANI-BOOKING-3310");
        RuleFor(command => command.Currency).NotEmpty().Length(3).WithErrorCode("HANI-BOOKING-3311");
        RuleFor(command => command.Sequence).GreaterThan(0).WithErrorCode("HANI-BOOKING-3314");
    }
}
