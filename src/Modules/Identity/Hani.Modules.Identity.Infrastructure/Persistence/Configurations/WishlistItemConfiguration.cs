using Hani.Modules.Identity.Domain.Wishlists;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Hani.Modules.Identity.Infrastructure.Persistence.Configurations;

internal sealed class WishlistItemConfiguration : IEntityTypeConfiguration<WishlistItem>
{
    public void Configure(EntityTypeBuilder<WishlistItem> builder)
    {
        builder.ToTable("wishlist_items");
        builder.HasKey(item => item.Id);
        builder.Property(item => item.Id).HasColumnName("id").ValueGeneratedNever();
        builder.Property(item => item.UserId).HasColumnName("user_id").IsRequired();
        builder.Property(item => item.ProductId).HasColumnName("product_id").IsRequired();
        builder.Property(item => item.CreatedAt).HasColumnName("created_at").IsRequired();

        builder.HasIndex(item => new { item.UserId, item.ProductId })
            .IsUnique()
            .HasDatabaseName("ux_wishlist_items_user_product");
        builder.HasIndex(item => new { item.UserId, item.CreatedAt })
            .HasDatabaseName("ix_wishlist_items_user_created");
    }
}
