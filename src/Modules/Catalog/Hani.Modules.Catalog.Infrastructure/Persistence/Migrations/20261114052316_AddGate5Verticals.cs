using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hani.Modules.Catalog.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddGate5Verticals : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "flight_routes",
                schema: "catalog",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    slug = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    origin_code = table.Column<string>(type: "character varying(3)", maxLength: 3, nullable: false),
                    destination_code = table.Column<string>(type: "character varying(3)", maxLength: 3, nullable: false),
                    origin_city = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    destination_city = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    is_active = table.Column<bool>(type: "boolean", nullable: false),
                    created_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_flight_routes", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "visa_countries",
                schema: "catalog",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    slug = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    country_code = table.Column<string>(type: "character varying(3)", maxLength: 3, nullable: false),
                    created_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_visa_countries", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "flight_offers",
                schema: "catalog",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    route_id = table.Column<Guid>(type: "uuid", nullable: false),
                    flight_number = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    airline_code = table.Column<string>(type: "character varying(3)", maxLength: 3, nullable: false),
                    airline_name = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    departure_date = table.Column<DateOnly>(type: "date", nullable: false),
                    departure_time = table.Column<TimeOnly>(type: "time without time zone", nullable: false),
                    arrival_time = table.Column<TimeOnly>(type: "time without time zone", nullable: false),
                    duration_minutes = table.Column<int>(type: "integer", nullable: false),
                    stops = table.Column<int>(type: "integer", nullable: false),
                    cabin = table.Column<string>(type: "character varying(40)", maxLength: 40, nullable: false),
                    baggage_allowance = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    price = table.Column<decimal>(type: "numeric(18,2)", precision: 18, scale: 2, nullable: false),
                    currency = table.Column<string>(type: "character varying(3)", maxLength: 3, nullable: false),
                    provider = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    deep_link = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_flight_offers", x => x.id);
                    table.ForeignKey(
                        name: "FK_flight_offers_flight_routes_route_id",
                        column: x => x.route_id,
                        principalSchema: "catalog",
                        principalTable: "flight_routes",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "visa_country_translations",
                schema: "catalog",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    country_id = table.Column<Guid>(type: "uuid", nullable: false),
                    locale = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: false),
                    name = table.Column<string>(type: "character varying(250)", maxLength: 250, nullable: false),
                    description = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_visa_country_translations", x => x.id);
                    table.ForeignKey(
                        name: "FK_visa_country_translations_visa_countries_country_id",
                        column: x => x.country_id,
                        principalSchema: "catalog",
                        principalTable: "visa_countries",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "visa_types",
                schema: "catalog",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    country_id = table.Column<Guid>(type: "uuid", nullable: false),
                    code = table.Column<string>(type: "character varying(40)", maxLength: 40, nullable: false),
                    entry_type = table.Column<string>(type: "character varying(40)", maxLength: 40, nullable: false),
                    processing_days_min = table.Column<int>(type: "integer", nullable: false),
                    processing_days_max = table.Column<int>(type: "integer", nullable: false),
                    validity_days = table.Column<int>(type: "integer", nullable: false),
                    price_adult = table.Column<decimal>(type: "numeric(18,2)", precision: 18, scale: 2, nullable: false),
                    price_child = table.Column<decimal>(type: "numeric(18,2)", precision: 18, scale: 2, nullable: true),
                    currency = table.Column<string>(type: "character varying(3)", maxLength: 3, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_visa_types", x => x.id);
                    table.ForeignKey(
                        name: "FK_visa_types_visa_countries_country_id",
                        column: x => x.country_id,
                        principalSchema: "catalog",
                        principalTable: "visa_countries",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "visa_documents",
                schema: "catalog",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    visa_type_id = table.Column<Guid>(type: "uuid", nullable: false),
                    name = table.Column<string>(type: "character varying(300)", maxLength: 300, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_visa_documents", x => x.id);
                    table.ForeignKey(
                        name: "FK_visa_documents_visa_types_visa_type_id",
                        column: x => x.visa_type_id,
                        principalSchema: "catalog",
                        principalTable: "visa_types",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "visa_faqs",
                schema: "catalog",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    visa_type_id = table.Column<Guid>(type: "uuid", nullable: false),
                    question = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    answer = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_visa_faqs", x => x.id);
                    table.ForeignKey(
                        name: "FK_visa_faqs_visa_types_visa_type_id",
                        column: x => x.visa_type_id,
                        principalSchema: "catalog",
                        principalTable: "visa_types",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "visa_steps",
                schema: "catalog",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    visa_type_id = table.Column<Guid>(type: "uuid", nullable: false),
                    sequence = table.Column<int>(type: "integer", nullable: false),
                    description = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_visa_steps", x => x.id);
                    table.ForeignKey(
                        name: "FK_visa_steps_visa_types_visa_type_id",
                        column: x => x.visa_type_id,
                        principalSchema: "catalog",
                        principalTable: "visa_types",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "ix_flight_offers_route_date_price",
                schema: "catalog",
                table: "flight_offers",
                columns: new[] { "route_id", "departure_date", "price" });

            migrationBuilder.CreateIndex(
                name: "ix_flight_routes_origin_destination",
                schema: "catalog",
                table: "flight_routes",
                columns: new[] { "origin_code", "destination_code" });

            migrationBuilder.CreateIndex(
                name: "ux_flight_routes_slug",
                schema: "catalog",
                table: "flight_routes",
                column: "slug",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ux_visa_countries_slug",
                schema: "catalog",
                table: "visa_countries",
                column: "slug",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ux_visa_country_translations_country_locale",
                schema: "catalog",
                table: "visa_country_translations",
                columns: new[] { "country_id", "locale" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_visa_documents_visa_type_id",
                schema: "catalog",
                table: "visa_documents",
                column: "visa_type_id");

            migrationBuilder.CreateIndex(
                name: "IX_visa_faqs_visa_type_id",
                schema: "catalog",
                table: "visa_faqs",
                column: "visa_type_id");

            migrationBuilder.CreateIndex(
                name: "IX_visa_steps_visa_type_id",
                schema: "catalog",
                table: "visa_steps",
                column: "visa_type_id");

            migrationBuilder.CreateIndex(
                name: "ux_visa_types_country_code",
                schema: "catalog",
                table: "visa_types",
                columns: new[] { "country_id", "code" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "flight_offers",
                schema: "catalog");

            migrationBuilder.DropTable(
                name: "visa_country_translations",
                schema: "catalog");

            migrationBuilder.DropTable(
                name: "visa_documents",
                schema: "catalog");

            migrationBuilder.DropTable(
                name: "visa_faqs",
                schema: "catalog");

            migrationBuilder.DropTable(
                name: "visa_steps",
                schema: "catalog");

            migrationBuilder.DropTable(
                name: "flight_routes",
                schema: "catalog");

            migrationBuilder.DropTable(
                name: "visa_types",
                schema: "catalog");

            migrationBuilder.DropTable(
                name: "visa_countries",
                schema: "catalog");
        }
    }
}
