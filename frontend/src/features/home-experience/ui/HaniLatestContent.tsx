"use client";

import { useLocale, useTranslations } from "next-intl";
import { formatIsoInstant } from "@/lib/hani/calendar";
import ImageWithBasePath from "@/components/image-with-base-path";
import { Link } from "@/i18n/navigation";
import { useHomeFeed } from "./HomeFeedProvider";

export function HaniLatestContent({
  variant = "mixed"
}: {
  variant?: "mixed" | "travelogues" | "blog";
}) {
  const feed = useHomeFeed();
  const t = useTranslations("common");
  const locale = useLocale();
  const blogItems = (feed?.blog.items ?? []).map((item) => ({
      id: item.postId,
      title: item.title,
      excerpt: item.excerpt,
      cover: item.coverUrl,
      href: `/blog/blog-details?slug=${encodeURIComponent(item.slug)}`,
      date: item.publishedAt,
      readingTimeMinutes: item.readingTimeMinutes
    }));
  const travelogueItems = (feed?.travelogues.items ?? []).map((item) => ({
      id: item.travelogueId,
      title: item.title,
      excerpt: item.seriesName ?? "",
      cover: item.coverUrl,
      href: `/blog/blog-details?slug=${encodeURIComponent(item.slug)}`,
      date: item.publishedAt,
      readingTimeMinutes: item.readingTimeMinutes
    }));
  const items = (
    variant === "blog"
      ? blogItems
      : variant === "travelogues"
        ? travelogueItems
        : [...blogItems, ...travelogueItems]
  ).slice(0, 3);

  if (items.length === 0) {
    return null;
  }

  return (
    <section className="section article-section">
      <div className="container">
        <div className="section-header-eight wow fadeInUp">
          <h2>
            {variant === "travelogues"
              ? t("latestTravelogues")
              : t("latestArticles")}
          </h2>
        </div>
        <div className="row row-gap-4 justify-content-center wow fadeInUp">
          {items.map((item, index) => (
            <div className="col-lg-4 col-md-6" key={item.id}>
              <div className="article-item">
                <div className="article-img">
                  <Link href={item.href} tabIndex={0}>
                    <ImageWithBasePath
                      src={item.cover ?? `assets/img/tours/tour-thumb-0${6 + index}.jpg`}
                      loading="lazy" className="img-fluid"
                      alt={item.title}
                    />
                  </Link>
                  <div className="article-content">
                    <h3>
                      <Link href={item.href}>{item.title}</Link>
                    </h3>
                    <div className="d-flex align-items-center justify-content-between gap-3 flex-wrap">
                      <span className="text-white fs-16">
                        <i className="isax isax-calendar" />
                        {item.date
                          ? formatIsoInstant(item.date, locale, {
                              dateStyle: "medium"
                            })
                          : ""}
                      </span>
                      <span className="badge badge-light text-dark rounded-pill p-2">
                        {item.readingTimeMinutes
                          ? t("minRead", { count: item.readingTimeMinutes })
                          : t("blog")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
