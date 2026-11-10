using Hani.BuildingBlocks.Application;
using MassTransit;

namespace Hani.BuildingBlocks.Infrastructure.Messaging;

public sealed class MassTransitIntegrationEventPublisher(IPublishEndpoint publishEndpoint)
    : IIntegrationEventPublisher
{
    public Task PublishAsync<T>(
        T integrationEvent,
        CancellationToken cancellationToken = default)
        where T : class
        => publishEndpoint.Publish(integrationEvent, cancellationToken);
}
