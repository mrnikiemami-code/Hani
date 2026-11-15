"use client";

import dynamic from "next/dynamic";

const BlogListView = dynamic(() => import("@/views/blog/blog-list/blogList"), { ssr: false });

export default function BlogListClient() {
  return <BlogListView />;
}
