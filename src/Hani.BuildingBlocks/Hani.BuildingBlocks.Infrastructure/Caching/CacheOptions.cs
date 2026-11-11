namespace Hani.BuildingBlocks.Infrastructure.Caching;

/// <summary>
/// Cache provider configuration.
/// </summary>
public sealed class CacheOptions
{
    public string Provider { get; set; } = "Memory";

    public int DefaultTtlSeconds { get; set; } = 300;

    public RedisCacheOptions Redis { get; set; } = new();
}

/// <summary>
/// Redis-specific cache configuration.
/// </summary>
public sealed class RedisCacheOptions
{
    public string Configuration { get; set; } = "localhost:6379";

    public string InstanceName { get; set; } = "hani:";
}
