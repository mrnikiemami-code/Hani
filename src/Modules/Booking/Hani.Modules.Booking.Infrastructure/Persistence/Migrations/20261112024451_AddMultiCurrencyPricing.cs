using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hani.Modules.Booking.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddMultiCurrencyPricing : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "pricing",
                schema: "booking",
                table: "quotes",
                type: "jsonb",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "pricing",
                schema: "booking",
                table: "orders",
                type: "jsonb",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "pricing",
                schema: "booking",
                table: "contracts",
                type: "jsonb",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "pricing",
                schema: "booking",
                table: "quotes");

            migrationBuilder.DropColumn(
                name: "pricing",
                schema: "booking",
                table: "orders");

            migrationBuilder.DropColumn(
                name: "pricing",
                schema: "booking",
                table: "contracts");
        }
    }
}
