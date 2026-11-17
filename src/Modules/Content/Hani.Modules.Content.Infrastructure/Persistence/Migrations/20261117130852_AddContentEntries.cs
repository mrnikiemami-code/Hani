using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hani.Modules.Content.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddContentEntries : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "content_entries",
                schema: "content",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    type = table.Column<string>(type: "character varying(30)", maxLength: 30, nullable: false),
                    slug = table.Column<string>(type: "character varying(160)", maxLength: 160, nullable: false),
                    locale = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: false),
                    title = table.Column<string>(type: "character varying(250)", maxLength: 250, nullable: false),
                    excerpt = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    body = table.Column<string>(type: "text", nullable: false),
                    hero_media_id = table.Column<Guid>(type: "uuid", nullable: true),
                    hero_image_url = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    seo_title = table.Column<string>(type: "character varying(250)", maxLength: 250, nullable: true),
                    seo_description = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    status = table.Column<string>(type: "character varying(30)", maxLength: 30, nullable: false),
                    published_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                    created_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    updated_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_content_entries", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "content_entry_revisions",
                schema: "content",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    content_entry_id = table.Column<Guid>(type: "uuid", nullable: false),
                    title = table.Column<string>(type: "character varying(250)", maxLength: 250, nullable: false),
                    excerpt = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    body = table.Column<string>(type: "text", nullable: false),
                    hero_media_id = table.Column<Guid>(type: "uuid", nullable: true),
                    hero_image_url = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    seo_title = table.Column<string>(type: "character varying(250)", maxLength: 250, nullable: true),
                    seo_description = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    captured_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_content_entry_revisions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_content_entry_revisions_content_entries_content_entry_id",
                        column: x => x.content_entry_id,
                        principalSchema: "content",
                        principalTable: "content_entries",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_content_entries_type_locale_slug",
                schema: "content",
                table: "content_entries",
                columns: new[] { "type", "locale", "slug" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_content_entry_revisions_content_entry_id",
                schema: "content",
                table: "content_entry_revisions",
                column: "content_entry_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "content_entry_revisions",
                schema: "content");

            migrationBuilder.DropTable(
                name: "content_entries",
                schema: "content");
        }
    }
}
