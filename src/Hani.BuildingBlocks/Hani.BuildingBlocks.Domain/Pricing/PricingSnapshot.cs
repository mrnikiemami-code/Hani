using System.Text.Json;
using System.Text.Json.Serialization;

namespace Hani.BuildingBlocks.Domain.Pricing;

/// <summary>
/// Tax treatment applied to a priced component.
/// </summary>
public enum TaxStatus
{
    Applicable = 0,
    ZeroRated = 1,
    NotApplicable = 2,
    Exempt = 3
}

/// <summary>
/// Kind of a priced component.
/// </summary>
public enum PriceComponentKind
{
    Base = 0,
    Fee = 1,
    Discount = 2
}

/// <summary>
/// One tax charge snapshot attached to a price component.
/// </summary>
public sealed record TaxChargeSnapshot(
    TaxStatus Status,
    decimal Rate,
    decimal Amount,
    string? ExemptionReason = null);

/// <summary>
/// Immutable price component snapshot used by quotes, orders, and contracts.
/// </summary>
public sealed record PriceComponentSnapshot(
    PriceComponentKind Kind,
    decimal BaseAmount,
    string Currency,
    TaxChargeSnapshot Duty,
    TaxChargeSnapshot Vat,
    decimal TotalAmount);

/// <summary>
/// Selected hotel/room/board option captured with a quote.
/// </summary>
public sealed record AccommodationSelectionSnapshot(
    Guid OptionId,
    string HotelName,
    int HotelStars,
    string RoomType,
    string MealPlan,
    string Currency);

/// <summary>
/// Multi-currency pricing snapshot with per-currency tax and duty amounts.
/// </summary>
public sealed record PricingSnapshot(
    List<PriceComponentSnapshot> Components,
    AccommodationSelectionSnapshot? Accommodation = null)
{
    /// <summary>
    /// Creates a snapshot for a single currency with no applicable tax.
    /// </summary>
    public static PricingSnapshot Single(decimal total, string currency)
        => new(
        [
            new PriceComponentSnapshot(
                PriceComponentKind.Base,
                total,
                currency.ToUpperInvariant(),
                new TaxChargeSnapshot(TaxStatus.NotApplicable, 0m, 0m),
                new TaxChargeSnapshot(TaxStatus.NotApplicable, 0m, 0m),
                total)
        ]);

    /// <summary>
    /// Returns the component for a currency, or <c>null</c>.
    /// </summary>
    public PriceComponentSnapshot? Find(string currency)
        => Components.FirstOrDefault(component =>
            string.Equals(component.Currency, currency, StringComparison.OrdinalIgnoreCase));

    /// <summary>
    /// Total amount per currency.
    /// </summary>
    public IReadOnlyDictionary<string, decimal> TotalsByCurrency()
        => Components
            .GroupBy(component => component.Currency, StringComparer.OrdinalIgnoreCase)
            .ToDictionary(
                group => group.Key,
                group => group.Sum(component => component.TotalAmount),
                StringComparer.OrdinalIgnoreCase);
}

/// <summary>
/// Serializes pricing snapshots for persistence and cross-module transport.
/// </summary>
public static class PricingSnapshotJson
{
    private static readonly JsonSerializerOptions Options = new(JsonSerializerDefaults.Web)
    {
        Converters = { new JsonStringEnumConverter() }
    };

    /// <summary>
    /// Serializes a snapshot to JSON.
    /// </summary>
    public static string Serialize(PricingSnapshot snapshot)
        => JsonSerializer.Serialize(snapshot, Options);

    /// <summary>
    /// Deserializes a snapshot from JSON.
    /// </summary>
    public static PricingSnapshot Deserialize(string json)
        => JsonSerializer.Deserialize<PricingSnapshot>(json, Options)
            ?? throw new InvalidOperationException("Pricing snapshot JSON is invalid.");
}
