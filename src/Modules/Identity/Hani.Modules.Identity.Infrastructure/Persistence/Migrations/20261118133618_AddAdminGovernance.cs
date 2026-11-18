using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hani.Modules.Identity.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddAdminGovernance : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "admin_approval_requests",
                schema: "identity",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    type = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: false),
                    status = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: false),
                    entity_type = table.Column<string>(type: "character varying(80)", maxLength: 80, nullable: false),
                    entity_id = table.Column<Guid>(type: "uuid", nullable: false),
                    amount = table.Column<decimal>(type: "numeric(18,2)", precision: 18, scale: 2, nullable: false),
                    currency = table.Column<string>(type: "character varying(3)", maxLength: 3, nullable: false),
                    payment_intent_id = table.Column<Guid>(type: "uuid", nullable: true),
                    bank_reference = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    document_url = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    requested_reason = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: false),
                    requested_by = table.Column<Guid>(type: "uuid", nullable: false),
                    requested_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    decided_by = table.Column<Guid>(type: "uuid", nullable: true),
                    decided_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                    decision_reason = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    failure_reason = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_admin_approval_requests", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "admin_audit_events",
                schema: "identity",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    occurred_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    actor_user_id = table.Column<Guid>(type: "uuid", nullable: true),
                    actor_role = table.Column<string>(type: "character varying(64)", maxLength: 64, nullable: false),
                    agency_id = table.Column<Guid>(type: "uuid", nullable: true),
                    action = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    entity_type = table.Column<string>(type: "character varying(80)", maxLength: 80, nullable: false),
                    entity_id = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    before_json = table.Column<string>(type: "jsonb", nullable: true),
                    after_json = table.Column<string>(type: "jsonb", nullable: true),
                    reason = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: false),
                    correlation_id = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    ip_address = table.Column<string>(type: "character varying(64)", maxLength: 64, nullable: true),
                    user_agent = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_admin_audit_events", x => x.id);
                });

            migrationBuilder.CreateIndex(
                name: "ix_admin_approval_requests_status_requested",
                schema: "identity",
                table: "admin_approval_requests",
                columns: new[] { "status", "requested_at" });

            migrationBuilder.CreateIndex(
                name: "ix_admin_approval_requests_type_entity",
                schema: "identity",
                table: "admin_approval_requests",
                columns: new[] { "type", "entity_id" });

            migrationBuilder.CreateIndex(
                name: "ix_admin_audit_events_action",
                schema: "identity",
                table: "admin_audit_events",
                column: "action");

            migrationBuilder.CreateIndex(
                name: "ix_admin_audit_events_actor",
                schema: "identity",
                table: "admin_audit_events",
                column: "actor_user_id");

            migrationBuilder.CreateIndex(
                name: "ix_admin_audit_events_entity",
                schema: "identity",
                table: "admin_audit_events",
                columns: new[] { "entity_type", "entity_id" });

            migrationBuilder.CreateIndex(
                name: "ix_admin_audit_events_occurred",
                schema: "identity",
                table: "admin_audit_events",
                column: "occurred_at");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "admin_approval_requests",
                schema: "identity");

            migrationBuilder.DropTable(
                name: "admin_audit_events",
                schema: "identity");
        }
    }
}
