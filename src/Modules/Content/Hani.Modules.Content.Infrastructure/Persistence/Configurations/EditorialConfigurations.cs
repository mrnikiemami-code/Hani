using Hani.Modules.Content.Domain.Content;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Hani.Modules.Content.Infrastructure.Persistence.Configurations;

internal sealed class ContentCategoryConfiguration : IEntityTypeConfiguration<ContentCategory>
{
    public void Configure(EntityTypeBuilder<ContentCategory> builder)
    {
        builder.ToTable("content_categories");
        builder.HasKey(item => item.Id);
        builder.Property(item => item.Id).HasColumnName("id");
        builder.Property(item => item.Slug).HasColumnName("slug").HasMaxLength(120).IsRequired();
        builder.Property(item => item.Type).HasColumnName("type").HasConversion<string>().HasMaxLength(32).IsRequired();
        builder.Property(item => item.IsActive).HasColumnName("is_active").IsRequired();
        builder.Property(item => item.CreatedAt).HasColumnName("created_at").IsRequired();
        builder.HasIndex(item => new { item.Type, item.Slug }).IsUnique().HasDatabaseName("ux_content_categories_type_slug");
        builder.OwnsMany(item => item.Translations, translations =>
        {
            translations.ToTable("content_category_translations");
            translations.WithOwner().HasForeignKey(item => item.CategoryId);
            translations.HasKey(item => item.Id);
            translations.Property(item => item.Id).HasColumnName("id").ValueGeneratedNever();
            translations.Property(item => item.CategoryId).HasColumnName("category_id");
            translations.Property(item => item.Locale).HasColumnName("locale").HasMaxLength(10).IsRequired();
            translations.Property(item => item.Name).HasColumnName("name").HasMaxLength(200).IsRequired();
            translations.HasIndex(item => new { item.CategoryId, item.Locale }).IsUnique();
            translations.UsePropertyAccessMode(PropertyAccessMode.Field);
        });
    }
}

internal sealed class BlogPostConfiguration : IEntityTypeConfiguration<BlogPost>
{
    public void Configure(EntityTypeBuilder<BlogPost> builder)
    {
        builder.ToTable("blog_posts");
        builder.HasKey(item => item.Id);
        builder.Property(item => item.Id).HasColumnName("id");
        builder.Property(item => item.Slug).HasColumnName("slug").HasMaxLength(180).IsRequired();
        builder.Property(item => item.AuthorUserId).HasColumnName("author_user_id").IsRequired();
        builder.Property(item => item.CategoryId).HasColumnName("category_id");
        builder.Property(item => item.CoverUrl).HasColumnName("cover_url").HasMaxLength(1000);
        builder.Property(item => item.Status).HasColumnName("status").HasConversion<string>().HasMaxLength(32).IsRequired();
        builder.Property(item => item.ViewCount).HasColumnName("view_count").IsRequired();
        builder.Property(item => item.LikeCount).HasColumnName("like_count").IsRequired();
        builder.Property(item => item.PublishedAt).HasColumnName("published_at");
        builder.Property(item => item.CreatedAt).HasColumnName("created_at").IsRequired();
        builder.Property(item => item.UpdatedAt).HasColumnName("updated_at").IsRequired();
        builder.HasIndex(item => item.Slug).IsUnique().HasDatabaseName("ux_blog_posts_slug");
        builder.HasIndex(item => item.Status).HasDatabaseName("ix_blog_posts_status");
        builder.OwnsMany(item => item.Translations, translations =>
        {
            translations.ToTable("blog_post_translations");
            translations.WithOwner().HasForeignKey(item => item.PostId);
            translations.HasKey(item => item.Id);
            translations.Property(item => item.Id).HasColumnName("id").ValueGeneratedNever();
            translations.Property(item => item.PostId).HasColumnName("post_id");
            translations.Property(item => item.Locale).HasColumnName("locale").HasMaxLength(10).IsRequired();
            translations.Property(item => item.Title).HasColumnName("title").HasMaxLength(300).IsRequired();
            translations.Property(item => item.Excerpt).HasColumnName("excerpt").HasColumnType("text").IsRequired();
            translations.Property(item => item.Body).HasColumnName("body").HasColumnType("text").IsRequired();
            translations.Property(item => item.SeoTitle).HasColumnName("seo_title").HasMaxLength(300);
            translations.Property(item => item.SeoDescription).HasColumnName("seo_description").HasMaxLength(500);
            translations.HasIndex(item => new { item.PostId, item.Locale }).IsUnique();
            translations.UsePropertyAccessMode(PropertyAccessMode.Field);
        });
    }
}

