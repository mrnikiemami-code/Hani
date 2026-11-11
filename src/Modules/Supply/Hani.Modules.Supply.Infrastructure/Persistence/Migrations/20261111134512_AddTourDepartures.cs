using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hani.Modules.Supply.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddTourDepartures : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "tour_departures",
                schema: "supply",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    agency_offer_id = table.Column<Guid>(type: "uuid", nullable: false),
                    start_date = table.Column<DateOnly>(type: "date", nullable: false),
                    end_date = table.Column<DateOnly>(type: "date", nullable: false),
                    capacity = table.Column<int>(type: "integer", nullable: false),
                    seats_left = table.Column<int>(type: "integer", nullable: false),
                    status = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: false),
                    version = table.Column<long>(type: "bigint", nullable: false),
                    created_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    updated_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tour_departures", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "tour_departure_prices",
                schema: "supply",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    tour_departure_id = table.Column<Guid>(type: "uuid", nullable: false),
                    room_type = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: false),
                    amount = table.Column<decimal>(type: "numeric(18,2)", precision: 18, scale: 2, nullable: false),
                    currency = table.Column<string>(type: "character varying(3)", maxLength: 3, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tour_departure_prices", x => x.id);
                    table.ForeignKey(
                        name: "FK_tour_departure_prices_tour_departures_tour_departure_id",
                        column: x => x.tour_departure_id,
                        principalSchema: "supply",
                        principalTable: "tour_departures",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "ux_tour_departure_prices_departure_room",
                schema: "supply",
                table: "tour_departure_prices",
                columns: new[] { "tour_departure_id", "room_type" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_tour_departures_offer_start",
                schema: "supply",
                table: "tour_departures",
                columns: new[] { "agency_offer_id", "start_date" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tour_departure_prices",
                schema: "supply");

            migrationBuilder.DropTable(
                name: "tour_departures",
                schema: "supply");
        }
    }
}
