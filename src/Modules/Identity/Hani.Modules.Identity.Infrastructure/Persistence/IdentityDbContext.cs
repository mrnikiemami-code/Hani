using Hani.Modules.Identity.Domain.Agencies;
using Hani.Modules.Identity.Domain.ApiClients;
using Hani.Modules.Identity.Domain.Claims;
using Hani.Modules.Identity.Domain.Media;
using Hani.Modules.Identity.Domain.Reviews;
using Hani.Modules.Identity.Domain.Users;
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

    public DbSet<Review> Reviews => Set<Review>();

    public DbSet<OwnershipClaim> Claims => Set<OwnershipClaim>();

    public DbSet<MediaAsset> MediaAssets => Set<MediaAsset>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasDefaultSchema("identity");
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(IdentityDbContext).Assembly);
    }
}
