using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hani.Modules.Content.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddGate81BlogDestinations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "blog_post_destinations",
                schema: "content",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    post_id = table.Column<Guid>(type: "uuid", nullable: false),
                    destination_id = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_blog_post_destinations", x => x.id);
                    table.ForeignKey(
                        name: "FK_blog_post_destinations_blog_posts_post_id",
                        column: x => x.post_id,
                        principalSchema: "content",
                        principalTable: "blog_posts",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_blog_post_destinations_post_id_destination_id",
                schema: "content",
                table: "blog_post_destinations",
                columns: new[] { "post_id", "destination_id" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "blog_post_destinations",
                schema: "content");
        }
    }
}
