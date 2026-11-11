using Hani.BuildingBlocks.Domain;
using Hani.Modules.Identity.Domain.ApiClients.Events;

namespace Hani.Modules.Identity.Domain.ApiClients;

/// <summary>
/// Machine client credentials for an agency (Supplier/Channel API).
/// </summary>
public sealed class ApiClient : AggregateRoot<Guid>
{
    private ApiClient()
    {
    }

    private ApiClient(
        Guid id,
        Guid agencyId,
        string name,
        string clientId,
        string secretHash,
        string scopes) : base(id)
    {
        AgencyId = agencyId;
        Name = name;
        ClientId = clientId;
        SecretHash = secretHash;
        Scopes = scopes;
        Status = ApiClientStatus.Active;
        CreatedAt = DateTimeOffset.UtcNow;
    }

    public Guid AgencyId { get; private set; }

    public string Name { get; private set; } = string.Empty;

    public string ClientId { get; private set; } = string.Empty;

    public string SecretHash { get; private set; } = string.Empty;

    public string Scopes { get; private set; } = string.Empty;

    public ApiClientStatus Status { get; private set; }

    public DateTimeOffset CreatedAt { get; private set; }

    public DateTimeOffset? LastUsedAt { get; private set; }

    public static ApiClient Create(
        Guid agencyId,
        string name,
        string clientId,
        string secretHash,
        string scopes)
    {
        if (agencyId == Guid.Empty)
        {
            throw new ArgumentException("Agency id is required.", nameof(agencyId));
        }

        if (string.IsNullOrWhiteSpace(name))
        {
            throw new ArgumentException("Name is required.", nameof(name));
        }

        if (string.IsNullOrWhiteSpace(clientId))
        {
            throw new ArgumentException("Client id is required.", nameof(clientId));
        }

        if (string.IsNullOrWhiteSpace(secretHash))
        {
            throw new ArgumentException("Secret hash is required.", nameof(secretHash));
        }

        var client = new ApiClient(
            Guid.CreateVersion7(),
            agencyId,
            name.Trim(),
            clientId.Trim(),
            secretHash,
            scopes.Trim());

        client.AddDomainEvent(new ApiClientCreatedDomainEvent(client.Id, agencyId));

        return client;
    }

    public void Revoke() => Status = ApiClientStatus.Revoked;

    public void MarkUsed() => LastUsedAt = DateTimeOffset.UtcNow;
}
