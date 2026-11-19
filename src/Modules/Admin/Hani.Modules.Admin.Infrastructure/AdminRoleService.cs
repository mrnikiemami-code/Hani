using Hani.BuildingBlocks.Application;
using Hani.Modules.Admin.Application;
using Hani.Modules.Identity.Application.Security;
using Hani.Modules.Identity.Domain.Governance;
using Hani.Modules.Identity.Domain.Users;
using Microsoft.EntityFrameworkCore;

namespace Hani.Modules.Admin.Infrastructure;

internal sealed partial class AdminService : IAdminRoleService
{
    public async Task<AdminRolesDto> ListAsync(CancellationToken cancellationToken)
    {
        var grants = await identity.RolePermissionGrants
            .AsNoTracking()
            .OrderBy(item => item.Role)
            .ThenBy(item => item.Permission)
            .ToArrayAsync(cancellationToken);
        var custom = await identity.RoleDefinitions
            .AsNoTracking()
            .OrderBy(item => item.DisplayName)
            .ToArrayAsync(cancellationToken);

        var roles = Enum.GetNames<UserRole>()
            .Select(role => new AdminRoleDto(
                role,
                role,
                true,
                GetEffectivePermissions(role, grants)))
            .Concat(custom.Select(role => new AdminRoleDto(
                role.Name,
                role.DisplayName,
                false,
                GetEffectivePermissions(role.Name, grants))))
            .ToArray();

        return new AdminRolesDto(AdminPermissions.All, roles);
    }

    public async Task<IReadOnlyList<string>> GetPermissionsAsync(
        string role,
        CancellationToken cancellationToken)
    {
        var rows = await identity.RolePermissionGrants
            .AsNoTracking()
            .Where(item => item.Role == role)
            .OrderBy(item => item.Permission)
            .ToArrayAsync(cancellationToken);
        return GetEffectivePermissions(role, rows);
    }

    public async Task<Result<bool>> SavePermissionsAsync(
        string role,
        IReadOnlyList<string> permissions,
        CancellationToken cancellationToken)
    {
        if (!await RoleExistsAsync(role, cancellationToken))
        {
            return Result<bool>.Failure(Error.Validation(
                "HANI-RBAC-4001",
                "Unknown role."));
        }

        var known = permissions
            .Where(AdminPermissions.All.Contains)
            .Distinct(StringComparer.Ordinal)
            .ToHashSet(StringComparer.Ordinal);
        if (role == UserRole.Admin.ToString())
        {
            known.Add(AdminPermissions.RoleManage);
            known.Add(AdminPermissions.SettingsView);
        }

        var existing = await identity.RolePermissionGrants
            .Where(item => item.Role == role)
            .ToArrayAsync(cancellationToken);
        identity.RolePermissionGrants.RemoveRange(existing);
        foreach (var permission in known)
        {
            identity.RolePermissionGrants.Add(RolePermissionGrant.Create(ids, role, permission));
        }

        await identity.SaveChangesAsync(cancellationToken);
        return Result<bool>.Success(true);
    }

    public async Task<Result<bool>> ChangeUserRoleAsync(
        Guid userId,
        string role,
        CancellationToken cancellationToken)
    {
        if (!await RoleExistsAsync(role, cancellationToken))
        {
            return Result<bool>.Failure(Error.Validation(
                "HANI-RBAC-4001",
                "Unknown role."));
        }

        var user = await identity.Users
            .FirstOrDefaultAsync(item => item.Id == userId, cancellationToken);
        if (user is null)
        {
            return Result<bool>.Failure(Error.NotFound(
                "HANI-RBAC-4002",
                "User was not found."));
        }

        user.ChangeRole(role);
        await identity.SaveChangesAsync(cancellationToken);
        return Result<bool>.Success(true);
    }

    public async Task<Result<AdminRoleDto>> CreateRoleAsync(
        string name,
        string displayName,
        CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(name) || string.IsNullOrWhiteSpace(displayName))
        {
            return Result<AdminRoleDto>.Failure(Error.Validation(
                "HANI-RBAC-4003",
                "Role name and display name are required."));
        }

        var normalized = name.Trim();
        if (await RoleExistsAsync(normalized, cancellationToken))
        {
            return Result<AdminRoleDto>.Failure(Error.Conflict(
                "HANI-RBAC-4004",
                "A role with this name already exists."));
        }

        var role = RoleDefinition.Create(ids, normalized, displayName);
        identity.RoleDefinitions.Add(role);
        await identity.SaveChangesAsync(cancellationToken);
        return Result<AdminRoleDto>.Success(new AdminRoleDto(
            role.Name,
            role.DisplayName,
            false,
            []));
    }

    public async Task<Result<bool>> DeleteRoleAsync(
        string role,
        CancellationToken cancellationToken)
    {
        var definition = await identity.RoleDefinitions
            .FirstOrDefaultAsync(item => item.Name == role, cancellationToken);
        if (definition is null)
        {
            return Result<bool>.Failure(Error.Validation(
                "HANI-RBAC-4005",
                "Only custom roles can be deleted."));
        }

        var assigned = await identity.Users
            .AnyAsync(item => item.Role == role, cancellationToken);
        if (assigned)
        {
            return Result<bool>.Failure(Error.Conflict(
                "HANI-RBAC-4006",
                "The role is assigned to at least one user."));
        }

        var grants = await identity.RolePermissionGrants
            .Where(item => item.Role == role)
            .ToArrayAsync(cancellationToken);
        identity.RolePermissionGrants.RemoveRange(grants);
        identity.RoleDefinitions.Remove(definition);
        await identity.SaveChangesAsync(cancellationToken);
        return Result<bool>.Success(true);
    }

    private async Task<bool> RoleExistsAsync(
        string role,
        CancellationToken cancellationToken)
        => Enum.TryParse<UserRole>(role, true, out _) ||
            await identity.RoleDefinitions.AnyAsync(
                item => item.Name == role,
                cancellationToken);

    private static IReadOnlyList<string> GetEffectivePermissions(
        string role,
        IReadOnlyList<RolePermissionGrant> rows)
    {
        var assigned = rows
            .Where(item => item.Role == role)
            .Select(item => item.Permission)
            .ToArray();
        if (assigned.Length > 0)
        {
            return assigned;
        }

        return role == UserRole.Admin.ToString()
            ? AdminPermissions.All
            : [];
    }
}
