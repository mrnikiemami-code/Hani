using Hani.BuildingBlocks.Domain;
using Hani.Modules.Identity.Domain.Reviews;

namespace Hani.Modules.Identity.Domain.Claims;

/// <summary>
/// Type of ownership, correction, violation, or amendment request.
/// </summary>
public enum ClaimType
{
    Ownership = 0,
    Correction = 1,
    Violation = 2,
    Amendment = 3
}

/// <summary>
/// Moderation state of a claim.
/// </summary>
public enum ClaimStatus
{
    Pending = 0,
    Approved = 1,
    Rejected = 2
}

/// <summary>
/// Ownership claim or information-correction request for a listed entity.
/// </summary>
public sealed class OwnershipClaim : AggregateRoot<Guid>
{
    private OwnershipClaim()
    {
    }

    private OwnershipClaim(
        Guid id,
        Guid userId,
        ReviewTargetType targetType,
        Guid targetId,
        ClaimType claimType,
        string fullName,
        string email,
        string? phone,
        string message,
        string? evidenceUrl,
        DateTimeOffset createdAt) : base(id)
    {
        UserId = userId;
        TargetType = targetType;
        TargetId = targetId;
        ClaimType = claimType;
        FullName = fullName;
        Email = email;
        Phone = phone;
        Message = message;
        EvidenceUrl = evidenceUrl;
        CreatedAt = createdAt;
        Status = ClaimStatus.Pending;
    }

    /// <summary>
    /// Claiming user.
    /// </summary>
    public Guid UserId { get; private set; }

    /// <summary>
    /// Target entity type.
    /// </summary>
    public ReviewTargetType TargetType { get; private set; }

    /// <summary>
    /// Target entity id.
    /// </summary>
    public Guid TargetId { get; private set; }

    /// <summary>
    /// Claim type.
    /// </summary>
    public ClaimType ClaimType { get; private set; }

    /// <summary>
    /// Claimant full name.
    /// </summary>
    public string FullName { get; private set; } = string.Empty;

    /// <summary>
    /// Claimant email.
    /// </summary>
    public string Email { get; private set; } = string.Empty;

    /// <summary>
    /// Claimant phone.
    /// </summary>
    public string? Phone { get; private set; }

    /// <summary>
    /// Claim message.
    /// </summary>
    public string Message { get; private set; } = string.Empty;

    /// <summary>
    /// Optional evidence URL.
    /// </summary>
    public string? EvidenceUrl { get; private set; }

    /// <summary>
    /// Moderation state.
    /// </summary>
    public ClaimStatus Status { get; private set; }

    /// <summary>
    /// Creation time.
    /// </summary>
    public DateTimeOffset CreatedAt { get; private set; }

    /// <summary>
    /// Review time.
    /// </summary>
    public DateTimeOffset? ReviewedAt { get; private set; }

    /// <summary>
    /// Rejection reason.
    /// </summary>
    public string? RejectionReason { get; private set; }

    /// <summary>
    /// Creates a pending claim.
    /// </summary>
    public static OwnershipClaim Create(
        IIdGenerator ids,
        Guid userId,
        ReviewTargetType targetType,
        Guid targetId,
        ClaimType claimType,
        string fullName,
        string email,
        string? phone,
        string message,
        string? evidenceUrl,
        DateTimeOffset? now = null)
    {
        if (userId == Guid.Empty || targetId == Guid.Empty)
        {
            throw new ArgumentException("User and target are required.");
        }

        if (string.IsNullOrWhiteSpace(fullName) || string.IsNullOrWhiteSpace(email))
        {
            throw new ArgumentException("Full name and email are required.");
        }

        if (string.IsNullOrWhiteSpace(message) || message.Trim().Length < 10)
        {
            throw new ArgumentException("Claim message must have at least ten characters.", nameof(message));
        }

        return new OwnershipClaim(
            ids.NewId(),
            userId,
            targetType,
            targetId,
            claimType,
            fullName.Trim(),
            email.Trim().ToLowerInvariant(),
            string.IsNullOrWhiteSpace(phone) ? null : phone.Trim(),
            message.Trim(),
            string.IsNullOrWhiteSpace(evidenceUrl) ? null : evidenceUrl.Trim(),
            now ?? DateTimeOffset.UtcNow);
    }

    /// <summary>
    /// Approves a pending claim.
    /// </summary>
    public void Approve(DateTimeOffset? now = null)
    {
        if (Status != ClaimStatus.Pending)
        {
            throw new InvalidOperationException("Only pending claims can be approved.");
        }

        Status = ClaimStatus.Approved;
        ReviewedAt = now ?? DateTimeOffset.UtcNow;
    }

    /// <summary>
    /// Rejects a pending claim.
    /// </summary>
    public void Reject(string reason, DateTimeOffset? now = null)
    {
        if (Status != ClaimStatus.Pending)
        {
            throw new InvalidOperationException("Only pending claims can be rejected.");
        }

        if (string.IsNullOrWhiteSpace(reason))
        {
            throw new ArgumentException("Rejection reason is required.", nameof(reason));
        }

        Status = ClaimStatus.Rejected;
        ReviewedAt = now ?? DateTimeOffset.UtcNow;
        RejectionReason = reason.Trim();
    }
}
