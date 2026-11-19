import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { sessionGet } from "@/lib/hani/server-api";
import type { AdminFinanceSettings } from "@/features/home-experience/domain/admin-finance-settings";
import { AdminPageShell } from "@/features/home-experience/ui/AdminPageShell";
import { FinanceSettingsEditor } from "@/features/home-experience/ui/FinanceSettingsEditor";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "adminFinance" });
  return { title: t("financeSettings"), robots: { index: false, follow: false } };
}

export default async function AdminFinanceSettingsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "adminFinance" });
  const tHome = await getTranslations({ locale, namespace: "adminHome" });
  const result = await sessionGet<AdminFinanceSettings>(
    "/internal/v1/admin/finance/settings"
  );

  if (result.status === 401 || result.status === 403) {
    return (
      <AdminPageShell
        locale={locale}
        title={tHome("accessTitle")}
        subtitle={tHome("accessHint")}
        active={tHome("accessTitle")}
        activeSection="finance"
        activeChild="financeSettings"
      >
        <div className="card border-0 shadow-sm">
          <div className="card-body p-4 text-gray-6">{tHome("accessHint")}</div>
        </div>
      </AdminPageShell>
    );
  }

  return (
    <AdminPageShell
      locale={locale}
      title={t("financeSettings")}
      subtitle={t("financeSettingsHint")}
      active={t("financeSettings")}
      activeSection="finance"
      activeChild="financeSettings"
    >
      <FinanceSettingsEditor
        initial={
          result.data ?? {
            bankAccounts: [],
            currencies: [],
            taxRules: [],
            settlement: {
              periodDays: 30,
              minimumAmount: 0,
              currency: "IRR",
              dueDays: 7
            },
            updatedAt: null
          }
        }
      />
    </AdminPageShell>
  );
}
