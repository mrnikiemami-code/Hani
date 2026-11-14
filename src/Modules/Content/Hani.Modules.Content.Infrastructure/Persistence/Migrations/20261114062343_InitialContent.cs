using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Hani.Modules.Content.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class InitialContent : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "content");

            migrationBuilder.CreateTable(
                name: "ad_events",
                schema: "content",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    creative_id = table.Column<Guid>(type: "uuid", nullable: false),
                    slot_code = table.Column<string>(type: "character varying(80)", maxLength: 80, nullable: false),
                    type = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: false),
                    occurred_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ad_events", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "ad_slots",
                schema: "content",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    code = table.Column<string>(type: "character varying(80)", maxLength: 80, nullable: false),
                    name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    is_active = table.Column<bool>(type: "boolean", nullable: false),
                    created_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ad_slots", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "analytics_events",
                schema: "content",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    event_name = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    entity_type = table.Column<string>(type: "character varying(80)", maxLength: 80, nullable: false),
                    entity_id = table.Column<Guid>(type: "uuid", nullable: true),
                    user_id = table.Column<Guid>(type: "uuid", nullable: true),
                    metadata = table.Column<string>(type: "jsonb", nullable: true),
                    occurred_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_analytics_events", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "blog_posts",
                schema: "content",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    slug = table.Column<string>(type: "character varying(180)", maxLength: 180, nullable: false),
                    author_user_id = table.Column<Guid>(type: "uuid", nullable: false),
                    category_id = table.Column<Guid>(type: "uuid", nullable: true),
                    cover_url = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    status = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: false),
                    view_count = table.Column<int>(type: "integer", nullable: false),
                    like_count = table.Column<int>(type: "integer", nullable: false),
                    published_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                    created_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    updated_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_blog_posts", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "campaign_registrations",
                schema: "content",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    campaign_id = table.Column<Guid>(type: "uuid", nullable: false),
                    full_name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    contact = table.Column<string>(type: "character varying(320)", maxLength: 320, nullable: false),
                    channel = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: false),
                    status = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: false),
                    created_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_campaign_registrations", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "campaigns",
                schema: "content",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    slug = table.Column<string>(type: "character varying(180)", maxLength: 180, nullable: false),
                    destination_id = table.Column<Guid>(type: "uuid", nullable: true),
                    price = table.Column<decimal>(type: "numeric(18,2)", precision: 18, scale: 2, nullable: true),
                    currency = table.Column<string>(type: "character varying(3)", maxLength: 3, nullable: true),
                    discount_percent = table.Column<decimal>(type: "numeric(5,2)", precision: 5, scale: 2, nullable: true),
                    starts_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    ends_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    status = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: false),
                    created_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_campaigns", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "content_categories",
                schema: "content",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    slug = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    type = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: false),
                    is_active = table.Column<bool>(type: "boolean", nullable: false),
                    created_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_content_categories", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "content_comments",
                schema: "content",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    content_type = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: false),
                    content_id = table.Column<Guid>(type: "uuid", nullable: false),
                    user_id = table.Column<Guid>(type: "uuid", nullable: true),
                    author_name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    body = table.Column<string>(type: "text", nullable: false),
                    parent_id = table.Column<Guid>(type: "uuid", nullable: true),
                    status = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: false),
                    created_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_content_comments", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "newsletter_subscriptions",
                schema: "content",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    contact = table.Column<string>(type: "character varying(320)", maxLength: 320, nullable: false),
                    channel = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: false),
                    locale = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: false),
                    verification_code = table.Column<string>(type: "character varying(16)", maxLength: 16, nullable: false),
                    status = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: false),
                    created_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    confirmed_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                    unsubscribed_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_newsletter_subscriptions", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "notifications",
                schema: "content",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    user_id = table.Column<Guid>(type: "uuid", nullable: true),
                    channel = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: false),
                    template_key = table.Column<string>(type: "character varying(120)", maxLength: 120, nullable: false),
                    payload = table.Column<string>(type: "text", nullable: false),
                    status = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: false),
                    created_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    sent_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_notifications", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "travelogues",
                schema: "content",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    slug = table.Column<string>(type: "character varying(180)", maxLength: 180, nullable: false),
                    author_user_id = table.Column<Guid>(type: "uuid", nullable: false),
                    series_name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: true),
                    cover_url = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    status = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: false),
                    view_count = table.Column<int>(type: "integer", nullable: false),
                    like_count = table.Column<int>(type: "integer", nullable: false),
                    published_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                    created_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    updated_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_travelogues", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "videos",
                schema: "content",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    slug = table.Column<string>(type: "character varying(180)", maxLength: 180, nullable: false),
                    author_user_id = table.Column<Guid>(type: "uuid", nullable: false),
                    category_id = table.Column<Guid>(type: "uuid", nullable: true),
                    video_url = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: false),
                    provider = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: false),
                    cover_url = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: true),
                    duration_seconds = table.Column<int>(type: "integer", nullable: false),
                    level = table.Column<int>(type: "integer", nullable: false),
                    status = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: false),
                    view_count = table.Column<int>(type: "integer", nullable: false),
                    like_count = table.Column<int>(type: "integer", nullable: false),
                    published_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                    created_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    updated_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_videos", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "ad_creatives",
                schema: "content",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    slot_id = table.Column<Guid>(type: "uuid", nullable: false),
                    title = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    image_url = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: false),
                    target_url = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: false),
                    starts_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                    ends_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                    is_active = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ad_creatives", x => x.id);
                    table.ForeignKey(
                        name: "FK_ad_creatives_ad_slots_slot_id",
                        column: x => x.slot_id,
                        principalSchema: "content",
                        principalTable: "ad_slots",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "blog_post_translations",
                schema: "content",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    post_id = table.Column<Guid>(type: "uuid", nullable: false),
                    locale = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: false),
                    title = table.Column<string>(type: "character varying(300)", maxLength: 300, nullable: false),
                    excerpt = table.Column<string>(type: "text", nullable: false),
                    body = table.Column<string>(type: "text", nullable: false),
                    seo_title = table.Column<string>(type: "character varying(300)", maxLength: 300, nullable: true),
                    seo_description = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_blog_post_translations", x => x.id);
                    table.ForeignKey(
                        name: "FK_blog_post_translations_blog_posts_post_id",
                        column: x => x.post_id,
                        principalSchema: "content",
                        principalTable: "blog_posts",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "campaign_faqs",
                schema: "content",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    campaign_id = table.Column<Guid>(type: "uuid", nullable: false),
                    question = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    answer = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_campaign_faqs", x => x.id);
                    table.ForeignKey(
                        name: "FK_campaign_faqs_campaigns_campaign_id",
                        column: x => x.campaign_id,
                        principalSchema: "content",
                        principalTable: "campaigns",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "campaign_translations",
                schema: "content",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    campaign_id = table.Column<Guid>(type: "uuid", nullable: false),
                    locale = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: false),
                    title = table.Column<string>(type: "character varying(300)", maxLength: 300, nullable: false),
                    description = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_campaign_translations", x => x.id);
                    table.ForeignKey(
                        name: "FK_campaign_translations_campaigns_campaign_id",
                        column: x => x.campaign_id,
                        principalSchema: "content",
                        principalTable: "campaigns",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "content_category_translations",
                schema: "content",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    category_id = table.Column<Guid>(type: "uuid", nullable: false),
                    locale = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: false),
                    name = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_content_category_translations", x => x.id);
                    table.ForeignKey(
                        name: "FK_content_category_translations_content_categories_category_id",
                        column: x => x.category_id,
                        principalSchema: "content",
                        principalTable: "content_categories",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "travelogue_destinations",
                schema: "content",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    travelogue_id = table.Column<Guid>(type: "uuid", nullable: false),
                    destination_id = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_travelogue_destinations", x => x.id);
                    table.ForeignKey(
                        name: "FK_travelogue_destinations_travelogues_travelogue_id",
                        column: x => x.travelogue_id,
                        principalSchema: "content",
                        principalTable: "travelogues",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "travelogue_translations",
                schema: "content",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    travelogue_id = table.Column<Guid>(type: "uuid", nullable: false),
                    locale = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: false),
                    title = table.Column<string>(type: "character varying(300)", maxLength: 300, nullable: false),
                    body = table.Column<string>(type: "text", nullable: false),
                    seo_title = table.Column<string>(type: "character varying(300)", maxLength: 300, nullable: true),
                    seo_description = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_travelogue_translations", x => x.id);
                    table.ForeignKey(
                        name: "FK_travelogue_translations_travelogues_travelogue_id",
                        column: x => x.travelogue_id,
                        principalSchema: "content",
                        principalTable: "travelogues",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "video_translations",
                schema: "content",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    video_id = table.Column<Guid>(type: "uuid", nullable: false),
                    locale = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: false),
                    title = table.Column<string>(type: "character varying(300)", maxLength: 300, nullable: false),
                    description = table.Column<string>(type: "text", nullable: false),
                    seo_title = table.Column<string>(type: "character varying(300)", maxLength: 300, nullable: true),
                    seo_description = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_video_translations", x => x.id);
                    table.ForeignKey(
                        name: "FK_video_translations_videos_video_id",
                        column: x => x.video_id,
                        principalSchema: "content",
                        principalTable: "videos",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ad_creatives_slot_id",
                schema: "content",
                table: "ad_creatives",
                column: "slot_id");

            migrationBuilder.CreateIndex(
                name: "ix_ad_events_creative_type",
                schema: "content",
                table: "ad_events",
                columns: new[] { "creative_id", "type" });

            migrationBuilder.CreateIndex(
                name: "ux_ad_slots_code",
                schema: "content",
                table: "ad_slots",
                column: "code",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_analytics_events_name_time",
                schema: "content",
                table: "analytics_events",
                columns: new[] { "event_name", "occurred_at" });

            migrationBuilder.CreateIndex(
                name: "IX_blog_post_translations_post_id_locale",
                schema: "content",
                table: "blog_post_translations",
                columns: new[] { "post_id", "locale" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_blog_posts_status",
                schema: "content",
                table: "blog_posts",
                column: "status");

            migrationBuilder.CreateIndex(
                name: "ux_blog_posts_slug",
                schema: "content",
                table: "blog_posts",
                column: "slug",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_campaign_faqs_campaign_id",
                schema: "content",
                table: "campaign_faqs",
                column: "campaign_id");

            migrationBuilder.CreateIndex(
                name: "ix_campaign_registrations_campaign_contact",
                schema: "content",
                table: "campaign_registrations",
                columns: new[] { "campaign_id", "contact" });

            migrationBuilder.CreateIndex(
                name: "IX_campaign_translations_campaign_id",
                schema: "content",
                table: "campaign_translations",
                column: "campaign_id");

            migrationBuilder.CreateIndex(
                name: "ux_campaigns_slug",
                schema: "content",
                table: "campaigns",
                column: "slug",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ux_content_categories_type_slug",
                schema: "content",
                table: "content_categories",
                columns: new[] { "type", "slug" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_content_category_translations_category_id_locale",
                schema: "content",
                table: "content_category_translations",
                columns: new[] { "category_id", "locale" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_content_comments_target_status",
                schema: "content",
                table: "content_comments",
                columns: new[] { "content_type", "content_id", "status" });

            migrationBuilder.CreateIndex(
                name: "ux_newsletter_channel_contact",
                schema: "content",
                table: "newsletter_subscriptions",
                columns: new[] { "channel", "contact" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_notifications_user_status",
                schema: "content",
                table: "notifications",
                columns: new[] { "user_id", "status" });

            migrationBuilder.CreateIndex(
                name: "IX_travelogue_destinations_travelogue_id_destination_id",
                schema: "content",
                table: "travelogue_destinations",
                columns: new[] { "travelogue_id", "destination_id" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_travelogue_translations_travelogue_id_locale",
                schema: "content",
                table: "travelogue_translations",
                columns: new[] { "travelogue_id", "locale" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_travelogues_status",
                schema: "content",
                table: "travelogues",
                column: "status");

            migrationBuilder.CreateIndex(
                name: "ux_travelogues_slug",
                schema: "content",
                table: "travelogues",
                column: "slug",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_video_translations_video_id_locale",
                schema: "content",
                table: "video_translations",
                columns: new[] { "video_id", "locale" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_videos_status",
                schema: "content",
                table: "videos",
                column: "status");

            migrationBuilder.CreateIndex(
                name: "ux_videos_slug",
                schema: "content",
                table: "videos",
                column: "slug",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ad_creatives",
                schema: "content");

            migrationBuilder.DropTable(
                name: "ad_events",
                schema: "content");

            migrationBuilder.DropTable(
                name: "analytics_events",
                schema: "content");

            migrationBuilder.DropTable(
                name: "blog_post_translations",
                schema: "content");

            migrationBuilder.DropTable(
                name: "campaign_faqs",
                schema: "content");

            migrationBuilder.DropTable(
                name: "campaign_registrations",
                schema: "content");

            migrationBuilder.DropTable(
                name: "campaign_translations",
                schema: "content");

            migrationBuilder.DropTable(
                name: "content_category_translations",
                schema: "content");

            migrationBuilder.DropTable(
                name: "content_comments",
                schema: "content");

            migrationBuilder.DropTable(
                name: "newsletter_subscriptions",
                schema: "content");

            migrationBuilder.DropTable(
                name: "notifications",
                schema: "content");

            migrationBuilder.DropTable(
                name: "travelogue_destinations",
                schema: "content");

            migrationBuilder.DropTable(
                name: "travelogue_translations",
                schema: "content");

            migrationBuilder.DropTable(
                name: "video_translations",
                schema: "content");

            migrationBuilder.DropTable(
                name: "ad_slots",
                schema: "content");

            migrationBuilder.DropTable(
                name: "blog_posts",
                schema: "content");

            migrationBuilder.DropTable(
                name: "campaigns",
                schema: "content");

            migrationBuilder.DropTable(
                name: "content_categories",
                schema: "content");

            migrationBuilder.DropTable(
                name: "travelogues",
                schema: "content");

            migrationBuilder.DropTable(
                name: "videos",
                schema: "content");
        }
    }
}
