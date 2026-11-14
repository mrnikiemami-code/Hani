using Hani.Modules.Identity.Domain.Media;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Hani.Modules.Identity.Infrastructure.Persistence.Configurations;

internal sealed class MediaAssetConfiguration : IEntityTypeConfiguration<MediaAsset>
{
    public void Configure(EntityTypeBuilder<MediaAsset> builder)
    {
        builder.ToTable("media_assets");

        builder.HasKey(asset => asset.Id);
        builder.Property(asset => asset.Id).HasColumnName("id");
        builder.Property(asset => asset.OwnerUserId).HasColumnName("owner_user_id").IsRequired();
        builder.Property(asset => asset.Url).HasColumnName("url").HasMaxLength(1000).IsRequired();
        builder.Property(asset => asset.ContentType).HasColumnName("content_type").HasMaxLength(100).IsRequired();
        builder.Property(asset => asset.SizeBytes).HasColumnName("size_bytes").IsRequired();
        builder.Property(asset => asset.Kind).HasColumnName("kind").HasConversion<string>().HasMaxLength(32).IsRequired();
        builder.Property(asset => asset.Status).HasColumnName("status").HasConversion<string>().HasMaxLength(32).IsRequired();
        builder.Property(asset => asset.CreatedAt).HasColumnName("created_at").IsRequired();
        builder.Property(asset => asset.ModeratedAt).HasColumnName("moderated_at");
        builder.Property(asset => asset.RejectionReason).HasColumnName("rejection_reason").HasMaxLength(500);

        builder.HasIndex(asset => asset.Status)
            .HasDatabaseName("ix_media_assets_status");
        builder.HasIndex(asset => asset.OwnerUserId)
            .HasDatabaseName("ix_media_assets_owner_user_id");
    }
}
