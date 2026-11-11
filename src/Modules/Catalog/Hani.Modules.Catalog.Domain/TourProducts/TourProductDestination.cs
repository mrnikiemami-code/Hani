using Hani.BuildingBlocks.Domain;

namespace Hani.Modules.Catalog.Domain.TourProducts;

/// <summary>
/// Ordered link between a tour product and a destination.
/// </summary>
public sealed class TourProductDestination : Entity<Guid>
{
    private TourProductDestination()
    {
    }

    internal TourProductDestination(
        Guid id,
        Guid tourProductId,
        Guid destinationId,
        int sortOrder) : base(id)
    {
        TourProductId = tourProductId;
        DestinationId = destinationId;
        SortOrder = sortOrder;
    }

    public Guid TourProductId { get; private set; }

    public Guid DestinationId { get; private set; }

    public int SortOrder { get; private set; }
}
