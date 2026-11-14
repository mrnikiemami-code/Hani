using System.Security.Claims;
using Hani.BuildingBlocks.Application;
using Hani.BuildingBlocks.AspNetCore;
using Hani.Contracts.Booking;
using Hani.Contracts.Catalog;
using Hani.Contracts.Identity;
using Hani.Contracts.Supply;
using Hani.Modules.Booking.Application.Commands.CancelOrder;
using Hani.Modules.Booking.Application.Commands.CreateHold;
using Hani.Modules.Booking.Application.Commands.CreateOrder;
using Hani.Modules.Booking.Application.Commands.CreateQuote;
using Hani.Modules.Booking.Application.Queries.GetOrder;
using Hani.Modules.Catalog.Application.Queries.SearchFlights;
using Hani.Modules.Marketplace.Application.Queries.SearchProducts;
using MediatR;
using IResult = Microsoft.AspNetCore.Http.IResult;

namespace Hani.Api;

/// <summary>
/// Channel API for agency partners. Access is granted through OAuth2 client credentials.
/// </summary>
public static class ChannelEndpoints
{
    /// <summary>
    /// Maps the channel catalog, booking, and finance endpoints.
    /// </summary>
    public static IEndpointRouteBuilder MapChannelEndpoints(this IEndpointRouteBuilder app)
    {
        var channel = app.MapGroup("/channel/v1")
            .WithTags("Channel")
            .RequireAuthorization("Channel");

        channel.MapGet("/catalog/products", SearchProductsAsync)
            .RequireAuthorization("ChannelCatalog")
            .WithName("Channel.SearchProducts");
        channel.MapGet("/catalog/products/{productId:guid}", GetProductAsync)
            .RequireAuthorization("ChannelCatalog")
            .WithName("Channel.GetProduct");
        channel.MapGet("/offers", ListOffersAsync)
            .RequireAuthorization("ChannelCatalog")
            .WithName("Channel.ListOffers");
        channel.MapGet("/offers/{offerId:guid}/departures", ListDeparturesAsync)
            .RequireAuthorization("ChannelCatalog")
            .WithName("Channel.ListDepartures");
        channel.MapPost("/quotes", CreateQuoteAsync)
            .RequireAuthorization("ChannelBookingWrite")
            .WithName("Channel.CreateQuote");
        channel.MapPost("/bookings", CreateBookingAsync)
            .RequireAuthorization("ChannelBookingWrite")
            .WithName("Channel.CreateBooking");
        channel.MapGet("/bookings", ListBookingsAsync)
            .RequireAuthorization("ChannelBookingRead")
            .WithName("Channel.ListBookings");
        channel.MapGet("/bookings/{bookingId:guid}", GetBookingAsync)
            .RequireAuthorization("ChannelBookingRead")
            .WithName("Channel.GetBooking");
        channel.MapPost("/bookings/{bookingId:guid}/cancel", CancelBookingAsync)
            .RequireAuthorization("ChannelBookingWrite")
            .WithName("Channel.CancelBooking");
        channel.MapGet("/me/entitlements", GetEntitlementsAsync)
            .WithName("Channel.GetEntitlements");
        channel.MapGet("/me/dashboard", GetAgencyDashboardAsync)
            .WithName("Channel.GetAgencyDashboard");
        channel.MapGet("/settlements", ListSettlementsAsync)
            .RequireAuthorization("ChannelFinance")
            .WithName("Channel.ListSettlements");
        channel.MapGet("/settlements/terms", GetSettlementTermsAsync)
            .RequireAuthorization("ChannelFinance")
            .WithName("Channel.GetSettlementTerms");
        channel.MapPost("/flights/search", SearchFlightsAsync)
            .RequireAuthorization("ChannelCatalog")
            .WithName("Channel.SearchFlights");
        channel.MapPost("/flights/bookings", BookFlight)
            .RequireAuthorization("ChannelBookingWrite")
            .WithName("Channel.BookFlight");

        return app;
    }

