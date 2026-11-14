using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hani.Modules.Booking.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddLeadDistributions : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "lead_agency_invitations",
                schema: "booking",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    lead_id = table.Column<Guid>(type: "uuid", nullable: false),
                    agency_id = table.Column<Guid>(type: "uuid", nullable: false),
                    invited_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    status = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_lead_agency_invitations", x => x.id);
                    table.ForeignKey(
                        name: "FK_lead_agency_invitations_lead_requests_lead_id",
                        column: x => x.lead_id,
                        principalSchema: "booking",
                        principalTable: "lead_requests",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "ux_lead_invitations_lead_agency",
                schema: "booking",
                table: "lead_agency_invitations",
                columns: new[] { "lead_id", "agency_id" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "lead_agency_invitations",
                schema: "booking");
        }
    }
}
