using Hani.BuildingBlocks.Domain;

namespace Hani.Modules.Catalog.Domain.TourProducts;

/// <summary>
/// Localized content for one itinerary day.
/// </summary>
public sealed class TourItineraryDayTranslation : Entity<Guid>
{
    private TourItineraryDayTranslation()
    {
    }

    internal TourItineraryDayTranslation(
        Guid id,
        Guid tourItineraryDayId,
        string locale,
        string title,
        string description,
        string? accommodation) : base(id)
    {
        TourItineraryDayId = tourItineraryDayId;
        Locale = locale;
        Title = title;
        Description = description;
        Accommodation = accommodation;
    }

    /// <summary>
    /// Owning itinerary day.
    /// </summary>
    public Guid TourItineraryDayId { get; private set; }

    /// <summary>
    /// Language code.
    /// </summary>
    public string Locale { get; private set; } = string.Empty;

    /// <summary>
    /// Localized day title.
    /// </summary>
    public string Title { get; private set; } = string.Empty;

    /// <summary>
    /// Localized day description.
    /// </summary>
    public string Description { get; private set; } = string.Empty;

    /// <summary>
    /// Localized accommodation name for the night.
    /// </summary>
    public string? Accommodation { get; private set; }
}
