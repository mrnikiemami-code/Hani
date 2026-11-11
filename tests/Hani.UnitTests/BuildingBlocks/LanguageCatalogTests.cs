using Hani.BuildingBlocks.Application;
using Hani.BuildingBlocks.Infrastructure.Localization;
using Microsoft.Extensions.Options;
using Shouldly;

namespace Hani.UnitTests.BuildingBlocks;

public sealed class LanguageCatalogTests
{
    [Fact]
    public void Adding_A_Language_Should_Be_Configuration_Only()
    {
        var catalog = new LanguageCatalog(Options.Create(new LocalizationOptions
        {
            DefaultCulture = "fa-IR",
            SupportedCultures = ["fa-IR", "en-US", "de-DE"]
        }));

        catalog.SupportedLanguages.ShouldContain("de");
        catalog.IsSupported("de").ShouldBeTrue();
        catalog.Normalize("de-DE").ShouldBe("de");
    }

    [Fact]
    public void Unknown_Language_Should_Fall_Back_To_Default()
    {
        var catalog = new LanguageCatalog(Options.Create(new LocalizationOptions
        {
            DefaultCulture = "fa-IR",
            SupportedCultures = ["fa-IR", "en-US"]
        }));

        catalog.Normalize("fr-FR").ShouldBe("fa");
        catalog.IsSupported("fr").ShouldBeFalse();
        catalog.Normalize(null).ShouldBe("fa");
    }
}
