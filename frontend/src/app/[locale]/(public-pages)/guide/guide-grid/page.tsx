import { getPageMetadata } from "@/config/metadata";
import GuideGridClient from "./guideGridClient";

export const generateMetadata = () => getPageMetadata("Guide Grid");

export default function GuideGridPage() {
  return <GuideGridClient />;
}
