using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hani.Modules.Booking.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddRequestsLeadsDiscrepanciesInstallments : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "installment_plans",
                schema: "booking",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    order_id = table.Column<Guid>(type: "uuid", nullable: false),
                    currency = table.Column<string>(type: "character varying(3)", maxLength: 3, nullable: false),
                    total_amount = table.Column<decimal>(type: "numeric(18,2)", precision: 18, scale: 2, nullable: false),
                    installment_count = table.Column<int>(type: "integer", nullable: false),
                    interval_days = table.Column<int>(type: "integer", nullable: false),
                    status = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: false),
                    created_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_installment_plans", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "lead_requests",
                schema: "booking",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    request_number = table.Column<string>(type: "character varying(64)", maxLength: 64, nullable: false),
                    service_type = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: false),
                    destination = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    start_date = table.Column<DateOnly>(type: "date", nullable: true),
                    end_date = table.Column<DateOnly>(type: "date", nullable: true),
                    adults = table.Column<int>(type: "integer", nullable: false),
                    children = table.Column<int>(type: "integer", nullable: false),
                    infants = table.Column<int>(type: "integer", nullable: false),
                    budget_amount = table.Column<decimal>(type: "numeric(18,2)", precision: 18, scale: 2, nullable: true),
                    currency = table.Column<string>(type: "character varying(3)", maxLength: 3, nullable: true),
                    contact_name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    contact_email = table.Column<string>(type: "character varying(320)", maxLength: 320, nullable: false),
                    contact_phone = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: false),
                    notes = table.Column<string>(type: "text", nullable: true),
                    status = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: false),
                    matched_agency_id = table.Column<Guid>(type: "uuid", nullable: true),
                    created_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    matched_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                    closed_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_lead_requests", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "price_discrepancy_reports",
                schema: "booking",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    agency_offer_id = table.Column<Guid>(type: "uuid", nullable: false),
                    departure_id = table.Column<Guid>(type: "uuid", nullable: true),
                    contact_email = table.Column<string>(type: "character varying(320)", maxLength: 320, nullable: true),
                    reported_price = table.Column<decimal>(type: "numeric(18,2)", precision: 18, scale: 2, nullable: false),
                    currency = table.Column<string>(type: "character varying(3)", maxLength: 3, nullable: false),
                    note = table.Column<string>(type: "text", nullable: false),
                    status = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: false),
                    created_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    reviewed_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                    resolution = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_price_discrepancy_reports", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "reservation_requests",
                schema: "booking",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    request_number = table.Column<string>(type: "character varying(64)", maxLength: 64, nullable: false),
                    quote_id = table.Column<Guid>(type: "uuid", nullable: false),
                    agency_offer_id = table.Column<Guid>(type: "uuid", nullable: false),
                    agency_id = table.Column<Guid>(type: "uuid", nullable: false),
                    departure_id = table.Column<Guid>(type: "uuid", nullable: false),
                    room_type = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: false),
                    adults = table.Column<int>(type: "integer", nullable: false),
                    children = table.Column<int>(type: "integer", nullable: false),
                    infants = table.Column<int>(type: "integer", nullable: false),
                    contact_email = table.Column<string>(type: "character varying(320)", maxLength: 320, nullable: false),
                    contact_phone = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: true),
                    notes = table.Column<string>(type: "text", nullable: true),
                    pricing = table.Column<string>(type: "jsonb", nullable: false),
                    total = table.Column<decimal>(type: "numeric(18,2)", precision: 18, scale: 2, nullable: false),
                    currency = table.Column<string>(type: "character varying(3)", maxLength: 3, nullable: false),
                    status = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: false),
                    agency_note = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    rejection_reason = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    created_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    expires_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    decided_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                    accepted_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_reservation_requests", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "installments",
                schema: "booking",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    plan_id = table.Column<Guid>(type: "uuid", nullable: false),
                    sequence = table.Column<int>(type: "integer", nullable: false),
                    due_date = table.Column<DateOnly>(type: "date", nullable: false),
                    amount = table.Column<decimal>(type: "numeric(18,2)", precision: 18, scale: 2, nullable: false),
                    status = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: false),
                    paid_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_installments", x => x.id);
                    table.ForeignKey(
                        name: "FK_installments_installment_plans_plan_id",
                        column: x => x.plan_id,
                        principalSchema: "booking",
                        principalTable: "installment_plans",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "ux_installment_plans_order_currency",
                schema: "booking",
                table: "installment_plans",
                columns: new[] { "order_id", "currency" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ux_installments_plan_sequence",
                schema: "booking",
                table: "installments",
                columns: new[] { "plan_id", "sequence" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_lead_requests_status",
                schema: "booking",
                table: "lead_requests",
                column: "status");

            migrationBuilder.CreateIndex(
                name: "ux_lead_requests_number",
                schema: "booking",
                table: "lead_requests",
                column: "request_number",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_price_discrepancies_offer",
                schema: "booking",
                table: "price_discrepancy_reports",
                column: "agency_offer_id");

            migrationBuilder.CreateIndex(
                name: "ix_price_discrepancies_status",
                schema: "booking",
                table: "price_discrepancy_reports",
                column: "status");

            migrationBuilder.CreateIndex(
                name: "ix_reservation_requests_agency_status",
                schema: "booking",
                table: "reservation_requests",
                columns: new[] { "agency_id", "status" });

            migrationBuilder.CreateIndex(
                name: "ux_reservation_requests_number",
                schema: "booking",
                table: "reservation_requests",
                column: "request_number",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "installments",
                schema: "booking");

            migrationBuilder.DropTable(
                name: "lead_requests",
                schema: "booking");

            migrationBuilder.DropTable(
                name: "price_discrepancy_reports",
                schema: "booking");

            migrationBuilder.DropTable(
                name: "reservation_requests",
                schema: "booking");

            migrationBuilder.DropTable(
                name: "installment_plans",
                schema: "booking");
        }
    }
}
