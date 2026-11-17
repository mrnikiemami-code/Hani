using Hani.Modules.Content.Domain.Content;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Hani.Modules.Content.Infrastructure.Persistence.Configurations;

internal sealed class ContentEntryConfiguration : IEntityTypeConfiguration<ContentEntry>
{
    public void Configure(EntityTypeBuilder<ContentEntry> builder)
    {
        builder.ToTable("content_entries");
        builder.HasKey(item => item.Id);
        builder.Property(item => item.Type).HasColumnName("type").HasConversion<string>().HasMaxLength(30);
        builder.Property(item => item.Slug).HasColumnName("slug").HasMaxLength(160).IsRequired();
        builder.Property(item => item.Locale).HasColumnName("locale").HasMaxLength(10).IsRequired();
        builder.Property(item => item.Title).HasColumnName("title").HasMaxLength(250).IsRequired();
        builder.Property(item => item.Excerpt).HasColumnName("excerpt").HasMaxLength(500);
        builder.Property(item => item.Body).HasColumnName("body").IsRequired();
        builder.Property(item => item.HeroMediaId).HasColumnName("hero_media_id");
        builder.Property(item => item.HeroImageUrl).HasColumnName("hero_image_url").HasMaxLength(1000);
        builder.Property(item => item.SeoTitle).HasColumnName("seo_title").HasMaxLength(250);
        builder.Property(item => item.SeoDescription).HasColumnName("seo_description").HasMaxLength(500);
        builder.Property(item => item.Status).HasColumnName("status").HasConversion<string>().HasMaxLength(30);
        builder.Property(item => item.PublishedAt).HasColumnName("published_at");
        builder.Property(item => item.CreatedAt).HasColumnName("created_at");
        builder.Property(item => item.UpdatedAt).HasColumnName("updated_at");
        builder.HasIndex(item => new { item.Type, item.Locale, item.Slug }).IsUnique();
        builder.HasMany(item => item.Revisions)
            .WithOne()
            .HasForeignKey(revision => revision.ContentEntryId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}

internal sealed class ContentEntryRevisionConfiguration : IEntityTypeConfiguration<ContentEntryRevision>
{
    public void Configure(EntityTypeBuilder<ContentEntryRevision> builder)
    {
        builder.ToTable("content_entry_revisions");
        builder.HasKey(item => item.Id);
        builder.Property(item => item.ContentEntryId).HasColumnName("content_entry_id");
        builder.Property(item => item.Title).HasColumnName("title").HasMaxLength(250).IsRequired();
        builder.Property(item => item.Excerpt).HasColumnName("excerpt").HasMaxLength(500);
        builder.Property(item => item.Body).HasColumnName("body").IsRequired();
        builder.Property(item => item.HeroMediaId).HasColumnName("hero_media_id");
        builder.Property(item => item.HeroImageUrl).HasColumnName("hero_image_url").HasMaxLength(1000);
        builder.Property(item => item.SeoTitle).HasColumnName("seo_title").HasMaxLength(250);
        builder.Property(item => item.SeoDescription).HasColumnName("seo_description").HasMaxLength(500);
        builder.Property(item => item.CapturedAt).HasColumnName("captured_at");
    }
}
