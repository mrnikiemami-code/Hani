using Shouldly;

namespace Hani.ArchitectureTests;

/// <summary>Enforces the API composition-root and folder contract.</summary>
public sealed class ProgramCompositionTests
{
    [Fact]
    public void Program_Should_Remain_A_Thin_Composition_Root()
    {
        var root = FindRepositoryRoot();
        var path = Path.Combine(root, "src", "Hani.Api", "Program.cs");
        var source = File.ReadAllText(path);

        source.Contains("AddHaniApi()", StringComparison.Ordinal).ShouldBeTrue();
        source.Contains("UseHaniApi()", StringComparison.Ordinal).ShouldBeTrue();
        source.Contains("public partial class Program", StringComparison.Ordinal)
            .ShouldBeTrue();

        foreach (var forbidden in new[]
                 {
                     "AddDbContext", "AddScoped", "AddSingleton", "AddTransient",
                     "UseMiddleware", "MapGet", "MapPost", "AddAuthentication",
                     "AddAuthorization", "AddRateLimiter", "AddLocalization",
                     "AddHealthChecks"
                 })
        {
            source.Contains(forbidden, StringComparison.Ordinal).ShouldBeFalse(
                $"Program.cs must not contain '{forbidden}'.");
        }

        source.Split('\n').Length.ShouldBeLessThanOrEqualTo(15);
    }

    [Fact]
    public void Composition_Folders_Should_Exist()
    {
        var root = FindRepositoryRoot();
        var api = Path.Combine(root, "src", "Hani.Api");

        Directory.Exists(Path.Combine(api, "Configuration")).ShouldBeTrue();
        Directory.Exists(Path.Combine(api, "Pipeline")).ShouldBeTrue();
        Directory.Exists(Path.Combine(api, "Endpoints", "Admin")).ShouldBeTrue();
        Directory.Exists(Path.Combine(api, "Endpoints", "Public")).ShouldBeTrue();
        Directory.Exists(Path.Combine(api, "Endpoints", "Channel")).ShouldBeTrue();
        Directory.Exists(Path.Combine(api, "Middleware")).ShouldBeTrue();
        Directory.Exists(Path.Combine(api, "Health")).ShouldBeTrue();
        Directory.Exists(Path.Combine(api, "Auditing")).ShouldBeTrue();
    }

    [Fact]
    public void Endpoint_Files_Should_Not_Be_Loose_In_Api_Root()
    {
        var root = FindRepositoryRoot();
        var api = Path.Combine(root, "src", "Hani.Api");
        var loose = Directory
            .EnumerateFiles(api, "*Endpoints.cs", SearchOption.TopDirectoryOnly)
            .Select(Path.GetFileName)
            .ToArray();

        loose.ShouldBeEmpty(
            "Endpoint files must live under Endpoints/{Admin|Public|Channel}. Loose files: " +
            string.Join(", ", loose));
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
