using Hani.Modules.Settlement.Domain.Commissions;
using Shouldly;

namespace Hani.UnitTests.Settlement;

public sealed class CommissionRuleTests
{
    [Fact]
    public void IsEffectiveAt_Should_Honor_Window()
    {
        var from = new DateTimeOffset(2026, 11, 1, 0, 0, 0, TimeSpan.Zero);
        var rule = AgencyCommissionRule.Create(
            TestIds.Generator,
            Guid.CreateVersion7(),
            ProductType.Tour,
            0.12m,
            null,
            null,
            from,
            from.AddMonths(1));

        rule.IsEffectiveAt(from.AddDays(1)).ShouldBeTrue();
        rule.IsEffectiveAt(from.AddMonths(1)).ShouldBeFalse();
        rule.IsEffectiveAt(from.AddDays(-1)).ShouldBeFalse();
    }

    [Fact]
    public void Create_Should_Validate_Rate_And_Window()
    {
        var from = DateTimeOffset.UtcNow;

        Should.Throw<ArgumentOutOfRangeException>(() =>
            AgencyCommissionRule.Create(
                TestIds.Generator,
                Guid.CreateVersion7(),
                ProductType.Tour,
                1.5m,
                null,
                null,
                from,
                null));

        Should.Throw<ArgumentException>(() =>
            AgencyCommissionRule.Create(
                TestIds.Generator,
                Guid.CreateVersion7(),
                ProductType.Tour,
                0.1m,
                null,
                null,
                from,
                from));
    }
}
