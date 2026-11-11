using System.Text.RegularExpressions;
using Shouldly;

namespace Hani.ArchitectureTests;

public sealed class LocalizationHardcodeTests
{
    private static readonly Regex LanguageLiteralPattern = new(
        "\"(?<code>[a-z]{2}(?:-[A-Za-z]{2,4})?)\"",
        RegexOptions.Compiled);

    [Fact]
    public void Source_Should_Not_Hardcode_Language_Or_Culture()
    {
        var root = FindRepositoryRoot();
        var sourceFiles = Directory
            .EnumerateFiles(Path.Combine(root, "src"), "*.cs", SearchOption.AllDirectories)
            .Where(path => !path.Contains($"{Path.DirectorySeparatorChar}obj{Path.DirectorySeparatorChar}"))
            .Where(path => !path.Contains($"{Path.DirectorySeparatorChar}bin{Path.DirectorySeparatorChar}"))
            .Where(path => !path.Contains($"{Path.DirectorySeparatorChar}Migrations{Path.DirectorySeparatorChar}"))
            .Where(path => !path.Contains(".Infrastructure"))
            .Where(path => !path.Contains($"{Path.DirectorySeparatorChar}Infrastructure{Path.DirectorySeparatorChar}"))
            .ToArray();

        var violations = new List<string>();

        foreach (var file in sourceFiles)
        {
            var lines = File.ReadAllLines(file);

            for (var index = 0; index < lines.Length; index++)
            {
                var match = LanguageLiteralPattern.Match(lines[index]);

                if (match.Success)
                {
                    violations.Add(
                        $"{Path.GetRelativePath(root, file)}:{index + 1} ({match.Groups["code"].Value})");
                }
            }
        }

        violations.ShouldBeEmpty(
            "Language and culture codes must come from Localization configuration, not code. Violations: " +
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
