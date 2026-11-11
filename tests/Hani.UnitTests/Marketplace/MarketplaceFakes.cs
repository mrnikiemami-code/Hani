using Hani.Contracts.Catalog;
using Hani.Contracts.Identity;
using Hani.Contracts.Supply;

namespace Hani.UnitTests.Marketplace;

internal sealed class FakeCatalogReadService : ICatalogReadService
{
    public List<CatalogProductSummary> Products { get; } = [];

    public Dictionary<Guid, CatalogProductDetails> Details { get; } = [];

    public Task<IReadOnlyList<CatalogProductSummary>> SearchPublishedAsync(
        string? destinationSlug,
        int skip,
        int take,
        CancellationToken cancellationToken)
        => Task.FromResult<IReadOnlyList<CatalogProductSummary>>(
            Products.Skip(skip).Take(take).ToArray());

    public Task<int> CountPublishedAsync(
        string? destinationSlug,
        CancellationToken cancellationToken)
        => Task.FromResult(Products.Count);

    public Task<CatalogProductDetails?> GetPublishedByIdAsync(
        Guid id,
        CancellationToken cancellationToken)
        => Task.FromResult(Details.TryGetValue(id, out var details) ? details : null);
}

internal sealed class FakeOfferReadService : IOfferReadService
{
    public Dictionary<Guid, IReadOnlyList<OfferSnapshot>> OffersByProduct { get; } = [];

    public Task<IReadOnlyList<OfferSnapshot>> GetApprovedOffersAsync(
        Guid tourProductId,
        CancellationToken cancellationToken)
        => Task.FromResult(
            OffersByProduct.TryGetValue(tourProductId, out var offers)
                ? offers
                : (IReadOnlyList<OfferSnapshot>)[]);
}

internal sealed class FakeAgencyReadService : IAgencyReadService
{
    public Dictionary<Guid, string> Names { get; } = [];

    public Task<IReadOnlyDictionary<Guid, string>> GetNamesAsync(
        IReadOnlyCollection<Guid> ids,
        CancellationToken cancellationToken)
        => Task.FromResult<IReadOnlyDictionary<Guid, string>>(
            ids.Where(Names.ContainsKey)
                .ToDictionary(id => id, id => Names[id]));
}
