using Hani.BuildingBlocks.AspNetCore;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging.Abstractions;
using Shouldly;

namespace Hani.UnitTests.BuildingBlocks;

public sealed class HaniExceptionHandlerTests
{
    [Fact]
    public async Task Unhandled_Exception_Should_Return_500_ProblemDetails()
    {
        var context = new DefaultHttpContext();
        context.Response.Body = new MemoryStream();
        context.Items[CorrelationIdMiddleware.ItemKey] = "corr-500";
        context.Request.Path = "/api/boom";

        var handler = new HaniExceptionHandler(NullLogger<HaniExceptionHandler>.Instance);

        var handled = await handler.TryHandleAsync(
            context,
            new InvalidOperationException("boom"),
            CancellationToken.None);

        handled.ShouldBeTrue();
        context.Response.StatusCode.ShouldBe(StatusCodes.Status500InternalServerError);
        context.Response.ContentType.ShouldBe("application/problem+json");
        context.Response.Headers[CorrelationIdMiddleware.HeaderName].ToString().ShouldBe("corr-500");
        context.Response.Body.Length.ShouldBeGreaterThan(0);
    }

    [Fact]
    public async Task Bad_Binding_Exception_Should_Return_400_ProblemDetails()
    {
        var context = new DefaultHttpContext();
        context.Response.Body = new MemoryStream();
        context.Items[CorrelationIdMiddleware.ItemKey] = "corr-400";
        context.Request.Path = "/api/bad";

        var handler = new HaniExceptionHandler(NullLogger<HaniExceptionHandler>.Instance);

        var handled = await handler.TryHandleAsync(
            context,
            new BadHttpRequestException("Required parameter was missing.", StatusCodes.Status400BadRequest),
            CancellationToken.None);

        handled.ShouldBeTrue();
        context.Response.StatusCode.ShouldBe(StatusCodes.Status400BadRequest);
        context.Response.ContentType.ShouldBe("application/problem+json");
    }
}
