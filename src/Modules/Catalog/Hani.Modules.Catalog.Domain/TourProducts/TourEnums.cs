namespace Hani.Modules.Catalog.Domain.TourProducts;

/// <summary>
/// Commercial tour category used by marketplace filters.
/// </summary>
public enum TourCategory
{
    Normal = 0,
    Installment = 1,
    Luxury = 2
}

/// <summary>
/// Primary travel mode used by marketplace filters.
/// </summary>
public enum TravelType
{
    Other = 0,
    Air = 1,
    Bus = 2,
    Rail = 3
}

/// <summary>
/// Domestic or foreign tour scope used by home and search tabs.
/// </summary>
public enum TourScope
{
    Foreign = 0,
    Domestic = 1
}
