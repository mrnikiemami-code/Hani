import { getPageMetadata } from "@/config/metadata";
import BlogListClient from "./blogListClient";

export const generateMetadata = () => getPageMetadata("Blog List");

export default function BlogListPage() {
  return <BlogListClient />;
}
