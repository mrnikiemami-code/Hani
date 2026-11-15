import { setRequestLocale } from "next-intl/server";
import { AgencyProfileView } from "@/features/agencies/ui/AgencyProfileView";

export default async function AgencyDetailPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  return <AgencyProfileView locale={locale} slug={slug} />;
}
