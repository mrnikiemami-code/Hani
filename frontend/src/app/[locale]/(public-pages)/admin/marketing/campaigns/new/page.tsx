import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AdminPageShell } from "@/features/home-experience/ui/AdminPageShell";
import { CampaignForm } from "@/features/home-experience/ui/CampaignForm";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "adminMarketing" });
  return { title: t("createTitle"), robots: { index: false, follow: false } };
}

export default async function NewCampaignPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "adminMarketing" });

  return (
    <AdminPageShell
      locale={locale}
      title={t("createTitle")}
      subtitle={t("createSubtitle")}
      active={t("createTitle")}
      activeSection="marketing"
      activeChild="campaigns"
    >
      <CampaignForm />
    </AdminPageShell>
  );
}
