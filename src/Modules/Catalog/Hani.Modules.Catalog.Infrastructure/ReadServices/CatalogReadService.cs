using Hani.Contracts.Catalog;
using Hani.Modules.Catalog.Domain.TourProducts;
using Hani.Modules.Catalog.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Hani.Modules.Catalog.Infrastructure.ReadServices;

internal sealed class CatalogReadService(CatalogDbContext dbContext) : ICatalogReadService
{
    public async Task<IReadOnlyList<CatalogProductSummary>> SearchPublishedAsync(
        string? destinationSlug,
        int skip,
        int take,
        CancellationToken cancellationToken)
    {
        var destinationId = await ResolveDestinationIdAsync(destinationSlug, cancellationToken);
        var query = ApplyFilter(destinationId);

        var products = await query
            .OrderByDescending(product => product.UpdatedAt)
            .Skip(skip)
            .Take(take)
            .AsNoTracking()
            .ToArrayAsync(cancellationToken);

        return products.Select(MapSummary).ToArray();
    }

    public async Task<int> CountPublishedAsync(
        string? destinationSlug,
        CancellationToken cancellationToken)
    {
        var destinationId = await ResolveDestinationIdAsync(destinationSlug, cancellationToken);
        return await ApplyFilter(destinationId).CountAsync(cancellationToken);
    }

    public async Task<CatalogProductDetails?> GetPublishedByIdAsync(
        Guid id,
        CancellationToken cancellationToken)
    {
        var product = await dbContext.TourProducts
            .AsNoTracking()
            .FirstOrDefaultAsync(
                item => item.Id == id && item.Status == TourProductStatus.Published,
                cancellationToken);

        if (product is null)
        {
            return null;
        }

        return new CatalogProductDetails(
            product.Id,
            product.Slug,
            product.DurationDays,
            product.TourType,
            product.Translations.ToDictionary(
                translation => translation.Locale,
                translation => translation.Title,
                StringComparer.OrdinalIgnoreCase),
            product.Translations.ToDictionary(
                translation => translation.Locale,
                translation => translation.Summary,
                StringComparer.OrdinalIgnoreCase),
            product.Translations.ToDictionary(
                translation => translation.Locale,
                translation => translation.Description,
                StringComparer.OrdinalIgnoreCase),
            product.Destinations
                .OrderBy(destination => destination.SortOrder)
                .Select(destination => destination.DestinationId)
                .ToArray());
    }

    private async Task<Guid?> ResolveDestinationIdAsync(
        string? destinationSlug,
        CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(destinationSlug))
        {
            return null;
        }

        var slug = destinationSlug.Trim();
        var id = await dbContext.Destinations
            .Where(destination => destination.Slug == slug)
            .Select(destination => destination.Id)
            .FirstOrDefaultAsync(cancellationToken);

        return id == Guid.Empty ? Guid.Empty : id;
    }

    private IQueryable<TourProduct> ApplyFilter(Guid? destinationId)
    {
        var query = dbContext.TourProducts
            .Where(product => product.Status == TourProductStatus.Published);

        if (destinationId is null)
        {
            return query;
        }

        if (destinationId == Guid.Empty)
        {
            return query.Where(_ => false);
        }

        return query.Where(product =>
            product.Destinations.Any(link => link.DestinationId == destinationId));
    }

    private static CatalogProductSummary MapSummary(TourProduct product)
        => new(
            product.Id,
            product.Slug,
            product.DurationDays,
            product.TourType,
            product.Translations.ToDictionary(
                translation => translation.Locale,
                translation => translation.Title,
                StringComparer.OrdinalIgnoreCase),
            product.Destinations
                .OrderBy(destination => destination.SortOrder)
                .Select(destination => destination.DestinationId)
                .ToArray(),
            product.UpdatedAt);
}
