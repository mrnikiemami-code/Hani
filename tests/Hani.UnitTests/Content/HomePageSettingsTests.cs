using Hani.Modules.Content.Domain.Settings;
using Shouldly;

namespace Hani.UnitTests.Content;

public sealed class HomePageSettingsTests
{
    [Fact]
    public void Create_normalizes_key_and_locale()
    {
        var settings = HomePageSettings.Create(" Default ", " FA ", """{"sections":[]}""");

        settings.Key.ShouldBe("default");
        settings.Locale.ShouldBe("fa");
        settings.SettingsJson.ShouldContain("sections");
        settings.UpdatedAt.ShouldNotBe(default);
    }

    [Fact]
    public void Update_replaces_json()
    {
        var settings = HomePageSettings.Create("default", "fa", "{}");

        settings.Update("""{"heroImageUrl":"https://cdn.hani.ir/hero.jpg"}""");

        settings.SettingsJson.ShouldContain("heroImageUrl");
    }

    [Fact]
    public void Empty_locale_is_rejected()
    {
        Should.Throw<ArgumentException>(() =>
            HomePageSettings.Create("default", " ", "{}"));
    }
}
