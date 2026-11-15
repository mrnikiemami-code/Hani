import { apiGet } from "@/lib/hani/api";
import type { BlogDetailItem, BlogPagedResult } from "../domain/blog";

export async function getBlogPosts(
  locale: string,
  page = 1,
  pageSize = 9
): Promise<BlogPagedResult> {
  const query = new URLSearchParams({
    locale,
    page: String(page),
    pageSize: String(pageSize)
  });

  const result = await apiGet<BlogPagedResult>(
    `/market/v1/content/blog?${query.toString()}`
  );

  return (
    result ?? { items: [], page, pageSize, totalCount: 0, totalPages: 0 }
  );
}

export async function getBlogPost(
  locale: string,
  slug: string
): Promise<BlogDetailItem | null> {
  return apiGet<BlogDetailItem>(
    `/market/v1/content/blog/${encodeURIComponent(slug)}?locale=${encodeURIComponent(locale)}`
  );
}