    /// <summary>
    /// Searches published products for channel resale.
    /// </summary>
    private static async Task<IResult> SearchProductsAsync(
        string? locale,
        string? destination,
        string? origin,
        DateOnly? from,
        DateOnly? to,
        int? limit,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(
            new SearchProductsQuery(
                locale,
                destination,
                origin,
                from,
                to,
                PageSize: Math.Clamp(limit ?? 20, 1, 100)),
            cancellationToken);
        return result.IsSuccess
            ? Results.Ok(new { items = result.Value!.Items, nextCursor = (string?)null })
            : context.ToProblem(result.Error!);
    }

    /// <summary>
    /// Reads one published product for channel resale.
    /// </summary>
    private static async Task<IResult> GetProductAsync(
        Guid productId,
        string? locale,
        HttpContext context,
        ICatalogReadService catalog,
        ILanguageCatalog languages,
        CancellationToken cancellationToken)
    {
        var product = await catalog.GetPublishedByIdAsync(productId, cancellationToken);

        if (product is null)
        {
            return context.ToProblem(Error.NotFound("HANI-CHANNEL-1101", "Product was not found."));
        }

        var language = languages.Normalize(locale);
        return Results.Ok(new
        {
            productId = product.Id,
            product.Slug,
            product.DurationDays,
            product.TourType,
            product.Difficulty,
            product.VehicleType,
            product.AccommodationType,
            product.Category,
            product.TravelType,
            title = Resolve(product.Titles, language, languages),
            summary = Resolve(product.Summaries, language, languages),
            description = Resolve(product.Descriptions, language, languages),
            destinationIds = product.DestinationIds,
            originDestinationId = product.OriginDestinationId
        });
    }

    /// <summary>
    /// Lists approved offers for one product.
    /// </summary>
    private static async Task<IResult> ListOffersAsync(
        Guid productId,
        IOfferReadService offers,
        CancellationToken cancellationToken)
        => Results.Ok(new
        {
            items = await offers.GetApprovedOffersAsync(productId, cancellationToken),
            nextCursor = (string?)null
        });

    /// <summary>
    /// Lists departures for one approved offer.
    /// </summary>
    private static async Task<IResult> ListDeparturesAsync(
        Guid offerId,
        HttpContext context,
        IOfferReadService offers,
        CancellationToken cancellationToken)
    {
        var offer = await offers.GetApprovedOfferByIdAsync(offerId, cancellationToken);

        return offer is null
            ? context.ToProblem(Error.NotFound("HANI-CHANNEL-1102", "Offer was not found."))
            : Results.Ok(new { items = offer.Departures });
    }

