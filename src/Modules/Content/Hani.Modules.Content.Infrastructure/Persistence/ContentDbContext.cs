using Hani.Modules.Content.Domain.Content;
using Hani.Modules.Content.Domain.Dashboard;
using Hani.Modules.Content.Domain.Growth;
using Hani.Modules.Content.Domain.Media;
using Hani.Modules.Content.Domain.Settings;
using Microsoft.EntityFrameworkCore;

namespace Hani.Modules.Content.Infrastructure.Persistence;

/// <summary>
/// EF Core context for content and growth data.
/// </summary>
public sealed class ContentDbContext(DbContextOptions<ContentDbContext> options) : DbContext(options)
{
    public DbSet<ContentCategory> Categories => Set<ContentCategory>();
    public DbSet<BlogPost> BlogPosts => Set<BlogPost>();
    public DbSet<Travelogue> Travelogues => Set<Travelogue>();
    public DbSet<Video> Videos => Set<Video>();
    public DbSet<ContentComment> Comments => Set<ContentComment>();
    public DbSet<AdSlot> AdSlots => Set<AdSlot>();
    public DbSet<AdEvent> AdEvents => Set<AdEvent>();
    public DbSet<NewsletterSubscription> NewsletterSubscriptions => Set<NewsletterSubscription>();
    public DbSet<Campaign> Campaigns => Set<Campaign>();
    public DbSet<CampaignRegistration> CampaignRegistrations => Set<CampaignRegistration>();
    public DbSet<Notification> Notifications => Set<Notification>();
    public DbSet<AnalyticsEvent> AnalyticsEvents => Set<AnalyticsEvent>();
    public DbSet<UserMessage> UserMessages => Set<UserMessage>();
    public DbSet<UserDocument> UserDocuments => Set<UserDocument>();
    public DbSet<HomePageSettings> HomePageSettings => Set<HomePageSettings>();
    public DbSet<MediaAsset> MediaAssets => Set<MediaAsset>();
    public DbSet<MediaVariant> MediaVariants => Set<MediaVariant>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasDefaultSchema("content");
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ContentDbContext).Assembly);
    }
}
