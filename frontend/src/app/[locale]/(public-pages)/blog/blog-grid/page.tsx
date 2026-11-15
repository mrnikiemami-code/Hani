import { getPageMetadata } from "@/config/metadata";
import { setRequestLocale } from "next-intl/server";
import { getBlogPosts } from "@/features/content/infrastructure/blog-api";
import BlogGridClient from "./blogGridClient";

export const generateMetadata = () => getPageMetadata("Blog Grid");

export default async function BlogGridPage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { locale } = await params;
  const query = await searchParams;
  setRequestLocale(locale);

  const page = Math.max(1, Number(query.page ?? "1"));
  const result = await getBlogPosts(locale, page, 9);

  return (
    <BlogGridClient
      posts={result.items}
      totalCount={result.totalCount}
      page={result.page}
      locale={locale}
    />
  );
}
