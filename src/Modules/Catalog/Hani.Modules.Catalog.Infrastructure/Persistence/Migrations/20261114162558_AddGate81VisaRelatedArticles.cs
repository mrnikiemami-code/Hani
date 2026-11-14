using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hani.Modules.Catalog.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddGate81VisaRelatedArticles : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "related_article_slugs",
                schema: "catalog",
                table: "visa_types",
                type: "character varying(1000)",
                maxLength: 1000,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "related_article_slugs",
                schema: "catalog",
                table: "visa_types");
        }
    }
}
