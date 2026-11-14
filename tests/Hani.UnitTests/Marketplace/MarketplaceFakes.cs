using Hani.BuildingBlocks.Application;
using Hani.Contracts.Catalog;
using Hani.Contracts.Identity;
using Hani.Contracts.Supply;

namespace Hani.UnitTests.Marketplace;

internal sealed class FakeCatalogReadService : ICatalogReadService
{
    public List<CatalogProductSummary> Products { get; } = [];

    public Dictionary<Guid, CatalogProductDetails> Details { get; } = [];

    public List<CatalogDestinationSnapshot> Destinations { get; } = [];

    public List<CatalogVerticalSitemapEntry> Verticals { get; } = [];

    public Dictionary<string, CatalogVerticalSnapshot> VerticalDetails { get; } = [];

    public Task<IReadOnlyList<CatalogProductSummary>> SearchPublishedAsync(
        CatalogProductFilter filter,
        int skip,
        int take,
        CancellationToken cancellationToken)
    {
        var query = Products.AsEnumerable();

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
            query = query.Where(product => product.TourType == filter.TourType);
        }

        if (!string.IsNullOrWhiteSpace(filter.SearchTerm))
        {
            var term = filter.SearchTerm;
            query = query.Where(product => product.Titles.Values.Any(title =>
                title.Contains(term, StringComparison.OrdinalIgnoreCase)));
        }

        return Task.FromResult<IReadOnlyList<CatalogProductSummary>>(
            query.Skip(skip).Take(take).ToArray());
    }

    public Task<int> CountPublishedAsync(
        CatalogProductFilter filter,
        CancellationToken cancellationToken)
        => Task.FromResult(Products.Count);

    public Task<CatalogProductDetails?> GetPublishedByIdAsync(
        Guid id,
        CancellationToken cancellationToken)
        => Task.FromResult(Details.TryGetValue(id, out var details) ? details : null);

    public Task<IReadOnlyList<CatalogDestinationSnapshot>> GetDestinationsAsync(
        IReadOnlyCollection<Guid> ids,
        CancellationToken cancellationToken)
        => Task.FromResult<IReadOnlyList<CatalogDestinationSnapshot>>(
            Destinations.Where(destination => ids.Contains(destination.Id)).ToArray());

    public Task<CatalogDestinationSnapshot?> GetDestinationBySlugAsync(
        string slug,
        CancellationToken cancellationToken)
        => Task.FromResult(Destinations.FirstOrDefault(destination => destination.Slug == slug));

    public Task<IReadOnlyList<CatalogVerticalSitemapEntry>> GetVerticalSitemapEntriesAsync(
        CancellationToken cancellationToken)
        => Task.FromResult<IReadOnlyList<CatalogVerticalSitemapEntry>>(Verticals);

    public Task<CatalogVerticalSnapshot?> GetVerticalBySlugAsync(
        string type,
        string slug,
        CancellationToken cancellationToken)
        => Task.FromResult(
            VerticalDetails.TryGetValue($"{type}:{slug}", out var vertical) ? vertical : null);

    public Task<int> CountVerticalsAsync(
        string type,
        string? destinationSlug,
        CancellationToken cancellationToken)
        => Task.FromResult(Verticals.Count(vertical =>
            string.Equals(vertical.Type, type, StringComparison.OrdinalIgnoreCase)));
}

internal sealed class FakeOfferReadService : IOfferReadService
{
    public Dictionary<Guid, IReadOnlyList<OfferSnapshot>> OffersByProduct { get; } = [];

    public int SingleProductCalls { get; private set; }

    public int BatchProductCalls { get; private set; }

    public Task<IReadOnlyList<OfferSnapshot>> GetApprovedOffersAsync(
        Guid tourProductId,
        CancellationToken cancellationToken)
    {
        SingleProductCalls++;
        return Task.FromResult(
            OffersByProduct.TryGetValue(tourProductId, out var offers)
                ? offers
                : (IReadOnlyList<OfferSnapshot>)[]);
    }

