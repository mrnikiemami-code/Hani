using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hani.Modules.Content.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddSupportAttachmentScanAndThumbnails : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "scan_state",
                schema: "content",
                table: "support_attachments",
                type: "character varying(20)",
                maxLength: 20,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "scanned_at",
                schema: "content",
                table: "support_attachments",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "thumbnail_storage_key",
                schema: "content",
                table: "support_attachments",
                type: "character varying(500)",
                maxLength: 500,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "scan_state",
                schema: "content",
                table: "support_attachments");

            migrationBuilder.DropColumn(
                name: "scanned_at",
                schema: "content",
                table: "support_attachments");

            migrationBuilder.DropColumn(
                name: "thumbnail_storage_key",
                schema: "content",
                table: "support_attachments");
        }
    }
}
