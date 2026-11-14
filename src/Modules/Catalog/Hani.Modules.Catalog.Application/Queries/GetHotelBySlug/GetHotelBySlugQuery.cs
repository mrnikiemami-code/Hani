using Hani.BuildingBlocks.Application;

namespace Hani.Modules.Catalog.Application.Queries.GetHotelBySlug;

/// <summary>
/// Query that returns a canonical hotel by slug.
/// </summary>
public sealed record GetHotelBySlugQuery(string Slug)
    : IQuery<Hani.Modules.Catalog.Application.Commands.CreateHotel.HotelDto>;
