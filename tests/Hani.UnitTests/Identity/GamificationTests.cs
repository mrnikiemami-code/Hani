using Hani.Modules.Identity.Domain.Gamification;
using Shouldly;

namespace Hani.UnitTests.Identity;

public sealed class GamificationTests
{
    [Fact]
    public void Points_Should_Recalculate_Level()
    {
        var profile = UserGamification.Create(TestIds.Generator, Guid.CreateVersion7());
        profile.AddPoints(250);

        profile.Points.ShouldBe(250);
        profile.Level.ShouldBe(3);
    }

    [Fact]
    public void Badge_Should_Be_Canonical_And_Awardable()
    {
        var definition = BadgeDefinition.Create(
            TestIds.Generator,
            "blog-writer-1",
            "Blog Writer",
            "First blog post",
            "Writing",
            1);
        var badge = UserBadge.Award(TestIds.Generator, Guid.CreateVersion7(), definition.Code);

        definition.Code.ShouldBe("blog-writer-1");
        badge.BadgeCode.ShouldBe("blog-writer-1");
    }

    [Fact]
    public void Travel_Style_Should_Be_Set()
    {
        var profile = UserGamification.Create(TestIds.Generator, Guid.CreateVersion7());
        profile.SetTravelStyle("NatureLover");
        profile.TravelStyle.ShouldBe("NatureLover");
    }
}
