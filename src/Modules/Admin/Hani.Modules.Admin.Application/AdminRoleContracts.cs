using Hani.BuildingBlocks.Application;

namespace Hani.Modules.Admin.Application;

/// <summary>Role permissions row.</summary>
public sealed record AdminRoleDto(
    string Role,
    string DisplayName,
    bool IsSystem,
    IReadOnlyList<string> Permissions);

/// <summary>Role and permission catalog.</summary>
public sealed record AdminRolesDto(
    IReadOnlyList<string> PermissionCatalog,
    IReadOnlyList<AdminRoleDto> Roles);

/// <summary>Admin role and permission service.</summary>
public interface IAdminRoleService
{
    Task<AdminRolesDto> ListAsync(CancellationToken cancellationToken);
    Task<IReadOnlyList<string>> GetPermissionsAsync(
        string role,
        CancellationToken cancellationToken);
    Task<Result<bool>> SavePermissionsAsync(
        string role,
        IReadOnlyList<string> permissions,
        CancellationToken cancellationToken);
    Task<Result<bool>> ChangeUserRoleAsync(
        Guid userId,
        string role,
        CancellationToken cancellationToken);
    Task<Result<AdminRoleDto>> CreateRoleAsync(
        string name,
        string displayName,
        CancellationToken cancellationToken);
    Task<Result<bool>> DeleteRoleAsync(
        string role,
        CancellationToken cancellationToken);
}
