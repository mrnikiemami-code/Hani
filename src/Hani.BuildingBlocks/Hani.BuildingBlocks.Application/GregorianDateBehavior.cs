using System.Reflection;
using MediatR;

namespace Hani.BuildingBlocks.Application;

/// <summary>
/// Rejects non-Gregorian DateOnly values before handlers run.
/// </summary>
public sealed class GregorianDateBehavior<TRequest, TResponse>
    : IPipelineBehavior<TRequest, TResponse>
    where TRequest : notnull
{
    /// <summary>
    /// Scans DateOnly properties and common start/end pairs on the request.
    /// </summary>
    public async Task<TResponse> Handle(
        TRequest request,
        RequestHandlerDelegate<TResponse> next,
        CancellationToken cancellationToken)
    {
        var properties = typeof(TRequest).GetProperties(BindingFlags.Public | BindingFlags.Instance);
        var dateProperties = properties
            .Where(property =>
                property.PropertyType == typeof(DateOnly) ||
                Nullable.GetUnderlyingType(property.PropertyType) == typeof(DateOnly))
            .ToArray();

        if (dateProperties.Length == 0)
        {
            return await next();
        }

        var errors = new Dictionary<string, string[]>(StringComparer.Ordinal);

        foreach (var property in dateProperties)
        {
            var value = (DateOnly?)property.GetValue(request);
            if (!GregorianDateGuards.IsAccepted(value))
            {
                errors[property.Name] =
                [
                    "Date must be a Gregorian ISO date in the supported range."
                ];
            }
        }

        foreach (var (startName, endName) in new[]
                 {
                     ("StartDate", "EndDate"),
                     ("CheckIn", "CheckOut"),
                     ("PeriodStart", "PeriodEnd")
                 })
        {
            var startProperty = properties.FirstOrDefault(property =>
                property.Name.Equals(startName, StringComparison.Ordinal));
            var endProperty = properties.FirstOrDefault(property =>
                property.Name.Equals(endName, StringComparison.Ordinal));

            if (startProperty is null || endProperty is null)
            {
                continue;
            }

            var start = (DateOnly?)startProperty.GetValue(request);
            var end = (DateOnly?)endProperty.GetValue(request);
            if (!GregorianDateGuards.IsOrdered(start, end))
            {
                errors[startName] =
                [
                    $"{startName} must be on or before {endName}."
                ];
            }
        }

        if (errors.Count == 0)
        {
            return await next();
        }

        var error = Error.Validation(
            "HANI-COMMON-1003",
            "Date values must be Gregorian and ordered.") with
        {
            Errors = errors
        };

        if (typeof(TResponse).IsGenericType &&
            typeof(TResponse).GetGenericTypeDefinition() == typeof(Result<>))
        {
            var failureMethod = typeof(TResponse).GetMethod(
                nameof(Result<object>.Failure),
                BindingFlags.Public | BindingFlags.Static);

            return (TResponse)failureMethod!.Invoke(null, [error])!;
        }

        throw new InvalidOperationException(error.Message);
    }
}
