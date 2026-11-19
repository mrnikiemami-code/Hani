using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hani.Modules.Content.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddSupportDisputes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "support_disputes",
                schema: "content",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    ticket_id = table.Column<Guid>(type: "uuid", nullable: false),
                    order_id = table.Column<Guid>(type: "uuid", nullable: true),
                    type = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: false),
                    status = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: false),
                    amount = table.Column<decimal>(type: "numeric(18,2)", precision: 18, scale: 2, nullable: true),
                    currency = table.Column<string>(type: "character varying(3)", maxLength: 3, nullable: true),
                    description = table.Column<string>(type: "text", nullable: false),
                    evidence_url = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    resolution = table.Column<string>(type: "text", nullable: true),
                    opened_by = table.Column<Guid>(type: "uuid", nullable: false),
                    opened_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    resolved_by = table.Column<Guid>(type: "uuid", nullable: true),
                    resolved_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_support_disputes", x => x.id);
                });

            migrationBuilder.CreateIndex(
                name: "ix_support_disputes_order",
                schema: "content",
                table: "support_disputes",
                column: "order_id");

            migrationBuilder.CreateIndex(
                name: "ix_support_disputes_status_type",
                schema: "content",
                table: "support_disputes",
                columns: new[] { "status", "type" });

            migrationBuilder.CreateIndex(
                name: "ix_support_disputes_ticket",
                schema: "content",
                table: "support_disputes",
                column: "ticket_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "support_disputes",
                schema: "content");
        }
    }
}
