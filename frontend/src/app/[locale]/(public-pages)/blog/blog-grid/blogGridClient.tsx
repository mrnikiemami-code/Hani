"use client";

import dynamic from "next/dynamic";
import type { BlogSummaryItem } from "@/features/content/domain/blog";

const BlogGridView = dynamic(() => import("@/views/blog/blog-grid/blogGrid"), {
  ssr: false
});

export default function BlogGridClient({
  posts,
  totalCount,
  page,
  locale
}: {
  posts: BlogSummaryItem[];
  totalCount: number;
  page: number;
  locale: string;
}) {
  return (
    <BlogGridView
      posts={posts}
      totalCount={totalCount}
      page={page}
      locale={locale}
    />
  );
}
