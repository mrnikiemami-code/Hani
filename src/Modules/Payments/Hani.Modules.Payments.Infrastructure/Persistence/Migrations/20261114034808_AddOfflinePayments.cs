using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hani.Modules.Payments.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddOfflinePayments : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "offline_payment_receipts",
                schema: "payment",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    order_id = table.Column<Guid>(type: "uuid", nullable: false),
                    agency_id = table.Column<Guid>(type: "uuid", nullable: false),
                    amount = table.Column<decimal>(type: "numeric(18,2)", precision: 18, scale: 2, nullable: false),
                    currency = table.Column<string>(type: "character varying(3)", maxLength: 3, nullable: false),
                    method = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: false),
                    reference = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    recorded_by = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    recorded_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_offline_payment_receipts", x => x.id);
                });

            migrationBuilder.CreateIndex(
                name: "ix_offline_receipts_order_id",
                schema: "payment",
                table: "offline_payment_receipts",
                column: "order_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "offline_payment_receipts",
                schema: "payment");
        }
    }
}
