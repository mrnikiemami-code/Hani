using System.Security.Claims;
using Hani.BuildingBlocks.Application;
using Hani.BuildingBlocks.AspNetCore;
using Hani.Contracts.Catalog;
using Hani.Contracts.Supply;
using Hani.Modules.Identity.Application.Commands.Wishlists;
using MediatR;
using IResult = Microsoft.AspNetCore.Http.IResult;

namespace Hani.Api;

/// <summary>
/// Authenticated traveler wishlist endpoints. Product data is read from Catalog
/// so Identity stores only the user-to-product relation.
/// </summary>
public static class WishlistEndpoints
{
    /// <summary>Maps wishlist endpoints.</summary>
    public static IEndpointRouteBuilder MapWishlistEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/market/v1/me/wishlist").WithTags("Marketplace.Wishlist");

        group.MapGet("/", GetAsync)
            .WithName("Marketplace.GetMyWishlist")
            .RequireAuthorization("User")
            .Produces<IReadOnlyList<WishlistProductDto>>()
            .ProducesProblem(StatusCodes.Status401Unauthorized);

        group.MapPost("/{productId:guid}", AddAsync)
            .WithName("Marketplace.AddMyWishlistItem")
            .RequireAuthorization("User")
            .Produces<WishlistItemDto>(StatusCodes.Status201Created)
            .ProducesProblem(StatusCodes.Status404NotFound);

        group.MapDelete("/{productId:guid}", RemoveAsync)
            .WithName("Marketplace.RemoveMyWishlistItem")
            .RequireAuthorization("User")
            .Produces(StatusCodes.Status204NoContent);

        return app;
    }

    /// <summary>
    /// Returns enriched saved tours for the authenticated user.
    /// </summary>
    private static async Task<IResult> GetAsync(
        string? locale,
        HttpContext context,
        ISender sender,
        ICatalogReadService catalog,
        IOfferReadService offers,
        ILanguageCatalog languages,
        CancellationToken cancellationToken)
    {
        if (!TryGetUserId(context, out var userId))
        {
            return Unauthorized(context);
        }

        var result = await sender.Send(new GetMyWishlistQuery(userId), cancellationToken);
        if (!result.IsSuccess)
        {
            return context.ToProblem(result.Error!);
        }

        var language = languages.Normalize(locale);
        var savedItems = result.Value ?? [];
        var ids = savedItems.Select(item => item.ProductId).ToArray();
        var offerMap = await offers.GetApprovedOffersByProductIdsAsync(ids, cancellationToken);
        var items = new List<WishlistProductDto>(savedItems.Count);

        foreach (var saved in savedItems)
        {
            var product = await catalog.GetPublishedByIdAsync(saved.ProductId, cancellationToken);
            if (product is null)
            {
                continue;
            }

            var title = product.Titles.TryGetValue(language, out var localized)
                ? localized
                : product.Titles.TryGetValue(languages.DefaultLanguage, out var fallback)
                    ? fallback
                    : product.Titles.Values.FirstOrDefault() ?? product.Slug;
            var productOffers = offerMap.TryGetValue(saved.ProductId, out var loaded)
                ? loaded
                : [];
            var primary = productOffers
                .OrderBy(offer => offer.BasePrice)
                .FirstOrDefault();

            items.Add(new WishlistProductDto(
                product.Id,
                product.Slug,
                title,
                primary?.BasePrice,
                primary?.Currency,
                saved.CreatedAt));
        }

        return Results.Ok(items);
    }

    /// <summary>
    /// Saves one published product to the authenticated user's wishlist.
    /// </summary>
    private static async Task<IResult> AddAsync(
        Guid productId,
        HttpContext context,
        ISender sender,
        ICatalogReadService catalog,
        CancellationToken cancellationToken)
    {
        if (!TryGetUserId(context, out var userId))
        {
            return Unauthorized(context);
        }

        var product = await catalog.GetPublishedByIdAsync(productId, cancellationToken);
        if (product is null)
        {
            return context.ToProblem(
                Error.NotFound("HANI-CATALOG-1002", "Published product was not found."));
        }

        var result = await sender.Send(
            new AddWishlistItemCommand(userId, productId),
            cancellationToken);
        return result.IsSuccess
            ? Results.Created($"/market/v1/me/wishlist/{productId}", result.Value)
            : context.ToProblem(result.Error!);
    }

    /// <summary>
    /// Removes one product from the authenticated user's wishlist.
    /// </summary>
    private static async Task<IResult> RemoveAsync(
        Guid productId,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        if (!TryGetUserId(context, out var userId))
        {
            return Unauthorized(context);
        }

        var result = await sender.Send(
            new RemoveWishlistItemCommand(userId, productId),
            cancellationToken);
        return result.IsSuccess ? Results.NoContent() : context.ToProblem(result.Error!);
    }

    private static bool TryGetUserId(HttpContext context, out Guid userId)
    {
        var value = context.User.FindFirst("user_id")?.Value
            ?? context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value
            ?? context.User.FindFirst("sub")?.Value;
        return Guid.TryParse(value, out userId);
    }

    private static IResult Unauthorized(HttpContext context)
        => context.ToProblem(
            Error.Unauthorized("HANI-IDENTITY-1202", "Authenticated user is required."));
}

/// <summary>
/// One saved tour enriched with Catalog title and Supply price.
/// </summary>
public sealed record WishlistProductDto(
    Guid ProductId,
    string Slug,
    string Title,
    decimal? MinPrice,
    string? Currency,
    DateTimeOffset SavedAt);
