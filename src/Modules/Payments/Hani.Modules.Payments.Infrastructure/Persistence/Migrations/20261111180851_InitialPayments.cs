using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hani.Modules.Payments.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class InitialPayments : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "payment");

            migrationBuilder.CreateTable(
                name: "payment_intents",
                schema: "payment",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    order_id = table.Column<Guid>(type: "uuid", nullable: false),
                    agency_id = table.Column<Guid>(type: "uuid", nullable: false),
                    amount = table.Column<decimal>(type: "numeric(18,2)", precision: 18, scale: 2, nullable: false),
                    currency = table.Column<string>(type: "character varying(3)", maxLength: 3, nullable: false),
                    status = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: false),
                    provider = table.Column<string>(type: "character varying(64)", maxLength: 64, nullable: false),
                    provider_ref = table.Column<string>(type: "character varying(128)", maxLength: 128, nullable: true),
                    redirect_url = table.Column<string>(type: "character varying(2048)", maxLength: 2048, nullable: true),
                    psp_account_ref = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    merchant_scope = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    funds_held_by = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    failure_reason = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    created_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    updated_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    expires_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    version = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_payment_intents", x => x.id);
                });

            migrationBuilder.CreateIndex(
                name: "ix_payment_intents_expires_at",
                schema: "payment",
                table: "payment_intents",
                column: "expires_at");

            migrationBuilder.CreateIndex(
                name: "ix_payment_intents_status",
                schema: "payment",
                table: "payment_intents",
                column: "status");

            migrationBuilder.CreateIndex(
                name: "ux_payment_intents_order_id",
                schema: "payment",
                table: "payment_intents",
                column: "order_id",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "payment_intents",
                schema: "payment");
        }
    }
}
