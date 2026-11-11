using Hani.BuildingBlocks.Domain;

namespace Hani.Modules.Catalog.Domain.Destinations;

/// <summary>
/// Localized destination name and description.
/// </summary>
public sealed class DestinationTranslation : Entity<Guid>
{
    private DestinationTranslation()
    {
    }

    internal DestinationTranslation(
        Guid id,
        Guid destinationId,
        string locale,
        string name,
        string? description) : base(id)
    {
        DestinationId = destinationId;
        Locale = locale;
        Name = name;
        Description = description;
    }

    public Guid DestinationId { get; private set; }

    public string Locale { get; private set; } = string.Empty;

    public string Name { get; private set; } = string.Empty;

    public string? Description { get; private set; }
}
