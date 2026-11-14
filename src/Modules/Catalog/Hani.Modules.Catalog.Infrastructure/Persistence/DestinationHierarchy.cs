using Microsoft.EntityFrameworkCore;

namespace Hani.Modules.Catalog.Infrastructure.Persistence;

/// <summary>
/// Resolves a destination slug and all of its descendants.
/// </summary>
internal static class DestinationHierarchy
{
    /// <summary>
    /// Returns the destination id and every descendant id. An unknown slug returns an empty set.
    /// </summary>
    public static async Task<IReadOnlyCollection<Guid>> ResolveIdsAsync(
        CatalogDbContext dbContext,
        string slug,
        CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(slug))
        {
            return [];
        }

        var normalized = slug.Trim().ToLowerInvariant();
        var nodes = await dbContext.Destinations
            .AsNoTracking()
            .Select(destination => new { destination.Id, destination.ParentId, destination.Slug })
            .ToArrayAsync(cancellationToken);

        var root = nodes.FirstOrDefault(candidate =>
            string.Equals(candidate.Slug, normalized, StringComparison.OrdinalIgnoreCase));
        if (root is null)
        {
            return [];
        }

        var result = new HashSet<Guid> { root.Id };
        var queue = new Queue<Guid>();
        queue.Enqueue(root.Id);

        while (queue.Count > 0)
        {
            var parentId = queue.Dequeue();
            foreach (var child in nodes.Where(candidate => candidate.ParentId == parentId))
            {
                if (result.Add(child.Id))
                {
                    queue.Enqueue(child.Id);
                }
            }
        }

        return result;
    }
}
