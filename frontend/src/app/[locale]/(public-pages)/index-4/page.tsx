import { getPageMetadata } from "@/config/metadata";
import Index4Client from "./index4Client";

export const generateMetadata = () => getPageMetadata("Index 4");

export default function Index4Page() {
  return <Index4Client />;
}
