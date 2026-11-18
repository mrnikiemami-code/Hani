import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { sessionGet } from "@/lib/hani/server-api";
import type {
  MediaAsset,
  MediaFolder
} from "@/features/home-experience/domain/media";
import { AdminPageShell } from "@/features/home-experience/ui/AdminPageShell";
import { MediaEditForm } from "@/features/home-experience/ui/MediaEditForm";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "adminMedia" });
  return { title: t("editTitle"), robots: { index: false, follow: false } };
}

export default async function AdminMediaEditPage({
  params
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "adminMedia" });
  const [asset, folders] = await Promise.all([
    sessionGet<MediaAsset>(`/internal/v1/content-media/${id}`),
    sessionGet<MediaFolder[]>("/internal/v1/content-media/folders")
  ]);

  if (asset.status === 401 || asset.status === 403) {
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

  if (asset.status === 404 || !asset.data) {
    notFound();
  }

  return (
    <AdminPageShell
      locale={locale}
      title={t("editTitle")}
      subtitle={t("subtitle")}
      active={t("navMedia")}
        activeSection="content"
        activeChild="media"
    >
      <MediaEditForm
        locale={locale}
        media={asset.data}
        initialFolders={folders.data ?? []}
      />
    </AdminPageShell>
  );
}
