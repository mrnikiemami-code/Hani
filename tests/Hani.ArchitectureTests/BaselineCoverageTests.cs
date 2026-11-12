using System.Security.Cryptography;
using System.Text.Json;
using Shouldly;

namespace Hani.ArchitectureTests;

public sealed class BaselineCoverageTests
{
    private static readonly JsonSerializerOptions JsonOptions = new()
    {
        PropertyNameCaseInsensitive = true
    };

    [Fact]
    public void Baseline_Should_Be_Complete_And_Consistent()
    {
        var root = FindRepositoryRoot();
        var baselinePath = Path.Combine(root, "docs", "plan", "baseline.json");
        var baseline = JsonSerializer.Deserialize<Baseline>(
            File.ReadAllText(baselinePath),
            JsonOptions);

        baseline.ShouldNotBeNull();
        baseline!.Version.ShouldBeGreaterThan(0);
        baseline.Gaps.Count.ShouldBe(34);

        var gateIds = baseline.Gates.Select(gate => gate.Id).ToHashSet();
        gateIds.ShouldContain(baseline.CurrentGate);

        baseline.Gaps.Select(gap => gap.Id).Distinct(StringComparer.Ordinal).Count()
            .ShouldBe(baseline.Gaps.Count, "GAP ids must be unique.");

        foreach (var gap in baseline.Gaps)
        {
            gap.Id.ShouldStartWith("GAP-");
            gap.Title.ShouldNotBeNullOrWhiteSpace();
            gap.Priority.ShouldBeOneOf("P0", "P1", "P2");
            gateIds.ShouldContain(gap.Gate, $"{gap.Id} references an unknown gate.");
            gap.Task.ShouldNotBeNullOrWhiteSpace($"{gap.Id} must reference a task.");
            gap.Status.ShouldBeOneOf("Planned", "InProgress", "Done", "Waived");

            if (gap.Status == "Done")
            {
                gap.Evidence.ShouldNotBeEmpty($"{gap.Id} is Done without evidence.");
            }

            if (gap.Status == "Waived")
            {
                gap.WaiverAdr.ShouldNotBeNullOrWhiteSpace($"{gap.Id} is Waived without an ADR.");
            }
        }

        var openPreviousP0 = baseline.Gaps
            .Where(gap =>
                gap.Priority == "P0" &&
                gap.Gate < baseline.CurrentGate &&
                gap.Status is not ("Done" or "Waived"))
            .Select(gap => gap.Id)
            .ToArray();

        openPreviousP0.ShouldBeEmpty(
            "Previous gate P0 items must be Done/Waived before advancing: " +
            string.Join(", ", openPreviousP0));
    }

    [Fact]
    public void Baseline_Report_Hash_Should_Match()
    {
        var root = FindRepositoryRoot();
        var baseline = JsonSerializer.Deserialize<Baseline>(
            File.ReadAllText(Path.Combine(root, "docs", "plan", "baseline.json")),
            JsonOptions)!;

        var reportPath = Path.Combine(root, baseline.ReportPath.Replace('/', Path.DirectorySeparatorChar));
        File.Exists(reportPath).ShouldBeTrue($"Baseline report not found: {baseline.ReportPath}");

        var hash = Convert.ToHexString(SHA256.HashData(File.ReadAllBytes(reportPath))).ToLowerInvariant();
        hash.ShouldBe(
            baseline.ReportSha256.ToLowerInvariant(),
            "The baseline report changed. Update baseline.json deliberately and record the change.");
    }

    private static string FindRepositoryRoot()
    {
        var directory = new DirectoryInfo(AppContext.BaseDirectory);

        while (directory is not null)
        {
            if (File.Exists(Path.Combine(directory.FullName, "Hani.slnx")))
            {
                return directory.FullName;
            }

            directory = directory.Parent;
        }

        throw new InvalidOperationException("Repository root (Hani.slnx) was not found.");
    }

    private sealed class Baseline
    {
        public int Version { get; init; }

        public string ReportPath { get; init; } = string.Empty;

        public string ReportSha256 { get; init; } = string.Empty;

        public int CurrentGate { get; init; }

        public List<Gate> Gates { get; init; } = [];

        public List<Gap> Gaps { get; init; } = [];
    }

    private sealed class Gate
    {
        public int Id { get; init; }

        public string Name { get; init; } = string.Empty;
    }

    private sealed class Gap
    {
        public string Id { get; init; } = string.Empty;

        public string Title { get; init; } = string.Empty;

        public string Priority { get; init; } = string.Empty;

        public int Gate { get; init; }

        public string Task { get; init; } = string.Empty;

        public string Status { get; init; } = string.Empty;

        public List<string> Evidence { get; init; } = [];

        public string? WaiverAdr { get; init; }
    }
}
