import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { sessionGet } from "@/lib/hani/server-api";
import type { MediaFolder } from "@/features/home-experience/domain/media";
import { AdminPageShell } from "@/features/home-experience/ui/AdminPageShell";
import { MediaCreateForm } from "@/features/home-experience/ui/MediaCreateForm";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "adminMedia" });
  return { title: t("uploadTitle"), robots: { index: false, follow: false } };
}

export default async function AdminMediaCreatePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "adminMedia" });
  const folders = await sessionGet<MediaFolder[]>(
    "/internal/v1/content-media/folders"
  );

  if (folders.status === 401 || folders.status === 403) {
    return (
      <AdminPageShell
        locale={locale}
        title={t("accessTitle")}
        subtitle={t("accessHint")}
        active={t("navMedia")}
        activeSection="content"
        activeChild="media"
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
      title={t("uploadTitle")}
      subtitle={t("uploadHint")}
      active={t("navMedia")}
        activeSection="content"
        activeChild="media"
    >
      <MediaCreateForm locale={locale} initialFolders={folders.data ?? []} />
    </AdminPageShell>
  );
}
