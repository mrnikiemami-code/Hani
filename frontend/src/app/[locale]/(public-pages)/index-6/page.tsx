import { getPageMetadata } from "@/config/metadata";
import Index6Client from "./index6Client";

export const generateMetadata = () => getPageMetadata("Index 6");

export default function Index6Page() {
  return <Index6Client />;
}
