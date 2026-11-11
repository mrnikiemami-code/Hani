using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hani.Modules.Supply.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddOfferLifecycle : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "created_at",
                schema: "supply",
                table: "agency_offers",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.AddColumn<string>(
                name: "external_id",
                schema: "supply",
                table: "agency_offers",
                type: "character varying(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "rejection_reason",
                schema: "supply",
                table: "agency_offers",
                type: "character varying(500)",
                maxLength: 500,
                nullable: true);

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "updated_at",
                schema: "supply",
                table: "agency_offers",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.CreateIndex(
                name: "ux_agency_offers_agency_external",
                schema: "supply",
                table: "agency_offers",
                columns: new[] { "agency_id", "external_id" },
                unique: true,
                filter: "external_id <> ''");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "ux_agency_offers_agency_external",
                schema: "supply",
                table: "agency_offers");

            migrationBuilder.DropColumn(
                name: "created_at",
                schema: "supply",
                table: "agency_offers");

            migrationBuilder.DropColumn(
                name: "external_id",
                schema: "supply",
                table: "agency_offers");

            migrationBuilder.DropColumn(
                name: "rejection_reason",
                schema: "supply",
                table: "agency_offers");

            migrationBuilder.DropColumn(
                name: "updated_at",
                schema: "supply",
                table: "agency_offers");
        }
    }
}
