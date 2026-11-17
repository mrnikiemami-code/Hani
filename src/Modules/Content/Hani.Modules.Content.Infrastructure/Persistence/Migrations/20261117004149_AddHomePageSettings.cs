using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hani.Modules.Content.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddHomePageSettings : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "home_page_settings",
                schema: "content",
                columns: table => new
                {
                    key = table.Column<string>(type: "character varying(64)", maxLength: 64, nullable: false),
                    locale = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: false),
                    settings_json = table.Column<string>(type: "jsonb", nullable: false),
                    updated_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_home_page_settings", x => new { x.key, x.locale });
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "home_page_settings",
                schema: "content");
        }
    }
}
