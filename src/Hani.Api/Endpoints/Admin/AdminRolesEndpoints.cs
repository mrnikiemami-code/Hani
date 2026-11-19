using Hani.BuildingBlocks.AspNetCore;
using Hani.Modules.Admin.Application;

namespace Hani.Api;

/// <summary>Admin role and permission management endpoints.</summary>
public static class AdminRolesEndpoints
{
    /// <summary>Maps role and permission endpoints.</summary>
    public static IEndpointRouteBuilder MapAdminRolesEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet("/internal/v1/admin/roles", ListAsync)
            .WithTags("Internal.Admin.Roles")
            .WithName("Internal.ListAdminRoles")
            .RequireAuthorization("Admin")
            .Produces<AdminRolesDto>();

        app.MapPost("/internal/v1/admin/roles", CreateAsync)
            .WithTags("Internal.Admin.Roles")
            .WithName("Internal.CreateAdminRole")
            .RequireAuthorization("Admin")
            .Produces<AdminRoleDto>();

        app.MapPut("/internal/v1/admin/roles/{role}", SaveAsync)
            .WithTags("Internal.Admin.Roles")
            .WithName("Internal.SaveAdminRole")
            .RequireAuthorization("Admin")
            .Produces<bool>();

        app.MapDelete("/internal/v1/admin/roles/{role}", DeleteAsync)
            .WithTags("Internal.Admin.Roles")
            .WithName("Internal.DeleteAdminRole")
            .RequireAuthorization("Admin")
            .Produces<bool>();

        app.MapPost("/internal/v1/admin/users/{id:guid}/role", ChangeUserRoleAsync)
            .WithTags("Internal.Admin.Roles")
            .WithName("Internal.ChangeAdminUserRole")
            .RequireAuthorization("Admin")
            .Produces<bool>();

        return app;
    }

    private static async Task<IResult> ListAsync(
        IAdminRoleService roles,
        CancellationToken cancellationToken)
        => Results.Ok(await roles.ListAsync(cancellationToken));

    private static async Task<IResult> CreateAsync(
        AdminRoleCreateRequest request,
        HttpContext context,
        IAdminRoleService roles,
        IAdminAuditWriter audit,
        CancellationToken cancellationToken)
    {
        var result = await roles.CreateRoleAsync(
            request.Name,
            request.DisplayName,
            cancellationToken);
        if (!result.IsSuccess)
        {
            return context.ToProblem(result.Error!);
        }

        await audit.RecordAsync(
            context,
            "settings.role.created",
            "Role",
            result.Value!.Role,
            "Custom role created from the admin panel",
            after: result.Value,
            cancellationToken: cancellationToken);
        return Results.Created(
            $"/internal/v1/admin/roles/{result.Value.Role}",
            result.Value);
    }

    private static async Task<IResult> DeleteAsync(
        string role,
        HttpContext context,
        IAdminRoleService roles,
        IAdminAuditWriter audit,
        CancellationToken cancellationToken)
    {
        var result = await roles.DeleteRoleAsync(role, cancellationToken);
        if (!result.IsSuccess)
        {
            return context.ToProblem(result.Error!);
        }

        await audit.RecordAsync(
            context,
            "settings.role.deleted",
            "Role",
            role,
            "Custom role deleted from the admin panel",
            cancellationToken: cancellationToken);
        return Results.Ok(result.Value);
    }

    private static async Task<IResult> SaveAsync(
        string role,
        AdminRoleWriteRequest request,
        HttpContext context,
        IAdminRoleService roles,
        IAdminAuditWriter audit,
        CancellationToken cancellationToken)
    {
        var result = await roles.SavePermissionsAsync(
            role,
            request.Permissions,
            cancellationToken);
        if (!result.IsSuccess)
        {
            return context.ToProblem(result.Error!);
        }

        await audit.RecordAsync(
            context,
            "settings.role.updated",
            "Role",
            role,
            "Role permissions updated from the admin panel",
            after: new { request.Permissions },
            cancellationToken: cancellationToken);
        return Results.Ok(result.Value);
    }

    private static async Task<IResult> ChangeUserRoleAsync(
        Guid id,
        AdminUserRoleRequest request,
        HttpContext context,
        IAdminRoleService roles,
        IAdminAuditWriter audit,
        CancellationToken cancellationToken)
    {
        var result = await roles.ChangeUserRoleAsync(
            id,
            request.Role,
            cancellationToken);
        if (!result.IsSuccess)
        {
            return context.ToProblem(result.Error!);
        }

        await audit.RecordAsync(
            context,
            "settings.user.role_changed",
            "User",
            id.ToString(),
            "User role changed from the admin panel",
            after: new { request.Role },
            cancellationToken: cancellationToken);
        return Results.Ok(result.Value);
    }
}

/// <summary>Custom role creation request.</summary>
public sealed record AdminRoleCreateRequest(string Name, string DisplayName);

/// <summary>Role permission update request.</summary>
public sealed record AdminRoleWriteRequest(IReadOnlyList<string> Permissions);

/// <summary>User role change request.</summary>
public sealed record AdminUserRoleRequest(string Role);
