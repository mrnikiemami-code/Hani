using Hani.BuildingBlocks.Application;
using Hani.BuildingBlocks.Domain;
using Hani.Modules.Identity.Application.Abstractions;
using Hani.Modules.Identity.Domain.Wishlists;

namespace Hani.Modules.Identity.Application.Commands.Wishlists;

/// <summary>Returns the authenticated user's saved products.</summary>
public sealed record GetMyWishlistQuery(Guid UserId) : IQuery<IReadOnlyList<WishlistItemDto>>;

/// <summary>Saves a product to the authenticated user's wishlist.</summary>
public sealed record AddWishlistItemCommand(Guid UserId, Guid ProductId)
    : ICommand<WishlistItemDto>;

/// <summary>Removes a product from the authenticated user's wishlist.</summary>
public sealed record RemoveWishlistItemCommand(Guid UserId, Guid ProductId) : ICommand<bool>;

/// <summary>Saved product relation.</summary>
public sealed record WishlistItemDto(Guid ProductId, DateTimeOffset CreatedAt);

internal sealed class GetMyWishlistQueryHandler(IWishlistRepository wishlist)
    : IQueryHandler<GetMyWishlistQuery, IReadOnlyList<WishlistItemDto>>
{
    public async Task<Result<IReadOnlyList<WishlistItemDto>>> Handle(
        GetMyWishlistQuery request,
        CancellationToken cancellationToken)
    {
        var items = await wishlist.ListByUserAsync(request.UserId, cancellationToken);
        return Result<IReadOnlyList<WishlistItemDto>>.Success(
            items.Select(item => new WishlistItemDto(item.ProductId, item.CreatedAt)).ToArray());
    }
}

internal sealed class AddWishlistItemCommandHandler(
    IWishlistRepository wishlist,
    IIdGenerator ids)
    : ICommandHandler<AddWishlistItemCommand, WishlistItemDto>
{
    public async Task<Result<WishlistItemDto>> Handle(
        AddWishlistItemCommand request,
        CancellationToken cancellationToken)
    {
        if (await wishlist.ExistsAsync(request.UserId, request.ProductId, cancellationToken))
        {
            return Result<WishlistItemDto>.Success(
                new WishlistItemDto(request.ProductId, DateTimeOffset.UtcNow));
        }

        var item = WishlistItem.Create(ids, request.UserId, request.ProductId);
        await wishlist.AddAsync(item, cancellationToken);
        return Result<WishlistItemDto>.Success(
            new WishlistItemDto(item.ProductId, item.CreatedAt));
    }
}

internal sealed class RemoveWishlistItemCommandHandler(IWishlistRepository wishlist)
    : ICommandHandler<RemoveWishlistItemCommand, bool>
{
    public async Task<Result<bool>> Handle(
        RemoveWishlistItemCommand request,
        CancellationToken cancellationToken)
    {
        await wishlist.RemoveAsync(request.UserId, request.ProductId, cancellationToken);
        return Result<bool>.Success(true);
    }
}
