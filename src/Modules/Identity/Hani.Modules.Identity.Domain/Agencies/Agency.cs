using Hani.BuildingBlocks.Domain;
using Hani.Modules.Identity.Domain.Agencies.Events;

namespace Hani.Modules.Identity.Domain.Agencies;

public sealed class Agency : AggregateRoot<Guid>
{
    private Agency()
    {
    }

    private Agency(
        Guid id,
        string slug,
        string name,
        string licenseNo,
        string city,
        DateOnly? subscriptionValidUntil) : base(id)
    {
        Slug = slug;
        Name = name;
        LicenseNo = licenseNo;
        City = city;
        SubscriptionValidUntil = subscriptionValidUntil;
        Status = AgencyStatus.Active;
        CreatedAt = DateTimeOffset.UtcNow;
    }

    public string Slug { get; private set; } = string.Empty;

    public string Name { get; private set; } = string.Empty;

    public string LicenseNo { get; private set; } = string.Empty;

    public string City { get; private set; } = string.Empty;

    public AgencyStatus Status { get; private set; }

    public DateOnly? SubscriptionValidUntil { get; private set; }

    public DateTimeOffset CreatedAt { get; private set; }

    public static Agency Create(
        string slug,
        string name,
        string licenseNo,
        string city,
        DateOnly? subscriptionValidUntil = null)
    {
        if (string.IsNullOrWhiteSpace(slug))
        {
            throw new ArgumentException("Slug is required.", nameof(slug));
        }

        if (string.IsNullOrWhiteSpace(name))
        {
            throw new ArgumentException("Name is required.", nameof(name));
        }

        if (string.IsNullOrWhiteSpace(licenseNo))
        {
            throw new ArgumentException("License number is required.", nameof(licenseNo));
        }

        var agency = new Agency(
            Guid.CreateVersion7(),
            slug.Trim(),
            name.Trim(),
            licenseNo.Trim(),
            city.Trim(),
            subscriptionValidUntil);

        agency.AddDomainEvent(new AgencyCreatedDomainEvent(agency.Id));

        return agency;
    }

    public void Suspend() => Status = AgencyStatus.Suspended;

    public void Activate() => Status = AgencyStatus.Active;

    public void RenewSubscription(DateOnly validUntil)
        => SubscriptionValidUntil = validUntil;
}
