using Hani.BuildingBlocks.Application;
using Hani.BuildingBlocks.Domain;
using Hani.Modules.Catalog.Application.Abstractions;
using Hani.Modules.Catalog.Domain.Visas;

namespace Hani.Modules.Catalog.Application.Commands.CreateVisaCountry;

internal sealed class CreateVisaCountryCommandHandler(
    IVisaRepository visas,
    IIdGenerator ids)
    : ICommandHandler<CreateVisaCountryCommand, Guid>
{
    public async Task<Result<Guid>> Handle(
        CreateVisaCountryCommand request,
        CancellationToken cancellationToken)
    {
        try
        {
            var country = VisaCountry.Create(ids, request.Slug, request.CountryCode);

            foreach (var translation in request.Translations)
            {
                country.AddTranslation(ids, translation.Locale, translation.Name, translation.Description);
            }

            foreach (var type in request.Types)
            {
                country.AddType(ids, type);
            }

            await visas.AddAsync(country, cancellationToken);
            return Result<Guid>.Success(country.Id);
        }
        catch (ArgumentException exception)
        {
            return Result<Guid>.Failure(Error.Validation("HANI-CATALOG-1801", exception.Message));
        }
        catch (InvalidOperationException exception)
        {
            return Result<Guid>.Failure(Error.Conflict("HANI-CATALOG-1802", exception.Message));
        }
    }
}
