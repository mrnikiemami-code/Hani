using Hani.BuildingBlocks.Application;
using Hani.BuildingBlocks.Infrastructure.Idempotency;
using Shouldly;

namespace Hani.UnitTests.BuildingBlocks;

public sealed class IdempotencyBehaviorTests
{
    [Fact]
    public async Task Second_Call_With_Same_Key_Should_Return_Cached_Response()
    {
        var store = new InMemoryIdempotencyStore();
        var behavior = new IdempotencyBehavior<TestCommand, Result<int>>(store);
        var command = new TestCommand("key-1");
        var calls = 0;

        Task<Result<int>> Next(CancellationToken _)
        {
            calls++;
            return Task.FromResult(Result<int>.Success(calls));
        }

        var first = await behavior.Handle(command, Next, CancellationToken.None);
        var second = await behavior.Handle(command, Next, CancellationToken.None);

        first.Value.ShouldBe(1);
        second.Value.ShouldBe(1);
        calls.ShouldBe(1);
    }

    [Fact]
    public async Task Same_Key_With_Different_Request_Should_Throw()
    {
        var store = new InMemoryIdempotencyStore();
        var behavior = new IdempotencyBehavior<TestCommand, Result<int>>(store);

        await behavior.Handle(
            new TestCommand("key-2", 1),
            _ => Task.FromResult(Result<int>.Success(1)),
            CancellationToken.None);

        await Should.ThrowAsync<IdempotencyConflictException>(() =>
            behavior.Handle(
                new TestCommand("key-2", 2),
                _ => Task.FromResult(Result<int>.Success(2)),
                CancellationToken.None));
    }

    [Fact]
    public async Task Command_Without_Key_Should_Execute_Every_Time()
    {
        var store = new InMemoryIdempotencyStore();
        var behavior = new IdempotencyBehavior<PlainCommand, Result<int>>(store);
        var calls = 0;

        Task<Result<int>> Next(CancellationToken _)
        {
            calls++;
            return Task.FromResult(Result<int>.Success(calls));
        }

        await behavior.Handle(new PlainCommand(), Next, CancellationToken.None);
        await behavior.Handle(new PlainCommand(), Next, CancellationToken.None);

        calls.ShouldBe(2);
    }

    private sealed record TestCommand(string Key, int Version = 1) : IIdempotentCommand
    {
        public string IdempotencyKey => Key;
    }

    private sealed record PlainCommand;
}

