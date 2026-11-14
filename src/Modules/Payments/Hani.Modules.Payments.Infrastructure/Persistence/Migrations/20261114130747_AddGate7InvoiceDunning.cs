using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hani.Modules.Payments.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddGate7InvoiceDunning : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "last_reminder_at",
                schema: "payment",
                table: "invoices",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "next_reminder_at",
                schema: "payment",
                table: "invoices",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "reminder_count",
                schema: "payment",
                table: "invoices",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "last_reminder_at",
                schema: "payment",
                table: "invoices");

            migrationBuilder.DropColumn(
                name: "next_reminder_at",
                schema: "payment",
                table: "invoices");

            migrationBuilder.DropColumn(
                name: "reminder_count",
                schema: "payment",
                table: "invoices");
        }
    }
}
