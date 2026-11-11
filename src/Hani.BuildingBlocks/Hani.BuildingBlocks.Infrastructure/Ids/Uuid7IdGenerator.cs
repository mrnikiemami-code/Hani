using Hani.BuildingBlocks.Domain;

namespace Hani.BuildingBlocks.Infrastructure.Ids;

/// <summary>
/// UUIDv7 identifier generator (time-ordered, lower index fragmentation).
/// </summary>
public sealed class Uuid7IdGenerator : IIdGenerator
{
    /// <inheritdoc />
    public Guid NewId() => Guid.CreateVersion7();
}
