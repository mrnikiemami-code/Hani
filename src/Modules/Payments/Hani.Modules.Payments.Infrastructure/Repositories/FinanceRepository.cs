using Hani.Modules.Payments.Application.Commands.Finance;
using Hani.Modules.Payments.Domain.Chargebacks;
using Hani.Modules.Payments.Domain.Invoices;
using Hani.Modules.Payments.Domain.Reconciliation;
using Hani.Modules.Payments.Domain.Refunds;
using Hani.Modules.Payments.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Hani.Modules.Payments.Infrastructure.Repositories;

internal sealed class FinanceRepository(PaymentsDbContext dbContext) : IFinanceRepository
{
    public async Task AddRefundAsync(Refund refund, CancellationToken cancellationToken)
    {
        await dbContext.Refunds.AddAsync(refund, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
    }

    public Task<Refund?> GetRefundAsync(Guid id, CancellationToken cancellationToken)
        => dbContext.Refunds.FirstOrDefaultAsync(item => item.Id == id, cancellationToken);

    public async Task<IReadOnlyList<Refund>> ListRefundsAsync(Guid orderId, CancellationToken cancellationToken)
        => await dbContext.Refunds
            .AsNoTracking()
            .Where(item => item.OrderId == orderId)
            .OrderByDescending(item => item.RequestedAt)
            .ToArrayAsync(cancellationToken);

    public async Task AddInvoiceAsync(Invoice invoice, CancellationToken cancellationToken)
    {
        await dbContext.Invoices.AddAsync(invoice, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
    }

    public Task<Invoice?> GetInvoiceAsync(Guid id, CancellationToken cancellationToken)
        => dbContext.Invoices.FirstOrDefaultAsync(item => item.Id == id, cancellationToken);

    public async Task AddChargebackAsync(Chargeback chargeback, CancellationToken cancellationToken)
    {
        await dbContext.Chargebacks.AddAsync(chargeback, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
    }

    public Task<Chargeback?> GetChargebackAsync(Guid id, CancellationToken cancellationToken)
        => dbContext.Chargebacks.FirstOrDefaultAsync(item => item.Id == id, cancellationToken);

    public async Task AddReconciliationAsync(
        ReconciliationRecord record,
        CancellationToken cancellationToken)
    {
        await dbContext.Reconciliations.AddAsync(record, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
    }

    public Task<ReconciliationRecord?> GetReconciliationAsync(
        Guid id,
        CancellationToken cancellationToken)
        => dbContext.Reconciliations.FirstOrDefaultAsync(item => item.Id == id, cancellationToken);

    public Task SaveChangesAsync(CancellationToken cancellationToken)
        => dbContext.SaveChangesAsync(cancellationToken);
}
