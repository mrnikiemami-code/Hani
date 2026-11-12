using Hani.BuildingBlocks.Domain;

namespace Hani.Modules.Catalog.Domain.TourProducts;

/// <summary>
/// One day of a tour program with meals, accommodation, and localized content.
/// </summary>
public sealed class TourItineraryDay : Entity<Guid>
{
    private readonly List<TourItineraryDayTranslation> _translations = [];

    private TourItineraryDay()
    {
    }

    internal TourItineraryDay(
        Guid id,
        Guid tourProductId,
        int dayNumber,
        bool breakfast,
        bool lunch,
        bool dinner) : base(id)
    {
        TourProductId = tourProductId;
        DayNumber = dayNumber;
        Breakfast = breakfast;
        Lunch = lunch;
        Dinner = dinner;
    }

    /// <summary>
    /// Owning tour product.
    /// </summary>
    public Guid TourProductId { get; private set; }

    /// <summary>
    /// One-based day number.
    /// </summary>
    public int DayNumber { get; private set; }

    /// <summary>
    /// Breakfast included.
    /// </summary>
    public bool Breakfast { get; private set; }

    /// <summary>
    /// Lunch included.
    /// </summary>
    public bool Lunch { get; private set; }

    /// <summary>
    /// Dinner included.
    /// </summary>
    public bool Dinner { get; private set; }

    /// <summary>
    /// Localized day content.
    /// </summary>
    public IReadOnlyCollection<TourItineraryDayTranslation> Translations => _translations;

    internal void AddTranslation(
        IIdGenerator ids,
        string locale,
        string title,
        string description,
        string? accommodation)
    {
        if (string.IsNullOrWhiteSpace(locale))
        {
            throw new ArgumentException("Locale is required.", nameof(locale));
        }

        if (_translations.Any(item =>
                string.Equals(item.Locale, locale, StringComparison.OrdinalIgnoreCase)))
        {
            throw new InvalidOperationException($"Itinerary translation '{locale}' already exists.");
        }

        if (string.IsNullOrWhiteSpace(title) || string.IsNullOrWhiteSpace(description))
        {
            throw new ArgumentException("Itinerary title and description are required.");
        }

        _translations.Add(new TourItineraryDayTranslation(
            ids.NewId(),
            Id,
            locale.Trim().ToLowerInvariant(),
            title.Trim(),
            description.Trim(),
            string.IsNullOrWhiteSpace(accommodation) ? null : accommodation.Trim()));
    }
}
