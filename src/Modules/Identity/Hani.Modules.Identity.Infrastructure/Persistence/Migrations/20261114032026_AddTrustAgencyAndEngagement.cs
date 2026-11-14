using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hani.Modules.Identity.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddTrustAgencyAndEngagement : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "about",
                schema: "identity",
                table: "agencies",
                type: "character varying(2000)",
                maxLength: 2000,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "contact_email",
                schema: "identity",
                table: "agencies",
                type: "character varying(320)",
                maxLength: 320,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "contact_phone",
                schema: "identity",
                table: "agencies",
                type: "character varying(32)",
                maxLength: 32,
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "owner_user_id",
                schema: "identity",
                table: "agencies",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "rejection_reason",
                schema: "identity",
                table: "agencies",
                type: "character varying(1000)",
                maxLength: 1000,
                nullable: true);

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "reviewed_at",
                schema: "identity",
                table: "agencies",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "submitted_at",
                schema: "identity",
                table: "agencies",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "website",
                schema: "identity",
                table: "agencies",
                type: "character varying(500)",
                maxLength: 500,
                nullable: true);

            migrationBuilder.CreateTable(
                name: "agency_documents",
                schema: "identity",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    agency_id = table.Column<Guid>(type: "uuid", nullable: false),
                    type = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: false),
                    file_url = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: false),
                    status = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: false),
                    uploaded_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_agency_documents", x => x.id);
                    table.ForeignKey(
                        name: "FK_agency_documents_agencies_agency_id",
                        column: x => x.agency_id,
                        principalSchema: "identity",
                        principalTable: "agencies",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "media_assets",
                schema: "identity",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    owner_user_id = table.Column<Guid>(type: "uuid", nullable: false),
                    url = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: false),
                    content_type = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    size_bytes = table.Column<long>(type: "bigint", nullable: false),
                    kind = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: false),
                    status = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: false),
                    created_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    moderated_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                    rejection_reason = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_media_assets", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "ownership_claims",
                schema: "identity",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    user_id = table.Column<Guid>(type: "uuid", nullable: false),
                    target_type = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: false),
                    target_id = table.Column<Guid>(type: "uuid", nullable: false),
                    claim_type = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: false),
                    full_name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    email = table.Column<string>(type: "character varying(320)", maxLength: 320, nullable: false),
                    phone = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: true),
                    message = table.Column<string>(type: "text", nullable: false),
                    evidence_url = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    status = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: false),
                    created_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    reviewed_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                    rejection_reason = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ownership_claims", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "reviews",
                schema: "identity",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    user_id = table.Column<Guid>(type: "uuid", nullable: false),
                    target_type = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: false),
                    target_id = table.Column<Guid>(type: "uuid", nullable: false),
                    rating = table.Column<int>(type: "integer", nullable: false),
                    food_rating = table.Column<int>(type: "integer", nullable: true),
                    cleanliness_rating = table.Column<int>(type: "integer", nullable: true),
                    staff_rating = table.Column<int>(type: "integer", nullable: true),
                    entertainment_rating = table.Column<int>(type: "integer", nullable: true),
                    location_rating = table.Column<int>(type: "integer", nullable: true),
                    value_rating = table.Column<int>(type: "integer", nullable: true),
                    title = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    comment = table.Column<string>(type: "text", nullable: false),
                    travel_type = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: false),
                    visit_date = table.Column<DateOnly>(type: "date", nullable: true),
                    status = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: false),
                    moderation_reason = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true),
                    created_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    published_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                    helpful_count = table.Column<int>(type: "integer", nullable: false),
                    report_count = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_reviews", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "review_helpful_votes",
                schema: "identity",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    review_id = table.Column<Guid>(type: "uuid", nullable: false),
                    user_id = table.Column<Guid>(type: "uuid", nullable: false),
                    created_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_review_helpful_votes", x => x.id);
                    table.ForeignKey(
                        name: "FK_review_helpful_votes_reviews_review_id",
                        column: x => x.review_id,
                        principalSchema: "identity",
                        principalTable: "reviews",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "review_photos",
                schema: "identity",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    review_id = table.Column<Guid>(type: "uuid", nullable: false),
                    url = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: false),
                    caption = table.Column<string>(type: "character varying(300)", maxLength: 300, nullable: true),
                    status = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: false),
                    created_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_review_photos", x => x.id);
                    table.ForeignKey(
                        name: "FK_review_photos_reviews_review_id",
                        column: x => x.review_id,
                        principalSchema: "identity",
                        principalTable: "reviews",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "review_reports",
                schema: "identity",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    review_id = table.Column<Guid>(type: "uuid", nullable: false),
                    user_id = table.Column<Guid>(type: "uuid", nullable: false),
                    reason = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    created_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_review_reports", x => x.id);
                    table.ForeignKey(
                        name: "FK_review_reports_reviews_review_id",
                        column: x => x.review_id,
                        principalSchema: "identity",
                        principalTable: "reviews",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "ix_agencies_owner_user_id",
                schema: "identity",
                table: "agencies",
                column: "owner_user_id");

            migrationBuilder.CreateIndex(
                name: "ix_agencies_status",
                schema: "identity",
                table: "agencies",
                column: "status");

            migrationBuilder.CreateIndex(
                name: "IX_agency_documents_agency_id",
                schema: "identity",
                table: "agency_documents",
                column: "agency_id");

            migrationBuilder.CreateIndex(
                name: "ix_media_assets_owner_user_id",
                schema: "identity",
                table: "media_assets",
                column: "owner_user_id");

            migrationBuilder.CreateIndex(
                name: "ix_media_assets_status",
                schema: "identity",
                table: "media_assets",
                column: "status");

            migrationBuilder.CreateIndex(
                name: "ix_ownership_claims_status",
                schema: "identity",
                table: "ownership_claims",
                column: "status");

            migrationBuilder.CreateIndex(
                name: "ix_ownership_claims_user_id",
                schema: "identity",
                table: "ownership_claims",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "ux_review_helpful_votes_review_user",
                schema: "identity",
                table: "review_helpful_votes",
                columns: new[] { "review_id", "user_id" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_review_photos_review_id",
                schema: "identity",
                table: "review_photos",
                column: "review_id");

            migrationBuilder.CreateIndex(
                name: "ux_review_reports_review_user",
                schema: "identity",
                table: "review_reports",
                columns: new[] { "review_id", "user_id" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_reviews_status",
                schema: "identity",
                table: "reviews",
                column: "status");

            migrationBuilder.CreateIndex(
                name: "ix_reviews_target_status",
                schema: "identity",
                table: "reviews",
                columns: new[] { "target_type", "target_id", "status" });

            migrationBuilder.CreateIndex(
                name: "ix_reviews_user_id",
                schema: "identity",
                table: "reviews",
                column: "user_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "agency_documents",
                schema: "identity");

            migrationBuilder.DropTable(
                name: "media_assets",
                schema: "identity");

            migrationBuilder.DropTable(
                name: "ownership_claims",
                schema: "identity");

            migrationBuilder.DropTable(
                name: "review_helpful_votes",
                schema: "identity");

            migrationBuilder.DropTable(
                name: "review_photos",
                schema: "identity");

            migrationBuilder.DropTable(
                name: "review_reports",
                schema: "identity");

            migrationBuilder.DropTable(
                name: "reviews",
                schema: "identity");

            migrationBuilder.DropIndex(
                name: "ix_agencies_owner_user_id",
                schema: "identity",
                table: "agencies");

            migrationBuilder.DropIndex(
                name: "ix_agencies_status",
                schema: "identity",
                table: "agencies");

            migrationBuilder.DropColumn(
                name: "about",
                schema: "identity",
                table: "agencies");

            migrationBuilder.DropColumn(
                name: "contact_email",
                schema: "identity",
                table: "agencies");

            migrationBuilder.DropColumn(
                name: "contact_phone",
                schema: "identity",
                table: "agencies");

            migrationBuilder.DropColumn(
                name: "owner_user_id",
                schema: "identity",
                table: "agencies");

            migrationBuilder.DropColumn(
                name: "rejection_reason",
                schema: "identity",
                table: "agencies");

            migrationBuilder.DropColumn(
                name: "reviewed_at",
                schema: "identity",
                table: "agencies");

            migrationBuilder.DropColumn(
                name: "submitted_at",
                schema: "identity",
                table: "agencies");

            migrationBuilder.DropColumn(
                name: "website",
                schema: "identity",
                table: "agencies");
        }
    }
}
