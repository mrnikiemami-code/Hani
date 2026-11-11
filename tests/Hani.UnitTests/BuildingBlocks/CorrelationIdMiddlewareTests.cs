using Hani.BuildingBlocks.AspNetCore;
using Hani.BuildingBlocks.Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging.Abstractions;
using Shouldly;

namespace Hani.UnitTests.BuildingBlocks;

public sealed class CorrelationIdMiddlewareTests
{
    [Fact]
    public async Task Valid_Incoming_Correlation_Id_Should_Be_Reused()
    {
        var context = new DefaultHttpContext();
        context.Request.Headers[CorrelationIdMiddleware.HeaderName] = "client-correlation-123";

        await CreateMiddleware().InvokeAsync(context);

        context.TraceIdentifier.ShouldBe("client-correlation-123");
        context.Items[CorrelationIdMiddleware.ItemKey].ShouldBe("client-correlation-123");
        context.Response.Headers[CorrelationIdMiddleware.HeaderName].ToString()
            .ShouldBe("client-correlation-123");
    }

    [Fact]
    public async Task Missing_Correlation_Id_Should_Be_Generated()
    {
        var context = new DefaultHttpContext();

        await CreateMiddleware().InvokeAsync(context);

        var correlationId = CorrelationIdMiddleware.Get(context);
        correlationId.ShouldNotBeNullOrWhiteSpace();
        context.TraceIdentifier.ShouldBe(correlationId);
        context.Response.Headers[CorrelationIdMiddleware.HeaderName].ToString()
            .ShouldBe(correlationId);
    }

    [Fact]
    public async Task Invalid_Correlation_Id_Should_Be_Replaced()
    {
        var context = new DefaultHttpContext();
        context.Request.Headers[CorrelationIdMiddleware.HeaderName] = new string('x', 129);

        await CreateMiddleware().InvokeAsync(context);

        var correlationId = CorrelationIdMiddleware.Get(context);
        correlationId.ShouldNotBe(new string('x', 129));
        correlationId.Length.ShouldBe(36);
    }

    private static CorrelationIdMiddleware CreateMiddleware()
        => new(
            _ => Task.CompletedTask,
            new FixedIdGenerator(Guid.Parse("0193f2a0-1234-7abc-8def-0123456789ab")),
            NullLogger<CorrelationIdMiddleware>.Instance);

    private sealed class FixedIdGenerator(Guid id) : IIdGenerator
    {
        public Guid NewId() => id;
    }
}
