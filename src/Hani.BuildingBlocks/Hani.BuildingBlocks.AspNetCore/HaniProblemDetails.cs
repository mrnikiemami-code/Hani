using System.Diagnostics;
using System.Globalization;
using System.Text.Json;
using System.Text.Json.Serialization;
using Hani.BuildingBlocks.Application;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Mvc;
using IResult = Microsoft.AspNetCore.Http.IResult;

namespace Hani.BuildingBlocks.AspNetCore;

/// <summary>
/// Central RFC 7807 problem-details factory. All API errors must be created through this type
/// so status mapping, localization, correlation, and trace metadata stay consistent.
/// </summary>
public static class HaniProblemDetails
{
    /// <summary>
    /// Extension key carrying the stable Hani error code.
    /// </summary>
    public const string CodeExtension = "code";

    /// <summary>
    /// Extension key carrying the request correlation identifier.
    /// </summary>
    public const string CorrelationIdExtension = "correlationId";

    /// <summary>
    /// Extension key carrying the distributed trace identifier.
    /// </summary>
    public const string TraceIdExtension = "traceId";

    /// <summary>
    /// Extension key carrying the response locale.
    /// </summary>
    public const string LocaleExtension = "locale";

    /// <summary>
    /// Extension key carrying field-level validation errors.
    /// </summary>
    public const string ErrorsExtension = "errors";

    private static readonly JsonSerializerOptions SerializerOptions = new(JsonSerializerDefaults.Web)
    {
        DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull
    };

    /// <summary>
    /// Creates a problem-details payload for an application error.
    /// </summary>
    public static ProblemDetails Create(HttpContext context, Error error)
        => Create(
            context,
            StatusCodeFor(error.Type),
            error.Code,
            error.Message,
            error.Errors);

    /// <summary>
    /// Creates a problem-details payload for a status code or framework-level error.
    /// </summary>
    public static ProblemDetails Create(
        HttpContext context,
        int statusCode,
        string? code = null,
        string? detail = null,
        IReadOnlyDictionary<string, string[]>? errors = null)
    {
        var errorType = ErrorTypeForStatusCode(statusCode);
        var locale = CurrentLocale(context);
        var correlationId = CorrelationIdMiddleware.Get(context);
        var resolvedCode = string.IsNullOrWhiteSpace(code) ? DefaultCode(statusCode) : code;

        var problem = new ProblemDetails
        {
            Type = $"https://api.hani.ir/errors/{Uri.EscapeDataString(resolvedCode)}",
            Title = ProblemDetailsLocalizer.Title(errorType, locale),
            Status = statusCode,
            Detail = statusCode >= StatusCodes.Status500InternalServerError ? null : detail,
            Instance = context.Request.Path
        };

        problem.Extensions[CodeExtension] = resolvedCode;
        problem.Extensions[CorrelationIdExtension] = correlationId;
        problem.Extensions[TraceIdExtension] = CurrentTraceId(context);
        problem.Extensions[LocaleExtension] = locale;

        if (errors is { Count: > 0 })
        {
            problem.Extensions[ErrorsExtension] = errors;
        }

        return problem;
    }

    /// <summary>
    /// Creates a minimal API result backed by the central problem-details writer.
    /// </summary>
    public static IResult ToResult(HttpContext context, Error error)
        => new HaniProblemDetailsResult(Create(context, error));

    /// <summary>
    /// Writes problem details with the correct status code and media type.
    /// </summary>
    public static async Task WriteAsync(
        HttpContext context,
        ProblemDetails problem,
        CancellationToken cancellationToken = default)
    {
        if (context.Response.HasStarted)
        {
            return;
        }

        context.Response.StatusCode = problem.Status ?? StatusCodes.Status500InternalServerError;
        context.Response.ContentType = "application/problem+json";
        context.Response.Headers[CorrelationIdMiddleware.HeaderName] = CorrelationIdMiddleware.Get(context);

        await context.Response.WriteAsJsonAsync(
            problem,
            SerializerOptions,
            "application/problem+json",
            cancellationToken);
    }

    private static int StatusCodeFor(ErrorType type)
        => type switch
        {
            ErrorType.Validation => StatusCodes.Status400BadRequest,
            ErrorType.NotFound => StatusCodes.Status404NotFound,
            ErrorType.Conflict => StatusCodes.Status409Conflict,
            ErrorType.Unauthorized => StatusCodes.Status401Unauthorized,
            ErrorType.Forbidden => StatusCodes.Status403Forbidden,
            _ => StatusCodes.Status500InternalServerError
        };

    private static ErrorType ErrorTypeForStatusCode(int statusCode)
        => statusCode switch
        {
            StatusCodes.Status400BadRequest => ErrorType.Validation,
            StatusCodes.Status401Unauthorized => ErrorType.Unauthorized,
            StatusCodes.Status403Forbidden => ErrorType.Forbidden,
            StatusCodes.Status404NotFound => ErrorType.NotFound,
            StatusCodes.Status409Conflict => ErrorType.Conflict,
            StatusCodes.Status422UnprocessableEntity => ErrorType.Validation,
            _ => ErrorType.Failure
        };

    private static string DefaultCode(int statusCode)
        => statusCode switch
        {
            StatusCodes.Status400BadRequest => "HANI-COMMON-4000",
            StatusCodes.Status401Unauthorized => "HANI-COMMON-4010",
            StatusCodes.Status403Forbidden => "HANI-COMMON-4030",
            StatusCodes.Status404NotFound => "HANI-COMMON-4040",
            StatusCodes.Status405MethodNotAllowed => "HANI-COMMON-4050",
            StatusCodes.Status409Conflict => "HANI-COMMON-4090",
            StatusCodes.Status415UnsupportedMediaType => "HANI-COMMON-4150",
            StatusCodes.Status422UnprocessableEntity => "HANI-COMMON-4220",
            _ => "HANI-COMMON-5000"
        };

    private static string CurrentLocale(HttpContext context)
    {
        var requestCulture = context.Features.Get<IRequestCultureFeature>()?.RequestCulture;
        var culture = requestCulture?.UICulture.Name ?? CultureInfo.CurrentUICulture.Name;
        return string.IsNullOrWhiteSpace(culture)
            ? CultureInfo.CurrentCulture.Name
            : culture;
    }

    private static string CurrentTraceId(HttpContext context)
    {
        var traceId = Activity.Current?.TraceId.ToString();
        return string.IsNullOrWhiteSpace(traceId) || traceId == Guid.Empty.ToString()
            ? context.TraceIdentifier
            : traceId;
    }

    private sealed class HaniProblemDetailsResult(ProblemDetails problem) : IResult
    {
        public Task ExecuteAsync(HttpContext context)
            => WriteAsync(context, problem, context.RequestAborted);
    }
}