internal sealed class TravelogueConfiguration : IEntityTypeConfiguration<Travelogue>
{
    public void Configure(EntityTypeBuilder<Travelogue> builder)
    {
        builder.ToTable("travelogues");
        builder.HasKey(item => item.Id);
        builder.Property(item => item.Id).HasColumnName("id");
        builder.Property(item => item.Slug).HasColumnName("slug").HasMaxLength(180).IsRequired();
        builder.Property(item => item.AuthorUserId).HasColumnName("author_user_id").IsRequired();
        builder.Property(item => item.SeriesName).HasColumnName("series_name").HasMaxLength(200);
        builder.Property(item => item.CoverUrl).HasColumnName("cover_url").HasMaxLength(1000);
        builder.Property(item => item.Status).HasColumnName("status").HasConversion<string>().HasMaxLength(32).IsRequired();
        builder.Property(item => item.ViewCount).HasColumnName("view_count").IsRequired();
        builder.Property(item => item.LikeCount).HasColumnName("like_count").IsRequired();
        builder.Property(item => item.PublishedAt).HasColumnName("published_at");
        builder.Property(item => item.CreatedAt).HasColumnName("created_at").IsRequired();
        builder.Property(item => item.UpdatedAt).HasColumnName("updated_at").IsRequired();
        builder.HasIndex(item => item.Slug).IsUnique().HasDatabaseName("ux_travelogues_slug");
        builder.HasIndex(item => item.Status).HasDatabaseName("ix_travelogues_status");
        builder.OwnsMany(item => item.Translations, translations =>
        {
            translations.ToTable("travelogue_translations");
            translations.WithOwner().HasForeignKey(item => item.TravelogueId);
            translations.HasKey(item => item.Id);
            translations.Property(item => item.Id).HasColumnName("id").ValueGeneratedNever();
            translations.Property(item => item.TravelogueId).HasColumnName("travelogue_id");
            translations.Property(item => item.Locale).HasColumnName("locale").HasMaxLength(10).IsRequired();
            translations.Property(item => item.Title).HasColumnName("title").HasMaxLength(300).IsRequired();
            translations.Property(item => item.Body).HasColumnName("body").HasColumnType("text").IsRequired();
            translations.Property(item => item.SeoTitle).HasColumnName("seo_title").HasMaxLength(300);
            translations.Property(item => item.SeoDescription).HasColumnName("seo_description").HasMaxLength(500);
            translations.HasIndex(item => new { item.TravelogueId, item.Locale }).IsUnique();
            translations.UsePropertyAccessMode(PropertyAccessMode.Field);
        });
        builder.OwnsMany(item => item.Destinations, destinations =>
        {
            destinations.ToTable("travelogue_destinations");
            destinations.WithOwner().HasForeignKey(item => item.TravelogueId);
            destinations.HasKey(item => item.Id);
            destinations.Property(item => item.Id).HasColumnName("id").ValueGeneratedNever();
            destinations.Property(item => item.TravelogueId).HasColumnName("travelogue_id");
            destinations.Property(item => item.DestinationId).HasColumnName("destination_id").IsRequired();
            destinations.HasIndex(item => new { item.TravelogueId, item.DestinationId }).IsUnique();
            destinations.UsePropertyAccessMode(PropertyAccessMode.Field);
        });
    }
}

