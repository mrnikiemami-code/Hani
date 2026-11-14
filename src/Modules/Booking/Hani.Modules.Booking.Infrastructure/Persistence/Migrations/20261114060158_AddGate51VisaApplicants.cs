using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hani.Modules.Booking.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddGate51VisaApplicants : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "visa_application_applicants",
                schema: "booking",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    application_id = table.Column<Guid>(type: "uuid", nullable: false),
                    full_name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    passport_no = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: false),
                    nationality = table.Column<string>(type: "character varying(80)", maxLength: 80, nullable: false),
                    date_of_birth = table.Column<DateOnly>(type: "date", nullable: true),
                    relation = table.Column<string>(type: "character varying(80)", maxLength: 80, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_visa_application_applicants", x => x.id);
                    table.ForeignKey(
                        name: "FK_visa_application_applicants_visa_applications_application_id",
                        column: x => x.application_id,
                        principalSchema: "booking",
                        principalTable: "visa_applications",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_visa_application_applicants_application_id",
                schema: "booking",
                table: "visa_application_applicants",
                column: "application_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "visa_application_applicants",
                schema: "booking");
        }
    }
}
