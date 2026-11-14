using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hani.Modules.Supply.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddAuditRemediationOfferFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "installment_enabled",
                schema: "supply",
                table: "agency_offers",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "installment_max_months",
                schema: "supply",
                table: "agency_offers",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<decimal>(
                name: "installment_min_down_payment_rate",
                schema: "supply",
                table: "agency_offers",
                type: "numeric(5,4)",
                precision: 5,
                scale: 4,
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "installment_monthly_fee_rate",
                schema: "supply",
                table: "agency_offers",
                type: "numeric(5,4)",
                precision: 5,
                scale: 4,
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<bool>(
                name: "installment_requires_cheque",
                schema: "supply",
                table: "agency_offers",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "invoice_issuer",
                schema: "supply",
                table: "agency_offers",
                type: "character varying(32)",
                maxLength: 32,
                nullable: false,
                defaultValue: "Hani");

            migrationBuilder.AddColumn<string>(
                name: "seller_of_record",
                schema: "supply",
                table: "agency_offers",
                type: "character varying(32)",
                maxLength: 32,
                nullable: false,
                defaultValue: "Hani");

            migrationBuilder.AddColumn<Guid>(
                name: "hotel_id",
                schema: "supply",
                table: "agency_offer_accommodations",
                type: "uuid",
                nullable: true);

            migrationBuilder.Sql(
                "UPDATE supply.agency_offers SET collection_mode = CASE " +
                "WHEN collection_mode IN ('', 'Online') THEN 'HaniOnline' " +
                "WHEN collection_mode = 'Offline' THEN 'AgencyOffline' " +
                "ELSE collection_mode END;");

            migrationBuilder.Sql(
                "UPDATE supply.agency_offers SET " +
                "seller_of_record = CASE WHEN collection_mode = 'HaniOnline' THEN 'Hani' ELSE 'Agency' END, " +
                "invoice_issuer = CASE WHEN collection_mode = 'HaniOnline' THEN 'Hani' ELSE 'Agency' END;");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(
                "UPDATE supply.agency_offers SET collection_mode = CASE " +
                "WHEN collection_mode = 'HaniOnline' THEN 'Online' " +
                "WHEN collection_mode = 'AgencyOffline' THEN 'Offline' " +
                "ELSE 'Offline' END;");

            migrationBuilder.DropColumn(
                name: "installment_enabled",
                schema: "supply",
                table: "agency_offers");

            migrationBuilder.DropColumn(
                name: "installment_max_months",
                schema: "supply",
                table: "agency_offers");

            migrationBuilder.DropColumn(
                name: "installment_min_down_payment_rate",
                schema: "supply",
                table: "agency_offers");

            migrationBuilder.DropColumn(
                name: "installment_monthly_fee_rate",
                schema: "supply",
                table: "agency_offers");

            migrationBuilder.DropColumn(
                name: "installment_requires_cheque",
                schema: "supply",
                table: "agency_offers");

            migrationBuilder.DropColumn(
                name: "invoice_issuer",
                schema: "supply",
                table: "agency_offers");

            migrationBuilder.DropColumn(
                name: "seller_of_record",
                schema: "supply",
                table: "agency_offers");

            migrationBuilder.DropColumn(
                name: "hotel_id",
                schema: "supply",
                table: "agency_offer_accommodations");
        }
    }
}
