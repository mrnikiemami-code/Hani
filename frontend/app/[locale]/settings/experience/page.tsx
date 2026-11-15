import { cookies } from "next/headers";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SiteFooter, SiteHeader } from "@/components/SiteHeader";
import { setHomeExperience } from "@/features/home/application/set-home-experience";
import {
  HOME_EXPERIENCE_COOKIE,
  resolveHomeExperience
} from "@/features/home/application/resolve-home-experience";
import { HOME_EXPERIENCE_DEFINITIONS } from "@/features/home/domain/home-experience";

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
  const nav = await getTranslations({ locale, namespace: "nav" });

  return (
    <>
      <SiteHeader locale={locale} />
      <main className="page">
        <div className="container">
          <div className="section-head">
            <div>
              <h1>{t("title")}</h1>
              <p className="muted">{t("subtitle")}</p>
            </div>
            <span className="badge">{nav("settings")}</span>
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
                  data-experience={definition.id}
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
                    <span className="muted">{t(definition.descriptionKey)}</span>
                    <span className="experience-source">{definition.source}</span>
                  </span>
                  {isSelected && <span className="badge">{t("current")}</span>}
                </button>
              );
            })}
          </form>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
