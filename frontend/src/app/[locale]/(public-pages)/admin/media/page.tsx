import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { sessionGet } from "@/lib/hani/server-api";
import type { MediaFolder, MediaListResponse } from "@/features/home-experience/domain/media";
import { AdminPageShell } from "@/features/home-experience/ui/AdminPageShell";
import { MediaLibraryEditor } from "@/features/home-experience/ui/MediaLibraryEditor";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "adminMedia" });
  return { title: t("title"), robots: { index: false, follow: false } };
}

export default async function AdminMediaPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "adminMedia" });
  const [result, folderResult] = await Promise.all([
    sessionGet<MediaListResponse>("/internal/v1/content-media?page=1&pageSize=24"),
    sessionGet<MediaFolder[]>("/internal/v1/content-media/folders")
  ]);

  if (result.status === 401 || result.status === 403) {
    return (
      <AdminPageShell
        locale={locale}
        title={t("accessTitle")}
        subtitle={t("accessHint")}
        active={t("navMedia")}
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
      active={t("navMedia")}
    >
      <MediaLibraryEditor
        initialItems={result.data?.items ?? []}
        initialFolders={folderResult.data ?? []}
        total={result.data?.total ?? 0}
      />
    </AdminPageShell>
  );
}
