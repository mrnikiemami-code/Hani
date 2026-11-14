using Hani.BuildingBlocks.Application;
using Hani.BuildingBlocks.Domain;
using Hani.Modules.Payments.Application.Abstractions;
using Hani.Modules.Payments.Domain.Chargebacks;
using Hani.Modules.Payments.Domain.Invoices;
using Hani.Modules.Payments.Domain.Reconciliation;
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

internal sealed class ProcessRefundCommandHandler(
    IFinanceRepository finance,
    IPaymentGateway gateway)
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

        try
        {
            var response = await gateway.RefundAsync(
                new PaymentRefundRequest(
                    refund.Id,
                    refund.OrderId,
                    refund.Amount,
                    refund.Currency,
                    refund.PaymentIntentId?.ToString()),
                cancellationToken);
            refund.MarkProcessed(response.ProviderRef);
        }
        catch (PaymentGatewayException exception)
        {
            refund.MarkFailed(exception.Message);
        }

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

internal sealed class SendInvoiceReminderCommandHandler(IFinanceRepository finance)
    : ICommandHandler<SendInvoiceReminderCommand, InvoiceDto>
{
    public async Task<Result<InvoiceDto>> Handle(
        SendInvoiceReminderCommand request,
        CancellationToken cancellationToken)
    {
        var invoice = await finance.GetInvoiceAsync(request.InvoiceId, cancellationToken);

        if (invoice is null)
        {
            return Result<InvoiceDto>.Failure(
                Error.NotFound("HANI-PAYMENT-3104", "Invoice was not found."));
        }

        invoice.MarkReminderSent(DateTimeOffset.UtcNow.AddDays(3));
        await finance.SaveChangesAsync(cancellationToken);
        return Result<InvoiceDto>.Success(CreateInvoiceCommandHandler.Map(invoice));
    }
}

internal sealed class OpenChargebackCommandHandler(IFinanceRepository finance, IIdGenerator ids)
    : ICommandHandler<OpenChargebackCommand, ChargebackDto>
{
    public async Task<Result<ChargebackDto>> Handle(
        OpenChargebackCommand request,
        CancellationToken cancellationToken)
    {
        try
        {
            var chargeback = Chargeback.Create(
                ids,
                request.OrderId,
                request.PaymentIntentId,
                request.Amount,
                request.Currency,
                request.Reason);
            await finance.AddChargebackAsync(chargeback, cancellationToken);
            return Result<ChargebackDto>.Success(Map(chargeback));
        }
        catch (ArgumentException exception)
        {
            return Result<ChargebackDto>.Failure(Error.Validation("HANI-PAYMENT-3201", exception.Message));
        }
    }

    internal static ChargebackDto Map(Chargeback chargeback)
        => new(
            chargeback.Id,
            chargeback.OrderId,
            chargeback.PaymentIntentId,
            chargeback.Amount,
            chargeback.Currency,
            chargeback.Reason,
            chargeback.Status.ToString(),
            chargeback.CreatedAt,
            chargeback.ResolvedAt);
}

internal sealed class ResolveChargebackCommandHandler(IFinanceRepository finance)
    : ICommandHandler<ResolveChargebackCommand, ChargebackDto>
{
    public async Task<Result<ChargebackDto>> Handle(
        ResolveChargebackCommand request,
        CancellationToken cancellationToken)
    {
        var chargeback = await finance.GetChargebackAsync(request.ChargebackId, cancellationToken);

        if (chargeback is null)
        {
            return Result<ChargebackDto>.Failure(
                Error.NotFound("HANI-PAYMENT-3202", "Chargeback was not found."));
        }

        if (request.Accept)
        {
            chargeback.Accept();
        }
        else
        {
            chargeback.Reject();
        }

        await finance.SaveChangesAsync(cancellationToken);
        return Result<ChargebackDto>.Success(OpenChargebackCommandHandler.Map(chargeback));
    }
}

internal sealed class CreateReconciliationCommandHandler(IFinanceRepository finance, IIdGenerator ids)
    : ICommandHandler<CreateReconciliationCommand, ReconciliationDto>
{
    public async Task<Result<ReconciliationDto>> Handle(
        CreateReconciliationCommand request,
        CancellationToken cancellationToken)
    {
        try
        {
            var record = ReconciliationRecord.Create(
                ids,
                request.Provider,
                request.PeriodStart,
                request.PeriodEnd,
                request.Currency,
                request.ExpectedAmount,
                request.ActualAmount);
            await finance.AddReconciliationAsync(record, cancellationToken);
            return Result<ReconciliationDto>.Success(Map(record));
        }
        catch (ArgumentException exception)
        {
            return Result<ReconciliationDto>.Failure(Error.Validation("HANI-PAYMENT-3203", exception.Message));
        }
    }

    internal static ReconciliationDto Map(ReconciliationRecord record)
        => new(
            record.Id,
            record.Provider,
            record.PeriodStart,
            record.PeriodEnd,
            record.Currency,
            record.ExpectedAmount,
            record.ActualAmount,
            record.Difference,
            record.Status.ToString(),
            record.CreatedAt);
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
