using System.Net.Http.Json;
using System.Text.Json;
using Hani.BuildingBlocks.Domain;
using Hani.Modules.Catalog.Application.Abstractions;
using Hani.Modules.Catalog.Domain.Flights;
using Microsoft.Extensions.Options;

namespace Hani.Modules.Catalog.Infrastructure.Providers;

/// <summary>
/// Configuration for an optional external flight metasearch provider.
/// </summary>
public sealed class FlightProviderOptions
{
    /// <summary>Whether the external provider is called before catalog fallback.</summary>
    public bool ExternalEnabled { get; set; }

    /// <summary>Provider base URL without a trailing slash.</summary>
    public string BaseUrl { get; set; } = string.Empty;

    /// <summary>Optional bearer token / API key sent as <c>X-Api-Key</c>.</summary>
    public string ApiKey { get; set; } = string.Empty;
}

internal sealed class CompositeFlightProvider(
    CatalogFlightProvider catalog,
    ExternalFlightProvider external)
    : IFlightProvider
{
    public async Task<IReadOnlyList<FlightRoute>> SearchAsync(
        string? origin,
        string? destination,
        DateOnly? departureDate,
        string? cabin,
        CancellationToken cancellationToken)
    {
        try
        {
            var externalOffers = await external.SearchAsync(
                origin,
                destination,
                departureDate,
                cabin,
                cancellationToken);

            if (externalOffers.Count > 0)
            {
                return externalOffers;
            }
        }
        catch (HttpRequestException)
        {
            // Provider outages must not break metasearch; fall back to stored offers.
        }
        catch (TaskCanceledException) when (!cancellationToken.IsCancellationRequested)
        {
            // Provider timeout; fall back to stored offers.
        }

        return await catalog.SearchAsync(
            origin,
            destination,
            departureDate,
            cabin,
            cancellationToken);
    }
}

internal sealed class ExternalFlightProvider(
    HttpClient httpClient,
    IOptions<FlightProviderOptions> options,
    IIdGenerator ids)
    : IFlightProvider
{
    private static readonly JsonSerializerOptions JsonOptions = new(JsonSerializerDefaults.Web);

    public async Task<IReadOnlyList<FlightRoute>> SearchAsync(
        string? origin,
        string? destination,
        DateOnly? departureDate,
        string? cabin,
        CancellationToken cancellationToken)
    {
        var providerOptions = options.Value;

        if (!providerOptions.ExternalEnabled ||
            string.IsNullOrWhiteSpace(providerOptions.BaseUrl) ||
            string.IsNullOrWhiteSpace(origin) ||
            string.IsNullOrWhiteSpace(destination))
        {
            return [];
        }

        var query = $"offers?origin={Uri.EscapeDataString(origin)}" +
            $"&destination={Uri.EscapeDataString(destination)}";
        if (departureDate is not null)
        {
            query += $"&date={departureDate:yyyy-MM-dd}";
        }
        if (!string.IsNullOrWhiteSpace(cabin))
        {
            query += $"&cabin={Uri.EscapeDataString(cabin)}";
        }

        using var request = new HttpRequestMessage(
            HttpMethod.Get,
            $"{providerOptions.BaseUrl.TrimEnd('/')}/{query}");
        if (!string.IsNullOrWhiteSpace(providerOptions.ApiKey))
        {
            request.Headers.TryAddWithoutValidation("X-Api-Key", providerOptions.ApiKey);
        }

        using var response = await httpClient.SendAsync(request, cancellationToken);
        response.EnsureSuccessStatusCode();
        var offers = await response.Content.ReadFromJsonAsync<ExternalOffer[]>(
            JsonOptions,
            cancellationToken);

        if (offers is null || offers.Length == 0)
        {
            return [];
        }

        var route = FlightRoute.Create(
            ids,
            $"{origin.Trim().ToLowerInvariant()}-{destination.Trim().ToLowerInvariant()}",
            origin,
            destination,
            offers[0].OriginCity,
            offers[0].DestinationCity,
            true,
            offers.Select(offer => new FlightOfferInput(
                offer.FlightNumber,
                offer.AirlineCode,
                offer.AirlineName,
                offer.DepartureDate,
                offer.DepartureTime,
                offer.ArrivalTime,
                offer.DurationMinutes,
                offer.Stops,
                offer.Cabin,
                offer.BaggageAllowance,
                offer.Price,
                offer.Currency,
                offer.Provider,
                offer.DeepLink)).ToArray());

        return [route];
    }

    private sealed record ExternalOffer(
        string FlightNumber,
        string AirlineCode,
        string AirlineName,
        string OriginCity,
        string DestinationCity,
        DateOnly DepartureDate,
        TimeOnly DepartureTime,
        TimeOnly ArrivalTime,
        int DurationMinutes,
        int Stops,
        string Cabin,
        string BaggageAllowance,
        decimal Price,
        string Currency,
        string Provider,
        string DeepLink);
}
