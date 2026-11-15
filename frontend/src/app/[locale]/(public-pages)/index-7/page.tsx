import { getPageMetadata } from "@/config/metadata";
import Index7Client from "./index7Client";

export const generateMetadata = () => getPageMetadata("Index 7");

export default function Index7Page() {
  return <Index7Client />;
}
