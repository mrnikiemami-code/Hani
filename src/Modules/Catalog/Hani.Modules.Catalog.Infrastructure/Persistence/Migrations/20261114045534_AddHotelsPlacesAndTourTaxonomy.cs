using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hani.Modules.Catalog.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddHotelsPlacesAndTourTaxonomy : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "category",
                schema: "catalog",
                table: "tour_products",
                type: "character varying(32)",
                maxLength: 32,
                nullable: false,
                defaultValue: "Normal");

            migrationBuilder.AddColumn<string>(
                name: "travel_type",
                schema: "catalog",
                table: "tour_products",
                type: "character varying(32)",
                maxLength: 32,
                nullable: false,
                defaultValue: "Other");

            migrationBuilder.CreateTable(
                name: "hotels",
                schema: "catalog",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    slug = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    destination_id = table.Column<Guid>(type: "uuid", nullable: false),
                    stars = table.Column<int>(type: "integer", nullable: false),
                    address = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    latitude = table.Column<decimal>(type: "numeric(9,6)", precision: 9, scale: 6, nullable: true),
                    longitude = table.Column<decimal>(type: "numeric(9,6)", precision: 9, scale: 6, nullable: true),
                    created_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    updated_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_hotels", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "places",
                schema: "catalog",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    slug = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    type = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: false),
                    destination_id = table.Column<Guid>(type: "uuid", nullable: false),
                    category = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    cuisine = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: true),
                    price_band = table.Column<string>(type: "character varying(16)", maxLength: 16, nullable: true),
                    reservable = table.Column<bool>(type: "boolean", nullable: false),
                    online_reservable = table.Column<bool>(type: "boolean", nullable: false),
                    latitude = table.Column<decimal>(type: "numeric(9,6)", precision: 9, scale: 6, nullable: true),
                    longitude = table.Column<decimal>(type: "numeric(9,6)", precision: 9, scale: 6, nullable: true),
                    created_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    updated_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_places", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "hotel_amenities",
                schema: "catalog",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    hotel_id = table.Column<Guid>(type: "uuid", nullable: false),
                    category = table.Column<string>(type: "character varying(80)", maxLength: 80, nullable: false),
                    name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_hotel_amenities", x => x.id);
                    table.ForeignKey(
                        name: "FK_hotel_amenities_hotels_hotel_id",
                        column: x => x.hotel_id,
                        principalSchema: "catalog",
                        principalTable: "hotels",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "hotel_translations",
                schema: "catalog",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    hotel_id = table.Column<Guid>(type: "uuid", nullable: false),
                    locale = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: false),
                    name = table.Column<string>(type: "character varying(250)", maxLength: 250, nullable: false),
                    description = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_hotel_translations", x => x.id);
                    table.ForeignKey(
                        name: "FK_hotel_translations_hotels_hotel_id",
                        column: x => x.hotel_id,
                        principalSchema: "catalog",
                        principalTable: "hotels",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "place_amenities",
                schema: "catalog",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    place_id = table.Column<Guid>(type: "uuid", nullable: false),
                    name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_place_amenities", x => x.id);
                    table.ForeignKey(
                        name: "FK_place_amenities_places_place_id",
                        column: x => x.place_id,
                        principalSchema: "catalog",
                        principalTable: "places",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "place_translations",
                schema: "catalog",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    place_id = table.Column<Guid>(type: "uuid", nullable: false),
                    locale = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: false),
                    name = table.Column<string>(type: "character varying(250)", maxLength: 250, nullable: false),
                    description = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_place_translations", x => x.id);
                    table.ForeignKey(
                        name: "FK_place_translations_places_place_id",
                        column: x => x.place_id,
                        principalSchema: "catalog",
                        principalTable: "places",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "ux_hotel_amenities_hotel_category_name",
                schema: "catalog",
                table: "hotel_amenities",
                columns: new[] { "hotel_id", "category", "name" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ux_hotel_translations_hotel_locale",
                schema: "catalog",
                table: "hotel_translations",
                columns: new[] { "hotel_id", "locale" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_hotels_destination_id",
                schema: "catalog",
                table: "hotels",
                column: "destination_id");

            migrationBuilder.CreateIndex(
                name: "ux_hotels_slug",
                schema: "catalog",
                table: "hotels",
                column: "slug",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ux_place_amenities_place_name",
                schema: "catalog",
                table: "place_amenities",
                columns: new[] { "place_id", "name" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ux_place_translations_place_locale",
                schema: "catalog",
                table: "place_translations",
                columns: new[] { "place_id", "locale" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_places_type_destination",
                schema: "catalog",
                table: "places",
                columns: new[] { "type", "destination_id" });

            migrationBuilder.CreateIndex(
                name: "ux_places_slug",
                schema: "catalog",
                table: "places",
                column: "slug",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "hotel_amenities",
                schema: "catalog");

            migrationBuilder.DropTable(
                name: "hotel_translations",
                schema: "catalog");

            migrationBuilder.DropTable(
                name: "place_amenities",
                schema: "catalog");

            migrationBuilder.DropTable(
                name: "place_translations",
                schema: "catalog");

            migrationBuilder.DropTable(
                name: "hotels",
                schema: "catalog");

            migrationBuilder.DropTable(
                name: "places",
                schema: "catalog");

            migrationBuilder.DropColumn(
                name: "category",
                schema: "catalog",
                table: "tour_products");

            migrationBuilder.DropColumn(
                name: "travel_type",
                schema: "catalog",
                table: "tour_products");
        }
    }
}
