using Shouldly;

namespace Hani.ArchitectureTests;

public sealed class IdGenerationTests
{
    [Fact]
    public void Application_And_Domain_Should_Use_IIdGenerator()
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

        var violations = sourceFiles
            .Where(path =>
            {
                var source = File.ReadAllText(path);
                return source.Contains("Guid.CreateVersion7()", StringComparison.Ordinal) ||
                       source.Contains("Guid.NewGuid()", StringComparison.Ordinal);
            })
            .Select(path => Path.GetRelativePath(root, path))
            .ToArray();

        violations.ShouldBeEmpty(
            "GUIDs must be created through IIdGenerator outside Infrastructure. Violations: " +
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
