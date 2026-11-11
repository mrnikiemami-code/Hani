using Hani.BuildingBlocks.Application;
using MassTransit;

namespace Hani.BuildingBlocks.Infrastructure.Messaging;

/// <summary>
/// MassTransit implementation of <see cref="IIntegrationEventPublisher"/>.
/// </summary>
public sealed class MassTransitIntegrationEventPublisher(IPublishEndpoint publishEndpoint)
    : IIntegrationEventPublisher
{
    public Task PublishAsync<T>(
        T integrationEvent,
        CancellationToken cancellationToken = default)
        where T : class
        => publishEndpoint.Publish(integrationEvent, cancellationToken);
}
