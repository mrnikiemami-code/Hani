import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AdminPageShell } from "@/features/home-experience/ui/AdminPageShell";
import { SupportTicketForm } from "@/features/home-experience/ui/SupportTicketForm";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "adminSupport" });
  return { title: t("createTitle"), robots: { index: false, follow: false } };
}

export default async function NewSupportTicketPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "adminSupport" });

  return (
    <AdminPageShell
      locale={locale}
      title={t("createTitle")}
      subtitle={t("createSubtitle")}
      active={t("createTitle")}
      activeSection="support"
      activeChild="tickets"
    >
      <SupportTicketForm />
    </AdminPageShell>
  );
}