    /// <summary>
    /// Creates a quote for channel booking.
    /// </summary>
    private static async Task<IResult> CreateQuoteAsync(
        ChannelQuoteRequest request,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(
            new CreateQuoteCommand(
                request.DepartureId,
                request.RoomType,
                request.Adults,
                request.Children,
                request.Infants,
                request.AccommodationOptionId),
            cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>
    /// Creates a hold and an order for a channel quote.
    /// </summary>
    private static async Task<IResult> CreateBookingAsync(
        ChannelBookingRequest request,
        HttpContext context,
        ISender sender,
        IChannelWebhookPublisher webhooks,
        CancellationToken cancellationToken)
    {
        var hold = await sender.Send(
            new CreateHoldCommand(request.QuoteId, request.IdempotencyKey),
            cancellationToken);

        if (!hold.IsSuccess)
        {
            return context.ToProblem(hold.Error!);
        }

        var order = await sender.Send(
            new CreateOrderCommand(
                hold.Value!.HoldId,
                request.ContactEmail,
                request.ContactPhone,
                request.Travelers
                    .Select(traveler => new OrderTravelerInput(
                        traveler.FullName,
                        traveler.Type,
                        traveler.DateOfBirth))
                    .ToArray(),
                request.IdempotencyKey),
            cancellationToken);

        return order.IsSuccess
            ? await BookingCreatedAsync(order.Value!, webhooks, cancellationToken)
            : context.ToProblem(order.Error!);
    }

    private static async Task<IResult> BookingCreatedAsync(
        Hani.Modules.Booking.Application.Commands.CreateOrder.OrderDto order,
        IChannelWebhookPublisher webhooks,
        CancellationToken cancellationToken)
    {
        await webhooks.PublishAsync(
            order.AgencyId,
            "booking.created",
            new { orderId = order.OrderId, order.OrderNumber, order.Status },
            cancellationToken);
        return Results.Created($"/channel/v1/bookings/{order.OrderId}", order);
    }

    /// <summary>
    /// Lists channel bookings for the authenticated agency.
    /// </summary>
    private static async Task<IResult> ListBookingsAsync(
        string? status,
        DateOnly? from,
        int? limit,
        HttpContext context,
        IChannelOrderReadService orders,
        CancellationToken cancellationToken)
    {
        var agencyId = GetAgencyId(context);

        if (agencyId is null)
        {
            return context.ToProblem(Error.Unauthorized("HANI-CHANNEL-1103", "Agency claim is missing."));
        }

        var items = await orders.ListByAgencyAsync(
            agencyId.Value,
            status,
            from,
            0,
            Math.Clamp(limit ?? 20, 1, 100),
            cancellationToken);
        return Results.Ok(new { items, nextCursor = (string?)null });
    }

    /// <summary>
    /// Reads one channel booking.
    /// </summary>
    private static async Task<IResult> GetBookingAsync(
        Guid bookingId,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(new GetOrderQuery(bookingId), cancellationToken);

        if (!result.IsSuccess)
        {
            return context.ToProblem(result.Error!);
        }

        var agencyId = GetAgencyId(context);

        if (agencyId is null)
        {
            return context.ToProblem(Error.Unauthorized("HANI-CHANNEL-1103", "Agency claim is missing."));
        }

        return result.Value!.AgencyId == agencyId.Value
            ? Results.Ok(result.Value)
            : context.ToProblem(Error.NotFound("HANI-CHANNEL-1104", "Booking was not found."));
    }

    /// <summary>
    /// Cancels one channel booking.
    /// </summary>
    private static async Task<IResult> CancelBookingAsync(
        Guid bookingId,
        CancelBookingRequest request,
        HttpContext context,
        ISender sender,
        IChannelWebhookPublisher webhooks,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(
            new CancelOrderCommand(bookingId, request.Reason),
            cancellationToken);

        if (result.IsSuccess)
        {
            var agencyId = GetAgencyId(context);
            if (agencyId is not null)
            {
                await webhooks.PublishAsync(
                    agencyId.Value,
                    "booking.cancelled",
                    new { bookingId, status = "Cancelled" },
                    cancellationToken);
            }
        }

        return result.IsSuccess ? Results.Ok(new { status = "Cancelled" }) : context.ToProblem(result.Error!);
    }

    /// <summary>
    /// Returns entitlement and scope information for the current channel client.
    /// </summary>
    private static async Task<IResult> GetEntitlementsAsync(
        HttpContext context,
        IAgencyReadService agencies,
        CancellationToken cancellationToken)
    {
        var agencyId = GetAgencyId(context);

        if (agencyId is null)
        {
            return context.ToProblem(Error.Unauthorized("HANI-CHANNEL-1103", "Agency claim is missing."));
        }

        var settings = await agencies.GetChannelSettingsAsync(agencyId.Value, cancellationToken);

        return Results.Ok(new
        {
            agencyId,
            apiClientId = context.User.FindFirst("api_client_id")?.Value,
            plan = settings?.Plan ?? "Standard",
            whiteLabel = settings?.WhiteLabelEnabled ?? false,
            customDomain = settings?.CustomDomain,
            attributionRequired = settings?.AttributionRequired ?? true,
            commissionProfileId = (string?)null,
            seoCanonicalMode = settings?.CanonicalMode ?? "channel",
            scopes = context.User.FindAll("scope").Select(claim => claim.Value).ToArray()
        });
    }

    /// <summary>
    /// Returns agency booking dashboard totals.
    /// </summary>
    private static async Task<IResult> GetAgencyDashboardAsync(
        HttpContext context,
        IChannelOrderReadService orders,
        CancellationToken cancellationToken)
    {
        var agencyId = GetAgencyId(context);

        if (agencyId is null)
        {
            return context.ToProblem(Error.Unauthorized("HANI-CHANNEL-1103", "Agency claim is missing."));
        }

        return Results.Ok(await orders.GetAgencyDashboardAsync(agencyId.Value, cancellationToken));
    }

    /// <summary>
    /// Returns settlement payout history for the authenticated agency.
    /// </summary>
    private static async Task<IResult> ListSettlementsAsync(
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var agencyId = GetAgencyId(context);

        if (agencyId is null)
        {
            return context.ToProblem(Error.Unauthorized("HANI-CHANNEL-1103", "Agency claim is missing."));
        }

        var result = await sender.Send(
            new Hani.Modules.Settlement.Application.Payouts.ListPayoutsQuery(agencyId.Value),
            cancellationToken);
        return result.IsSuccess
            ? Results.Ok(new { items = result.Value, nextCursor = (string?)null })
            : context.ToProblem(result.Error!);
    }

    /// <summary>
    /// Returns settlement terms for the authenticated agency.
    /// </summary>
    private static async Task<IResult> GetSettlementTermsAsync(
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var agencyId = GetAgencyId(context);

        if (agencyId is null)
        {
            return context.ToProblem(Error.Unauthorized("HANI-CHANNEL-1103", "Agency claim is missing."));
        }

        var result = await sender.Send(
            new Hani.Modules.Settlement.Application.Payouts.GetSettlementTermsQuery(agencyId.Value),
            cancellationToken);
        return result.IsSuccess ? Results.Ok(result.Value) : context.ToProblem(result.Error!);
    }

    /// <summary>
    /// Searches flight offers for channel partners.
    /// </summary>
    private static async Task<IResult> SearchFlightsAsync(
        ChannelFlightSearchRequest request,
        HttpContext context,
        ISender sender,
        CancellationToken cancellationToken)
    {
        var result = await sender.Send(
            new SearchFlightsQuery(
                request.Origin,
                request.Destination,
                request.DepartureDate,
                request.Cabin),
            cancellationToken);
        return result.IsSuccess
            ? Results.Ok(new { items = result.Value!, partialResults = false })
            : context.ToProblem(result.Error!);
    }

    /// <summary>
    /// Flights are metasearch/redirect only; channel ticketing is not supported.
    /// </summary>
    private static IResult BookFlight(HttpContext context)
        => context.ToProblem(Error.Validation(
            "HANI-CHANNEL-1105",
            "Flight booking is metasearch/redirect only. Use the provider deep link."));

    private static Guid? GetAgencyId(HttpContext context)
        => Guid.TryParse(context.User.FindFirstValue("agency_id"), out var agencyId)
            ? agencyId
            : null;

    private static string Resolve(
        IReadOnlyDictionary<string, string> values,
        string locale,
        ILanguageCatalog languages)
        => values.TryGetValue(locale, out var value)
            ? value
            : values.TryGetValue(languages.DefaultLanguage, out var fallback)
                ? fallback
                : values.Values.FirstOrDefault() ?? string.Empty;
}

/// <summary>Channel quote request.</summary>
public sealed record ChannelQuoteRequest(
    Guid DepartureId,
    string RoomType,
    int Adults,
    int Children = 0,
    int Infants = 0,
    Guid? AccommodationOptionId = null);

/// <summary>Channel booking request.</summary>
public sealed record ChannelBookingRequest(
    Guid QuoteId,
    string ContactEmail,
    string? ContactPhone,
    IReadOnlyList<ChannelTravelerRequest> Travelers,
    string IdempotencyKey = "");

/// <summary>Channel traveler request.</summary>
public sealed record ChannelTravelerRequest(
    string FullName,
    string Type,
    DateOnly? DateOfBirth = null);

/// <summary>Channel cancellation request.</summary>
public sealed record CancelBookingRequest(string Reason);

/// <summary>Channel flight search request.</summary>
public sealed record ChannelFlightSearchRequest(
    string Origin,
    string Destination,
    DateOnly DepartureDate,
    string? Cabin = "ECONOMY");
