using Hani.Modules.Content.Application.Media;
using Hani.Modules.Content.Domain.Media;
using Hani.Modules.Content.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Hani.Modules.Content.Infrastructure.Repositories;

internal sealed class MediaAssetRepository(ContentDbContext dbContext) : IMediaAssetRepository
{
    public async Task AddAsync(MediaAsset asset, CancellationToken cancellationToken)
        => await dbContext.MediaAssets.AddAsync(asset, cancellationToken);

    public Task<MediaAsset?> GetAsync(Guid id, CancellationToken cancellationToken)
        => dbContext.MediaAssets
            .Include(asset => asset.Variants)
            .FirstOrDefaultAsync(asset => asset.Id == id, cancellationToken);

    public Task<MediaAsset?> GetByHashAsync(string hash, CancellationToken cancellationToken)
        => dbContext.MediaAssets
            .Include(asset => asset.Variants)
            .FirstOrDefaultAsync(asset => asset.Hash == hash, cancellationToken);

    public async Task<(IReadOnlyList<MediaAsset> Items, int Total)> ListAsync(
        int page,
        int pageSize,
        string? query,
        CancellationToken cancellationToken)
    {
        var source = dbContext.MediaAssets
            .AsNoTracking()
            .Include(asset => asset.Variants)
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(query))
        {
            var term = query.Trim();
            source = source.Where(asset =>
                asset.OriginalFileName.Contains(term) ||
                asset.AltText.Contains(term));
        }

        var total = await source.CountAsync(cancellationToken);
        var items = await source
            .OrderByDescending(asset => asset.CreatedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToArrayAsync(cancellationToken);

        return (items, total);
    }

    public void Remove(MediaAsset asset) => dbContext.MediaAssets.Remove(asset);

    public Task SaveChangesAsync(CancellationToken cancellationToken)
        => dbContext.SaveChangesAsync(cancellationToken);
}
