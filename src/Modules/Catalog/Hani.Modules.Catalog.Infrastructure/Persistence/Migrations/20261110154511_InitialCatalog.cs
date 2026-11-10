using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hani.Modules.Catalog.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class InitialCatalog : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "catalog");

            migrationBuilder.CreateTable(
                name: "destinations",
                schema: "catalog",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    slug = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    type = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: false),
                    parent_id = table.Column<Guid>(type: "uuid", nullable: true),
                    latitude = table.Column<decimal>(type: "numeric(9,6)", precision: 9, scale: 6, nullable: true),
                    longitude = table.Column<decimal>(type: "numeric(9,6)", precision: 9, scale: 6, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_destinations", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "tour_products",
                schema: "catalog",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    slug = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    duration_days = table.Column<int>(type: "integer", nullable: false),
                    tour_type = table.Column<string>(type: "character varying(60)", maxLength: 60, nullable: false),
                    status = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: false),
                    created_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    updated_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tour_products", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "destination_translations",
                schema: "catalog",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    destination_id = table.Column<Guid>(type: "uuid", nullable: false),
                    locale = table.Column<string>(type: "character varying(5)", maxLength: 5, nullable: false),
                    name = table.Column<string>(type: "character varying(150)", maxLength: 150, nullable: false),
                    description = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_destination_translations", x => x.id);
                    table.ForeignKey(
                        name: "FK_destination_translations_destinations_destination_id",
                        column: x => x.destination_id,
                        principalSchema: "catalog",
                        principalTable: "destinations",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "tour_product_destinations",
                schema: "catalog",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    tour_product_id = table.Column<Guid>(type: "uuid", nullable: false),
                    destination_id = table.Column<Guid>(type: "uuid", nullable: false),
                    sort_order = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tour_product_destinations", x => x.id);
                    table.ForeignKey(
                        name: "FK_tour_product_destinations_tour_products_tour_product_id",
                        column: x => x.tour_product_id,
                        principalSchema: "catalog",
                        principalTable: "tour_products",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "tour_product_translations",
                schema: "catalog",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    tour_product_id = table.Column<Guid>(type: "uuid", nullable: false),
                    locale = table.Column<string>(type: "character varying(5)", maxLength: 5, nullable: false),
                    title = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    summary = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    description = table.Column<string>(type: "text", nullable: false),
                    seo_title = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    seo_description = table.Column<string>(type: "character varying(300)", maxLength: 300, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tour_product_translations", x => x.id);
                    table.ForeignKey(
                        name: "FK_tour_product_translations_tour_products_tour_product_id",
                        column: x => x.tour_product_id,
                        principalSchema: "catalog",
                        principalTable: "tour_products",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "ux_destination_translations_destination_locale",
                schema: "catalog",
                table: "destination_translations",
                columns: new[] { "destination_id", "locale" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ux_destinations_slug",
                schema: "catalog",
                table: "destinations",
                column: "slug",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ux_tour_product_destinations_product_destination",
                schema: "catalog",
                table: "tour_product_destinations",
                columns: new[] { "tour_product_id", "destination_id" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ux_tour_product_translations_product_locale",
                schema: "catalog",
                table: "tour_product_translations",
                columns: new[] { "tour_product_id", "locale" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ux_tour_products_slug",
                schema: "catalog",
                table: "tour_products",
                column: "slug",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "destination_translations",
                schema: "catalog");

            migrationBuilder.DropTable(
                name: "tour_product_destinations",
                schema: "catalog");

            migrationBuilder.DropTable(
                name: "tour_product_translations",
                schema: "catalog");

            migrationBuilder.DropTable(
                name: "destinations",
                schema: "catalog");

            migrationBuilder.DropTable(
                name: "tour_products",
                schema: "catalog");
        }
    }
}
