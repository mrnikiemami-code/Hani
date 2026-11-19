using Hani.Modules.Identity.Domain.Agencies;
using Hani.Modules.Identity.Domain.ApiClients;
using Hani.Modules.Identity.Domain.Claims;
using Hani.Modules.Identity.Domain.Gamification;
using Hani.Modules.Identity.Domain.Governance;
using Hani.Modules.Identity.Domain.Media;
using Hani.Modules.Identity.Domain.Reviews;
using Hani.Modules.Identity.Domain.Security;
using Hani.Modules.Identity.Domain.Settings;
using Hani.Modules.Identity.Domain.Users;
using Hani.Modules.Identity.Domain.Wishlists;
using Microsoft.EntityFrameworkCore;

namespace Hani.Modules.Identity.Infrastructure.Persistence;

/// <summary>
/// EF Core context for the identity schema.
/// </summary>
public sealed class IdentityDbContext(DbContextOptions<IdentityDbContext> options) : DbContext(options)
{
    public DbSet<Agency> Agencies => Set<Agency>();

    public DbSet<ApiClient> ApiClients => Set<ApiClient>();

    public DbSet<User> Users => Set<User>();

    public DbSet<UserPreferences> UserPreferences => Set<UserPreferences>();

    public DbSet<WishlistItem> WishlistItems => Set<WishlistItem>();

    public DbSet<Review> Reviews => Set<Review>();

    public DbSet<OwnershipClaim> Claims => Set<OwnershipClaim>();

    public DbSet<MediaAsset> MediaAssets => Set<MediaAsset>();

    public DbSet<UserGamification> UserGamifications => Set<UserGamification>();

    public DbSet<BadgeDefinition> BadgeDefinitions => Set<BadgeDefinition>();

    public DbSet<UserBadge> UserBadges => Set<UserBadge>();

    public DbSet<SecuritySettings> SecuritySettings => Set<SecuritySettings>();

    public DbSet<AdminAuditEvent> AdminAuditEvents => Set<AdminAuditEvent>();

    public DbSet<AdminApprovalRequest> AdminApprovalRequests => Set<AdminApprovalRequest>();

    public DbSet<RolePermissionGrant> RolePermissionGrants => Set<RolePermissionGrant>();

    public DbSet<RoleDefinition> RoleDefinitions => Set<RoleDefinition>();

    public DbSet<PlatformSettings> PlatformSettings => Set<PlatformSettings>();

    /// <summary>
    /// Audit rows are append-only. Reject updates and deletes before they reach
    /// PostgreSQL so a compromised admin code path cannot rewrite history.
    /// </summary>
    public override int SaveChanges()
    {
        EnsureAuditRowsAreImmutable();
        return base.SaveChanges();
    }

    /// <summary>
    /// Audit rows are append-only. Reject updates and deletes before they reach
    /// PostgreSQL so a compromised admin code path cannot rewrite history.
    /// </summary>
    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        EnsureAuditRowsAreImmutable();
        return base.SaveChangesAsync(cancellationToken);
    }

    private void EnsureAuditRowsAreImmutable()
    {
        foreach (var entry in ChangeTracker.Entries<AdminAuditEvent>())
        {
            if (entry.State is EntityState.Modified or EntityState.Deleted)
            {
                throw new InvalidOperationException("Admin audit events are immutable.");
            }
        }
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasDefaultSchema("identity");
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(IdentityDbContext).Assembly);
    }
}
