using Hani.BuildingBlocks.Application;
using MassTransit;
using MassTransit.SqlTransport.PostgreSql;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Hani.BuildingBlocks.Infrastructure.Messaging;

public static class MessagingServiceCollectionExtensions
{
    public static IServiceCollection AddHaniMessaging<TDbContext>(
        this IServiceCollection services,
        IConfiguration configuration)
        where TDbContext : DbContext
    {
        var section = configuration.GetSection("Messaging");
        var options = section.Get<MessagingOptions>() ?? new MessagingOptions();

        services.Configure<MessagingOptions>(section);

        services.AddMassTransit(bus =>
        {
            bus.SetKebabCaseEndpointNameFormatter();

            if (options.Outbox.Enabled)
            {
                bus.AddEntityFrameworkOutbox<TDbContext>(outbox =>
                {
                    outbox.UsePostgres();
                    outbox.UseBusOutbox();
                });
            }

            switch (options.Transport.Trim().ToLowerInvariant())
            {
                case "rabbitmq":
                    bus.UsingRabbitMq((context, cfg) =>
                    {
                        cfg.Host(new Uri(options.RabbitMq.Host), host =>
                        {
                            host.Username(options.RabbitMq.Username);
                            host.Password(options.RabbitMq.Password);
                        });

                        cfg.ConfigureEndpoints(context);
                    });
                    break;

                case "postgres":
                    bus.UsingPostgres((context, cfg) =>
                    {
                        cfg.Host(new PostgresSqlHostSettings(options.Postgres.ConnectionString));
                        cfg.ConfigureEndpoints(context);
                    });
                    break;

                case "inmemory":
                    bus.UsingInMemory((context, cfg) => cfg.ConfigureEndpoints(context));
                    break;

                default:
                    throw new InvalidOperationException(
                        $"Unsupported messaging transport '{options.Transport}'.");
            }
        });

        services.AddScoped<IIntegrationEventPublisher, MassTransitIntegrationEventPublisher>();

        return services;
    }
}

