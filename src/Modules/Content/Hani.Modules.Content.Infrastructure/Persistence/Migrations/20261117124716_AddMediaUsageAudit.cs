using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hani.Modules.Content.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddMediaUsageAudit : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "media_audit_logs",
                schema: "content",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    media_asset_id = table.Column<Guid>(type: "uuid", nullable: false),
                    action = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    detail = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: true),
                    created_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_media_audit_logs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "media_usages",
                schema: "content",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    media_asset_id = table.Column<Guid>(type: "uuid", nullable: false),
                    entity_type = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    entity_id = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    field = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    created_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_media_usages", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_media_audit_logs_media_asset_id_created_at",
                schema: "content",
                table: "media_audit_logs",
                columns: new[] { "media_asset_id", "created_at" });

            migrationBuilder.CreateIndex(
                name: "IX_media_usages_media_asset_id_entity_type_entity_id",
                schema: "content",
                table: "media_usages",
                columns: new[] { "media_asset_id", "entity_type", "entity_id" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "media_audit_logs",
                schema: "content");

            migrationBuilder.DropTable(
                name: "media_usages",
                schema: "content");
        }
    }
}
