using System.Text.RegularExpressions;
using Shouldly;

namespace Hani.ArchitectureTests;

public sealed class DocumentationTests
{
    private static readonly Regex PublicTypePattern = new(
        @"^\s*public\s+(?:sealed\s+|abstract\s+|static\s+|readonly\s+|partial\s+)*(?:class|interface|record|enum|struct)\s+(?<name>[A-Za-z0-9_]+)",
        RegexOptions.Compiled);

    [Fact]
    public void Every_Public_Type_Should_Have_A_Summary()
    {
        var root = FindRepositoryRoot();
        var files = Directory
            .EnumerateFiles(Path.Combine(root, "src"), "*.cs", SearchOption.AllDirectories)
            .Where(path => !path.Contains($"{Path.DirectorySeparatorChar}obj{Path.DirectorySeparatorChar}"))
            .Where(path => !path.Contains($"{Path.DirectorySeparatorChar}bin{Path.DirectorySeparatorChar}"))
            .Where(path => !path.Contains($"{Path.DirectorySeparatorChar}Migrations{Path.DirectorySeparatorChar}"));

        var missing = new List<string>();

        foreach (var file in files)
        {
            var lines = File.ReadAllLines(file);

            for (var index = 0; index < lines.Length; index++)
            {
                var match = PublicTypePattern.Match(lines[index]);

                if (!match.Success)
                {
                    continue;
                }

                var start = Math.Max(0, index - 4);
                var hasSummary = false;

                for (var probe = start; probe < index; probe++)
                {
                    if (lines[probe].Contains("<summary>", StringComparison.Ordinal))
                    {
                        hasSummary = true;
                        break;
                    }
                }

                if (!hasSummary)
                {
                    missing.Add($"{Path.GetRelativePath(root, file)}:{index + 1} ({match.Groups["name"].Value})");
                }
            }
        }

        missing.ShouldBeEmpty(
            "Public types must have an XML <summary>. Missing: " + string.Join(", ", missing));
    }

    [Fact]
    public void Every_Endpoint_Handler_Should_Have_A_Summary()
    {
        var root = FindRepositoryRoot();
        var files = Directory
            .EnumerateFiles(Path.Combine(root, "src", "Modules"), "*Endpoints.cs", SearchOption.AllDirectories)
            .Where(path => !path.Contains($"{Path.DirectorySeparatorChar}obj{Path.DirectorySeparatorChar}"))
            .Where(path => !path.Contains($"{Path.DirectorySeparatorChar}bin{Path.DirectorySeparatorChar}"));

        var handlerPattern = new Regex(
            @"^\s*private\s+static\s+async\s+Task<IResult>\s+(?<name>[A-Za-z0-9_]+)\s*\(",
            RegexOptions.Compiled);

        var missing = new List<string>();

        foreach (var file in files)
        {
            var lines = File.ReadAllLines(file);

            for (var index = 0; index < lines.Length; index++)
            {
                var match = handlerPattern.Match(lines[index]);

                if (!match.Success)
                {
                    continue;
                }

                var start = Math.Max(0, index - 8);
                var hasSummary = false;

                for (var probe = start; probe < index; probe++)
                {
                    if (lines[probe].Contains("<summary>", StringComparison.Ordinal))
                    {
                        hasSummary = true;
                        break;
                    }
                }

                if (!hasSummary)
                {
                    missing.Add(
                        $"{Path.GetRelativePath(root, file)}:{index + 1} ({match.Groups["name"].Value})");
                }
            }
        }

        missing.ShouldBeEmpty(
            "Every endpoint handler must have an XML <summary>. Missing: " +
            string.Join(", ", missing));
    }

    [Fact]
    public void Required_Documentation_Files_Should_Exist()
    {
        var root = FindRepositoryRoot();
        var required = new[]
        {
            "AGENTS.md",
            "docs/engineering/code-documentation.md",
            "src/Hani.Api/README.md",
            "src/Hani.BuildingBlocks/README.md",
            "src/Modules/Supply/README.md",
            "src/Modules/Catalog/README.md",
            "src/Modules/Identity/README.md",
            "src/Modules/Marketplace/README.md",
            "src/Modules/Booking/README.md",
            "src/Modules/Payments/README.md",
            "src/Modules/Settlement/README.md"
        };

        var missing = required
            .Where(path => !File.Exists(Path.Combine(root, path.Replace('/', Path.DirectorySeparatorChar))))
            .ToArray();

        missing.ShouldBeEmpty("Required documentation files are missing: " + string.Join(", ", missing));
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
