using Hani.Modules.Identity.Domain.ApiClients;
using Hani.Modules.Identity.Infrastructure.Persistence;
using Hani.Modules.Identity.Infrastructure.Security;
using Microsoft.EntityFrameworkCore;
using Shouldly;

namespace Hani.UnitTests.Identity;

public sealed class ApiKeyValidatorTests
{
    [Fact]
    public async Task Valid_Secret_Should_Return_Agency_And_Scopes()
    {
        await using var dbContext = CreateDbContext();
        var hasher = new SecretHasher();
        var agencyId = Guid.CreateVersion7();

        dbContext.ApiClients.Add(ApiClient.Create(
            TestIds.Generator,
            agencyId,
            "Website",
            "ag_test",
            hasher.Hash("super-secret"),
            "supplier.write channel.catalog.read"));

        await dbContext.SaveChangesAsync();

        var validator = new ApiKeyValidator(dbContext, hasher);

        var result = await validator.ValidateAsync("ag_test", "super-secret");

        result.ShouldNotBeNull();
        result!.AgencyId.ShouldBe(agencyId);
        result.Scopes.ShouldContain("supplier.write");
        result.Scopes.ShouldContain("channel.catalog.read");
    }

    [Fact]
    public async Task Invalid_Secret_Should_Return_Null()
    {
        await using var dbContext = CreateDbContext();
        var hasher = new SecretHasher();

        dbContext.ApiClients.Add(ApiClient.Create(
            TestIds.Generator,
            Guid.CreateVersion7(),
            "Website",
            "ag_test",
            hasher.Hash("super-secret"),
            "supplier.write"));

        await dbContext.SaveChangesAsync();

        var validator = new ApiKeyValidator(dbContext, hasher);

        var result = await validator.ValidateAsync("ag_test", "wrong-secret");

        result.ShouldBeNull();
    }

    [Fact]
    public async Task Revoked_Client_Should_Return_Null()
    {
        await using var dbContext = CreateDbContext();
        var hasher = new SecretHasher();

        var client = ApiClient.Create(
            TestIds.Generator,
            Guid.CreateVersion7(),
            "Website",
            "ag_test",
            hasher.Hash("super-secret"),
            "supplier.write");

        client.Revoke();
        dbContext.ApiClients.Add(client);
        await dbContext.SaveChangesAsync();

        var validator = new ApiKeyValidator(dbContext, hasher);

        var result = await validator.ValidateAsync("ag_test", "super-secret");

        result.ShouldBeNull();
    }

    private static IdentityDbContext CreateDbContext()
    {
        var options = new DbContextOptionsBuilder<IdentityDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;

        return new IdentityDbContext(options);
    }
}
