using Hani.Modules.Booking.Domain.HotelInquiries;
using Hani.Modules.Booking.Domain.RestaurantReservations;
using Hani.Modules.Booking.Domain.VisaApplications;
using Hani.Modules.Catalog.Domain.Flights;
using Hani.Modules.Catalog.Domain.Hotels;
using Hani.Modules.Catalog.Domain.Places;
using Hani.Modules.Catalog.Domain.Visas;
using Shouldly;

namespace Hani.UnitTests.Gate5;

public sealed class Gate5VerticalsTests
{
    [Fact]
    public void Hotel_Inquiry_Should_Be_Responded_To_Once()
    {
        var inquiry = HotelInquiry.Create(
            TestIds.Generator,
            Guid.CreateVersion7(),
            new DateOnly(2027, 1, 10),
            new DateOnly(2027, 1, 14),
            1,
            2,
            0,
            "guest@example.com",
            "+989120000000",
            "High floor please");

        inquiry.Status.ShouldBe(HotelInquiryStatus.Pending);
        inquiry.InquiryNumber.ShouldStartWith("HTL-");

        inquiry.Respond("Available", 12_000_000m, "IRR");
        inquiry.Status.ShouldBe(HotelInquiryStatus.Responded);
        inquiry.QuotedTotal.ShouldBe(12_000_000m);
        inquiry.QuotedCurrency.ShouldBe("IRR");
        Should.Throw<InvalidOperationException>(() => inquiry.Respond("Again"));
    }

    [Fact]
    public void Restaurant_Reservation_Should_Be_Confirmed_Or_Rejected()
    {
        var reservation = RestaurantReservation.Create(
            TestIds.Generator,
            Guid.CreateVersion7(),
            DateOnly.FromDateTime(DateTime.UtcNow.AddDays(2)),
            new TimeOnly(20, 30),
            4,
            "Guest",
            "guest@example.com",
            "+989120000000",
            "Window table");

        reservation.Status.ShouldBe(RestaurantReservationStatus.Requested);
        reservation.ReservationNumber.ShouldStartWith("RST-");
        reservation.Confirm();
        reservation.Status.ShouldBe(RestaurantReservationStatus.Confirmed);
    }

    [Fact]
    public void Visa_Country_Should_Expose_Types_Documents_And_Faqs()
    {
        var country = VisaCountry.Create(TestIds.Generator, "thailand", "TH");
        country.AddTranslation(TestIds.Generator, "en", "Thailand");
        country.AddType(TestIds.Generator, new VisaTypeInput(
            "Tourist",
            "Single",
            7,
            9,
            90,
            50m,
            50m,
            "EUR",
            ["Passport", "Photo"],
            ["Submit documents", "Pay fee"],
            [new VisaFaqInput("How long?", "7 to 9 days")]));

        country.Types.Single().Documents.Count.ShouldBe(2);
        country.Types.Single().Steps.Count.ShouldBe(2);
        country.Types.Single().Faqs.Single().Question.ShouldBe("How long?");
    }

    [Fact]
    public void Visa_Application_Should_Require_Documents_And_Approve()
    {
        var application = VisaApplication.Create(
            TestIds.Generator,
            Guid.CreateVersion7(),
            Guid.CreateVersion7(),
            "Applicant",
            "P1234567",
            "IR",
            new DateOnly(1990, 1, 1),
            new DateOnly(2027, 3, 1),
            "applicant@example.com",
            "+989120000000",
            null,
            ["https://cdn.example/passport.pdf"]);

        application.Status.ShouldBe(VisaApplicationStatus.Submitted);
        application.Documents.Count.ShouldBe(1);
        application.SetStatus(VisaApplicationStatus.Approved);
        application.Status.ShouldBe(VisaApplicationStatus.Approved);
        Should.Throw<InvalidOperationException>(() =>
            application.SetStatus(VisaApplicationStatus.Rejected, "late"));
    }

    [Fact]
    public void Hotel_Should_Expose_Gallery_And_Amenities()
    {
        var hotel = Hotel.Create(
            TestIds.Generator,
            "gallery-hotel",
            Guid.CreateVersion7(),
            5,
            "Central street",
            35.7m,
            51.4m);
        hotel.ReplaceAmenities(TestIds.Generator, [new HotelAmenityInput("General", "WiFi")]);
        hotel.ReplaceImages(TestIds.Generator, [
            new HotelImageInput("https://cdn.example/hotel-1.jpg", "Lobby", 1),
            new HotelImageInput("https://cdn.example/hotel-2.jpg", "Room", 2)
        ]);

        hotel.Images.Count.ShouldBe(2);
        hotel.Images.OrderBy(image => image.SortOrder).First().Caption.ShouldBe("Lobby");
        hotel.Amenities.Single().Name.ShouldBe("WiFi");
    }

    [Fact]
    public void Restaurant_Should_Expose_Menu_But_Attraction_Should_Not()
    {
        var restaurant = Place.Create(
            TestIds.Generator,
            "menu-restaurant",
            PlaceType.Restaurant,
            Guid.CreateVersion7(),
            "Fine dining",
            cuisine: "Persian",
            priceBand: "$$$",
            reservable: true,
            onlineReservable: true);

        restaurant.ReplaceMenuItems(TestIds.Generator, [
            new PlaceMenuItemInput("Main", "Kebab", 450_000m, "IRR", "Saffron kebab", 1)
        ]);

        restaurant.MenuItems.Single().Name.ShouldBe("Kebab");

        var attraction = Place.Create(
            TestIds.Generator,
            "menu-attraction",
            PlaceType.Attraction,
            Guid.CreateVersion7(),
            "Museum");

        Should.Throw<InvalidOperationException>(() =>
            attraction.ReplaceMenuItems(TestIds.Generator, [
                new PlaceMenuItemInput("Main", "Ticket", 100m, "IRR")
            ]));
    }

    [Fact]
    public void Flight_Route_Should_Store_Provider_Offers()
    {
        var departureDate = new DateOnly(2027, 2, 1);
        var route = FlightRoute.Create(
            TestIds.Generator,
            "thr-mhd",
            "THR",
            "MHD",
            "Tehran",
            "Mashhad",
            true,
            [
                new FlightOfferInput(
                    "IR123",
                    "IR",
                    "Iran Air",
                    departureDate,
                    new TimeOnly(8, 0),
                    new TimeOnly(9, 20),
                    80,
                    0,
                    "Economy",
                    "20kg",
                    5_000_000m,
                    "IRR",
                    "Provider A",
                    "https://provider.example/flight/IR123")
            ]);

        route.Offers.Single().FlightNumber.ShouldBe("IR123");
        route.Offers.Single().Provider.ShouldBe("Provider A");
        route.Offers.Single().DepartureDate.ShouldBe(departureDate);
    }
}
