using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hani.Modules.Booking.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddGate5Requests : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "hotel_inquiries",
                schema: "booking",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    inquiry_number = table.Column<string>(type: "character varying(64)", maxLength: 64, nullable: false),
                    hotel_id = table.Column<Guid>(type: "uuid", nullable: false),
                    check_in = table.Column<DateOnly>(type: "date", nullable: false),
                    check_out = table.Column<DateOnly>(type: "date", nullable: false),
                    rooms = table.Column<int>(type: "integer", nullable: false),
                    adults = table.Column<int>(type: "integer", nullable: false),
                    children = table.Column<int>(type: "integer", nullable: false),
                    contact_email = table.Column<string>(type: "character varying(320)", maxLength: 320, nullable: false),
                    contact_phone = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: true),
                    notes = table.Column<string>(type: "text", nullable: true),
                    status = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: false),
                    created_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    responded_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                    response_note = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    quoted_total = table.Column<decimal>(type: "numeric(18,2)", precision: 18, scale: 2, nullable: true),
                    quoted_currency = table.Column<string>(type: "character varying(3)", maxLength: 3, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_hotel_inquiries", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "restaurant_reservations",
                schema: "booking",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    reservation_number = table.Column<string>(type: "character varying(64)", maxLength: 64, nullable: false),
                    place_id = table.Column<Guid>(type: "uuid", nullable: false),
                    reservation_date = table.Column<DateOnly>(type: "date", nullable: false),
                    reservation_time = table.Column<TimeOnly>(type: "time without time zone", nullable: false),
                    party_size = table.Column<int>(type: "integer", nullable: false),
                    contact_name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    contact_email = table.Column<string>(type: "character varying(320)", maxLength: 320, nullable: false),
                    contact_phone = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: false),
                    notes = table.Column<string>(type: "text", nullable: true),
                    status = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: false),
                    created_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    confirmed_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                    rejection_reason = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_restaurant_reservations", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "visa_applications",
                schema: "booking",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    application_number = table.Column<string>(type: "character varying(64)", maxLength: 64, nullable: false),
                    visa_country_id = table.Column<Guid>(type: "uuid", nullable: false),
                    visa_type_id = table.Column<Guid>(type: "uuid", nullable: false),
                    applicant_name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    passport_no = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: false),
                    nationality = table.Column<string>(type: "character varying(80)", maxLength: 80, nullable: false),
                    date_of_birth = table.Column<DateOnly>(type: "date", nullable: true),
                    travel_date = table.Column<DateOnly>(type: "date", nullable: true),
                    contact_email = table.Column<string>(type: "character varying(320)", maxLength: 320, nullable: false),
                    contact_phone = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: false),
                    notes = table.Column<string>(type: "text", nullable: true),
                    status = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: false),
                    created_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    updated_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                    rejection_reason = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_visa_applications", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "visa_application_documents",
                schema: "booking",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    application_id = table.Column<Guid>(type: "uuid", nullable: false),
                    file_url = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_visa_application_documents", x => x.id);
                    table.ForeignKey(
                        name: "FK_visa_application_documents_visa_applications_application_id",
                        column: x => x.application_id,
                        principalSchema: "booking",
                        principalTable: "visa_applications",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "ix_hotel_inquiries_hotel",
                schema: "booking",
                table: "hotel_inquiries",
                column: "hotel_id");

            migrationBuilder.CreateIndex(
                name: "ix_hotel_inquiries_status",
                schema: "booking",
                table: "hotel_inquiries",
                column: "status");

            migrationBuilder.CreateIndex(
                name: "ux_hotel_inquiries_number",
                schema: "booking",
                table: "hotel_inquiries",
                column: "inquiry_number",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_restaurant_reservations_place",
                schema: "booking",
                table: "restaurant_reservations",
                column: "place_id");

            migrationBuilder.CreateIndex(
                name: "ix_restaurant_reservations_status",
                schema: "booking",
                table: "restaurant_reservations",
                column: "status");

            migrationBuilder.CreateIndex(
                name: "ux_restaurant_reservations_number",
                schema: "booking",
                table: "restaurant_reservations",
                column: "reservation_number",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_visa_application_documents_application_id",
                schema: "booking",
                table: "visa_application_documents",
                column: "application_id");

            migrationBuilder.CreateIndex(
                name: "ix_visa_applications_status",
                schema: "booking",
                table: "visa_applications",
                column: "status");

            migrationBuilder.CreateIndex(
                name: "ix_visa_applications_visa_type",
                schema: "booking",
                table: "visa_applications",
                column: "visa_type_id");

            migrationBuilder.CreateIndex(
                name: "ux_visa_applications_number",
                schema: "booking",
                table: "visa_applications",
                column: "application_number",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "hotel_inquiries",
                schema: "booking");

            migrationBuilder.DropTable(
                name: "restaurant_reservations",
                schema: "booking");

            migrationBuilder.DropTable(
                name: "visa_application_documents",
                schema: "booking");

            migrationBuilder.DropTable(
                name: "visa_applications",
                schema: "booking");
        }
    }
}
