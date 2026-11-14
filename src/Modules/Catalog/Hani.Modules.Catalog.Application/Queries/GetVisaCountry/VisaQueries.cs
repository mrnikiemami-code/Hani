using Hani.BuildingBlocks.Application;
using Hani.Modules.Catalog.Application.Commands.CreateVisaCountry;

namespace Hani.Modules.Catalog.Application.Queries.GetVisaCountry;

/// <summary>
/// Query that lists visa countries.
/// </summary>
public sealed record ListVisaCountriesQuery(string? Locale) : IQuery<IReadOnlyList<VisaCountrySummaryDto>>;

/// <summary>
/// Query that returns one visa country with its types.
/// </summary>
public sealed record GetVisaCountryQuery(string Slug, string? Locale)
    : IQuery<VisaCountryDto>;

/// <summary>
/// Visa country summary read model.
/// </summary>
public sealed record VisaCountrySummaryDto(
    Guid CountryId,
    string Slug,
    string CountryCode,
    string Name,
    int TypeCount,
    string? MinimumPriceCurrency,
    decimal? MinimumPrice);
