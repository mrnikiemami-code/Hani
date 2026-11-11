namespace Hani.Modules.Identity.Domain.ApiClients;

/// <summary>
/// Lifecycle state of an API client.
/// </summary>
public enum ApiClientStatus
{
    Active = 0,
    Revoked = 1
}
