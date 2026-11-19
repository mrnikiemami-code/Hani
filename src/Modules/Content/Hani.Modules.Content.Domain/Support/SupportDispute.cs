using Hani.BuildingBlocks.Domain;

namespace Hani.Modules.Content.Domain.Support;

/// <summary>Dispute category opened from a support ticket.</summary>
public enum SupportDisputeType
{
    Refund = 0,
    Cancellation = 1,
    ServiceQuality = 2,
    Pricing = 3,
    NoShow = 4,
    Other = 5
}

/// <summary>Dispute lifecycle.</summary>
public enum SupportDisputeStatus
{
    Open = 0,
    Investigating = 1,
    AwaitingCustomer = 2,
    Resolved = 3,
    Rejected = 4
}

/// <summary>
/// Dispute raised from a support ticket, optionally tied to an order and amount.
/// A resolved or rejected dispute is terminal and cannot be changed again.
/// </summary>
public sealed class SupportDispute : AggregateRoot<Guid>
{
    private SupportDispute()
    {
    }

    private SupportDispute(
        Guid id,
        Guid ticketId,
        Guid? orderId,
        SupportDisputeType type,
        decimal? amount,
        string? currency,
        string description,
        string? evidenceUrl,
        Guid openedBy,
        DateTimeOffset openedAt) : base(id)
    {
        TicketId = ticketId;
        OrderId = orderId;
        Type = type;
        Status = SupportDisputeStatus.Open;
        Amount = amount;
        Currency = currency;
        Description = description;
        EvidenceUrl = evidenceUrl;
        OpenedBy = openedBy;
        OpenedAt = openedAt;
    }

    /// <summary>Source support ticket.</summary>
    public Guid TicketId { get; private set; }

    /// <summary>Optional order the dispute is about.</summary>
    public Guid? OrderId { get; private set; }

    /// <summary>Dispute category.</summary>
    public SupportDisputeType Type { get; private set; }

    /// <summary>Current dispute state.</summary>
    public SupportDisputeStatus Status { get; private set; }

    /// <summary>Optional disputed amount.</summary>
    public decimal? Amount { get; private set; }

    /// <summary>ISO currency for the disputed amount.</summary>
    public string? Currency { get; private set; }

    /// <summary>Customer/admin narrative.</summary>
    public string Description { get; private set; } = string.Empty;

    /// <summary>Optional evidence document URL.</summary>
    public string? EvidenceUrl { get; private set; }

    /// <summary>Resolution or rejection reason.</summary>
    public string? Resolution { get; private set; }

    /// <summary>Administrator who opened the dispute.</summary>
    public Guid OpenedBy { get; private set; }

    /// <summary>Open time.</summary>
    public DateTimeOffset OpenedAt { get; private set; }

    /// <summary>Administrator who closed the dispute.</summary>
    public Guid? ResolvedBy { get; private set; }

    /// <summary>Terminal decision time.</summary>
    public DateTimeOffset? ResolvedAt { get; private set; }

    /// <summary>Creates an open dispute for a ticket.</summary>
    public static SupportDispute Create(
        IIdGenerator ids,
        Guid ticketId,
        Guid? orderId,
        SupportDisputeType type,
        decimal? amount,
        string? currency,
        string description,
        string? evidenceUrl,
        Guid openedBy,
        DateTimeOffset? now = null)
    {
        if (ticketId == Guid.Empty)
        {
            throw new ArgumentException("A dispute requires a support ticket.", nameof(ticketId));
        }

        if (string.IsNullOrWhiteSpace(description))
        {
            throw new ArgumentException("A dispute description is required.", nameof(description));
        }

        var normalizedCurrency = string.IsNullOrWhiteSpace(currency)
            ? null
            : currency.Trim().ToUpperInvariant();
        if (amount is { } disputedAmount)
        {
            if (disputedAmount < 0)
            {
                throw new ArgumentException("A disputed amount cannot be negative.", nameof(amount));
            }

            if (normalizedCurrency is null || normalizedCurrency.Length != 3)
            {
                throw new ArgumentException(
                    "A three-letter currency is required when an amount is supplied.",
                    nameof(currency));
            }
        }

        if (!string.IsNullOrWhiteSpace(evidenceUrl) &&
            !Uri.TryCreate(evidenceUrl.Trim(), UriKind.Absolute, out var uri))
        {
            throw new ArgumentException("Evidence URL is invalid.", nameof(evidenceUrl));
        }
        else if (!string.IsNullOrWhiteSpace(evidenceUrl))
        {
            evidenceUrl = evidenceUrl.Trim();
        }

        return new SupportDispute(
            ids.NewId(),
            ticketId,
            orderId == Guid.Empty ? null : orderId,
            type,
            amount,
            normalizedCurrency,
            description.Trim(),
            string.IsNullOrWhiteSpace(evidenceUrl) ? null : evidenceUrl,
            openedBy,
            now ?? DateTimeOffset.UtcNow);
    }

    /// <summary>Moves the dispute to a new state. Terminal states require a resolution.</summary>
    public void SetStatus(
        SupportDisputeStatus status,
        Guid actorUserId,
        string? resolution = null,
        DateTimeOffset? now = null)
    {
        if (Status is SupportDisputeStatus.Resolved or SupportDisputeStatus.Rejected)
        {
            throw new InvalidOperationException("A closed dispute cannot be changed.");
        }

        var normalizedResolution = string.IsNullOrWhiteSpace(resolution)
            ? null
            : resolution.Trim();
        if (status is SupportDisputeStatus.Resolved or SupportDisputeStatus.Rejected &&
            normalizedResolution is null)
        {
            throw new ArgumentException(
                "A resolution is required when closing a dispute.",
                nameof(resolution));
        }

        Status = status;
        if (normalizedResolution is not null)
        {
            Resolution = normalizedResolution;
        }

        if (status is SupportDisputeStatus.Resolved or SupportDisputeStatus.Rejected)
        {
            ResolvedBy = actorUserId;
            ResolvedAt = now ?? DateTimeOffset.UtcNow;
        }
    }
}
