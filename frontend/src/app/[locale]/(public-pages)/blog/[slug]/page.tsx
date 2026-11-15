import { setRequestLocale } from "next-intl/server";
import { BlogDetailView } from "@/features/content/ui/BlogDetailView";

export default async function BlogDetailPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  return <BlogDetailView locale={locale} slug={slug} />;
}
