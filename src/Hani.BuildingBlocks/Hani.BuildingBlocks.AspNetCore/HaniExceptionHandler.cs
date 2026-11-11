using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace Hani.BuildingBlocks.AspNetCore;

/// <summary>
/// Converts unhandled exceptions into the central problem-details contract.
/// </summary>
public sealed class HaniExceptionHandler(ILogger<HaniExceptionHandler> logger) : IExceptionHandler
{
    /// <summary>
    /// Writes a problem-details response unless the response has already started.
    /// Client binding errors are returned as their 4xx status; all other exceptions become 500.
    /// </summary>
    public async ValueTask<bool> TryHandleAsync(
        HttpContext httpContext,
        Exception exception,
        CancellationToken cancellationToken)
    {
        if (httpContext.RequestAborted.IsCancellationRequested)
        {
            return true;
        }

        var correlationId = CorrelationIdMiddleware.Get(httpContext);

        if (exception is BadHttpRequestException { StatusCode: >= 400 and < 500 } badRequest)
        {
            logger.LogWarning(
                "Bad request. CorrelationId={CorrelationId} StatusCode={StatusCode}",
                correlationId,
                badRequest.StatusCode);

            if (httpContext.Response.HasStarted)
            {
                return false;
            }

            var clientProblem = HaniProblemDetails.Create(
                httpContext,
                badRequest.StatusCode,
                detail: badRequest.Message);

            await HaniProblemDetails.WriteAsync(httpContext, clientProblem, cancellationToken);
            return true;
        }

        logger.LogError(
            exception,
            "Unhandled exception. CorrelationId={CorrelationId}",
            correlationId);

        if (httpContext.Response.HasStarted)
        {
            return false;
        }

        var problem = HaniProblemDetails.Create(
            httpContext,
            StatusCodes.Status500InternalServerError,
            "HANI-COMMON-5000");

        await HaniProblemDetails.WriteAsync(httpContext, problem, cancellationToken);
        return true;
    }
}
