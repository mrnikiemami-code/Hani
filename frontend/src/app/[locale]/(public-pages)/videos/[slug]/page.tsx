import { setRequestLocale } from "next-intl/server";
import { ContentDetail } from "@/features/content/ui/ContentDetail";

export default async function VideoDetailPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  return <ContentDetail locale={locale} kind="videos" slug={slug} />;
}
