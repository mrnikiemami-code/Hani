using FluentValidation;

namespace Hani.Modules.Booking.Application.Queries.GetOrder;

/// <summary>
/// Validation rules for reading an order.
/// </summary>
public sealed class GetOrderQueryValidator : AbstractValidator<GetOrderQuery>
{
    /// <summary>
    /// Creates validation rules for the order id.
    /// </summary>
    public GetOrderQueryValidator()
    {
        RuleFor(query => query.OrderId)
            .NotEmpty()
            .WithErrorCode("HANI-BOOKING-2422");
    }
}
