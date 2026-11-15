import { getPageMetadata } from "@/config/metadata";
import Index9Client from "./index9Client";

export const generateMetadata = () => getPageMetadata("Index 9");

export default function Index9Page() {
  return <Index9Client />;
}
