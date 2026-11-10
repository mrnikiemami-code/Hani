using Hani.BuildingBlocks.Infrastructure.Caching;
using Microsoft.Extensions.Caching.Memory;
using Shouldly;

namespace Hani.UnitTests.BuildingBlocks;

public sealed class MemoryCacheServiceTests
{
    [Fact]
    public async Task Set_And_Get_Should_RoundTrip()
    {
        using var cache = new MemoryCache(new MemoryCacheOptions());
        var service = new MemoryCacheService(cache);

        await service.SetAsync("key", "value", TimeSpan.FromMinutes(1));

        var result = await service.GetAsync<string>("key");

        result.ShouldBe("value");
    }

    [Fact]
    public async Task GetOrCreate_Should_Use_Factory_Only_Once()
    {
        using var cache = new MemoryCache(new MemoryCacheOptions());
        var service = new MemoryCacheService(cache);
        var calls = 0;

        Task<int> Factory(CancellationToken _)
        {
            calls++;
            return Task.FromResult(42);
        }

        var first = await service.GetOrCreateAsync("key", Factory, TimeSpan.FromMinutes(1));
        var second = await service.GetOrCreateAsync("key", Factory, TimeSpan.FromMinutes(1));

        first.ShouldBe(42);
        second.ShouldBe(42);
        calls.ShouldBe(1);
    }

    [Fact]
    public async Task Remove_Should_Evict_Value()
    {
        using var cache = new MemoryCache(new MemoryCacheOptions());
        var service = new MemoryCacheService(cache);

        await service.SetAsync("key", "value", TimeSpan.FromMinutes(1));
        await service.RemoveAsync("key");

        var result = await service.GetAsync<string>("key");

        result.ShouldBeNull();
    }
}
