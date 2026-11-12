using Hani.Modules.Payments.Application.Abstractions;
using Hani.Modules.Payments.Domain.PaymentIntents;
using Hani.Modules.Payments.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Hani.Modules.Payments.Infrastructure.Repositories;

internal sealed class PaymentIntentRepository(PaymentsDbContext dbContext) : IPaymentIntentRepository
{
    public async Task AddAsync(PaymentIntent intent, CancellationToken cancellationToken)
    {
        await dbContext.PaymentIntents.AddAsync(intent, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
    }

    public Task<PaymentIntent?> GetByIdAsync(Guid id, CancellationToken cancellationToken)
        => dbContext.PaymentIntents.FirstOrDefaultAsync(intent => intent.Id == id, cancellationToken);

    public Task<PaymentIntent?> GetByOrderAndCurrencyAsync(
        Guid orderId,
        string currency,
        CancellationToken cancellationToken)
    {
        var normalizedCurrency = currency.ToUpperInvariant();

        return dbContext.PaymentIntents.FirstOrDefaultAsync(
            intent =>
                intent.OrderId == orderId &&
                intent.Currency == normalizedCurrency,
            cancellationToken);
    }

    public async Task<IReadOnlyList<PaymentIntent>> GetAllByOrderIdAsync(
        Guid orderId,
        CancellationToken cancellationToken)
        => await dbContext.PaymentIntents
            .Where(intent => intent.OrderId == orderId)
            .ToArrayAsync(cancellationToken);

    public Task SaveChangesAsync(CancellationToken cancellationToken)
        => dbContext.SaveChangesAsync(cancellationToken);
}
