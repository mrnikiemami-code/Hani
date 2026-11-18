using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hani.Modules.Catalog.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddHotelPoliciesAmenitiesRoomDetails : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "policies",
                schema: "catalog",
                table: "hotel_translations",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "bed_type",
                schema: "catalog",
                table: "hotel_rooms",
                type: "character varying(120)",
                maxLength: 120,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "cancellation_policy",
                schema: "catalog",
                table: "hotel_rooms",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "inventory",
                schema: "catalog",
                table: "hotel_rooms",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "max_occupancy",
                schema: "catalog",
                table: "hotel_rooms",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "rate_plan",
                schema: "catalog",
                table: "hotel_rooms",
                type: "character varying(120)",
                maxLength: 120,
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "room_size",
                schema: "catalog",
                table: "hotel_rooms",
                type: "numeric(8,2)",
                precision: 8,
                scale: 2,
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "stop_sell",
                schema: "catalog",
                table: "hotel_rooms",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<decimal>(
                name: "tax_percent",
                schema: "catalog",
                table: "hotel_rooms",
                type: "numeric(5,2)",
                precision: 5,
                scale: 2,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "view",
                schema: "catalog",
                table: "hotel_rooms",
                type: "character varying(120)",
                maxLength: 120,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "code",
                schema: "catalog",
                table: "hotel_amenities",
                type: "character varying(120)",
                maxLength: 120,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "icon",
                schema: "catalog",
                table: "hotel_amenities",
                type: "character varying(120)",
                maxLength: 120,
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "sort_order",
                schema: "catalog",
                table: "hotel_amenities",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "policies",
                schema: "catalog",
                table: "hotel_translations");

            migrationBuilder.DropColumn(
                name: "bed_type",
                schema: "catalog",
                table: "hotel_rooms");

            migrationBuilder.DropColumn(
                name: "cancellation_policy",
                schema: "catalog",
                table: "hotel_rooms");

            migrationBuilder.DropColumn(
                name: "inventory",
                schema: "catalog",
                table: "hotel_rooms");

            migrationBuilder.DropColumn(
                name: "max_occupancy",
                schema: "catalog",
                table: "hotel_rooms");

            migrationBuilder.DropColumn(
                name: "rate_plan",
                schema: "catalog",
                table: "hotel_rooms");

            migrationBuilder.DropColumn(
                name: "room_size",
                schema: "catalog",
                table: "hotel_rooms");

            migrationBuilder.DropColumn(
                name: "stop_sell",
                schema: "catalog",
                table: "hotel_rooms");

            migrationBuilder.DropColumn(
                name: "tax_percent",
                schema: "catalog",
                table: "hotel_rooms");

            migrationBuilder.DropColumn(
                name: "view",
                schema: "catalog",
                table: "hotel_rooms");

            migrationBuilder.DropColumn(
                name: "code",
                schema: "catalog",
                table: "hotel_amenities");

            migrationBuilder.DropColumn(
                name: "icon",
                schema: "catalog",
                table: "hotel_amenities");

            migrationBuilder.DropColumn(
                name: "sort_order",
                schema: "catalog",
                table: "hotel_amenities");
        }
    }
}
