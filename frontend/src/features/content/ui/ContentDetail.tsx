import { getTranslations } from "next-intl/server";
import { formatIsoInstant } from "@/lib/hani/calendar";
import ImageWithBasePath from "@/components/image-with-base-path";
import { getTravelogue, getVideo } from "../infrastructure/content-api";

export async function ContentDetail({
  locale,
  kind,
  slug
}: {
  locale: string;
  kind: "itineraries" | "videos";
  slug: string;
}) {
  const t = await getTranslations({ locale, namespace: "common" });
  const isVideo = kind === "videos";
  const item = isVideo
    ? await getVideo(locale, slug)
    : await getTravelogue(locale, slug);

  if (!item) {
    return (
      <section className="section">
        <div className="container">
          <p className="text-center text-gray-6">{t("noResults")}</p>
        </div>
      </section>
    );
  }

  const videoUrl =
    isVideo && "videoUrl" in item
      ? item.videoUrl.replace("watch?v=", "embed/")
      : null;

  return (
    <section className="section">
      <div className="container">
        <article className="card border-0 shadow-sm">
          <div className="card-body p-4 p-lg-5">
            <h1 className="mb-3">{item.title}</h1>
            <p className="text-gray-6 mb-4">
              {item.publishedAt
                ? formatIsoInstant(item.publishedAt, locale, {
                    dateStyle: "medium"
                  })
                : ""}
            </p>
            {isVideo && videoUrl ? (
              <div className="ratio ratio-16x9 mb-4">
                <iframe
                  src={videoUrl}
                  title={item.title}
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            ) : (
              <ImageWithBasePath
                src={
                  item.coverUrl ??
                  "assets/img/blog/blog-details.jpg"
                }
                className="img-fluid rounded mb-4"
                alt={item.title}
              />
            )}
            <div className="text-gray-7" style={{ whiteSpace: "pre-wrap" }}>
              {"body" in item ? item.body : item.description}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
