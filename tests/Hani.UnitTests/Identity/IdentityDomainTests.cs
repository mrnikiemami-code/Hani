using Hani.Modules.Identity.Domain.Agencies;
using Hani.Modules.Identity.Domain.ApiClients;
using Shouldly;

namespace Hani.UnitTests.Identity;

public sealed class IdentityDomainTests
{
    [Fact]
    public void Agency_Should_Start_Active()
    {
        var agency = Agency.Create(TestIds.Generator, "bal-chakavak", "بال چکاوک", "B-123", "تهران");

        agency.Status.ShouldBe(AgencyStatus.Active);
        agency.DomainEvents.Count.ShouldBe(1);
    }

    [Fact]
    public void Agency_Should_Be_Suspended_And_Activated()
    {
        var agency = Agency.Create(TestIds.Generator, "bal-chakavak", "بال چکاوک", "B-123", "تهران");

        agency.Suspend();
        agency.Status.ShouldBe(AgencyStatus.Suspended);

        agency.Activate();
        agency.Status.ShouldBe(AgencyStatus.Active);
    }

    [Fact]
    public void ApiClient_Should_Be_Created_Without_Storing_Plain_Secret()
    {
        var client = ApiClient.Create(
            TestIds.Generator,
            Guid.CreateVersion7(),
            "Website",
            "ag_123",
            "HASHED-SECRET",
            "channel.catalog.read channel.booking.write");

        client.Status.ShouldBe(ApiClientStatus.Active);
        client.SecretHash.ShouldBe("HASHED-SECRET");
        client.DomainEvents.Count.ShouldBe(1);
    }

    [Fact]
    public void ApiClient_Should_Be_Revoked()
    {
        var client = ApiClient.Create(
            TestIds.Generator,
            Guid.CreateVersion7(),
            "Website",
            "ag_123",
            "HASHED-SECRET",
            "channel.catalog.read");

        client.Revoke();

        client.Status.ShouldBe(ApiClientStatus.Revoked);
    }
}
