using Hani.BuildingBlocks.Application;
using Hani.Modules.Payments.Application.Abstractions;
using Hani.Modules.Payments.Application.Commands.CreatePaymentIntent;
using Hani.Modules.Payments.Application.Commands.Finance;
using Hani.Modules.Payments.Application.Queries.GetPaymentIntent;

namespace Hani.Modules.Payments.Application.Queries.TravelerFinance;

/// <summary>
/// Returns payment intents for the authenticated traveler's orders.
/// </summary>
public sealed record ListTravelerPaymentsQuery(IReadOnlyCollection<Guid> OrderIds)
    : IQuery<IReadOnlyList<PaymentIntentDto>>;

/// <summary>
/// Returns invoices for the authenticated traveler's orders.
/// </summary>
public sealed record ListTravelerInvoicesQuery(IReadOnlyCollection<Guid> OrderIds)
    : IQuery<IReadOnlyList<InvoiceDto>>;

/// <summary>
/// Returns refunds for the authenticated traveler's orders.
/// </summary>
public sealed record ListTravelerRefundsQuery(IReadOnlyCollection<Guid> OrderIds)
    : IQuery<IReadOnlyList<RefundDto>>;

internal sealed class ListTravelerPaymentsQueryHandler(IPaymentIntentRepository payments)
    : IQueryHandler<ListTravelerPaymentsQuery, IReadOnlyList<PaymentIntentDto>>
{
    public async Task<Result<IReadOnlyList<PaymentIntentDto>>> Handle(
        ListTravelerPaymentsQuery request,
        CancellationToken cancellationToken)
    {
        var items = await payments.ListByOrderIdsAsync(request.OrderIds, cancellationToken);
        return Result<IReadOnlyList<PaymentIntentDto>>.Success(
            items.Select(GetPaymentIntentQueryHandler.Map).ToArray());
    }
}

internal sealed class ListTravelerInvoicesQueryHandler(IFinanceRepository finance)
    : IQueryHandler<ListTravelerInvoicesQuery, IReadOnlyList<InvoiceDto>>
{
    public async Task<Result<IReadOnlyList<InvoiceDto>>> Handle(
        ListTravelerInvoicesQuery request,
        CancellationToken cancellationToken)
    {
        var items = await finance.ListInvoicesByOrderIdsAsync(
            request.OrderIds,
            cancellationToken);
        return Result<IReadOnlyList<InvoiceDto>>.Success(
            items.Select(CreateInvoiceCommandHandler.Map).ToArray());
    }
}

internal sealed class ListTravelerRefundsQueryHandler(IFinanceRepository finance)
    : IQueryHandler<ListTravelerRefundsQuery, IReadOnlyList<RefundDto>>
{
    public async Task<Result<IReadOnlyList<RefundDto>>> Handle(
        ListTravelerRefundsQuery request,
        CancellationToken cancellationToken)
    {
        var items = await finance.ListRefundsByOrderIdsAsync(
            request.OrderIds,
            cancellationToken);
        return Result<IReadOnlyList<RefundDto>>.Success(
            items.Select(RequestRefundCommandHandler.Map).ToArray());
    }
}
