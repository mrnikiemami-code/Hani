import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { sessionGet } from "@/lib/hani/server-api";
import type { MediaListResponse } from "@/features/home-experience/domain/media";
import type { ContentEntry } from "@/features/home-experience/domain/content-entry";
import { AdminPageShell } from "@/features/home-experience/ui/AdminPageShell";
import { ContentManager } from "@/features/home-experience/ui/ContentManager";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "adminContent" });
  return { title: t("title"), robots: { index: false, follow: false } };
}

export default async function AdminContentPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "adminContent" });
  const [entries, media] = await Promise.all([
    sessionGet<ContentEntry[]>("/internal/v1/content-entries"),
    sessionGet<MediaListResponse>("/internal/v1/media?page=1&pageSize=100")
  ]);

  if (entries.status === 401 || entries.status === 403) {
    return (
      <AdminPageShell
        locale={locale}
        title={t("accessTitle")}
        subtitle={t("accessHint")}
        active={t("navContent")}
      >
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4 text-gray-6">{t("accessHint")}</div>
        </div>
      </AdminPageShell>
    );
  }

  return (
    <AdminPageShell
      locale={locale}
      title={t("title")}
      subtitle={t("subtitle")}
      active={t("navContent")}
    >
      <ContentManager
        locale={locale}
        initialEntries={entries.data ?? []}
        mediaAssets={media.data?.items ?? []}
      />
    </AdminPageShell>
  );
}
