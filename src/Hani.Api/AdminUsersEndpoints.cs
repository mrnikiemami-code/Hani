using Hani.Modules.Admin.Application;
using Microsoft.AspNetCore.Mvc;

namespace Hani.Api;

/// <summary>Read-only admin user directory endpoint.</summary>
public static class AdminUsersEndpoints
{
    /// <summary>Maps admin user directory endpoints.</summary>
    public static IEndpointRouteBuilder MapAdminUsersEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet("/internal/v1/admin/users", ListAsync)
            .WithTags("Internal.Admin")
            .WithName("Internal.ListAdminUsers")
            .RequireAuthorization("Admin")
            .Produces<PagedAdminUsersResponse>();
        return app;
    }

    private static async Task<IResult> ListAsync(
        [FromQuery] int page,
        [FromQuery] int pageSize,
        [FromQuery] string? q,
        [FromQuery] string? role,
        [FromQuery] string? status,
        IAdminUserService users,
        CancellationToken cancellationToken)
    {
        var result = await users.ListUsersAsync(
            page,
            pageSize,
            q,
            role,
            status,
            cancellationToken);
        return Results.Ok(result);
    }
}
