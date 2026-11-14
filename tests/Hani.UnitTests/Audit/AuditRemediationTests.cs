using Hani.BuildingBlocks.Domain;
using Hani.Modules.Booking.Domain.Installments;
using Hani.Modules.Catalog.Domain.Hotels;
using Hani.Modules.Catalog.Domain.Places;
using Hani.Modules.Catalog.Domain.TourProducts;
using Hani.Modules.Identity.Domain.Reviews;
using Hani.Modules.Supply.Domain.AgencyOffers;
using Shouldly;
using CatalogTravelType = Hani.Modules.Catalog.Domain.TourProducts.TravelType;
using ReviewTravelType = Hani.Modules.Identity.Domain.Reviews.TravelType;

namespace Hani.UnitTests.Audit;

public sealed class AuditRemediationTests
{
    [Fact]
    public void Offer_Should_Store_Collection_Modes_And_Installment_Terms()
    {
        var offer = AgencyOffer.Create(
            TestIds.Generator,
            Guid.CreateVersion7(),
            Guid.CreateVersion7(),
            "Installment offer",
            Money.Of(100m, "USD"),
            bookingMode: BookingMode.ReservationRequest,
            collectionMode: CollectionMode.AgencyOffline,
            sellerOfRecord: SellerOfRecord.Agency,
            invoiceIssuer: InvoiceIssuer.Agency,
            installmentTerms: InstallmentTerms.Create(0.3m, 10, 0.05m, true));

        offer.CollectionMode.ShouldBe(CollectionMode.AgencyOffline);
        offer.SellerOfRecord.ShouldBe(SellerOfRecord.Agency);
        offer.InvoiceIssuer.ShouldBe(InvoiceIssuer.Agency);
        offer.InstallmentTerms.IsEnabled.ShouldBeTrue();
        offer.InstallmentTerms.MinDownPaymentRate.ShouldBe(0.3m);
        offer.InstallmentTerms.RequiresCheque.ShouldBeTrue();
    }

    [Fact]
    public void Installment_Plan_Should_Apply_Down_Payment_And_Monthly_Fee()
    {
        var plan = InstallmentPlan.Create(
            TestIds.Generator,
            Guid.CreateVersion7(),
            "IRR",
            1000m,
            3,
            30,
            downPaymentRate: 0.3m,
            monthlyFeeRate: 0.05m,
            requiresCheque: true,
            chequeReference: "CHQ-1");

        plan.DownPaymentAmount.ShouldBe(300m);
        plan.FinancedAmount.ShouldBe(700m);
        plan.MonthlyFeeRate.ShouldBe(0.05m);
        plan.RequiresCheque.ShouldBeTrue();
        plan.Installments.Sum(item => item.Amount).ShouldBe(805m);
        plan.TotalPayable.ShouldBe(1105m);
    }

    [Fact]
    public void Review_Should_Accept_Restaurant_Criteria_And_Owner_Reply()
    {
        var review = Review.Create(
            TestIds.Generator,
            Guid.CreateVersion7(),
            ReviewTargetType.Restaurant,
            Guid.CreateVersion7(),
            5,
            null,
            null,
            null,
            null,
            null,
            null,
            "Great food",
            "Excellent local food and service.",
            ReviewTravelType.Couple,
            null,
            [],
            criteria: new Dictionary<string, int>
            {
                ["Quality"] = 5,
                ["Service"] = 4,
                ["Atmosphere"] = 5,
                ["Price"] = 4
            });

        review.Criteria.ShouldContainKey("Quality");
        review.Reply("Thanks for your visit.");
        review.OwnerReply.ShouldBe("Thanks for your visit.");
        review.OwnerRepliedAt.ShouldNotBeNull();
    }

    [Fact]
    public void Review_Should_Reject_Hotel_Criterion_For_Restaurant()
    {
        Should.Throw<ArgumentException>(() => Review.Create(
            TestIds.Generator,
            Guid.CreateVersion7(),
            ReviewTargetType.Restaurant,
            Guid.CreateVersion7(),
            4,
            null,
            null,
            null,
            null,
            null,
            null,
            "Review",
            "Restaurant review.",
            ReviewTravelType.Solo,
            null,
            [],
            criteria: new Dictionary<string, int> { ["Cleanliness"] = 4 }));
    }

    [Fact]
    public void Hotel_And_Place_Should_Store_Translations_And_Coordinates()
    {
        var hotel = Hotel.Create(
            TestIds.Generator,
            "test-hotel",
            Guid.CreateVersion7(),
            4,
            "Address",
            35.7m,
            51.4m);
        hotel.AddTranslation(TestIds.Generator, "fa", "هتل تست");
        hotel.ReplaceAmenities(TestIds.Generator, [new HotelAmenityInput("General", "Parking")]);

        hotel.Translations.Count.ShouldBe(1);
        hotel.Amenities.Count.ShouldBe(1);

        var place = Place.Create(
            TestIds.Generator,
            "test-place",
            PlaceType.Restaurant,
            Guid.CreateVersion7(),
            "Restaurant",
            "Iranian",
            "$$",
            true,
            true,
            35.7m,
            51.4m);
        place.AddTranslation(TestIds.Generator, "fa", "رستوران تست");
        place.ReplaceAmenities(TestIds.Generator, ["Parking"]);

        place.Type.ShouldBe(PlaceType.Restaurant);
        place.Translations.Count.ShouldBe(1);
        place.Amenities.Count.ShouldBe(1);
    }

    [Fact]
    public void Tour_Product_Should_Store_Category_And_Travel_Type()
    {
        var product = TourProduct.Create(
            TestIds.Generator,
            "installment-tour",
            4,
            "city-break",
            category: TourCategory.Installment,
            travelType: CatalogTravelType.Air);

        product.Category.ShouldBe(TourCategory.Installment);
        product.TravelType.ShouldBe(CatalogTravelType.Air);
    }
}
