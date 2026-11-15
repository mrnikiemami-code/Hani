import { getPageMetadata } from "@/config/metadata";
import BlogGridClient from "./blogGridClient";

export const generateMetadata = () => getPageMetadata("Blog Grid");

export default function BlogGridPage() {
  return <BlogGridClient />;
}
