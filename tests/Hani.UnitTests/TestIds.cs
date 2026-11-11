using Hani.BuildingBlocks.Domain;
using Hani.BuildingBlocks.Infrastructure.Ids;

namespace Hani.UnitTests;

internal static class TestIds
{
    public static readonly IIdGenerator Generator = new Uuid7IdGenerator();
}
