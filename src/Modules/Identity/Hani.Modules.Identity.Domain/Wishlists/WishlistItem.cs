using Hani.BuildingBlocks.Domain;

namespace Hani.Modules.Identity.Domain.Wishlists;

/// <summary>
/// One product saved to a user's wishlist. Product data stays in Catalog; this
/// entity only stores the authenticated user-to-product relation.
/// </summary>
public sealed class WishlistItem : Entity<Guid>
{
    private WishlistItem()
    {
    }

    private WishlistItem(Guid id, Guid userId, Guid productId, DateTimeOffset createdAt)
        : base(id)
    {
        UserId = userId;
        ProductId = productId;
        CreatedAt = createdAt;
    }

    /// <summary>Owner user id.</summary>
    public Guid UserId { get; private set; }

    /// <summary>Saved tour product id.</summary>
    public Guid ProductId { get; private set; }

    /// <summary>Time the product was saved.</summary>
    public DateTimeOffset CreatedAt { get; private set; }

    /// <summary>Creates a wishlist item.</summary>
    public static WishlistItem Create(
        IIdGenerator ids,
        Guid userId,
        Guid productId,
        DateTimeOffset? now = null)
    {
        if (userId == Guid.Empty || productId == Guid.Empty)
        {
            throw new ArgumentException("User and product ids are required.");
        }

        return new WishlistItem(ids.NewId(), userId, productId, now ?? DateTimeOffset.UtcNow);
    }
}
