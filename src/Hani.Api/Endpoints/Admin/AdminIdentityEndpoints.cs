using System.Security.Claims;
using Hani.Modules.Admin.Application;

namespace Hani.Api;

/// <summary>Admin identity and effective permission endpoint.</summary>
public static class AdminIdentityEndpoints
{
    /// <summary>Maps the admin identity endpoint.</summary>
    public static IEndpointRouteBuilder MapAdminIdentityEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet("/internal/v1/admin/me", GetMeAsync)
            .WithTags("Internal.Admin")
            .WithName("Internal.GetAdminIdentity")
            .RequireAuthorization("Admin")
            .Produces<AdminIdentityDto>();
        return app;
    }

    private static async Task<IResult> GetMeAsync(
        HttpContext context,
        IAdminRoleService roles,
        CancellationToken cancellationToken)
    {
        var role = context.User.FindFirst(ClaimTypes.Role)?.Value ?? "Admin";
        var permissions = await roles.GetPermissionsAsync(role, cancellationToken);
        return Results.Ok(new AdminIdentityDto(role, permissions));
    }
}

/// <summary>Authenticated admin identity and effective permissions.</summary>
public sealed record AdminIdentityDto(
    string Role,
    IReadOnlyList<string> Permissions);
