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
        string? seoDescription,
        string? mealsSummary,
        string? includedServices,
        string? excludedServices,
        string? cancellationPolicy,
        string? additionalInfo,
        string? requiredItems) : base(id)
    {
        TourProductId = tourProductId;
        Locale = locale;
        Title = title;
        Summary = summary;
        Description = description;
        SeoTitle = seoTitle;
        SeoDescription = seoDescription;
        MealsSummary = mealsSummary;
        IncludedServices = includedServices;
        ExcludedServices = excludedServices;
        CancellationPolicy = cancellationPolicy;
        AdditionalInfo = additionalInfo;
        RequiredItems = requiredItems;
    }

    public Guid TourProductId { get; private set; }

    public string Locale { get; private set; } = string.Empty;

    public string Title { get; private set; } = string.Empty;

    public string Summary { get; private set; } = string.Empty;

    public string Description { get; private set; } = string.Empty;

    public string? SeoTitle { get; private set; }

    public string? SeoDescription { get; private set; }

    /// <summary>
    /// Localized summary of included meals.
    /// </summary>
    public string? MealsSummary { get; private set; }

    /// <summary>
    /// Localized list of included services.
    /// </summary>
    public string? IncludedServices { get; private set; }

    /// <summary>
    /// Localized list of excluded services.
    /// </summary>
    public string? ExcludedServices { get; private set; }

    /// <summary>
    /// Localized cancellation and refund policy.
    /// </summary>
    public string? CancellationPolicy { get; private set; }

    /// <summary>
    /// Localized additional information.
    /// </summary>
    public string? AdditionalInfo { get; private set; }

    /// <summary>
    /// Localized required and suggested items.
    /// </summary>
    public string? RequiredItems { get; private set; }
}
