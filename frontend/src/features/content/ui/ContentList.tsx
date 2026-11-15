import { getTranslations } from "next-intl/server";
import ImageWithBasePath from "@/components/image-with-base-path";
import { Link } from "@/i18n/navigation";
import {
  getTravelogues,
  getVideos
} from "../infrastructure/content-api";

export async function ContentList({
  locale,
  kind,
  page = 1
}: {
  locale: string;
  kind: "itineraries" | "videos";
  page?: number;
}) {
  const t = await getTranslations({ locale, namespace: "common" });
  const isVideo = kind === "videos";
  const result = isVideo
    ? await getVideos(locale, page, 9)
    : await getTravelogues(locale, page, 9);
  const title = isVideo ? t("videos") : t("itineraries");

  return (
    <section className="section">
      <div className="container">
        <div className="section-header-eight text-center mb-4">
          <h2>{title}</h2>
        </div>
        <div className="row row-gap-4">
          {result.items.map((item, index) => {
            const slug = item.slug;
            const cover = item.coverUrl ?? `assets/img/tours/tour-thumb-0${6 + (index % 3)}.jpg`;
            const duration = "durationSeconds" in item ? item.durationSeconds : null;
            return (
              <div className="col-lg-4 col-md-6" key={slug}>
                <div className="article-item">
                  <div className="article-img">
                    <Link href={`/${kind}/${encodeURIComponent(slug)}`} tabIndex={0}>
                      <ImageWithBasePath
                        src={cover}
                        className="img-fluid"
                        alt={item.title}
                      />
                    </Link>
                    <div className="article-content">
                      <h3>
                        <Link href={`/${kind}/${encodeURIComponent(slug)}`}>
                          {item.title}
                        </Link>
                      </h3>
                      <div className="d-flex align-items-center justify-content-between gap-3 flex-wrap">
                        <span className="text-white fs-16">
                          <i className="isax isax-calendar" />
                          {item.publishedAt
                            ? new Intl.DateTimeFormat(locale, {
                                dateStyle: "medium"
                              }).format(new Date(item.publishedAt))
                            : ""}
                        </span>
                        <span className="badge badge-light text-dark rounded-pill p-2">
                          {isVideo && duration !== null
                            ? `${Math.floor(duration / 60)}:${String(
                                duration % 60
                              ).padStart(2, "0")}`
                            : t("itineraries")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {result.items.length === 0 && (
            <div className="col-12">
              <p className="text-center text-gray-6">{t("noResults")}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
