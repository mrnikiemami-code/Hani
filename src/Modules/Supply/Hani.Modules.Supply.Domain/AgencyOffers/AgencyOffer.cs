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
        string externalId,
        Guid tourProductId,
        string title,
        Money basePrice) : base(id)
    {
        AgencyId = agencyId;
        ExternalId = externalId;
        TourProductId = tourProductId;
        Title = title;
        BasePrice = basePrice;
        Status = AgencyOfferStatus.Draft;
        CreatedAt = DateTimeOffset.UtcNow;
        UpdatedAt = CreatedAt;
    }

    public Guid AgencyId { get; private set; }

    public string ExternalId { get; private set; } = string.Empty;

    public Guid TourProductId { get; private set; }

    public string Title { get; private set; } = string.Empty;

    public Money BasePrice { get; private set; }

    public AgencyOfferStatus Status { get; private set; }

    public string? RejectionReason { get; private set; }

    public DateTimeOffset CreatedAt { get; private set; }

    public DateTimeOffset UpdatedAt { get; private set; }

    public static AgencyOffer Create(
        Guid agencyId,
        Guid tourProductId,
        string title,
        Money basePrice,
        string externalId = "")
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
            externalId.Trim(),
            tourProductId,
            title.Trim(),
            basePrice);

        offer.AddDomainEvent(new AgencyOfferCreatedDomainEvent(offer.Id, agencyId));

        return offer;
    }

    public void UpdateDetails(string title, Money basePrice)
    {
        if (Status is AgencyOfferStatus.Approved or AgencyOfferStatus.Archived)
        {
            throw new InvalidOperationException("Only draft, rejected, or pending offers can be edited.");
        }

        if (string.IsNullOrWhiteSpace(title))
        {
            throw new ArgumentException("Title is required.", nameof(title));
        }

        Title = title.Trim();
        BasePrice = basePrice;
        Touch();
    }

    public void SubmitForReview()
    {
        if (Status is not (AgencyOfferStatus.Draft or AgencyOfferStatus.Rejected))
        {
            throw new InvalidOperationException("Only draft or rejected offers can be submitted.");
        }

        Status = AgencyOfferStatus.Pending;
        RejectionReason = null;
        Touch();
    }

    public void Approve()
    {
        if (Status != AgencyOfferStatus.Pending)
        {
            throw new InvalidOperationException("Only pending offers can be approved.");
        }

        Status = AgencyOfferStatus.Approved;
        RejectionReason = null;
        Touch();
    }

    public void Reject(string reason)
    {
        if (Status != AgencyOfferStatus.Pending)
        {
            throw new InvalidOperationException("Only pending offers can be rejected.");
        }

        if (string.IsNullOrWhiteSpace(reason))
        {
            throw new ArgumentException("Rejection reason is required.", nameof(reason));
        }

        Status = AgencyOfferStatus.Rejected;
        RejectionReason = reason.Trim();
        Touch();
    }

    public void Archive()
    {
        if (Status == AgencyOfferStatus.Archived)
        {
            return;
        }

        Status = AgencyOfferStatus.Archived;
        Touch();
    }

    private void Touch() => UpdatedAt = DateTimeOffset.UtcNow;
}
