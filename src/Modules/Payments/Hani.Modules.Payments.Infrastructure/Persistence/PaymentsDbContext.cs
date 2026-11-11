using Hani.Modules.Payments.Domain.PaymentIntents;
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

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasDefaultSchema("payment");
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(PaymentsDbContext).Assembly);
    }
}
