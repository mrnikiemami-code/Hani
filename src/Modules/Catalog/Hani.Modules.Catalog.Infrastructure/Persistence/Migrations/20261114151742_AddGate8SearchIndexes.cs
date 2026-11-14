using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hani.Modules.Catalog.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddGate8SearchIndexes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("Npgsql:PostgresExtension:pg_trgm", ",,");

            migrationBuilder.CreateIndex(
                name: "ix_tour_products_status_origin",
                schema: "catalog",
                table: "tour_products",
                columns: new[] { "status", "origin_destination_id" });

            migrationBuilder.CreateIndex(
                name: "ix_tour_products_status_type_duration",
                schema: "catalog",
                table: "tour_products",
                columns: new[] { "status", "tour_type", "duration_days" });

            migrationBuilder.CreateIndex(
                name: "ix_tour_products_status_updated",
                schema: "catalog",
                table: "tour_products",
                columns: new[] { "status", "updated_at" });

            migrationBuilder.CreateIndex(
                name: "ix_tour_product_translations_description_trgm",
                schema: "catalog",
                table: "tour_product_translations",
                column: "description")
                .Annotation("Npgsql:IndexMethod", "gin")
                .Annotation("Npgsql:IndexOperators", new[] { "gin_trgm_ops" });

            migrationBuilder.CreateIndex(
                name: "ix_tour_product_translations_summary_trgm",
                schema: "catalog",
                table: "tour_product_translations",
                column: "summary")
                .Annotation("Npgsql:IndexMethod", "gin")
                .Annotation("Npgsql:IndexOperators", new[] { "gin_trgm_ops" });

            migrationBuilder.CreateIndex(
                name: "ix_tour_product_translations_title_trgm",
                schema: "catalog",
                table: "tour_product_translations",
                column: "title")
                .Annotation("Npgsql:IndexMethod", "gin")
                .Annotation("Npgsql:IndexOperators", new[] { "gin_trgm_ops" });

            migrationBuilder.CreateIndex(
                name: "ix_tour_product_destinations_destination_product",
                schema: "catalog",
                table: "tour_product_destinations",
                columns: new[] { "destination_id", "tour_product_id" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "ix_tour_products_status_origin",
                schema: "catalog",
                table: "tour_products");

            migrationBuilder.DropIndex(
                name: "ix_tour_products_status_type_duration",
                schema: "catalog",
                table: "tour_products");

            migrationBuilder.DropIndex(
                name: "ix_tour_products_status_updated",
                schema: "catalog",
                table: "tour_products");

            migrationBuilder.DropIndex(
                name: "ix_tour_product_translations_description_trgm",
                schema: "catalog",
                table: "tour_product_translations");

            migrationBuilder.DropIndex(
                name: "ix_tour_product_translations_summary_trgm",
                schema: "catalog",
                table: "tour_product_translations");

            migrationBuilder.DropIndex(
                name: "ix_tour_product_translations_title_trgm",
                schema: "catalog",
                table: "tour_product_translations");

            migrationBuilder.DropIndex(
                name: "ix_tour_product_destinations_destination_product",
                schema: "catalog",
                table: "tour_product_destinations");

            migrationBuilder.AlterDatabase()
                .OldAnnotation("Npgsql:PostgresExtension:pg_trgm", ",,");
        }
    }
}
