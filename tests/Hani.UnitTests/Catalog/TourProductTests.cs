using Hani.Modules.Catalog.Domain.Destinations;
using Hani.Modules.Catalog.Domain.TourProducts;
using Shouldly;

namespace Hani.UnitTests.Catalog;

public sealed class TourProductTests
{
    [Fact]
    public void Create_Should_Start_As_Draft()
    {
        var product = TourProduct.Create(TestIds.Generator, "istanbul-4-nights", 4, "city-break");

        product.Status.ShouldBe(TourProductStatus.Draft);
        product.DomainEvents.Count.ShouldBe(1);
    }

    [Fact]
    public void AddTranslation_Should_Reject_Duplicate_Locale()
    {
        var product = TourProduct.Create(TestIds.Generator, "istanbul-4-nights", 4, "city-break");

        product.AddTranslation(TestIds.Generator, "fa", "استانبول", "خلاصه", "توضیحات");

        Should.Throw<InvalidOperationException>(() =>
            product.AddTranslation(TestIds.Generator, "fa", "استانبول ۲", "خلاصه", "توضیحات"));
    }

    [Fact]
    public void Publish_Should_Fail_Without_Destination()
    {
        var product = TourProduct.Create(TestIds.Generator, "istanbul-4-nights", 4, "city-break");
        product.AddTranslation(TestIds.Generator, "fa", "استانبول", "خلاصه", "توضیحات");

        Should.Throw<InvalidOperationException>(() => product.Publish(TestIds.Generator));
    }

    [Fact]
    public void Publish_Should_Succeed_With_Translation_And_Destination()
    {
        var product = TourProduct.Create(TestIds.Generator, "istanbul-4-nights", 4, "city-break");
        product.AddTranslation(TestIds.Generator, "fa", "استانبول", "خلاصه", "توضیحات");

        var destination = Destination.Create(TestIds.Generator, "istanbul", DestinationType.City);
        product.AddDestination(TestIds.Generator, destination);

        product.Publish(TestIds.Generator);

        product.Status.ShouldBe(TourProductStatus.Published);
        product.DomainEvents.Count.ShouldBe(2);
    }
}
