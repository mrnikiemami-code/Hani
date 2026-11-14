import { getTranslations, setRequestLocale } from "next-intl/server";
import { apiGet } from "@/lib/api";
import type { PagedResult, VideoSummary } from "@/lib/types";
import { Link } from "@/i18n/navigation";
import { SiteFooter, SiteHeader } from "@/components/SiteHeader";

export default async function VideosPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "common" });
  const data = await apiGet<PagedResult<VideoSummary>>(
    `/market/v1/content/videos?locale=${locale}&page=1&pageSize=20`
  );

  return (
    <>
      <SiteHeader locale={locale} />
      <main className="page">
        <div className="container">
          <h1>{t("videos")}</h1>
          <div className="grid">
            {(data?.items ?? []).map((video) => (
              <Link className="card" key={video.videoId} href={`/videos/${video.slug}`}>
                <span className="badge">level {video.level}</span>
                <h3>{video.title}</h3>
                <div className="muted">
                  {Math.floor(video.durationSeconds / 60)}:
                  {String(video.durationSeconds % 60).padStart(2, "0")} · {video.provider}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
