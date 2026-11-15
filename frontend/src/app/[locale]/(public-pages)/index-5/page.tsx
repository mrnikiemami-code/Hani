import { getPageMetadata } from "@/config/metadata";
import Index5Client from "./index5Client";

export const generateMetadata = () => getPageMetadata("Index 5");

export default function Index5Page() {
  return <Index5Client />;
}
