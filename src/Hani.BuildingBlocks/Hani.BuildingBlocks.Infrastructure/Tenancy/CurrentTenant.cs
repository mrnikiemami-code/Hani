using Hani.BuildingBlocks.Application;

namespace Hani.BuildingBlocks.Infrastructure.Tenancy;

/// <summary>
/// AsyncLocal implementation of <see cref="ICurrentTenant"/>.
/// </summary>
public sealed class CurrentTenant : ICurrentTenant
{
    private readonly AsyncLocal<Guid?> _tenantId = new();

    public Guid? TenantId => _tenantId.Value;

    public bool IsPlatform => _tenantId.Value is null;

    public IDisposable Change(Guid? tenantId)
    {
        var previous = _tenantId.Value;
        _tenantId.Value = tenantId;

        return new Releaser(() => _tenantId.Value = previous);
    }

    private sealed class Releaser(Action restore) : IDisposable
    {
        public void Dispose() => restore();
    }
}
