using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hani.Modules.Supply.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddBookingModes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "booking_mode",
                schema: "supply",
                table: "agency_offers",
                type: "character varying(32)",
                maxLength: 32,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "collection_mode",
                schema: "supply",
                table: "agency_offers",
                type: "character varying(32)",
                maxLength: 32,
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "booking_mode",
                schema: "supply",
                table: "agency_offers");

            migrationBuilder.DropColumn(
                name: "collection_mode",
                schema: "supply",
                table: "agency_offers");
        }
    }
}
