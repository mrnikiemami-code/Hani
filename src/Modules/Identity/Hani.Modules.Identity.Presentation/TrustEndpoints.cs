using Hani.Modules.Identity.Application;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Options;
using IResult = Microsoft.AspNetCore.Http.IResult;

namespace Hani.Modules.Identity.Presentation;

/// <summary>
/// Public trust and support endpoints.
/// </summary>
public static class TrustEndpoints
{
    /// <summary>
    /// Maps public trust information.
    /// </summary>
    public static IEndpointRouteBuilder MapTrustEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet("/market/v1/trust", GetTrustAsync)
            .WithName("Marketplace.GetTrust")
            .Produces<TrustDto>();

        return app;
    }

    private static IResult GetTrustAsync(IOptions<TrustOptions> options)
    {
        var value = options.Value;
        return Results.Ok(new TrustDto(
            value.SupportPhone,
            value.SupportEmail,
            value.EnamadUrl,
            value.TermsUrl,
            value.AboutUrl));
    }
}

/// <summary>
/// Public trust information.
/// </summary>
public sealed record TrustDto(
    string SupportPhone,
    string SupportEmail,
    string EnamadUrl,
    string TermsUrl,
    string AboutUrl);
