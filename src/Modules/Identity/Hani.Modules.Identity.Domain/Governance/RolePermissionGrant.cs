using Hani.BuildingBlocks.Domain;

namespace Hani.Modules.Identity.Domain.Governance;

/// <summary>
/// One permission granted to an administrative role. Roles may be built-in
/// or custom; permissions are stable codes from the admin catalog.
/// </summary>
public sealed class RolePermissionGrant : AggregateRoot<Guid>
{
    private RolePermissionGrant()
    {
    }

    private RolePermissionGrant(Guid id, string role, string permission, DateTimeOffset createdAt)
        : base(id)
    {
        Role = role.Trim();
        Permission = permission.Trim();
        CreatedAt = createdAt;
    }

    /// <summary>Role name.</summary>
    public string Role { get; private set; } = string.Empty;

    /// <summary>Permission code.</summary>
    public string Permission { get; private set; } = string.Empty;

    /// <summary>Creation time.</summary>
    public DateTimeOffset CreatedAt { get; private set; }

    /// <summary>Creates a role permission grant.</summary>
    public static RolePermissionGrant Create(
        IIdGenerator ids,
        string role,
        string permission,
        DateTimeOffset? now = null)
    {
        if (string.IsNullOrWhiteSpace(role) || string.IsNullOrWhiteSpace(permission))
        {
            throw new ArgumentException("Role and permission are required.");
        }

        return new RolePermissionGrant(
            ids.NewId(),
            role,
            permission,
            now ?? DateTimeOffset.UtcNow);
    }
}
