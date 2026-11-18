using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hani.Modules.Catalog.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddHotelContentProfile : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "check_in_time",
                schema: "catalog",
                table: "hotels",
                type: "character varying(10)",
                maxLength: 10,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "check_out_time",
                schema: "catalog",
                table: "hotels",
                type: "character varying(10)",
                maxLength: 10,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "contact_phone",
                schema: "catalog",
                table: "hotels",
                type: "character varying(40)",
                maxLength: 40,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "property_type",
                schema: "catalog",
                table: "hotels",
                type: "character varying(30)",
                maxLength: 30,
                nullable: false,
                defaultValue: "Hotel");

            migrationBuilder.AddColumn<string>(
                name: "seo_description",
                schema: "catalog",
                table: "hotels",
                type: "character varying(500)",
                maxLength: 500,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "seo_title",
                schema: "catalog",
                table: "hotels",
                type: "character varying(250)",
                maxLength: 250,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "status",
                schema: "catalog",
                table: "hotels",
                type: "character varying(30)",
                maxLength: 30,
                nullable: false,
                defaultValue: "Published");

            migrationBuilder.AddColumn<string>(
                name: "website_url",
                schema: "catalog",
                table: "hotels",
                type: "character varying(500)",
                maxLength: 500,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "alt_text",
                schema: "catalog",
                table: "hotel_images",
                type: "character varying(300)",
                maxLength: 300,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "category",
                schema: "catalog",
                table: "hotel_images",
                type: "character varying(60)",
                maxLength: 60,
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "is_cover",
                schema: "catalog",
                table: "hotel_images",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<Guid>(
                name: "media_asset_id",
                schema: "catalog",
                table: "hotel_images",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "source",
                schema: "catalog",
                table: "hotel_images",
                type: "character varying(30)",
                maxLength: 30,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "check_in_time",
                schema: "catalog",
                table: "hotels");

            migrationBuilder.DropColumn(
                name: "check_out_time",
                schema: "catalog",
                table: "hotels");

            migrationBuilder.DropColumn(
                name: "contact_phone",
                schema: "catalog",
                table: "hotels");

            migrationBuilder.DropColumn(
                name: "property_type",
                schema: "catalog",
                table: "hotels");

            migrationBuilder.DropColumn(
                name: "seo_description",
                schema: "catalog",
                table: "hotels");

            migrationBuilder.DropColumn(
                name: "seo_title",
                schema: "catalog",
                table: "hotels");

            migrationBuilder.DropColumn(
                name: "status",
                schema: "catalog",
                table: "hotels");

            migrationBuilder.DropColumn(
                name: "website_url",
                schema: "catalog",
                table: "hotels");

            migrationBuilder.DropColumn(
                name: "alt_text",
                schema: "catalog",
                table: "hotel_images");

            migrationBuilder.DropColumn(
                name: "category",
                schema: "catalog",
                table: "hotel_images");

            migrationBuilder.DropColumn(
                name: "is_cover",
                schema: "catalog",
                table: "hotel_images");

            migrationBuilder.DropColumn(
                name: "media_asset_id",
                schema: "catalog",
                table: "hotel_images");

            migrationBuilder.DropColumn(
                name: "source",
                schema: "catalog",
                table: "hotel_images");
        }
    }
}
