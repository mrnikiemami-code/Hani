using Hani.BuildingBlocks.Application;
using Microsoft.Extensions.Caching.Memory;

namespace Hani.BuildingBlocks.Infrastructure.Caching;

/// <summary>
/// In-process cache implementation for tests and single-node deployments.
/// </summary>
public sealed class MemoryCacheService(IMemoryCache cache) : ICacheService
{
    public Task<T?> GetAsync<T>(string key, CancellationToken cancellationToken = default)
        => Task.FromResult(cache.TryGetValue<T>(key, out var value) ? value : default);

    public Task SetAsync<T>(
        string key,
        T value,
        TimeSpan? timeToLive = null,
        CancellationToken cancellationToken = default)
    {
        var options = new MemoryCacheEntryOptions();

        if (timeToLive.HasValue)
        {
            options.AbsoluteExpirationRelativeToNow = timeToLive;
        }

        cache.Set(key, value, options);
        return Task.CompletedTask;
    }

    public async Task<T> GetOrCreateAsync<T>(
        string key,
        Func<CancellationToken, Task<T>> factory,
        TimeSpan? timeToLive = null,
        CancellationToken cancellationToken = default)
    {
        if (cache.TryGetValue(key, out T? existing) && existing is not null)
        {
            return existing;
        }

        var created = await factory(cancellationToken);
        await SetAsync(key, created, timeToLive, cancellationToken);
        return created;
    }

    public Task RemoveAsync(string key, CancellationToken cancellationToken = default)
    {
        cache.Remove(key);
        return Task.CompletedTask;
    }
}
