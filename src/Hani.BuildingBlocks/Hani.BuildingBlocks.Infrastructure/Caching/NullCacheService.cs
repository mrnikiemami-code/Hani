using Hani.BuildingBlocks.Application;

namespace Hani.BuildingBlocks.Infrastructure.Caching;

public sealed class NullCacheService : ICacheService
{
    public Task<T?> GetAsync<T>(string key, CancellationToken cancellationToken = default)
        => Task.FromResult(default(T?));

    public Task SetAsync<T>(
        string key,
        T value,
        TimeSpan? timeToLive = null,
        CancellationToken cancellationToken = default)
        => Task.CompletedTask;

    public Task<T> GetOrCreateAsync<T>(
        string key,
        Func<CancellationToken, Task<T>> factory,
        TimeSpan? timeToLive = null,
        CancellationToken cancellationToken = default)
        => factory(cancellationToken);

    public Task RemoveAsync(string key, CancellationToken cancellationToken = default)
        => Task.CompletedTask;
}
