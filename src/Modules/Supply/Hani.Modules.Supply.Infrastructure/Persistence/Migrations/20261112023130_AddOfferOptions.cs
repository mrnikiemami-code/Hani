using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hani.Modules.Supply.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddOfferOptions : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "agency_offer_accommodations",
                schema: "supply",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    agency_offer_id = table.Column<Guid>(type: "uuid", nullable: false),
                    hotel_name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    hotel_stars = table.Column<int>(type: "integer", nullable: false),
                    room_type = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: false),
                    meal_plan = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: false),
                    price = table.Column<decimal>(type: "numeric(18,2)", precision: 18, scale: 2, nullable: false),
                    currency = table.Column<string>(type: "character varying(3)", maxLength: 3, nullable: false),
                    description = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_agency_offer_accommodations", x => x.id);
                    table.ForeignKey(
                        name: "FK_agency_offer_accommodations_agency_offers_agency_offer_id",
                        column: x => x.agency_offer_id,
                        principalSchema: "supply",
                        principalTable: "agency_offers",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "agency_offer_flights",
                schema: "supply",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    agency_offer_id = table.Column<Guid>(type: "uuid", nullable: false),
                    direction = table.Column<string>(type: "character varying(16)", maxLength: 16, nullable: false),
                    airline = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    flight_number = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: false),
                    departure_airport = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    arrival_airport = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    departure_time = table.Column<TimeOnly>(type: "time without time zone", nullable: false),
                    arrival_time = table.Column<TimeOnly>(type: "time without time zone", nullable: false),
                    duration_minutes = table.Column<int>(type: "integer", nullable: false),
                    cabin = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: false),
                    baggage_allowance = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_agency_offer_flights", x => x.id);
                    table.ForeignKey(
                        name: "FK_agency_offer_flights_agency_offers_agency_offer_id",
                        column: x => x.agency_offer_id,
                        principalSchema: "supply",
                        principalTable: "agency_offers",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_agency_offer_accommodations_agency_offer_id",
                schema: "supply",
                table: "agency_offer_accommodations",
                column: "agency_offer_id");

            migrationBuilder.CreateIndex(
                name: "IX_agency_offer_flights_agency_offer_id",
                schema: "supply",
                table: "agency_offer_flights",
                column: "agency_offer_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "agency_offer_accommodations",
                schema: "supply");

            migrationBuilder.DropTable(
                name: "agency_offer_flights",
                schema: "supply");
        }
    }
}
