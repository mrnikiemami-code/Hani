using System.Net;
using System.Text.Json;
using Hani.Modules.Content.Application.PageComposition;
using Hani.Modules.Content.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Shouldly;

namespace Hani.IntegrationTests;

/// <summary>Verifies page-composition draft/publish storage and public read.</summary>
public sealed class PageCompositionTests(PostgresFixture fixture)
    : IClassFixture<PostgresFixture>
{
    [Fact]
    public async Task Draft_And_Publish_Should_RoundTrip_And_Be_Publicly_Readable()
    {
        const string pageKey = "contact";
        const string locale = "en";
        using var scope = fixture.Factory.CreateScope();
        var service = scope.ServiceProvider.GetRequiredService<IPageCompositionService>();
        var db = scope.ServiceProvider.GetRequiredService<ContentDbContext>();
        using var document = JsonDocument.Parse(
            """{"hero":{"title":"Contact Hani"},"sections":[],"seo":{"title":"Contact"}}""");

        try
        {
            var draft = await service.SaveDraftAsync(
                pageKey,
                locale,
                document.RootElement.Clone(),
                CancellationToken.None);
            draft.Status.ShouldBe("Draft");

            var published = await service.PublishAsync(
                pageKey,
                locale,
                CancellationToken.None);
            published.Status.ShouldBe("Published");

            var reread = await service.GetAsync(
                pageKey,
                locale,
                published: true,
                CancellationToken.None);
            reread.ShouldNotBeNull();
            reread.Data.GetProperty("hero").GetProperty("title").GetString()
                .ShouldBe("Contact Hani");

            using var client = fixture.Factory.CreateClient();
            var response = await client.GetAsync(
                $"/market/v1/pages/{pageKey}?locale={locale}");
            response.StatusCode.ShouldBe(HttpStatusCode.OK);
            var body = await response.Content.ReadAsStringAsync();
            body.ShouldContain("Contact Hani");
        }
        finally
        {
            await db.HomePageSettings
                .Where(item =>
                    item.Locale == locale &&
                    (item.Key == $"page:{pageKey}" ||
                     item.Key == $"page:{pageKey}:published"))
                .ExecuteDeleteAsync();
        }
    }
}
