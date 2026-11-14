import { getTranslations, setRequestLocale } from "next-intl/server";
import { apiGet } from "@/lib/api";
import type { VideoDetail } from "@/lib/types";
import { SiteFooter, SiteHeader } from "@/components/SiteHeader";

export default async function VideoDetailPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "common" });
  const video = await apiGet<VideoDetail>(
    `/market/v1/content/videos/${slug}?locale=${locale}`
  );

  return (
    <>
      <SiteHeader locale={locale} />
      <main className="page">
        <div className="container">
          {!video ? (
            <p className="muted">{t("noResults")}</p>
          ) : (
            <article>
              <h1>{video.title}</h1>
              <p className="muted">{video.description}</p>
              <div className="card">
                <a href={video.videoUrl} target="_blank" rel="noreferrer">
                  {video.provider} · {video.videoUrl}
                </a>
              </div>
            </article>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
