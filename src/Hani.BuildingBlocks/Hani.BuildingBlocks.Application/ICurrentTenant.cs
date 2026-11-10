namespace Hani.BuildingBlocks.Application;

public interface ICurrentTenant
{
    Guid? TenantId { get; }

    bool IsPlatform { get; }

    IDisposable Change(Guid? tenantId);
}
