import { getTranslations, setRequestLocale } from "next-intl/server";
import { apiGet } from "@/lib/api";
import type { AuthorProfile } from "@/lib/types";
import { SiteFooter, SiteHeader } from "@/components/SiteHeader";

export default async function AuthorPage({
  params
}: {
  params: Promise<{ locale: string; username: string }>;
}) {
  const { locale, username } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "common" });
  const data = await apiGet<AuthorProfile>(
    `/market/v1/authors/${username}/profile`
  );

  return (
    <>
      <SiteHeader locale={locale} />
      <main className="page">
        <div className="container">
          {!data ? (
            <p className="muted">{t("noResults")}</p>
          ) : (
            <>
              <h1>{data.author.displayName}</h1>
              <p className="muted">@{data.author.username}</p>
              <p>{data.author.bio}</p>
              <div className="grid">
                <div className="card">Level {data.gamification.level}</div>
                <div className="card">Points {data.gamification.points}</div>
                <div className="card">{data.content.travelogues} itineraries</div>
                <div className="card">{data.content.blogs} blog posts</div>
                <div className="card">{data.content.videos} videos</div>
                <div className="card">{data.reviewCount} reviews</div>
              </div>
              <section className="section">
                <h2>Badges</h2>
                <div className="filters">
                  {data.gamification.badges.map((badge) => (
                    <span className="badge" key={badge}>
                      {badge}
                    </span>
                  ))}
                </div>
              </section>
            </>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
