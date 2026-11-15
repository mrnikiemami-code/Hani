import { cookies } from "next/headers";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { apiGet } from "@/lib/hani/api";
import { setHomeExperience } from "@/features/home-experience/application/set-home-experience";
import {
  HOME_EXPERIENCE_COOKIE,
  resolveHomeExperience
} from "@/features/home-experience/application/resolve-home-experience";
import { HOME_EXPERIENCE_DEFINITIONS } from "@/features/home-experience/domain/home-experience";
import { readDisplayPreferences } from "@/features/preferences/application/display-preferences";
import { setDisplayPreferences } from "@/features/preferences/application/set-display-preferences";
import { getMyPreferences } from "@/features/preferences/infrastructure/preferences-api";
import { routing } from "@/i18n/routing";

export const dynamic = "force-dynamic";

const currencies = ["IRR", "USD", "EUR", "AED", "TRY", "GBP"];

export default async function HomeExperienceSettingsPage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const { locale } = await params;
  const query = await searchParams;
  setRequestLocale(locale);

  const cookieStore = await cookies();
  const stored = await getMyPreferences();
  const selected = resolveHomeExperience({
    userPreference: stored?.homeExperienceId,
    cookie: cookieStore.get(HOME_EXPERIENCE_COOKIE)?.value
  });
  const display = stored ?? (await readDisplayPreferences(locale));
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

        {query.saved && (
          <div className="alert alert-success" role="status">
            {common("preferencesSaved")}
          </div>
        )}
        {query.error && (
          <div className="alert alert-danger" role="alert">
            {common("preferencesInvalid")}
          </div>
        )}

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

        <div className="card settings mt-4">
          <div className="card-header">
            <h6>{common("displayPreferences")}</h6>
          </div>
          <div className="card-body">
            <form action={setDisplayPreferences} className="row gy-4">
              <div className="col-md-4">
                <label className="form-label" htmlFor="preferred-locale">
                  {common("preferredLocale")}
                </label>
                <select
                  className="form-select"
                  id="preferred-locale"
                  name="locale"
                  defaultValue={routing.locales.includes(locale as (typeof routing.locales)[number]) ? locale : routing.defaultLocale}
                >
                  {routing.locales.map((option) => (
                    <option key={option} value={option}>
                      {option.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label" htmlFor="preferred-currency">
                  {common("preferredCurrency")}
                </label>
                <select
                  className="form-select"
                  id="preferred-currency"
                  name="currency"
                  defaultValue={display.currency}
                >
                  {currencies.map((currency) => (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label" htmlFor="preferred-theme">
                  {common("theme")}
                </label>
                <select
                  className="form-select"
                  id="preferred-theme"
                  name="theme"
                  defaultValue={display.theme}
                >
                  <option value="system">{common("themeSystem")}</option>
                  <option value="light">{common("themeLight")}</option>
                  <option value="dark">{common("themeDark")}</option>
                </select>
              </div>
              <div className="col-md-6">
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    id="reduced-motion"
                    name="reducedMotion"
                    type="checkbox"
                    defaultChecked={display.reducedMotion}
                  />
                  <label className="form-check-label" htmlFor="reduced-motion">
                    {common("reducedMotion")}
                  </label>
                </div>
              </div>
              <div className="col-md-6 text-md-end">
                <button className="btn btn-primary" type="submit">
                  {common("savePreferences")}
                </button>
              </div>
              <div className="col-12">
                <p className="fs-14 text-gray-5 mb-0">
                  {stored
                    ? common("signedInPreferences")
                    : common("anonymousPreferences")}
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
