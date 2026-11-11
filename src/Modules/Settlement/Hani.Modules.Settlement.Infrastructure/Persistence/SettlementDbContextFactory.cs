using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Hani.Modules.Settlement.Infrastructure.Persistence;

/// <summary>
/// Design-time factory used by EF Core migrations.
/// </summary>
public sealed class SettlementDbContextFactory : IDesignTimeDbContextFactory<SettlementDbContext>
{
    /// <summary>
    /// Creates a context using <c>HANI_DB</c> or the local development connection string.
    /// </summary>
    public SettlementDbContext CreateDbContext(string[] args)
    {
        var connectionString = Environment.GetEnvironmentVariable("HANI_DB")
            ?? "Host=localhost;Port=5433;Database=hani;Username=hani;Password=hani_dev";

        var options = new DbContextOptionsBuilder<SettlementDbContext>()
            .UseNpgsql(connectionString)
            .Options;

        return new SettlementDbContext(options);
    }
}
