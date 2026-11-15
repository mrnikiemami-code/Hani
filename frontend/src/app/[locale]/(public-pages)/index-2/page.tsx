import { getPageMetadata } from "@/config/metadata";
import Index2Client from "./index2Client";

export const generateMetadata = () => getPageMetadata("Index 2");

export default function Index2Page() {
  return <Index2Client />;
}
