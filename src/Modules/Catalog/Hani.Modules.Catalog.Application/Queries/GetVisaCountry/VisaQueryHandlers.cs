using Hani.BuildingBlocks.Application;
using Hani.Modules.Catalog.Application.Abstractions;
using Hani.Modules.Catalog.Application.Commands.CreateVisaCountry;
using Hani.Modules.Catalog.Domain.Visas;

namespace Hani.Modules.Catalog.Application.Queries.GetVisaCountry;

internal sealed class ListVisaCountriesQueryHandler(
    IVisaRepository visas,
    ILanguageCatalog languages)
    : IQueryHandler<ListVisaCountriesQuery, IReadOnlyList<VisaCountrySummaryDto>>
{
    public async Task<Result<IReadOnlyList<VisaCountrySummaryDto>>> Handle(
        ListVisaCountriesQuery request,
        CancellationToken cancellationToken)
    {
        var locale = languages.Normalize(request.Locale);
        var countries = await visas.ListAsync(cancellationToken);

        return Result<IReadOnlyList<VisaCountrySummaryDto>>.Success(
            countries.Select(country =>
            {
                var cheapest = country.Types
                    .OrderBy(type => type.PriceAdult)
                    .FirstOrDefault();

                return new VisaCountrySummaryDto(
                    country.Id,
                    country.Slug,
                    country.CountryCode,
                    ResolveName(country, locale, languages),
                    country.Types.Count,
                    cheapest?.Currency,
                    cheapest?.PriceAdult);
            }).ToArray());
    }

    private static string ResolveName(
        VisaCountry country,
        string locale,
        ILanguageCatalog languages)
        => country.Translations.FirstOrDefault(item => item.Locale == locale)?.Name
            ?? country.Translations.FirstOrDefault(item => item.Locale == languages.DefaultLanguage)?.Name
            ?? country.Translations.FirstOrDefault()?.Name
            ?? country.CountryCode;
}

internal sealed class GetVisaCountryQueryHandler(
    IVisaRepository visas,
    ILanguageCatalog languages)
    : IQueryHandler<GetVisaCountryQuery, VisaCountryDto>
{
    public async Task<Result<VisaCountryDto>> Handle(
        GetVisaCountryQuery request,
        CancellationToken cancellationToken)
    {
        var country = await visas.GetBySlugAsync(request.Slug, cancellationToken);

        if (country is null)
        {
            return Result<VisaCountryDto>.Failure(
                Error.NotFound("HANI-CATALOG-1820", "Visa country was not found."));
        }

        var locale = languages.Normalize(request.Locale);
        var translation = country.Translations.FirstOrDefault(item => item.Locale == locale)
            ?? country.Translations.FirstOrDefault(item => item.Locale == languages.DefaultLanguage)
            ?? country.Translations.FirstOrDefault();

        return Result<VisaCountryDto>.Success(new VisaCountryDto(
            country.Id,
            country.Slug,
            country.CountryCode,
            translation?.Name ?? country.CountryCode,
            translation?.Description,
            country.Types.Select(type => new VisaTypeDto(
                type.Id,
                type.Code,
                type.EntryType,
                type.ProcessingDaysMin,
                type.ProcessingDaysMax,
                type.ValidityDays,
                type.PriceAdult,
                type.PriceChild,
                type.Currency,
                type.Documents.Select(document => document.Name).ToArray(),
                type.Steps.OrderBy(step => step.Sequence).Select(step => step.Description).ToArray(),
                type.Faqs.Select(faq => new VisaFaqDto(faq.Question, faq.Answer)).ToArray()))
                .ToArray()));
    }
}
