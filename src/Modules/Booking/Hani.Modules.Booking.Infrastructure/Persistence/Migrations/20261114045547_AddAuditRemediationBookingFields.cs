using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hani.Modules.Booking.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddAuditRemediationBookingFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "cheque_reference",
                schema: "booking",
                table: "installment_plans",
                type: "character varying(100)",
                maxLength: 100,
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "down_payment_amount",
                schema: "booking",
                table: "installment_plans",
                type: "numeric(18,2)",
                precision: 18,
                scale: 2,
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "financed_amount",
                schema: "booking",
                table: "installment_plans",
                type: "numeric(18,2)",
                precision: 18,
                scale: 2,
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "monthly_fee_rate",
                schema: "booking",
                table: "installment_plans",
                type: "numeric(5,4)",
                precision: 5,
                scale: 4,
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<bool>(
                name: "requires_cheque",
                schema: "booking",
                table: "installment_plans",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<decimal>(
                name: "total_payable",
                schema: "booking",
                table: "installment_plans",
                type: "numeric(18,2)",
                precision: 18,
                scale: 2,
                nullable: false,
                defaultValue: 0m);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "cheque_reference",
                schema: "booking",
                table: "installment_plans");

            migrationBuilder.DropColumn(
                name: "down_payment_amount",
                schema: "booking",
                table: "installment_plans");

            migrationBuilder.DropColumn(
                name: "financed_amount",
                schema: "booking",
                table: "installment_plans");

            migrationBuilder.DropColumn(
                name: "monthly_fee_rate",
                schema: "booking",
                table: "installment_plans");

            migrationBuilder.DropColumn(
                name: "requires_cheque",
                schema: "booking",
                table: "installment_plans");

            migrationBuilder.DropColumn(
                name: "total_payable",
                schema: "booking",
                table: "installment_plans");
        }
    }
}
