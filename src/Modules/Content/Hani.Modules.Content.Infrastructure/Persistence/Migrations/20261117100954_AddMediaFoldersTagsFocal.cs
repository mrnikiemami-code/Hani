using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hani.Modules.Content.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddMediaFoldersTagsFocal : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "focal_x",
                schema: "content",
                table: "media_assets",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "focal_y",
                schema: "content",
                table: "media_assets",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "folder_id",
                schema: "content",
                table: "media_assets",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<string[]>(
                name: "tags",
                schema: "content",
                table: "media_assets",
                type: "text[]",
                nullable: false,
                defaultValue: new string[0]);

            migrationBuilder.CreateTable(
                name: "media_folders",
                schema: "content",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    name = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    parent_id = table.Column<Guid>(type: "uuid", nullable: true),
                    created_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_media_folders", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "media_folders",
                schema: "content");

            migrationBuilder.DropColumn(
                name: "focal_x",
                schema: "content",
                table: "media_assets");

            migrationBuilder.DropColumn(
                name: "focal_y",
                schema: "content",
                table: "media_assets");

            migrationBuilder.DropColumn(
                name: "folder_id",
                schema: "content",
                table: "media_assets");

            migrationBuilder.DropColumn(
                name: "tags",
                schema: "content",
                table: "media_assets");
        }
    }
}
