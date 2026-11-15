using Hani.Modules.Identity.Application.Abstractions;
using Hani.Modules.Identity.Application.Commands.Preferences;
using Hani.Modules.Identity.Domain.Users;
using Hani.UnitTests.Marketplace;
using Shouldly;

namespace Hani.UnitTests.Identity;

public sealed class UserPreferencesTests
{
    [Fact]
    public async Task GetPreferences_Should_Return_Defaults_When_No_Row_Exists()
    {
        var repository = new FakeUserPreferencesRepository();
        var handler = new GetUserPreferencesQueryHandler(repository, new FakeLanguageCatalog());
        var userId = Guid.CreateVersion7();

        var result = await handler.Handle(
            new GetUserPreferencesQuery(userId),
            CancellationToken.None);

        result.IsSuccess.ShouldBeTrue();
        result.Value!.UserId.ShouldBe(userId);
        result.Value.HomeExperienceId.ShouldBe(HomeExperienceCatalog.DefaultId);
        result.Value.Locale.ShouldBe("fa");
        result.Value.Currency.ShouldBe(HomeExperienceCatalog.DefaultCurrency);
        result.Value.Theme.ShouldBe("system");
        result.Value.ReducedMotion.ShouldBeFalse();
    }

    [Fact]
    public async Task UpdatePreferences_Should_Normalize_And_Persist_Values()
    {
        var repository = new FakeUserPreferencesRepository();
        var languages = new FakeLanguageCatalog();
        var update = new UpdateUserPreferencesCommandHandler(repository, languages);
        var get = new GetUserPreferencesQueryHandler(repository, languages);
        var userId = Guid.CreateVersion7();

        var updated = await update.Handle(
            new UpdateUserPreferencesCommand(
                userId,
                "hotel",
                "en-US",
                "usd",
                "DARK",
                ReducedMotion: true),
            CancellationToken.None);

        updated.IsSuccess.ShouldBeTrue();
        updated.Value!.HomeExperienceId.ShouldBe("hotel");
        updated.Value.Locale.ShouldBe("en");
        updated.Value.Currency.ShouldBe("USD");
        updated.Value.Theme.ShouldBe("dark");
        updated.Value.ReducedMotion.ShouldBeTrue();

        var fetched = await get.Handle(new GetUserPreferencesQuery(userId), CancellationToken.None);
        fetched.Value!.HomeExperienceId.ShouldBe("hotel");
        fetched.Value.ReducedMotion.ShouldBeTrue();
    }

    [Fact]
    public async Task UpdatePreferences_Should_Fall_Back_For_Invalid_Values()
    {
        var repository = new FakeUserPreferencesRepository();
        var languages = new FakeLanguageCatalog();
        var update = new UpdateUserPreferencesCommandHandler(repository, languages);
        var get = new GetUserPreferencesQueryHandler(repository, languages);
        var userId = Guid.CreateVersion7();

        await update.Handle(
            new UpdateUserPreferencesCommand(
                userId,
                "not-a-layout",
                "xx",
                "EURO",
                "neon",
                ReducedMotion: false),
            CancellationToken.None);

        var fetched = await get.Handle(new GetUserPreferencesQuery(userId), CancellationToken.None);
        fetched.Value!.HomeExperienceId.ShouldBe(HomeExperienceCatalog.DefaultId);
        fetched.Value.Locale.ShouldBe("fa");
        fetched.Value.Currency.ShouldBe(HomeExperienceCatalog.DefaultCurrency);
        fetched.Value.Theme.ShouldBe("system");
    }

    private sealed class FakeUserPreferencesRepository : IUserPreferencesRepository
    {
        private readonly Dictionary<Guid, UserPreferences> _items = [];

        public Task<UserPreferences?> GetByUserIdAsync(
            Guid userId,
            CancellationToken cancellationToken)
            => Task.FromResult(
                _items.TryGetValue(userId, out var preferences) ? preferences : null);

        public Task SaveAsync(
            UserPreferences preferences,
            CancellationToken cancellationToken)
        {
            _items[preferences.UserId] = preferences;
            return Task.CompletedTask;
        }
    }
}
