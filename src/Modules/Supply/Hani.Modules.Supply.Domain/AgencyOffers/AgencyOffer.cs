using Hani.BuildingBlocks.Domain;
using Hani.Modules.Supply.Domain.AgencyOffers.Events;

namespace Hani.Modules.Supply.Domain.AgencyOffers;

public sealed class AgencyOffer : AggregateRoot<Guid>
{
    private AgencyOffer()
    {
    }

    private AgencyOffer(
        Guid id,
        Guid agencyId,
        Guid tourProductId,
        string title,
        Money basePrice) : base(id)
    {
        AgencyId = agencyId;
        TourProductId = tourProductId;
        Title = title;
        BasePrice = basePrice;
        Status = AgencyOfferStatus.Draft;
    }

    public Guid AgencyId { get; private set; }

    public Guid TourProductId { get; private set; }

    public string Title { get; private set; } = string.Empty;

    public Money BasePrice { get; private set; }

    public AgencyOfferStatus Status { get; private set; }

    public static AgencyOffer Create(
        Guid agencyId,
        Guid tourProductId,
        string title,
        Money basePrice)
    {
        if (agencyId == Guid.Empty)
        {
            throw new ArgumentException("Agency id is required.", nameof(agencyId));
        }

        if (tourProductId == Guid.Empty)
        {
            throw new ArgumentException("Tour product id is required.", nameof(tourProductId));
        }

        if (string.IsNullOrWhiteSpace(title))
        {
            throw new ArgumentException("Title is required.", nameof(title));
        }

        var offer = new AgencyOffer(
            Guid.CreateVersion7(),
            agencyId,
            tourProductId,
            title.Trim(),
            basePrice);

        offer.AddDomainEvent(new AgencyOfferCreatedDomainEvent(offer.Id, agencyId));

        return offer;
    }
}
