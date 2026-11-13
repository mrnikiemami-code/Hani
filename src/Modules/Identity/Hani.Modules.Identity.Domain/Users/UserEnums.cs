namespace Hani.Modules.Identity.Domain.Users;

/// <summary>
/// Lifecycle state of a marketplace user.
/// </summary>
public enum UserStatus
{
    Pending = 0,
    Active = 1,
    Blocked = 2,
    Deleted = 3
}

/// <summary>
/// Authorization role assigned to a user.
/// </summary>
public enum UserRole
{
    Customer = 0,
    Author = 1,
    AgencyStaff = 2,
    Admin = 3
}

/// <summary>
/// Purpose of a one-time password.
/// </summary>
public enum OtpPurpose
{
    Login = 0,
    VerifyMobile = 1,
    SensitiveAction = 2
}
