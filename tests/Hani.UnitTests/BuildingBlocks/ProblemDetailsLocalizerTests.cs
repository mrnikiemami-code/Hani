using Hani.BuildingBlocks.Application;
using Hani.BuildingBlocks.AspNetCore;
using Shouldly;

namespace Hani.UnitTests.BuildingBlocks;

public sealed class ProblemDetailsLocalizerTests
{
    static ProblemDetailsLocalizerTests()
    {
        ProblemDetailsLocalizer.Configure(new LocalizationOptions
        {
            DefaultCulture = "fa-IR",
            SupportedCultures = ["fa-IR", "en-US", "ar-SA"],
            ProblemTitles = new Dictionary<string, Dictionary<string, string>>
            {
                ["fa"] = new() { ["Validation"] = "داده‌های ورودی نامعتبر است.", ["NotFound"] = "موردی یافت نشد." },
                ["en"] = new() { ["Validation"] = "The request is invalid.", ["NotFound"] = "The requested item was not found." },
                ["ar"] = new() { ["Validation"] = "البيانات المدخلة غير صالحة.", ["NotFound"] = "لم يتم العثور على العنصر المطلوب." }
            }
        });
    }

    [Theory]
    [InlineData("fa-IR")]
    [InlineData("en-US")]
    [InlineData("ar-SA")]
    public void NotFound_Should_Be_Localized(string culture)
    {
        var title = ProblemDetailsLocalizer.Title(ErrorType.NotFound, culture);

        title.ShouldNotBeNullOrWhiteSpace();
        title.ShouldNotContain("HANI-");
    }

    [Fact]
    public void Invalid_Culture_Should_Fall_Back_To_Persian()
    {
        var title = ProblemDetailsLocalizer.Title(ErrorType.Validation, "de-DE");

        title.ShouldBe("داده‌های ورودی نامعتبر است.");
    }
}
