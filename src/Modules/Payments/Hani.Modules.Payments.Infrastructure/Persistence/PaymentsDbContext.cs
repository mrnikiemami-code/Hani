using Hani.Modules.Payments.Domain.PaymentIntents;
using Hani.Modules.Payments.Domain.PaymentWebhooks;
using Microsoft.EntityFrameworkCore;

namespace Hani.Modules.Payments.Infrastructure.Persistence;

/// <summary>
/// EF Core context for the payment schema.
/// </summary>
public sealed class PaymentsDbContext(DbContextOptions<PaymentsDbContext> options) : DbContext(options)
{
    /// <summary>
    /// Payment intents.
    /// </summary>
    public DbSet<PaymentIntent> PaymentIntents => Set<PaymentIntent>();

    /// <summary>
    /// Deduplicated provider webhooks.
    /// </summary>
    public DbSet<PaymentWebhookEvent> PaymentWebhookEvents => Set<PaymentWebhookEvent>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasDefaultSchema("payment");
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(PaymentsDbContext).Assembly);
    }
}
