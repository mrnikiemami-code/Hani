using System.Security.Claims;
using Hani.BuildingBlocks.Application;
using Hani.BuildingBlocks.AspNetCore;
using Hani.Modules.Identity.Application.Commands.Auth;
using MediatR;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using IResult = Microsoft.AspNetCore.Http.IResult;

namespace Hani.Modules.Identity.Presentation;

/// <summary>
/// Marketplace authentication, profile, and public author endpoints.
/// </summary>
public static class IdentityAuthEndpoints
{
    /// <summary>
    /// Maps OTP, JWT, profile, and author endpoints.
    /// </summary>
    public static IEndpointRouteBuilder MapIdentityAuthEndpoints(this IEndpointRouteBuilder app)
    {
        var auth = app.MapGroup("/market/v1/auth").WithTags("Marketplace.Identity");

        auth.MapPost("/otp/request", RequestOtpAsync)
            .WithName("Marketplace.RequestOtp")
            .Produces<RequestOtpResult>()
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status409Conflict);

        auth.MapPost("/otp/verify", VerifyOtpAsync)
            .WithName("Marketplace.VerifyOtp")
            .Produces<AuthResultDto>()
            .ProducesProblem(StatusCodes.Status400BadRequest);

        auth.MapPost("/refresh", RefreshAsync)
            .WithName("Marketplace.RefreshToken")
            .Produces<AuthResultDto>()
            .ProducesProblem(StatusCodes.Status401Unauthorized);

        auth.MapPost("/logout", LogoutAsync)
            .WithName("Marketplace.Logout")
            .RequireAuthorization("User")
            .Produces<bool>()
            .ProducesProblem(StatusCodes.Status401Unauthorized);

        auth.MapGet("/me", GetMeAsync)
            .WithName("Marketplace.GetMe")
            .RequireAuthorization("User")
            .Produces<UserDto>()
            .ProducesProblem(StatusCodes.Status401Unauthorized);

        auth.MapPut("/me", UpdateProfileAsync)
            .WithName("Marketplace.UpdateProfile")
            .RequireAuthorization("User")
            .Produces<UserDto>()
            .ProducesProblem(StatusCodes.Status400BadRequest);

        auth.MapPut("/me/username", ChangeUsernameAsync)
            .WithName("Marketplace.ChangeUsername")
            .RequireAuthorization("User")
            .Produces<UserDto>()
            .ProducesProblem(StatusCodes.Status409Conflict);

        app.MapGet("/market/v1/authors/{username}", GetAuthorAsync)
            .WithName("Marketplace.GetAuthor")
            .Produces<AuthorDto>()
            .ProducesProblem(StatusCodes.Status404NotFound);

        return app;
    }

    /// <summary>
    /// Requests a login OTP for a mobile number.
    /// </summary>
    private static async Task<IResult> RequestOtpAsync(
        RequestOtpRequest request,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(
            new RequestOtpCommand(request.Mobile),
            cancellationToken);

        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>
    /// Verifies a login OTP and returns JWT/refresh tokens.
    /// </summary>
    private static async Task<IResult> VerifyOtpAsync(
        VerifyOtpRequest request,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(
            new VerifyOtpCommand(
                request.Mobile,
                request.Code,
                request.FirstName,
                request.LastName),
            cancellationToken);

        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>
    /// Rotates an opaque refresh token and returns a new token pair.
    /// </summary>
    private static async Task<IResult> RefreshAsync(
        RefreshTokenRequest request,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(
            new RefreshTokenCommand(request.RefreshToken),
            cancellationToken);

        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>
    /// Revokes the supplied refresh token for the authenticated user.
    /// </summary>
    private static async Task<IResult> LogoutAsync(
        LogoutRequest request,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        if (!TryGetUserId(context, out var userId))
        {
            return context.ToProblem(
                Error.Unauthorized("HANI-IDENTITY-1202", "Authenticated user is required."));
        }

        var result = await sender.Send(
            new LogoutCommand(userId, request.RefreshToken),
            cancellationToken);

        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>
    /// Returns the authenticated user profile.
    /// </summary>
    private static async Task<IResult> GetMeAsync(
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        if (!TryGetUserId(context, out var userId))
        {
            return context.ToProblem(
                Error.Unauthorized("HANI-IDENTITY-1202", "Authenticated user is required."));
        }

        var result = await sender.Send(new GetMeQuery(userId), cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>
    /// Updates the authenticated user profile.
    /// </summary>
    private static async Task<IResult> UpdateProfileAsync(
        UpdateProfileRequest request,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        if (!TryGetUserId(context, out var userId))
        {
            return context.ToProblem(
                Error.Unauthorized("HANI-IDENTITY-1202", "Authenticated user is required."));
        }

        var result = await sender.Send(
            new UpdateProfileCommand(
                userId,
                request.FirstName,
                request.LastName,
                request.Email,
                request.Bio,
                request.AvatarUrl),
            cancellationToken);

        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>
    /// Changes the authenticated user's public username.
    /// </summary>
    private static async Task<IResult> ChangeUsernameAsync(
        ChangeUsernameRequest request,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        if (!TryGetUserId(context, out var userId))
        {
            return context.ToProblem(
                Error.Unauthorized("HANI-IDENTITY-1202", "Authenticated user is required."));
        }

        var result = await sender.Send(
            new ChangeUsernameCommand(userId, request.Username),
            cancellationToken);

        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>
    /// Returns a public author profile by username.
    /// </summary>
    private static async Task<IResult> GetAuthorAsync(
        string username,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(
            new GetAuthorQuery(username),
            cancellationToken);

        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    private static bool TryGetUserId(HttpContext context, out Guid userId)
    {
        var value = context.User.FindFirst("user_id")?.Value
            ?? context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value
            ?? context.User.FindFirst("sub")?.Value;
        return Guid.TryParse(value, out userId);
    }
}

/// <summary>
/// HTTP request to request an OTP.
/// </summary>
public sealed record RequestOtpRequest(string Mobile);

/// <summary>
/// HTTP request to verify an OTP.
/// </summary>
public sealed record VerifyOtpRequest(
    string Mobile,
    string Code,
    string? FirstName = null,
    string? LastName = null);

/// <summary>
/// HTTP request to exchange a refresh token.
/// </summary>
public sealed record RefreshTokenRequest(string RefreshToken);

/// <summary>
/// HTTP request to revoke a refresh token.
/// </summary>
public sealed record LogoutRequest(string RefreshToken);

/// <summary>
/// HTTP request to update the current profile.
/// </summary>
public sealed record UpdateProfileRequest(
    string FirstName,
    string LastName,
    string? Email,
    string? Bio,
    string? AvatarUrl);

/// <summary>
/// HTTP request to change the public username.
/// </summary>
public sealed record ChangeUsernameRequest(string Username);
