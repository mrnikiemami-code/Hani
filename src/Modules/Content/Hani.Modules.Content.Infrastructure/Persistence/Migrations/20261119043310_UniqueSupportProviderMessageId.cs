using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hani.Modules.Content.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class UniqueSupportProviderMessageId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "ix_support_messages_provider_id",
                schema: "content",
                table: "support_messages");

            migrationBuilder.CreateIndex(
                name: "ux_support_messages_provider_id",
                schema: "content",
                table: "support_messages",
                column: "provider_message_id",
                unique: true,
                filter: "provider_message_id IS NOT NULL");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "ux_support_messages_provider_id",
                schema: "content",
                table: "support_messages");

            migrationBuilder.CreateIndex(
                name: "ix_support_messages_provider_id",
                schema: "content",
                table: "support_messages",
                column: "provider_message_id");
        }
    }
}
