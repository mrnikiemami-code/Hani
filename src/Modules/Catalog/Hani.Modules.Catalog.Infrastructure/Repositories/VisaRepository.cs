using Hani.Modules.Catalog.Application.Abstractions;
using Hani.Modules.Catalog.Domain.Visas;
using Hani.Modules.Catalog.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Hani.Modules.Catalog.Infrastructure.Repositories;

internal sealed class VisaRepository(CatalogDbContext dbContext) : IVisaRepository
{
    public async Task AddAsync(VisaCountry country, CancellationToken cancellationToken)
    {
        await dbContext.VisaCountries.AddAsync(country, cancellationToken);
        await dbContext.SaveChangesAsync(cancellationToken);
    }

    public Task<VisaCountry?> GetBySlugAsync(string slug, CancellationToken cancellationToken)
    {
        var normalizedSlug = slug.Trim().ToLowerInvariant();

        return dbContext.VisaCountries
            .AsNoTracking()
            .Include(country => country.Translations)
            .Include(country => country.Types)
                .ThenInclude(type => type.Documents)
            .Include(country => country.Types)
                .ThenInclude(type => type.Steps)
            .Include(country => country.Types)
                .ThenInclude(type => type.Faqs)
            .FirstOrDefaultAsync(country => country.Slug == normalizedSlug, cancellationToken);
    }

    public async Task<IReadOnlyList<VisaCountry>> ListAsync(CancellationToken cancellationToken)
        => await dbContext.VisaCountries
            .AsNoTracking()
            .Include(country => country.Translations)
            .Include(country => country.Types)
            .ToArrayAsync(cancellationToken);
}
