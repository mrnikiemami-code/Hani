using MediatR;

namespace Hani.BuildingBlocks.Application;

/// <summary>
/// Marker interface for a command that mutates state and returns a <see cref="Result{T}"/>.
/// </summary>
public interface ICommand<TResponse> : IRequest<Result<TResponse>>;

/// <summary>
/// Marker interface for a query that reads data and returns a <see cref="Result{T}"/>.
/// </summary>
public interface IQuery<TResponse> : IRequest<Result<TResponse>>;

/// <summary>
/// Contract for a single command handler.
/// </summary>
public interface ICommandHandler<in TCommand, TResponse> : IRequestHandler<TCommand, Result<TResponse>>
    where TCommand : ICommand<TResponse>;

/// <summary>
/// Contract for a single query handler.
/// </summary>
public interface IQueryHandler<in TQuery, TResponse> : IRequestHandler<TQuery, Result<TResponse>>
    where TQuery : IQuery<TResponse>;
