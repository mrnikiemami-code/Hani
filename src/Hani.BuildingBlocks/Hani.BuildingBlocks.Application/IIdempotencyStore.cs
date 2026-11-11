namespace Hani.BuildingBlocks.Application;

/// <summary>
/// Marks a command that must be executed at most once per idempotency key.
/// </summary>
public interface IIdempotentCommand
{
    /// <summary>
    /// Client-supplied key that identifies the logical operation.
    /// </summary>
    string IdempotencyKey { get; }
}

/// <summary>
/// Stored request hash and response for idempotent replay.
/// </summary>
public sealed record IdempotencyRecord(
    string Key,
    string RequestHash,
    string ResponseJson);

/// <summary>
/// Persistence/locking abstraction for idempotent command execution.
/// </summary>
public interface IIdempotencyStore
{
    /// <summary>
    /// Acquires an exclusive lock for the key; dispose to release.
    /// </summary>
    Task<IAsyncDisposable> AcquireAsync(string key, CancellationToken cancellationToken = default);

    /// <summary>
    /// Returns a previously completed record, if any.
    /// </summary>
    Task<IdempotencyRecord?> GetAsync(string key, CancellationToken cancellationToken = default);

    /// <summary>
    /// Stores the completed response for future replay.
    /// </summary>
    Task SaveAsync(IdempotencyRecord record, CancellationToken cancellationToken = default);
}
