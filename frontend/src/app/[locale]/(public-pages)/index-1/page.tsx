import { getPageMetadata } from "@/config/metadata";
import Index1Client from "./index1Client";

export const generateMetadata = () => getPageMetadata("Index 1");

export default function Index1Page() {
  return <Index1Client />;
}
