import { getPageMetadata } from "@/config/metadata";
import Index8Client from "./index8Client";

export const generateMetadata = () => getPageMetadata("Index 8");

export default function Index8Page() {
  return <Index8Client />;
}
