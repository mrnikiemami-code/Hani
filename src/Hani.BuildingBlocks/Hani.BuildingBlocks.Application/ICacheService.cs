namespace Hani.BuildingBlocks.Application;

/// <summary>
/// Abstraction over a cache provider (Memory, Redis, or none).
/// </summary>
public interface ICacheService
{
    /// <summary>
    /// Reads a cached value; returns <c>default</c> when the key is missing.
    /// </summary>
    Task<T?> GetAsync<T>(string key, CancellationToken cancellationToken = default);

    /// <summary>
    /// Stores a value with an optional absolute time-to-live.
    /// </summary>
    Task SetAsync<T>(
        string key,
        T value,
        TimeSpan? timeToLive = null,
        CancellationToken cancellationToken = default);

    /// <summary>
    /// Returns the cached value or creates and stores it using <paramref name="factory"/>.
    /// </summary>
    Task<T> GetOrCreateAsync<T>(
        string key,
        Func<CancellationToken, Task<T>> factory,
        TimeSpan? timeToLive = null,
        CancellationToken cancellationToken = default);

    /// <summary>
    /// Removes a cached value.
    /// </summary>
    Task RemoveAsync(string key, CancellationToken cancellationToken = default);
}
