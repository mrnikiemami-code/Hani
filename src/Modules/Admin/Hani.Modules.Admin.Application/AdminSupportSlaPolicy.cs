namespace Hani.Modules.Admin.Application;

/// <summary>
/// First-response SLA policy for support tickets. Priority targets are:
/// Urgent 2h, High 8h, Normal 24h, Low 72h.
/// </summary>
public static class AdminSupportSlaPolicy
{
    /// <summary>Returns the first-response target for a ticket priority.</summary>
    public static TimeSpan FirstResponseTarget(string priority)
        => priority switch
        {
            "Urgent" => TimeSpan.FromHours(2),
            "High" => TimeSpan.FromHours(8),
            "Low" => TimeSpan.FromHours(72),
            _ => TimeSpan.FromHours(24)
        };

    /// <summary>Returns the first-response due time for a ticket.</summary>
    public static DateTimeOffset DueAt(
        DateTimeOffset createdAt,
        string priority)
        => createdAt.Add(FirstResponseTarget(priority));

    /// <summary>
    /// Evaluates the SLA state as <c>Met</c>, <c>Breached</c>, <c>AtRisk</c>,
    /// or <c>Pending</c>. AtRisk means fewer than two hours remain.
    /// </summary>
    public static string Evaluate(
        DateTimeOffset dueAt,
        DateTimeOffset? firstResponseAt,
        string status,
        DateTimeOffset now)
    {
        if (firstResponseAt is { } respondedAt)
        {
            return respondedAt <= dueAt ? "Met" : "Breached";
        }

        if (status is "Resolved" or "Closed")
        {
            return now <= dueAt ? "Met" : "Breached";
        }

        if (now > dueAt)
        {
            return "Breached";
        }

        return dueAt - now <= TimeSpan.FromHours(2) ? "AtRisk" : "Pending";
    }
}
