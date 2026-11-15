import { getPageMetadata } from "@/config/metadata";
import Index3Client from "./index3Client";

export const generateMetadata = () => getPageMetadata("Index 3");

export default function Index3Page() {
  return <Index3Client />;
}
