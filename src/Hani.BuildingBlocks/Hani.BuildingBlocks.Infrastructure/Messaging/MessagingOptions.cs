namespace Hani.BuildingBlocks.Infrastructure.Messaging;

public sealed class MessagingOptions
{
    public string Transport { get; set; } = "InMemory";

    public RabbitMqOptions RabbitMq { get; set; } = new();

    public PostgresTransportOptions Postgres { get; set; } = new();

    public OutboxOptions Outbox { get; set; } = new();
}

public sealed class RabbitMqOptions
{
    public string Host { get; set; } = "rabbitmq://localhost";

    public string Username { get; set; } = "guest";

    public string Password { get; set; } = "guest";
}

public sealed class PostgresTransportOptions
{
    public string ConnectionString { get; set; } =
        "Host=localhost;Database=hani;Username=hani;Password=hani_dev";
}

public sealed class OutboxOptions
{
    public bool Enabled { get; set; }
}
