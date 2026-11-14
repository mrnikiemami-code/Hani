using Hani.BuildingBlocks.Application;
using Hani.BuildingBlocks.Domain;
using Hani.Contracts.Booking;
using Hani.Contracts.Settlement;
using Hani.Modules.Payments.Application.Abstractions;
using Hani.Modules.Payments.Domain.OfflinePayments;

namespace Hani.Modules.Payments.Application.Commands.RecordOfflinePayment;

/// <summary>
/// Command that records an offline payment for an order currency.
/// </summary>
public sealed record RecordOfflinePaymentCommand(
    Guid OrderId,
    decimal Amount,
    string Currency,
    OfflinePaymentMethod Method,
    string? Reference,
    string RecordedBy) : ICommand<OfflinePaymentDto>;

/// <summary>
/// Offline receipt read model.
/// </summary>
public sealed record OfflinePaymentDto(
    Guid ReceiptId,
    Guid OrderId,
    Guid AgencyId,
    decimal Amount,
    string Currency,
    string Method,
    string? Reference,
    string RecordedBy,
    DateTimeOffset RecordedAt);

internal sealed class RecordOfflinePaymentCommandHandler(
    IOrderPaymentReadService orders,
    IOrderPaymentWriteService orderWrites,
    ICommissionAccrualService commissions,
    IOfflinePaymentRepository receipts,
    IIdGenerator ids)
    : ICommandHandler<RecordOfflinePaymentCommand, OfflinePaymentDto>
{
    public async Task<Result<OfflinePaymentDto>> Handle(
        RecordOfflinePaymentCommand request,
        CancellationToken cancellationToken)
    {
        var order = await orders.GetForPaymentAsync(request.OrderId, cancellationToken);

        if (order is null)
        {
            return Result<OfflinePaymentDto>.Failure(
                Error.NotFound("HANI-PAYMENT-2001", "Order was not found."));
        }

        if (!string.Equals(order.CollectionMode, "AgencyOffline", StringComparison.OrdinalIgnoreCase))
        {
            return Result<OfflinePaymentDto>.Failure(
                Error.Conflict("HANI-PAYMENT-2002", "Order is not configured for agency offline collection."));
        }

        var obligation = order.Obligations.FirstOrDefault(item =>
            string.Equals(item.Currency, request.Currency, StringComparison.OrdinalIgnoreCase));

        if (obligation is null)
        {
            return Result<OfflinePaymentDto>.Failure(
                Error.Validation("HANI-PAYMENT-2003", "Currency is not payable for this order."));
        }

        if (request.Amount != obligation.Amount)
        {
            return Result<OfflinePaymentDto>.Failure(
                Error.Validation("HANI-PAYMENT-2004", "Offline amount must match the obligation."));
        }

        OfflinePaymentReceipt receipt;

        try
        {
            receipt = OfflinePaymentReceipt.Create(
                ids,
                order.OrderId,
                order.AgencyId,
                request.Amount,
                request.Currency,
                request.Method,
                request.Reference,
                request.RecordedBy);
        }
        catch (ArgumentException exception)
        {
            return Result<OfflinePaymentDto>.Failure(
                Error.Validation("HANI-PAYMENT-2005", exception.Message));
        }

        var paid = await orderWrites.MarkObligationPaidAsync(
            order.OrderId,
            obligation.ObligationId,
            obligation.Currency,
            null,
            receipt.RecordedAt,
            cancellationToken);

        if (!paid)
        {
            return Result<OfflinePaymentDto>.Failure(
                Error.Conflict("HANI-PAYMENT-2006", "Order obligation could not be marked paid."));
        }

        await commissions.AccrueAsync(
            new CommissionAccrualRequest(
                order.OrderId,
                order.AgencyId,
                request.Amount,
                request.Currency,
                "TOUR",
                receipt.RecordedAt),
            cancellationToken);

        await receipts.AddAsync(receipt, cancellationToken);

        return Result<OfflinePaymentDto>.Success(new OfflinePaymentDto(
            receipt.Id,
            receipt.OrderId,
            receipt.AgencyId,
            receipt.Amount,
            receipt.Currency,
            receipt.Method.ToString(),
            receipt.Reference,
            receipt.RecordedBy,
            receipt.RecordedAt));
    }
}
