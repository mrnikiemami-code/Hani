namespace Hani.BuildingBlocks.Application;

/// <summary>
/// Publishes integration events through the configured message broker.
/// </summary>
public interface IIntegrationEventPublisher
{
    /// <summary>
    /// Publishes an event. Implementations should use the transactional outbox.
    /// </summary>
    Task PublishAsync<T>(T integrationEvent, CancellationToken cancellationToken = default)
        where T : class;
}
