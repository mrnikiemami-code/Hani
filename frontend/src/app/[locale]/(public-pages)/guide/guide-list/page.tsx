import { getPageMetadata } from "@/config/metadata";
import GuideListClient from "./guideListClient";

export const generateMetadata = () => getPageMetadata("Guide List");

export default function GuideListPage() {
  return <GuideListClient />;
}
