using Hani.Modules.Identity.Domain.Users;
using Shouldly;

namespace Hani.UnitTests.Identity;

public sealed class UserAuthTests
{
    [Fact]
    public void User_Should_Create_Pending_Profile_And_Activate_After_Otp()
    {
        var now = new DateTimeOffset(2026, 11, 13, 10, 0, 0, TimeSpan.Zero);
        var user = User.Create(TestIds.Generator, "+989120000000", now: now);

        user.Status.ShouldBe(UserStatus.Pending);
        user.Mobile.ShouldBe("+989120000000");
        user.Username.ShouldStartWith("user-");

        var otp = user.AddOtp(
            TestIds.Generator,
            "hash",
            OtpPurpose.Login,
            now,
            TimeSpan.FromMinutes(2));

        user.FindActiveOtp(OtpPurpose.Login, now.AddMinutes(1)).ShouldBe(otp);

        otp.Consume(now.AddMinutes(1));
        user.Activate(now.AddMinutes(1));

        user.Status.ShouldBe(UserStatus.Active);
        user.LastLoginAt.ShouldBe(now.AddMinutes(1));
        otp.IsActive(now.AddMinutes(1)).ShouldBeFalse();
    }

    [Fact]
    public void Otp_Should_Expire_And_Lock_After_Failed_Attempts()
    {
        var now = new DateTimeOffset(2026, 11, 13, 10, 0, 0, TimeSpan.Zero);
        var user = User.Create(TestIds.Generator, "09120000000", now: now);
        var otp = user.AddOtp(
            TestIds.Generator,
            "hash",
            OtpPurpose.Login,
            now,
            TimeSpan.FromMinutes(2));

        otp.IsActive(now.AddMinutes(3)).ShouldBeFalse();

        for (var index = 0; index < 5; index++)
        {
            otp.RecordFailedAttempt();
        }

        otp.IsActive(now.AddMinutes(1)).ShouldBeFalse();
        Should.Throw<InvalidOperationException>(() => otp.Consume(now.AddMinutes(1)));
    }

    [Fact]
    public void RefreshToken_Should_Rotate_And_Revoke()
    {
        var now = new DateTimeOffset(2026, 11, 13, 10, 0, 0, TimeSpan.Zero);
        var user = User.Create(TestIds.Generator, "09120000000", now: now);
        var token = user.AddRefreshToken(
            TestIds.Generator,
            "old",
            now,
            TimeSpan.FromDays(30));

        token.IsActive(now.AddDays(1)).ShouldBeTrue();

        user.RevokeRefreshToken("old", now.AddDays(1), "new").ShouldBeTrue();
        token.IsActive(now.AddDays(2)).ShouldBeFalse();
        token.ReplacedByTokenHash.ShouldBe("new");
        user.RevokeRefreshToken("old", now.AddDays(2)).ShouldBeFalse();
    }

    [Fact]
    public void UpdateProfile_Should_Validate_Email_And_Set_Username()
    {
        var now = new DateTimeOffset(2026, 11, 13, 10, 0, 0, TimeSpan.Zero);
        var user = User.Create(TestIds.Generator, "09120000000", now: now);

        user.UpdateProfile("Sara", "Ahmadi", "sara@example.com", "Bio", null, now);
        user.DisplayName.ShouldBe("Sara Ahmadi");
        user.Email.ShouldBe("sara@example.com");

        user.SetUsername("Sara-Author", now);
        user.Username.ShouldBe("sara-author");

        Should.Throw<ArgumentException>(() =>
            user.UpdateProfile("Sara", "Ahmadi", "invalid-email", null, null, now));
        Should.Throw<ArgumentException>(() => user.SetUsername("a", now));
    }
}
