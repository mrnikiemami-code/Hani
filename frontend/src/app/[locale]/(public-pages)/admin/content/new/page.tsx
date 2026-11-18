import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { sessionGet } from "@/lib/hani/server-api";
import type { MediaListResponse } from "@/features/home-experience/domain/media";
import { AdminPageShell } from "@/features/home-experience/ui/AdminPageShell";
import { ContentEditor } from "@/features/home-experience/ui/ContentEditor";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "adminContent" });
  return { title: t("create"), robots: { index: false, follow: false } };
}

export default async function AdminContentCreatePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "adminContent" });
  const media = await sessionGet<MediaListResponse>(
    "/internal/v1/content-media?page=1&pageSize=100"
  );

  if (media.status === 401 || media.status === 403) {
    return (
      <AdminPageShell
        locale={locale}
        title={t("accessTitle")}
        subtitle={t("accessHint")}
        active={t("navContent")}
        activeSection="content"
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
      title={t("create")}
      subtitle={t("subtitle")}
      active={t("navContent")}
        activeSection="content"
    >
      <ContentEditor
        locale={locale}
        entry={null}
        mediaAssets={media.data?.items ?? []}
      />
    </AdminPageShell>
  );
}
