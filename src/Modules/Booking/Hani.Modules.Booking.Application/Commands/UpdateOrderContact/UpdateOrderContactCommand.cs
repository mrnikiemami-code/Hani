using FluentValidation;
using Hani.BuildingBlocks.Application;
using Hani.Modules.Booking.Application.Abstractions;
using Hani.Modules.Booking.Domain.Orders;

namespace Hani.Modules.Booking.Application.Commands.UpdateOrderContact;

/// <summary>
/// Command that updates the non-commercial contact details of an order.
/// The issued contract snapshot and pricing stay unchanged.
/// </summary>
public sealed record UpdateOrderContactCommand(
    Guid OrderId,
    string ContactEmail,
    string? ContactPhone) : ICommand<bool>;

internal sealed class UpdateOrderContactCommandHandler(IOrderRepository orders)
    : ICommandHandler<UpdateOrderContactCommand, bool>
{
    public async Task<Result<bool>> Handle(
        UpdateOrderContactCommand request,
        CancellationToken cancellationToken)
    {
        var order = await orders.GetByIdAsync(request.OrderId, cancellationToken);
        if (order is null)
        {
            return Result<bool>.Failure(
                Error.NotFound("HANI-BOOKING-2601", "Order was not found."));
        }

        if (order.Status is OrderStatus.Cancelled or OrderStatus.Expired)
        {
            return Result<bool>.Failure(
                Error.Conflict("HANI-BOOKING-2602", "A closed order cannot be updated."));
        }

        try
        {
            order.UpdateContact(request.ContactEmail, request.ContactPhone);
            await orders.SaveChangesAsync(cancellationToken);
            return Result<bool>.Success(true);
        }
        catch (ArgumentException exception)
        {
            return Result<bool>.Failure(
                Error.Validation("HANI-BOOKING-2603", exception.Message));
        }
    }
}

/// <summary>
/// Validation rules for order contact updates.
/// </summary>
public sealed class UpdateOrderContactCommandValidator
    : AbstractValidator<UpdateOrderContactCommand>
{
    /// <summary>Creates validation rules.</summary>
    public UpdateOrderContactCommandValidator()
    {
        RuleFor(command => command.OrderId)
            .NotEmpty()
            .WithErrorCode("HANI-BOOKING-2610");
        RuleFor(command => command.ContactEmail)
            .NotEmpty()
            .EmailAddress()
            .MaximumLength(320)
            .WithErrorCode("HANI-BOOKING-2611");
        RuleFor(command => command.ContactPhone)
            .MaximumLength(40)
            .WithErrorCode("HANI-BOOKING-2612");
    }
}
