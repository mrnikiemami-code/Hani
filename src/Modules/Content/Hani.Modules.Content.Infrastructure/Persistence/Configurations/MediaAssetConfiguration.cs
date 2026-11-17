using Hani.Modules.Content.Domain.Media;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Hani.Modules.Content.Infrastructure.Persistence.Configurations;

internal sealed class MediaAssetConfiguration : IEntityTypeConfiguration<MediaAsset>
{
    public void Configure(EntityTypeBuilder<MediaAsset> builder)
    {
        builder.ToTable("media_assets");
        builder.HasKey(item => item.Id);
        builder.Property(item => item.StorageKey).HasColumnName("storage_key").HasMaxLength(500).IsRequired();
        builder.Property(item => item.OriginalFileName).HasColumnName("original_file_name").HasMaxLength(255).IsRequired();
        builder.Property(item => item.ContentType).HasColumnName("content_type").HasMaxLength(100).IsRequired();
        builder.Property(item => item.SizeBytes).HasColumnName("size_bytes");
        builder.Property(item => item.Width).HasColumnName("width");
        builder.Property(item => item.Height).HasColumnName("height");
        builder.Property(item => item.Hash).HasColumnName("hash").HasMaxLength(64).IsRequired();
        builder.Property(item => item.AltText).HasColumnName("alt_text").HasMaxLength(300).IsRequired();
        builder.Property(item => item.Caption).HasColumnName("caption").HasMaxLength(500);
        builder.Property(item => item.Credit).HasColumnName("credit").HasMaxLength(200);
        builder.Property(item => item.FolderId).HasColumnName("folder_id");
        builder.Property(item => item.Tags).HasColumnName("tags").HasColumnType("text[]");
        builder.Property(item => item.FocalX).HasColumnName("focal_x");
        builder.Property(item => item.FocalY).HasColumnName("focal_y");
        builder.Property(item => item.IsPublic).HasColumnName("is_public");
        builder.Property(item => item.CreatedAt).HasColumnName("created_at");
        builder.Property(item => item.UpdatedAt).HasColumnName("updated_at");
        builder.HasIndex(item => item.Hash);
        builder.HasMany(item => item.Variants)
            .WithOne()
            .HasForeignKey(variant => variant.MediaAssetId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}

internal sealed class MediaFolderConfiguration : IEntityTypeConfiguration<MediaFolder>
{
    public void Configure(EntityTypeBuilder<MediaFolder> builder)
    {
        builder.ToTable("media_folders");
        builder.HasKey(item => item.Id);
        builder.Property(item => item.Name).HasColumnName("name").HasMaxLength(120).IsRequired();
        builder.Property(item => item.ParentId).HasColumnName("parent_id");
        builder.Property(item => item.CreatedAt).HasColumnName("created_at");
    }
}

internal sealed class MediaVariantConfiguration : IEntityTypeConfiguration<MediaVariant>
{
    public void Configure(EntityTypeBuilder<MediaVariant> builder)
    {
        builder.ToTable("media_variants");
        builder.HasKey(item => item.Id);
        builder.Property(item => item.MediaAssetId).HasColumnName("media_asset_id");
        builder.Property(item => item.StorageKey).HasColumnName("storage_key").HasMaxLength(500).IsRequired();
        builder.Property(item => item.Format).HasColumnName("format").HasMaxLength(20).IsRequired();
        builder.Property(item => item.Width).HasColumnName("width");
        builder.Property(item => item.Height).HasColumnName("height");
        builder.Property(item => item.SizeBytes).HasColumnName("size_bytes");
        builder.Property(item => item.IsCanonical).HasColumnName("is_canonical");
        builder.HasIndex(item => new { item.MediaAssetId, item.Width });
    }
}
