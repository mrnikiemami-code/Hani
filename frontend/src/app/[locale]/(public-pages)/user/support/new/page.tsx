import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { sessionGet } from "@/lib/hani/server-api";
import { FinancePageShell } from "@/features/dashboard/ui/FinancePageShell";
import { CustomerSupportTicketForm } from "@/features/dashboard/ui/CustomerSupportTicketForm";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "supportCenter" });
  return { title: t("createTitle"), robots: { index: false, follow: false } };
}

export default async function NewCustomerSupportPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "supportCenter" });
  const me = await sessionGet<{ userId: string }>("/market/v1/auth/me");
  if (me.status === 401 || me.status === 403) {
    redirect(`/${locale}/login`);
  }

  return (
    <FinancePageShell
      title={t("createTitle")}
      subtitle={t("createSubtitle")}
      active={t("title")}
    >
      <div className="mb-3">
        <Link href="/user/support" className="btn btn-light btn-sm">
          {t("back")}
        </Link>
      </div>
      <CustomerSupportTicketForm />
    </FinancePageShell>
  );
}
