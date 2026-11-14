namespace Hani.Modules.Identity.Domain.Reviews;

/// <summary>
/// Entity type that can receive a review.
/// </summary>
public enum ReviewTargetType
{
    Tour = 0,
    Hotel = 1,
    Agency = 2,
    Attraction = 3,
    Restaurant = 4
}

/// <summary>
/// Travel-party context selected by the reviewer.
/// </summary>
public enum TravelType
{
    Family = 0,
    Solo = 1,
    Couple = 2,
    Business = 3,
    Other = 4
}

/// <summary>
/// Moderation state of a review.
/// </summary>
public enum ReviewStatus
{
    Pending = 0,
    Published = 1,
    Rejected = 2
}

/// <summary>
/// Moderation state of a review photo.
/// </summary>
public enum ReviewPhotoStatus
{
    Pending = 0,
    Approved = 1,
    Rejected = 2
}
