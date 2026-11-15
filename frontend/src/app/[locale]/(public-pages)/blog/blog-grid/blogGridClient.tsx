"use client";

import dynamic from "next/dynamic";

const BlogGridView = dynamic(() => import("@/views/blog/blog-grid/blogGrid"), { ssr: false });

export default function BlogGridClient() {
  return <BlogGridView />;
}
