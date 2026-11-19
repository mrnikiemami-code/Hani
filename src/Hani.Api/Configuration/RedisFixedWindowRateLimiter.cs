using System.Threading.RateLimiting;
using StackExchange.Redis;

namespace Hani.Api.Configuration;

/// <summary>
/// Fixed-window rate limiter shared through Redis so limits apply across API
/// nodes. Falls back to an in-process limiter if Redis is temporarily
/// unavailable, keeping requests available while the probe recovers.
/// </summary>
internal sealed class RedisFixedWindowRateLimiter : RateLimiter
{
    private const string Script = """
        local current = redis.call('INCR', KEYS[1])
        if current == 1 then
          redis.call('PEXPIRE', KEYS[1], ARGV[1])
        end
        local ttl = redis.call('PTTL', KEYS[1])
        return {current, ttl}
        """;

    private readonly IDatabase _database;
    private readonly string _key;
    private readonly int _permitLimit;
    private readonly TimeSpan _window;
    private readonly FixedWindowRateLimiter _fallback;

    /// <summary>Creates a limiter for one partition key.</summary>
    public RedisFixedWindowRateLimiter(
        IConnectionMultiplexer redis,
        string key,
        int permitLimit,
        TimeSpan window)
    {
        _database = redis.GetDatabase();
        _key = key;
        _permitLimit = permitLimit;
        _window = window;
        _fallback = new FixedWindowRateLimiter(new FixedWindowRateLimiterOptions
        {
            PermitLimit = permitLimit,
            Window = window,
            QueueLimit = 0,
            AutoReplenishment = true
        });
    }

    /// <inheritdoc />
    public override TimeSpan? IdleDuration => null;

    /// <inheritdoc />
    public override RateLimiterStatistics? GetStatistics() => null;

    /// <inheritdoc />
    protected override RateLimitLease AttemptAcquireCore(int permitCount)
    {
        if (permitCount <= 0)
        {
            return RedisRateLimitLease.Success;
        }

        try
        {
            var result = _database.ScriptEvaluate(
                Script,
                [_key],
                [(long)_window.TotalMilliseconds]);
            var values = (RedisResult[])result!;
            var current = (long)values[0];
            var ttl = (long)values[1];
            return current <= _permitLimit
                ? RedisRateLimitLease.Success
                : RedisRateLimitLease.Rejected(
                    TimeSpan.FromMilliseconds(ttl > 0 ? ttl : _window.TotalMilliseconds));
        }
        catch (RedisException)
        {
            return _fallback.AttemptAcquire(permitCount);
        }
    }

    /// <inheritdoc />
    protected override ValueTask<RateLimitLease> AcquireAsyncCore(
        int permitCount,
        CancellationToken cancellationToken)
        => new(AttemptAcquireCore(permitCount));

    /// <inheritdoc />
    protected override void Dispose(bool disposing)
    {
        if (disposing)
        {
            _fallback.Dispose();
        }

        base.Dispose(disposing);
    }

    private sealed class RedisRateLimitLease(bool acquired, TimeSpan? retryAfter)
        : RateLimitLease
    {
        public static RedisRateLimitLease Success { get; } = new(true, null);

        public static RedisRateLimitLease Rejected(TimeSpan retryAfter) =>
            new(false, retryAfter);

        public override bool IsAcquired => acquired;

        public override IEnumerable<string> MetadataNames =>
            acquired ? [] : [MetadataName.RetryAfter.Name];

        public override bool TryGetMetadata(string metadataName, out object? metadata)
        {
            if (!acquired && metadataName == MetadataName.RetryAfter.Name)
            {
                metadata = retryAfter;
                return true;
            }

            metadata = null;
            return false;
        }
    }
}
