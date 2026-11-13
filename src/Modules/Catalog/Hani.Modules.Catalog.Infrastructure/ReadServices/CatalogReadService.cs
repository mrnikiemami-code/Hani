using Hani.Contracts.Catalog;
using Hani.Modules.Catalog.Domain.Destinations;
using Hani.Modules.Catalog.Domain.TourProducts;
using Hani.Modules.Catalog.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Hani.Modules.Catalog.Infrastructure.ReadServices;

internal sealed class CatalogReadService(CatalogDbContext dbContext) : ICatalogReadService
{
    public async Task<IReadOnlyList<CatalogProductSummary>> SearchPublishedAsync(
        CatalogProductFilter filter,
        int skip,
        int take,
        CancellationToken cancellationToken)
    {
        var query = await ApplyFilterAsync(filter, cancellationToken);

        var products = await query
            .OrderByDescending(product => product.UpdatedAt)
            .Skip(skip)
            .Take(take)
            .AsNoTracking()
            .ToArrayAsync(cancellationToken);

        return products.Select(MapSummary).ToArray();
    }

    public async Task<int> CountPublishedAsync(
        CatalogProductFilter filter,
        CancellationToken cancellationToken)
    {
        var query = await ApplyFilterAsync(filter, cancellationToken);
        return await query.CountAsync(cancellationToken);
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
                .ToArray(),
            product.OriginDestinationId,
            product.Difficulty.ToString(),
            product.VehicleType.ToString(),
            product.LocalVehicleType.ToString(),
            product.AccommodationType.ToString(),
            product.Translations
                .Where(translation => !string.IsNullOrWhiteSpace(translation.SeoTitle))
                .ToDictionary(
                    translation => translation.Locale,
                    translation => translation.SeoTitle!,
                    StringComparer.OrdinalIgnoreCase),
            product.Translations
                .Where(translation => !string.IsNullOrWhiteSpace(translation.SeoDescription))
                .ToDictionary(
                    translation => translation.Locale,
                    translation => translation.SeoDescription!,
                    StringComparer.OrdinalIgnoreCase));
    }

    public async Task<IReadOnlyList<CatalogDestinationSnapshot>> GetDestinationsAsync(
        IReadOnlyCollection<Guid> ids,
        CancellationToken cancellationToken)
    {
        if (ids.Count == 0)
        {
            return [];
        }

        var destinations = await dbContext.Destinations
            .AsNoTracking()
            .Where(destination => ids.Contains(destination.Id))
            .ToArrayAsync(cancellationToken);

        return destinations.Select(MapDestination).ToArray();
    }

    public async Task<CatalogDestinationSnapshot?> GetDestinationBySlugAsync(
        string slug,
        CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(slug))
        {
            return null;
        }

        var normalized = slug.Trim();
        var destination = await dbContext.Destinations
            .AsNoTracking()
            .FirstOrDefaultAsync(item => item.Slug == normalized, cancellationToken);

        return destination is null ? null : MapDestination(destination);
    }

    private async Task<IQueryable<TourProduct>> ApplyFilterAsync(
        CatalogProductFilter filter,
        CancellationToken cancellationToken)
    {
        var destinationId = await ResolveDestinationIdAsync(
            filter.DestinationSlug,
            cancellationToken);
        var originId = await ResolveDestinationIdAsync(
            filter.OriginSlug,
            cancellationToken);

        var query = dbContext.TourProducts
            .Where(product => product.Status == TourProductStatus.Published);

        if (destinationId is not null)
        {
            query = destinationId == Guid.Empty
                ? query.Where(_ => false)
                : query.Where(product =>
                    product.Destinations.Any(link => link.DestinationId == destinationId));
        }

        if (originId is not null)
        {
            query = originId == Guid.Empty
                ? query.Where(_ => false)
                : query.Where(product => product.OriginDestinationId == originId);
        }

        if (filter.MinDuration is { } minDuration)
        {
            query = query.Where(product => product.DurationDays >= minDuration);
        }

        if (filter.MaxDuration is { } maxDuration)
        {
            query = query.Where(product => product.DurationDays <= maxDuration);
        }

        if (!string.IsNullOrWhiteSpace(filter.TourType))
        {
            var tourType = filter.TourType.Trim();
            query = query.Where(product => product.TourType == tourType);
        }

        if (!string.IsNullOrWhiteSpace(filter.Difficulty))
        {
            if (!Enum.TryParse<TourDifficulty>(filter.Difficulty, ignoreCase: true, out var difficulty))
            {
                return query.Where(_ => false);
            }

            query = query.Where(product => product.Difficulty == difficulty);
        }

        if (!string.IsNullOrWhiteSpace(filter.VehicleType))
        {
            if (!Enum.TryParse<TourVehicleType>(filter.VehicleType, ignoreCase: true, out var vehicleType))
            {
                return query.Where(_ => false);
            }

            query = query.Where(product => product.VehicleType == vehicleType);
        }

        if (!string.IsNullOrWhiteSpace(filter.AccommodationType))
        {
            if (!Enum.TryParse<TourAccommodationType>(
                    filter.AccommodationType,
                    ignoreCase: true,
                    out var accommodationType))
            {
                return query.Where(_ => false);
            }

            query = query.Where(product => product.AccommodationType == accommodationType);
        }

        if (!string.IsNullOrWhiteSpace(filter.SearchTerm))
        {
            var term = filter.SearchTerm.Trim();
            var pattern = $"%{term}%";
            query = query.Where(product => product.Translations.Any(translation =>
                EF.Functions.ILike(translation.Title, pattern) ||
                EF.Functions.ILike(translation.Summary, pattern) ||
                EF.Functions.ILike(translation.Description, pattern)));
        }

        return query;
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
            product.UpdatedAt,
            product.OriginDestinationId,
            product.Difficulty.ToString(),
            product.VehicleType.ToString(),
            product.LocalVehicleType.ToString(),
            product.AccommodationType.ToString());

    private static CatalogDestinationSnapshot MapDestination(Destination destination)
        => new(
            destination.Id,
            destination.Slug,
            destination.Type.ToString(),
            destination.ParentId,
            destination.Translations.ToDictionary(
                translation => translation.Locale,
                translation => translation.Name,
                StringComparer.OrdinalIgnoreCase));
}
