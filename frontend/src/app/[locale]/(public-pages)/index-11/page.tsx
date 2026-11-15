import { getPageMetadata } from "@/config/metadata";
import Index11Client from "./index11Client";

export const generateMetadata = () => getPageMetadata("Index 11");

export default function Index11Page() {
  return <Index11Client />;
}
