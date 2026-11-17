using Hani.BuildingBlocks.AspNetCore;
using Hani.Modules.Identity.Application.Security;
using Microsoft.AspNetCore.Mvc;
using IResult = Microsoft.AspNetCore.Http.IResult;

namespace Hani.Api;

/// <summary>
/// Admin-only OTP security policy and rate-limit controls.
/// </summary>
public static class SecurityEndpoints
{
    /// <summary>Maps OTP security administration endpoints.</summary>
    public static IEndpointRouteBuilder MapSecurityEndpoints(this IEndpointRouteBuilder app)
    {
        var security = app.MapGroup("/internal/v1/security/otp")
            .WithTags("Internal.Security")
            .RequireAuthorization("Admin");

        security.MapGet("", GetOtpSettingsAsync)
            .WithName("Internal.GetOtpSecuritySettings")
            .Produces<OtpSecurityConfig>();

        security.MapPut("", UpdateOtpSettingsAsync)
            .WithName("Internal.UpdateOtpSecuritySettings")
            .Produces<OtpSecurityConfig>()
            .ProducesProblem(StatusCodes.Status400BadRequest);

        security.MapPost("/unlock", UnlockAsync)
            .WithName("Internal.UnlockOtpSecurity")
            .Produces(StatusCodes.Status204NoContent);

        return app;
    }

    private static async Task<IResult> GetOtpSettingsAsync(
        IOtpSecuritySettingsService service,
        CancellationToken cancellationToken)
        => Results.Ok(await service.GetAsync(cancellationToken));

    private static async Task<IResult> UpdateOtpSettingsAsync(
        OtpSecurityConfig request,
        IOtpSecuritySettingsService service,
        CancellationToken cancellationToken)
    {
        var normalized = request.Normalize();
        var updated = await service.UpdateAsync(normalized, cancellationToken);
        return Results.Ok(updated);
    }

    private static async Task<IResult> UnlockAsync(
        [FromBody] OtpUnlockRequest request,
        IOtpSecurityState state,
        CancellationToken cancellationToken)
    {
        await state.ResetAsync(request.Mobile, request.IpAddress, cancellationToken);
        return Results.NoContent();
    }
}

/// <summary>Admin request to clear a mobile or IP OTP block.</summary>
public sealed record OtpUnlockRequest(string? Mobile, string? IpAddress);
