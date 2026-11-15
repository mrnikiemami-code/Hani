using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hani.Modules.Catalog.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddTourScope : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "tour_scope",
                schema: "catalog",
                table: "tour_products",
                type: "character varying(16)",
                maxLength: 16,
                nullable: false,
                defaultValue: "Foreign");

            migrationBuilder.CreateIndex(
                name: "ix_tour_products_status_scope",
                schema: "catalog",
                table: "tour_products",
                columns: new[] { "status", "tour_scope" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "ix_tour_products_status_scope",
                schema: "catalog",
                table: "tour_products");

            migrationBuilder.DropColumn(
                name: "tour_scope",
                schema: "catalog",
                table: "tour_products");
        }
    }
}
