using FluentValidation;

namespace Hani.Modules.Payments.Application.Commands.Finance;

/// <summary>Validation rules for refund requests.</summary>
public sealed class RequestRefundCommandValidator : AbstractValidator<RequestRefundCommand>
{
    /// <summary>Creates validation rules.</summary>
    public RequestRefundCommandValidator()
    {
        RuleFor(command => command.OrderId).NotEmpty().WithErrorCode("HANI-PAYMENT-3111");
        RuleFor(command => command.Amount).GreaterThan(0).WithErrorCode("HANI-PAYMENT-3112");
        RuleFor(command => command.Currency).NotEmpty().Length(3).WithErrorCode("HANI-PAYMENT-3113");
        RuleFor(command => command.Reason).NotEmpty().MaximumLength(500).WithErrorCode("HANI-PAYMENT-3114");
    }
}

/// <summary>Validation rules for refund processing.</summary>
public sealed class ProcessRefundCommandValidator : AbstractValidator<ProcessRefundCommand>
{
    /// <summary>Creates validation rules.</summary>
    public ProcessRefundCommandValidator()
    {
        RuleFor(command => command.RefundId).NotEmpty().WithErrorCode("HANI-PAYMENT-3115");
    }
}

/// <summary>Validation rules for invoices.</summary>
public sealed class CreateInvoiceCommandValidator : AbstractValidator<CreateInvoiceCommand>
{
    /// <summary>Creates validation rules.</summary>
    public CreateInvoiceCommandValidator()
    {
        RuleFor(command => command.OrderId).NotEmpty().WithErrorCode("HANI-PAYMENT-3111");
        RuleFor(command => command.Issuer).NotEmpty().WithErrorCode("HANI-PAYMENT-3116");
        RuleFor(command => command.Total).GreaterThanOrEqualTo(0).WithErrorCode("HANI-PAYMENT-3117");
    }
}

/// <summary>Validation rules for finance reads.</summary>
public sealed class GetRefundQueryValidator : AbstractValidator<GetRefundQuery>
{
    /// <summary>Creates validation rules.</summary>
    public GetRefundQueryValidator()
    {
        RuleFor(query => query.RefundId).NotEmpty().WithErrorCode("HANI-PAYMENT-3115");
    }
}

/// <summary>Validation rules for invoice reads.</summary>
public sealed class GetInvoiceQueryValidator : AbstractValidator<GetInvoiceQuery>
{
    /// <summary>Creates validation rules.</summary>
    public GetInvoiceQueryValidator()
    {
        RuleFor(query => query.InvoiceId).NotEmpty().WithErrorCode("HANI-PAYMENT-3118");
    }
}

/// <summary>Validation rules for refund lists.</summary>
public sealed class ListRefundsQueryValidator : AbstractValidator<ListRefundsQuery>
{
    /// <summary>Creates validation rules.</summary>
    public ListRefundsQueryValidator()
    {
        RuleFor(query => query.OrderId).NotEmpty().WithErrorCode("HANI-PAYMENT-3111");
    }
}
