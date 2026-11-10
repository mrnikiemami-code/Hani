using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using MediatR;

namespace Hani.BuildingBlocks.Application;

public sealed class IdempotencyBehavior<TRequest, TResponse>(
    IIdempotencyStore store)
    : IPipelineBehavior<TRequest, TResponse>
    where TRequest : notnull
{
    public async Task<TResponse> Handle(
        TRequest request,
        RequestHandlerDelegate<TResponse> next,
        CancellationToken cancellationToken)
    {
        if (request is not IIdempotentCommand idempotent ||
            string.IsNullOrWhiteSpace(idempotent.IdempotencyKey))
        {
            return await next();
        }

        var key = idempotent.IdempotencyKey.Trim();
        var requestHash = ComputeHash(JsonSerializer.Serialize(request));

        await using var _ = await store.AcquireAsync(key, cancellationToken);

        var existing = await store.GetAsync(key, cancellationToken);

        if (existing is not null)
        {
            if (!string.Equals(existing.RequestHash, requestHash, StringComparison.Ordinal))
            {
                throw new IdempotencyConflictException(key);
            }

            return JsonSerializer.Deserialize<TResponse>(existing.ResponseJson)
                ?? throw new InvalidOperationException("Stored idempotent response is invalid.");
        }

        var response = await next();

        await store.SaveAsync(
            new IdempotencyRecord(
                key,
                requestHash,
                JsonSerializer.Serialize(response)),
            cancellationToken);

        return response;
    }

    private static string ComputeHash(string value)
        => Convert.ToHexString(SHA256.HashData(Encoding.UTF8.GetBytes(value)));
}

public sealed class IdempotencyConflictException(string key)
    : Exception($"Idempotency key '{key}' was reused with a different request.");
