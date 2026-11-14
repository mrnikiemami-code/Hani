using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hani.Modules.Catalog.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddGate51VerticalDepth : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "issuance_type",
                schema: "catalog",
                table: "visa_types",
                type: "character varying(40)",
                maxLength: 40,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "category",
                schema: "catalog",
                table: "visa_documents",
                type: "character varying(80)",
                maxLength: 80,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<Guid>(
                name: "destination_airport_id",
                schema: "catalog",
                table: "flight_routes",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "origin_airport_id",
                schema: "catalog",
                table: "flight_routes",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "airline_id",
                schema: "catalog",
                table: "flight_offers",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "airlines",
                schema: "catalog",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    iata = table.Column<string>(type: "character varying(2)", maxLength: 2, nullable: false),
                    name = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    is_active = table.Column<bool>(type: "boolean", nullable: false),
                    created_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_airlines", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "airports",
                schema: "catalog",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    iata = table.Column<string>(type: "character varying(3)", maxLength: 3, nullable: false),
                    name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    city = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    country_code = table.Column<string>(type: "character varying(3)", maxLength: 3, nullable: false),
                    destination_id = table.Column<Guid>(type: "uuid", nullable: true),
                    latitude = table.Column<decimal>(type: "numeric(9,6)", precision: 9, scale: 6, nullable: true),
                    longitude = table.Column<decimal>(type: "numeric(9,6)", precision: 9, scale: 6, nullable: true),
                    created_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_airports", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "hotel_rooms",
                schema: "catalog",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    hotel_id = table.Column<Guid>(type: "uuid", nullable: false),
                    name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    room_type = table.Column<string>(type: "character varying(80)", maxLength: 80, nullable: false),
                    meal_plan = table.Column<string>(type: "character varying(40)", maxLength: 40, nullable: false),
                    adults = table.Column<int>(type: "integer", nullable: false),
                    children = table.Column<int>(type: "integer", nullable: false),
                    price = table.Column<decimal>(type: "numeric(18,2)", precision: 18, scale: 2, nullable: false),
                    currency = table.Column<string>(type: "character varying(3)", maxLength: 3, nullable: false),
                    description = table.Column<string>(type: "text", nullable: true),
                    sort_order = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_hotel_rooms", x => x.id);
                    table.ForeignKey(
                        name: "FK_hotel_rooms_hotels_hotel_id",
                        column: x => x.hotel_id,
                        principalSchema: "catalog",
                        principalTable: "hotels",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "place_dietary_options",
                schema: "catalog",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    place_id = table.Column<Guid>(type: "uuid", nullable: false),
                    name = table.Column<string>(type: "character varying(80)", maxLength: 80, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_place_dietary_options", x => x.id);
                    table.ForeignKey(
                        name: "FK_place_dietary_options_places_place_id",
                        column: x => x.place_id,
                        principalSchema: "catalog",
                        principalTable: "places",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "place_meal_periods",
                schema: "catalog",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    place_id = table.Column<Guid>(type: "uuid", nullable: false),
                    name = table.Column<string>(type: "character varying(80)", maxLength: 80, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_place_meal_periods", x => x.id);
                    table.ForeignKey(
                        name: "FK_place_meal_periods_places_place_id",
                        column: x => x.place_id,
                        principalSchema: "catalog",
                        principalTable: "places",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "ux_airlines_iata",
                schema: "catalog",
                table: "airlines",
                column: "iata",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_airports_destination_id",
                schema: "catalog",
                table: "airports",
                column: "destination_id");

            migrationBuilder.CreateIndex(
                name: "ux_airports_iata",
                schema: "catalog",
                table: "airports",
                column: "iata",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_hotel_rooms_hotel_sort",
                schema: "catalog",
                table: "hotel_rooms",
                columns: new[] { "hotel_id", "sort_order" });

            migrationBuilder.CreateIndex(
                name: "ux_place_dietary_options_place_name",
                schema: "catalog",
                table: "place_dietary_options",
                columns: new[] { "place_id", "name" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ux_place_meal_periods_place_name",
                schema: "catalog",
                table: "place_meal_periods",
                columns: new[] { "place_id", "name" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "airlines",
                schema: "catalog");

            migrationBuilder.DropTable(
                name: "airports",
                schema: "catalog");

            migrationBuilder.DropTable(
                name: "hotel_rooms",
                schema: "catalog");

            migrationBuilder.DropTable(
                name: "place_dietary_options",
                schema: "catalog");

            migrationBuilder.DropTable(
                name: "place_meal_periods",
                schema: "catalog");

            migrationBuilder.DropColumn(
                name: "issuance_type",
                schema: "catalog",
                table: "visa_types");

            migrationBuilder.DropColumn(
                name: "category",
                schema: "catalog",
                table: "visa_documents");

            migrationBuilder.DropColumn(
                name: "destination_airport_id",
                schema: "catalog",
                table: "flight_routes");

            migrationBuilder.DropColumn(
                name: "origin_airport_id",
                schema: "catalog",
                table: "flight_routes");

            migrationBuilder.DropColumn(
                name: "airline_id",
                schema: "catalog",
                table: "flight_offers");
        }
    }
}
