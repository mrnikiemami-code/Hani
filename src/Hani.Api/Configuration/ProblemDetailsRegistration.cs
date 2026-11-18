using Hani.BuildingBlocks.AspNetCore;

namespace Hani.Api.Configuration;

/// <summary>Registers RFC 7807 problem-details handling.</summary>
public static class ProblemDetailsRegistration
{
    /// <summary>Adds the Hani exception handler and problem details.</summary>
    public static IServiceCollection AddHaniProblemDetails(this IServiceCollection services)
    {
        services.AddExceptionHandler<HaniExceptionHandler>();
        services.AddProblemDetails();
        return services;
    }
}
