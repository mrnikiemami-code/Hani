using Hani.Modules.Admin.Application;
using Shouldly;

namespace Hani.UnitTests.Admin;

public sealed class SupportSlaPolicyTests
{
    private static readonly DateTimeOffset Created =
        new(2026, 1, 1, 8, 0, 0, TimeSpan.Zero);

    [Theory]
    [InlineData("Urgent", 2)]
    [InlineData("High", 8)]
    [InlineData("Normal", 24)]
    [InlineData("Low", 72)]
    public void DueAt_Should_Use_Priority_Target(string priority, int hours)
    {
        var due = AdminSupportSlaPolicy.DueAt(Created, priority);

        due.ShouldBe(Created.AddHours(hours));
    }

    [Fact]
    public void Evaluate_Should_Return_Met_When_First_Response_Is_In_Time()
    {
        var due = AdminSupportSlaPolicy.DueAt(Created, "High");

        AdminSupportSlaPolicy.Evaluate(
                due,
                due.AddMinutes(-1),
                "WaitingCustomer",
                due.AddHours(1))
            .ShouldBe("Met");
    }

    [Fact]
    public void Evaluate_Should_Return_Breached_When_Overdue()
    {
        var due = AdminSupportSlaPolicy.DueAt(Created, "Normal");

        AdminSupportSlaPolicy.Evaluate(due, null, "Open", due.AddMinutes(1))
            .ShouldBe("Breached");
    }

    [Fact]
    public void Evaluate_Should_Return_AtRisk_Within_Two_Hours()
    {
        var due = AdminSupportSlaPolicy.DueAt(Created, "Normal");

        AdminSupportSlaPolicy.Evaluate(due, null, "Open", due.AddHours(-1))
            .ShouldBe("AtRisk");
    }
}
