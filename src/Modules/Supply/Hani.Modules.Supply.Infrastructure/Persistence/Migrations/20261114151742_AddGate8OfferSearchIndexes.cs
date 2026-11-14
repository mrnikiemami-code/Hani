using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hani.Modules.Supply.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddGate8OfferSearchIndexes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "ix_agency_offers_agency_status",
                schema: "supply",
                table: "agency_offers",
                columns: new[] { "agency_id", "status" });

            migrationBuilder.CreateIndex(
                name: "ix_agency_offers_product_status",
                schema: "supply",
                table: "agency_offers",
                columns: new[] { "tour_product_id", "status" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "ix_agency_offers_agency_status",
                schema: "supply",
                table: "agency_offers");

            migrationBuilder.DropIndex(
                name: "ix_agency_offers_product_status",
                schema: "supply",
                table: "agency_offers");
        }
    }
}
