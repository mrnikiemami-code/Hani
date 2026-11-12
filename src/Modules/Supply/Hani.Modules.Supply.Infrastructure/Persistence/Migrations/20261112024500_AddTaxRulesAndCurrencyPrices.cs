using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hani.Modules.Supply.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddTaxRulesAndCurrencyPrices : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "ux_tour_departure_prices_departure_room",
                schema: "supply",
                table: "tour_departure_prices");

            migrationBuilder.CreateTable(
                name: "agency_offer_tax_rules",
                schema: "supply",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    agency_offer_id = table.Column<Guid>(type: "uuid", nullable: false),
                    currency = table.Column<string>(type: "character varying(3)", maxLength: 3, nullable: false),
                    vat_status = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: false),
                    vat_rate = table.Column<decimal>(type: "numeric(9,6)", precision: 9, scale: 6, nullable: false),
                    duty_status = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: false),
                    duty_rate = table.Column<decimal>(type: "numeric(9,6)", precision: 9, scale: 6, nullable: false),
                    exemption_reason = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_agency_offer_tax_rules", x => x.id);
                    table.ForeignKey(
                        name: "FK_agency_offer_tax_rules_agency_offers_agency_offer_id",
                        column: x => x.agency_offer_id,
                        principalSchema: "supply",
                        principalTable: "agency_offers",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "ux_tour_departure_prices_departure_room_currency",
                schema: "supply",
                table: "tour_departure_prices",
                columns: new[] { "tour_departure_id", "room_type", "currency" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ux_agency_offer_tax_rules_offer_currency",
                schema: "supply",
                table: "agency_offer_tax_rules",
                columns: new[] { "agency_offer_id", "currency" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "agency_offer_tax_rules",
                schema: "supply");

            migrationBuilder.DropIndex(
                name: "ux_tour_departure_prices_departure_room_currency",
                schema: "supply",
                table: "tour_departure_prices");

            migrationBuilder.CreateIndex(
                name: "ux_tour_departure_prices_departure_room",
                schema: "supply",
                table: "tour_departure_prices",
                columns: new[] { "tour_departure_id", "room_type" },
                unique: true);
        }
    }
}
