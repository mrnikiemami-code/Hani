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

    [Fact]
    public void AddItineraryDay_Should_Add_Localized_Days()
    {
        var product = TourProduct.Create(TestIds.Generator, "istanbul-4-nights", 4, "city-break");

        product.AddItineraryDay(
            TestIds.Generator,
            1,
            breakfast: true,
            lunch: false,
            dinner: true,
            [
                new TourItineraryDayTranslationDetails("fa", "Day one", "Arrival and city walk", "Dad Hotel"),
                new TourItineraryDayTranslationDetails("en", "Day one", "Arrival and city walk", "Dad Hotel")
            ]);

        product.ItineraryDays.Count.ShouldBe(1);
        var day = product.ItineraryDays.Single();
        day.DayNumber.ShouldBe(1);
        day.Breakfast.ShouldBeTrue();
        day.Lunch.ShouldBeFalse();
        day.Dinner.ShouldBeTrue();
        day.Translations.Count.ShouldBe(2);
    }

    [Fact]
    public void AddItineraryDay_Should_Reject_Duplicate_Day_Number()
    {
        var product = TourProduct.Create(TestIds.Generator, "istanbul-4-nights", 4, "city-break");

        product.AddItineraryDay(
            TestIds.Generator,
            1,
            true,
            false,
            false,
            [new TourItineraryDayTranslationDetails("fa", "Day one", "Arrival")]);

        Should.Throw<InvalidOperationException>(() =>
            product.AddItineraryDay(
                TestIds.Generator,
                1,
                true,
                false,
                false,
                [new TourItineraryDayTranslationDetails("fa", "Day one", "Arrival")]));
    }

    [Fact]
    public void AddTranslation_Should_Keep_Extended_Content()
    {
        var product = TourProduct.Create(TestIds.Generator, "istanbul-4-nights", 4, "city-break");

        product.AddTranslation(
            TestIds.Generator,
            "fa",
            "Istanbul",
            "Summary",
            "Description",
            mealsSummary: "Breakfast and dinner",
            includedServices: "Flight, hotel",
            excludedServices: "Visa",
            cancellationPolicy: "Non-refundable",
            additionalInfo: "Passport required",
            requiredItems: "Walking shoes");

        var translation = product.Translations.Single();
        translation.MealsSummary.ShouldBe("Breakfast and dinner");
        translation.IncludedServices.ShouldBe("Flight, hotel");
        translation.ExcludedServices.ShouldBe("Visa");
        translation.CancellationPolicy.ShouldBe("Non-refundable");
        translation.AdditionalInfo.ShouldBe("Passport required");
        translation.RequiredItems.ShouldBe("Walking shoes");
    }
}
