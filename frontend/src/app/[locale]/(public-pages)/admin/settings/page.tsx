import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { sessionGet } from "@/lib/hani/server-api";
import type { AdminPlatformSettings } from "@/features/home-experience/domain/admin-platform-settings";
import { AdminPageShell } from "@/features/home-experience/ui/AdminPageShell";
import { PlatformSettingsForm } from "@/features/home-experience/ui/PlatformSettingsForm";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "adminSettings" });
  return { title: t("title"), robots: { index: false, follow: false } };
}

export default async function AdminSettingsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tHome = await getTranslations({ locale, namespace: "adminHome" });
  const result = await sessionGet<AdminPlatformSettings>(
    "/internal/v1/admin/platform-settings"
  );

  if (result.status === 401 || result.status === 403) {
    return (
      <AdminPageShell
        locale={locale}
        title={tHome("accessTitle")}
        subtitle={tHome("accessHint")}
        active={tHome("accessTitle")}
        activeSection="settings"
        activeChild="baseSettings"
      >
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4 text-gray-6">
            {tHome("accessHint")}
          </div>
        </div>
      </AdminPageShell>
    );
  }

  return (
    <AdminPageShell
      locale={locale}
      title={(await getTranslations({ locale, namespace: "adminSettings" }))("title")}
      subtitle={(await getTranslations({ locale, namespace: "adminSettings" }))("subtitle")}
      active={(await getTranslations({ locale, namespace: "adminSettings" }))("title")}
      activeSection="settings"
      activeChild="baseSettings"
    >
      <PlatformSettingsForm
        initial={result.data ?? { settings: {}, updatedAt: null }}
      />
    </AdminPageShell>
  );
}
