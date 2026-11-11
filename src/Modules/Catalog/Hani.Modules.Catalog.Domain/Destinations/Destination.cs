using Hani.BuildingBlocks.Domain;

namespace Hani.Modules.Catalog.Domain.Destinations;

/// <summary>
/// Canonical destination (country/province/city/region).
/// </summary>
public sealed class Destination : AggregateRoot<Guid>
{
    private readonly List<DestinationTranslation> _translations = [];

    private Destination()
    {
    }

    private Destination(
        Guid id,
        string slug,
        DestinationType type,
        Guid? parentId) : base(id)
    {
        Slug = slug;
        Type = type;
        ParentId = parentId;
    }

    public string Slug { get; private set; } = string.Empty;

    public DestinationType Type { get; private set; }

    public Guid? ParentId { get; private set; }

    public decimal? Latitude { get; private set; }

    public decimal? Longitude { get; private set; }

    public IReadOnlyCollection<DestinationTranslation> Translations => _translations;

    public static Destination Create(
        string slug,
        DestinationType type,
        Guid? parentId = null)
    {
        if (string.IsNullOrWhiteSpace(slug))
        {
            throw new ArgumentException("Slug is required.", nameof(slug));
        }

        return new Destination(Guid.CreateVersion7(), slug.Trim(), type, parentId);
    }

    public void SetCoordinates(decimal latitude, decimal longitude)
    {
        Latitude = latitude;
        Longitude = longitude;
    }

    public void AddTranslation(string locale, string name, string? description = null)
    {
        if (_translations.Any(item =>
                string.Equals(item.Locale, locale, StringComparison.OrdinalIgnoreCase)))
        {
            throw new InvalidOperationException($"Translation '{locale}' already exists.");
        }

        _translations.Add(new DestinationTranslation(
            Guid.CreateVersion7(),
            Id,
            locale,
            name,
            description));
    }
}
