using FluentValidation;

namespace Hani.Modules.Settlement.Application.Payouts;

/// <summary>Validation rules for settlement terms.</summary>
public sealed class CreateSettlementTermsCommandValidator
    : AbstractValidator<CreateSettlementTermsCommand>
{
    /// <summary>Creates validation rules.</summary>
    public CreateSettlementTermsCommandValidator()
    {
        RuleFor(command => command.AgencyId).NotEmpty().WithErrorCode("HANI-SETTLEMENT-3111");
        RuleFor(command => command.Currency).NotEmpty().Length(3).WithErrorCode("HANI-SETTLEMENT-3112");
    }
}

/// <summary>Validation rules for payouts.</summary>
public sealed class CreatePayoutCommandValidator : AbstractValidator<CreatePayoutCommand>
{
    /// <summary>Creates validation rules.</summary>
    public CreatePayoutCommandValidator()
    {
        RuleFor(command => command.AgencyId).NotEmpty().WithErrorCode("HANI-SETTLEMENT-3111");
        RuleFor(command => command.Amount).GreaterThanOrEqualTo(0).WithErrorCode("HANI-SETTLEMENT-3113");
        RuleFor(command => command.PeriodEnd).GreaterThanOrEqualTo(command => command.PeriodStart)
            .WithErrorCode("HANI-SETTLEMENT-3114");
    }
}

/// <summary>Validation rules for payout payment.</summary>
public sealed class MarkPayoutPaidCommandValidator : AbstractValidator<MarkPayoutPaidCommand>
{
    /// <summary>Creates validation rules.</summary>
    public MarkPayoutPaidCommandValidator()
    {
        RuleFor(command => command.PayoutId).NotEmpty().WithErrorCode("HANI-SETTLEMENT-3115");
    }
}

/// <summary>Validation rules for settlement terms reads.</summary>
public sealed class GetSettlementTermsQueryValidator : AbstractValidator<GetSettlementTermsQuery>
{
    /// <summary>Creates validation rules.</summary>
    public GetSettlementTermsQueryValidator()
    {
        RuleFor(query => query.AgencyId).NotEmpty().WithErrorCode("HANI-SETTLEMENT-3111");
    }
}

/// <summary>Validation rules for payout lists.</summary>
public sealed class ListPayoutsQueryValidator : AbstractValidator<ListPayoutsQuery>
{
    /// <summary>Creates validation rules.</summary>
    public ListPayoutsQueryValidator()
    {
        RuleFor(query => query.AgencyId).NotEmpty().WithErrorCode("HANI-SETTLEMENT-3111");
    }
}
