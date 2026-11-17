import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { sessionGet } from "@/lib/hani/server-api";
import {
  normalizeHomePageSettings,
  type HomePageSettingsResponse
} from "@/features/home-experience/domain/home-page-settings";
import { HomeSettingsEditor } from "@/features/home-experience/ui/HomeSettingsEditor";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "adminHome" });
  return {
    title: t("title"),
    robots: { index: false, follow: false }
  };
}

export default async function AdminHomePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "adminHome" });
  const result = await sessionGet<HomePageSettingsResponse>(
    `/internal/v1/home-settings?key=default&locale=${encodeURIComponent(locale)}`
  );

  if (result.status === 401 || result.status === 403) {
    return (
      <div className="content">
        <div className="container py-5">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <h1 className="h3">{t("accessTitle")}</h1>
              <p className="text-gray-6 mb-0">{t("accessHint")}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const settings = normalizeHomePageSettings(result.data?.settings ?? null);

  return <HomeSettingsEditor locale={locale} initialSettings={settings} />;
}
