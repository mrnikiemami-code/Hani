using Hani.BuildingBlocks.Application;
using Microsoft.AspNetCore.Http;
using IResult = Microsoft.AspNetCore.Http.IResult;

namespace Hani.BuildingBlocks.AspNetCore;

/// <summary>
/// Endpoint helpers that force all error output through <see cref="HaniProblemDetails"/>.
/// </summary>
public static class ProblemDetailsEndpointExtensions
{
    /// <summary>
    /// Converts an application error to the central problem-details result.
    /// </summary>
    public static IResult ToProblem(this HttpContext context, Error error)
        => HaniProblemDetails.ToResult(context, error);

    /// <summary>
    /// Returns the standard 401 problem used when the tenant context cannot be resolved.
    /// </summary>
    public static IResult TenantRequiredProblem(this HttpContext context)
        => context.ToProblem(Error.Unauthorized(
            "HANI-COMMON-4010",
            "Tenant context is required."));
}