internal sealed class VideoConfiguration : IEntityTypeConfiguration<Video>
{
    public void Configure(EntityTypeBuilder<Video> builder)
    {
        builder.ToTable("videos");
        builder.HasKey(item => item.Id);
        builder.Property(item => item.Id).HasColumnName("id");
        builder.Property(item => item.Slug).HasColumnName("slug").HasMaxLength(180).IsRequired();
        builder.Property(item => item.AuthorUserId).HasColumnName("author_user_id").IsRequired();
        builder.Property(item => item.CategoryId).HasColumnName("category_id");
        builder.Property(item => item.VideoUrl).HasColumnName("video_url").HasMaxLength(2000).IsRequired();
        builder.Property(item => item.Provider).HasColumnName("provider").HasMaxLength(32).IsRequired();
        builder.Property(item => item.CoverUrl).HasColumnName("cover_url").HasMaxLength(1000);
        builder.Property(item => item.DurationSeconds).HasColumnName("duration_seconds").IsRequired();
        builder.Property(item => item.Level).HasColumnName("level").IsRequired();
        builder.Property(item => item.Status).HasColumnName("status").HasConversion<string>().HasMaxLength(32).IsRequired();
        builder.Property(item => item.ViewCount).HasColumnName("view_count").IsRequired();
        builder.Property(item => item.LikeCount).HasColumnName("like_count").IsRequired();
        builder.Property(item => item.PublishedAt).HasColumnName("published_at");
        builder.Property(item => item.CreatedAt).HasColumnName("created_at").IsRequired();
        builder.Property(item => item.UpdatedAt).HasColumnName("updated_at").IsRequired();
        builder.HasIndex(item => item.Slug).IsUnique().HasDatabaseName("ux_videos_slug");
        builder.HasIndex(item => item.Status).HasDatabaseName("ix_videos_status");
        builder.OwnsMany(item => item.Translations, translations =>
        {
            translations.ToTable("video_translations");
            translations.WithOwner().HasForeignKey(item => item.VideoId);
            translations.HasKey(item => item.Id);
            translations.Property(item => item.Id).HasColumnName("id").ValueGeneratedNever();
            translations.Property(item => item.VideoId).HasColumnName("video_id");
            translations.Property(item => item.Locale).HasColumnName("locale").HasMaxLength(10).IsRequired();
            translations.Property(item => item.Title).HasColumnName("title").HasMaxLength(300).IsRequired();
            translations.Property(item => item.Description).HasColumnName("description").HasColumnType("text").IsRequired();
            translations.Property(item => item.SeoTitle).HasColumnName("seo_title").HasMaxLength(300);
            translations.Property(item => item.SeoDescription).HasColumnName("seo_description").HasMaxLength(500);
            translations.HasIndex(item => new { item.VideoId, item.Locale }).IsUnique();
            translations.UsePropertyAccessMode(PropertyAccessMode.Field);
        });
    }
}

internal sealed class ContentCommentConfiguration : IEntityTypeConfiguration<ContentComment>
{
    public void Configure(EntityTypeBuilder<ContentComment> builder)
    {
        builder.ToTable("content_comments");
        builder.HasKey(item => item.Id);
        builder.Property(item => item.Id).HasColumnName("id");
        builder.Property(item => item.ContentType).HasColumnName("content_type").HasConversion<string>().HasMaxLength(32).IsRequired();
        builder.Property(item => item.ContentId).HasColumnName("content_id").IsRequired();
        builder.Property(item => item.UserId).HasColumnName("user_id");
        builder.Property(item => item.AuthorName).HasColumnName("author_name").HasMaxLength(200).IsRequired();
        builder.Property(item => item.Body).HasColumnName("body").HasColumnType("text").IsRequired();
        builder.Property(item => item.ParentId).HasColumnName("parent_id");
        builder.Property(item => item.Status).HasColumnName("status").HasConversion<string>().HasMaxLength(32).IsRequired();
        builder.Property(item => item.CreatedAt).HasColumnName("created_at").IsRequired();
        builder.HasIndex(item => new { item.ContentType, item.ContentId, item.Status }).HasDatabaseName("ix_content_comments_target_status");
    }
}
