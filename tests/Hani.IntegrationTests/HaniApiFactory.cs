using Hani.BuildingBlocks.Domain;
using Hani.BuildingBlocks.Infrastructure.Ids;
using Hani.Modules.Booking.Infrastructure.Persistence;
using Hani.Modules.Catalog.Infrastructure.Persistence;
using Hani.Modules.Content.Infrastructure.Persistence;
using Hani.Modules.Identity.Infrastructure.Persistence;
using Hani.Modules.Payments.Infrastructure.Persistence;
using Hani.Modules.Settlement.Infrastructure.Persistence;
using Hani.Modules.Supply.Infrastructure.Persistence;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Hani.IntegrationTests;

/// <summary>
/// Boots the Hani API against an isolated PostgreSQL database.
/// </summary>
public sealed class HaniApiFactory(string connectionString) : WebApplicationFactory<Program>
{
    /// <summary>
    /// Test database connection string.
    /// </summary>
    public string ConnectionString { get; } = connectionString;

    /// <summary>
    /// Identifier generator shared with test seeding.
    /// </summary>
    public IIdGenerator Ids { get; } = new Uuid7IdGenerator();

    /// <summary>
    /// Applies all module migrations to the test database.
    /// </summary>
    public async Task InitializeDatabaseAsync()
    {
        using var scope = Services.CreateScope();
        var supply = scope.ServiceProvider.GetRequiredService<SupplyDbContext>();
        if (!string.Equals(supply.Database.GetConnectionString(), ConnectionString, StringComparison.Ordinal))
        {
            throw new InvalidOperationException("Integration tests did not bind to the container database.");
        }

        await supply.Database.MigrateAsync();
        await scope.ServiceProvider.GetRequiredService<CatalogDbContext>().Database.MigrateAsync();
        await scope.ServiceProvider.GetRequiredService<ContentDbContext>().Database.MigrateAsync();
        await scope.ServiceProvider.GetRequiredService<IdentityDbContext>().Database.MigrateAsync();
        await scope.ServiceProvider.GetRequiredService<BookingDbContext>().Database.MigrateAsync();
        await scope.ServiceProvider.GetRequiredService<PaymentsDbContext>().Database.MigrateAsync();
        await scope.ServiceProvider.GetRequiredService<SettlementDbContext>().Database.MigrateAsync();
    }

    /// <summary>
    /// Creates a service scope for seeding or assertions.
    /// </summary>
    public IServiceScope CreateScope() => Services.CreateScope();

    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.UseEnvironment("Testing");
        builder.UseSetting("ConnectionStrings:Default", ConnectionString);
        builder.UseSetting("Messaging:Transport", "InMemory");
        builder.UseSetting("Messaging:Outbox:Enabled", "false");
        builder.UseSetting("Cache:Provider", "Memory");
        builder.UseSetting("Observability:Logging:Enabled", "false");
        builder.UseSetting("Observability:Tracing:Enabled", "false");
        builder.UseSetting("Observability:Metrics:Enabled", "false");
        builder.UseSetting("Payments:Provider", "Mock");
        builder.UseSetting("Seo:PublicBaseUrl", "https://hani.test");
        builder.ConfigureAppConfiguration((_, configuration) =>
        {
            configuration.AddInMemoryCollection(new Dictionary<string, string?>
            {
                ["ConnectionStrings:Default"] = ConnectionString,
                ["Messaging:Transport"] = "InMemory",
                ["Messaging:Outbox:Enabled"] = "false",
                ["Cache:Provider"] = "Memory",
                ["Observability:Logging:Enabled"] = "false",
                ["Observability:Tracing:Enabled"] = "false",
                ["Observability:Metrics:Enabled"] = "false",
                ["Payments:Provider"] = "Mock",
                ["Localization:DefaultCulture"] = "fa-IR",
                ["Localization:SupportedCultures:0"] = "fa-IR",
                ["Localization:SupportedCultures:1"] = "en-US",
                ["Localization:SupportedCultures:2"] = "ar-SA",
                ["Seo:PublicBaseUrl"] = "https://hani.test"
            });
        });
    }
}
