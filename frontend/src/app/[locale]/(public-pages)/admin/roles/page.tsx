import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { sessionGet } from "@/lib/hani/server-api";
import type { AdminRoles } from "@/features/home-experience/domain/admin-role";
import { AdminPageShell } from "@/features/home-experience/ui/AdminPageShell";
import { RolePermissionManager } from "@/features/home-experience/ui/RolePermissionManager";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "adminRoles" });
  return { title: t("title"), robots: { index: false, follow: false } };
}

export default async function AdminRolesPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "adminRoles" });
  const tHome = await getTranslations({ locale, namespace: "adminHome" });
  const result = await sessionGet<AdminRoles>("/internal/v1/admin/roles");

  if (result.status === 401 || result.status === 403) {
    return (
      <AdminPageShell
        locale={locale}
        title={tHome("accessTitle")}
        subtitle={tHome("accessHint")}
        active={t("title")}
        activeSection="settings"
        activeChild="roles"
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
      title={t("title")}
      subtitle={t("subtitle")}
      active={t("title")}
      activeSection="settings"
      activeChild="roles"
    >
      <RolePermissionManager
        data={result.data ?? { permissionCatalog: [], roles: [] }}
      />
    </AdminPageShell>
  );
}
