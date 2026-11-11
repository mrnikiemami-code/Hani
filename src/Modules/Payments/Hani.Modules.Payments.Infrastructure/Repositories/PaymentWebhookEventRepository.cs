using Hani.Modules.Payments.Application.Abstractions;
using Hani.Modules.Payments.Domain.PaymentWebhooks;
using Hani.Modules.Payments.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Hani.Modules.Payments.Infrastructure.Repositories;

internal sealed class PaymentWebhookEventRepository(PaymentsDbContext dbContext)
    : IPaymentWebhookEventRepository
{
    public async Task AddAsync(
        PaymentWebhookEvent webhookEvent,
        CancellationToken cancellationToken)
    {
        await dbContext.PaymentWebhookEvents.AddAsync(webhookEvent, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
    }

    public Task<PaymentWebhookEvent?> GetAsync(
        string provider,
        string providerEventId,
        CancellationToken cancellationToken)
        => dbContext.PaymentWebhookEvents.FirstOrDefaultAsync(
            item => item.Provider == provider && item.ProviderEventId == providerEventId,
            cancellationToken);

    public Task SaveChangesAsync(CancellationToken cancellationToken)
        => dbContext.SaveChangesAsync(cancellationToken);
}
