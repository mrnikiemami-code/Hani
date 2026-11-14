using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hani.Modules.Identity.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddGate7ChannelSettings : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "attribution_required",
                schema: "identity",
                table: "agencies",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "canonical_mode",
                schema: "identity",
                table: "agencies",
                type: "character varying(32)",
                maxLength: 32,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "channel_plan",
                schema: "identity",
                table: "agencies",
                type: "character varying(32)",
                maxLength: 32,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "channel_webhook_secret",
                schema: "identity",
                table: "agencies",
                type: "character varying(500)",
                maxLength: 500,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "channel_webhook_url",
                schema: "identity",
                table: "agencies",
                type: "character varying(2000)",
                maxLength: 2000,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "custom_domain",
                schema: "identity",
                table: "agencies",
                type: "character varying(253)",
                maxLength: 253,
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "white_label_enabled",
                schema: "identity",
                table: "agencies",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "attribution_required",
                schema: "identity",
                table: "agencies");

            migrationBuilder.DropColumn(
                name: "canonical_mode",
                schema: "identity",
                table: "agencies");

            migrationBuilder.DropColumn(
                name: "channel_plan",
                schema: "identity",
                table: "agencies");

            migrationBuilder.DropColumn(
                name: "channel_webhook_secret",
                schema: "identity",
                table: "agencies");

            migrationBuilder.DropColumn(
                name: "channel_webhook_url",
                schema: "identity",
                table: "agencies");

            migrationBuilder.DropColumn(
                name: "custom_domain",
                schema: "identity",
                table: "agencies");

            migrationBuilder.DropColumn(
                name: "white_label_enabled",
                schema: "identity",
                table: "agencies");
        }
    }
}
