using Microsoft.Extensions.Diagnostics.HealthChecks;
using Npgsql;

namespace Hani.Api;

/// <summary>
/// Verifies that the primary PostgreSQL database accepts connections.
/// </summary>
internal sealed class PostgresHealthCheck(IConfiguration configuration) : IHealthCheck
{
    /// <summary>
    /// Opens a connection and executes a lightweight probe query.
    /// </summary>
    public async Task<HealthCheckResult> CheckHealthAsync(
        HealthCheckContext context,
        CancellationToken cancellationToken = default)
    {
        var connectionString = configuration.GetConnectionString("Default");
        if (string.IsNullOrWhiteSpace(connectionString))
        {
            return HealthCheckResult.Unhealthy("Default connection string is not configured.");
        }

        try
        {
            await using var connection = new NpgsqlConnection(connectionString);
            await connection.OpenAsync(cancellationToken);
            await using var command = connection.CreateCommand();
            command.CommandText = "SELECT 1";
            await command.ExecuteScalarAsync(cancellationToken);
            return HealthCheckResult.Healthy("PostgreSQL is reachable.");
        }
        catch (Exception exception)
        {
            return HealthCheckResult.Unhealthy("PostgreSQL is unreachable.", exception);
        }
    }
}
