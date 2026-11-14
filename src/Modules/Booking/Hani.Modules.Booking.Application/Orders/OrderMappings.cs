using Hani.BuildingBlocks.Domain.Pricing;
using Hani.Modules.Booking.Application.Commands.CreateOrder;
using Hani.Modules.Booking.Application.Commands.CreateQuote;
using Hani.Modules.Booking.Domain.Orders;

namespace Hani.Modules.Booking.Application.Orders;

internal static class OrderMappings
{
    public static OrderDto ToDto(Order order)
        => new(
            order.Id,
            order.OrderNumber,
            order.QuoteId,
            order.HoldId,
            order.AgencyId,
            order.AgencyOfferId,
            order.DepartureId,
            order.RoomType,
            order.Adults,
            order.Children,
            order.Infants,
            order.Seats,
            order.UnitPrice,
            order.Total,
            order.Currency,
            order.Status.ToString(),
            order.PaymentStatus.ToString(),
            order.CreatedAt,
            order.PaymentDueAt,
            order.Contract.Id,
            order.Contract.ContractNumber,
            order.Travelers
                .Select(traveler => new OrderTravelerDto(
                    traveler.Id,
                    traveler.FullName,
                    traveler.Type.ToString(),
                    traveler.DateOfBirth))
                .ToArray(),
            order.Lines
                .Select(line => new OrderLineDto(
                    line.Id,
                    line.Description,
                    line.Quantity,
                    line.UnitPrice,
                    line.Total,
                    line.Currency))
                .ToArray(),
            MapComponents(order.EffectivePricing),
            MapAccommodation(order.EffectivePricing),
            order.EffectivePricing.BookingMode,
            order.EffectivePricing.CollectionMode,
            order.EffectivePricing.SellerOfRecord,
            order.EffectivePricing.InvoiceIssuer);

    public static ContractDto ToContractDto(Order order)
    {
        var contract = order.Contract;

        return new ContractDto(
            contract.Id,
            contract.ContractNumber,
            contract.OrderId,
            contract.IssuedAt,
            contract.QuoteId,
            contract.HoldId,
            contract.AgencyId,
            contract.AgencyOfferId,
            contract.DepartureId,
            contract.RoomType,
            contract.Adults,
            contract.Children,
            contract.Infants,
            contract.Seats,
            contract.UnitPrice,
            contract.Total,
            contract.Currency,
            contract.ContactEmail,
            contract.ContactPhone,
            contract.Travelers
                .Select(traveler => new OrderTravelerDto(
                    traveler.Id,
                    traveler.FullName,
                    traveler.Type.ToString(),
                    traveler.DateOfBirth))
                .ToArray(),
            contract.Lines
                .Select(line => new OrderLineDto(
                    line.Id,
                    line.Description,
                    line.Quantity,
                    line.UnitPrice,
                    line.Total,
                    line.Currency))
                .ToArray(),
            MapComponents(contract.EffectivePricing),
            MapAccommodation(contract.EffectivePricing),
            contract.EffectivePricing.BookingMode,
            contract.EffectivePricing.CollectionMode,
            contract.EffectivePricing.SellerOfRecord,
            contract.EffectivePricing.InvoiceIssuer);
    }

    private static AccommodationSelectionDto? MapAccommodation(PricingSnapshot pricing)
        => pricing.Accommodation is { } accommodation
            ? new AccommodationSelectionDto(
                accommodation.OptionId,
                accommodation.HotelName,
                accommodation.HotelStars,
                accommodation.RoomType,
                accommodation.MealPlan,
                accommodation.Currency,
                accommodation.HotelId)
            : null;

    private static PriceComponentDto[] MapComponents(PricingSnapshot pricing)
        => pricing.Components
            .Select(component => new PriceComponentDto(
                component.Kind.ToString(),
                component.BaseAmount,
                component.Currency,
                component.Duty.Status.ToString(),
                component.Duty.Rate,
                component.Duty.Amount,
                component.Vat.Status.ToString(),
                component.Vat.Rate,
                component.Vat.Amount,
                component.TotalAmount))
            .ToArray();
}
