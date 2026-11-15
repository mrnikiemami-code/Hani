import { getPageMetadata } from "@/config/metadata";
import Index10Client from "./index10Client";

export const generateMetadata = () => getPageMetadata("Index 10");

export default function Index10Page() {
  return <Index10Client />;
}