    public Task<OfferSnapshot?> GetApprovedOfferByIdAsync(
        Guid offerId,
        CancellationToken cancellationToken)
        => Task.FromResult(
            OffersByProduct.Values
                .SelectMany(offers => offers)
                .FirstOrDefault(offer => offer.OfferId == offerId));

    public Task<IReadOnlyDictionary<Guid, IReadOnlyList<OfferSnapshot>>> GetApprovedOffersByProductIdsAsync(
        IReadOnlyCollection<Guid> productIds,
        CancellationToken cancellationToken)
    {
        BatchProductCalls++;
        var result = productIds
            .Distinct()
            .Where(OffersByProduct.ContainsKey)
            .ToDictionary(
                id => id,
                id => (IReadOnlyList<OfferSnapshot>)OffersByProduct[id]);
        return Task.FromResult<IReadOnlyDictionary<Guid, IReadOnlyList<OfferSnapshot>>>(result);
    }
}

internal sealed class FakeCacheService : ICacheService
{
    private readonly Dictionary<string, object> _values = [];

    public Task<T?> GetAsync<T>(string key, CancellationToken cancellationToken = default)
        => Task.FromResult(
            _values.TryGetValue(key, out var value) && value is T typed ? typed : default);

    public Task SetAsync<T>(
        string key,
        T value,
        TimeSpan? timeToLive = null,
        CancellationToken cancellationToken = default)
    {
        _values[key] = value!;
        return Task.CompletedTask;
    }

    public async Task<T> GetOrCreateAsync<T>(
        string key,
        Func<CancellationToken, Task<T>> factory,
        TimeSpan? timeToLive = null,
        CancellationToken cancellationToken = default)
    {
        if (_values.TryGetValue(key, out var existing) && existing is T typed)
        {
            return typed;
        }

        var created = await factory(cancellationToken);
        _values[key] = created!;
        return created;
    }

    public Task RemoveAsync(string key, CancellationToken cancellationToken = default)
    {
        _values.Remove(key);
        return Task.CompletedTask;
    }
}

internal sealed class FakeLanguageCatalog : ILanguageCatalog
{
    private static readonly string[] Languages = ["fa", "en", "ar"];

    public IReadOnlyList<string> SupportedLanguages => Languages;

    public string DefaultLanguage => "fa";

    public string Normalize(string? language)
        => string.IsNullOrWhiteSpace(language) || !Languages.Contains(language.Split('-')[0])
            ? DefaultLanguage
            : language.Split('-')[0].ToLowerInvariant();

    public bool IsSupported(string? language)
        => string.IsNullOrWhiteSpace(language) || Languages.Contains(language.Split('-')[0]);
}

internal sealed class FakeAgencyReadService : IAgencyReadService
{
    public Dictionary<Guid, string> Names { get; } = [];

    public List<Guid> ActiveAgencyIds { get; } = [];

    public Task<IReadOnlyDictionary<Guid, string>> GetNamesAsync(
        IReadOnlyCollection<Guid> ids,
        CancellationToken cancellationToken)
        => Task.FromResult<IReadOnlyDictionary<Guid, string>>(
            ids.Where(Names.ContainsKey)
                .ToDictionary(id => id, id => Names[id]));

    public Task<IReadOnlyList<Guid>> GetActiveAgencyIdsAsync(CancellationToken cancellationToken)
        => Task.FromResult<IReadOnlyList<Guid>>(ActiveAgencyIds);

    public Task<ChannelSettingsSnapshot?> GetChannelSettingsAsync(
        Guid agencyId,
        CancellationToken cancellationToken)
        => Task.FromResult<ChannelSettingsSnapshot?>(
            new ChannelSettingsSnapshot("Standard", false, null, true, "marketplace"));

    public Task<AgencyDomainSnapshot?> GetAgencyByDomainAsync(
        string domain,
        CancellationToken cancellationToken)
        => Task.FromResult<AgencyDomainSnapshot?>(null);
}
