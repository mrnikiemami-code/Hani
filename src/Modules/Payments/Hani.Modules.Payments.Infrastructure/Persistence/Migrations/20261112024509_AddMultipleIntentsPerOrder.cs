using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hani.Modules.Payments.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddMultipleIntentsPerOrder : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "ux_payment_intents_order_id",
                schema: "payment",
                table: "payment_intents");

            migrationBuilder.CreateIndex(
                name: "ux_payment_intents_order_currency",
                schema: "payment",
                table: "payment_intents",
                columns: new[] { "order_id", "currency" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "ux_payment_intents_order_currency",
                schema: "payment",
                table: "payment_intents");

            migrationBuilder.CreateIndex(
                name: "ux_payment_intents_order_id",
                schema: "payment",
                table: "payment_intents",
                column: "order_id",
                unique: true);
        }
    }
}
