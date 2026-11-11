using Hani.BuildingBlocks.Application;
using Hani.Modules.Booking.Application.Commands.CreateQuote;

namespace Hani.Modules.Booking.Application.Queries.GetQuote;

/// <summary>
/// Query that reads a quote by id.
/// </summary>
public sealed record GetQuoteQuery(Guid QuoteId) : IQuery<QuoteDto>;
