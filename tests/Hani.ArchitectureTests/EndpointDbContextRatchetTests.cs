using Shouldly;

namespace Hani.ArchitectureTests;

/// <summary>
/// Ratchet against the known anti-pattern of querying DbContext directly from
/// HTTP endpoint files. The allowlist is architectural debt; every new file is
/// rejected until it moves its query to the application layer.
/// </summary>
public sealed class EndpointDbContextRatchetTests
{
    private static readonly HashSet<string> KnownDebt = new(StringComparer.OrdinalIgnoreCase);

    [Fact]
    public void New_Endpoint_Files_Must_Not_Query_DbContext_Directly()
    {
        var root = FindRepositoryRoot();
        var apiDirectory = Path.Combine(root, "src", "Hani.Api");
        var violations = Directory
            .EnumerateFiles(apiDirectory, "*.cs", SearchOption.TopDirectoryOnly)
            .Where(ContainsEndpointMapping)
            .Where(ContainsPersistenceAccess)
            .Select(Path.GetFileName)
            .Where(fileName => fileName is not null && !KnownDebt.Contains(fileName))
            .ToArray();

        violations.ShouldBeEmpty(
            "Endpoint files must not inject DbContext or reference EF Core. " +
            "Move query logic to an application query/read model. New violations: " +
            string.Join(", ", violations));
    }

    [Fact]
    public void Ads_Endpoint_Must_Use_Application_Queries()
    {
        var root = FindRepositoryRoot();
        var path = Path.Combine(root, "src", "Hani.Api", "AdminAdsEndpoints.cs");
        var source = File.ReadAllText(path);

        source.Contains("DbContext", StringComparison.Ordinal).ShouldBeFalse();
        source.Contains("Microsoft.EntityFrameworkCore", StringComparison.Ordinal).ShouldBeFalse();
        source.Contains("Infrastructure.Persistence", StringComparison.Ordinal).ShouldBeFalse();
        source.Contains("ListAdminAdSlotsQuery", StringComparison.Ordinal).ShouldBeTrue();
    }

    private static bool ContainsEndpointMapping(string path)
    {
        var source = File.ReadAllText(path);
        return source.Contains("MapGet(", StringComparison.Ordinal) ||
            source.Contains("MapPost(", StringComparison.Ordinal) ||
            source.Contains("MapPut(", StringComparison.Ordinal) ||
            source.Contains("MapDelete(", StringComparison.Ordinal);
    }

    private static bool ContainsPersistenceAccess(string path)
    {
        var source = File.ReadAllText(path);
        return source.Contains("DbContext", StringComparison.Ordinal) ||
            source.Contains("Microsoft.EntityFrameworkCore", StringComparison.Ordinal);
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
