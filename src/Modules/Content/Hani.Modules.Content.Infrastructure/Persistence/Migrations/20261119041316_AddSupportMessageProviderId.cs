using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hani.Modules.Content.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddSupportMessageProviderId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "provider_message_id",
                schema: "content",
                table: "support_messages",
                type: "character varying(200)",
                maxLength: 200,
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "ix_support_messages_provider_id",
                schema: "content",
                table: "support_messages",
                column: "provider_message_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "ix_support_messages_provider_id",
                schema: "content",
                table: "support_messages");

            migrationBuilder.DropColumn(
                name: "provider_message_id",
                schema: "content",
                table: "support_messages");
        }
    }
}
