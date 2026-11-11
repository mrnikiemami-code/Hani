namespace Hani.BuildingBlocks.Application;

/// <summary>
/// Non-generic view over a result so infrastructure can inspect success/error.
/// </summary>
public interface IResult
{
    bool IsSuccess { get; }

    Error? Error { get; }
}

/// <summary>
/// Represents struct.
/// </summary>
public readonly record struct Result<T> : IResult
{
    public bool IsSuccess { get; init; }

    public T? Value { get; init; }

    public Error? Error { get; init; }

    public static Result<T> Success(T value) => new()
    {
        IsSuccess = true,
        Value = value
    };

    public static Result<T> Failure(Error error) => new()
    {
        IsSuccess = false,
        Error = error
    };
}
