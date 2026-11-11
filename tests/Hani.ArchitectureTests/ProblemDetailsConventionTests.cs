using Shouldly;

namespace Hani.ArchitectureTests;

public sealed class ProblemDetailsConventionTests
{
    private static readonly string[] ForbiddenEndpointPatterns =
    [
        "Results.Problem(",
        "Results.BadRequest(",
        "Results.NotFound(",
        "Results.Conflict(",
        "Results.Unauthorized(",
        "Results.Forbid(",
        "Results.StatusCode(",
        "ProblemDetailsLocalizer"
    ];

    [Fact]
    public void Endpoints_Should_Use_Central_ProblemDetails()
    {
        var root = FindRepositoryRoot();
        var presentationFiles = Directory
            .EnumerateFiles(Path.Combine(root, "src", "Modules"), "*.cs", SearchOption.AllDirectories)
            .Where(path => path.Contains(".Presentation"))
            .Where(path => !path.Contains($"{Path.DirectorySeparatorChar}obj{Path.DirectorySeparatorChar}"))
            .Where(path => !path.Contains($"{Path.DirectorySeparatorChar}bin{Path.DirectorySeparatorChar}"))
            .ToArray();

        var violations = new List<string>();

        foreach (var file in presentationFiles)
        {
            var lines = File.ReadAllLines(file);

            for (var index = 0; index < lines.Length; index++)
            {
                foreach (var pattern in ForbiddenEndpointPatterns)
                {
                    if (lines[index].Contains(pattern, StringComparison.Ordinal))
                    {
                        violations.Add(
                            $"{Path.GetRelativePath(root, file)}:{index + 1} ({pattern})");
                    }
                }
            }
        }

        violations.ShouldBeEmpty(
            "Endpoint error responses must use HttpContext.ToProblem(...) from Hani.BuildingBlocks.AspNetCore. " +
            "Violations: " + string.Join(", ", violations));
    }

    [Fact]
    public void ProblemDetails_Must_Be_Created_Only_By_The_Central_Factory()
    {
        var root = FindRepositoryRoot();
        var sourceFiles = Directory
            .EnumerateFiles(Path.Combine(root, "src"), "*.cs", SearchOption.AllDirectories)
            .Where(path => !path.Contains($"{Path.DirectorySeparatorChar}obj{Path.DirectorySeparatorChar}"))
            .Where(path => !path.Contains($"{Path.DirectorySeparatorChar}bin{Path.DirectorySeparatorChar}"))
            .Where(path => !path.Contains("Hani.BuildingBlocks.AspNetCore"))
            .ToArray();

        var violations = sourceFiles
            .Where(path => File.ReadAllText(path).Contains("Results.Problem(", StringComparison.Ordinal))
            .Select(path => Path.GetRelativePath(root, path))
            .ToArray();

        violations.ShouldBeEmpty(
            "Results.Problem is only allowed inside Hani.BuildingBlocks.AspNetCore. Violations: " +
            string.Join(", ", violations));
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
}
