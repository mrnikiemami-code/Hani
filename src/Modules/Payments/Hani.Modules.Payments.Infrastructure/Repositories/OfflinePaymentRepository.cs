using Hani.Modules.Payments.Application.Abstractions;
using Hani.Modules.Payments.Domain.OfflinePayments;
using Hani.Modules.Payments.Infrastructure.Persistence;

namespace Hani.Modules.Payments.Infrastructure.Repositories;

internal sealed class OfflinePaymentRepository(PaymentsDbContext dbContext)
    : IOfflinePaymentRepository
{
    public async Task AddAsync(
        OfflinePaymentReceipt receipt,
        CancellationToken cancellationToken)
    {
        await dbContext.OfflinePaymentReceipts.AddAsync(receipt, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
    }
}
