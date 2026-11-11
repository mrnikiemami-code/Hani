namespace Hani.BuildingBlocks.Infrastructure.Messaging;

/// <summary>
/// Message transport and outbox configuration.
/// </summary>
public sealed class MessagingOptions
{
    public string Transport { get; set; } = "InMemory";

    public RabbitMqOptions RabbitMq { get; set; } = new();

    public PostgresTransportOptions Postgres { get; set; } = new();

    public OutboxOptions Outbox { get; set; } = new();
}

/// <summary>
/// RabbitMQ connection settings.
/// </summary>
public sealed class RabbitMqOptions
{
    public string Host { get; set; } = "rabbitmq://localhost";

    public string Username { get; set; } = "guest";

    public string Password { get; set; } = "guest";
}

/// <summary>
/// PostgreSQL SQL transport settings.
/// </summary>
public sealed class PostgresTransportOptions
{
    public string ConnectionString { get; set; } =
        "Host=localhost;Database=hani;Username=hani;Password=hani_dev";
}

/// <summary>
/// Outbox configuration.
/// </summary>
public sealed class OutboxOptions
{
    public bool Enabled { get; set; }
}
