using Hani.BuildingBlocks.Domain;

namespace Hani.Modules.Identity.Domain.Governance;

/// <summary>
/// Custom RBAC role. System roles are built into the application; custom roles
/// are stored here and can be assigned to users.
/// </summary>
public sealed class RoleDefinition : AggregateRoot<Guid>
{
    private RoleDefinition()
    {
    }

    private RoleDefinition(
        Guid id,
        string name,
        string displayName,
        DateTimeOffset createdAt) : base(id)
    {
        Name = name;
        DisplayName = displayName;
        CreatedAt = createdAt;
    }

    /// <summary>Stable role name used in JWT and permission grants.</summary>
    public string Name { get; private set; } = string.Empty;

    /// <summary>Human-readable label.</summary>
    public string DisplayName { get; private set; } = string.Empty;

    /// <summary>Whether this is a built-in role.</summary>
    public bool IsSystem { get; private set; }

    /// <summary>Creation time.</summary>
    public DateTimeOffset CreatedAt { get; private set; }

    /// <summary>Creates a custom role.</summary>
    public static RoleDefinition Create(
        IIdGenerator ids,
        string name,
        string displayName,
        DateTimeOffset? now = null)
    {
        if (string.IsNullOrWhiteSpace(name) || string.IsNullOrWhiteSpace(displayName))
        {
            throw new ArgumentException("Role name and display name are required.");
        }

        return new RoleDefinition(
            ids.NewId(),
            name.Trim(),
            displayName.Trim(),
            now ?? DateTimeOffset.UtcNow);
    }
}
