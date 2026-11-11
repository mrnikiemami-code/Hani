using FluentValidation;

namespace Hani.Modules.Settlement.Application.Queries.GetCommission;

/// <summary>
/// Validation rules for reading a commission entry.
/// </summary>
public sealed class GetCommissionQueryValidator : AbstractValidator<GetCommissionQuery>
{
    /// <summary>
    /// Creates validation rules for the order id.
    /// </summary>
    public GetCommissionQueryValidator()
    {
        RuleFor(query => query.OrderId)
            .NotEmpty()
            .WithErrorCode("HANI-SETTLEMENT-1002");
    }
}
