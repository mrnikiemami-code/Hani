using Hani.BuildingBlocks.Application;
using Hani.BuildingBlocks.AspNetCore;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Localization;
using Shouldly;

namespace Hani.UnitTests.BuildingBlocks;

public sealed class HaniProblemDetailsTests
{
    static HaniProblemDetailsTests()
    {
        ProblemDetailsLocalizer.Configure(new LocalizationOptions
        {
            DefaultCulture = "fa-IR",
            SupportedCultures = ["fa-IR", "en-US"],
            ProblemTitles = new Dictionary<string, Dictionary<string, string>>
            {
                ["fa"] = new()
                {
                    ["Validation"] = "داده‌های ورودی نامعتبر است.",
                    ["NotFound"] = "موردی یافت نشد.",
                    ["Failure"] = "خطای غیرمنتظره رخ داد."
                },
                ["en"] = new()
                {
                    ["Validation"] = "The request is invalid.",
                    ["NotFound"] = "The requested item was not found.",
                    ["Failure"] = "An unexpected error occurred."
                }
            }
        });
    }

    [Fact]
    public void Application_Error_Should_Produce_ProblemDetails_With_Correlation()
    {
        var context = CreateContext();
        var error = Error.NotFound("HANI-TEST-1001", "Test item was not found.");

        var problem = HaniProblemDetails.Create(context, error);

        problem.Status.ShouldBe(StatusCodes.Status404NotFound);
        problem.Title.ShouldBe("موردی یافت نشد.");
        problem.Detail.ShouldBe(error.Message);
        problem.Instance.ShouldBe("/api/test");
        problem.Type.ShouldNotBeNull();
        problem.Type!.ShouldContain(error.Code);
        problem.Extensions[HaniProblemDetails.CodeExtension].ShouldBe(error.Code);
        problem.Extensions[HaniProblemDetails.CorrelationIdExtension].ShouldBe("corr-123");
        problem.Extensions[HaniProblemDetails.LocaleExtension].ShouldBe("fa-IR");
        problem.Extensions[HaniProblemDetails.TraceIdExtension].ShouldNotBeNull();
    }

    [Fact]
    public void Validation_Error_Should_Include_Field_Errors()
    {
        var context = CreateContext();
        var error = Error.Validation("HANI-TEST-1002", "Invalid input.") with
        {
            Errors = new Dictionary<string, string[]>
            {
                ["title"] = ["Title is required."]
            }
        };

        var problem = HaniProblemDetails.Create(context, error);

        problem.Status.ShouldBe(StatusCodes.Status400BadRequest);
        var errors = problem.Extensions[HaniProblemDetails.ErrorsExtension]
            .ShouldBeAssignableTo<IReadOnlyDictionary<string, string[]>>();
        errors!["title"].ShouldContain("Title is required.");
    }

    [Fact]
    public void Framework_Error_Should_Use_Default_Code_And_Localized_Title()
    {
        var context = CreateContext();

        var problem = HaniProblemDetails.Create(context, StatusCodes.Status403Forbidden);

        problem.Status.ShouldBe(StatusCodes.Status403Forbidden);
        problem.Extensions[HaniProblemDetails.CodeExtension].ShouldBe("HANI-COMMON-4030");
        problem.Title.ShouldNotBeNullOrWhiteSpace();
    }

    [Fact]
    public async Task WriteAsync_Should_Use_Problem_Json_Content_Type()
    {
        var context = CreateContext();
        context.Response.Body = new MemoryStream();
        var problem = HaniProblemDetails.Create(context, Error.Conflict("HANI-TEST-1003", "Conflict."));

        await HaniProblemDetails.WriteAsync(context, problem);

        context.Response.StatusCode.ShouldBe(StatusCodes.Status409Conflict);
        context.Response.ContentType.ShouldBe("application/problem+json");
        context.Response.Headers[CorrelationIdMiddleware.HeaderName].ToString().ShouldBe("corr-123");
        context.Response.Body.Length.ShouldBeGreaterThan(0);
    }

    private static DefaultHttpContext CreateContext()
    {
        var context = new DefaultHttpContext();
        context.Request.Path = "/api/test";
        context.TraceIdentifier = "trace-123";
        context.Items[CorrelationIdMiddleware.ItemKey] = "corr-123";
        context.Features.Set<IRequestCultureFeature>(
            new RequestCultureFeature(new RequestCulture("fa-IR"), null));
        return context;
    }
}
