using System.Reflection;
using FluentValidation;
using MediatR;

namespace Hani.BuildingBlocks.Application;

public sealed class ValidationBehavior<TRequest, TResponse>(
    IEnumerable<IValidator<TRequest>> validators)
    : IPipelineBehavior<TRequest, TResponse>
    where TRequest : notnull
{
    public async Task<TResponse> Handle(
        TRequest request,
        RequestHandlerDelegate<TResponse> next,
        CancellationToken cancellationToken)
    {
        if (!validators.Any())
        {
            return await next();
        }

        var context = new ValidationContext<TRequest>(request);

        var results = await Task.WhenAll(
            validators.Select(validator => validator.ValidateAsync(context, cancellationToken)));

        var failures = results
            .SelectMany(result => result.Errors)
            .Where(failure => failure is not null)
            .ToArray();

        if (failures.Length == 0)
        {
            return await next();
        }

        var first = failures[0];
        var code = string.IsNullOrWhiteSpace(first.ErrorCode)
            ? "HANI-COMMON-1002"
            : first.ErrorCode;

        var error = Error.Validation(code, first.ErrorMessage);

        if (typeof(TResponse).IsGenericType &&
            typeof(TResponse).GetGenericTypeDefinition() == typeof(Result<>))
        {
            var failureMethod = typeof(TResponse).GetMethod(
                nameof(Result<object>.Failure),
                BindingFlags.Public | BindingFlags.Static);

            return (TResponse)failureMethod!.Invoke(null, [error])!;
        }

        throw new ValidationException(failures);
    }
}
