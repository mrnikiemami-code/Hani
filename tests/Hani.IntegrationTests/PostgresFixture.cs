using Testcontainers.PostgreSql;

namespace Hani.IntegrationTests;

/// <summary>
/// Starts one PostgreSQL container per integration test class.
/// </summary>
public sealed class PostgresFixture : IAsyncLifetime
{
    private readonly PostgreSqlContainer _container = new PostgreSqlBuilder("postgres:16-alpine")
        .WithDatabase("hani_integration")
        .WithUsername("hani")
        .WithPassword("hani_test")
        .Build();

    /// <summary>
    /// API factory bound to the container database.
    /// </summary>
    public HaniApiFactory Factory { get; private set; } = null!;

    /// <summary>
    /// Starts PostgreSQL and applies migrations.
    /// </summary>
    public async Task InitializeAsync()
    {
        await _container.StartAsync();
        Factory = new HaniApiFactory(_container.GetConnectionString());
        await Factory.InitializeDatabaseAsync();
    }

    /// <summary>
    /// Stops the container and disposes the API host.
    /// </summary>
    public async Task DisposeAsync()
    {
        await Factory.DisposeAsync();
        await _container.DisposeAsync();
    }
}
