using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hani.Modules.Settlement.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddPayoutSettlementEvidence : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "approved_by",
                schema: "settlement",
                table: "payouts",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "bank_reference",
                schema: "settlement",
                table: "payouts",
                type: "character varying(200)",
                maxLength: 200,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "document_url",
                schema: "settlement",
                table: "payouts",
                type: "character varying(1000)",
                maxLength: 1000,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "approved_by",
                schema: "settlement",
                table: "payouts");

            migrationBuilder.DropColumn(
                name: "bank_reference",
                schema: "settlement",
                table: "payouts");

            migrationBuilder.DropColumn(
                name: "document_url",
                schema: "settlement",
                table: "payouts");
        }
    }
}
