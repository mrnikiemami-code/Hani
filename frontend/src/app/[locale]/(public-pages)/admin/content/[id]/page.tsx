import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { sessionGet } from "@/lib/hani/server-api";
import type { ContentEntry } from "@/features/home-experience/domain/content-entry";
import type { MediaListResponse } from "@/features/home-experience/domain/media";
import { AdminPageShell } from "@/features/home-experience/ui/AdminPageShell";
import { ContentEditor } from "@/features/home-experience/ui/ContentEditor";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "adminContent" });
  return { title: t("edit"), robots: { index: false, follow: false } };
}

export default async function AdminContentEditPage({
  params
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "adminContent" });
  const [entry, media] = await Promise.all([
    sessionGet<ContentEntry>(`/internal/v1/content-entries/${id}`),
    sessionGet<MediaListResponse>(
      "/internal/v1/content-media?page=1&pageSize=100"
    )
  ]);

  if (entry.status === 401 || entry.status === 403) {
    return (
      <AdminPageShell
        locale={locale}
        title={t("accessTitle")}
        subtitle={t("accessHint")}
        active={t("navContent")}
        activeSection="content"
        activeChild="contentPages"
      >
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4 text-gray-6">{t("accessHint")}</div>
        </div>
      </AdminPageShell>
    );
  }

  if (entry.status === 404 || !entry.data) {
    notFound();
  }

  return (
    <AdminPageShell
      locale={locale}
      title={t("edit")}
      subtitle={t("subtitle")}
      active={t("navContent")}
        activeSection="content"
        activeChild="contentPages"
    >
      <ContentEditor
        locale={locale}
        entry={entry.data}
        mediaAssets={media.data?.items ?? []}
      />
    </AdminPageShell>
  );
}
