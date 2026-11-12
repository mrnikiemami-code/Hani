using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hani.Modules.Catalog.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddTourContent : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "accommodation_type",
                schema: "catalog",
                table: "tour_products",
                type: "character varying(20)",
                maxLength: 20,
                nullable: false,
                defaultValue: "Hotel");

            migrationBuilder.AddColumn<string>(
                name: "difficulty",
                schema: "catalog",
                table: "tour_products",
                type: "character varying(20)",
                maxLength: 20,
                nullable: false,
                defaultValue: "Normal");

            migrationBuilder.AddColumn<string>(
                name: "local_vehicle_type",
                schema: "catalog",
                table: "tour_products",
                type: "character varying(20)",
                maxLength: 20,
                nullable: false,
                defaultValue: "None");

            migrationBuilder.AddColumn<Guid>(
                name: "origin_destination_id",
                schema: "catalog",
                table: "tour_products",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "vehicle_type",
                schema: "catalog",
                table: "tour_products",
                type: "character varying(20)",
                maxLength: 20,
                nullable: false,
                defaultValue: "None");

            migrationBuilder.AddColumn<string>(
                name: "additional_info",
                schema: "catalog",
                table: "tour_product_translations",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "cancellation_policy",
                schema: "catalog",
                table: "tour_product_translations",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "excluded_services",
                schema: "catalog",
                table: "tour_product_translations",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "included_services",
                schema: "catalog",
                table: "tour_product_translations",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "meals_summary",
                schema: "catalog",
                table: "tour_product_translations",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "required_items",
                schema: "catalog",
                table: "tour_product_translations",
                type: "text",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "tour_itinerary_days",
                schema: "catalog",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    tour_product_id = table.Column<Guid>(type: "uuid", nullable: false),
                    day_number = table.Column<int>(type: "integer", nullable: false),
                    breakfast = table.Column<bool>(type: "boolean", nullable: false),
                    lunch = table.Column<bool>(type: "boolean", nullable: false),
                    dinner = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tour_itinerary_days", x => x.id);
                    table.ForeignKey(
                        name: "FK_tour_itinerary_days_tour_products_tour_product_id",
                        column: x => x.tour_product_id,
                        principalSchema: "catalog",
                        principalTable: "tour_products",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "tour_itinerary_day_translations",
                schema: "catalog",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    tour_itinerary_day_id = table.Column<Guid>(type: "uuid", nullable: false),
                    locale = table.Column<string>(type: "character varying(5)", maxLength: 5, nullable: false),
                    title = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    description = table.Column<string>(type: "text", nullable: false),
                    accommodation = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tour_itinerary_day_translations", x => x.id);
                    table.ForeignKey(
                        name: "FK_tour_itinerary_day_translations_tour_itinerary_days_tour_it~",
                        column: x => x.tour_itinerary_day_id,
                        principalSchema: "catalog",
                        principalTable: "tour_itinerary_days",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "ux_tour_itinerary_day_translations_day_locale",
                schema: "catalog",
                table: "tour_itinerary_day_translations",
                columns: new[] { "tour_itinerary_day_id", "locale" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ux_tour_itinerary_days_product_day",
                schema: "catalog",
                table: "tour_itinerary_days",
                columns: new[] { "tour_product_id", "day_number" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tour_itinerary_day_translations",
                schema: "catalog");

            migrationBuilder.DropTable(
                name: "tour_itinerary_days",
                schema: "catalog");

            migrationBuilder.DropColumn(
                name: "accommodation_type",
                schema: "catalog",
                table: "tour_products");

            migrationBuilder.DropColumn(
                name: "difficulty",
                schema: "catalog",
                table: "tour_products");

            migrationBuilder.DropColumn(
                name: "local_vehicle_type",
                schema: "catalog",
                table: "tour_products");

            migrationBuilder.DropColumn(
                name: "origin_destination_id",
                schema: "catalog",
                table: "tour_products");

            migrationBuilder.DropColumn(
                name: "vehicle_type",
                schema: "catalog",
                table: "tour_products");

            migrationBuilder.DropColumn(
                name: "additional_info",
                schema: "catalog",
                table: "tour_product_translations");

            migrationBuilder.DropColumn(
                name: "cancellation_policy",
                schema: "catalog",
                table: "tour_product_translations");

            migrationBuilder.DropColumn(
                name: "excluded_services",
                schema: "catalog",
                table: "tour_product_translations");

            migrationBuilder.DropColumn(
                name: "included_services",
                schema: "catalog",
                table: "tour_product_translations");

            migrationBuilder.DropColumn(
                name: "meals_summary",
                schema: "catalog",
                table: "tour_product_translations");

            migrationBuilder.DropColumn(
                name: "required_items",
                schema: "catalog",
                table: "tour_product_translations");
        }
    }
}

