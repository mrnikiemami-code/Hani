using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hani.Modules.Settlement.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddCommissionPerCurrency : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "ux_commission_entries_order_id",
                schema: "settlement",
                table: "commission_entries");

            migrationBuilder.CreateIndex(
                name: "ux_commission_entries_order_currency",
                schema: "settlement",
                table: "commission_entries",
                columns: new[] { "order_id", "currency" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "ux_commission_entries_order_currency",
                schema: "settlement",
                table: "commission_entries");

            migrationBuilder.CreateIndex(
                name: "ux_commission_entries_order_id",
                schema: "settlement",
                table: "commission_entries",
                column: "order_id",
                unique: true);
        }
    }
}
