using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hani.Modules.Identity.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddAuditRemediationIdentityFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "criteria",
                schema: "identity",
                table: "reviews",
                type: "jsonb",
                nullable: false,
                defaultValue: "{}");

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "owner_replied_at",
                schema: "identity",
                table: "reviews",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "owner_reply",
                schema: "identity",
                table: "reviews",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "proof_type",
                schema: "identity",
                table: "reviews",
                type: "character varying(32)",
                maxLength: 32,
                nullable: false,
                defaultValue: "None");

            migrationBuilder.AddColumn<string>(
                name: "proof_url",
                schema: "identity",
                table: "reviews",
                type: "character varying(1000)",
                maxLength: 1000,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "address",
                schema: "identity",
                table: "agencies",
                type: "character varying(500)",
                maxLength: 500,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "license_file_url",
                schema: "identity",
                table: "agencies",
                type: "character varying(1000)",
                maxLength: 1000,
                nullable: true);

            migrationBuilder.AddColumn<DateOnly>(
                name: "license_issued_at",
                schema: "identity",
                table: "agencies",
                type: "date",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "license_type",
                schema: "identity",
                table: "agencies",
                type: "character varying(50)",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "manager_name",
                schema: "identity",
                table: "agencies",
                type: "character varying(200)",
                maxLength: 200,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "province",
                schema: "identity",
                table: "agencies",
                type: "character varying(80)",
                maxLength: 80,
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "staff_count",
                schema: "identity",
                table: "agencies",
                type: "integer",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "criteria",
                schema: "identity",
                table: "reviews");

            migrationBuilder.DropColumn(
                name: "owner_replied_at",
                schema: "identity",
                table: "reviews");

            migrationBuilder.DropColumn(
                name: "owner_reply",
                schema: "identity",
                table: "reviews");

            migrationBuilder.DropColumn(
                name: "proof_type",
                schema: "identity",
                table: "reviews");

            migrationBuilder.DropColumn(
                name: "proof_url",
                schema: "identity",
                table: "reviews");

            migrationBuilder.DropColumn(
                name: "address",
                schema: "identity",
                table: "agencies");

            migrationBuilder.DropColumn(
                name: "license_file_url",
                schema: "identity",
                table: "agencies");

            migrationBuilder.DropColumn(
                name: "license_issued_at",
                schema: "identity",
                table: "agencies");

            migrationBuilder.DropColumn(
                name: "license_type",
                schema: "identity",
                table: "agencies");

            migrationBuilder.DropColumn(
                name: "manager_name",
                schema: "identity",
                table: "agencies");

            migrationBuilder.DropColumn(
                name: "province",
                schema: "identity",
                table: "agencies");

            migrationBuilder.DropColumn(
                name: "staff_count",
                schema: "identity",
                table: "agencies");
        }
    }
}
