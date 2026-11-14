using Hani.BuildingBlocks.Domain;
using Hani.Modules.Supply.Domain.Departures;

namespace Hani.Modules.Supply.Domain.AgencyOffers;

/// <summary>
/// Hotel, room, and board option inside an agency offer.
/// </summary>
public sealed class OfferAccommodationOption : Entity<Guid>
{
    private OfferAccommodationOption()
    {
    }

    internal OfferAccommodationOption(
        Guid id,
        Guid agencyOfferId,
        Guid? hotelId,
        string hotelName,
        int hotelStars,
        RoomType roomType,
        MealPlanType mealPlan,
        Money price,
        string? description) : base(id)
    {
        AgencyOfferId = agencyOfferId;
        HotelId = hotelId;
        HotelName = hotelName;
        HotelStars = hotelStars;
        RoomType = roomType;
        MealPlan = mealPlan;
        Amount = price.Amount;
        Currency = price.Currency;
        Description = description;
    }

    /// <summary>
    /// Owning agency offer.
    /// </summary>
    public Guid AgencyOfferId { get; private set; }

    /// <summary>
    /// Canonical hotel id when linked.
    /// </summary>
    public Guid? HotelId { get; private set; }

    /// <summary>
    /// Hotel name.
    /// </summary>
    public string HotelName { get; private set; } = string.Empty;

    /// <summary>
    /// Hotel star rating from 1 to 5.
    /// </summary>
    public int HotelStars { get; private set; }

    /// <summary>
    /// Room type.
    /// </summary>
    public RoomType RoomType { get; private set; }

    /// <summary>
    /// Board basis.
    /// </summary>
    public MealPlanType MealPlan { get; private set; }

    /// <summary>
    /// Price amount for this accommodation option.
    /// </summary>
    public decimal Amount { get; private set; }

    /// <summary>
    /// ISO currency code.
    /// </summary>
    public string Currency { get; private set; } = string.Empty;

    /// <summary>
    /// Optional localized room description stored as free text.
    /// </summary>
    public string? Description { get; private set; }
}
