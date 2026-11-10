namespace Hani.BuildingBlocks.Infrastructure.Caching;

public sealed class CacheOptions
{
    public string Provider { get; set; } = "Memory";

    public int DefaultTtlSeconds { get; set; } = 300;

    public RedisCacheOptions Redis { get; set; } = new();
}

public sealed class RedisCacheOptions
{
    public string Configuration { get; set; } = "localhost:6379";

    public string InstanceName { get; set; } = "hani:";
}
