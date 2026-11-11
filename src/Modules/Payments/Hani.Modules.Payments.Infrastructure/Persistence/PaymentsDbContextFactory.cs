using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Hani.Modules.Payments.Infrastructure.Persistence;

/// <summary>
/// Design-time factory used by EF Core migrations.
/// </summary>
public sealed class PaymentsDbContextFactory : IDesignTimeDbContextFactory<PaymentsDbContext>
{
    /// <summary>
    /// Creates a context using <c>HANI_DB</c> or the local development connection string.
    /// </summary>
    public PaymentsDbContext CreateDbContext(string[] args)
    {
        var connectionString = Environment.GetEnvironmentVariable("HANI_DB")
            ?? "Host=localhost;Port=5433;Database=hani;Username=hani;Password=hani_dev";

        var options = new DbContextOptionsBuilder<PaymentsDbContext>()
            .UseNpgsql(connectionString)
            .Options;

        return new PaymentsDbContext(options);
    }
}
