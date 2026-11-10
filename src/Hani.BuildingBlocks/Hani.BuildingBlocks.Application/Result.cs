namespace Hani.BuildingBlocks.Application;

public interface IResult
{
    bool IsSuccess { get; }

    Error? Error { get; }
}

public readonly record struct Result<T> : IResult
{
    public bool IsSuccess { get; private init; }

    public T? Value { get; private init; }

    public Error? Error { get; private init; }

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
