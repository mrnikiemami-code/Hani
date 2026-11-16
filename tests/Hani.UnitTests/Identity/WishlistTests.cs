using Hani.Modules.Identity.Application.Abstractions;
using Hani.Modules.Identity.Application.Commands.Wishlists;
using Hani.Modules.Identity.Domain.Wishlists;
using Shouldly;

namespace Hani.UnitTests.Identity;

public sealed class WishlistTests
{
    [Fact]
    public async Task AddWishlistItem_Should_Be_Idempotent()
    {
        var repository = new FakeWishlistRepository();
        var handler = new AddWishlistItemCommandHandler(repository, TestIds.Generator);
        var userId = Guid.CreateVersion7();
        var productId = Guid.CreateVersion7();

        await handler.Handle(
            new AddWishlistItemCommand(userId, productId),
            CancellationToken.None);
        await handler.Handle(
            new AddWishlistItemCommand(userId, productId),
            CancellationToken.None);

        repository.Items.Count.ShouldBe(1);
        repository.Items.Single().ProductId.ShouldBe(productId);
    }

    [Fact]
    public async Task RemoveWishlistItem_Should_Delete_Relation()
    {
        var repository = new FakeWishlistRepository();
        var add = new AddWishlistItemCommandHandler(repository, TestIds.Generator);
        var remove = new RemoveWishlistItemCommandHandler(repository);
        var userId = Guid.CreateVersion7();
        var productId = Guid.CreateVersion7();

        await add.Handle(new AddWishlistItemCommand(userId, productId), CancellationToken.None);
        await remove.Handle(new RemoveWishlistItemCommand(userId, productId), CancellationToken.None);

        repository.Items.ShouldBeEmpty();
    }

    private sealed class FakeWishlistRepository : IWishlistRepository
    {
        public List<WishlistItem> Items { get; } = [];

        public Task<IReadOnlyList<WishlistItem>> ListByUserAsync(
            Guid userId,
            CancellationToken cancellationToken)
            => Task.FromResult<IReadOnlyList<WishlistItem>>(
                Items.Where(item => item.UserId == userId).ToArray());

        public Task<bool> ExistsAsync(
            Guid userId,
            Guid productId,
            CancellationToken cancellationToken)
            => Task.FromResult(Items.Any(
                item => item.UserId == userId && item.ProductId == productId));

        public Task AddAsync(WishlistItem item, CancellationToken cancellationToken)
        {
            Items.Add(item);
            return Task.CompletedTask;
        }

        public Task RemoveAsync(
            Guid userId,
            Guid productId,
            CancellationToken cancellationToken)
        {
            Items.RemoveAll(item => item.UserId == userId && item.ProductId == productId);
            return Task.CompletedTask;
        }
    }
}
