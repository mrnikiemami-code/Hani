import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { sessionGet } from "@/lib/hani/server-api";
import {
  normalizeHomePageSettings,
  type HomePageSettingsResponse
} from "@/features/home-experience/domain/home-page-settings";
import { AdminHomeManager } from "@/features/home-experience/ui/AdminHomeManager";
import { getHomeFeed } from "@/features/home-experience/infrastructure/home-api";
import type { MediaListResponse } from "@/features/home-experience/domain/media";
import { AdminPageShell } from "@/features/home-experience/ui/AdminPageShell";

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
  const [result, media, feed] = await Promise.all([
    sessionGet<HomePageSettingsResponse>(
      `/internal/v1/home-settings?key=default&locale=${encodeURIComponent(locale)}`
    ),
    sessionGet<MediaListResponse>(
      "/internal/v1/content-media?page=1&pageSize=100"
    ),
    getHomeFeed(locale)
  ]);

  if (result.status === 401 || result.status === 403) {
    return (
      <AdminPageShell
        locale={locale}
        title={t("accessTitle")}
        subtitle={t("accessHint")}
        active={t("navHomepage")}
        activeSection="content"
        activeChild="homepage"
      >
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4">
            <p className="text-gray-6 mb-0">{t("accessHint")}</p>
          </div>
        </div>
      </AdminPageShell>
    );
  }

  const settings = normalizeHomePageSettings(result.data?.settings ?? null);

  return (
    <AdminPageShell
      locale={locale}
      title={t("title")}
      subtitle={t("subtitle")}
      active={t("navHomepage")}
        activeSection="content"
        activeChild="homepage"
    >
      <AdminHomeManager
        locale={locale}
        initialSettings={settings}
        mediaAssets={media.data?.items ?? []}
        feed={feed}
      />
    </AdminPageShell>
  );
}
