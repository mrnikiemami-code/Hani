import { getTranslations } from "next-intl/server";
import { getAuthorProfile } from "../infrastructure/author-api";

export async function AuthorProfileView({
  locale,
  username
}: {
  locale: string;
  username: string;
}) {
  const t = await getTranslations({ locale, namespace: "common" });
  const profile = await getAuthorProfile(username);

  if (!profile) {
    return (
      <section className="section">
        <div className="container">
          <p className="text-center text-gray-6">{t("noResults")}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container">
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4 p-lg-5">
            <div className="d-flex align-items-center gap-4 flex-wrap mb-4">
              <div className="avatar avatar-xxl bg-primary text-white d-flex align-items-center justify-content-center fs-24">
                {profile.author.displayName.slice(0, 1)}
              </div>
              <div>
                <h1 className="mb-1">{profile.author.displayName}</h1>
                <p className="text-gray-6 mb-1">@{profile.author.username}</p>
                <p className="text-gray-6 mb-0">{profile.author.bio}</p>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-md-3">
                <div className="border rounded p-3 text-center">
                  <div className="fs-24 fw-semibold">{profile.gamification.level}</div>
                  <div className="text-gray-6">{t("level")}</div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="border rounded p-3 text-center">
                  <div className="fs-24 fw-semibold">{profile.gamification.points}</div>
                  <div className="text-gray-6">{t("points")}</div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="border rounded p-3 text-center">
                  <div className="fs-24 fw-semibold">{profile.content.blogs + profile.content.travelogues + profile.content.videos}</div>
                  <div className="text-gray-6">{t("content")}</div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="border rounded p-3 text-center">
                  <div className="fs-24 fw-semibold">{profile.reviewCount}</div>
                  <div className="text-gray-6">{t("reviews")}</div>
                </div>
              </div>
            </div>

            {profile.gamification.badges.length > 0 && (
              <div className="mt-4">
                <h5 className="mb-3">{t("badges")}</h5>
                <div className="d-flex flex-wrap gap-2">
                  {profile.gamification.badges.map((badge) => (
                    <span className="badge bg-primary" key={badge}>
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
