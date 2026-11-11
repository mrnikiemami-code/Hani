using Hani.BuildingBlocks.Infrastructure.Ids;
using Shouldly;

namespace Hani.UnitTests.BuildingBlocks;

public sealed class Uuid7IdGeneratorTests
{
    [Fact]
    public void NewId_Should_Return_Uuid7()
    {
        var id = new Uuid7IdGenerator().NewId();

        id.ShouldNotBe(Guid.Empty);
        id.ToString()[14].ShouldBe('7');
    }
}
