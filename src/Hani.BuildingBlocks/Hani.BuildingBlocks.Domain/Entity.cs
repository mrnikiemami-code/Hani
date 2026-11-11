namespace Hani.BuildingBlocks.Domain;

/// <summary>
/// Base class for entities identified by a typed id.
/// </summary>
public abstract class Entity<TId> where TId : notnull
{
    protected Entity(TId id) => Id = id;

    protected Entity()
    {
        Id = default!;
    }

    public TId Id { get; protected set; }

    public override bool Equals(object? obj)
    {
        if (obj is not Entity<TId> other)
        {
            return false;
        }

        return GetType() == other.GetType() &&
               EqualityComparer<TId>.Default.Equals(Id, other.Id);
    }

    public override int GetHashCode() => HashCode.Combine(GetType(), Id);
}
