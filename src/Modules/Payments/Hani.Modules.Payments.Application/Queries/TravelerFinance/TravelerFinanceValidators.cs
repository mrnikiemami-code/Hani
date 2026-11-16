using FluentValidation;

namespace Hani.Modules.Payments.Application.Queries.TravelerFinance;

/// <summary>Validation rules for traveler payment lists.</summary>
public sealed class ListTravelerPaymentsQueryValidator
    : AbstractValidator<ListTravelerPaymentsQuery>
{
    /// <summary>Creates order-id validation rules.</summary>
    public ListTravelerPaymentsQueryValidator()
    {
        RuleFor(query => query.OrderIds).NotEmpty().WithErrorCode("HANI-PAYMENT-4200");
    }
}

/// <summary>Validation rules for traveler invoice lists.</summary>
public sealed class ListTravelerInvoicesQueryValidator
    : AbstractValidator<ListTravelerInvoicesQuery>
{
    /// <summary>Creates order-id validation rules.</summary>
    public ListTravelerInvoicesQueryValidator()
    {
        RuleFor(query => query.OrderIds).NotEmpty().WithErrorCode("HANI-PAYMENT-4200");
    }
}

/// <summary>Validation rules for traveler refund lists.</summary>
public sealed class ListTravelerRefundsQueryValidator
    : AbstractValidator<ListTravelerRefundsQuery>
{
    /// <summary>Creates order-id validation rules.</summary>
    public ListTravelerRefundsQueryValidator()
    {
        RuleFor(query => query.OrderIds).NotEmpty().WithErrorCode("HANI-PAYMENT-4200");
    }
}
