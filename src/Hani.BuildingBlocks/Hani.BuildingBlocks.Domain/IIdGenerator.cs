namespace Hani.BuildingBlocks.Domain;

/// <summary>
/// Abstraction for generating aggregate and domain-event identifiers.
/// </summary>
public interface IIdGenerator
{
    /// <summary>
    /// Creates a new identifier. The default implementation uses UUIDv7.
    /// </summary>
    Guid NewId();
}
