using Hani.BuildingBlocks.Domain;

namespace Hani.Modules.Booking.Domain.Installments;

/// <summary>
/// Lifecycle state of an installment plan.
/// </summary>
public enum InstallmentPlanStatus
{
    Active = 0,
    Completed = 1,
    Cancelled = 2
}

/// <summary>
/// Payment state of one installment.
/// </summary>
public enum InstallmentStatus
{
    Pending = 0,
    Paid = 1
}

/// <summary>
/// One scheduled installment.
/// </summary>
public sealed class Installment : Entity<Guid>
{
    private Installment()
    {
    }

    internal Installment(
        Guid id,
        Guid planId,
        int sequence,
        DateOnly dueDate,
        decimal amount) : base(id)
    {
        PlanId = planId;
        Sequence = sequence;
        DueDate = dueDate;
        Amount = amount;
        Status = InstallmentStatus.Pending;
    }

    /// <summary>
    /// Owning plan.
    /// </summary>
    public Guid PlanId { get; private set; }

    /// <summary>
    /// One-based sequence.
    /// </summary>
    public int Sequence { get; private set; }

    /// <summary>
    /// Due date.
    /// </summary>
    public DateOnly DueDate { get; private set; }

    /// <summary>
    /// Amount due.
    /// </summary>
    public decimal Amount { get; private set; }

    /// <summary>
    /// Payment state.
    /// </summary>
    public InstallmentStatus Status { get; private set; }

    /// <summary>
    /// Payment time.
    /// </summary>
    public DateTimeOffset? PaidAt { get; private set; }

    internal void MarkPaid(DateTimeOffset now)
    {
        Status = InstallmentStatus.Paid;
        PaidAt = now;
    }
}

/// <summary>
/// Installment schedule for one order currency.
/// </summary>
public sealed class InstallmentPlan : AggregateRoot<Guid>
{
    private readonly List<Installment> _installments = [];

    private InstallmentPlan()
    {
    }

    private InstallmentPlan(
        Guid id,
        Guid orderId,
        string currency,
        decimal totalAmount,
        int installmentCount,
        int intervalDays,
        DateTimeOffset createdAt) : base(id)
    {
        OrderId = orderId;
        Currency = currency;
        TotalAmount = totalAmount;
        InstallmentCount = installmentCount;
        IntervalDays = intervalDays;
        CreatedAt = createdAt;
        Status = InstallmentPlanStatus.Active;
    }

    /// <summary>
    /// Order being financed.
    /// </summary>
    public Guid OrderId { get; private set; }

    /// <summary>
    /// ISO currency.
    /// </summary>
    public string Currency { get; private set; } = string.Empty;

    /// <summary>
    /// Total financed amount.
    /// </summary>
    public decimal TotalAmount { get; private set; }

    /// <summary>
    /// Number of installments.
    /// </summary>
    public int InstallmentCount { get; private set; }

    /// <summary>
    /// Days between installments.
    /// </summary>
    public int IntervalDays { get; private set; }

    /// <summary>
    /// Plan state.
    /// </summary>
    public InstallmentPlanStatus Status { get; private set; }

    /// <summary>
    /// Creation time.
    /// </summary>
    public DateTimeOffset CreatedAt { get; private set; }

    /// <summary>
    /// Scheduled installments.
    /// </summary>
    public IReadOnlyCollection<Installment> Installments => _installments;

    /// <summary>
    /// Creates an active plan with equal installments and a rounded final payment.
    /// </summary>
    public static InstallmentPlan Create(
        IIdGenerator ids,
        Guid orderId,
        string currency,
        decimal totalAmount,
        int installmentCount,
        int intervalDays,
        DateTimeOffset? now = null)
    {
        if (orderId == Guid.Empty)
        {
            throw new ArgumentException("Order is required.", nameof(orderId));
        }

        if (totalAmount <= 0 || string.IsNullOrWhiteSpace(currency))
        {
            throw new ArgumentException("Total and currency are required.");
        }

        if (installmentCount is < 2 or > 12)
        {
            throw new ArgumentOutOfRangeException(nameof(installmentCount), "Installment count must be between 2 and 12.");
        }

        if (intervalDays is < 1 or > 90)
        {
            throw new ArgumentOutOfRangeException(nameof(intervalDays), "Interval must be between 1 and 90 days.");
        }

        var createdAt = now ?? DateTimeOffset.UtcNow;
        var plan = new InstallmentPlan(
            ids.NewId(),
            orderId,
            currency.Trim().ToUpperInvariant(),
            totalAmount,
            installmentCount,
            intervalDays,
            createdAt);

        var perInstallment = Math.Round(
            totalAmount / installmentCount,
            2,
            MidpointRounding.AwayFromZero);
        var allocated = 0m;
        var startDate = DateOnly.FromDateTime(createdAt.UtcDateTime);

        for (var sequence = 1; sequence <= installmentCount; sequence++)
        {
            var amount = sequence == installmentCount
                ? totalAmount - allocated
                : perInstallment;
            allocated += amount;

            plan._installments.Add(new Installment(
                ids.NewId(),
                plan.Id,
                sequence,
                startDate.AddDays(intervalDays * sequence),
                amount));
        }

        return plan;
    }

    /// <summary>
    /// Marks one installment paid and completes the plan when all are paid.
    /// </summary>
    public void Pay(int sequence, DateTimeOffset? now = null)
    {
        if (Status != InstallmentPlanStatus.Active)
        {
            throw new InvalidOperationException("Only active plans can be paid.");
        }

        var installment = _installments.SingleOrDefault(item => item.Sequence == sequence);

        if (installment is null)
        {
            throw new InvalidOperationException("Installment was not found.");
        }

        if (installment.Status == InstallmentStatus.Paid)
        {
            return;
        }

        installment.MarkPaid(now ?? DateTimeOffset.UtcNow);

        if (_installments.All(item => item.Status == InstallmentStatus.Paid))
        {
            Status = InstallmentPlanStatus.Completed;
        }
    }
}
