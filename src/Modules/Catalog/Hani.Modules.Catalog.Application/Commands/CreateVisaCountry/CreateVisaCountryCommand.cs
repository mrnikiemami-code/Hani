using Hani.BuildingBlocks.Application;
using Hani.Modules.Catalog.Domain.Visas;

namespace Hani.Modules.Catalog.Application.Commands.CreateVisaCountry;

/// <summary>
/// Command that creates a visa country with its visa types.
/// </summary>
public sealed record CreateVisaCountryCommand(
    string Slug,
    string CountryCode,
    IReadOnlyList<VisaCountryTranslationInput> Translations,
    IReadOnlyList<VisaTypeInput> Types) : ICommand<Guid>;

/// <summary>
/// Visa country read model.
/// </summary>
public sealed record VisaCountryDto(
    Guid CountryId,
    string Slug,
    string CountryCode,
    string Name,
    string? Description,
    IReadOnlyList<VisaTypeDto> Types);

/// <summary>
/// Visa type read model.
/// </summary>
public sealed record VisaTypeDto(
    Guid VisaTypeId,
    string Code,
    string EntryType,
    int ProcessingDaysMin,
    int ProcessingDaysMax,
    int ValidityDays,
    decimal PriceAdult,
    decimal? PriceChild,
    string Currency,
    IReadOnlyList<string> Documents,
    IReadOnlyList<string> Steps,
    IReadOnlyList<VisaFaqDto> Faqs);

/// <summary>
/// Visa FAQ read model.
/// </summary>
public sealed record VisaFaqDto(string Question, string Answer);
