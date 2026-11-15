import { cookies } from "next/headers";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { apiGet } from "@/lib/hani/api";
import { setHomeExperience } from "@/features/home-experience/application/set-home-experience";
import {
  HOME_EXPERIENCE_COOKIE,
  resolveHomeExperience
} from "@/features/home-experience/application/resolve-home-experience";
import { HOME_EXPERIENCE_DEFINITIONS } from "@/features/home-experience/domain/home-experience";

export const dynamic = "force-dynamic";

export default async function HomeExperienceSettingsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const cookieStore = await cookies();
  const selected = resolveHomeExperience({
    cookie: cookieStore.get(HOME_EXPERIENCE_COOKIE)?.value
  });
  const t = await getTranslations({ locale, namespace: "homeExperiences" });
  const common = await getTranslations({ locale, namespace: "common" });
  const apiHome = await apiGet<unknown>(`/market/v1/home?locale=${locale}`);

  return (
    <section className="section experience-settings-section">
      <div className="container">
        <div className="section-header text-center">
          <h2>{t("title")}</h2>
          <p>{t("subtitle")}</p>
          <span className={`badge ${apiHome ? "bg-success" : "bg-danger"}`}>
            {apiHome ? common("apiConnected") : common("apiUnavailable")}
          </span>
        </div>

        <form action={setHomeExperience} className="experience-grid">
          <input type="hidden" name="locale" value={locale} />
          {HOME_EXPERIENCE_DEFINITIONS.map((definition) => {
            const isSelected = definition.id === selected.id;

            return (
              <button
                className={`experience-card${isSelected ? " is-selected" : ""}`}
                key={definition.id}
                name="experienceId"
                value={definition.id}
                type="submit"
                aria-pressed={isSelected}
              >
                <span
                  className="experience-preview"
                  style={{
                    background: `linear-gradient(135deg, ${definition.accent}, #102a26)`
                  }}
                  aria-hidden="true"
                />
                <span className="experience-card-body">
                  <strong>{t(definition.labelKey)}</strong>
                  <span>{t(definition.descriptionKey)}</span>
                  <small>{definition.source}</small>
                </span>
                {isSelected && <span className="badge bg-primary">{t("current")}</span>}
              </button>
            );
          })}
        </form>
      </div>
    </section>
  );
}
