using System.Collections.Concurrent;
using Hani.BuildingBlocks.Application;

namespace Hani.BuildingBlocks.Infrastructure.Idempotency;

/// <summary>
/// Process-local idempotency store with per-key locking.
/// </summary>
public sealed class InMemoryIdempotencyStore : IIdempotencyStore
{
    private readonly ConcurrentDictionary<string, IdempotencyRecord> _records = new(StringComparer.Ordinal);
    private readonly ConcurrentDictionary<string, SemaphoreSlim> _locks = new(StringComparer.Ordinal);

    public async Task<IAsyncDisposable> AcquireAsync(
        string key,
        CancellationToken cancellationToken = default)
    {
        var semaphore = _locks.GetOrAdd(key, _ => new SemaphoreSlim(1, 1));
        await semaphore.WaitAsync(cancellationToken);

        return new Releaser(semaphore);
    }

    public Task<IdempotencyRecord?> GetAsync(
        string key,
        CancellationToken cancellationToken = default)
        => Task.FromResult(_records.TryGetValue(key, out var record) ? record : null);

    public Task SaveAsync(
        IdempotencyRecord record,
        CancellationToken cancellationToken = default)
    {
        _records[record.Key] = record;
        return Task.CompletedTask;
    }

    private sealed class Releaser(SemaphoreSlim semaphore) : IAsyncDisposable
    {
        public ValueTask DisposeAsync()
        {
            semaphore.Release();
            return ValueTask.CompletedTask;
        }
    }
}
