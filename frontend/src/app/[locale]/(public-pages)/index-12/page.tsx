import { getPageMetadata } from "@/config/metadata";
import Index12Client from "./index12Client";

export const generateMetadata = () => getPageMetadata("Index 12");

export default function Index12Page() {
  return <Index12Client />;
}
