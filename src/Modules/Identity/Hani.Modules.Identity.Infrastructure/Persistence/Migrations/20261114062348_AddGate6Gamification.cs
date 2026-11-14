using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hani.Modules.Identity.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddGate6Gamification : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "badge_definitions",
                schema: "identity",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    code = table.Column<string>(type: "character varying(80)", maxLength: 80, nullable: false),
                    name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    description = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    category = table.Column<string>(type: "character varying(80)", maxLength: 80, nullable: false),
                    threshold = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_badge_definitions", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "user_badges",
                schema: "identity",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    user_id = table.Column<Guid>(type: "uuid", nullable: false),
                    badge_code = table.Column<string>(type: "character varying(80)", maxLength: 80, nullable: false),
                    awarded_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_user_badges", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "user_gamification",
                schema: "identity",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    user_id = table.Column<Guid>(type: "uuid", nullable: false),
                    points = table.Column<int>(type: "integer", nullable: false),
                    level = table.Column<int>(type: "integer", nullable: false),
                    travel_style = table.Column<string>(type: "character varying(80)", maxLength: 80, nullable: true),
                    updated_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_user_gamification", x => x.id);
                });

            migrationBuilder.CreateIndex(
                name: "ux_badge_definitions_code",
                schema: "identity",
                table: "badge_definitions",
                column: "code",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ux_user_badges_user_code",
                schema: "identity",
                table: "user_badges",
                columns: new[] { "user_id", "badge_code" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ux_user_gamification_user",
                schema: "identity",
                table: "user_gamification",
                column: "user_id",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "badge_definitions",
                schema: "identity");

            migrationBuilder.DropTable(
                name: "user_badges",
                schema: "identity");

            migrationBuilder.DropTable(
                name: "user_gamification",
                schema: "identity");
        }
    }
}
