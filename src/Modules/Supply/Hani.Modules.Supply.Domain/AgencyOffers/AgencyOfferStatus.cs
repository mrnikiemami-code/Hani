namespace Hani.Modules.Supply.Domain.AgencyOffers;

/// <summary>
/// Lifecycle state of an agency offer (draft, pending, approved, rejected, archived).
/// </summary>
public enum AgencyOfferStatus
{
    Draft = 0,
    Pending = 1,
    Approved = 2,
    Rejected = 3,
    Archived = 4
}
