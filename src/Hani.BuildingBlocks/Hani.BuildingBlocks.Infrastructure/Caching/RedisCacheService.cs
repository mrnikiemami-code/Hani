using System.Text.Json;
using Hani.BuildingBlocks.Application;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Options;

namespace Hani.BuildingBlocks.Infrastructure.Caching;

/// <summary>
/// Distributed cache implementation backed by Redis.
/// </summary>
public sealed class RedisCacheService(
    IDistributedCache cache,
    IOptions<CacheOptions> options) : ICacheService
{
    private static readonly JsonSerializerOptions SerializerOptions = new(JsonSerializerDefaults.Web);

    public async Task<T?> GetAsync<T>(string key, CancellationToken cancellationToken = default)
    {
        var bytes = await cache.GetAsync(key, cancellationToken);

        return bytes is null
            ? default
            : JsonSerializer.Deserialize<T>(bytes, SerializerOptions);
    }

    public Task SetAsync<T>(
        string key,
        T value,
        TimeSpan? timeToLive = null,
        CancellationToken cancellationToken = default)
    {
        var bytes = JsonSerializer.SerializeToUtf8Bytes(value, SerializerOptions);
        var ttl = timeToLive ?? TimeSpan.FromSeconds(options.Value.DefaultTtlSeconds);

        return cache.SetAsync(
            key,
            bytes,
            new DistributedCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = ttl
            },
            cancellationToken);
    }

    public async Task<T> GetOrCreateAsync<T>(
        string key,
        Func<CancellationToken, Task<T>> factory,
        TimeSpan? timeToLive = null,
        CancellationToken cancellationToken = default)
    {
        var existing = await GetAsync<T>(key, cancellationToken);

        if (existing is not null)
        {
            return existing;
        }

        var created = await factory(cancellationToken);
        await SetAsync(key, created, timeToLive, cancellationToken);
        return created;
    }

    public Task RemoveAsync(string key, CancellationToken cancellationToken = default)
        => cache.RemoveAsync(key, cancellationToken);
}
