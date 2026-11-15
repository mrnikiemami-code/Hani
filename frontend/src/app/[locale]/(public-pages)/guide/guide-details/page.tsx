import { getPageMetadata } from "@/config/metadata";
import GuideDetailsClient from "./guideDetailsClient";

export const generateMetadata = () => getPageMetadata("Guide Details");

export default function GuideDetailsPage() {
  return <GuideDetailsClient />;
}
