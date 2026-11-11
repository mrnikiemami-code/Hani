using FluentValidation;

namespace Hani.Modules.Booking.Application.Queries.GetContract;

/// <summary>
/// Validation rules for reading an order contract.
/// </summary>
public sealed class GetContractQueryValidator : AbstractValidator<GetContractQuery>
{
    /// <summary>
    /// Creates validation rules for the order id.
    /// </summary>
    public GetContractQueryValidator()
    {
        RuleFor(query => query.OrderId)
            .NotEmpty()
            .WithErrorCode("HANI-BOOKING-2423");
    }
}
