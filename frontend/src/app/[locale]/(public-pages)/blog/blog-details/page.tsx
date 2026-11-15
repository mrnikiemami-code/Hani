import { getPageMetadata } from "@/config/metadata";
import BlogDetailsClient from "./blogDetailsClient";

export const generateMetadata = () => getPageMetadata("Blog Details");

export default function BlogDetailsPage() {
  return <BlogDetailsClient />;
}
