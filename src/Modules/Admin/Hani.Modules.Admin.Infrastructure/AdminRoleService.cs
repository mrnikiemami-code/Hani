using Hani.BuildingBlocks.Application;
using Hani.Modules.Admin.Application;
using Hani.Modules.Identity.Domain.Governance;
using Hani.Modules.Identity.Domain.Users;
using Microsoft.EntityFrameworkCore;

namespace Hani.Modules.Admin.Infrastructure;

internal sealed partial class AdminService : IAdminRoleService
{
    public async Task<AdminRolesDto> ListAsync(CancellationToken cancellationToken)
    {
        var rows = await identity.RolePermissionGrants
            .AsNoTracking()
            .OrderBy(item => item.Role)
            .ThenBy(item => item.Permission)
            .ToArrayAsync(cancellationToken);
        var roles = Enum.GetNames<UserRole>()
            .Select(role => new AdminRoleDto(
                role,
                GetEffectivePermissions(role, rows)))
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
        if (!Enum.TryParse<UserRole>(role, true, out var parsedRole))
        {
            return Result<bool>.Failure(Error.Validation(
                "HANI-RBAC-4001",
                "Unknown role."));
        }

        var normalizedRole = parsedRole.ToString();
        var known = permissions
            .Where(AdminPermissions.All.Contains)
            .Distinct(StringComparer.Ordinal)
            .ToHashSet(StringComparer.Ordinal);
        if (normalizedRole == UserRole.Admin.ToString())
        {
            known.Add(AdminPermissions.RoleManage);
            known.Add(AdminPermissions.SettingsView);
        }

        var existing = await identity.RolePermissionGrants
            .Where(item => item.Role == normalizedRole)
            .ToArrayAsync(cancellationToken);
        identity.RolePermissionGrants.RemoveRange(existing);
        foreach (var permission in known)
        {
            identity.RolePermissionGrants.Add(RolePermissionGrant.Create(
                ids,
                normalizedRole,
                permission));
        }

        await identity.SaveChangesAsync(cancellationToken);
        return Result<bool>.Success(true);
    }

    public async Task<Result<bool>> ChangeUserRoleAsync(
        Guid userId,
        string role,
        CancellationToken cancellationToken)
    {
        if (!Enum.TryParse<UserRole>(role, true, out var parsedRole))
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

        user.ChangeRole(parsedRole);
        await identity.SaveChangesAsync(cancellationToken);
        return Result<bool>.Success(true);
    }

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
