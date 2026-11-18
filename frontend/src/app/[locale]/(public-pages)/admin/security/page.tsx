import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { sessionGet } from "@/lib/hani/server-api";
import type { OtpSecurityConfig } from "@/features/home-experience/application/security-actions";
import { AdminPageShell } from "@/features/home-experience/ui/AdminPageShell";
import { SecuritySettingsEditor } from "@/features/home-experience/ui/SecuritySettingsEditor";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "adminSecurity" });
  return { title: t("title"), robots: { index: false, follow: false } };
}

export default async function AdminSecurityPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "adminSecurity" });
  const result = await sessionGet<OtpSecurityConfig>("/internal/v1/security/otp");

  if (result.status === 401 || result.status === 403) {
    return (
      <AdminPageShell
        locale={locale}
        title={t("accessTitle")}
        subtitle={t("accessHint")}
        active={t("navSecurity")}
        activeSection="settings"
        activeChild="security"
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
      active={t("navSecurity")}
        activeSection="settings"
        activeChild="security"
    >
      <SecuritySettingsEditor
        initialSettings={
          result.data ?? {
            lifetimeSeconds: 120,
            resendCooldownSeconds: 120,
            maxRequestsPerHour: 5,
            maxVerifyAttempts: 5,
            mobileChangeWindowSeconds: 120,
            maxMobileChangesPerIp: 3,
            ipBlockSeconds: 900,
            maxIpRequestsPerWindow: 10,
            ipRequestWindowSeconds: 120
          }
        }
      />
    </AdminPageShell>
  );
}
