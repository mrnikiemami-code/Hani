import { getTranslations, setRequestLocale } from "next-intl/server";
import { getMyProfile } from "@/features/dashboard/infrastructure/profile-api";
import { saveMyProfile } from "@/features/dashboard/application/save-my-profile";
import { FinancePageShell } from "@/features/dashboard/ui/FinancePageShell";

export const dynamic = "force-dynamic";

export default async function MyProfilePage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ saved?: string }>;
}) {
  const { locale } = await params;
  const query = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "profile" });
  const profile = await getMyProfile();

  return (
    <FinancePageShell
      title={t("title")}
      subtitle={t("subtitle")}
      active={t("title")}
    >
      {query.saved && (
        <div className="alert alert-success" role="status">
          {t("saved")}
        </div>
      )}
      <div className="card">
        <div className="card-body">
          {profile ? (
            <form action={saveMyProfile} className="row gy-3">
              <input type="hidden" name="locale" value={locale} />
              <div className="col-md-6">
                <label className="form-label" htmlFor="firstName">
                  {t("firstName")}
                </label>
                <input
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  defaultValue={profile.firstName}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label" htmlFor="lastName">
                  {t("lastName")}
                </label>
                <input
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  defaultValue={profile.lastName}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label" htmlFor="email">
                  {t("email")}
                </label>
                <input
                  className="form-control"
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={profile.email ?? ""}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label" htmlFor="avatarUrl">
                  {t("avatarUrl")}
                </label>
                <input
                  className="form-control"
                  id="avatarUrl"
                  name="avatarUrl"
                  defaultValue={profile.avatarUrl ?? ""}
                />
              </div>
              <div className="col-12">
                <label className="form-label" htmlFor="bio">
                  {t("bio")}
                </label>
                <textarea
                  className="form-control"
                  id="bio"
                  name="bio"
                  rows={4}
                  defaultValue={profile.bio ?? ""}
                />
              </div>
              <div className="col-md-4">
                <p className="fs-14 text-gray-5 mb-0">
                  {t("mobile")}: {profile.mobile}
                </p>
              </div>
              <div className="col-md-4">
                <p className="fs-14 text-gray-5 mb-0">
                  {t("username")}: {profile.username}
                </p>
              </div>
              <div className="col-md-4">
                <p className="fs-14 text-gray-5 mb-0">
                  {t("role")}: {profile.role}
                </p>
              </div>
              <div className="col-12">
                <button className="btn btn-primary" type="submit">
                  {t("save")}
                </button>
              </div>
            </form>
          ) : (
            <p className="text-gray-5 mb-0">{t("noProfile")}</p>
          )}
        </div>
      </div>
    </FinancePageShell>
  );
}
