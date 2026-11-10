using Hani.BuildingBlocks.Infrastructure.Tenancy;
using Shouldly;

namespace Hani.UnitTests.BuildingBlocks;

public sealed class CurrentTenantTests
{
    [Fact]
    public void Default_Should_Be_Platform()
    {
        var tenant = new CurrentTenant();

        tenant.TenantId.ShouldBeNull();
        tenant.IsPlatform.ShouldBeTrue();
    }

    [Fact]
    public void Change_Should_Set_And_Restore_Tenant()
    {
        var tenant = new CurrentTenant();
        var agencyId = Guid.CreateVersion7();

        using (tenant.Change(agencyId))
        {
            tenant.TenantId.ShouldBe(agencyId);
            tenant.IsPlatform.ShouldBeFalse();
        }

        tenant.TenantId.ShouldBeNull();
        tenant.IsPlatform.ShouldBeTrue();
    }
}
