using Hani.BuildingBlocks.Application;
using Hani.BuildingBlocks.Domain;
using Hani.Modules.Payments.Domain.Invoices;
using Hani.Modules.Payments.Domain.Refunds;

namespace Hani.Modules.Payments.Application.Commands.Finance;

internal sealed class RequestRefundCommandHandler(IFinanceRepository finance, IIdGenerator ids)
    : ICommandHandler<RequestRefundCommand, RefundDto>
{
    public async Task<Result<RefundDto>> Handle(
        RequestRefundCommand request,
        CancellationToken cancellationToken)
    {
        try
        {
            var refund = Refund.Create(
                ids,
                request.OrderId,
                request.PaymentIntentId,
                request.Amount,
                request.Currency,
                request.Reason);
            await finance.AddRefundAsync(refund, cancellationToken);
            return Result<RefundDto>.Success(Map(refund));
        }
        catch (ArgumentException exception)
        {
            return Result<RefundDto>.Failure(Error.Validation("HANI-PAYMENT-3101", exception.Message));
        }
    }

    internal static RefundDto Map(Refund refund)
        => new(
            refund.Id,
            refund.OrderId,
            refund.PaymentIntentId,
            refund.Amount,
            refund.Currency,
            refund.Reason,
            refund.Status.ToString(),
            refund.RequestedAt,
            refund.ProcessedAt,
            refund.ProviderRef,
            refund.FailureReason);
}

internal sealed class ProcessRefundCommandHandler(IFinanceRepository finance)
    : ICommandHandler<ProcessRefundCommand, RefundDto>
{
    public async Task<Result<RefundDto>> Handle(
        ProcessRefundCommand request,
        CancellationToken cancellationToken)
    {
        var refund = await finance.GetRefundAsync(request.RefundId, cancellationToken);

        if (refund is null)
        {
            return Result<RefundDto>.Failure(
                Error.NotFound("HANI-PAYMENT-3102", "Refund was not found."));
        }

        refund.MarkProcessed($"mock-refund-{refund.Id:N}");
        await finance.SaveChangesAsync(cancellationToken);
        return Result<RefundDto>.Success(RequestRefundCommandHandler.Map(refund));
    }
}

internal sealed class CreateInvoiceCommandHandler(IFinanceRepository finance, IIdGenerator ids)
    : ICommandHandler<CreateInvoiceCommand, InvoiceDto>
{
    public async Task<Result<InvoiceDto>> Handle(
        CreateInvoiceCommand request,
        CancellationToken cancellationToken)
    {
        try
        {
            var invoice = Invoice.Create(
                ids,
                request.OrderId,
                request.Issuer,
                request.SellerOfRecord,
                request.BuyerEmail,
                request.Subtotal,
                request.Tax,
                request.Total,
                request.Currency);
            await finance.AddInvoiceAsync(invoice, cancellationToken);
            return Result<InvoiceDto>.Success(Map(invoice));
        }
        catch (ArgumentException exception)
        {
            return Result<InvoiceDto>.Failure(Error.Validation("HANI-PAYMENT-3103", exception.Message));
        }
    }

    internal static InvoiceDto Map(Invoice invoice)
        => new(
            invoice.Id,
            invoice.InvoiceNumber,
            invoice.OrderId,
            invoice.Issuer,
            invoice.SellerOfRecord,
            invoice.BuyerEmail,
            invoice.Subtotal,
            invoice.Tax,
            invoice.Total,
            invoice.Currency,
            invoice.Status.ToString(),
            invoice.IssuedAt);
}

internal sealed class GetRefundQueryHandler(IFinanceRepository finance)
    : IQueryHandler<GetRefundQuery, RefundDto>
{
    public async Task<Result<RefundDto>> Handle(
        GetRefundQuery request,
        CancellationToken cancellationToken)
    {
        var refund = await finance.GetRefundAsync(request.RefundId, cancellationToken);
        return refund is null
            ? Result<RefundDto>.Failure(Error.NotFound("HANI-PAYMENT-3102", "Refund was not found."))
            : Result<RefundDto>.Success(RequestRefundCommandHandler.Map(refund));
    }
}

internal sealed class GetInvoiceQueryHandler(IFinanceRepository finance)
    : IQueryHandler<GetInvoiceQuery, InvoiceDto>
{
    public async Task<Result<InvoiceDto>> Handle(
        GetInvoiceQuery request,
        CancellationToken cancellationToken)
    {
        var invoice = await finance.GetInvoiceAsync(request.InvoiceId, cancellationToken);
        return invoice is null
            ? Result<InvoiceDto>.Failure(Error.NotFound("HANI-PAYMENT-3104", "Invoice was not found."))
            : Result<InvoiceDto>.Success(CreateInvoiceCommandHandler.Map(invoice));
    }
}

internal sealed class ListRefundsQueryHandler(IFinanceRepository finance)
    : IQueryHandler<ListRefundsQuery, IReadOnlyList<RefundDto>>
{
    public async Task<Result<IReadOnlyList<RefundDto>>> Handle(
        ListRefundsQuery request,
        CancellationToken cancellationToken)
    {
        var refunds = await finance.ListRefundsAsync(request.OrderId, cancellationToken);
        return Result<IReadOnlyList<RefundDto>>.Success(
            refunds.Select(RequestRefundCommandHandler.Map).ToArray());
    }
}
