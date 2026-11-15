"use client";

import dynamic from "next/dynamic";

const BlogDetailsView = dynamic(() => import("@/views/blog/blog-details/blogDetails"), { ssr: false });

export default function BlogDetailsClient() {
  return <BlogDetailsView />;
}
