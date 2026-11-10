namespace Hani.BuildingBlocks.Application;

public interface IIdempotentCommand
{
    string IdempotencyKey { get; }
}

public sealed record IdempotencyRecord(
    string Key,
    string RequestHash,
    string ResponseJson);

public interface IIdempotencyStore
{
    Task<IAsyncDisposable> AcquireAsync(string key, CancellationToken cancellationToken = default);

    Task<IdempotencyRecord?> GetAsync(string key, CancellationToken cancellationToken = default);

    Task SaveAsync(IdempotencyRecord record, CancellationToken cancellationToken = default);
}
