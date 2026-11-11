using Hani.BuildingBlocks.Domain;

namespace Hani.Modules.Catalog.Domain.TourProducts;

/// <summary>
/// Localized marketing and SEO content for a tour product.
/// </summary>
public sealed class TourProductTranslation : Entity<Guid>
{
    private TourProductTranslation()
    {
    }

    internal TourProductTranslation(
        Guid id,
        Guid tourProductId,
        string locale,
        string title,
        string summary,
        string description,
        string? seoTitle,
        string? seoDescription) : base(id)
    {
        TourProductId = tourProductId;
        Locale = locale;
        Title = title;
        Summary = summary;
        Description = description;
        SeoTitle = seoTitle;
        SeoDescription = seoDescription;
    }

    public Guid TourProductId { get; private set; }

    public string Locale { get; private set; } = string.Empty;

    public string Title { get; private set; } = string.Empty;

    public string Summary { get; private set; } = string.Empty;

    public string Description { get; private set; } = string.Empty;

    public string? SeoTitle { get; private set; }

    public string? SeoDescription { get; private set; }
}
