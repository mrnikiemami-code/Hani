using Hani.BuildingBlocks.Domain;
using Hani.Modules.Catalog.Domain.Destinations;
using Hani.Modules.Catalog.Domain.TourProducts.Events;

namespace Hani.Modules.Catalog.Domain.TourProducts;

/// <summary>
/// Shared canonical tour product owned by the platform, not by an agency.
/// </summary>
public sealed class TourProduct : AggregateRoot<Guid>
{
    private readonly List<TourProductTranslation> _translations = [];
    private readonly List<TourProductDestination> _destinations = [];

    private TourProduct()
    {
    }

    private TourProduct(
        Guid id,
        string slug,
        int durationDays,
        string tourType) : base(id)
    {
        Slug = slug;
        DurationDays = durationDays;
        TourType = tourType;
        Status = TourProductStatus.Draft;
        CreatedAt = DateTimeOffset.UtcNow;
        UpdatedAt = CreatedAt;
    }

    public string Slug { get; private set; } = string.Empty;

    public int DurationDays { get; private set; }

    public string TourType { get; private set; } = string.Empty;

    public TourProductStatus Status { get; private set; }

    public DateTimeOffset CreatedAt { get; private set; }

    public DateTimeOffset UpdatedAt { get; private set; }

    public IReadOnlyCollection<TourProductTranslation> Translations => _translations;

    public IReadOnlyCollection<TourProductDestination> Destinations => _destinations;

    public static TourProduct Create(
        IIdGenerator ids,
        string slug,
        int durationDays,
        string tourType)
    {
        if (string.IsNullOrWhiteSpace(slug))
        {
            throw new ArgumentException("Slug is required.", nameof(slug));
        }

        ArgumentOutOfRangeException.ThrowIfNegativeOrZero(durationDays);

        if (string.IsNullOrWhiteSpace(tourType))
        {
            throw new ArgumentException("Tour type is required.", nameof(tourType));
        }

        var product = new TourProduct(
            ids.NewId(),
            slug.Trim(),
            durationDays,
            tourType.Trim());

        product.AddDomainEvent(new TourProductCreatedDomainEvent(ids.NewId(), product.Id));

        return product;
    }

    public void AddTranslation(
        IIdGenerator ids,
        string locale,
        string title,
        string summary,
        string description,
        string? seoTitle = null,
        string? seoDescription = null)
    {
        if (_translations.Any(item =>
                string.Equals(item.Locale, locale, StringComparison.OrdinalIgnoreCase)))
        {
            throw new InvalidOperationException($"Translation '{locale}' already exists.");
        }

        _translations.Add(new TourProductTranslation(
            ids.NewId(),
            Id,
            locale,
            title,
            summary,
            description,
            seoTitle,
            seoDescription));

        Touch();
    }

    public void AddDestination(IIdGenerator ids, Destination destination, int sortOrder = 0)
    {
        ArgumentNullException.ThrowIfNull(destination);

        if (_destinations.Any(item => item.DestinationId == destination.Id))
        {
            return;
        }

        _destinations.Add(new TourProductDestination(
            ids.NewId(),
            Id,
            destination.Id,
            sortOrder));

        Touch();
    }

    public void Publish(IIdGenerator ids)
    {
        if (_translations.Count == 0)
        {
            throw new InvalidOperationException("A tour product needs at least one translation.");
        }

        if (_destinations.Count == 0)
        {
            throw new InvalidOperationException("A tour product needs at least one destination.");
        }

        Status = TourProductStatus.Published;
        Touch();
        AddDomainEvent(new TourProductPublishedDomainEvent(ids.NewId(), Id));
    }

    private void Touch() => UpdatedAt = DateTimeOffset.UtcNow;
}
