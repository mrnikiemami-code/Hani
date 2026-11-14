using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Hani.Modules.Content.Infrastructure.Persistence;

/// <summary>
/// Design-time factory used by EF Core migrations.
/// </summary>
public sealed class ContentDbContextFactory : IDesignTimeDbContextFactory<ContentDbContext>
{
    public ContentDbContext CreateDbContext(string[] args)
    {
        var connectionString = Environment.GetEnvironmentVariable("HANI_DB")
            ?? "Host=localhost;Port=5433;Database=hani;Username=hani;Password=hani_dev";

        var options = new DbContextOptionsBuilder<ContentDbContext>()
            .UseNpgsql(connectionString)
            .Options;

        return new ContentDbContext(options);
    }
}
