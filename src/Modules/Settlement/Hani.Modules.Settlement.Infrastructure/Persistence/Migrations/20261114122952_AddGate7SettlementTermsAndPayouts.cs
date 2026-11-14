using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hani.Modules.Settlement.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddGate7SettlementTermsAndPayouts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "agency_settlement_terms",
                schema: "settlement",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    agency_id = table.Column<Guid>(type: "uuid", nullable: false),
                    cycle = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: false),
                    minimum_payout = table.Column<decimal>(type: "numeric(18,2)", precision: 18, scale: 2, nullable: false),
                    currency = table.Column<string>(type: "character varying(3)", maxLength: 3, nullable: false),
                    bank_account_ref = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    is_active = table.Column<bool>(type: "boolean", nullable: false),
                    created_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_agency_settlement_terms", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "payouts",
                schema: "settlement",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    agency_id = table.Column<Guid>(type: "uuid", nullable: false),
                    period_start = table.Column<DateOnly>(type: "date", nullable: false),
                    period_end = table.Column<DateOnly>(type: "date", nullable: false),
                    amount = table.Column<decimal>(type: "numeric(18,2)", precision: 18, scale: 2, nullable: false),
                    currency = table.Column<string>(type: "character varying(3)", maxLength: 3, nullable: false),
                    status = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: false),
                    created_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    paid_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_payouts", x => x.id);
                });

            migrationBuilder.CreateIndex(
                name: "ix_agency_settlement_terms_agency",
                schema: "settlement",
                table: "agency_settlement_terms",
                column: "agency_id");

            migrationBuilder.CreateIndex(
                name: "ix_payouts_agency_status",
                schema: "settlement",
                table: "payouts",
                columns: new[] { "agency_id", "status" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "agency_settlement_terms",
                schema: "settlement");

            migrationBuilder.DropTable(
                name: "payouts",
                schema: "settlement");
        }
    }
}
